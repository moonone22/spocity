import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Image = styled.div`
  /* width: 600px; */
  height: 167px;
  background: ${(props) => `url(${props.background}) no-repeat`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  &:hover {
    transform: translate(0px, -5px);
    transition: all 0.1s ease-in-out;
  }
  &:active {
    transform: scale(0.95);
  }
  position: relative;
  margin: 5px;

  @media (max-width: 1100px) {
    height: 200px;
  }
  @media (max-width: 720px) {
    height: 120px;
  }
`;

const Title = styled.div`
  width: 93px;
  height: 29px;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0.7);
  top: 6px;
  left: 6px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Noto Sans KR", sans-serif;
  font-size: 13px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.33px;
  text-align: left;
  color: #fff;

  @media (max-width: 720px) {
    width: calc((117 / 720) * 100vw);
    height: calc((30 / 1280) * 100vh);
    font-size: calc((18 / 720) * 100vw);
  }
`;

const MainScene = styled.div`
  width: 59px;
  height: 23px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #434444;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Noto Sans KR", sans-serif;
  font-size: 13px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  /* line-height: 5.77; */
  letter-spacing: -0.33px;
  text-align: left;
  color: #fff;
  position: absolute;
  bottom: 4px;
  left: 4px;

  @media (max-width: 720px) {
    width: calc((80 / 720) * 100vw);
    height: calc((30 / 1280) * 100vh);
    font-size: calc((18 / 720) * 100vw);
  }
`;

const Time = styled.div`
  width: 48px;
  height: 23px;
  object-fit: contain;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Roboto", sans-serif;
  font-size: 13px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  position: absolute;
  right: 5px;
  bottom: 4px;

  @media (max-width: 720px) {
    width: calc((65 / 720) * 100vw);
    height: calc((30 / 1280) * 100vh);
    font-size: calc((18 / 720) * 100vw);
  }
`;

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
        right: "-7px",
        cursor: "pointer",
      }}
      alt=""
      onClick={onClick}
    ></img>
  );
};

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
    /* height: 100%; */
  }
`;

const Container = styled.div`
  margin-top: 20px;
  @media (max-width: 720px) {
    margin-top: calc((20 / 1280) * 100vh);
  }
`;

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
        left: "-5px",
        zIndex: 1,
        cursor: "pointer",
      }}
      alt=""
      onClick={onClick}
    ></img>
  );
};

const HighlightSlider = () => {
  const settings = {
    dots: false, // 슬라이드 밑에 점 보이게
    infinite: false, // 무한으로 반복
    speed: 500,
    autoplay: false,
    slidesToShow: 2, // 4장씩 보이게
    slidesToScroll: 1, // 1장씩 뒤로 넘어가게
    centerPadding: "0px", // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    rows: 2,
  };

  const tmpList = [
    "/images/main/Highlight1.png",
    "/images/main/Highlight3.png",
    "/images/main/Highlight2.png",
    "/images/main/Highlight4.png",
    "/images/main/Highlight1.png",
    "/images/main/Highlight3.png",
    "/images/main/Highlight2.png",
    "/images/main/Highlight4.png",
  ];
  return (
    <Container>
      <StyledSlider {...settings}>
        {tmpList?.map((item) => (
          <div>
            <Image
              background={item}
              style={{
                // margin: "0 18px 0 0",
                borderRadius: "12px",
              }}
            >
              <Title>영상제목 노출</Title>
              <MainScene>주요장면</MainScene>
              <Time>11:30</Time>
            </Image>
          </div>
        ))}
      </StyledSlider>
    </Container>
  );
};

export default HighlightSlider;
