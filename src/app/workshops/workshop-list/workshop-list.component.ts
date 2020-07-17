import { Component, OnInit } from "@angular/core";
import { Workshop } from "../workshop.model";

@Component({
  selector: "app-workshop-list",
  templateUrl: "./workshop-list.component.html",
  styleUrls: ["./workshop-list.component.css"],
})
export class WorkshopListComponent implements OnInit {
  loading: boolean = true;

  workshops: Workshop[] = [
    {
      id: "1",
      title: "Workshop 1",
      summary:
        "Biodiesel banjo 8-bit, YOLO gentrify VHS tilde typewriter swag. Hot chicken chicharrones synth normcore pickled locavore. Blue bottle jean shorts truffaut flexitarian XOXO asymmetrical meh squid artisan adaptogen. Sustainable humblebrag direct trade cornhole raw denim trust fund edison bulb banjo ennui etsy XOXO.",
      address: "Kačićeva 13a, Zagreb",
      dateTime: new Date(),
      slug: "first",
    },
    {
      id: "2",
      title: "Workshop 2",
      summary:
        "Biodiesel banjo 8-bit, YOLO gentrify VHS tilde typewriter swag. Hot chicken chicharrones synth normcore pickled locavore. Blue bottle jean shorts truffaut flexitarian XOXO asymmetrical meh squid artisan adaptogen. Sustainable humblebrag direct trade cornhole raw denim trust fund edison bulb banjo ennui etsy XOXO.",
      address: "Kačićeva 13a, Zagreb",
      dateTime: new Date(),
      slug: "second",
    },
    {
      id: "3",
      title: "Workshop 3",
      summary:
        "Biodiesel banjo 8-bit, YOLO gentrify VHS tilde typewriter swag. Hot chicken chicharrones synth normcore pickled locavore. Blue bottle jean shorts truffaut flexitarian XOXO asymmetrical meh squid artisan adaptogen. Sustainable humblebrag direct trade cornhole raw denim trust fund edison bulb banjo ennui etsy XOXO.",
      address: "Kačićeva 13a, Zagreb",
      dateTime: new Date(),
      slug: "third",
    },
  ];

  ngOnInit() {
    this.loading = false;
  }

  onWorkshopSelected() {}
}
