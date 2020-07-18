import { Component, OnInit, OnDestroy } from "@angular/core";
import { Workshop } from "../workshop.model";
import { WorkshopService } from "../workshop.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-workshop-list",
  templateUrl: "./workshop-list.component.html",
  styleUrls: ["./workshop-list.component.css"],
})
export class WorkshopListComponent implements OnInit, OnDestroy {
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

  ngOnDestroy() {
    this.workshopSubscription.unsubscribe();
  }

  onWorkshopSelected(workshop: Workshop) {
    this.workshopService.setSelectedWorkshop(workshop);
  }
}
