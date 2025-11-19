import type { Preview } from "@storybook/react";
import "../src/components/components.scss";
import "@danskernesdigitalebibliotek/dpl-design-system/build/css/base.css";
import { setToken, TOKEN_LIBRARY_KEY, TOKEN_USER_KEY } from "../src/core/token";
import "../src/core/mount";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import ErrorBoundaryAlert from "../src/components/error-boundary-alert/ErrorBoundaryAlert";
import Store from "../src/components/store";


const getSessionStorage = (type) => window.sessionStorage.getItem(type);
const userToken =
  process.env.STORYBOOK_USER_TOKEN ?? getSessionStorage(TOKEN_USER_KEY);
const libraryToken =
  process.env.STORYBOOK_LIBRARY_TOKEN ?? getSessionStorage(TOKEN_LIBRARY_KEY);

if (userToken) {
  setToken(TOKEN_USER_KEY, userToken);
}

// If the library token has been set manually in the input field in library token story
// it has been added to session storage and we make sure to set it via setToken()
// so it is accessible by components that depend on it.
if (libraryToken) {
  setToken(TOKEN_LIBRARY_KEY, libraryToken);
}

// If we have not set the library token manually we use the user token
// because it at least provide the same access as a library token.
if (!libraryToken && userToken) {
  setToken(TOKEN_LIBRARY_KEY, userToken);
}

const WrappedStory = (app) =>
  withErrorBoundary(app, {
    FallbackComponent: ErrorBoundaryAlert,
    onError(error, info) {
      // Logging should be acceptable in an error handler.
      // eslint-disable-next-line no-console
      console.error(error, info);
    }
  });

function App({ story }) {
  return (
    <Store>
      <>{story}</>
    </Store>
  );
}

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    controls: {
      expanded: true
    }
  },
  decorators: [
    (Story) => (
      <>
        <App story={Story()} />
      </>
    )
  ]
};

window.dplReact.settings = {
  "urls": {
    "fee-page": "https://dpl-cms.local/user/me/fees",
    "physical-loans": "https://dpl-cms.local/user/me/loans",
    "userinfo": "https://login.bib.dk/userinfo/",
    "dpl-cms-base": "https://dpl-cms.local",
    "search": "/search",
    "advanced-search": "/advanced-search",
    "material": "/work/:workid",
    "logout": "https://dpl-cms.local/logout",
    "auth": "/login",
    "dashboard": "/user/me/dashboard",
    "view-fees-and-compensation-rates": "/takster",
    "zero-hits-search": "/din-sogning-har-0-resultater",
    "reservations": "https://dpl-cms.local/user/me/reservations"
  },
  "texts": {
    "blocked-patron-close-modal-aria-label": "Luk pop-up til blokeret bruger",
    "blocked-patron-d-body": "Du kan derfor ikke reservere, låne eller forny lån. Kontakt biblioteket for yderligere information ",
    "blocked-patron-d-title": "Din bruger er blokeret",
    "blocked-patron-e-body": "Du kan derfor ikke reservere, låne eller forny lån. Kontakt biblioteket for yderligere information",
    "blocked-patron-e-link": "Betal dine gebyrer og erstatninger her",
    "blocked-patron-e-title": "Du har overskredet gebyrgrænsen",
    "blocked-patron-f-body": "Du kan derfor ikke reservere, låne eller forny lån. Kontakt biblioteket for yderligere information ",
    "blocked-patron-f-title": "Din bruger er blokeret",
    "blocked-patron-modal-aria-description": "Denne pop-up advarer dig om at din bruger er blokeret",
    "blocked-patron-o-body": "Du kan derfor ikke reservere, låne eller forny lån. Kontakt biblioteket for yderligere information ",
    "blocked-patron-o-title": "Du kan derfor ikke reservere, låne eller forny lån. Kontakt biblioteket for yderligere information ",
    "blocked-patron-s-body": "Du kan derfor ikke reservere, låne eller forny lån. Kontakt biblioteket for yderligere information ",
    "blocked-patron-s-title": "Din bruger er blokeret",
    "blocked-patron-u-body": "Du kan derfor ikke reservere, låne eller forny lån. Kontakt biblioteket for yderligere information",
    "blocked-patron-u-title": "Din bruger er blokeret",
    "blocked-patron-w-body": "Du kan derfor ikke reservere, låne eller forny lån. Kontakt biblioteket for yderligere information.",
    "blocked-patron-w-title": "Din bruger er blokeret",
    "accept-modal-accept-button": "Ja, forny",
    "accept-modal-are-you-sure": "Er du sikker på at du vil forny?",
    "accept-modal-aria-description": "Accepter",
    "accept-modal-aria-label": "Accepter",
    "accept-modal-body": "Hvis du kun fornyer nogle af dine lån, risikerer du at dit gebyr bliver forhøjet, fordi dine lån opsplittes i flere",
    "accept-modal-cancel-button": "Forny ikke",
    "accept-modal-header": "Dit gebyr kan blive forhøjet",
    "add-to-favorites-aria-label": "tilføj @title til huskelisten",
    "alert-error-close": "Luk",
    "alert-error-message": "Der opstod en uventet fejl - du kan prøve at opdatere siden, prøve igen senere eller kontakte biblioteket.",
    "autosuggest-animated-series-category": "Animeret serie",
    "autosuggest-audio-book-category": "Lydbøger",
    "autosuggest-book-category": "Bøger",
    "autosuggest-ebook-category": "E-bøger",
    "autosuggest-film-category": "Film",
    "autosuggest-game-category": "Spil",
    "autosuggest-music-category": "Musik",
    "availability-available": "Tilgængelig",
    "availability-unavailable": "Udlånt",
    "by-author": "af XXXXX",
    "change-interest-period": "Skift interesseperiode",
    "change-pickup-location": "Skift afhentningsbibliotek",
    "choose-one": "Vælg",
    "close-modal-aria-label-email": "Luk pop-up til at skifte email",
    "close-modal-aria-label-interest-period": "Luk pop-up til at skifte interesseperiode",
    "close-modal-aria-label-pickup": "Luk pop-up til at skifte afhentningssted",
    "close-modal-aria-label-sms": "Luk pop-up",
    "dashboard-number-in-line": "Nummer @count i køen",
    "delete-reservation-modal-aria-description": "Denne knap åbner en pop-up som gør det muligt at slette en eller flere reserveringer",
    "delete-reservation-modal-button": "OK",
    "delete-reservation-modal-close-modal": "Luk pop-up til at slette reservering",
    "delete-reservation-modal-delete-button": "{\"type\":\"plural\",\"text\":[\"Slet reservering\",\"Slet reserveringer\"]}",
    "delete-reservation-modal-delete-processing": "Indlæser...",
    "delete-reservation-modal-delete-question": "{\"type\":\"plural\",\"text\":[\"Vil du slette din reservering?\",\"\\u00d8nsker du at annullere dine reservationer?\"]}",
    "delete-reservation-modal-errors-status": "Noget gik galt. Prøv igen senere",
    "delete-reservation-modal-errors-title": "Din reservering kunne ikke slettes",
    "delete-reservation-modal-success-status": "{\"type\":\"plural\",\"text\":[\"En reservering blev slettet\",\"@count reserveringer blev slettet\"]}",
    "delete-reservation-modal-success-title": "{\"type\":\"plural\",\"text\":[\"Din reservering er slettet\",\"Dine reserveringer er slettet\"]}",
    "delete-reservation-modal-header": "{\"type\":\"plural\",\"text\":[\"Slet reservering\",\"Slet reserveringer\"]}",
    "delete-reservation-modal-not-regrettable": "Du kan ikke fortryde",
    "digital-reservations-header": "Digitale reserveringer",
    "et-al": "et al.",
    "error-boundary-alert-body-button-aria": "Luk fejlbesked",
    "find-on-shelf-expand-button-explanation": "Forklarende tekst til Find på hylden-knap",
    "find-on-shelf-table-description": "\nFind @work på hylden i @branch",
    "group-modal-button": "Forny (@count)",
    "group-modal-checkbox": "Vælg alle",
    "group-modal-due-date-aria-description": "Denne pop-up grupperer lån efter afleveringsdato og gør det muligt at forny disse lån",
    "group-modal-due-date-header": "Afleveringsfrist @date",
    "group-modal-due-date-link-to-page-with-fees": "Se vores takster",
    "group-modal-due-date-material": "Afleveringsfrist @date",
    "group-modal-due-date-digital-material": "Udløber automatisk @date",
    "group-modal-due-date-renew-loan-close-modal-aria-label": "Luk pop-up til at forny lån",
    "group-modal-due-date-warning-loan-overdue": "Afleveringsfristen er overskredet, du vil derfor blive pålagt et gebyr når du afleverer",
    "group-modal-go-to-material": "Se detaljer",
    "group-modal-hidden-label-checkbox-on-material": "Vælg @label til fornyelse",
    "group-modal-loans-aria-description": "Denne pop-up gør det muligt at forny dine lån",
    "group-modal-loans-close-modal-aria-label": "Luk pop-up med grupperede lån",
    "group-modal-renew-loan-denied-inter-library-loan": "Udlånt af et andet bibliotek",
    "group-modal-renew-loan-denied-max-renewals-reached": "Kan ikke fornyes yderligere",
    "group-modal-renew-loan-denied-reserved": "Reserveret af en anden låner",
    "group-modal-go-to-material-aria-label": "Gå til detaljer for @label",
    "group-modal-reservations-close-modal-aria-label": "Luk pop-up med grupperede reserveringer",
    "group-modal-reservations-loans-aria-description": "Denne pop-up gør det muligt at slette reserveringer",
    "header-dropdown-item-advanced-search": "Avanceret søgning",
    "in-series": "i serien",
    "in": "i",
    "input-placeholder": "Søg efter bøger, film, musik og mere",
    "is-loading-heart": "Indlæser...",
    "loading": "henter",
    "loan-list-additional-materials": "{\"type\":\"plural\",\"text\":[\"+ 1 andet materiale\",\"+ @count flere materialer\"]}",
    "loans-not-overdue": "Længere afleveringstid",
    "loans-overdue": "Overskredne lån",
    "loans-soon-overdue": "Skal snart afleveres",
    "material-and-author": "og",
    "material-by-author": "Af",
    "material-details-close-modal-aria-label": "Luk pop-up med detaljevisning af materiale",
    "material-details-digital-due-date-label": "Udløber automatisk",
    "view-material": "Se materiale",
    "material-details-link-to-page-with-fees": "Se vores takster",
    "material-details-loan-date-label": "Udlånsdato",
    "material-details-material-number-label": "Materialenummer",
    "material-details-modal-aria-description": "Denne pop-up viser detaljer for materialet og gør det muligt at slette en reservering",
    "material-details-overdue": "Udløbet",
    "material-details-physical-due-date-label": "Afleveres",
    "material-details-renew-loan-button": "Forny dine lån",
    "material-details-warning-loan-overdue": "Afleveringsfristen er overskredet, du vil derfor blive pålagt et gebyr når du afleverer",
    "modal-reservation-form-no-interest-after-header-description": "Indstil interesseperiode",
    "modal-reservation-form-no-interest-after-header-title": "Skift udløbsdato for interesseperiode",
    "modal-reservation-form-no-interest-after-label": "Skift interesseperiode",
    "modal-reservation-form-pickup-header-title": "Vælg afhentningsbibliotek",
    "modal-reservation-form-pickup-header-description": "Vælg hvor du vil afhente dine reserveringer",
    "modal-reservation-form-pickup-label": "Skift afhentningssted for din reservering",
    "multiselect-all-option": "Vælg alle",
    "no-search-result": "Din søgning har 0 resultater",
    "number-description": "nr. ",
    "one-month": "1 måned",
    "one-year": "1 år",
    "order-digital-copy-feedback-borchk-user-blocked-by-agency": "Borchk-bruger blokeret af agenturtekst",
    "order-digital-copy-feedback-borchk-user-no-longer-exist-on-agency": "Borchk-bruger findes ikke længere hos agentur",
    "order-digital-copy-feedback-borchk-user-not-verified": "Borchk-bruger ikke verificeret",
    "order-digital-copy-feedback-button": "Luk",
    "order-digital-copy-feedback-error-agency-not-subscribed": "Biblioteket abonnerer ikke på tjenesten. Du kan bestille den digitale kopi ved at kontakte biblioteket.",
    "order-digital-copy-feedback-error-invalid-pickup-branch": "Afhentningsfilialen er ikke gyldig. Du kan bestille den digitale kopi ved at kontakte biblioteket.",
    "order-digital-copy-feedback-error-missing-client-configuration": "Klientkonfigurationen mangler. Du kan bestille den digitale kopi ved at kontakte biblioteket.",
    "order-digital-copy-feedback-error-missing-municipalityagencyid": "Fejl - mangler kommunal agentur-ID",
    "order-digital-copy-feedback-error-municipalityagencyid-not-found": "Fejl - kommunal agentur-ID blev ikke fundet",
    "order-digital-copy-feedback-error-pid-not-reservable": "Materialet kan ikke reserveres. Du kan bestille den digitale kopi ved at kontakte biblioteket.",
    "order-digital-copy-feedback-error-unauthenticated-user": "Du er ikke logget ind. Du kan bestille en digital kopi ved at kontakte institutionen.",
    "order-digital-copy-feedback-ok": "Den digitale kopi er bestilt. Du vil modtage en email, når den digitale kopi er klar.",
    "order-digital-copy-feedback-title": "Digital kopi kvittering",
    "order-digital-copy-feedback-unknown-user": "Ukendt bruger",
    "out-of": "ud af",
    "patron-contact-email-checkbox": "Modtag e-mails om dine lån, reserveringer osv.",
    "patron-contact-email-label": "E-mail",
    "patron-contact-info-body": "Husk at opdatere dine oplysninger, hvis du skifter mobilnummer eller\ne-mail.",
    "patron-contact-info-header": "KONTAKTOPLYSNINGER",
    "patron-contact-phone-checkbox": "Modtag sms om dine lån, reserveringer osv.",
    "patron-contact-phone-label": "Mobilnummer",
    "patron-page-change-pincode-body": "Skift nuværende kode ved at indtaste en ny kode og gem",
    "patron-page-change-pincode-header": "PINKODE",
    "patron-page-confirm-pincode-label": "Bekræft ny pinkode",
    "patron-page-phone-input-message": "Mobilnummeret skal være mellem 6 og 15 cifre ",
    "pause-reservation-modal-aria-description": "Denne pop-up gør det muligt at sætte dine fysiske reserveringer på pause",
    "pause-reservation-modal-below-inputs": "Du kan sætte dine reserveringer på pause mens du f.eks. er på ferie.",
    "pause-reservation-modal-body": "Sæt dine reserveringer på fysiske materialer på pause i god tid, da reserveringer som allerede er i proces ikke kan sættes på hold.",
    "pause-reservation-modal-cancel-button-label": "Fjern pause",
    "pause-reservation-modal-close-modal": "Luk pop-up til at sætte reserveringer på pause",
    "pause-reservation-modal-date-range-label": "Pauseperiode",
    "pause-reservation-modal-date-range-placeholder": "Vælg pauseperiode",
    "pause-reservation-modal-header": "Sæt dine reserveringer på pause",
    "pause-reservation-modal-link": "Læs mere om pausefunktionen",
    "pause-reservation-modal-save-button-label": "Gem",
    "physical-reservations-header": "Reserveringer på fysiske materialer",
    "pick-up-latest": "Hent senest @date",
    "pickup-branches-dropdown-label": "Vælg afhentningssted",
    "pickup-branches-dropdown-nothing-selected": "Intet valgt",
    "patron-page-pincode-label": "Ny pinkode",
    "patron-page-pincode-too-short-validation": "Pinkoden skal være på @pincodeLengthMin cifre",
    "patron-page-pincodes-not-the-same": "Pinkoderne er ikke identiske",
    "pincode-section-description": "Pinkode skal være 4 cifre",
    "publizon-audio-book": "Lydbog",
    "publizon-ebook": "E-bog",
    "publizon-podcast": "Podcast",
    "ready-for-loan-counter-label": "Klar",
    "ready-for-loan": "Klar til lån",
    "remove-all-reservations": "{\"type\":\"plural\",\"text\":[\"Fjern reservering (@amount)\",\"Slet reserveringer (@amount)\"]}",
    "remove-from-favorites-aria-label": "fjern @title fra huskelisten",
    "renew-button": "Forny",
    "renew-cannot-be-renewed": "Kan ikke fornyes",
    "renew-group-modal-loans-button": "Ok",
    "renew-group-modal-loans-error-status": "Noget gik galt. Prøv igen senere.",
    "renew-group-modal-loans-error-title": "Dine lån kunne ikke fornyes",
    "renew-group-modal-loans-no-renewals-possible-error-status": "Ingen af dine lån kunne fornyes. Kontakt evt. biblioteket.",
    "renew-group-modal-loans-no-renewals-possible-error-title": "Ingen lån kunne fornyes",
    "renew-group-modal-loans-success-status": "{\"type\":\"plural\",\"text\":[\"1 lån blev fornyet.\",\"@count lån blev fornyet.\"]}",
    "renew-group-modal-loans-success-title": "Du har fornyet de lån, der kunne fornys",
    "renew-material-loan-button": "Ok",
    "renew-material-loan-error-status": "Noget gik galt. Prøv venligst igen senere.",
    "renew-material-loan-error-title": "Dine lån kunne ikke fornyes",
    "renew-material-loan-no-renewals-possible-error-status": "Dit lån kunne ikke fornyes. Kontakt evt. biblioteket.",
    "renew-material-loan-no-renewals-possible-error-title": "Lånet kunne ikke fornyes",
    "renew-material-loan-success-status": "1 lån blev fornyet",
    "renew-material-loan-success-title": "Du har fornyet dit lån",
    "renew-processing": "Indlæser...",
    "reservation-details-borrow-before": "Lån før @date",
    "reservation-details-button-remove": "Slet din reservering",
    "reservation-details-cancel": "OK",
    "reservation-details-change": "Gem ændringer",
    "reservation-details-date-of-reservation-title": "Reserveringsdato",
    "reservation-details-digital-material-expires-title": "Lån før",
    "reservation-details-expires": "Din reservering udløber @date!",
    "reservation-details-expires-title": "Afhentningsfrist",
    "reservation-details-no-interest-after-title": "Ikke interesseret efter",
    "reservation-details-number-in-queue-label": "@count i køen",
    "reservation-details-others-in-queue": "Andre står i kø til dette materiale",
    "reservation-details-pick-up-at-title": "Afhentningssted",
    "reservation-details-pickup-deadline-title": "Afhentningsfrist",
    "reservation-details-ready-for-loan": "Klar til lån",
    "reservation-details-remove-digital-reservation": "Slet din reservering",
    "reservation-details-save": "Gem",
    "reservation-details-status-title": "Status",
    "reservation-list-all-empty": "Du har i øjeblikket 0 reserveringer",
    "reservation-list-day": "dag",
    "reservation-list-digital-pickup": "Online",
    "reservation-list-digital-reservations-empty": "Du har i øjeblikket 0 reserveringer på digitale materialer",
    "reservation-list-digital-reservations-header": "Digitale reserveringer",
    "reservation-list-first-in-queue": "Du er forrest i køen",
    "reservation-list-header": "Dine reserveringer",
    "reservation-list-loan-before": "Lån før @date",
    "reservation-list-on-hold-aria": "Reserveringer er sat på pause:",
    "reservation-list-pause-reservation-aria-modal": "Denne knap åbner en pop-up hvor du kan sætte reserveringer på pause",
    "reservation-list-pause-reservation-button": "Indstillinger",
    "reservation-list-pause-reservation-on-hold": "Dine fysiske reserveringer er sat på pause",
    "reservation-list-pause-reservation": "Sæt dine reserveringer på pause",
    "reservation-list-physical-reservations-empty": "Du har i øjeblikket 0 reserveringer på fysiske materialer",
    "reservation-list-physical-reservations-header": "Reserveringer på fysiske materialer",
    "reservation-list-ready-for-pickup-empty": "Du har ingen reserveringer klar til afhentning",
    "reservation-list-ready-for-pickup-title": "Klar til lån",
    "reservation-list-ready": "Klar",
    "reservation-list-status-icon-ready-for-pickup-aria-label": "Materialet er klar til lån",
    "reservation-list-status-icon-queued-aria-label": "{\"type\":\"plural\",\"text\":[\"Du er den eneste i k\\u00f8 til dette materiale\",\"Der st\\u00e5r @count i k\\u00f8 foran dig\"]}",
    "reservation-list-status-icon-ready-in-aria-label": "{\"type\":\"plural\",\"text\":[\"Materialet er klar til l\\u00e5n om en dag\",\"Materialet er klar om @count dage\"]}",
    "reservation-status-button": "Luk",
    "reservation-list-you-are-in-queue": "Du er i reserveringskø",
    "reservation-list-available-in": "Klar til lån om @count dage",
    "reservation-list-days": "dage",
    "reservation-list-in-queue": "I kø",
    "reservation-list-number-in-queue": "Der er @count i kø før dig",
    "reservation-pick-up-latest": "Hent senest @date",
    "reservations-still-in-queue-for": "Stadig i kø",
    "reservations-ready": "Klar til dig",
    "result-pager-status": "Viser @itemsShown ud af @hitcount elementer",
    "reservation-success-sub-title": "Klik på knappen for at lukke vinduet",
    "reservation-success-title": "Din reservering er blevet ændret",
    "search-header-dropdown": "Dropdown med yderligere søgefunktioner",
    "search-header-favorites": "Husk",
    "search-header-login": "Log ind",
    "save-button": "Gem",
    "screen-reader-modal-description-email": "Skærmlæser modulbeskrivelse for email",
    "screen-reader-modal-description-interest-period": "Beskrivelse til skærmlæser af pop-up vedr. interesseperiode",
    "screen-reader-modal-description-pickup": "Beskrivelse til skærmlæser af pop-up vedr. valg af afhentningsbibliotek",
    "screen-reader-modal-description-sms": "Skærmlæser modulbeskrivelse til sms",
    "search-header-icon-alt": "Søgeknap",
    "search-header-input-label": "Søgeheader input",
    "search-no-valid-characters-error": "Input skal indeholde minimum ét tegn",
    "shift": "Skift",
    "show-more": "vis flere",
    "six-months": "6 måneder",
    "status-badge-warning": "Udløber snart",
    "string-suggestion-author": "Forfatter",
    "string-suggestion-topic": "Emne",
    "string-suggestion-work": "Titel",
    "subject-number": "Emnetal",
    "three-months": "3 måneder",
    "two-months": "2 måneder"
  },
  "configs": {
    "agency": "{\"id\":\"710100\"}",
    "reservation-details": "{\"allowRemoveReadyReservations\":false}",
    "error-messages": "{\"containerId\":\"dpl-react-apps-error-messages\",\"shouldOnlyShowOneError\":true}"
  }
}

export default preview;
