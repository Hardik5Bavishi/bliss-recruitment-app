import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { QuestionsService } from '../service/questions.service';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialogComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  shareSubscription: any;

  constructor(public dialogRef: MatDialogRef<ShareDialogComponent>,
    private _questionsService: QuestionsService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.shareSubscription) {
      this.shareSubscription.unsubscribe();
    }
  }

  share() {
    const email = this.emailFormControl.value;
    const url = window.location.href;
    this.shareSubscription = this._questionsService.shareContent(email, url).subscribe(res => {
      if (res) this.dialogRef.close(true);
    }, error => {
      this._snackBar.open('Oops! Something Went Wrong..', 'Try Again', {
        verticalPosition: 'top'
      });
    });
  }

}
