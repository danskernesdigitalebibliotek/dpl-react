import React from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";
import Alert from "../../components/alert/alert";
import replacePlaceholders from "../../core/replacePlaceholders";
import ListItem from "../../components/list-item/list-item";
import Skeleton, { getList } from "../../components/atoms/skeleton/skeleton";
import UnorderedList from "../../components/atoms/list/list";
import Button from "../../components/atoms/button/button";

function SkeletonElement(_, index) {
  return (
    <ListItem
      key={index}
      aside={
        <>
          <Skeleton width="140px" height="50px" />
          <Skeleton width="140px" height="50px" />
        </>
      }
    >
      <div>
        <Skeleton height="30px" width="95px" mb="12px" />
        <Skeleton width="60px" mb="12px" />
      </div>
    </ListItem>
  );
}

function Searchlist({
  searches,
  loading,
  removeButtonText,
  searchUrl,
  emptyListText,
  errorText,
  onRemoveSearch
}) {
  if (loading === "failed") {
    return <Alert message={errorText} type="assertive" variant="warning" />;
  }

  if (loading === "active") {
    return <UnorderedList>{getList(4).map(SkeletonElement)}</UnorderedList>;
  }

  if (loading === "finished" && searches.length === 0) {
    return <Alert message={emptyListText} type="polite" variant="info" />;
  }

  return (
    <UnorderedList>
      {searches.map(search => {
        return (
          <ListItem
            className="ddb-searchlist__item"
            key={search.id}
            childrenClass="ddb-searchlist__children"
            aside={
              <>
                <Button
                  className="ddb-searchlist__remove-button"
                  onClick={() => onRemoveSearch(search.id)}
                  align="center"
                >
                  {removeButtonText}
                </Button>
              </>
            }
          >
            <h2 className="ddb-searchlist__header">
              <a
                href={replacePlaceholders({
                  text: searchUrl,
                  placeholders: {
                    query: encodeURIComponent(search.query)
                  }
                })}
              >
                {search.title}
              </a>
            </h2>
            <p className="ddb-searchlist__query">{search.query}</p>
          </ListItem>
        );
      })}
    </UnorderedList>
  );
}

Searchlist.propTypes = {
  loading: PropTypes.oneOf(["inactive", "active", "finished", "failed"]),
  onRemoveSearch: PropTypes.func.isRequired,
  emptyListText: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  removeButtonText: PropTypes.string.isRequired,
  searchUrl: urlPropType.isRequired,
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
