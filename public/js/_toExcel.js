//Наименование файла
let nameFile = sessionStorage.getItem('tabs');


// Функция для экспорта в Excel
async function convertXlsx() {
    const workbook = new ExcelJS.Workbook();
    const arr_sheet = ["КП", "Трудозатраты"];
    const arr_table = ["tbl_price", "tbl_trud"];
    for (let h = 0; h < 2; h++) {
        const sheet = workbook.addWorksheet(arr_sheet[h]);
        const table = document.getElementById(arr_table[h]);
        const rows = Array.from(table.rows);


        // --- Этап 1. Построим карту ячеек с учётом colspan и rowspan
        let cellMatrix = [];
        let currentRow = 0;

        rows.forEach((row) => {
            if (!cellMatrix[currentRow]) cellMatrix[currentRow] = [];
            let colIndex = 0;

            // Пропускаем занятые ячейки (из-за rowSpan / colSpan)
            while (cellMatrix[currentRow][colIndex]) colIndex++;

            Array.from(row.cells).forEach((cell) => {
                const colspan = parseInt(cell.colSpan || 1);
                const rowspan = parseInt(cell.rowSpan || 1);
                const r = currentRow;
                const c = colIndex;

                // Заполняем текущую позицию текстом
                cellMatrix[r][c] = cell.innerText?.trim()

                // Отмечаем занятые позиции
                for (let rr = 0; rr < rowspan; rr++) {
                    for (let cc = 0; cc < colspan; cc++) {
                        if (!cellMatrix[r + rr]) cellMatrix[r + rr] = [];
                        cellMatrix[r + rr][c + cc] = cellMatrix[r + rr][c + cc] || "";
                    }
                }

                // Добавляем ячейку в Excel
                const excelRow = sheet.getRow(r + 1);
                let raw = cell.textContent.trim();
                const isFirstColumn = c === 0;

                // --- ПРОЦЕНТЫ (ВАЖНО: проверяем раньше чисел)
                let percentMatch = raw.match(/^(\d+(?:[.,]\d+)?)%$/);

                let value;
                let isNum = false;
                let isPercent = false;

                if (percentMatch) {
                    value = Number(percentMatch[1].replace(",", ".")) / 100;
                    isNum = true;
                    isPercent = true;
                }
                else if (isFirstColumn) {
                    value = raw;   // 👈 ВСЕГДА строка
                    isNum = false; // 👈 запрещаем числовой формат
                }
                else {
                    value = parseExcelValue(raw);
                    isNum = isNumberValue(raw);
                }

                excelRow.getCell(c + 1).value = value;


                // --- Применяем стили
                const style = window.getComputedStyle(cell);

                const isBold =
                    style.fontWeight === "bold" ||
                    parseInt(style.fontWeight) >= 600;

                const excelCell = excelRow.getCell(c + 1);

                let align = style.textAlign || "left";



                excelCell.alignment = {
                    vertical: "middle",
                    wrapText: true,
                };
                const isMerged = cell.colSpan > 1 || cell.rowSpan > 1;

                let horizontal = "left";

                // только числа и НЕ заголовки
                if (isNum && !isMerged) {
                    horizontal = "right";
                }
                if (isPercent) {
                    excelCell.numFmt = "0%";
                } else if (isNum && !isFirstColumn) {
                    excelCell.numFmt = "#,##0.00";
                }

                excelCell.font = {
                    bold: isBold
                };
                excelCell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                };

                // --- Объединяем ячейки, если есть colspan/rowspan
                if (colspan > 1 || rowspan > 1) {
                    const startRow = r + 1;
                    const startCol = c + 1;
                    const endRow = r + rowspan;
                    const endCol = c + colspan;
                    sheet.mergeCells(startRow, startCol, endRow, endCol);
                }

                colIndex += colspan;
            });

            currentRow++;
        });
        // --- Устанавливаем ширину колонок (по пропорциям HTML)
        const firstRow = table.rows[1];
        const colWidths = [];
        Array.from(firstRow.cells).forEach((cell, i) => {
            const widthPx = cell.offsetWidth;
            const excelWidth = pxToExcel(widthPx);
            colWidths.push({ width: excelWidth });
           
        });
        sheet.columns = colWidths;

        // --- Высота строк (аналогично)
        rows.forEach((row, i) => {
            const heightPx = row.offsetHeight;
            sheet.getRow(i + 1).height = pxToPoints(heightPx);
        });

    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nameFile + '.xlsx';
    link.click();
}

function parseExcelValue(raw) {
    if (!raw) return "";

    let cleaned = raw
        .replace(/\s/g, "")   // пробелы
        .replace(",", ".");   // запятая → точка

    let num = Number(cleaned);

    return !isNaN(num) ? num : raw;
}


function rgbFromCss(cssColor) {
    if (!cssColor) return null;
    const match = cssColor.match(/rgb[a]?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return null;
    const [r, g, b] = match.slice(1).map(x => parseInt(x, 10));
    return 'FF' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}
function isNumberValue(raw) {
    if (!raw) return false;

    let cleaned = raw
        .replace(/\s/g, "")
        .replace(",", ".");

    return !isNaN(Number(cleaned));
}
// Преобразование пикселей → единицы ширины Excel
// 1 единица Excel ≈ 7 пикселей (по эмпирическим наблюдениям)
function pxToExcel(px) {
    return Math.round(px / 7 * 100) / 100;
}

// Преобразование пикселей → высота строки (пункты)
// 1 пункт ≈ 1.333 пикселя
function pxToPoints(px) {
    return Math.round((px / 1.333) * 100) / 100;
}


