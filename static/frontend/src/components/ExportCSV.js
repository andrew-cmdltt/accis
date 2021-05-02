import React from 'react'
import Button from 'react-bootstrap/Button';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {getConvertedCsvData} from "../utils/reports/getConvertedCsvData";

export const ExportCSV = ({csvData, fileName}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const convertedCsvData = getConvertedCsvData(csvData)

        const ws = XLSX.utils.json_to_sheet(convertedCsvData);
        const wb = { Names: ['Repo0rt'], Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <Button variant="warning" onClick={(e) => exportToCSV(csvData,fileName)}>
            Экспортировать отчёт
        </Button>
    )
}