import { WorkshopParticipant } from "./workshopParticipant.model";

export interface Workshop {
  id: string;
  title: string;
  summary: string;
  address: string;
  dateTime: Date;
  availablePlaces: number;
  participants: WorkshopParticipant[];
  slug: string;
}
