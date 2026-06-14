import { describe, it, expect } from 'vitest';
import {
  calculateTransportation,
  calculateUtilities,
  calculateDiet,
  calculateConsumption,
  EMISSION_FACTORS
} from './carbonCalculator';

describe('Carbon Calculator Business Logic Tests', () => {
  
  describe('Transportation Calculations', () => {
    it('should calculate gasoline car emissions correctly', () => {
      const distance = 100;
      const expected = distance * EMISSION_FACTORS.transportation.gasolineCar;
      expect(calculateTransportation('gasolineCar', distance, 1)).toBe(expected);
    });

    it('should split carpooling emissions between passengers', () => {
      const distance = 60;
      const passengers = 3;
      const expected = (distance * EMISSION_FACTORS.transportation.hybridCar) / passengers;
      expect(calculateTransportation('hybridCar', distance, passengers)).toBe(expected);
    });

    it('should default passengers to 1 when parameter is omitted', () => {
      const distance = 50;
      const expected = distance * EMISSION_FACTORS.transportation.gasolineCar;
      expect(calculateTransportation('gasolineCar', distance)).toBe(expected);
    });

    it('should handle zero or negative passengers gracefully by treating them as solo rider', () => {
      const distance = 20;
      const expected = distance * EMISSION_FACTORS.transportation.electricCar;
      expect(calculateTransportation('electricCar', distance, 0)).toBe(expected);
      expect(calculateTransportation('electricCar', distance, -5)).toBe(expected);
    });

    it('should calculate flight emissions correctly', () => {
      const distance = 1000;
      const expected = distance * EMISSION_FACTORS.transportation.flight;
      expect(calculateTransportation('flight', distance)).toBe(expected);
    });

    it('should return 0 emissions for an unknown transit mode', () => {
      expect(calculateTransportation('teleportation', 100)).toBe(0);
    });

    it('should handle small fractional distances correctly', () => {
      const distance = 0.5;
      const expected = 0.5 * EMISSION_FACTORS.transportation.gasolineCar;
      expect(calculateTransportation('gasolineCar', distance)).toBe(expected);
    });
  });

  describe('Utility Calculations', () => {
    it('should calculate electricity emissions correctly', () => {
      const kwh = 250;
      const expected = kwh * EMISSION_FACTORS.utilities.electricity;
      expect(calculateUtilities('electricity', kwh)).toBe(expected);
    });

    it('should calculate natural gas emissions correctly', () => {
      const therms = 10;
      const expected = therms * EMISSION_FACTORS.utilities.gas;
      expect(calculateUtilities('gas', therms)).toBe(expected);
    });

    it('should return 0 emissions for an unknown utility resource', () => {
      expect(calculateUtilities('nuclearFusion', 100)).toBe(0);
    });
  });

  describe('Diet Calculations', () => {
    it('should calculate heavy meat meals carbon cost', () => {
      const meals = 3;
      const expected = meals * EMISSION_FACTORS.diet.heavyMeat;
      expect(calculateDiet('heavyMeat', meals)).toBe(expected);
    });

    it('should calculate vegan meals carbon cost', () => {
      const meals = 5;
      const expected = meals * EMISSION_FACTORS.diet.vegan;
      expect(calculateDiet('vegan', meals)).toBe(expected);
    });

    it('should default count to 1 meal when count parameter is omitted', () => {
      const expected = EMISSION_FACTORS.diet.vegetarian;
      expect(calculateDiet('vegetarian')).toBe(expected);
    });

    it('should return 0 emissions for an unknown diet category', () => {
      expect(calculateDiet('photosynthesis', 10)).toBe(0);
    });
  });

  describe('Consumption & Waste Calculations', () => {
    it('should calculate electronics purchase footprint', () => {
      const items = 1;
      const expected = items * EMISSION_FACTORS.consumption.electronics;
      expect(calculateConsumption('electronics', items)).toBe(expected);
    });

    it('should apply negative offset values for recycling actions', () => {
      const items = 10;
      const expected = items * EMISSION_FACTORS.consumption.recycling;
      expect(calculateConsumption('recycling', items)).toBeLessThan(0);
      expect(calculateConsumption('recycling', items)).toBe(expected);
    });

    it('should default count to 1 unit when count parameter is omitted', () => {
      const expected = EMISSION_FACTORS.consumption.generalWaste;
      expect(calculateConsumption('generalWaste')).toBe(expected);
    });

    it('should return 0 emissions for an unknown consumption item', () => {
      expect(calculateConsumption('spaceDust', 5)).toBe(0);
    });
  });

});
