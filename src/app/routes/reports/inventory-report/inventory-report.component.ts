import { SupplierService } from "./../../../core/_services/supplier.service";
import { ReportService } from "./../../../core/_services/report.service";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../../core/_services/authentication.service";
declare var $: any;
@Component({
  selector: "app-inventory-report",
  templateUrl: "./inventory-report.component.html",
  styleUrls: ["./inventory-report.component.scss"],
})
export class InventoryReportComponent implements OnInit {
  sysuser: any;
  LoadUI: boolean = false;
  suppliers: any;
  selected_supplier: any = null;
  inventory: any;
  payments: any;
  inventory_cost: any;
  constructor(
    private authservice: AuthenticationService,
    private reportService: ReportService,
    private supplierservice: SupplierService
  ) {}

  ngOnInit() {
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });
    this.getAllSuppliers();
    this.GenerateReport();
  }

  getAllSuppliers() {
    this.supplierservice.getAllSuppliers().subscribe((data) => {
      console.log(data);
      this.suppliers = [];
      this.suppliers.push({ label: "All", value: null });
      for (var i = 0; i < data.length; i++) {
        this.suppliers.push({
          label: data[i].supplier_name,

          value: data[i].id,
        });
      }
    });
  }

  GenerateReport() {
    var obj = {
      supplier: this.selected_supplier,
    };

    this.reportService.inventoryReport(obj).subscribe((data) => {
      this.inventory = data.inventory;
      this.payments = data.payment;
      this.inventory_cost = data.inventory_cost;
    });
  }

  exportTabletoExcel(tableID, filename) {
    var downloadLink;
    var dataType = "application/vnd.ms-excel";
    var tableSelect = document.getElementById(tableID);
    $(tableSelect)
      .find("a")
      .replaceWith(function () {
        return this.childNodes;
      });
    var tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");

    // Specify file name
    filename = filename ? filename + ".xls" : "excel_data.xls";

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      var blob = new Blob(["\ufeff", tableHTML], {
        type: dataType,
      });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = "data:" + dataType + ", " + tableHTML;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      // downloadLink.click();
      var FileSaver = require("file-saver");
      FileSaver.saveAs(downloadLink.href, filename);
    }
    this.GenerateReport();
  }
  printreport() {
    let printContents, popupWin;
    printContents = document.getElementById("printreport").innerHTML;
    popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.open();
    popupWin.document.write(`
          <html>
            <head>
              <title></title>
              <link rel="stylesheet" type="text/css"  href="../../../shared/styles/app.scss">
              <link rel="stylesheet" type="text/css"  href="../../../shared/styles/bootstrap.scss">
              <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
              <style type="text/css" media="print">

                @page {
	                
	                    size:  auto;   /* auto is the initial value */
	                    /*margin: 10mm;*/  /* this affects the margin in the printer settings */
	                  /*padding-top:250px*/
                }
                
                html{
	                    background-color: #FFFFFF; 
	                    margin: 0px;  /* this affects the margin on the html before sending to printer */
	            }
                
                body{
	               	margin: 5mm 5mm 5mm 1mm; /* margin you want for the content */
	            }
                
				.mr { margin-right: 10px !important; }
				.printhide { display: none;}
                
                header {
	                    /*position: fixed;*/
	                    /*top: 0;*/
	                    /*height: 250mm;*/
	                    /*width:95%;*/
	                    /*border:1px solid #8c8c8c;*/
	            }
                
                footer{
						/*height: 220px;*/
						/*border:1px solid red;*/
						position: relative;
						bottom: 0;
            width: 95%;
						/*background-color: red;*/
						page-break-inside:avoid; 
					
				}
                
                .table>tbody>tr>td {
	                    padding-top: 1px !important;
	                    padding-bottom: 1px !important;
	                    padding-left: 8px !important;
	                    padding-right: 8px !important;
	
        }
        .print_area{
          page-break-inside:avoid; 
          break-inside: avoid;
          position:relative;
        }
        
        .prevent_break{
          position:relative;
          page-break-inside:avoid; 
          break-inside: avoid !important;
        }
        
       
				
				section{
						margin-top : 10px;
						width: 100%;
						overflow-x: visible !important;
				}
				
				.invoicewrapper{
					position:relative;
        }
        .s1 {
          height: 20mm;
        }
        .s2 {
          height: 37mm;
        }
        .s3 {
          height: 17mm;
        }
        .s4 {
          min-height: 153mm !important;
        }
        .s5 {
          min-height: 13mm !important;
        }
        .s6 {
          min-height: 17mm !important;
        }
        
        .vat_num_padding {
          padding-left: 60mm !important;
        }
        .border_top {
          border: 1px solid #d6d6d6;
				}
        .tyre_num_padding {
          padding-left: 50mm !important;
        }
				/* DivTable.com */
				.divTable{
					display: table;
					width: 100%;
					height: 100%;
				}
				.divTableRow {
					display: table-row;
				}
				.divTableHeading {
					background-color: #EEE;
					display: table-header-group;
				}
				.divTableCell, .divTableHead {
					display: table-cell;
          padding: 0px 2px;
          /*border: 1px solid #d6d6d6;*/
				}
				.divTableHeading {
					background-color: #EEE;
					display: table-header-group;
					font-weight: bold;
				}
				.divTableFoot {
					background-color: #EEE;
					display: table-footer-group;
					font-weight: bold;
				}
				.divTableBody {
          display: table-row-group;
          font-size: 18px;
        }
        .font18 {
          font-size: 18px;
        }

              </style>

            </head>
            <body onload="window.print()">${printContents}</body>
          </html>`);
    popupWin.document.close();
    setTimeout(function () {
      popupWin.close();
    }, 2000);
  }
}
