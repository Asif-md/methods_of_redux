import React from "react";
import { Link } from "react-router-dom";

const Card = props => {
  return (
    <div className="col-sm-4">
      <Link className="btn btn-lg btn-default btn-block" {...props}>
        {props.children}
      </Link>
    </div>
  );
};
export default Card;
