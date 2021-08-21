import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { ConfirmDialogModule } from "primeng/components/confirmdialog/confirmdialog";
import { CalendarModule } from "primeng/components/calendar/calendar";
import { DropdownModule } from "primeng/components/dropdown/dropdown";
import { ListboxModule } from "primeng/components/listbox/listbox";
import { TableModule } from "primeng/table";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { InventorySummaryComponent } from "./inventory-summary/inventory-summary.component";
import { InventoryAddComponent } from "./inventory-add/inventory-add.component";
import { InventoryEditComponent } from "./inventory-edit/inventory-edit.component";
import { InventoryDetailComponent } from "./inventory-detail/inventory-detail.component";
import { FileUploadModule } from "primeng/fileupload";

const routes: Routes = [
  // Inventory Paths
  { path: "inventory/summary", component: InventorySummaryComponent },
  { path: "inventory/add", component: InventoryAddComponent },
  { path: "inventory/edit/:id", component: InventoryEditComponent },
  { path: "inventory/detail/:id", component: InventoryDetailComponent },
];

@NgModule({
  imports: [
    SharedModule,

    TableModule,
    DataTableModule,
    CalendarModule,
    // InputMaskModule,
    ConfirmDialogModule,
    DropdownModule,
    ListboxModule,
    FileUploadModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    InventorySummaryComponent,
    InventoryAddComponent,
    InventoryEditComponent,
    InventoryDetailComponent,
  ],
  exports: [RouterModule],
})
export class InventoryModule {}
