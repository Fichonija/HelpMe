import { Component, OnInit } from "@angular/core";
import { Workshop } from "../workshop.model";
import { WorkshopService } from "../workshop.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { WorkshopApplyDialogComponent } from "./workshop-apply-dialog/workshop-apply-dialog.component";

@Component({
  selector: "app-workshop-detail",
  templateUrl: "./workshop-detail.component.html",
  styleUrls: ["./workshop-detail.component.css"],
})
export class WorkshopDetailComponent implements OnInit {
  loading: boolean = false;

  workshop: Workshop;
  slug: string;

  constructor(
    private workshopService: WorkshopService,
    public workshopApplyDialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.slug = paramMap.get("slug");
    });
  }

  ngOnInit() {
    this.loading = true;
    this.workshop = this.workshopService.getSelectedWorkshop();
    if (this.workshop == null) {
      this.workshopService
        .getWorkshopsByAttribute("slug", this.slug)
        .subscribe((workshops: Workshop[]) => {
          this.loading = false;
          this.workshop = workshops.pop();
        });
    } else {
      this.loading = false;
    }
  }

  onApplyToWorkshop(): void {
    const dialogRef = this.workshopApplyDialog.open(
      WorkshopApplyDialogComponent,
      {
        data: {
          workshopid: this.workshop.id,
          workshopTitle: this.workshop.title,
        },
      }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.workshop.participants.push(result);
      }
    });
  }
}
