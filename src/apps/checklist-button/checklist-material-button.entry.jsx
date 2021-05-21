import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";
import {
  addToListPending,
  addToListAction,
  addToListAborted,
  checkOnListAction,
  removeFromListPending,
  removeFromListAction,
  removeFromListAborted,
  resetStatus
} from "./checklist-material-button.slice";
import User from "../../core/user";

import ChecklistMaterialButton from "./checklist-material-button";

function ChecklistMaterialButtonEntry({
  materialListUrl,
  addText,
  addSuccessText,
  addErrorText,
  removeText,
  removeSuccessText,
  removeErrorText,
  id,
  loginUrl,
  initialOnList,
  containerClass
}) {
  const status =
    useSelector(state => state.checklistMaterialButton.status[id]) || "ready";
  const onList =
    useSelector(state => state.checklistMaterialButton.onList[id]) ||
    initialOnList;

  const dispatch = useDispatch();
  const loggedIn = User.isAuthenticated();
  // Perform add-related actions when:
  const [pending, action, aborted, newOnList] =
    // 1. The material is not on the list
    onList === "off" ||
    // 2. We do not know whether the material is on the list or not. Adding the
    //    material twice in non-destructive.
    onList === "unknown" ||
    // 3. We are in the process of adding the material
    (onList === "on" && status === "processing")
      ? [addToListPending, addToListAction, addToListAborted, "on"]
      : // Otherwise perform remove related actions
        [
          removeFromListPending,
          removeFromListAction,
          removeFromListAborted,
          "off"
        ];
  // Show texts related to adding a material if:
  const [text, successText, errorText] =
    // 1.  We do not know whether the material is on the list or not.
    onList === "unknown" ||
    // 2. The material is not on the list and we are not in the process of
    //    adding it.
    (onList === "off" &&
      (status === "ready" ||
        status === "pending" ||
        status === "processing" ||
        status === "failed")) ||
    // 3. The material has been successfully added to the list
    (onList === "on" && status === "finished")
      ? [addText, addSuccessText, addErrorText]
      : [removeText, removeSuccessText, removeErrorText];

  const onClick = () => {
    dispatch(pending({ materialId: id }));
    if (!loggedIn) {
      User.authenticate(loginUrl);
    }
  };

  useEffect(() => {
    if (status === "pending") {
      if (loggedIn) {
        // If we're pending and logged in, then trigger the actual request.
        dispatch(action({ materialListUrl, materialId: id })).then(payload => {
          dispatch(
            resetStatus({
              materialId: id,
              onList: payload?.error ? onList : newOnList
            })
          );
        });
      } else if (User.authenticationFailed()) {
        // If authentication failed, abort.
        dispatch(aborted({ materialId: id }));
      }
    }

    if (status === "ready" && onList === "unknown") {
      dispatch(checkOnListAction({ materialListUrl, materialId: id }));
    }
  }, [
    aborted,
    action,
    dispatch,
    id,
    loggedIn,
    materialListUrl,
    newOnList,
    onList,
    status
  ]);

  return (
    <ChecklistMaterialButton
      text={text}
      errorText={errorText}
      successText={successText}
      status={status}
      onClick={onClick}
      loginUrl={loginUrl}
      materialId={id}
      containerClass={containerClass}
    />
  );
}

ChecklistMaterialButtonEntry.propTypes = {
  materialListUrl: urlPropType,
  addText: PropTypes.string,
  addErrorText: PropTypes.string,
  addSuccessText: PropTypes.string,
  removeText: PropTypes.string,
  removeErrorText: PropTypes.string,
  removeSuccessText: PropTypes.string,
  id: PropTypes.string.isRequired,
  loginUrl: urlPropType.isRequired,
  initialOnList: PropTypes.oneOf(["unknown", "on", "off"]),
  containerClass: PropTypes.string
};

ChecklistMaterialButtonEntry.defaultProps = {
  materialListUrl: "https://test.materiallist.dandigbib.org",
  addText: "Tilføj til min liste",
  addErrorText: "Det lykkedes ikke at gemme materialet.",
  addSuccessText: "Materialet er tilføjet",
  removeText: "Fjern fra min liste",
  removeErrorText: "Det lykkedes ikke at fjerne materialet.",
  removeSuccessText: "Materialet er fjernet",
  initialOnList: "unknown",
  containerClass: "ddb-checklist-material-button__container"
};

export default ChecklistMaterialButtonEntry;
