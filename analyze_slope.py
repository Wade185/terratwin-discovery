
import rasterio
import numpy as np
import json
from pathlib import Path

source = "data/raw/ladakh_nasadem.tif"
output = Path("data/processed")
output.mkdir(parents=True, exist_ok=True)

with rasterio.open(source) as src:
    elevation = src.read(1).astype("float64")
    valid = np.isfinite(elevation)

    if src.nodata is not None:
        valid &= elevation != src.nodata

    # Convert geographic pixel spacing to approximate
    # metres at the centre latitude.
    latitude = (src.bounds.top + src.bounds.bottom) / 2
    pixel_y = abs(src.transform.e) * 111320
    pixel_x = abs(src.transform.a) * 111320 * np.cos(
        np.radians(latitude)
    )

    # Calculate local elevation gradients.
    filled = np.where(valid, elevation, np.nan)
    safe = np.nan_to_num(filled, nan=np.nanmedian(elevation[valid]))

    dz_dy, dz_dx = np.gradient(safe, pixel_y, pixel_x)

    slope = np.degrees(
        np.arctan(np.sqrt(dz_dx**2 + dz_dy**2))
    )

    # Local relief: elevation range in a 3x3 neighbourhood.
    from numpy.lib.stride_tricks import sliding_window_view

    padded = np.pad(safe, 1, mode="edge")
    windows = sliding_window_view(padded, (3, 3))
    relief = windows.max(axis=(-2, -1)) - windows.min(axis=(-2, -1))

    # Exclude borders and neighbourhoods containing NoData.
    valid_padded = np.pad(valid, 1, mode="constant")
    valid_windows = sliding_window_view(valid_padded, (3, 3))
    neighbourhood_valid = valid_windows.all(axis=(-2, -1))

    usable = valid & neighbourhood_valid

    results = {
        "dataset": "NASADEM",
        "method": "3x3 neighbourhood terrain analysis",
        "mean_slope_degrees": round(float(np.mean(slope[usable])), 3),
        "median_slope_degrees": round(float(np.median(slope[usable])), 3),
        "mean_local_relief_metres": round(float(np.mean(relief[usable])), 3),
        "median_local_relief_metres": round(float(np.median(relief[usable])), 3),
        "valid_analysis_pixels": int(usable.sum()),
        "pixel_width_metres_approx": round(float(pixel_x), 2),
        "pixel_height_metres_approx": round(float(pixel_y), 2)
    }

with open(output / "ladakh_slope_stats.json", "w") as f:
    json.dump(results, f, indent=4)

print(json.dumps(results, indent=4))
print("\nTERRAIN SLOPE ANALYSIS COMPLETE")
