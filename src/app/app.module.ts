import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { JeopardyService } from "src/services/getQuestions";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";

import { JeoQuestions } from "src/questions/questions.component";
import { LogMeIn } from "src/login/login.component";
import { ScoreComponent } from 'src/score/score.component';
import { DailyDComponent } from 'src/dailyDoube/dailyD.component';
import { UserInfoService } from 'src/services/getUserInfo';


const appRoutes: Routes = [
  { path: "", component: LogMeIn },
  { path: "jeoQuestionsx", component: JeoQuestions }
  // following has to be the last path nofound component
  // { path: '**', component: NotFoundComponent }
];
@NgModule({
  declarations: [AppComponent, LogMeIn, JeoQuestions, ScoreComponent, DailyDComponent],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
  providers: [JeopardyService, UserInfoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
