export const exportToCsv = (filename: string, data: (string|number)[][]) => {
    const processRow = (row: (string|number)[]) => row.map(val => {
        let finalVal = String(val).replace(/"/g, '""');
        if (finalVal.search(/("|,|\n)/g) >= 0) {
            finalVal = `"${finalVal}"`;
        }
        return finalVal;
    }).join(',');

    const csvContent = data.map(processRow).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
