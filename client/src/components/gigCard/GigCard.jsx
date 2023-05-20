import React from "react";
import "./GigCard.scss";

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {

  const { isLoading, error, data, refetch } = useQuery({

    queryKey: [item.userId],

    queryFn: () => newRequest.get(`/users/find/${item.userId}`).then((res) => {

      return res.data

    })
    
  })
  
  
  return (

    <Link to={`/gig/${item._id}`} className="link">

      <div className="gigCard">

        <img src={item.cover} alt="" />

        <div className="info">


          {isLoading ? ("Loading...") : error ? ("Đã có lỗi xảy ra") : <div className="user">

            <img src={data.img || "/img/noavatar.jpg"} alt="" />

            <span>{data.username}</span>

          </div>
          }

          <p>{item.title}</p>

          {!isNaN(Math.round(item?.totalStars / item?.starNumber)) && 

            <div className="stars">

                {Array(Math.round(item.totalStars / item.starNumber)).fill().map((item, i) => (

                  <img src="/img/star.png" alt="" key={i} />

                ))}

              <span>{Math.round(item?.totalStars / item?.starNumber)}</span>

            </div>
            
          }

        </div>

        <hr />

        <div className="detail">

          <img src="./img/heart.png" alt="" />

          <div className="price">

            <span>STARTING AT</span>

            <h2>

              $ {item.price}
              

            </h2>

          </div>

        </div>

      </div>

    </Link>

  )
}

export default GigCard;
