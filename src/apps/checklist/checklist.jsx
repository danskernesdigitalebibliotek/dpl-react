import React from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";
import Skeleton, { getList } from "../../components/atoms/skeleton/skeleton";
import Button from "../../components/atoms/button/button";
import UnorderedList from "../../components/atoms/list/list";
import Alert from "../../components/alert/alert";
import ListItem from "../../components/list-item/list-item";
import SimpleMaterial, {
  SimpleMaterialSkeleton
} from "../../components/simple-material/simple-material";

function SkeletonElement(_, index) {
  return (
    <ListItem key={index} aside={<Skeleton width="136px" height="50px" />}>
      <SimpleMaterialSkeleton />
    </ListItem>
  );
}

function Checklist({
  status,
  items,
  onRemove,
  materialUrl,
  authorUrl,
  coverServiceUrl,
  removeButtonText,
  emptyListText,
  errorText,
  ofText
}) {
  if (status === "initial") {
    return <UnorderedList>{getList(4).map(SkeletonElement)}</UnorderedList>;
  }

  if (status === "failed") {
    return <Alert type="assertive" variant="warning" message={errorText} />;
  }

  if (status === "ready" && items.length === 0) {
    return <Alert type="polite" message={emptyListText} />;
  }

  return (
    <UnorderedList>
      {items.map(item => (
        <ListItem
          key={item.pid}
          aside={
            <Button
              className="ddb-checklist__button"
              variant="charcoal"
              align="center"
              onClick={() => onRemove(item.pid)}
            >
              {removeButtonText}
            </Button>
          }
        >
          <SimpleMaterial
            item={item}
            materialUrl={materialUrl}
            authorUrl={authorUrl}
            coverServiceUrl={coverServiceUrl}
            ofText={ofText}
            dataClass="ddb-checklist__data"
          />
        </ListItem>
      ))}
    </UnorderedList>
  );
}

Checklist.defaultProps = {
  items: [],
  status: "initial"
};

Checklist.propTypes = {
  status: PropTypes.oneOf(["initial", "ready", "failed"]),
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
  coverServiceUrl: PropTypes.string.isRequired,
  removeButtonText: PropTypes.string.isRequired,
  emptyListText: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  ofText: PropTypes.string.isRequired
};

export default Checklist;
