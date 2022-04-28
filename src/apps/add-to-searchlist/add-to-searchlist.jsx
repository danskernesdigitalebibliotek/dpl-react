import React, { useState } from "react";
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
  status,
  onSubmit,
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const { register, handleSubmit, errors } = useForm();
  const submit = (data, event) => {
    event.target.reset();
    onSubmit(data.title);
  };
  if (status === "failed") {
    return <Alert message={errorText} type="assertive" variant="warning" />;
  }

  const success = (
    <div className="dpl-add-to-searchlist__success">
      <Alert message={successText} type="polite" variant="blank" />
      {successLinkUrl && <a href={successLinkUrl}>{successLinkText}</a>}
    </div>
  );

  const initial = (
    <div className="dpl-add-to-searchlist__content">
      <div className="dpl-add-to-searchlist__info">
        <p className="dpl-reset dpl-add-to-searchlist__help">{helpText}</p>
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className="dpl-add-to-searchlist__action"
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
          inputClass="dpl-add-to-searchlist__input"
          containerClass="dpl-add-to-searchlist__input-container"
          label={labelText}
          defaultValue={defaultTitle}
          error={errors?.title?.message}
        />
        <Button
          type="submit"
          className="dpl-add-to-searchlist__button"
          variant="charcoal"
          align="left"
        >
          {addButtonText}
        </Button>
      </form>
    </div>
  );

  return (
    <section className="dpl-add-to-searchlist">
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
        className="dpl-add-to-searchlist__open-dialog-btn"
        onClick={openDialog}
      >
        {buttonText}
      </Button>
      <Dialog
        label="Tilføj søgning til liste"
        showCloseButton
        dropDown
        isOpen={dialogOpen}
        onDismiss={closeDialog}
      >
        {status === "processing" ? success : initial}
      </Dialog>
    </section>
  );
}

AddToSearchlist.propTypes = {
  status: PropTypes.oneOf(["ready", "processing", "finished", "failed"])
    .isRequired,
  onSubmit: PropTypes.func.isRequired,
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
