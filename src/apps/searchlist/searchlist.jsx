import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import ListItem from "../../components/list-item/list-item";
import Skeleton, { getList } from "../../components/atoms/skeleton/skeleton";
import UnorderedList from "../../components/atoms/list/list";
import Button from "../../components/atoms/button/button";

/**
 * Provided a string with tags noted inside of it with ":" in front
 * of the keyname we replace said tags with it's value.
 *
 * @param {object} options
 * @param {string} options.text
 * @param {object} options.tag corresponsing keys to what's assigned in the text must be present here.
 * @returns {string} text with the values of the tags inserted.
 */
function replaceTags({ text = "", tags = {} } = {}) {
  return Object.keys(tags).reduce(function replaceTag(acc, tag) {
    return acc.replace(`:${tag}`, tags[tag]);
  }, text);
}

function SkeletonElement(_, index) {
  return (
    <ListItem
      key={index}
      aside={
        <>
          <Skeleton width="130px" height="50px" />
          <Skeleton width="130px" height="50px" />
        </>
      }
    >
      <div className="ddb-searchlist__container">
        <Skeleton height="30px" width="95px" mb="12px" />
        <Skeleton width="60px" mb="12px" />
        <Skeleton width="145px" />
      </div>
    </ListItem>
  );
}

function Searchlist({
  searches,
  loading,
  newButtonText,
  removeButtonText,
  searchUrl,
  statusText
}) {
  if (loading === "active") {
    return <UnorderedList>{getList(8).map(SkeletonElement)}</UnorderedList>;
  }

  return (
    <UnorderedList>
      {searches.map(search => (
        <ListItem
          key={search.id}
          childrenClass="ddb-searchlist__container"
          aside={
            <>
              {search.hit_count > 0 && (
                <Button
                  className="ddb-searchlist__new-button"
                  variant="charcoal"
                >
                  {newButtonText}
                </Button>
              )}
              <Button>{removeButtonText}</Button>
            </>
          }
        >
          <h2 className="ddb-searchlist__header">
            <a
              href={replaceTags({
                text: searchUrl,
                tags: {
                  query: search.query
                }
              })}
            >
              {search.title}
            </a>
          </h2>
          <p className="ddb-searchlist__query">{search.query}</p>
          {search.hit_count > 0 && (
            <p className="ddb-searchlist__status">
              {replaceTags({
                text: statusText,
                tags: {
                  hit_count: search.hit_count
                }
              })}{" "}
              <time dateTime={search.last_seen}>
                {dayjs(search.last_seen).format("DD/MM-YYYY")}
              </time>
              .
            </p>
          )}
        </ListItem>
      ))}
    </UnorderedList>
  );
}

Searchlist.propTypes = {
  loading: PropTypes.oneOf(["inactive", "active", "finished", "failed"]),
  statusText: PropTypes.string.isRequired,
  newButtonText: PropTypes.string.isRequired,
  removeButtonText: PropTypes.string.isRequired,
  searchUrl: PropTypes.string.isRequired,
  searches: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      hit_count: PropTypes.number.isRequired,
      last_seen: PropTypes.string.isRequired,
      query: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired
};

Searchlist.defaultProps = {
  loading: "inactive"
};

export default Searchlist;
