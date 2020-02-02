import React from "react";

export const SideBar = props => {
  const { items, onSelect } = props;
  return (
    <ul className="list-group sideBar">
      {items.map(item => (
        <li
          key={item}
          onClick={() => onSelect(item)}
          className="list-group-item"
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
