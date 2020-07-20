export function getIsoDateTimeWithOffset(workshopDateTime: Date): string {
  let offset = new Date().getTimezoneOffset() * 60000;
  let localIsoDateTime = new Date(workshopDateTime.valueOf() - offset)
    .toISOString()
    .slice(0, 16);
  return localIsoDateTime;
}
