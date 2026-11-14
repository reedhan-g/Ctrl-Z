// Authored first neighborhood. Coordinates remain in the shared 39:20 world.
// Frontage offsets reserve the continuous sidewalk and an entrance threshold.
export const lanternYard = {
  x: -20, y: -20,
  court: { x: -19.65, y: -17.7, width: 1.65, depth: 1.25 },
  parcels: [
    { x: -19.65, y: -19.65, model: 'yardHouse', entrance: '+y' },
    { x: -17.65, y: -19.65, model: 'lanternNoodles', entrance: '+x' },
    { x: -17.65, y: -17.7, model: 'lanternCafe', entrance: 'corner' },
  ],
} as const;
