import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { AuthenticationService } from '../../../core/_services/authentication.service';
import { FeedbackService } from '../../../core/_services/feedback.service';
const swal = require("sweetalert");
@Component({
  selector: 'app-feedback-summary',
  templateUrl: './feedback-summary.component.html',
  styleUrls: ['./feedback-summary.component.scss']
})
export class FeedbackSummaryComponent implements OnInit {
  sysuser: any;
  LoadUI: boolean = false;
  feedback: any;
  feedbacklist: any;
  show_edit: boolean = false;
  feedback_id: any;
  edit_feedback: any;
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: "toast-bottom-right",
    showCloseButton: true,
  });
  constructor(
    private authservice: AuthenticationService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private feedbackservice: FeedbackService
  ) { }

  ngOnInit() {
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;

      console.log(this.sysuser);
    });

    this.getAllFeedbacks();
  }

  addFeedback() {
    this.feedbackservice
      .addFeedback({ feedback: this.feedback })
      .subscribe((data) => {
        if (data.status) {
          swal("Done!", "Feedback Successfully added", "success");

          this.feedback = null;
          this.getAllFeedbacks();
        }
      });
  }

  getAllFeedbacks() {
    this.feedbackservice.getFeedbacks().subscribe((data) => {
      this.feedbacklist = data;
    });
  }

  editFeedbacks(id, feedback) {
    console.log(feedback);
    this.show_edit = true;
    this.feedback_id = id;
    this.edit_feedback = feedback;
  }

  editFeedback() {
    var obj = {
      id: this.feedback_id,
      feedback: this.edit_feedback,
    };
    this.feedbackservice.editFeedbacks(obj).subscribe((data) => {
      if (data.status) {
        swal("Done!", "Feedback Successfully Updated", "success");
        this.edit_feedback = null;
        this.show_edit = false;
        this.getAllFeedbacks();
      }
    });
  }

  deleteFeedback(id) {
    this.feedbackservice.deleteFeedbacks({ id: id }).subscribe((data) => {
      if (data.status) {
        swal("Done!", "Feedback Successfully Deleted", "success");

        this.getAllFeedbacks();
      }
    });
  }

}
