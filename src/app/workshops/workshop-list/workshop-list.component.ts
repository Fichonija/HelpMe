import { Component, OnInit, OnDestroy } from "@angular/core";
import { Workshop } from "../workshop.model";
import { WorkshopService } from "../workshop.service";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { AdminCrudDialogComponent } from "src/app/utility/dialogs/admin-crud-dialog.component";

@Component({
  selector: "app-workshop-list",
  templateUrl: "./workshop-list.component.html",
  styleUrls: ["./workshop-list.component.css"],
})
export class WorkshopListComponent implements OnInit, OnDestroy {
  public loading: boolean = false;

  private authSubscription: Subscription;
  public userAuthenticated: boolean = false;

  workshops: Workshop[];
  workshopSubscription: Subscription;

  constructor(
    private workshopService: WorkshopService,
    private authService: AuthService,
    public workshopDeleteDialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.getAuthInfo();

    this.workshopService.getWorkshops();
    this.workshopSubscription = this.workshopService
      .getWorkshopsUpdatedListener()
      .subscribe((workshops: Workshop[]) => {
        this.workshops = workshops;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.workshopSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

  getAuthInfo() {
    this.userAuthenticated = this.authService.getIsAuthenticated();
    this.authSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userAuthenticated = isAuthenticated;
      });
  }

  onWorkshopSelected(workshop: Workshop) {
    this.workshopService.setSelectedWorkshop(workshop);
  }

  onWorkshopEdit(workshop: Workshop) {
    this.workshopService.setWorkshopForEdit(workshop);
    this.router.navigate(["workshops", "edit"]);
  }

  onWorkshopDelete(workshop: Workshop) {
    const dialogRef = this.workshopDeleteDialog.open(AdminCrudDialogComponent, {
      width: "500px",
      data: {
        title: "Delete Workshop?",
        action: "delete workshop",
        model: { title: workshop.title },
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loading = true;
        this.workshopService
          .deleteWorkshop(workshop.id)
          .subscribe((response) => {
            this.loading = false;
            console.log(response);
          });
      }
    });
  }
}
