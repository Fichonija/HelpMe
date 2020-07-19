import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { WorkshopService } from "../workshop.service";
import { MatDialog } from "@angular/material/dialog";
import { AdminCrudDialogComponent } from "src/app/utility/dialogs/admin-crud-dialog.component";
import { Workshop } from "../workshop.model";
import { ActivatedRoute, UrlSegment } from "@angular/router";

@Component({
  selector: "app-workshop-create",
  templateUrl: "./workshop-create.component.html",
  styleUrls: ["./workshop-create.component.css"],
})
export class WorkshopCreateComponent implements OnInit {
  loading: boolean = false;
  workshopCreated: boolean = false;

  actionType: string;
  workshopForEdit: Workshop;

  dialogTitle: string;
  dialogAction: string;

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
    public workshopCreateDialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.url.subscribe((urlSegments: UrlSegment[]) => {
      this.actionType = urlSegments.pop().path;
      if (this.actionType == "edit") {
        this.workshopForEdit = this.workshopService.getWorkshopForEdit();
        this.dialogTitle = "Update Workshop?";
        this.dialogAction = "update workshop";

        this.workshopForm.setValue({
          workshopTitle: this.workshopForEdit.title,
          workshopSummary: this.workshopForEdit.summary,
          workshopAddress: this.workshopForEdit.address,
          workshopDateTime: this.getIsoDateTimeWithOffset(
            this.workshopForEdit.dateTime
          ),
          workshopAvailablePlaces: this.workshopForEdit.availablePlaces,
          workshopSlug: this.workshopForEdit.slug,
        });
      } else if (this.actionType == "create") {
        this.dialogTitle = "Add new Workshop?";
        this.dialogAction = "add new workshop";
      }
    });
  }

  onSaveWorkshop() {
    const dialogRef = this.workshopCreateDialog.open(AdminCrudDialogComponent, {
      width: "500px",
      data: {
        title: this.dialogTitle,
        action: this.dialogAction,
        model: { title: this.workshopForm.value.workshopTitle },
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.actionType == "create") {
          this.createNewWorkshop();
        } else if (this.actionType == "edit") {
          this.editSelectedWorkshop();
        }
      }
    });
  }

  private createNewWorkshop() {
    this.loading = true;
    let newWorkshop: Workshop = {
      id: "",
      title: this.workshopForm.get("workshopTitle").value,
      summary: this.workshopForm.get("workshopSummary").value,
      address: this.workshopForm.get("workshopAddress").value,
      dateTime: new Date(this.workshopForm.get("workshopDateTime").value),
      availablePlaces: this.workshopForm.get("workshopAvailablePlaces").value,
      participants: [],
      slug: this.workshopForm.get("workshopSlug").value,
    };
    this.workshopService.addWorkshop(newWorkshop).subscribe((res) => {
      this.workshopCreated = true;
      this.loading = false;
    });
  }

  editSelectedWorkshop() {
    this.loading = true;
    let editedWorkshop: Workshop = {
      id: "",
      title: this.workshopForm.get("workshopTitle").value,
      summary: this.workshopForm.get("workshopSummary").value,
      address: this.workshopForm.get("workshopAddress").value,
      dateTime: new Date(this.workshopForm.get("workshopDateTime").value),
      availablePlaces: this.workshopForm.get("workshopAvailablePlaces").value,
      participants: [],
      slug: this.workshopForm.get("workshopSlug").value,
    };
    this.workshopService
      .updateWorkshop(this.workshopForEdit.id, editedWorkshop)
      .subscribe((res) => {
        this.workshopCreated = true;
        this.loading = false;
      });
  }

  getIsoDateTimeWithOffset(workshopDateTime: Date): string {
    let offset = new Date().getTimezoneOffset() * 60000;
    let localIsoDateTime = new Date(workshopDateTime.valueOf() - offset)
      .toISOString()
      .slice(0, 16);
    return localIsoDateTime;
  }
}
