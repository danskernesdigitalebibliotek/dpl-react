import React from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";
import Skeleton, { getList } from "../../components/atoms/skeleton/skeleton";
import Button from "../../components/atoms/button/button";
import UnorderedList from "../../components/atoms/list/list";
import Alert from "../../components/alert/alert";
import ListItem from "../../components/list-item/list-item";
import SimpleMaterial from "../../components/simple-material/simple-material";

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
  errorText,
  ofText
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
          <SimpleMaterial
            item={item}
            materialUrl={materialUrl}
            authorUrl={authorUrl}
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
  errorText: PropTypes.string.isRequired,
  ofText: PropTypes.string.isRequired
};

export default Checklist;
