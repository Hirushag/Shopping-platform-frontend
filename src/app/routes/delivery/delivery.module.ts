import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliverySummaryComponent } from './delivery-summary/delivery-summary.component';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryDetalComponent } from './delivery-detal/delivery-detal.component';
import { SharedModule } from '../../shared/shared.module';
import { TableModule } from 'primeng/table';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { ListboxModule } from 'primeng/components/listbox/listbox';
import { FileUploadModule } from 'primeng/fileupload';


const routes: Routes = [
  // Inventory Paths
  { path: "delivery/summary", component: DeliverySummaryComponent },
  { path: "delivery/detail/:id", component: DeliveryDetalComponent },
  
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,

    TableModule,
    DataTableModule,
    CalendarModule,
    ConfirmDialogModule,
    DropdownModule,
    ListboxModule,
    FileUploadModule,
    RouterModule.forChild(routes),
  ],
  declarations: [DeliverySummaryComponent, DeliveryDetalComponent],
  exports: [RouterModule],
})
export class DeliveryModule { }
