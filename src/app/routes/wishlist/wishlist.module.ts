import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WishlistSummaryComponent } from "./wishlist-summary/wishlist-summary.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { TableModule } from "primeng/table";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { CalendarModule } from "primeng/components/calendar/calendar";
import { ConfirmDialogModule } from "primeng/components/confirmdialog/confirmdialog";
import { DropdownModule } from "primeng/components/dropdown/dropdown";
import { ListboxModule } from "primeng/components/listbox/listbox";
import { FileUploadModule } from "primeng/fileupload";
import { EditorModule } from "primeng/editor";

const routes: Routes = [
  { path: "wishlist/summary", component: WishlistSummaryComponent },
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TableModule,
    DataTableModule,
    CalendarModule,
    // TreeModule,
    ConfirmDialogModule,
    DropdownModule,
    ListboxModule,
    FileUploadModule,
    RouterModule.forChild(routes),
    EditorModule,
  ],
  declarations: [WishlistSummaryComponent],
  exports: [RouterModule],
})
export class WishlistModule {}
