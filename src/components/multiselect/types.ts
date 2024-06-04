export type MultiselectOption = {
  item: string;
  value: string;
};

export type MultiselectExternalUpdateFunction = (filtersUpdate: {
  key: string;
  value: MultiselectOption[];
}) => void;

export type MultiselectExternalUpdate = {
  key: string;
  externalUpdateFunction: MultiselectExternalUpdateFunction;
};
