
/*
 TERRATWIN DISCOVERY
 Terrain Analysis Engine
 Version 1.0

 This is a demonstration engine.
 It will use real elevation data once
 the NASA datasets are connected.
*/

export function analyzeTerrain(elevationGrid) {
  const values = elevationGrid
    .flat()
    .filter(value =>
      Number.isFinite(value)
    );

  if (values.length === 0) {
    throw new Error("No valid elevation data.");
  }

  const minimum = Math.min(...values);
  const maximum = Math.max(...values);

  const average =
    values.reduce((sum, value) => sum + value, 0)
    / values.length;

  const relief = maximum - minimum;

  return {
    minimumElevation: Number(minimum.toFixed(2)),
    maximumElevation: Number(maximum.toFixed(2)),
    averageElevation: Number(average.toFixed(2)),
    localRelief: Number(relief.toFixed(2)),
    sampleCount: values.length
  };
}

// Demonstration data only.
// These values are NOT NASA measurements.
export const demoElevationGrid = [
  [4200, 4210, 4230, 4250],
  [4190, 4220, 4260, 4290],
  [4170, 4200, 4240, 4310],
  [4150, 4180, 4230, 4280]
];
