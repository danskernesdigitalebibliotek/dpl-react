import { getMaterialTypes } from "../../core/utils/helpers/general";
import { Manifestation } from "../../core/utils/types/entities";
import { LoanType } from "../../core/utils/types/loan-type";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";

type AssetType = {
  src: string;
  type: "script" | "link";
  id: string;
};

export const playerAssets: AssetType[] = [
  {
    src: "https://play.pubhub.dk/1.3.0/js/player-kernel.min.js",
    type: "script",
    id: "player-kernel-js"
  }
];

export const readerAssets: AssetType[] = [
  {
    src: "https://reader.pubhub.dk/2.2.0/js/chunk-vendors.js",
    type: "script",
    id: "reader-chunk-vendors-js"
  },
  {
    src: "https://reader.pubhub.dk/2.2.0/js/app.js",
    type: "script",
    id: "reader-app-js"
  },
  {
    src: "https://reader.pubhub.dk/2.2.0/css/chunk-vendors.css",
    type: "link",
    id: "reader-chunk-vendors-css"
  },
  {
    src: "https://reader.pubhub.dk/2.2.0/css/app.css",
    type: "link",
    id: "reader-app-css"
  }
];

const appendedAssets = new Set<HTMLElement>();

export const appendAsset = ({ src, type, id }: AssetType) => {
  if (type === "script") {
    const scriptElement = document.createElement("script");
    scriptElement.src = src;
    scriptElement.defer = true;
    scriptElement.async = false;
    scriptElement.type = "module";
    scriptElement.id = id;
    document.head.appendChild(scriptElement);
    appendedAssets.add(scriptElement);
  }

  if (type === "link") {
    const linkElement = document.createElement("link");
    linkElement.href = src;
    linkElement.rel = "stylesheet";
    linkElement.id = id;
    document.head.appendChild(linkElement);
    appendedAssets.add(linkElement);
  }
};

export const removeAppendedAssets = () => {
  appendedAssets.forEach((element) => {
    if (document.head.contains(element)) {
      document.head.removeChild(element);
    }
    appendedAssets.delete(element);
  });
};

export const hasReaderManifestation = (manifestations: Manifestation[]) => {
  const materialTypes = getMaterialTypes(manifestations);
  return materialTypes.some(
    (type) =>
      type === ManifestationMaterialType.ebook ||
      type === ManifestationMaterialType.pictureBookOnline ||
      type === ManifestationMaterialType.animatedSeriesOnline ||
      type === ManifestationMaterialType.yearBookOnline
  );
};

export const hasPlayerManifestation = (manifestations: Manifestation[]) => {
  const materialTypes = getMaterialTypes(manifestations);
  return materialTypes.some(
    (type) =>
      type === ManifestationMaterialType.audioBook ||
      type === ManifestationMaterialType.podcast ||
      type === ManifestationMaterialType.musicOnline ||
      type === ManifestationMaterialType.audioBookTape
  );
};

export const getOrderIdByIdentifier = ({
  loans,
  identifier
}: {
  loans: LoanType[];
  identifier: string;
}) => {
  const loanWithIdentifier = loans.find((i) => i.identifier === identifier);
  return loanWithIdentifier ? loanWithIdentifier.orderId : null;
};

export const getReaderPlayerType = (
  manifestations: Manifestation[]
): "reader" | "player" | null => {
  if (hasReaderManifestation(manifestations)) return "reader";
  if (hasPlayerManifestation(manifestations)) return "player";
  return null;
};

export default {};
