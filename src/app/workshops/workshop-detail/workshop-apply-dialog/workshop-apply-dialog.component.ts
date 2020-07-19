import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { WorkshopParticipantsService } from "../../workshopParticipant.service";
import { WorkshopParticipant } from "../../workshopParticipant.model";
import { FormControl } from "@angular/forms";
import { Workshop } from "../../workshop.model";

@Component({
  selector: "app-workshop-apply-dialog",
  templateUrl: "./workshop-apply-dialog.component.html",
  styleUrls: ["./workshop-apply-dialog.component.css"],
})
export class WorkshopApplyDialogComponent {
  loading: boolean = false;
  participantAdded: boolean = false;

  fullnameControl: FormControl = new FormControl("");
  emailControl: FormControl = new FormControl("");

  newParticipant: WorkshopParticipant;

  constructor(
    public dialogRef: MatDialogRef<WorkshopApplyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private workshopParticipantsService: WorkshopParticipantsService
  ) {}

  onApplyClicked() {
    this.loading = true;

    const participant: WorkshopParticipant = {
      id: null,
      fullname: this.data.fullname,
      email: this.data.email,
      workshop: this.data.workshopid,
    };

    this.workshopParticipantsService
      .addWorkshopParticipant(participant)
      .subscribe((result) => {
        this.participantAdded = true;
        this.loading = false;

        console.log(result.message);
        participant.id = result.data;
        this.newParticipant = participant;
        // setTimeout(() => {
        //   this.dialogRef.close(participant);
        // }, 2000);
      });
  }
}
