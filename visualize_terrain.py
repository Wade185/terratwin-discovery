
import rasterio
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path

source = "data/raw/ladakh_nasadem.tif"
output = Path("data/processed")
output.mkdir(parents=True, exist_ok=True)

with rasterio.open(source) as src:
    elevation = src.read(
        1,
        out_shape=(1, 600, 600),
        masked=True
    )

    elevation = elevation.astype("float32")

    bounds = src.bounds

fig, ax = plt.subplots(figsize=(12, 10))

image = ax.imshow(
    elevation,
    cmap="terrain",
    extent=[
        bounds.left,
        bounds.right,
        bounds.bottom,
        bounds.top
    ],
    origin="upper"
)

ax.set_title(
    "TERRATWIN | NASADEM LADAKH ELEVATION MAP",
    fontsize=15,
    fontweight="bold"
)

ax.set_xlabel("Longitude")
ax.set_ylabel("Latitude")

bar = plt.colorbar(image, ax=ax)
bar.set_label("Elevation (metres)")

plt.tight_layout()

plt.savefig(
    output / "ladakh_elevation_map.png",
    dpi=200,
    bbox_inches="tight"
)

plt.close()

print("Elevation visualization generated successfully!")
print(output / "ladakh_elevation_map.png")
