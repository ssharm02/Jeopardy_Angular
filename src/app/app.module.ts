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
import { NgZorroAntdModule, NZ_ICONS } from "ng-zorro-antd";
import { IconDefinition } from "@ant-design/icons-angular";
import { AppComponent } from "./app.component";
import * as AllIcons from "@ant-design/icons-angular/icons";
import { NZ_I18N, en_US } from "ng-zorro-antd";
import { NgCircleProgressModule } from "ng-circle-progress";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
  { path: "", component: LogMeIn },
  { path: "jeopardyBoard", component: JeoQuestions },
  { path: "userScore", component: ScoreComponent },
  { path: "dailyD", component: DailyDComponent }
  // following has to be the last path nofound component
  // { path: '**', component: NotFoundComponent }
];
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  key => antDesignIcons[key]
);

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
    NgbModule,
    HttpClientModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    AtomSpinnerModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 8,
      innerStrokeWidth: 8,
      showUnits: false,
      showSubtitle: false,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    JeopardyService,
    UserInfoService,
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
