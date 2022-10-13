import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TextContainer = styled.div`
  display: flex;
  padding-top: 5px;
  padding-left: 14px;
  @media (max-width: 720px) {
    padding-top: calc((5 / 1280) * 100vh);
    padding-left: calc((14 / 720) * 100vw);
    white-space: nowrap;
  }
`;

const Text = styled.div`
  width: 50px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  opacity: 0.7;
  border-radius: 3px;
  background-color: ${(props) => props.background};

  font-family: "Noto Sans KR", sans-serif;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  /* line-height: 2.08; */
  letter-spacing: -0.24px;
  color: #fff;

  @media (max-width: 720px) {
    width: max-content;
    padding: 0 calc((6 / 720) * 100vw);
    height: calc((24 / 1280) * 100vh);
    font-size: calc((13 / 1280) * 100vh);
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
        right: "-0.6rem",
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
        left: "-0.6rem",
        zIndex: 1,
        cursor: "pointer",
      }}
      alt=""
      onClick={onClick}
    ></img>
  );
};

const Container = styled.div`
  margin-top: 20px;
  @media (max-width: 720px) {
    padding: 0 calc((34 / 720) * 100vw);
    margin-top: calc((20 / 1280) * 100vh);
  }
`;

const StyledSlider = styled(Slider)`
  .slick-list {
    width: 100%;
    height: 100%;
  }

  .slick-slide div {
    cursor: pointer;
  }

  .slick-track {
    overflow-x: hidden;
    /* height: 100%; */
  }
`;

const Card = styled.div`
  width: 100%;
  height: 110px;
  margin: 0 20px 0 0;
  background-image: url(${(props) => props.img});
  background-size: 95% 100%;
  background-position: center;
  background-repeat: no-repeat;
  &:active {
    transform: scale(0.95);
  }
  @media (max-width: 720px) {
    height: calc((130 / 1280) * 100vh);
  }
`;

const GuaranteeCompanySlider = () => {
  const settings = {
    dots: false, // 슬라이드 밑에 점 보이게
    infinite: true, // 무한으로 반복
    speed: 500,
    autoplay: true,
    slidesToShow: 4, // 4장씩 보이게
    slidesToScroll: 1, // 1장씩 뒤로 넘어가게
    centerPadding: "1000px", // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    autoplaySpeed: 7000,
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
    ],
  };

  const tmpList = [
    {
      img: "/images/main/GuaranteeCompany1.png",
      textList: [{ color: "#dd3737", text: "테스트1" }],
    },
    {
      img: "/images/main/GuaranteeCompany2.png",
      textList: [{ color: "#ef9421", text: "테스트2" }],
    },
    {
      img: "/images/main/GuaranteeCompany1.png",
      textList: [{ color: "#0ca700", text: "테스트3" }],
    },
    {
      img: "/images/main/GuaranteeCompany2.png",
      textList: [
        { color: "#dd3737", text: "테스트1" },
        { color: "#ef9421", text: "테스트2" },
        { color: "#0ca700", text: "테스트3" },
      ],
    },
    {
      img: "/images/main/GuaranteeCompany1.png",
      textList: [{ color: "#dd3737", text: "테스트1" }],
    },
    {
      img: "/images/main/GuaranteeCompany2.png",
      textList: [{ color: "#ef9421", text: "테스트2" }],
    },
    {
      img: "/images/main/GuaranteeCompany1.png",
      textList: [{ color: "#0ca700", text: "테스트3" }],
    },
    {
      img: "/images/main/GuaranteeCompany2.png",
      textList: [
        { color: "#dd3737", text: "테스트1" },
        { color: "#ef9421", text: "테스트2" },
        { color: "#0ca700", text: "테스트3" },
      ],
    },
  ];
  return (
    <Container>
      <StyledSlider {...settings}>
        {tmpList?.map((item) => {
          return (
            <div style={{ position: "relative", margin: "10px 0" }}>
              <Card img={item.img}>
                <TextContainer>
                  {item?.textList?.map((element) => (
                    <Text background={element.color}>{element.text}</Text>
                  ))}
                </TextContainer>
              </Card>
            </div>
          );
        })}
      </StyledSlider>
    </Container>
  );
};

export default GuaranteeCompanySlider;
