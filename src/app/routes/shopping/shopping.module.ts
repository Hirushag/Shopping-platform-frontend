import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { ConfirmDialogModule } from "primeng/components/confirmdialog/confirmdialog";
import { CalendarModule } from "primeng/components/calendar/calendar";
import { DropdownModule } from "primeng/components/dropdown/dropdown";
import { ListboxModule } from "primeng/components/listbox/listbox";
import { TableModule } from "primeng/table";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { FileUploadModule } from "primeng/fileupload";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const routes: Routes = [{ path: "summary", component: ShoppingListComponent }];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,

    TableModule,
    DataTableModule,
    CalendarModule,
    ConfirmDialogModule,
    DropdownModule,
    RouterModule.forChild(routes),
    FileUploadModule,
    ListboxModule,
  ],
  declarations: [ShoppingListComponent],
  exports: [RouterModule],
})
export class ShoppingModule {}
