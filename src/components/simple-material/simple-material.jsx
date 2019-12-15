import React from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";
import replacePlaceholders from "../../core/replacePlaceholders";
import Skeleton from "../atoms/skeleton/skeleton";

export function SimpleMaterialSkeleton({ style }) {
  return (
    <div className="ddb-simple-material-skeleton" style={style}>
      <figure className="ddb-reset">
        <Skeleton br="0px" mb="0px" mt="0px" height="154px" width="100px" />
      </figure>
      <div>
        <Skeleton width="45px" mb="12px" />
        <Skeleton width="145px" mb="12px" />
        <Skeleton width="95px" />
      </div>
    </div>
  );
}

SimpleMaterialSkeleton.propTypes = {
  style: PropTypes.objectOf(PropTypes.any)
};

SimpleMaterialSkeleton.defaultProps = {
  style: {}
};

function SimpleMaterial({
  item,
  materialUrl,
  authorUrl,
  ofText,
  className,
  dataClass,
  style
}) {
  return (
    <section className={`ddb-simple-material ${className}`} style={style}>
      {item.coverUrl && (
        <figure className="ddb-simple-material__cover">
          <a
            href={replacePlaceholders({
              text: materialUrl,
              placeholders: {
                pid: encodeURIComponent(item.pid)
              }
            })}
          >
            <img src={item.coverUrl} alt={item.title} />
          </a>
        </figure>
      )}
      <div className={`ddb-simple-material__data ${dataClass}`}>
        {item.type && (
          <span className="ddb-simple-material__type">{item.type}</span>
        )}
        <a
          href={replacePlaceholders({
            text: materialUrl,
            placeholders: {
              pid: encodeURIComponent(item.pid)
            }
          })}
        >
          <h2 className="ddb-simple-material__title">{item.title}</h2>
        </a>
        <p className="ddb-simple-material__author-year">
          {item.creators && (
            <span className="ddb-simple-material__author">
              {`${ofText} `}
              {item.creators.map((creator, index) => {
                return (
                  <span key={creator}>
                    <a
                      href={replacePlaceholders({
                        text: authorUrl,
                        placeholders: {
                          author: encodeURIComponent(creator)
                        }
                      })}
                    >
                      {creator}
                    </a>
                    {item.creators[index + 1] ? ", " : " "}
                  </span>
                );
              })}
            </span>
          )}
          {item.year && (
            <time dateTime={item.year} className="ddb-simple-material__year">
              ({item.year})
            </time>
          )}
        </p>
      </div>
    </section>
  );
}

SimpleMaterial.propTypes = {
  ofText: PropTypes.string,
  className: PropTypes.string,
  dataClass: PropTypes.string,
  materialUrl: urlPropType.isRequired,
  authorUrl: urlPropType.isRequired,
  item: PropTypes.shape({
    pid: PropTypes.string.isRequired,
    creators: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    type: PropTypes.string,
    year: PropTypes.string,
    coverUrl: urlPropType
  }).isRequired,
  style: PropTypes.objectOf(PropTypes.any)
};

SimpleMaterial.defaultProps = {
  ofText: "Af",
  className: "",
  dataClass: "",
  style: {}
};

export default SimpleMaterial;
