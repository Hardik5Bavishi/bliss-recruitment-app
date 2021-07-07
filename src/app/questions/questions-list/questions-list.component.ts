import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { QuestionsService } from '../service/questions.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements AfterViewInit, OnDestroy {

  @ViewChild('searchInput', { read: ElementRef, static: false }) searchInput: ElementRef;

  subscriptions: Subscription[] = [];
  dataSource: any[] = [];
  searchQuery: any;
  limit: number = 10;
  offset: number = 10;
  isInProgress: boolean = true;
  filterParamPresent: any;

  constructor(private _questionsService: QuestionsService,
    private _route: ActivatedRoute,
    private el: ElementRef
  ) {

    this._route.queryParams.subscribe(params => {
      if ('filter' in params) {
        this.searchQuery = params['filter'];
        this.filterParamPresent = true;
      } else {
        this.filterParamPresent = false;
      }
      this.limit = params['limit'] ? params['limit'] : 10;
      this.offset = params['offset'] ? params['offset'] : 10;
    });
  }

  ngAfterViewInit() {
    this.loadQuestions();
  }

  ngOnDestroy() {
    this.subscriptions.map(e => e.unsubscribe());
  }

  loadQuestions() {
    this.isInProgress = true;
    if (this.filterParamPresent && !this.searchQuery) {
      this.searchInput.nativeElement.classList.add('input-focus');
    } else {
      this.searchInput.nativeElement.classList.remove('input-focus');
    }
    const getSubscription = this._questionsService.getQuestionsList(this.limit, this.offset, this.searchQuery).subscribe((res: any) => {
      if (res) {
        this.dataSource = res;
        this.isInProgress = false;
      }
    });
    this.subscriptions.push(getSubscription);
  }

  resetFilter() {
    this.searchQuery = '';
    this.loadQuestions();
  }

  loadMoreData() {
    this.limit += 10;
    this.loadQuestions();
  }

}
