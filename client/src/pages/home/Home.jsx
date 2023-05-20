import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function Home() {

    const {isLoading, error, data} = useQuery({

      queryKey: ["gigs"],

      queryFn: () => newRequest.get("/gigs").then((res) => {

      return res.data

      })

    })

    console.log(data)


  return (

    <div className="home">

      <Featured />

      <TrustedBy />

      {isLoading ? ("Loading...") : error ? ("Đã xảy ra lỗi ") : <Slide slidesToShow={5} arrowsScroll={5}>

        {data.slice(0,5).map((card) => (

          <CatCard key={card._id} card={card} />

        ))}
        
      </Slide>
       }

      <div className="features">

        <div className="container">

          <div className="item">

            <h1>The best part? Everything.</h1>

            <div className="title">

              <img src="./img/check.png" alt="" />

              Tốt nhất cho mọi ngân sách

            </div>

            <p>
            Tìm dịch vụ chất lượng cao ở mọi mức giá. Không có giá theo giờ, chỉ có giá dựa trên dự án.
            </p>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Công việc chất lượng được thực hiện nhanh chóng
            </div>

            <p>
            Tìm người làm việc tự do phù hợp để bắt đầu làm việc với dự án của bạn trong vòng vài phút.
            </p>

            <div className="title">

              <img src="./img/check.png" alt="" />

              Trả tiền khi bạn hài lòng
              
            </div>

            <p>
            Luôn biết những gì bạn sẽ trả trước. Thanh toán của bạn không được phát hành cho đến khi bạn phê duyệt công việc.
            </p>

            <div className="title">

              <img src="./img/check.png" alt="" />

             Hỗ trợ 24/24
              
            </div>

            <p>
            Nhóm hỗ trợ 24/24 của chúng tôi luôn sẵn sàng trợ giúp mọi lúc, mọi nơi.            </p>


          </div>

          <div className="item">
            <video src="./img/video.mp4" controls />
          </div>

        </div>

      </div>

      <div className="explore">

        <div className="container">

          <h1>You need it, we've got it</h1>

          <div className="items">

            <div className="item">

              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
                alt=""
              />

              <div className="line"></div>

              <span>Graphics & Design</span>

            </div>

            <div className="item">

              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg"
                alt=""
              />

              <div className="line"></div>

              <span>Digital Marketing</span>

            </div>

            <div className="item">

              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg"
                alt=""
              />

              <div className="line"></div>

              <span>Writing & Translation</span>

            </div>

            <div className="item">

              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
                alt=""
              />

              <div className="line"></div>

              <span>Video & Animation</span>

            </div>

            <div className="item">

              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg"
                alt=""
              />

              <div className="line"></div>

              <span>Music & Audio</span>

            </div>

            <div className="item">

              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
                alt=""
              />

              <div className="line"></div>

              <span>Programming & Tech</span>

            </div>

            <div className="item">

              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg"
                alt=""
              />

              <div className="line"></div>

              <span>Business</span>

            </div>

            <div className="item">

              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg"
                alt=""
              />

              <div className="line"></div>

              <span>Lifestyle</span>

            </div>

            <div className="item">

              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg"
                alt=""
              />

              <div className="line"></div>

              <span>Data</span>

            </div>

            <div className="item">

              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg"
                alt=""
              />

              <div className="line"></div>

              <span>Photography</span>

            </div>

          </div>

        </div>

      </div>

      <div className="features dark">

        <div className="container">

          <div className="item">

            <h1>
              tanverr <i>business.</i>
            </h1>

            <h1>
            A solution built for business
            </h1>

            <p>
            Nâng cấp lên trải nghiệm chọn lọc với nhiều công cụ và lợi ích, dành riêng cho doanh nghiệp
            </p>
            
            <div className="title">

              <img src="./img/check.png" alt="" />

              Kết nối với các dịch giả tự do có kinh nghiệm kinh doanh đã có kinh nghiệm

            </div>

            <div className="title">

              <img src="./img/check.png" alt="" />

              Được kết hợp với tài năng hoàn hảo bởi người quản lý thành công của khách hàng
            </div>

            <div className="title">

              <img src="./img/check.png" alt="" />

              Quản lý làm việc theo nhóm và tăng năng suất với một không gian làm việc mạnh mẽ

            </div>

            <button>Explore tanverr Business</button>

          </div>

          <div className="item">

            <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
              alt=""
            />

          </div>

        </div>

      </div>

      <Slide slidesToShow={4} arrowsScroll={4}>

        {projects.map((card) => (
          
          <ProjectCard key={card.id} card={card} />

        ))}

      </Slide>

    </div>

  )

}

export default Home;
