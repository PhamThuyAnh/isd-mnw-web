import { Stack } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { FlexAroundCenter } from "../../../components/styleComponent";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
function Footer() {
  return (
    <FooterContainer>
      <Stack direction={"row"} gap={3}>
        <div style={{ width: "40%" }}>
          <p>KẾT NỐI VỚI CHÚNG TÔI</p>
          <div style={{ display: "flex", alignContent: "center" }}>
            <a href="https://www.facebook.com/MiniwoodDesign" className="icon">
              <FacebookIcon sx={{ marginRight: "10px" }} />
            </a>
            <a
              href="https://www.youtube.com/@miniwooddesign6267"
              className="icon"
            >
              <YouTubeIcon sx={{ marginRight: "10px" }} />
            </a>
            <a
              href="https://www.instagram.com/miniwood_design/"
              className="icon"
            >
              <InstagramIcon sx={{ marginRight: "10px" }} />
            </a>
          </div>
          <p>
            Miniwood Design cung cấp những món quà tặng doanh nghiệp ý nghĩa,
            gói ghém và trao gửi một cách trân trọng.
          </p>
          <p>
            Bạn có thể chọn mua trực tiếp tại cửa hàng hoặc đặt quà online để
            được chuyển trực tiếp đến người nhận trong ngày tại Hà Nội và từ 2
            đến 5 ngày với khu vực khác trên Toàn Quốc.{" "}
          </p>
          <p>Liên hệ: 0915797719</p>
          <p>Email: miniwooddesign@gmail.com</p>
        </div>
        <FlexAroundCenter style={{ width: "60%" }}>
          <div>
            <p>HỖ TRỢ</p>
            <p>Về chúng tôi</p>
            <p>Chính sách bảo hành</p>
            <p>Chính sách đổi trả</p>
            <p>Chính sách thanh toán</p>
            <p>Chính sách vận chuyển</p>
            <p>Chính sách bảo mật</p>
          </div>
          <div>
            <img
              height={70}
              src="http://forci.vn/admin/uploadpicture/dathongbao.png"
              alt="logo-bo-cong-thuong-da-thong-bao"
            />
          </div>
        </FlexAroundCenter>
      </Stack>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.div`
  background: rgb(93, 46, 3);
  background: linear-gradient(
    254deg,
    rgba(93, 46, 3, 1) 0%,
    rgba(143, 94, 47, 1) 49%,
    rgba(110, 57, 4, 1) 100%
  );
  color: white;
  padding: 0 100px;
`;
