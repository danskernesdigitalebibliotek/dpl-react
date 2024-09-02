import { useSelector } from "react-redux";
import { RootState } from "../../core/store";

export const useBlockedModalHasBeenVisible = () => {
  const {
    data: { hasBeenVisible }
  } = useSelector((state: RootState) => state.blockedModal);

  return Boolean(hasBeenVisible);
};

export default {};
