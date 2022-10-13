import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import HighlightSlider from "./HighlightSlider";

const Wrapper = styled.div`
  display: none;
  @media (max-width: 720px) {
    display: block;
  }
`;

const VideoContents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .video {
    background-image: url("/images/highlight/Soccer.png");
    background-size: cover;
    width: 100%;
    height: calc((404 / 1280) * 100vh);
    position: relative;
  }
  hr {
    width: calc((640 / 720) * 100vw);
    height: calc((1 / 720) * 100vw);
    background-color: #333;
    margin: 0 auto;
    margin-bottom: calc((54 / 1280) * 100vh);
  }
`;

const Banner = styled.div`
  width: calc((423 / 720) * 100vw);
  height: calc((102 / 1280) * 100vh);
  border-radius: 8px;
  background-color: #f2f2f2;
  position: absolute;
  bottom: 10px;
  left: 10px;
  overflow: hidden;

  .contents {
    display: flex;
    align-items: center;

    padding: 0 9px 0 6px;
    height: 100%;
  }

  .image {
    width: calc((89 / 720) * 100vw);
    height: calc((88 / 1280) * 100vh);
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: calc((40 / 720) * 100vw);
    }
    margin-right: 13px;
  }
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin-right: 25px;
    .title {
      font-family: "S-CoreDream-5Medium";
      font-size: calc((21.5 / 720) * 100vw);
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.45px;
      color: #000;
      white-space: nowrap;
      margin-bottom: 3px;
    }
    .company {
      font-family: "Mont-DEMO";
      font-size: calc((18 / 720) * 100vw);
      font-weight: 900;
      font-stretch: normal;
      font-style: normal;
      color: #999;
    }
  }
`;

const LearnMore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc((106 / 720) * 100vw);
  height: calc((38 / 1280) * 100vh);
  border-radius: 4px;
  background-color: #099f3c;

  font-size: calc((18 / 720) * 100vw);
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.35px;
  color: #fff;
  margin-top: calc((5 / 1280) * 100vh);
`;

const CloseButton = styled.div`
  width: calc((30 / 720) * 100vw);
  height: calc((30 / 1280) * 100vh);
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.95);
  position: absolute;
  top: 3px;
  right: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: calc((19 / 720) * 100vw);
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 2px;
  display: flex;
  position: absolute;
  bottom: 2px;
`;

const Progress = styled.div`
  width: ${(props) => props.width};
  height: 4px;
  object-fit: contain;
  background-color: #07ac40;
`;

const VideoTextContainer = styled.div`
  height: calc((146 / 1280) * 100vh);
  padding: 0 calc((39 / 720) * 100vw);
  border-radius: 12px;
  display: flex;
  justify-content: space-between;

  .text {
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .title {
      font-size: calc((30 / 720) * 100vw);
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.4px;
      color: #ccc;
    }
    .description {
      display: flex;
      font-size: calc((24 / 720) * 100vw);

      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.32px;
      color: #999;
      * {
        margin-right: 20px;
      }
    }
  }
  .share {
    width: calc((44 / 720) * 100vw);
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    > div {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    div > img {
      width: calc((26 / 720) * 100vw);
      height: auto;
      margin: 0;
    }
    > div > div {
      font-size: calc((24 / 720) * 100vw);
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.4px;
      color: #999;
    }
  }
`;

const VideoListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  > .title {
    display: flex;
    align-items: center;

    font-size: calc((20 / 720) * 100vw);
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.24px;
    color: #ccc;
    margin-bottom: calc((25 / 1280) * 100vh);
    padding: 0 calc((40 / 720) * 100vw);

    .title {
      font-size: calc((28 / 720) * 100vw);
      color: #ffffff;
      margin-right: calc((30 / 720) * 100vw);
    }
  }
  .slider {
    padding: 0 calc((20 / 720) * 100vw);
    margin-bottom: calc((40 / 1280) * 100vh);
  }
`;

const HighlightTitleContainer = styled.div`
  width: 100%;
  padding: 0 calc((40 / 720) * 100vw);
  margin-bottom: calc((24 / 1280) * 100vh);
  display: flex;
  align-items: center;
`;

const HighlightTitle = styled.div`
  font-size: calc((28 / 720) * 100vw);
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.5px;
  color: #fff;
  margin-right: 12px;
  line-height: 28px;
`;

const VideoOrder = styled.div`
  margin-left: auto;
  display: flex;

  font-size: calc((20 / 720) * 100vw);
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.4px;
  color: rgba(153, 153, 153, 0.7);

  .latest {
    color: ${(props) => props.order === "최신순" && "#fff"};
  }
  .popular {
    margin-left: 20px;
    color: ${(props) => props.order === "인기순" && "#fff"};
  }
`;

const SliderContainer = styled.div`
  padding: 0;
  /* calc((40 / 720) * 100vw); */
  margin-bottom: calc((30 / 1280) * 100vh);
`;

const HighlightVideoMobile = ({ shareModal, setShareModal }) => {
  const [videoOrder, setVideoOrder] = useState("최신순");
  const tmpList1 = [
    {
      img: "/images/highlight/Baseball.png",
      text: "첼시 토스넘 훗스퍼 vs 조앤더슨",
      button: "주요장면",
      length: "01:42:57",
    },
    {
      img: "/images/highlight/Baseball.png",
      text: "첼시 토스넘 훗스퍼 vs 조앤더슨",
      button: "다시보기",
      length: "01:42:57",
    },
    {
      img: "/images/highlight/Baseball.png",
      text: "첼시 토스넘 훗스퍼 vs 조앤더슨",
      button: "주요장면",
      length: "01:42:57",
    },
    {
      img: "/images/highlight/Baseball.png",
      text: "첼시 토스넘 훗스퍼 vs 조앤더슨",
      button: "주요장면",
      length: "01:42:57",
    },
    {
      img: "/images/highlight/Baseball.png",
      text: "첼시 토스넘 훗스퍼 vs 조앤더슨",
      button: "주요장면",
      length: "01:42:57",
    },
  ];

  const tmpList2 = [
    {
      img: "/images/highlight/Soccer.png",
      text: "첼시 토스넘 훗스퍼 vs 조앤더슨",
      button: "다시보기",
      length: "01:42:57",
    },
    {
      img: "/images/highlight/Soccer.png",
      text: "첼시 토스넘 훗스퍼 vs 조앤더슨",
      button: "주요장면",
      length: "01:42:57",
    },
    {
      img: "/images/highlight/Soccer.png",
      text: "첼시 토스넘 훗스퍼 vs 조앤더슨",
      button: "다시보기",
      length: "01:42:57",
    },
    {
      img: "/images/highlight/Soccer.png",
      text: "첼시 토스넘 훗스퍼 vs 조앤더슨",
      button: "주요장면",
      length: "01:42:57",
    },
    {
      img: "/images/highlight/Soccer.png",
      text: "첼시 토스넘 훗스퍼 vs 조앤더슨",
      button: "주요장면",
      length: "01:42:57",
    },
  ];
  return (
    <Wrapper>
      <VideoContents>
        <div className="video">
          <Banner>
            <div className="contents">
              <div className="image">
                <img src="/images/common/LogoSingle.png" alt="" />
              </div>
              <div className="text">
                <div className="title">스포시티 광고 노출</div>
                <div className="company">SPOCITY</div>
              </div>
              <div>
                <LearnMore>더알아보기</LearnMore>
              </div>
            </div>
            <CloseButton>
              <AiOutlineClose />
            </CloseButton>
            <ProgressBar>
              <Progress width="67%"></Progress>
            </ProgressBar>
          </Banner>
        </div>
        <VideoTextContainer>
          <div className="text">
            <div className="title">[PL] 23R C.팰리스 vs 리버풀 하이라이트</div>
            <div className="description">
              <div>프리미어리그</div>
              <div>23R</div>
              <div>2022.01.23 (일) 23:00</div>
            </div>
          </div>
          <div className="share" onClick={() => setShareModal(true)}>
            <div>
              <img src="/images/highlight/Share.png" alt=""></img>
              <div>공유</div>
            </div>
          </div>
        </VideoTextContainer>
        <hr />
      </VideoContents>
      <VideoListContainer>
        <div className="title">
          <div className="title">연관영상</div>
          <div className="game">C.팰리스 VS 리버풀</div>
        </div>
        <div className="slider">
          <HighlightSlider tmpList={tmpList2} single={true} video={true} />
        </div>
      </VideoListContainer>
      <HighlightTitleContainer>
        <HighlightTitle>최신 영상</HighlightTitle>
        <VideoOrder order={videoOrder}>
          <div className="latest" onClick={() => setVideoOrder("최신순")}>
            최신순
          </div>
          <div className="popular" onClick={() => setVideoOrder("인기순")}>
            인기순
          </div>
        </VideoOrder>
      </HighlightTitleContainer>
      <SliderContainer>
        <HighlightSlider tmpList={tmpList1} single={true} swipe={false} />
        <HighlightSlider tmpList={tmpList2} single={true} swipe={false} />
        <HighlightSlider tmpList={tmpList1} single={true} swipe={false} />
        <HighlightSlider tmpList={tmpList2} single={true} swipe={false} />
      </SliderContainer>
    </Wrapper>
  );
};

export default HighlightVideoMobile;
