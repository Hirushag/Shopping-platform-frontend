import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliverySummaryComponent } from './delivery-summary/delivery-summary.component';
import { Routes } from '@angular/router';


const routes: Routes = [
  // Inventory Paths
  { path: "delivery/summary", component: DeliverySummaryComponent },
  
];
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DeliverySummaryComponent]
})
export class DeliveryModule { }
