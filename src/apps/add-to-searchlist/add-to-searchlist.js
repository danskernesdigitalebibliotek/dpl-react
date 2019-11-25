import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "../../components/atoms/button/button.js";
import Dialog from "../../components/atoms/dialog/dialog.js";
import TextField from "../../components/atoms/textfield/textfield.js";

export function AddToSearchlist({
  state,
  onSubmit,
  ddbText,
  ddbLabel,
  ddbDefaultTitle,
  ddbSearchQuery,
  ddbAddButtonLabel
}) {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  const submit = () => onSubmit(ddbSearchQuery);

  if (state === "finished") {
    return <div>Tilføjet</div>;
  }

  if (state === "failed") {
    return <div>Noget gik galt</div>;
  }

  if (state === "requesting" && showDialog) {
    // Some spinner would be nice too.
    setShowDialog(false);
  }

  return (
    <div>
      <Button onClick={open}>{ddbText}</Button>
      <Dialog isOpen={showDialog} onDismiss={close}>
        <TextField label={ddbLabel} defaultValue={ddbDefaultTitle} />
        <Button onClick={submit}>{ddbAddButtonLabel}</Button>
      </Dialog>
    </div>
  );
}

AddToSearchlist.defaultProps = {
  ddbText: "Add to followed searches",
  ddbLabel: "Search title",
  ddbValue: "",
  ddbAddButtonLabel: "Add",
  ddbSuccessMessage: "Success",
  ddbErrorMessage: "Something when wrong"
};

AddToSearchlist.propTypes = {
  state: PropTypes.string,
  onSubmit: PropTypes.func,
  ddbText: PropTypes.string,
  ddbLabel: PropTypes.string,
  ddbDefaultTitle: PropTypes.string,
  ddbSearchQuery: PropTypes.string,
  ddbAddButtonLabel: PropTypes.string,
  ddbSuccessMessage: PropTypes.string,
  ddbErrorMessage: PropTypes.string
};

export default AddToSearchlist;
