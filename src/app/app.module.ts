import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { JeopardyService } from "src/services/getQuestions";
import { HttpClientModule } from "@angular/common/http";
import { JeoQuestions } from 'src/questions/questions.component';


@NgModule({
    declarations: [AppComponent, JeoQuestions],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [JeopardyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
