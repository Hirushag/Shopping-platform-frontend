import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {TableModule} from 'primeng/table';
import {DataTableModule} from 'primeng/components/datatable/datatable';
import {CalendarModule} from 'primeng/components/calendar/calendar';
import {ConfirmDialogModule} from 'primeng/components/confirmdialog/confirmdialog';
import {DropdownModule} from 'primeng/components/dropdown/dropdown';
import {ListboxModule} from 'primeng/components/listbox/listbox';
import {FileUploadModule} from 'primeng/fileupload';
import { EditFeedbackComponent } from './edit-feedback/edit-feedback.component';
import { FeedbackSummaryComponent } from './feedback-summary/feedback-summary.component';



const routes: Routes = [
  // Inventory Paths
  { path: "feedback/add", component: AddFeedbackComponent },
  { path: "feedback/edit/:id", component: EditFeedbackComponent },
  { path: "feedback/summary", component: FeedbackSummaryComponent },
];

@NgModule({
  imports: [
    CommonModule,
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
  declarations: [AddFeedbackComponent, EditFeedbackComponent, FeedbackSummaryComponent],
  exports: [RouterModule],
})
export class FeedbackModule { }
