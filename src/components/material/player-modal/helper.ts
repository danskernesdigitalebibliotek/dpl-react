import { constructModalId } from "../../../core/utils/helpers/modal-helpers";

export const playerModalId = (id: string) => {
  return constructModalId("player-modal", [id]);
};

export default {};
