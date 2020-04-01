import React from "react";
import user from "../services/userService";
import { toast } from "react-toastify";

const Recipe = props => {
  const { image, title, instructions, ...rest } = props.item;
  async function onAddClick() {
    try {
      for (let item of rest.extendedIngredients) {
        await user.setStock({
          barcode: item.id,
          quantity: 50
        });
      }
      toast("All products added to stock.");
    } catch (error) {
      toast.error("Sorry, there was an error.");
    }
  }

  return (
    <div className="row no-gutters">
      <div
        className="col text-center my-3"
        style={{
          backgroundColor: "#f4f4f4",
          color: "#000",
          borderRadius: "5px"
        }}
      >
        <h1 className="my-3">{title}</h1>
        <img
          className="img-fluid"
          src={image}
          alt={title}
          style={{
            borderRadius: "5px",
            boxShadow: "5px 5px #222",
            maxWidth: "100%,",
            height: "auto"
          }}
        />
        <div className="row justify-content-around mt-3">
          <div className="col-md-6 text-left">
            <h3 className="text-center mb-3">Ingredients</h3>
            <ul>
              {rest.extendedIngredients.map(item => (
                <li key={item.id} style={{ listStyle: "none" }}>
                  {item.original}
                </li>
              ))}
            </ul>
            <button onClick={() => onAddClick()}>Add all to stock list</button>
          </div>
          <div className="col-md-6">
            <h3 className="text-center mb-3">Highlights</h3>
            <span
              className="badge badge-light"
              style={{
                display: "inline-block",
                margin: ".5rem .5rem",
                backgroundColor: "#111"
              }}
            >
              {rest.vegan ? "Vegan" : ""}
            </span>
            <span
              className="badge badge-light"
              style={{
                display: "inline-block",
                margin: ".5rem .5rem",
                backgroundColor: "#111"
              }}
            >
              {rest.vegetarian ? "Vegetarian" : ""}
            </span>
            <span
              className="badge badge-light"
              style={{
                display: "inline-block",
                margin: ".5rem .5rem",
                backgroundColor: "#111"
              }}
            >
              {rest.readyInMinutes} min prep
            </span>
          </div>
        </div>
        <div className="text-left mt-3 mx-5">
          <h3>Method</h3>
          <ol>
            {instructions &&
              instructions
                .split(".")
                .slice(0, instructions.split(".").length - 1)
                .map(i => (
                  <li key={Math.random()}>
                    <span
                      style={{
                        marginLeft: "0.5rem"
                      }}
                    >
                      {i.replace(/<\/?[a-z]*?>/gi, "")}
                    </span>
                  </li>
                ))}
          </ol>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => props.history.go("/recipes")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Recipe;
