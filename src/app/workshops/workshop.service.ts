import { Injectable } from "@angular/core";
import { Workshop } from "./workshop.model";
import { Subject, Observable } from "rxjs";
import { map, tap, pluck } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class WorkshopService {
  private workshopsEndpoint = "http://localhost:3000/api/workshops";

  private workshops: Workshop[] = [];
  private selectedWorkshop: Workshop;
  private workshopForEdit: Workshop;
  private workshopsUpdated: Subject<Workshop[]> = new Subject<Workshop[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getWorkshopsUpdatedListener(): Observable<Workshop[]> {
    return this.workshopsUpdated.asObservable();
  }

  getWorkshops(): void {
    this.http
      .get<{ message: string; data: any }>(this.workshopsEndpoint)
      .pipe(
        map((res) => {
          return res.data.map((workshop) => {
            return this.normalizeWorkshop(workshop);
          });
        })
      )
      .subscribe((workshops) => {
        this.workshops = workshops;
        this.workshopsUpdated.next(...[this.workshops]);
      });
  }

  getWorkshopsByAttribute(key: string, value: string): Observable<Workshop[]> {
    return this.http
      .get<{ message: string; data: any }>(
        this.workshopsEndpoint + "?" + key + "=" + value
      )
      .pipe(
        map((res) => {
          return res.data.map((workshops) => {
            if (Array.isArray(workshops)) {
              return workshops.map((workshop) =>
                this.normalizeWorkshop(workshop)
              );
            } else {
              return this.normalizeWorkshop(workshops);
            }
          });
        })
      );
  }

  addWorkshop(
    workshop: Workshop
  ): Observable<{ message: string; data: string }> {
    return this.http
      .post<{ message: string; data: string }>(this.workshopsEndpoint, workshop)
      .pipe(
        tap((res) => {
          console.log(res.message);

          workshop.id = res.data;
          this.workshops.push(workshop);
          this.workshopsUpdated.next([...this.workshops]);
        })
      );
  }

  updateWorkshop(id: string, workshop: Workshop): Observable<{ data: any }> {
    return this.http
      .put<{ message: string; data: any }>(
        this.workshopsEndpoint + "/" + id,
        workshop
      )
      .pipe(
        tap((response) => {
          console.log(response.message);

          let workshopIndex = this.workshops.findIndex((w) => w.id == id);
          this.workshops[workshopIndex] = response.data;
          this.workshopsUpdated.next([...this.workshops]);
        }),
        pluck("data")
      );
  }

  deleteWorkshop(id: string): Observable<{ data: any }> {
    return this.http
      .delete<{ message: string; data: any }>(this.workshopsEndpoint + "/" + id)
      .pipe(
        tap((response) => {
          console.log(response.message);

          this.workshops = this.workshops.filter((w) => w.id != id);
          this.workshopsUpdated.next([...this.workshops]);
        }),
        pluck("data")
      );
  }

  setSelectedWorkshop(workshop: Workshop) {
    this.selectedWorkshop = workshop;
  }

  getSelectedWorkshop(): Workshop {
    return this.selectedWorkshop;
  }

  setWorkshopForEdit(workshop: Workshop) {
    this.workshopForEdit = workshop;
  }

  getWorkshopForEdit(): Workshop {
    return this.workshopForEdit;
  }

  normalizeWorkshop(apiWorkshop: any): Workshop {
    return {
      id: apiWorkshop._id,
      title: apiWorkshop.title,
      summary: apiWorkshop.summary,
      address: apiWorkshop.address,
      dateTime: new Date(apiWorkshop.dateTime),
      availablePlaces: apiWorkshop.availablePlaces,
      participants: apiWorkshop.participants,
      slug: apiWorkshop.slug,
    };
  }
}
