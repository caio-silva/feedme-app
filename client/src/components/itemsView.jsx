import React from "react";
import ItemView from "./common/itemView";
import Pagination from "./common/pagination";
const ItemsView = props => {
  const {
    recipes,
    onSelect,
    onPageChange,
    currentPage,
    itemsCount,
    pageSize
  } = props;
  return (
    <div className="row no-gutters">
      {recipes.map(item => (
        <ItemView
          onSelect={onSelect}
          key={item._id + Math.random()}
          src={item.image}
          title={item.title}
          id={item._id}
          sourceUrl={item.sourceUrl.replace("https", "http")}
          ingredientsList={item.ingredientsList}
        />
      ))}
      <div className=" row w-100 justify-content-center">
        <Pagination
          itemsCount={itemsCount}
          pageSize={pageSize}
          onPageChange={onPageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ItemsView;
