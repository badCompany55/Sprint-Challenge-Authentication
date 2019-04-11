import React from "react";

const Joke = props => {
  return (
    <div className="jokeCont">
      <div className="joke">{props.joke}</div>
    </div>
  );
};

export default Joke;
