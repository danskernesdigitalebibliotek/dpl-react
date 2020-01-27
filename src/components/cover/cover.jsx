import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CoverService from "../../core/CoverService";
import Skeleton from "../atoms/skeleton/skeleton";

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

function Cover({
  id,
  format,
  size,
  idType,
  generic,
  alt,
  coverClassName,
  className,
  coverServiceUrl
}) {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    const coverClient = new CoverService({
      baseUrl: coverServiceUrl
    });
    coverClient
      .getCover({ id, size: [size], format: [format], idType, generic })
      .then(response => setSrc(response));
  }, [id, format, size, idType, generic, coverServiceUrl]);

  return src ? (
    <img className={className} src={src} alt={alt} />
  ) : (
    <CoverSkeleton className={coverClassName} />
  );
}

Cover.defaultProps = {
  idType: "pid",
  format: "jpeg",
  size: "default",
  generic: true,
  coverClassName: "",
  className: ""
};

Cover.propTypes = {
  id: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  idType: PropTypes.oneOf(["faust", "isbn", "issn", "pid"]),
  format: PropTypes.oneOf(["jpeg", "png"]),
  size: PropTypes.oneOf(["default", "original", "thumbnail"]),
  generic: PropTypes.bool,
  className: PropTypes.string,
  coverClassName: PropTypes.string,
  coverServiceUrl: PropTypes.string.isRequired
};

export default Cover;
