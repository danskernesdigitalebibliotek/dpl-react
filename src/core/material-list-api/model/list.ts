/**
 * Generated by orval v6.8.1 🍺
 * Do not edit manually.
 * Collection List
 * OpenAPI spec version: 2.0.0
 */
import type { ListId } from "./listId";
import type { ItemId } from "./itemId";

export interface List {
  id: ListId;
  collections: ItemId[];
}
