/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * FBS Adapter
 * OpenAPI spec version: 1.0
 */
import type { NewsletterGroupNameV1 } from "./newsletterGroupNameV1";

export interface NewsletterGroupCategoryV1 {
  /** The preference id stored in Mailchimp */
  id: string;
  /** The preference name stored in Mailchimp */
  interests?: NewsletterGroupNameV1[];
  /** The preference name stored in Mailchimp */
  title: string;
}
