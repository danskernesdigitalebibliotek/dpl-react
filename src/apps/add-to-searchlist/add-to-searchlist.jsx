import React from "react";
import PropTypes from "prop-types";
import useForm from "react-hook-form";

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
  successText,
  errorRequiredMessage,
  errorMaxLengthMessage
}) {
  const { register, handleSubmit, errors } = useForm();
  const submit = (data, event) => {
    event.target.reset();
    onSubmit(data.title);
  };
  if (appState === "requesting") {
    return <Alert message={successText} type="polite" variant="success" />;
  }

  if (appState === "failed") {
    return <Alert message={errorText} type="assertive" variant="warning" />;
  }

  return (
    <section className="ddb-add-to-searchlist">
      <Button onClick={openDialog}>{buttonText}</Button>
      <Dialog
        label="Tilføj søgning til liste"
        showCloseButton
        dropDown
        isOpen={appState === "active"}
        onDismiss={closeDialog}
      >
        <div className="ddb-add-to-searchlist__content">
          <div className="ddb-add-to-searchlist__info">
            <p className="ddb-reset ddb-add-to-searchlist__help">{helpText}</p>
          </div>
          <form
            onSubmit={handleSubmit(submit)}
            className="ddb-add-to-searchlist__action"
          >
            <TextField
              name="title"
              ref={register({
                required: errorRequiredMessage,
                maxLength: {
                  value: 255,
                  message: errorMaxLengthMessage
                }
              })}
              inputClass="ddb-add-to-searchlist__input"
              containerClass="ddb-add-to-searchlist__input-container"
              label={labelText}
              defaultValue={defaultTitle}
              error={errors?.title?.message}
            />
            <Button
              type="submit"
              className="ddb-add-to-searchlist__button"
              variant="charcoal"
              align="left"
            >
              {addButtonText}
            </Button>
          </form>
        </div>
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
  errorRequiredMessage: PropTypes.string.isRequired,
  errorMaxLengthMessage: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  addButtonText: PropTypes.string.isRequired,
  defaultTitle: PropTypes.string.isRequired,
  helpText: PropTypes.string.isRequired
};

export default AddToSearchlist;
