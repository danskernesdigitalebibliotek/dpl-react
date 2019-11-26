import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "../../components/atoms/button/button";
import Dialog from "../../components/atoms/dialog/dialog";
import TextField from "../../components/atoms/textfield/textfield";

function AddToSearchlist({
  state,
  onSubmit,
  text,
  label,
  defaultValue,
  addButtonLabel
}) {
  const [showDialog, setShowDialog] = useState(false);
  const [name, setName] = useState(defaultValue);
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
      <Button className="ddb-btn--charcoal" onClick={open}>
        {text}
      </Button>
      <Dialog isOpen={showDialog} onDismiss={close}>
        <TextField
          onChange={e => setName(e.target.value)}
          label={label}
          defaultValue={defaultValue}
        />
        <Button className="ddb-btn--charcoal" onClick={submit}>
          {addButtonLabel}
        </Button>
      </Dialog>
    </div>
  );
}

AddToSearchlist.defaultProps = {
  state: "inactive",
  text: "Add to followed searches",
  label: "Search title",
  addButtonLabel: "Add",
  defaultValue: ""
};

AddToSearchlist.propTypes = {
  state: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  text: PropTypes.string,
  label: PropTypes.string,
  addButtonLabel: PropTypes.string,
  defaultValue: PropTypes.string
};

export default AddToSearchlist;
