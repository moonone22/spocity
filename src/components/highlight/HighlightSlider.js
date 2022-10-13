import React from "react";
import styled, { css } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const NextImg = styled.img`
  width: 30px;
  height: 41px;
  position: absolute;
  top: 25%;
  right: 0px;
  z-index: 1;
  cursor: pointer;
  ${(props) =>
    props.video &&
    css`
      width: calc((56 / 720) * 100vw);
      height: calc((56 / 720) * 100vw);
      position: absolute;
      top: calc((60 / 1280) * 100vh);
      right: calc((6 / 720) * -100vw);
      cursor: pointer;
    `}
  @media (max-width: 720px) {
    ${(props) =>
      props.main &&
      css`
        width: calc((30 / 1280) * 100vh);
        height: calc((41 / 1280) * 100vh);
        position: absolute;
        top: calc((44 / 1280) * 100vh);
        right: -2px;
        cursor: pointer;
      `}
  }
`;

const NextArrow = ({ onClick, video, main }) => {
  if (video) {
    return (
      <NextImg
        video={video}
        src="/images/common/right.png"
        alt=""
        onClick={onClick}
      ></NextImg>
    );
  }
  return (
    <NextImg
      main={main}
      src="/images/highlight/Arrow-right.png"
      alt=""
      onClick={onClick}
    ></NextImg>
  );
};

const PrevImg = styled.img`
  width: 30px;
  height: 41px;
  position: absolute;
  top: 25%;
  left: 14px;
  z-index: 1;
  cursor: pointer;
  ${(props) =>
    props.video &&
    css`
      width: calc((56 / 720) * 100vw);
      height: calc((56 / 720) * 100vw);
      position: absolute;
      top: calc((60 / 1280) * 100vh);
      left: calc((18 / 720) * -100vw);
      cursor: pointer;
      z-index: 1;
    `}
  @media (max-width: 720px) {
    ${(props) =>
      props.main &&
      css`
        width: calc((30 / 1280) * 100vh);
        height: calc((41 / 1280) * 100vh);
        position: absolute;
        top: calc((44 / 1280) * 100vh);
        left :3px;
        cursor: pointer;
      `}
  }
`;

const PrevArrow = ({ onClick, video, main }) => {
  if (video) {
    return (
      <PrevImg
        src="/images/common/left.png"
        video={video}
        alt=""
        onClick={onClick}
      ></PrevImg>
    );
  }
  return (
    <PrevImg
      src="/images/highlight/Arrow-left.png"
      main={main}
      alt=""
      onClick={onClick}
    ></PrevImg>
  );
};

const StyledSlider = styled(Slider)`
  .slick-list {
    /* width: 100%; */
    @media (max-width: 720px) {
      /* width: 101%; */
      /* position: relative; */
      margin: 0 2% 0 1%;
    }
    position : relative;
    left : 0px; 
    height: 100%;
  }

  .slick-slide > div {
    cursor: pointer;
    padding-top: 5px;
    padding: 0;
    @media (max-width: 720px) {
    }
  }

  .slick-track {
    overflow: hidden;
    /* height: 100%; */
    @media (max-width: 720px) {
      /* width: calc((238 / 720) * 100vw); */
      height: calc((241 / 1280) * 100vh);
      /* height: ${(props) => props.single && "calc((288 / 1280) * 100vh)"}; */
      height: max-content;
      position : relative;
      left : 7px; 
    }
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: ${(props) => props.main && "1130px"};
  @media (max-width: 720px) {
    width: 100%;
    width: ${(props) => props.main && "calc((520 / 720) * 100vw)"};
    height: calc((288 / 1280) * 100vh);
    height: ${(props) => props.main && "calc((241 / 1280) * 100vh)"};
    margin-bottom: calc((21 / 1280) * 100vh);
    margin-bottom: ${(props) => props.main && "0"};
  }

  @media (max-width: 720px) {
    > * {
      height: 100%;
    }
  }
`;

const Wrapper = styled.div`
  /* max-width: 267px; */
  height: 222px;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  > * {
    margin: 0 auto;
  }
  position : relative;
  right : 0; 

  :hover {
    transform: translate(0px, -5px);
  }
  :active {
    transform: scale(0.95);
  }
  @media (max-width: 720px) {
    right : 6%; 
    padding: ${(props) => !props.main && "0"};
    height: ${(props) => props.main && "241px"};
    height: ${(props) => props.single && "288px"};
    padding-left: ${(props) => props.main && "calc((20 / 720) * 100vw)"};
    padding: 0;
  }
`;

const ImageContainer = styled.div`
  /* width: 267px; */
  height: 149px;
  border-radius: 12px;
  background-color: #fff;
  background-image: url(${(props) => props.backgroud});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 6px;
  position: relative;

  @media (max-width: 720px) {
    width : 94%;
    height: calc((172 / 1280) * 100vh);
  }

  ${(props) =>
    props.main &&
    css`
      @media (max-width: 720px) {
        width : 88%;
        height: calc((134 / 1280) * 100vh);
        margin-left : 10%;
      }
    `}
`;

const TextContainer = styled.div`
  width: 100%;
  height: 67px;
  border-radius: 12px;
  background-color: #2c2d2d;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 17px;

  @media (max-width: 720px) {
    width : 95%;
    height: calc((108 / 1280) * 100vh);
    ${(props) =>
      props.main &&
      css`
        @media (max-width: 720px) {
          width : 90%;
          height: calc((99 / 1280) * 100vh);
          margin-left : 10%;
        }
      `}
  }

  .title {
    width: 85%;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.3px;
    text-align: left;
    color: #fff;
    margin-bottom: 6px;
    @media (max-width: 720px) {
      font-size: calc((22 / 720) * 100vw);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .date {
    width: 85%;
    font-family: "Roboto", sans-serif;
    font-size: 15px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #aaa;
    @media (max-width: 720px) {
      font-size: calc((20 / 720) * 100vw);
    }
  }
`;

const Playlist = styled.div`
  width: 46px;
  height: 18px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  bottom: 5px;
  right: 5px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  @media (max-width: 720px) {
    width: calc((62 / 720) * 100vw);
    height: calc((25 / 1280) * 100vh);
  }

  img {
    width: 10px;
    margin-top: 5px;
    margin-right: 6px;
    @media (max-width: 720px) {
      width: calc((14 / 720) * 100vw);
    }
  }

  div {
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.28px;
    color: #fff;
    margin-top: 1px;
    @media (max-width: 720px) {
      font-size: calc((18.5 / 720) * 100vw);
    }
  }
`;

const ButtonRectangle = styled.div`
  width: 57px;
  height: 22px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #515151;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 20px;

  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.26px;
  color: #fff;

  @media (max-width: 720px) {
    width: calc((80 / 720) * 100vw);
    height: calc((32 / 1280) * 100vh);
    font-size: calc((18 / 720) * 100vw);
  }
`;

const TimeRectangle = styled.div`
  height: 18px;
  margin: 41px 5px 0 0;
  padding: 4px 4px 4px 5px;
  object-fit: contain;
  opacity: 0.8;
  border-radius: 4px;
  background-color: #000;
  position: absolute;
  bottom: 5px;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Roboto", sans-serif;
  font-size: 13px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #fff;

  @media (max-width: 720px) {
    width: calc((77 / 720) * 100vw);
    height: calc((28 / 1280) * 100vh);
    font-size: calc((18 / 720) * 100vw);
  }
`;

const HighlightSlider = ({ tmpList, single, video, main, swipe }) => {
  let navigate = useNavigate();

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
        breakpoint: 721,
        settings: {
          slidesToShow: 2,
          prevArrow: video ? (
            <PrevArrow video={video} />
          ) : main ? (
            <PrevArrow main={main} />
          ) : (
            <></>
          ),
          nextArrow: video ? (
            <NextArrow video={video} />
          ) : main ? (
            <NextArrow main={main} />
          ) : (
            <></>
          ),
          swipe: swipe || true,
        },
      },
    ],
  };

  return (
    <Container single={single} main={main}>
      <StyledSlider {...settings} single={single}>
        {tmpList?.map((item) => (
          <Wrapper
            onClick={() => navigate("/highlight/video")}
            main={main}
            single={single}
          >
            <ImageContainer backgroud={item.img} single={single} main={main}>
              {single ? (
                <TimeRectangle>{item.length}</TimeRectangle>
              ) : (
                <Playlist>
                  <img src="/images/highlight/Playlist.png" alt=""></img>
                  <div>13</div>
                </Playlist>
              )}
            </ImageContainer>
            <TextContainer main={main}>
              <div className="title">{item.text}</div>
              {single ? (
                <ButtonRectangle>{item.button}</ButtonRectangle>
              ) : (
                <div className="date">{item.date}</div>
              )}
            </TextContainer>
          </Wrapper>
        ))}
      </StyledSlider>
    </Container>
  );
};

export default HighlightSlider;
