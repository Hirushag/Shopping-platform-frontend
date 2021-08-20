import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { TableModule } from "primeng/table";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { CalendarModule } from "primeng/components/calendar/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { ConfirmDialogModule } from "primeng/components/confirmdialog/confirmdialog";
import { DropdownModule } from "primeng/components/dropdown/dropdown";
import { ListboxModule } from "primeng/components/listbox/listbox";
import { RouterModule, Routes } from "@angular/router";
import { PaymentSummaryComponent } from "./payment-summary/payment-summary.component";
import { PaymentDetailComponent } from "./payment-detail/payment-detail.component";

const routes: Routes = [
  // payments paths
  { path: "detail/:id", component: PaymentDetailComponent },
  { path: "summary", component: PaymentSummaryComponent },
];
@NgModule({
  declarations: [PaymentSummaryComponent, PaymentDetailComponent],
  imports: [
    SharedModule,
    TableModule,
    DataTableModule,
    CalendarModule,
    // InputMaskModule,
    CheckboxModule,
    ConfirmDialogModule,
    DropdownModule,
    ListboxModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class PaymentsModule {}
