import React, { useEffect } from "react";
import languageIcon from "../../../components/search-bar/icon/language-icon.svg";

const googleTranslateElementInit = () => {
  // eslint-disable-next-line no-new
  let labelElement = document.querySelector("#google-translate-element-label");
  let container = document.querySelector("#google-translate-element");
  new window.google.translate.TranslateElement(
    {
      pageLanguage: "da",
      includedLanguages: "en,de,nl,bg,ro,bs,hr,cs,et,el,tr,ku,ckb,ur,th,vi,zh-CN,zh-TW,yue,tl,sw,uk,ru,no,sv,fi,is,kl,fo,kl",
      autoDisplay: false
    },
    container
  );

  let googleTranslateSelectElement = document.querySelector("#google-translate-element select");
  let getActiveSelectText = () => {
    // @ts-ignore-next-line
    let selectedOptionIndex = googleTranslateSelectElement.selectedIndex;
    if (selectedOptionIndex === -1)
      return "";

    // @ts-ignore-next-line
    return googleTranslateSelectElement.options[selectedOptionIndex].text;
  };

  if (googleTranslateSelectElement) {
    // @ts-ignore-next-line
    googleTranslateSelectElement.onchange = function() {
      // @ts-ignore-next-line
      labelElement.innerText = getActiveSelectText();
    };
    googleTranslateSelectElement.setAttribute("id", container?.getAttribute("id") || "");
    googleTranslateSelectElement.className += " " + container?.className;

    container?.replaceWith(googleTranslateSelectElement);
  }

};

const Translations: React.FC = () => {
  useEffect(() => {
    if (window.google?.translate?.TranslateElement)
      return googleTranslateElementInit();

    const addScript = document.createElement("script");
    addScript.setAttribute("src", "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit");
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = googleTranslateElementInit;
  });

  return (
    <div className="header__translations">
      <div className="header__translations-wrapper header__button">
        <label className="header__translations-button">
          <img
            className="header__translations-icon"
            src={languageIcon}
            alt="language icon"
          />
          <span className="header__translations-label" id="google-translate-element-label">Select language</span>
          <div className="header__translations-select" id="google-translate-element" />
        </label>
      </div>
    </div>
  );
};

export default Translations;
