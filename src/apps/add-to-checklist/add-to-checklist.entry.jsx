import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";
import {
  addToListIntent,
  addToListAction,
  addToListAborted,
  resetStatus
} from "./add-to-checklist.slice";
import User from "../../core/user";

import AddToChecklist from "./add-to-checklist";

function AddToChecklistEntry({
  materialListUrl,
  text,
  successText,
  errorText,
  id,
  loginUrl
}) {
  const status = useSelector(state => state.addToChecklist.status[id]);
  const dispatch = useDispatch();
  const loggedIn = User.isAuthenticated();

  if (status === "pending") {
    if (loggedIn) {
      // If we're pending and logged in, then trigger the actual request.
      dispatch(addToListAction({ materialListUrl, materialId: id })).then(() =>
        dispatch(resetStatus({ materialId: id }))
      );
    } else if (User.authenticationFailed()) {
      // If authentication failed, abort.
      dispatch(addToListAborted({ materialId: id }));
    }
  }

  return (
    <AddToChecklist
      text={text}
      errorText={errorText}
      successText={successText}
      status={status}
      onClick={() => {
        // Go into "pending" state.
        dispatch(addToListIntent({ materialId: id }));
        if (!loggedIn) {
          // User is not logged in.
          User.authenticate(loginUrl);
        }
      }}
    />
  );
}

AddToChecklistEntry.propTypes = {
  materialListUrl: urlPropType,
  text: PropTypes.string,
  errorText: PropTypes.string,
  successText: PropTypes.string,
  id: PropTypes.string.isRequired,
  loginUrl: urlPropType.isRequired
};

AddToChecklistEntry.defaultProps = {
  materialListUrl: "https://test.materiallist.dandigbib.org",
  text: "Tilføj til min liste",
  errorText: "Det lykkedes ikke at gemme materialet.",
  successText: "Materialet er tilføjet"
};

export default AddToChecklistEntry;
