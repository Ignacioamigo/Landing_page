import { z } from "zod";

export const leadSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "Please enter your first name")
    .max(60, "First name is too long")
    .regex(/^[\p{L}\p{M}'\-\s]+$/u, "Only letters, spaces, hyphens, apostrophes"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(5, "Please enter your email")
    .max(254, "Email is too long")
    .email("Please enter a valid email"),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const leadApiSchema = leadSchema.extend({
  eventId: z.string().min(8).max(128),
  fbp: z.string().optional(),
  fbc: z.string().optional(),
  pagePath: z.string().optional(),
});

export type LeadApiInput = z.infer<typeof leadApiSchema>;
