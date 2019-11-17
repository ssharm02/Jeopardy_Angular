import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { JeopardyService } from "src/services/getQuestions";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from '@angular/router';

import { JeoQuestions } from 'src/questions/questions.component';
import { LogMeIn } from 'src/login/login.component';

const appRoutes: Routes = [
  { path: '', component: LogMeIn },
  { path: 'jeoQuestionsx', component: JeoQuestions},
  // following has to be the last path nofound component
  // { path: '**', component: NotFoundComponent }
];
@NgModule({
  declarations: [AppComponent, LogMeIn, JeoQuestions],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
  providers: [JeopardyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
