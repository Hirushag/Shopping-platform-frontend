import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InventoryReportComponent } from "./inventory-report/inventory-report.component";
import { CalendarModule } from "primeng/components/calendar/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { ConfirmDialogModule } from "primeng/components/confirmdialog/confirmdialog";
import { DropdownModule } from "primeng/components/dropdown/dropdown";
import { ListboxModule } from "primeng/components/listbox/listbox";
import { RouterModule, Routes } from "@angular/router";
import { TableModule } from "primeng/table";
import { SharedModule } from "../../shared/shared.module";
import { ReportMenuComponent } from "./report-menu/report-menu.component";
import { SupplierReportComponent } from "./supplier-report/supplier-report.component";
import { PaymentReportComponent } from "./payment-report/payment-report.component";

const routes: Routes = [
  // paths
  { path: "reports-menu", component: ReportMenuComponent },
  {
    path: "inventory-report/report",
    component: InventoryReportComponent,
  },
  {
    path: "supplier-report/report",

    component: SupplierReportComponent,
  },
  {
    path: "payment-report/report",

    component: PaymentReportComponent,
  },
];
@NgModule({
  imports: [
    SharedModule,
    TableModule,
    CalendarModule,
    // InputMaskModule,
    ConfirmDialogModule,
    DropdownModule,
    ListboxModule,
    RouterModule.forChild(routes),
    CheckboxModule,
  ],
  declarations: [
    InventoryReportComponent,
    SupplierReportComponent,
    ReportMenuComponent,
    PaymentReportComponent,
  ],

  exports: [RouterModule],
})
export class ReportsModule {}
