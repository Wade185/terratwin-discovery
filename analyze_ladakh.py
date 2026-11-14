
import rasterio
import numpy as np
import json
from pathlib import Path

# TerraTwin NASADEM analysis
FILE = Path("data/raw/ladakh_nasadem.tif")
OUTPUT = Path("data/processed")
OUTPUT.mkdir(parents=True, exist_ok=True)

print("\n====================================")
print("       TERRATWIN TERRAIN SCAN")
print("====================================")

with rasterio.open(FILE) as src:
    elevation = src.read(1).astype("float64")
    nodata = src.nodata

    # Remove missing or invalid elevation cells
    valid = np.isfinite(elevation)

    if nodata is not None:
        valid &= elevation != nodata

    valid &= (elevation > -500) & (elevation < 9000)

    values = elevation[valid]

    if values.size == 0:
        raise ValueError("No valid elevation measurements found.")

    results = {
        "dataset": "NASADEM",
        "file": FILE.name,
        "width_pixels": src.width,
        "height_pixels": src.height,
        "coordinate_system": str(src.crs),
        "pixel_size": list(src.res),
        "valid_samples": int(values.size),
        "minimum_elevation_m": round(float(values.min()), 2),
        "maximum_elevation_m": round(float(values.max()), 2),
        "mean_elevation_m": round(float(values.mean()), 2),
        "median_elevation_m": round(float(np.median(values)), 2),
        "elevation_range_m": round(
            float(values.max() - values.min()), 2
        )
    }

print("\nTERRAIN RESULTS")
print("------------------------------------")

for key, value in results.items():
    print(f"{key}: {value}")

output_file = OUTPUT / "ladakh_terrain_stats.json"

with open(output_file, "w", encoding="utf-8") as f:
    json.dump(results, f, indent=4)

print("\n------------------------------------")
print("Analysis saved to:", output_file)
print("TERRAIN SCAN COMPLETE")
