import React from "react";
import styled from "styled-components";
import Footer from "../common/Footer";
import MajorGameComponents from "./MajorGameComponent";
import GuaranteeCompanySlider from "../slider/GuaranteeCompanySlider";
import HighlightSlider from "../slider/HighlightSlider";
import LiveSlider from "../slider/LiveSlider";

const Wrapper = styled.div`
  width: 100%;
  background-color: #202221;
  padding-top: 16px;
  display: flex;
  justify-content: center;

  @media (max-width: 720px) {
    padding-top: calc((40 / 720) * 100vw);
  }
`;

const ContentsContainer = styled.div`
  width: 100%;
  max-width: 1344px;
  @media (max-width: 1100px) {
    width: 100%;
  }
`;

const AssuranceContainer = styled.div`
  height: 149px;
  padding: 0 45px 0 43px;
  margin-bottom: 40px;
  @media (max-width: 1100px) {
    padding: 0 30px 0 40px;
    margin-bottom: 40px;
  }
  @media (max-width: 720px) {
    padding: 0;
    margin-bottom: calc((40 / 1280) * 100vh);
    height: max-content;
    .title {
      padding: 0 calc((40 / 720) * 100vw);
    }
  }
`;

const PopularLiveContainer = styled.div`
  height: 384px;
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
  margin-bottom: 40px;
  @media (max-width: 1100px) {
    flex-direction: column;
    height: max-content;
    padding: 0 40px;
    margin-bottom: 40px;
  }
  @media (max-width: 720px) {
    margin-bottom: calc((40 / 1280) * 100vh);
    padding: 0 calc((40 / 720) * 100vw);
    height: max-content;
  }
`;

const LiveContainer = styled.div`
  height: 280px;
  padding: 0 50px;
  margin-bottom: 40px;
  .sliderContainer {
    width: 100%;
    height: max-content;
    display: flex;
    justify-content: space-between;
  }
  @media (max-width: 1100px) {
    padding: 0 40px;
  }
  @media (max-width: 720px) {
    padding: 0 calc((40 / 720) * 100vw);
    height: max-content;
    margin-bottom: calc((40 / 1280) * 100vh);
  }
`;

const HighlightContainer = styled.div`
  height: 450px;
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
  @media (max-width: 1100px) {
    flex-direction: column;
    height: max-content;
    width: 100%;
    padding: 0 calc((40 / 720) * 100vw);
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div .icon {
    width: 20px;
    height: auto;
    @media (max-width: 720px) {
      width: calc((35 / 720) * 100vw);
    }
  }
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.5px;
  color: #fff;
  font-family: "Noto Sans KR", sans-serif;
  @media (max-width: 1100px) {
    font-size: 22px;
  }
  @media (max-width: 720px) {
    font-size: calc((28 / 720) * 100vw);
  }
`;

const MoreDetails = styled.span`
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.38px;
  color: #fff;
  opacity: 0.7;
  cursor: pointer;
  @media (max-width: 1100px) {
    margin-right: 3px;
    font-size: 22px;
  }
  @media (max-width: 720px) {
    margin-right: calc((3 / 720) * 100vw);
    font-size: calc((22 / 720) * 100vw);
  }
`;

const PopularLive = styled.div`
  width: 49%;
  height: 384px;
  @media (max-width: 1100px) {
    display: none;
  }
`;

const PopularLiveContent = styled.div`
  background: url("/images/main/PopularLive.png") no-repeat;
  /* background-size: 100% 344px; */
  background-position: center;
  background-size: cover;
  background-size: 100% 100%;
  width: 100%;
  height: 344px;
  margin-top: 21px;
  display: flex;
  align-items: flex-end;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    transform: translate(0px, -5px);
    transition: all 0.1s ease-in-out;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const PopularLiveBar = styled.div`
  width: 100%;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  border-radius: 0 0 12px 12px;
`;

const WeekHighlight = styled.div`
  width: 49%;
  height: 100%;
  @media (max-width: 1100px) {
    width: 100%;
    height: 420px;
    margin-top: 30px;
  }
  @media (max-width: 720px) {
    width: 100%;
    height: max-content;
    margin: 0;
    margin-bottom: calc((40 / 1280) * 100vh);
  }
`;

const Highlight = styled.div`
  width: 49%;
  height: 100%;
  @media (max-width: 1100px) {
    width: 100%;
    margin-top: 30px;
  }
  @media (max-width: 720px) {
    width: 100%;
    height: max-content;
    margin: 0;
  }
`;

const Rectangle = styled.div`
  margin: auto 0;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 6px;
  background-color: ${(props) => props.color};
  color: #fff;
  font-family: "Noto Sans KR", sans-serif;
  font-size: ${(props) => props.fontSize}px;
  line-height: ${(props) => props.height}px;
  text-align: center;
`;

const Text = styled.span`
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color || "white"};
  text-align: center;
  font-family: "Noto Sans KR", sans-serif;
`;

const WeekHighlightImage = styled.div`
  width: 100%;
  height: 354px;
  border-radius: 12px;
  margin-top: 21px;
  background: url("/images/main/WeekHighlight.png") no-repeat;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  &:hover {
    transform: translate(0px, -5px);
    transition: all 0.1s ease-in-out;
  }
  &:active {
    transform: scale(0.95);
  }
  @media (max-width: 1100px) {
    width: 100%;
    height: 357px;
  }
  @media (max-width: 720px) {
    width: 100%;
    height: calc((357 / 1280) * 100vh);
    background-size: cover;
    margin-top: calc((20 / 1280) * 100vh);
  }
`;

const Main = ({ setMobileMenu, mobileMenu }) => {
  return (
    <Wrapper>
      <ContentsContainer>
        <AssuranceContainer>
          <TitleContainer className="title">
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                className="icon"
                src="/images/main/Sidebar4.png"
                alt=""
              ></img>
              <Title style={{ marginLeft: "7px" }}>스포시티 보증업체</Title>
            </div>
            <MoreDetails>더보기</MoreDetails>
          </TitleContainer>
          <GuaranteeCompanySlider />
        </AssuranceContainer>
        <PopularLiveContainer>
          <PopularLive>
            <Title>지금 가장 시청자가 많은 라이브 중계</Title>
            <PopularLiveContent>
              <PopularLiveBar>
                <Rectangle
                  color="#19793a"
                  width="60"
                  height="25"
                  fontSize="14"
                  style={{ marginLeft: "7px", marginRight: "74px" }}
                >
                  전반 58’
                </Rectangle>
                <div
                  style={{
                    height: "100%",
                    width: "70%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Text
                    fontSize="15px"
                    style={{ height: "100%", lineHeight: "37px" }}
                  >
                    메이크도니자 GP
                  </Text>
                  <img
                    src="/images/main/PopularLive1.png"
                    alt=""
                    style={{ height: "16px", margin: "0 14px 0 8px" }}
                  />
                  <Rectangle
                    color="#19793a"
                    width="60"
                    height="25"
                    fontSize="17"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div
                      style={{
                        width: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "2px",
                      }}
                    >
                      <Text fontSize="17px">0</Text>
                      <Text fontSize="17px" style={{ margin: "0 3px 3px 3px" }}>
                        :
                      </Text>
                      <Text fontSize="17px" color="yellow">
                        3
                      </Text>
                    </div>
                  </Rectangle>
                  <img
                    src="/images/main/PopularLive2.png"
                    alt=""
                    style={{ height: "16px", margin: "0 8px 0 14px" }}
                  ></img>
                  <Text
                    fontSize="15px"
                    style={{ height: "100%", lineHeight: "37px" }}
                  >
                    캔자스시티 로열스
                  </Text>
                </div>
              </PopularLiveBar>
            </PopularLiveContent>
          </PopularLive>
          <MajorGameComponents />
        </PopularLiveContainer>
        <LiveContainer>
          <TitleContainer>
            <Title>라이브 중계</Title>
            <MoreDetails>더보기</MoreDetails>
          </TitleContainer>
          <div className="sliderContainer">
            <LiveSlider />
          </div>
        </LiveContainer>
        <HighlightContainer>
          <WeekHighlight>
            <Title className="weekHighlight">
              이번주 베스트 하이라이트 다시보기
            </Title>
            <WeekHighlightImage></WeekHighlightImage>
          </WeekHighlight>
          <Highlight>
            <TitleContainer>
              <Title>경기 하이라이트</Title>
              <MoreDetails>더보기</MoreDetails>
            </TitleContainer>
            <HighlightSlider></HighlightSlider>
          </Highlight>
        </HighlightContainer>
        <Footer setMobileMenu={setMobileMenu} mobileMeunu={mobileMenu} />
      </ContentsContainer>
    </Wrapper>
  );
};

export default Main;
