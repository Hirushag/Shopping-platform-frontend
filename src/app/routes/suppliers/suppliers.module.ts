import { NgModule } from '@angular/core';

import { SupplierSummaryComponent } from './supplier-summary/supplier-summary.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {TableModule} from 'primeng/table';
import {DataTableModule} from 'primeng/components/datatable/datatable';
import {CalendarModule} from 'primeng/components/calendar/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {ConfirmDialogModule} from 'primeng/components/confirmdialog/confirmdialog';
import {DropdownModule} from 'primeng/components/dropdown/dropdown';
import {ListboxModule} from 'primeng/components/listbox/listbox';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { EditSupplierComponent } from './edit-supplier/edit-supplier.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';



const routes: Routes = [
  // payments paths
  { path: "summary", component: SupplierSummaryComponent },
  { path: "add", component: AddSupplierComponent },
  { path: "detail/:id", component: SupplierDetailComponent },
  { path: "edit/:id", component: EditSupplierComponent },
];
@NgModule({
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
  declarations: [SupplierSummaryComponent, AddSupplierComponent, EditSupplierComponent, SupplierDetailComponent],
  exports: [RouterModule],
})
export class SuppliersModule { }
