import React, { useEffect } from "react";
import languageIcon from "../../../components/search-bar/icon/language-icon.svg";

const googleTranslateElementInit = () => {
  // eslint-disable-next-line no-new
  new window.google.translate.TranslateElement(
    {
      pageLanguage: "da",
      autoDisplay: false
    },
    "google_translate_element"
  );
};

const Translations: React.FC = () => {
  useEffect(() => {
    if (window.google?.translate?.TranslateElement) return;

    const addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);
  return (
    <div className="header__translations">
      <div className="header__select-wrapper header__button">
        <img
          className="header__select-icon"
          src={languageIcon}
          alt="language icon"
        />
        <div className="header__select" id="google_translate_element" />
      </div>
    </div>
  );
};

export default Translations;
