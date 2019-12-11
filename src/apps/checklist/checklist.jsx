import React from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";
import Skeleton from "../../components/atoms/skeleton/skeleton";
import Button from "../../components/atoms/button/button";
import UnorderedList from "../../components/atoms/list/list";
import Alert from "../../components/alert/alert";
import createPath from "../../core/createPath";
import ListItem from "../../components/list-item/list-item";

function getList(length) {
  return Array.from(new Array(length));
}

function SkeletonElement(_, index) {
  return (
    <ListItem key={index} aside={<Skeleton width="151px" height="50px" />}>
      <figure className="ddb-checklist__cover">
        <Skeleton br="0px" mb="0px" mt="0px" height="154px" width="100px" />
      </figure>
      <div className="ddb-checklist__data">
        <Skeleton width="45px" mb="12px" />
        <Skeleton width="145px" mb="12px" />
        <Skeleton width="95px" />
      </div>
    </ListItem>
  );
}

function Checklist({
  loading,
  items,
  onRemove,
  materialUrl,
  authorUrl,
  removeButtonText,
  emptyListText,
  errorText
}) {
  if (loading === "failed") {
    return <Alert type="assertive" variant="warning" message={errorText} />;
  }

  if (loading === "active") {
    return <UnorderedList>{getList(4).map(SkeletonElement)}</UnorderedList>;
  }

  if (loading === "finished" && items.length === 0) {
    return <Alert type="polite" message={emptyListText} />;
  }

  return (
    <UnorderedList>
      {items.map(item => (
        <ListItem
          aside={
            <Button
              className="ddb-checklist__button"
              variant="charcoal"
              onClick={() => onRemove(item.pid)}
            >
              {removeButtonText}
            </Button>
          }
        >
          <figure className="ddb-checklist__cover">
            <a
              href={createPath({
                url: materialUrl,
                property: ":pid",
                value: item.pid
              })}
            >
              <img src={item.coverUrl} alt={item.title} />
            </a>
          </figure>
          <div className="ddb-checklist__data">
            {item.type}
            <a
              href={createPath({
                url: materialUrl,
                property: ":pid",
                value: item.pid
              })}
            >
              <h2>{item.title}</h2>
            </a>
            <p className="ddb-checklist__author-year">
              {`Af `}
              {item.creators.map((creator, index) => {
                return (
                  <span key={creator}>
                    <a
                      href={createPath({
                        url: authorUrl,
                        property: ":author",
                        value: creator
                      })}
                    >
                      {creator}
                    </a>
                    {item.creator[index + 1] ? ", " : " "}
                  </span>
                );
              })}
              ({item.year})
            </p>
          </div>
        </ListItem>
      ))}
    </UnorderedList>
  );
}

Checklist.defaultProps = {
  items: [],
  loading: "inactive"
};

Checklist.propTypes = {
  loading: PropTypes.oneOf(["inactive", "active", "finished", "failed"]),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      pid: PropTypes.string,
      creators: PropTypes.arrayOf(PropTypes.string),
      title: PropTypes.string,
      type: PropTypes.string,
      year: PropTypes.string,
      coverUrl: urlPropType
    })
  ),
  onRemove: PropTypes.func.isRequired,
  materialUrl: PropTypes.string.isRequired,
  authorUrl: PropTypes.string.isRequired,
  removeButtonText: PropTypes.string.isRequired,
  emptyListText: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired
};

export default Checklist;
