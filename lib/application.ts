import { z } from "zod";

export const applicationSchema = z.object({
  fullName: z.string().min(2, "Please enter a full name."),
  email: z.string().email("Enter a valid email address."),
  location: z.string().min(2, "Add your city and country."),
  dates: z.string().min(3, "Share your ideal dates or window."),
  goal: z.enum(["mentorship", "collaboration", "undecided"]),
  capitalRange: z.enum([
    "50k-150k",
    "150k-500k",
    "500k-1m",
    "1m+",
  ]),
  accommodation: z.enum([
    "private-suite",
    "villa",
    "private-apartment",
    "other",
  ]),
  marketFocus: z.string().min(2, "Select a market focus."),
  notes: z.string().max(1000, "Keep notes under 1000 characters.").optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
