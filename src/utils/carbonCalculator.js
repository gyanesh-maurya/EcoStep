/**
 * Carbon calculator conversion factors (expressed in kg CO2 per unit)
 */
export const EMISSION_FACTORS = {
  transportation: {
    gasolineCar: 0.40,  // kg CO2 per mile
    dieselCar: 0.42,    // kg CO2 per mile
    hybridCar: 0.22,    // kg CO2 per mile
    electricCar: 0.10,  // kg CO2 per mile (grid average)
    bus: 0.08,          // kg CO2 per passenger-mile
    train: 0.06,        // kg CO2 per passenger-mile
    flight: 0.15,       // kg CO2 per passenger-mile
  },
  utilities: {
    electricity: 0.38,  // kg CO2 per kWh
    gas: 5.3,           // kg CO2 per therm
    water: 0.005,       // kg CO2 per gallon
  },
  diet: {
    heavyMeat: 3.0,     // kg CO2 per meal
    mixed: 1.8,         // kg CO2 per meal (poultry, fish, eggs)
    vegetarian: 0.8,    // kg CO2 per meal
    vegan: 0.4,         // kg CO2 per meal
  },
  consumption: {
    electronics: 80.0,  // kg CO2 per new electronic item
    clothing: 10.0,     // kg CO2 per new clothing item
    generalWaste: 2.0,  // kg CO2 per bag of trash
    recycling: -0.8,    // kg CO2 offset per recycling action
  }
};

/**
 * Calculates emissions for a transit action.
 * @param {string} mode - Transit mode
 * @param {number} distance - Distance in miles
 * @param {number} passengers - Number of passengers (for carpooling splits)
 * @returns {number} - kg CO2 emissions
 */
export const calculateTransportation = (mode, distance, passengers = 1) => {
  const factor = EMISSION_FACTORS.transportation[mode] || 0;
  // If it's a car, divide emissions by passengers
  if (['gasolineCar', 'dieselCar', 'hybridCar', 'electricCar'].includes(mode)) {
    return (distance * factor) / Math.max(1, passengers);
  }
  return distance * factor;
};

/**
 * Calculates emissions for utility usage.
 * @param {string} type - Utility type (electricity, gas, water)
 * @param {number} value - Consumption value
 * @returns {number} - kg CO2 emissions
 */
export const calculateUtilities = (type, value) => {
  const factor = EMISSION_FACTORS.utilities[type] || 0;
  return value * factor;
};

/**
 * Calculates emissions for food consumption.
 * @param {string} type - Diet type
 * @param {number} mealsCount - Number of meals
 * @returns {number} - kg CO2 emissions
 */
export const calculateDiet = (type, mealsCount = 1) => {
  const factor = EMISSION_FACTORS.diet[type] || 0;
  return factor * mealsCount;
};

/**
 * Calculates emissions for physical shopping/consumption.
 * @param {string} type - Item type
 * @param {number} count - Quantity
 * @returns {number} - kg CO2 emissions
 */
export const calculateConsumption = (type, count = 1) => {
  const factor = EMISSION_FACTORS.consumption[type] || 0;
  return factor * count;
};
