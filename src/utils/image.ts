export function GetImage(url: string) {
  return new URL(`../assets/${url}`, import.meta.url).href
}
