import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";

function CatCard({ card }) {

  return (

    <>
    <span className="desc" style={{ textTransform:"uppercase", alignItems:"center" }}>{card.cat}</span>

    <Link to={`/gigs?cat=${card.cat}`}>

      <div className="catCard">

        <img src={card.cover} alt="" />
       
      </div>

    </Link>
    
    </>
  );
}
export default CatCard;
