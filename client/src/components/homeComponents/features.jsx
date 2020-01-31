import React from "react";

const Features = () => {
  return (
    <div className="jumbotron full-height">
      <div className="narrow">
        <div className="col-12 text-center">
          <h3 className="heading">Features</h3>
          <hr />
        </div>
        <div className="row text-center justify-content-center">
          <div className="col-md-6 col-lg-4 mb-2 hover-dark">
            <div className="feature">
              <i className="fas fa-utensils fa-4x"></i>
              <h3> Custom Heading</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea
                consectetur voluptatem hic veritatis voluptates ex, ratione sit
                quo nihil error? Unde libero molestias rerum nobis ducimus
                accusantium ad praesentium deserunt!
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-2 hover-dark">
            <div className="feature">
              <i className="fas fa-play-circle fa-4x"></i>
              <h3> Custom Heading</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea
                consectetur voluptatem hic veritatis voluptates ex, ratione sit
                quo nihil error? Unde libero molestias rerum nobis ducimus
                accusantium ad praesentium deserunt!
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-2 hover-dark">
            <div className="feature">
              <i className="fas fa-leaf fa-4x"></i>
              <h3> Custom Animation</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
                hic veritatis. Vero a, quia, aliquid deleniti repellendus
                dolorum officia, eligendi neque enim magnam iusto praesentium
                cumque odio! Consectetur, explicabo odit!
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Features;
