import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: LoadingComponent
  },
  {
    path: 'questions',
    component: QuestionsListComponent
  },
  {
    path: 'questions/:id',
    component: DetailPageComponent
  },
];

@NgModule({
  declarations: [LoadingComponent, QuestionsListComponent, DetailPageComponent, ShareDialogComponent],
  entryComponents: [ShareDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class QuestionsModule { }
