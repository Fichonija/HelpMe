import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-admin-crud-dialog",
  templateUrl: "./admin-crud-dialog.component.html",
})
export class AdminCrudDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AdminCrudDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
