import React from "react";

export const SideBar = props => {
  const { items, onSelect, selected, qnty } = props;
  return (
    <ul className="list-group sideBar">
      {items.map(item => (
        <li
          key={item}
          onClick={() => onSelect(item)}
          className={
            selected === item
              ? "w-100 list-group-item badge-light"
              : "w-100 list-group-item"
          }
        >
          {item}
          {selected === item ? (
            <span
              className="badge badge-light"
              style={{
                display: "block",
                position: "absolute",
                top: "14px",
                right: "14px"
              }}
            >
              {qnty}
            </span>
          ) : (
            ""
          )}
        </li>
      ))}
    </ul>
  );
};
