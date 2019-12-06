import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "../../components/atoms/button/button";
import Dialog from "../../components/atoms/dialog/dialog";
import TextField from "../../components/atoms/textfield/textfield";
import Alert from "../../components/alert/alert";

function AddToSearchlist({
  appState,
  onSubmit,
  openDialog,
  closeDialog,
  buttonText,
  labelText,
  defaultTitle,
  addButtonText,
  helpText,
  errorText,
  successText
}) {
  const [name, setName] = useState(defaultTitle);
  const submit = () => onSubmit(name);
  if (appState === "requesting") {
    return <Alert message={successText} type="polite" variant="success" />;
  }

  if (appState === "failed") {
    return <Alert message={errorText} type="assertive" variant="warning" />;
  }

  return (
    <section className="ddb-add-to-searchlist">
      <Button className="ddb-btn--charcoal" onClick={openDialog}>
        {buttonText}
      </Button>
      <Dialog
        label="Tilføj søgning til liste"
        showCloseButton
        isOpen={appState === "active"}
        onDismiss={closeDialog}
      >
        {helpText && (
          <p className="ddb-reset ddb-add-to-searchlist__help-text">
            {helpText}
          </p>
        )}
        <TextField
          inputClassName="ddb-add-to-searchlist__input"
          onChange={event => setName(event.target.value)}
          label={labelText}
          hideLabel={false}
          value={name}
        />
        <Button variant="charcoal" onClick={submit}>
          {addButtonText}
        </Button>
      </Dialog>
    </section>
  );
}

AddToSearchlist.propTypes = {
  appState: PropTypes.oneOf([
    "inactive",
    "active",
    "requesting",
    "finished",
    "failed"
  ]).isRequired,
  onSubmit: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  successText: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  addButtonText: PropTypes.string.isRequired,
  defaultTitle: PropTypes.string.isRequired,
  helpText: PropTypes.string.isRequired
};

export default AddToSearchlist;
