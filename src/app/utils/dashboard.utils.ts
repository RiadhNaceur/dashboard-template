import { Partner } from "../models/partner.model";

export function sortData(data: Partner[], column: string, descending: boolean): Partner[] {
    if (!(column in data[0])) {
        throw new Error(`Column ${column} is not a valid key of Partner`);
    }
    return data.sort((a, b) => {
        const valA = a[column as keyof Partner];
        const valB = b[column as keyof Partner];
        if (typeof valA === 'number' && typeof valB === 'number') {
            return (valA - valB) * (descending ? -1 : 1);
        } else if (typeof valA === 'string' && typeof valB === 'string') {
            return valA.localeCompare(valB) * (descending ? -1 : 1);
        } else {
            return 0;
        }
    });
}

export function downloadCSV(data: Partner[], filename: string) {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        link.setAttribute('href', URL.createObjectURL(blob));
        link.setAttribute('download', filename + '.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function convertToCSV(data: Partner[]): string {
    const csvData = [];
    const headers = ['ID', 'Name', 'Type', 'Contract', 'Gross Sales', 'Commissions', 'Conversions'];
    csvData.push(headers.join(','));

    data.forEach((partner) => {
        const line = [
            partner.id,
            partner.partnerName,
            partner.partnerType,
            partner.contract,
            partner.grosssales,
            partner.commissions,
            partner.conversions,
        ].join(',');
        csvData.push(line);
    });

    return csvData.join('\n');
}