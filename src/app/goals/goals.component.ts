import { Component, OnInit } from "@angular/core";
import {
  MatVerticalStepper,
  MatHorizontalStepper,
} from "@angular/material/stepper";

@Component({
  selector: "app-goals",
  templateUrl: "./goals.component.html",
  styleUrls: ["./goals.component.css"],
})
export class GoalsComponent implements OnInit {
  public isLinear: boolean = false;
  public page: string = "";

  public goal: string = "";
  public specific: string = "";
  public measurable: string = "";
  public achievable: string = "";
  public relevant: string = "";
  public timebound: string = "";

  ngOnInit() {
    this.reset();
  }

  showPage(page: string) {
    this.page = page;
  }

  reset(startOnPage = "introduction") {
    this.showPage(startOnPage);

    this.goal = "";
    this.specific = "";
    this.measurable = "";
    this.achievable = "";
    this.relevant = "";
    this.timebound = "";
  }
}
