import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, UrlSegment } from "@angular/router";

import { WorkshopService } from "../workshop.service";
import { Workshop } from "../workshop.model";
import { getIsoDateTimeWithOffset } from "../../utility/helpers/dateTimeHelpers";
import { AdminCrudDialogComponent } from "src/app/utility/dialogs/admin-crud-dialog.component";

@Component({
  selector: "app-workshop-create",
  templateUrl: "./workshop-create.component.html",
  styleUrls: ["./workshop-create.component.css"],
})
export class WorkshopCreateComponent implements OnInit {
  loading: boolean = false;
  workshopCreatedOrEdited: boolean = false;
  successMessage: string;

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
          workshopDateTime: getIsoDateTimeWithOffset(
            this.workshopForEdit.dateTime
          ),
          workshopAvailablePlaces: this.workshopForEdit.availablePlaces,
          workshopSlug: this.workshopForEdit.slug,
        });
      } else if (this.actionType == "create") {
        this.dialogTitle = "Create new Workshop?";
        this.dialogAction = "create new workshop";
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
      this.successMessage = "Workshop successfuly created!";
      this.workshopCreatedOrEdited = true;
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
        console.log(res);

        this.successMessage = "Workshop successfuly edited!";
        this.workshopCreatedOrEdited = true;
        this.loading = false;
      });
  }
}
