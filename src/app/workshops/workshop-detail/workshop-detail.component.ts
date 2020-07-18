import { Component, OnInit } from "@angular/core";
import { Workshop } from "../workshop.model";
import { WorkshopService } from "../workshop.service";

@Component({
  selector: "app-workshop-detail",
  templateUrl: "./workshop-detail.component.html",
  styleUrls: ["./workshop-detail.component.css"],
})
export class WorkshopDetailComponent implements OnInit {
  loading: boolean = false;

  workshop: Workshop;

  constructor(private workshopService: WorkshopService) {}

  ngOnInit() {
    this.loading = true;
    this.workshop = this.workshopService.getSelectedWorkshop();
    this.loading = false;
  }
}
