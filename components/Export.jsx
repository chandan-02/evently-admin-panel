import React from 'react';
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
import { Spin, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function ExportExcelFile({ csvData, fileName, btnSize }) {

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  // 
  const fileExtension = '.xlsx';

  const exportToCSV = (csvData, fileName) => {

    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#ffffff' }} spin />;

  // Export button for exporting that particular page's data in csv
  return (
    <Button
      disabled={csvData?.length === 0 ? true : false}
      raised type="primary" onClick={e => exportToCSV(csvData, fileName)} >
      Export
    </Button>
  );
}

export default ExportExcelFile;
