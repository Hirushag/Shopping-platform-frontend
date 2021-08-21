import { UserDetailComponent } from "./user-detail/user-detail.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { ConfirmDialogModule } from "primeng/components/confirmdialog/confirmdialog";
import { CalendarModule } from "primeng/components/calendar/calendar";
import { DropdownModule } from "primeng/components/dropdown/dropdown";
import { ListboxModule } from "primeng/components/listbox/listbox";
import { TableModule } from "primeng/table";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { UserAddComponent } from "./user-add/user-add.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserSummaryComponent } from "./user-summary/user-summary.component";

import { DndModule } from "ng2-dnd";
import { CategorySummaryComponent } from "./category-summary/category-summary.component";


const routes: Routes = [
  // // System User paths
  { path: "users/summary", component: UserSummaryComponent },
  { path: "users/detail/:id", component: UserDetailComponent },
  { path: "users/add", component: UserAddComponent },
  { path: "users/edit/:id", component: UserEditComponent },
  { path: "inventory/categories", component: CategorySummaryComponent },
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
    DndModule.forRoot(),
    RouterModule.forChild(routes),
  ],
  declarations: [
    UserAddComponent,
    UserEditComponent,
    UserSummaryComponent,
    UserDetailComponent,
    CategorySummaryComponent
  ],
  exports: [RouterModule],
})
export class SettingsModule {}
