import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "../../components/atoms/button/button";
import Dialog from "../../components/atoms/dialog/dialog";
import TextField from "../../components/atoms/textfield/textfield";
import Alert from "../../components/alert/alert";

function AddToSearchlist({
  state,
  onSubmit,
  text,
  label,
  defaultTitle,
  addButtonLabel,
  helpText,
  errorText,
  successText
}) {
  const [showDialog, setShowDialog] = useState(false);
  const [name, setName] = useState(defaultTitle);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  const submit = () => onSubmit(name);

  if (state === "finished") {
    return <Alert message={successText} type="polite" variant="success" />;
  }

  if (state === "failed") {
    return <Alert message={errorText} type="assertive" variant="warning" />;
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
          inputClassName="ddb-add-to-searchlist__input"
          onChange={e => setName(e.target.value)}
          label={label}
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
  defaultTitle: "",
  helpText: "Help text"
};

AddToSearchlist.propTypes = {
  state: PropTypes.oneOf(["inactive", "requesting", "finished", "failed"])
    .isRequired,
  onSubmit: PropTypes.func.isRequired,
  text: PropTypes.string,
  errorText: PropTypes.string.isRequired,
  successText: PropTypes.string.isRequired,
  label: PropTypes.string,
  addButtonLabel: PropTypes.string,
  defaultTitle: PropTypes.string,
  helpText: PropTypes.string
};

export default AddToSearchlist;
