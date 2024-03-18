const fs = require('fs');
const mammoth = require('mammoth');
const ExcelJS = require('exceljs');

async function convertPDFtoDOCX(pdfPath, docxPath) {
    const options = {
        styleMap: [
            "p[style-name='Heading 1'] => h1",
            "p[style-name='Heading 2'] => h2",
            "p[style-name='Heading 3'] => h3",
            "p[style-name='Heading 4'] => h4",
            "p[style-name='Heading 5'] => h5",
            "p[style-name='Heading 6'] => h6",
            "p[style-name='Body Text'] => p",
        ],
    };
    const result = await mammoth.convertToHtml({ path: pdfPath }, options);
    fs.writeFileSync(docxPath, result.value);
}

async function extractTextAndFormatFromDOCX(docxPath) {
    const docxContent = fs.readFileSync(docxPath, 'utf8');
    // Extract text and formatting information from the DOCX content
    // You may use a library like 'html-to-text' to parse HTML and extract text
    // You can also use a library like 'docxtemplater' to work with DOCX directly
    // For simplicity, let's assume you extract text only
    return docxContent;
}

async function saveToExcel(text, excelPath) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet');

    // Split the text into lines
    const lines = text.split('\n');

    // Write lines to the Excel worksheet
    lines.forEach((line, rowIndex) => {
        const columns = line.split('\t'); // Assuming tab-separated data for simplicity
        columns.forEach((column, colIndex) => {
            worksheet.getCell(rowIndex + 1, colIndex + 1).value = column;
        });
    });

    // Save the workbook to Excel file
    await workbook.xlsx.writeFile(excelPath);
}

async function pdfToExcel(pdfPath, excelPath) {
    try {
        const docxPath = 'temp.docx';
        // Convert PDF to DOCX
        await convertPDFtoDOCX(pdfPath, docxPath);

        // Extract text and formatting from DOCX
        const text = await extractTextAndFormatFromDOCX(docxPath);

        // Save extracted content to Excel
        await saveToExcel(text, excelPath);

        console.log('Conversion completed successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
}

const pdfPath = 'test2.pdf'; // Replace with the path to your PDF file
const excelPath = 'asdasd.xlsx'; // Replace with the desired output Excel file path
pdfToExcel(pdfPath, excelPath);
