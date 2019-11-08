import React from "react";
import PropTypes from "prop-types";

export function Searchlist({ items }) {
  return (
    <ul className="list">
      {items.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}

Searchlist.defaultProps = {
  items: [
    {
      id: 1,
      text: "Harry Potter"
    },
    {
      id: 2,
      text: "Tolkien"
    }
  ]
};

Searchlist.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string
    })
  )
};

export default Searchlist;
