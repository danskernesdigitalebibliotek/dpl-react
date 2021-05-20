import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";
import {
  addToListPending,
  addToListAction,
  addToListAborted,
  removeFromListPending,
  removeFromListAction,
  removeFromListAborted,
  resetStatus
} from "./checklist-material-button.slice";
import User from "../../core/user";

import ChecklistMaterialButton from "./checklist-material-button";
import MaterialList from "../../core/MaterialList";

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
  const dispatch = useDispatch();
  const loggedIn = User.isAuthenticated();
  const [onList, setOnList] = useState(initialOnList);

  const [pending, action, aborted, text, successText, errorText, newOnList] =
    onList !== "on"
      ? [
          addToListPending,
          addToListAction,
          addToListAborted,
          addText,
          addSuccessText,
          addErrorText,
          "on"
        ]
      : [
          removeFromListPending,
          removeFromListAction,
          removeFromListAborted,
          removeText,
          removeSuccessText,
          removeErrorText,
          "off"
        ];
  const onClick = () => {
    dispatch(pending({ materialId: id }));
    if (!loggedIn) {
      User.authenticate(loginUrl);
    }
  };

  if (status === "pending") {
    if (loggedIn) {
      // If we're pending and logged in, then trigger the actual request.
      dispatch(action({ materialListUrl, materialId: id })).then(() =>
        dispatch(resetStatus({ materialId: id })).then(() =>
          setOnList(newOnList)
        )
      );
    } else if (User.authenticationFailed()) {
      // If authentication failed, abort.
      dispatch(aborted({ materialId: id }));
    }
  }

  if (status === "ready" && onList === "unknown") {
    const client = new MaterialList({ baseUrl: materialListUrl });
    client
      .checkListMaterial({ materialId: id })
      .then(listMaterial => {
        setOnList(listMaterial ? "on" : "off");
      })
      // eslint-disable-next-line no-unused-vars
      .catch(err => {
        // Do nothing. If the call fails then we show the add button by default.
        // If this is a permanent error then clicking the button will trigger an
        // error. If this is a temporary error and the user clicks the button
        // then the material will not be added multiple times and thus cause
        // further problems.
      });
  }

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
