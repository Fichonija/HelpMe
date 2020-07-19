import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-workshop-create",
  templateUrl: "./workshop-create.component.html",
  styleUrls: ["./workshop-create.component.css"],
})
export class WorkshopCreateComponent {
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

  onSaveWorkshop() {}
}
