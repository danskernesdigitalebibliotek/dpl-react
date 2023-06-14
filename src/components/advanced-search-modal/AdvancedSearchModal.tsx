import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useText } from "../../core/utils/text";
import Modal from "../../core/utils/modal";
import { Button } from "../Buttons/Button";
import {
  constructAdvancedSearchUrl,
  redirectTo
} from "../../core/utils/helpers/url";
import { useUrls } from "../../core/utils/url";

export type AdvancedSearchModalProps = {
  dataCy?: string;
};

const AdvancedSearchModal = ({
  dataCy = "advanced-search-modal"
}: AdvancedSearchModalProps) => {
  const t = useText();
  const [cqlString, setCqlString] = useState<string>("");
  const { advancedSearchUrl } = useUrls();
  const minimalQueryLength = 3;
  const [minimalQueryLengthError, setMinimalQueryLengthError] =
    useState<boolean>(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("q")) {
      setCqlString(searchParams.get("q") || "");
    }
  }, []);

  useEffect(() => {
    if (minimalQueryLengthError && cqlString.length >= minimalQueryLength) {
      setMinimalQueryLengthError(false);
    }
  }, [cqlString, minimalQueryLengthError]);

  return (
    <Modal
      modalId="advanced-search-modal"
      screenReaderModalDescriptionText={t(
        "advancedSearchModalScreenReaderModalDescriptionText"
      )}
      closeModalAriaLabelText={t("advancedSearchModalCloseModalAriaLabelText")}
      dataCy={dataCy}
    >
      <section className="reservation-modal">
        <h1
          className={clsx(["text-header-h2", "mb-16", "search-result-title"])}
          data-cy="advanced-search-header"
        >
          {t("advancedSearchModalHeaderText")}
        </h1>
        <label
          htmlFor="advanced-search-input"
          className="text-body-large mt-35"
        >
          {t("advancedSearchExplanationText")}
          <br />
          <textarea
            name="advanced-search-input"
            className="mt-35 p-16"
            cols={120}
            rows={5}
            value={cqlString}
            onChange={(e) => setCqlString(e.target.value)}
            placeholder="e.g. title=snemand*"
          />
        </label>
        <Button
          dataCy={`${dataCy}-submit-button"`}
          label={t("advancedSearchSubmitButtonText")}
          buttonType="none"
          variant="filled"
          disabled={false}
          collapsible={false}
          size="large"
          classNames="mt-35"
          onClick={() => {
            if (cqlString.length >= minimalQueryLength) {
              setMinimalQueryLengthError(false);
              redirectTo(
                constructAdvancedSearchUrl(advancedSearchUrl, cqlString)
              );
            } else {
              setMinimalQueryLengthError(true);
            }
          }}
        />
        {minimalQueryLengthError && (
          <p className="mt-16 text-small-caption">
            {t("advancedSearchMinimalLengthErrorText")}
          </p>
        )}
      </section>
    </Modal>
  );
};

export default AdvancedSearchModal;
