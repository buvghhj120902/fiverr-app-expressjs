import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import { useLocation } from "react-router-dom";

function Gigs() {
  

  const [sort, setSort] = useState("sales")

  const [open, setOpen] = useState(false)

  const minRef = useRef()
  const maxRef = useRef()

  const {search} = useLocation()

  const { isLoading, error, data, refetch } = useQuery({

    queryKey: ['gigs'],

    queryFn: () => newRequest.get(`/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`).then((res) => {

      return res.data

    })
    
  })


  useEffect(() => {

    refetch()
    
  },[sort])

  const reSort = (type) => {

    setSort(type)
    setOpen(false)

  }

  const apply = ()=>{

    refetch()

  }


  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)

  const category = searchParams.get('cat');



  return (

    <div className="gigs">

      <div className="container">

        <span className="breadcrumbs">tanverr | {category} </span>

        <h1 style={{ textTransform:"uppercase" }}>{category}</h1>


        <div className="menu">

          <div className="left">

            <span>Giá</span>

            <input ref={minRef} type="number" placeholder="min" />

            <input ref={maxRef} type="number" placeholder="max" />

            <button onClick={apply}>Lọc</button>

          </div>

          <div className="right">

            <span className="sortBy">Sắp xếp theo</span>

            <span className="sortType">
              {sort === "sales" ? "Phổ biến" : "Mới nhất"}
            </span>

            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />

          {open && 

             (
              <div className="rightMenu">

                {sort === "sales" ? 

                ( <span onClick={() => reSort("createdAt")}>Mới nhất</span> ) 
                : 
                ( <span onClick={() => reSort("sales")}>Bán chạy</span> )
                
                }

                <span onClick={() => reSort("sales")}>Phổ biến</span>
                  
              </div>
             )

           }

          </div>

        </div>

        <div className="cards">

          {isLoading ? ("Loading...") : error ? ("Đã có lỗi xảy ra") : data.map((gig) => (

            <GigCard key={gig._id} item={gig} />

          ))}

        </div>

      </div>

    </div>

  );
}

export default Gigs;
