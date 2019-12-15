import React from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";
import useForm from "react-hook-form/dist/react-hook-form.ie11";

import Button from "../../components/atoms/button/button";
import Dialog from "../../components/atoms/dialog/dialog";
import TextField from "../../components/atoms/textfield/textfield";
import Alert from "../../components/alert/alert";
import User from "../../core/user";
import replacePlaceholders from "../../core/replacePlaceholders";

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
  successLinkUrl,
  successLinkText,
  errorRequiredMessage,
  errorMaxLengthMessage,
  searchQuery,
  loginUrl
}) {
  const { register, handleSubmit, errors } = useForm();
  const submit = (data, event) => {
    event.target.reset();
    onSubmit(data.title);
  };
  if (appState === "failed") {
    return <Alert message={errorText} type="assertive" variant="warning" />;
  }

  const success = (
    <div className="ddb-add-to-searchlist__success">
      <Alert message={successText} type="polite" variant="blank" />
      {successLinkUrl && <a href={successLinkUrl}>{successLinkText}</a>}
    </div>
  );

  const initial = (
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
  );

  return (
    <section className="ddb-add-to-searchlist">
      <Button
        href={
          !User.isAuthenticated()
            ? replacePlaceholders({
                text: loginUrl,
                tags: {
                  query: encodeURIComponent(searchQuery)
                }
              })
            : undefined
        }
        className="ddb-add-to-searchlist__open-dialog-btn"
        onClick={openDialog}
      >
        {buttonText}
      </Button>
      <Dialog
        label="Tilføj søgning til liste"
        showCloseButton
        dropDown
        isOpen={appState === "active" || appState === "requesting"}
        onDismiss={closeDialog}
      >
        {appState === "requesting" ? success : initial}
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
  successLinkUrl: urlPropType.isRequired,
  successLinkText: PropTypes.string.isRequired,
  errorRequiredMessage: PropTypes.string.isRequired,
  errorMaxLengthMessage: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  addButtonText: PropTypes.string.isRequired,
  defaultTitle: PropTypes.string.isRequired,
  helpText: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  loginUrl: urlPropType.isRequired
};

export default AddToSearchlist;
