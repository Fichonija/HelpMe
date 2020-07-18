import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-workshop-apply-dialog",
  templateUrl: "./workshop-apply-dialog.component.html",
  styleUrls: ["./workshop-apply-dialog.component.css"],
})
export class WorkshopApplyDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<WorkshopApplyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onApplyClicked() {
    this.dialogRef.close({
      fullname: this.data.fullname,
      email: this.data.email,
    });
  }
}
