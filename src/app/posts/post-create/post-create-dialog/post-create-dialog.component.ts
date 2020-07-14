import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-post-create-dialog",
  templateUrl: "./post-create-dialog.component.html",
})
export class PostCreateDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PostCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
