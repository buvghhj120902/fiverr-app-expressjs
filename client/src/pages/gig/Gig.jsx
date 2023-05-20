import React, { useEffect, useState } from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { Link, useLocation, useParams } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews";

function Gig() {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const {id} = useParams()

  const gigId = useLocation().pathname.split("/")[2]

  const {isLoading, data, error, refetch} = useQuery({

    queryKey:["gig"],

    queryFn: () => newRequest.get(`/gigs/single/${gigId}`).then((res) => {

      return res.data

    })

  })

  console.log(data);

  const userId  = data?.userId

  const {isLoading: isLoadingUser, data: dataUser, error: errorUser} = useQuery({

    queryKey:["user"],

    queryFn: () => newRequest.get(`/users/find/${userId}`).then((res) => {

      return res.data
      
    }),

    enabled: !! userId,

  })

  const [reviews, setReviews] = useState([])

  useEffect(() => {

    const fetchReview = async () => {

      try {

        const res = await newRequest.get(`/reviews/${gigId}`)

        setReviews(res.data)
        
      } catch (err) {

         console.log(err)
        
      }

    }

    fetchReview()

  },[gigId])

  return (

    <div className="gig">

      {isLoading ? ("Loading..."): error ? ("Đã có lỗi xảy ra") : (<div className="container">

        <div className="left">

          <span className="breadcrumbs">tanverr  | {data.cat} </span>

          <h1>{data.title}</h1>

         {isLoadingUser ? ("Loading...") : errorUser ? ("Đã có lỗi xảy ra") : (
         
          <div className="user">

            <img
              className="pp"
              src={dataUser.img}
              alt=""
            />

            <span>{dataUser.username}</span>
            
            {!isNaN(Math.round(data?.totalStars / data?.starNumber)) && 
            <div className="stars">

                {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) => (

                  <img src="/img/star.png" alt="" key={i} />

                ))}

              <span>{Math.round(data?.totalStars / data?.starNumber)}</span>
               <p>({reviews.length} đánh giá)</p>
            </div>
            }

          </div>)
        }

          <Slider slidesToShow={1} arrowsScroll={1} className="slider">

            {data.images.map((img) => (

                <img
                  src={img}
                  alt=""
                  key={img}
                />
            
            ))}
           
          </Slider>

          <h2>Mô tả dịch vụ</h2>

          <p>
           {data.desc}
          </p>
          
          {isLoadingUser ? ("Loading...") : errorUser ? ("Đã có lỗi xảy ra") : (
          <div className="seller">

            <h2>About The Seller</h2>

            <div className="user">

              <img
                src={dataUser.img}
                alt=""
              />

              <div className="info">

                <span>{dataUser.username}</span>

                {!isNaN(Math.round(data?.totalStars / data?.starNumber)) && 
                <div className="stars">

                {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) => (
                  <img src="/img/star.png" alt="" key={i} />
                ))}
               
               <span>{Math.round(data?.totalStars / data?.starNumber)}</span>

               </div>
            }

                <button>Liên hệ</button>

              </div>

            </div>

            <div className="box">

              <div className="items">

                <div className="item">

                  <span className="title">From</span>

                  <span className="desc">{dataUser.country}</span>

                </div>

                <div className="item">

                  <span className="title">Phone</span>

                  <span className="desc">{dataUser.phone}</span>

                </div>

                <div className="item">

                  <span className="title">Email</span>

                  <span className="desc">{dataUser.email}</span>

                </div>

              </div>

              <hr />
              
              <p>
               {dataUser.desc}
              </p>

            </div>

          </div>)}

          <Reviews gigId={gigId}/>

        </div>

        <div className="right">

          <div className="price">

            <h3>{data.shortTitle}</h3>

            <h2>$ {data.price}</h2>

          </div>

          <p>
           {data.shortDesc}
          </p>

          <div className="details">

            <div className="item">

              <img src="/img/clock.png" alt="" />

              <span>{data.deliveryTime} Days Delivery</span>

            </div>

            <div className="item">

              <img src="/img/recycle.png" alt="" />

              <span>{data.revisionNumber} Revisions</span>

            </div>

          </div>

          <div className="features">

            

            {data.features.map(feature => (
 
            <div className="item" key={feature}>

              <img src="/img/greencheck.png" alt="" />

              <span>{feature}</span>

            </div>
            ))}
          

          </div>

          <Link to={`/pay/${id}`}>

             <button>Continue</button>

          </Link>

        </div>

      </div>
)}

    </div>

  )

}

export default Gig;
