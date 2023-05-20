import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import newRequest from "../../utils/newRequest.js";

function Navbar() {

  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false)

  const { pathname } = useLocation()

  const isActive = () => {

    window.scrollY > 0 ? setActive(true) : setActive(false)

  }

  useEffect(() => {

    window.addEventListener("scroll", isActive)

    return () => {

      window.removeEventListener("scroll", isActive)

    }

  }, [])

  const navigate = useNavigate()

  //Get user from local storage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const handleLogout = async (e) => {

    e.preventDefault()

    try {

      await newRequest.post("/auth/logout")

      localStorage.setItem("currentUser", null)

      navigate("/")
      
    } catch (err) {

      throw err
      
    }

  }

  return (

    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>

      <div className="container">

        <div className="logo">

          <Link className="link" to="/">
            <span className="text">tanverr</span>
          </Link>

          <span className="dot">.</span>

        </div>

        <div className="links">

          <span>tanverr Business</span>

          <span>Khám phá</span>

          <span>English</span>

          {!currentUser?.isSeller && <span>Become a Seller</span>}

          {currentUser ? 
          (
            <div className="user" onClick={()=>setOpen(!open)}>

              <img
                src={currentUser?.img || "/img/noavatar.jpg"}
                alt=""
              />

              <span>{currentUser?.username}</span>
              
              {open && <div className="options">
                
                {currentUser.isSeller && (
                  <>

                    <Link className="link" to="/mygigs">
                      Dịch vụ của tôi
                    </Link>

                    <Link className="link" to="/add">
                      Thêm dịch vụ
                    </Link>

                  </>
                )}

                <Link className="link" to="/orders">
                  Đơn hàng
                </Link>

                <Link className="link" to="/messages">
                  Tin nhắn
                </Link>

                <Link className="link" onClick={handleLogout}>
                  Đăng xuất
                </Link>

              </div>}
            </div>
          ) 
          : 
          (
            <>

              <Link to="/login" className="link">Sign in</Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>

            </>
          )}

        </div>

      </div>

      {(active || pathname !== "/") && (
        <>

          <hr />

          <div className="menu">

            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>

            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>

            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>

            <Link className="link menuLink" to="/">
              AI Services
            </Link>

            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>

            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>

            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>

            <Link className="link menuLink" to="/">
              Business
            </Link>

            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>

          </div>

          <hr />

        </>

      )}

    </div>

  )

}

export default Navbar;
