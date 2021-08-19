import { NgModule } from "@angular/core";
import { ClientAddComponent } from "./client-add/client-add.component";
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
import { ClientEditComponent } from "./client-edit/client-edit.component";


const routes: Routes = [

  // Client paths
  { path: "summary", component: ClientSummaryComponent },
  { path: "detail/:id", component: ClientDetailComponent },
  { path: "add", component: ClientAddComponent },
  { path: "edit/:id", component: ClientEditComponent },
];
@NgModule({
  declarations: [ClientAddComponent, ClientSummaryComponent, ClientDetailComponent, ClientEditComponent],
  imports: [
    SharedModule,
    TableModule,
    DataTableModule,
    CalendarModule,
    // InputMaskModule,
    ConfirmDialogModule,
    DropdownModule,
    ListboxModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClientsModule { }
