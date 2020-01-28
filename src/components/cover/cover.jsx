import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";
import CoverService from "../../core/CoverService";
import Skeleton from "../atoms/skeleton/skeleton";

export const COVER_EMPTY = "empty";
export const COVER_INITIAL = "initial";

/**
 * A custom hook that retrives a cover image.
 *
 * @export
 * @param {object} options
 * @param {string} options.id
 * @param {string} options.format
 * @param {string} options.size
 * @param {string} options.idType
 * @param {boolean} options.generic
 * @param {string} options.coverServiceUrl
 *
 * @returns either an "initial", "empty" or actual src status.
 */
export function useCover({
  id,
  format = "jpeg",
  size = "default",
  idType = "pid",
  generic = false,
  coverServiceUrl = "https://cover.dandigbib.org/api"
}) {
  const [status, setStatus] = useState(COVER_INITIAL);
  useEffect(() => {
    const coverClient = new CoverService({
      baseUrl: coverServiceUrl
    });
    coverClient
      .getCover({ id, size: [size], format: [format], idType, generic })
      .then(response => setStatus(response))
      .catch(() => setStatus(COVER_EMPTY));
  }, [id, format, size, idType, generic, coverServiceUrl]);
  return status || COVER_EMPTY;
}

export function CoverSkeleton({ className }) {
  return (
    <Skeleton
      className={className}
      br="0px"
      mb="0px"
      mt="0px"
      height="154px"
      width="100px"
    />
  );
}

CoverSkeleton.defaultProps = {
  className: ""
};

CoverSkeleton.propTypes = {
  className: PropTypes.string
};

function Cover({ src, alt, coverClassName, className }) {
  if (src === COVER_INITIAL) {
    return <CoverSkeleton className={coverClassName} />;
  }
  if (src === COVER_EMPTY) {
    return null;
  }
  return <img className={className} src={src} alt={alt} />;
}

Cover.defaultProps = {
  coverClassName: "",
  className: "",
  src: "initial"
};

Cover.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.oneOfType([
    PropTypes.oneOf(["initial", "empty"]),
    urlPropType
  ]),
  className: PropTypes.string,
  coverClassName: PropTypes.string
};

export default Cover;
