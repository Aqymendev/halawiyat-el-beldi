export function buildGoogleMapsEmbedUrl(location: string) {
  const query = encodeURIComponent(location.trim());
  return `https://www.google.com/maps?q=${query}&z=13&output=embed`;
}

export function buildGoogleMapsPlaceUrl(location: string) {
  const query = encodeURIComponent(location.trim());
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
