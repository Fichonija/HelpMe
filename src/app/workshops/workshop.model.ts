export interface Workshop {
  id: string;
  title: string;
  summary: string;
  address: string;
  dateTime: Date;
  availablePlaces: number;
  takenPlaces: number;
  slug: string;
}
