import React from "react";
import PropTypes from "prop-types";
import Skeleton from "../../components/atoms/skeleton/skeleton";

function Checklist({ loading, items, onRemove }) {
  if (loading === "active") {
    return (
      <div>
        <Skeleton width="50px" />
        <Skeleton width="30px" />
        <Skeleton width="80px" />
        <Skeleton width="40px" />
      </div>
    );
  }

  if (loading === "finished" && items.length === 0) {
    return <div>No items on the list!</div>;
  }

  return (
    <ul className="list">
      {items.map(item => (
        <li key={item}>
          {item}{" "}
          <button type="button" onClick={() => onRemove(item)}>
            remove
          </button>
        </li>
      ))}
    </ul>
  );
}

Checklist.defaultProps = {
  items: [],
  loading: "inactive"
};

Checklist.propTypes = {
  loading: PropTypes.oneOf(["inactive", "active", "finished"]),
  items: PropTypes.arrayOf(PropTypes.string),
  onRemove: PropTypes.func.isRequired
};

export default Checklist;
