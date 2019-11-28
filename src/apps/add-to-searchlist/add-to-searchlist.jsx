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
  addButtonLabel,
  helpText
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
    close();
  }

  return (
    <section className="ddb-add-to-searchlist">
      <Button className="ddb-btn--charcoal" onClick={open}>
        {text}
      </Button>
      <Dialog
        label="Tilføj søgning til liste"
        showCloseButton
        isOpen={showDialog}
        onDismiss={close}
      >
        {helpText ? <p>{helpText}</p> : null}
        <TextField
          id="add-to-search-input"
          inputClassName="ddb-add-to-searchlist__input"
          onChange={e => setName(e.target.value)}
          label={label}
          defaultValue={defaultValue}
          value={name}
        />
        <Button className="ddb-btn--charcoal" onClick={submit}>
          {addButtonLabel}
        </Button>
      </Dialog>
    </section>
  );
}

AddToSearchlist.defaultProps = {
  text: "Add to followed searches",
  label: "Search title",
  addButtonLabel: "Add",
  defaultValue: "",
  helpText: "Help text"
};

AddToSearchlist.propTypes = {
  state: PropTypes.oneOf(["inactive", "requesting", "finished", "failed"])
    .isRequired,
  onSubmit: PropTypes.func.isRequired,
  text: PropTypes.string,
  label: PropTypes.string,
  addButtonLabel: PropTypes.string,
  defaultValue: PropTypes.string,
  helpText: PropTypes.string
};

export default AddToSearchlist;
