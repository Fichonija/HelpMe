import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

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
    workshopAvailablePlaces: new FormControl(""),
    workshopSlug: new FormControl(""),
  });

  onSaveWorkshop() {}
}
