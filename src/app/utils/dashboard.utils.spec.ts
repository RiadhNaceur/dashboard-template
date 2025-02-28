import { sortData, downloadCSV } from './dashboard.utils';
import { Partner } from '../models/partner.model';

describe('Dashboard Utils', () => {
  describe('sortData', () => {
    it('should sort partners by name', () => {
      const partners = [
        { id: 2, partnerName: 'B', partnerType: 'Type2' },
        { id: 1, partnerName: 'A', partnerType: 'Type1' },
      ] as Partner[];
      const sortedPartners = sortData(partners, 'partnerName', false);
      expect(sortedPartners[0].partnerName).toBe('A');
      expect(sortedPartners[1].partnerName).toBe('B');
    });
  });

  describe('downloadCSV', () => {
    it('should create a CSV file', () => {
      const partners = [
        { id: 1, partnerName: 'A', partnerType: 'Type1' },
      ] as Partner[];
      spyOn(window, 'alert');
      downloadCSV(partners, 'partners');
      expect(window.alert).not.toHaveBeenCalled();
    });
  });
});