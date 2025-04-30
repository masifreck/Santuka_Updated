export const generateHTML = (tableData, Client, loadingPoint, unloadingpoint, LoadDateTo) => {
    function formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
    }

    const formattedLoadDateTo = LoadDateTo ? formatDate(LoadDateTo) : "";

    const totalAdvance = tableData.reduce((sum, item) => sum + (parseFloat(item.Advance) || 0), 0).toFixed(2);
    const totalBankTransfer = tableData.reduce((sum, item) => sum + (parseFloat(item.BankTransfer) || 0), 0).toFixed(2);
    const totalUPI = tableData.reduce((sum, item) => sum + (parseFloat(item.upi) || 0), 0).toFixed(2);
    const totalHSDCost = tableData.reduce((sum, item) => sum + (parseFloat(item.HSDCost) || 0), 0).toFixed(2);
    const totalNetWt = tableData.reduce((sum, item) => sum + (parseFloat(item.NetWT) || 0), 0).toFixed(3);

    let rows = tableData.map(
        (item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${item.TruckNumber}</td>
            <td>${item.ChallanNo}</td>
            <td>${item.TP}</td>
            <td>${item.NetWT ? item.NetWT.toFixed(3) : ""}</td>
            <td>${item.UnloadedNetWt ? item.UnloadedNetWt.toFixed(3) : ""}</td>
            <td>${item.UnloadedDate ? item.UnloadedDate.split('T')[0] : ""}</td>
            <td>${!isNaN(parseFloat(item.Advance)) ? parseFloat(item.Advance).toFixed(2) : ""}</td>
            <td>${!isNaN(parseFloat(item.BankTransfer)) ? parseFloat(item.BankTransfer).toFixed(2) : ""}</td>
            <td>${!isNaN(parseFloat(item.upi)) ? parseFloat(item.upi).toFixed(2) : ""}</td>
            <td>${!isNaN(parseFloat(item.HSDCost)) ? parseFloat(item.HSDCost).toFixed(2) : ""}</td>
            <td>${item.PumpName}</td>
            <td>${item.MemoNo ? item.MemoNo : ""}</td>
            <td>${item.Remarks ? item.Remarks : ""}</td>
        </tr>`
    ).join("");

    return `
    <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; }
                .wrapper { padding: 0 20px;padding-right:40px; padding-left:40px; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                th, td { border: 1px solid #000; padding: 6px; text-align: center; font-size: 9px; }
                th { background-color: #fff; color: black; }
                .total-row td { font-weight: bold; background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <div class="wrapper">
                <table>
                    <thead>
                        <tr>
                            <th colspan="14">
                                <div style="text-align: center; font-size: 19px; font-weight: bold;">SANTUKA TRANSPORT</div>
                                <div style="text-align: center; font-size: 14px;">NIE Road, Jagatpur, Cuttack- 754 021</div>
                                <div style="text-align: center; font-size: 16px; font-weight: bold; margin: 5px 0;">LOADING/ UNLOADING STATEMENT</div>
                                <div style="display: flex; justify-content: space-between; font-size: 14px;">
                                    <span>Material  &nbsp;:&nbsp; ${tableData.length > 0 ? tableData[0].MaterialName : ''}</span>
                                    <span>Load Date: ${formattedLoadDateTo}</span>
                                </div>
                                <div style="text-align:left;font-size:14px;">
                                    <span>Client &nbsp; &nbsp; &nbsp;: &nbsp; ${Client}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; font-size: 14px;">
                                    <span>From &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;: &nbsp; ${loadingPoint}</span>
                                    <span>TO: ${tableData.length > 0 ? tableData[0].Unloading : ''}</span>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th>Sl. No.</th>
                            <th>Truck No</th>
                            <th>Challan No</th>
                            <th>TP</th> 
                            <th>Loading MT./Pkts</th>
                            <th>Unloading MT./Pkts</th>
                            <th>U/L Dt.</th>
                            <th>Cash Adv</th>
                            <th>Bank Transfer</th>
                            <th>UPI </th>
                            <th>HSD Adv </th>
                            <th>Pump Name</th>
                            <th>Memo No</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                        <tr class="total-row">
                            <td colspan="4" style="text-align: right;">Total</td>
                            <td>${totalNetWt}</td>
                            <td></td>
                            <td></td>
                            <td>${totalAdvance}</td>
                            <td>${totalBankTransfer}</td>
                            <td>${totalUPI}</td>
                            <td>${totalHSDCost}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </body>
    </html>`;
};
