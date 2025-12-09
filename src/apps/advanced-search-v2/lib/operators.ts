import { Operator } from "../types";

export const OPERATOR_ORDER: Operator[] = ["and", "or", "not"];

export const getOperatorLabelsMap = (t: (key: string) => string) => ({
  and: t("clauseAndText"),
  or: t("clauseOrText"),
  not: t("clauseNotText")
});
