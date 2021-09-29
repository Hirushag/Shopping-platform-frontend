import { NgModule } from "@angular/core";

import { ListboxModule } from "primeng/components/listbox/listbox";
import { DropdownModule } from "primeng/components/dropdown/dropdown";
import { ConfirmDialogModule } from "primeng/components/confirmdialog/confirmdialog";
import { CalendarModule } from "primeng/components/calendar/calendar";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { TableModule } from "primeng/table";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { ClientSummaryComponent } from "./client-summary/client-summary.component";
import { ClientDetailComponent } from "./client-detail/client-detail.component";

const routes: Routes = [
  // Client paths
  { path: "summary", component: ClientSummaryComponent },
  { path: "detail/:id", component: ClientDetailComponent },
];
@NgModule({
  declarations: [ClientSummaryComponent, ClientDetailComponent],
  imports: [
    SharedModule,
    TableModule,
    DataTableModule,
    CalendarModule,
    // InputMaskModule,
    ConfirmDialogModule,
    DropdownModule,
    ListboxModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ClientsModule {}
