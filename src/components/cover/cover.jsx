import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";
import CoverService from "../../core/CoverService";
import Skeleton from "../atoms/skeleton/skeleton";

export const COVER_RETRIEVED = "retrieved";
export const COVER_EMPTY = "empty";
export const COVER_INITIAL = "initial";

/**
 * @typedef Cover
 * @property {('initial'|'retrieved'|'empty')} status
 *   The state of the cover being displayed:
 *   - "initial": If we do not know whether a cover exists or not.
 *   - "retrieved": If a cover image has been retrieved from the cover service.
 *   - "empty": If there is no cover image available.
 * @property {string} url
 *   The cover image url.
 */

/**
 * A custom hook that retrieves a cover image.
 *
 * @export
 * @param {object} options
 * @param {string} options.id
 * @param {string} options.format
 * @param {('default'|'small'|'medium'|'large'|'original')}  options.size
 * @param {string} options.idType
 * @param {boolean} options.generic
 * @param {string} options.coverServiceUrl
 *
 * @returns Cover
 */
export function useCover({
  id,
  format = "jpeg",
  size = "default",
  idType = "pid",
  generic = false,
  coverServiceUrl = "https://cover.dandigbib.org/api"
}) {
  const [status, setStatus] = useState({ status: COVER_INITIAL });
  useEffect(() => {
    const coverClient = new CoverService({
      baseUrl: coverServiceUrl
    });
    coverClient
      .getCover({ id, size: [size], format: [format], idType, generic })
      .then(response => setStatus({ status: COVER_RETRIEVED, url: response }))
      .catch(() => setStatus({ status: COVER_EMPTY }));
  }, [id, format, size, idType, generic, coverServiceUrl]);
  return status || { status: COVER_EMPTY };
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

function Cover({ status, src, alt, coverClassName, className }) {
  if (status === COVER_INITIAL) {
    return <CoverSkeleton className={coverClassName} />;
  }
  if (status === COVER_EMPTY) {
    return null;
  }
  return <img className={className} src={src} alt={alt} />;
}

Cover.defaultProps = {
  status: "initial",
  src: "",
  coverClassName: "",
  className: ""
};

Cover.propTypes = {
  status: PropTypes.oneOf(["initial", "empty", "retrieved"]),
  src: urlPropType,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  coverClassName: PropTypes.string
};

export default Cover;
