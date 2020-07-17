import { Component, OnInit } from "@angular/core";
import { Workshop } from "../workshop.model";
import { WorkshopService } from "../workshop.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-workshop-list",
  templateUrl: "./workshop-list.component.html",
  styleUrls: ["./workshop-list.component.css"],
})
export class WorkshopListComponent implements OnInit {
  loading: boolean = false;

  workshops: Workshop[];
  workshopSubscription: Subscription;

  constructor(private workshopService: WorkshopService) {}

  ngOnInit() {
    this.loading = true;

    this.workshopService.getWorkshops();
    this.workshopSubscription = this.workshopService
      .getWorkshopsUpdatedListener()
      .subscribe((workshops: Workshop[]) => {
        this.workshops = workshops;
        this.loading = false;
      });
  }

  onWorkshopSelected(workshop: Workshop) {}
}
