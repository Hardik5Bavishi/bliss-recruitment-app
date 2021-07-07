import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Services
import { QuestionsService } from '../service/questions.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  showTryAgainButton: boolean;

  constructor(private _questionsService: QuestionsService, private _router: Router) { }

  ngOnInit(): void {
    // Added setTimeout() to see loading screen for while....
    setTimeout(() => {
      this.getHealth();
    }, 1000);
  }


  ngOnDestroy() {
    // Unsubscribe all the subscriptions to avoid memory leak...
    this.subscriptions.map(sub => sub.unsubscribe());
  }

  // load the health data
  getHealth() {
    this.showTryAgainButton = false;
    const getSubscription = this._questionsService.getHealth().subscribe((res: any) => {
      const status = res?.status;
      if (status && status === 'OK') {
        this._router.navigate(['questions']);
      } else {
        this.showTryAgainButton = true;
      }
    }, error => {
      this.showTryAgainButton = true;
    });
    this.subscriptions.push(getSubscription);
  }

}
