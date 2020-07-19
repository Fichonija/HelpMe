import { Injectable } from "@angular/core";
import { Workshop } from "./workshop.model";
import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class WorkshopService {
  private workshopsEndpoint = "http://localhost:3000/api/workshops";

  private workshops: Workshop[] = [];
  private selectedWorkshop: Workshop;
  private workshopsUpdated: Subject<Workshop[]> = new Subject<Workshop[]>();

  constructor(private http: HttpClient) {}

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
        console.log(workshops);
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

  setSelectedWorkshop(workshop: Workshop) {
    this.selectedWorkshop = workshop;
  }

  getSelectedWorkshop(): Workshop {
    return this.selectedWorkshop;
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