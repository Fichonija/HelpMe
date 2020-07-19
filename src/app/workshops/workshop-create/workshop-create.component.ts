import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { WorkshopService } from "../workshop.service";
import { MatDialog } from "@angular/material/dialog";
import { AdminCrudDialogComponent } from "src/app/utility/dialogs/admin-crud-dialog.component";
import { Workshop } from "../workshop.model";

@Component({
  selector: "app-workshop-create",
  templateUrl: "./workshop-create.component.html",
  styleUrls: ["./workshop-create.component.css"],
})
export class WorkshopCreateComponent {
  loading: boolean = false;
  workshopCreated: boolean = false;

  workshopForm: FormGroup = new FormGroup({
    workshopTitle: new FormControl(""),
    workshopSummary: new FormControl(""),
    workshopAddress: new FormControl(""),
    workshopDateTime: new FormControl(""),
    workshopAvailablePlaces: new FormControl("", [
      Validators.min(1),
      Validators.max(100),
      Validators.required,
    ]),
    workshopSlug: new FormControl(""),
  });

  constructor(
    private workshopService: WorkshopService,
    public workshopCreateDialog: MatDialog
  ) {}

  onSaveWorkshop() {
    const dialogRef = this.workshopCreateDialog.open(AdminCrudDialogComponent, {
      width: "500px",
      data: {
        title: "Add new Workshop?",
        action: "add new workshop",
        model: { title: this.workshopForm.value.workshopTitle },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loading = true;

        let newWorkshop: Workshop = {
          id: "",
          title: this.workshopForm.get("workshopTitle").value,
          summary: this.workshopForm.get("workshopSummary").value,
          address: this.workshopForm.get("workshopAddress").value,
          dateTime: new Date(this.workshopForm.get("workshopDateTime").value),
          availablePlaces: this.workshopForm.get("workshopAvailablePlaces")
            .value,
          participants: [],
          slug: this.workshopForm.get("workshopSlug").value,
        };
        this.workshopService.addWorkshop(newWorkshop).subscribe((res) => {
          this.workshopCreated = true;
          this.loading = false;
        });
      }
    });
  }
}
