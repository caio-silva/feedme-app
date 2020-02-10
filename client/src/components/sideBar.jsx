import React from "react";

export const SideBar = props => {
  const { items, onSelect, selected, qnty, isLoading } = props;
  return (
    <ul className="list-group sideBar">
      {items.map(item => (
        <li
          key={item}
          onClick={() => onSelect(item)}
          className={
            selected === item
              ? "w-75 list-group-item badge-light"
              : "w-75 list-group-item"
          }
        >
          {item}
          {isLoading ? (
            ""
          ) : selected === item && selected !== "All recipes" ? (
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
