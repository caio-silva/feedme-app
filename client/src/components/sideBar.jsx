import React from "react";

export const SideBar = props => {
  const { items, onSelect, selected } = props;
  return (
    <ul className="list-group sideBar">
      {items.map(item => (
        <li
          key={item}
          onClick={() => onSelect(item)}
          className={
            selected === item
              ? "list-group-item badge-light"
              : "list-group-item"
          }
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
