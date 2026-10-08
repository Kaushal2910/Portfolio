import type { Certificate } from "@/types";
import data from "../../data/certificates.json";

/**
 * Typed, rank-ordered view of data/certificates.json.
 * All site imports stay on this module; the admin API + sync script
 * read/write the JSON file directly.
 */
export const certificates: Certificate[] = [...(data as Certificate[])].sort(
  (a, b) => a.rank - b.rank
);
