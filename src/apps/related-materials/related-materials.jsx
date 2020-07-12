import React, { useState } from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";
import Skeleton from "../../components/atoms/skeleton/skeleton";
import replacePlaceholders from "../../core/replacePlaceholders";

function RelatedMaterialSkeleton() {
  return (
    <div className="ddb-related-material ddb-related-material__skeleton">
      <Skeleton mr={0} ml={0} mb={0} mt={0} height="100%" width="100%" />
    </div>
  );
}

function RelatedMaterial({
  pid,
  type,
  title,
  creators,
  year,
  cover,
  materialUrl
}) {
  const [imageStatus, setImageStatus] = useState("initial");
  const coverUrl = cover.imageUrls.large.url;
  const formattedCreators = creators.join(", ");
  const alt = `${type} - ${formattedCreators}: ${title} (${year})`;
  return (
    <a
      className={`ddb-related-material ${imageStatus === "finished" &&
        "ddb-related-material--finished"}`}
      href={replacePlaceholders({
        text: materialUrl,
        placeholders: {
          pid: encodeURI(pid)
        }
      })}
    >
      <img onLoad={() => setImageStatus("finished")} alt={alt} src={coverUrl} />
    </a>
  );
}

RelatedMaterial.defaultProps = {
  creators: []
};

RelatedMaterial.propTypes = {
  pid: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  creators: PropTypes.arrayOf(PropTypes.string),
  year: PropTypes.string.isRequired,
  cover: PropTypes.shape({
    id: PropTypes.string,
    imageUrls: PropTypes.shape({
      // We currently only use the large size for displaying related materials.
      large: PropTypes.shape({
        url: urlPropType,
        format: PropTypes.oneOf(["png", "jpeg"]),
        size: PropTypes.oneOf([
          "original",
          "default",
          "small",
          "medium",
          "large"
        ])
      })
    }),
    type: PropTypes.oneOf(["pid"])
  }).isRequired,
  materialUrl: urlPropType.isRequired
};

function RelatedMaterials({
  items,
  status,
  searchUrl,
  materialUrl,
  searchText,
  titleText
}) {
  if (status === "failed" || status === "empty") {
    // Return discretly.
    // When a failure occurs there is no use in showing links or anything since
    // the fail would mean a lack of works/materials.
    // An actual unhandled failure would still result in our error boundary.
    // At the moment we also do not render anything if there are no materials
    // to show.
    return null;
  }
  return (
    <div className="ddb-related-materials">
      <h2 className="ddb-reset ddb-related-materials__title">{titleText}</h2>
      <ul className="ddb-reset ddb-related-materials__list">
        {items.map(item =>
          item.data ? (
            <li key={item.id}>
              <RelatedMaterial
                pid={item.data.pid}
                title={item.data.title}
                creators={item.data.creators}
                type={item.data.type}
                year={item.data.year}
                cover={item.data.cover}
                materialUrl={materialUrl}
              />
            </li>
          ) : (
            <li key={item.id}>
              <RelatedMaterialSkeleton />
            </li>
          )
        )}
      </ul>
      <a className="ddb-related-materials__search" href={searchUrl}>
        {searchText}
      </a>
    </div>
  );
}

RelatedMaterials.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  searchUrl: urlPropType.isRequired,
  materialUrl: urlPropType.isRequired,
  searchText: PropTypes.string.isRequired,
  titleText: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["ready", "processing", "finished", "failed"])
    .isRequired
};

RelatedMaterials.defaultProps = {
  items: []
};

export default RelatedMaterials;
