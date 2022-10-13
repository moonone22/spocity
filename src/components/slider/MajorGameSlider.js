import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LiveComponent from "../Main/LiveComponent";

const Container = styled.div`
  width: 100%;
  /* margin-top: 20px; */
`;

const StyledSlider = styled(Slider)`
  width: 100%;

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
    /* width: 1200px; */
    /* height: 100%; */
  }
`;

const MajorGameSlider = (props) => {
  const settings = {
    dots: false, // 슬라이드 밑에 점 보이게
    infinite: true, // 무한으로 반복
    speed: 500,
    autoplay: true,
    slidesToShow: 1, // 4장씩 보이게
    slidesToScroll: 1, // 1장씩 뒤로 넘어가게
    // centerPadding: "100px", // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
    rows: 1,
    arrows: false,
    autoplaySpeed: 7000,
  };

  return (
    <Container className="mobile">
      <StyledSlider {...settings}>
        {[1, 2, 3, 4, 5, 6].map(() => props.children)}
      </StyledSlider>
    </Container>
  );
};

export default MajorGameSlider;
