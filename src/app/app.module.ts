import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { AtomSpinnerModule } from "angular-epic-spinners";
import { DailyDComponent } from "src/dailyDoube/dailyD.component";
import { LogMeIn } from "src/login/login.component";
import { JeoQuestions } from "src/questions/questions.component";
import { ScoreComponent } from "src/score/score.component";
import { JeopardyService } from "src/services/getQuestions";
import { UserInfoService } from "src/services/getUserInfo";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";

const appRoutes: Routes = [
  { path: "", component: LogMeIn },
  { path: "jeopardyBoard", component: JeoQuestions },
  { path: "userScore", component: ScoreComponent },
  { path: "dailyD", component: DailyDComponent }
  // following has to be the last path nofound component
  // { path: '**', component: NotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LogMeIn,
    JeoQuestions,
    ScoreComponent,
    DailyDComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    AtomSpinnerModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [JeopardyService, UserInfoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
