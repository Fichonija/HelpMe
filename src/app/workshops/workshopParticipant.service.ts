import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WorkshopParticipant } from "./workshopParticipant.model";
import { Workshop } from "./workshop.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WorkshopParticipantsService {
  workshopParticipantsEndpoint: string =
    "http://localhost:3000/api/workshopParticipants";

  constructor(private http: HttpClient) {}

  getWorkshopParticipants(workshopid: string) {
    return undefined;
  }

  addWorkshopParticipant(participant: WorkshopParticipant): Observable<any> {
    return this.http.post(this.workshopParticipantsEndpoint, participant);
  }
}
