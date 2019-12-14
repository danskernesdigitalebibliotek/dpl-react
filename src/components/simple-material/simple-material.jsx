import React from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";
import replacePlaceholders from "../../core/replacePlaceholders";

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
      <div className={`ddb-simple-material__data ${dataClass}`}>
        {item.type}
        <a
          href={replacePlaceholders({
            text: materialUrl,
            placeholders: {
              pid: encodeURIComponent(item.pid)
            }
          })}
        >
          <h2>{item.title}</h2>
        </a>
        <p className="ddb-simple-material__author-year">
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
          ({item.year})
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
