import { AgeRating } from "lib/graphql"

export function readableAgeRating(age: keyof typeof AgeRating): string {
  const AGE_MAP: Record<string, string> = {
    U: "U",
    Pg: "PG",
    Twelve: "12",
    Twelvea: "12A",
    Eighteen: "18",
  }

  return AGE_MAP[age.toString()]
}
