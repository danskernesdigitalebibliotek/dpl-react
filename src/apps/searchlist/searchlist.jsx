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
      asideClass="dpl-searchlist__buttons"
      aside={
        <>
          <Skeleton width="140px" height="50px" />
          <Skeleton width="140px" height="50px" />
        </>
      }
    >
      <div>
        <Skeleton height="30px" width="95px" mb="12px" />
      </div>
    </ListItem>
  );
}

function fullSearchUrl(searchUrl, query) {
  return replacePlaceholders({
    text: searchUrl,
    placeholders: {
      query: encodeURIComponent(query)
    }
  });
}

function Searchlist({
  searches,
  status,
  removeButtonText,
  searchUrl,
  emptyListText,
  errorText,
  onRemoveSearch,
  goToSearchText
}) {
  if (status === "initial") {
    return <UnorderedList>{getList(4).map(SkeletonElement)}</UnorderedList>;
  }

  if (status === "failed") {
    return <Alert message={errorText} type="assertive" variant="warning" />;
  }

  if (status === "ready" && searches.length === 0) {
    return <Alert message={emptyListText} type="polite" variant="info" />;
  }

  return (
    <UnorderedList>
      {searches.map(search => {
        return (
          <ListItem
            className="dpl-searchlist__item"
            key={search.id}
            childrenClass="dpl-searchlist__children"
            asideClass="dpl-searchlist__buttons"
            aside={
              <>
                <Button
                  className="dpl-searchlist__remove-button dpl-searchlist__button"
                  onClick={() => onRemoveSearch(search.id)}
                  variant="secondary"
                  align="center"
                >
                  {removeButtonText}
                </Button>
                <Button
                  className="dpl-searchlist__result-button dpl-searchlist__button"
                  align="center"
                  href={fullSearchUrl(searchUrl, search.query)}
                >
                  {goToSearchText}
                </Button>
              </>
            }
          >
            <h2 className="dpl-searchlist__header">
              <a href={fullSearchUrl(searchUrl, search.query)}>
                {search.title}
              </a>
            </h2>
          </ListItem>
        );
      })}
    </UnorderedList>
  );
}

Searchlist.propTypes = {
  status: PropTypes.oneOf(["initial", "ready", "failed"]),
  onRemoveSearch: PropTypes.func.isRequired,
  emptyListText: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  removeButtonText: PropTypes.string.isRequired,
  goToSearchText: PropTypes.string.isRequired,
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
  status: "initial"
};

export default Searchlist;
