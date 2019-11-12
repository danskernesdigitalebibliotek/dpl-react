import React from "react";
import PropTypes from "prop-types";

export function Checklist({ items }) {
  return (
    <ul className="list">
      {items.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}

Checklist.defaultProps = {
  items: [
    {
      id: 1,
      text: "Eragon"
    },
    {
      id: 2,
      text: "Dragonlance"
    }
  ]
};

Checklist.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string
    })
  )
};

export default Checklist;
