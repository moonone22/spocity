import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LiveComponent from "../Main/LiveComponent";

const NextArrow = ({ onClick }) => {
  return (
    <img
      src="/images/common/right.png"
      style={{
        width: "32px",
        height: "32px",
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        right: "-9px",
        cursor: "pointer",
      }}
      alt=""
      onClick={onClick}
    ></img>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <img
      src="/images/common/left.png"
      style={{
        width: "32px",
        height: "32px",
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        left: "-7px",
        zIndex: 1,
        cursor: "pointer",
      }}
      alt=""
      onClick={onClick}
    ></img>
  );
};

const Container = styled.div`
  width: 100%;
  /* margin-top: 20px; */
`;

const StyledSlider = styled(Slider)`
  .slick-list {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  .slick-slide div {
    cursor: pointer;
  }

  .slick-track {
    overflow: hidden;
    padding-top: 20px;
    @media (max-width: 720px) {
      padding-top: calc((20 / 1280) * 100vh);
    }
    /* width: 1200px; */
    /* height: 100%; */
  }
`;

const LiveSlider = () => {
  const settings = {
    dots: false, // 슬라이드 밑에 점 보이게
    infinite: false, // 무한으로 반복
    speed: 500,
    autoplay: false,
    slidesToShow: 4, // 4장씩 보이게
    slidesToScroll: 1, // 1장씩 뒤로 넘어가게
    centerPadding: "0px", // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    rows: 1,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
        },
      },
      // {
      //   breakpoint: 600,
      //   settings: {
      //     slidesToShow: 1,
      //   },
      // },
    ],
  };

  return (
    <Container>
      <StyledSlider {...settings}>
        {[1, 2, 1, 1, 1, 1]?.map((item) => {
          return <LiveComponent home={0} />;
        })}
      </StyledSlider>
    </Container>
  );
};

export default LiveSlider;
