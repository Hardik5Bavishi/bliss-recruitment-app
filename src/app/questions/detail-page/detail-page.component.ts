import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuestionsService } from '../service/questions.service';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit, OnDestroy {
  questionId: any;
  questionDetails: any;
  isInProgress: boolean = true;
  answer: string;
  subscriptions: Subscription[] = [];

  constructor(private _questionsService: QuestionsService,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog,
    private _router: Router
  ) { }

  ngOnInit(): void {
    const routeSubscription = this._route.params
      .subscribe(
        (params: Params) => {
          this.questionId = +params['id'];
          this.getQuestionDetail();

        }
      );
    this.subscriptions.push(routeSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.map(e => e.unsubscribe());
  }

  getQuestionDetail(): void {
    const getSubscription = this._questionsService.getQuestionDetail(this.questionId).subscribe((res: any) => {
      if (res) {
        this.questionDetails = res;
      }
      this.isInProgress = false;
    }, error => {
      this.isInProgress = false;
    });
    this.subscriptions.push(getSubscription);
  }

  submit() {
    this.questionDetails.choices.map(e => e.choice === this.answer ? e.votes += 1 : e.votes += 0);
    const updateSubscription = this._questionsService.updateQuestion(this.questionDetails).subscribe(res => {
      if (res) {
        this._snackBar.open('Answer Submitted Successfully', 'Cancel', { verticalPosition: 'top' });
        this.back();
      }
    }, error => {
      this._snackBar.open('Oops! Something Went Wrong..', 'Try Again', {
        verticalPosition: 'top'
      });
    });

    this.subscriptions.push(updateSubscription);
  }

  openDialog() {
    const dialogRef = this._dialog.open(ShareDialogComponent, {
      width: '400px',
      height: '250px',
      position: { top: '100px' },
      panelClass: 'custom-modalbox'
    })
    const dialogSubscription = dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this._snackBar.open('Content Shared Successfully', 'Close', {
          verticalPosition: 'top'
        });
      }
    });
    this.subscriptions.push(dialogSubscription);
  }

  back() {
    this._router.navigate(['/']);
  }
}
