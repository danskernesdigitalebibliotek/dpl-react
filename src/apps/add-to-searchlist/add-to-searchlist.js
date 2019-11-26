import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "../../components/atoms/button/button.js";
import Dialog from "../../components/atoms/dialog/dialog.js";
import TextField from "../../components/atoms/textfield/textfield.js";

export function AddToSearchlist({
  state,
  onSubmit,
  text,
  label,
  defaultTitle,
  addButtonLabel
}) {
  const [showDialog, setShowDialog] = useState(false);
  const [name, setName] = useState(defaultTitle);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  const submit = () => onSubmit(name);

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
      <Button onClick={open}>{text}</Button>
      <Dialog isOpen={showDialog} onDismiss={close}>
        <TextField
          onChange={e => setName(e.target.value)}
          label={label}
          defaultValue={defaultTitle}
        />
        <Button onClick={submit}>{addButtonLabel}</Button>
      </Dialog>
    </div>
  );
}

AddToSearchlist.defaultProps = {
  text: "Add to followed searches",
  label: "Search title",
  value: "",
  addButtonLabel: "Add",
  successMessage: "Success",
  errorMessage: "Something when wrong"
};

AddToSearchlist.propTypes = {
  state: PropTypes.string,
  onSubmit: PropTypes.func,
  text: PropTypes.string,
  label: PropTypes.string,
  defaultTitle: PropTypes.string,
  addButtonLabel: PropTypes.string,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string
};

export default AddToSearchlist;
