import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
          <h2>Thể loại</h2>
           <span> Thiết kế đồ họa</span>
           <span>Tiếp thị kỹ thuật số</span>
           <span>Viết & Dịch thuật</span>
           <span>Video & Hoạt hình</span>
           <span>Âm nhạc & Âm thanh</span>
           <span>Lập trình & Công nghệ</span>
           <span>Dữ liệu</span>
           <span>Việc kinh doanh</span>
           <span> Cách sống</span>
           <span>Nhiếp ảnh</span>
           <span>Sơ đồ trang web</span>
          </div>
          <div className="item">
            <h2>About</h2>
            <span>Báo chí & Tin tức</span>
            <span> Quan hệ đối tác</span>
            <span> Chính sách bảo mật</span>
            <span> Điều khoản dịch vụ</span>
            <span> Khiếu nại sở hữu trí tuệ</span>
            <span> Quan hệ đầu tư</span>
            <span>Liên hệ bán hàng</span>
            
          </div>
          <div className="item">
            <h2>Hỗ trợ</h2>
            <span> Trợ giúp & Hỗ trợ</span>
            <span>Tin cậy & An toàn</span>
            <span>Bán hàng trên tanverr</span>
            <span>Mua trên tanverr</span>
          </div>
          <div className="item">
            <h2> Cộng đồng</h2>
            <span>Câu chuyện thành công của khách hàng</span>
            <span> Trung tâm cộng đồng</span>
            <span> Diễn đàn</span>
            <span>  Sự kiện</span>
            <span> Blog</span>
            <span> Người ảnh hưởng</span>
            <span> Chi nhánh</span>
            <span> Tệp âm thanh</span>
            <span> Mời một người bạn</span>
            <span>  Trở thành người bán</span>
            <span>  Tiêu chuẩn cộng đồng</span>
          </div>
          <div className="item">
            <h2>See more </h2>
            <span>tanverr Business</span>
            <span>tanverr Pro</span>
            <span>tanverr Logo Maker</span>
            <span>tanverr Guides</span>
            <span>Get Inspired</span>
            <span>tanverr Select</span>
            <span>ClearVoice</span>
            <span>tanverr Workspace</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>tanverr</h2>
            <span>© tanverr International Ltd. 2023</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/img/twitter.png" alt="" />
              <img src="/img/facebook.png" alt="" />
              <img src="/img/linkedin.png" alt="" />
              <img src="/img/pinterest.png" alt="" />
              <img src="/img/instagram.png" alt="" />
            </div>
            <div className="link">
              <img src="/img/language.png" alt="" />
              <span>English</span>
            </div>
            <div className="link">
              <img src="/img/coin.png" alt="" />
              <span>USD</span>
            </div>
            <img src="/img/accessibility.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
