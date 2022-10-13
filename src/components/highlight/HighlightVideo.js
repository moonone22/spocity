import React, { useState } from "react";
import styled from "styled-components";
import GuaranteeCompanySlider from "../slider/GuaranteeCompanySlider";
import Footer from "../common/Footer";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import HighlightVideoMobile from "./HighlightVideoMobile";

const ModalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 100000,
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    border: "none",
    background: "transparent",
    overflow: "hidden",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
  },
};

const Wrapper = styled.div`
  width: 100%;
  background-color: #202221;
  padding-top: 16px;
  display: flex;
  justify-content: center;
`;

const ContentsContainer = styled.div`
  width: 100%;
  max-width: 1344px;
  @media (max-width: 720px) {
    width: 100%;
    height: max-content;
  }
`;

const AssuranceContainer = styled.div`
  height: fit-content;
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

const AssuranceTitmeContainer = styled.div`
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

const AssuranceText = styled.p`
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

const MenuContainer = styled.div`
  height: 77px;
  padding: 0 42px;
  display: flex;
  margin-bottom: 40px;
  @media (max-width: 720px) {
    display: none;
  }
`;

const MenuContents = styled.div`
  width: 68px;
  height: 77px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  @media (max-width: 720px) {
    width: calc((69 / 720) * 100vw);
    margin-right: calc((23 / 720) * 100vw);
  }
`;

const MenuRectangle = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.background};
  border-radius: 10px;
  position: relative;
  :hover {
    filter: brightness(1.2);
  }
  :active {
    transform: scale(0.95);
  }

  img {
    width: 48%;
  }

  @media (max-width: 720px) {
    width: calc((69 / 720) * 100vw);
    height: calc((69 / 1280) * 100vh);
  }
`;

const MenuText = styled.div`
  width: 100%;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.3px;
  text-align: left;
  color: ${(props) => props.color || "#fff"};
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  @media (max-width: 720px) {
    display: none;
  }
`;

const MenuCount = styled.div`
  width: 21px;
  height: 19px;
  object-fit: contain;
  border-radius: 6px;
  background-color: ${(props) =>
    props.background === "active" ? "#156330" : "#3c3e3d"};
  position: absolute;
  top: -15%;
  right: -15%;

  object-fit: contain;
  font-family: "Roboto", sans-serif;
  font-size: 13px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.26px;
  text-align: left;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 720px) {
    display: none;
  }
`;

const HighlightContainer = styled.div`
  & > div {
    margin-bottom: 30px;
  }
  & > div:last-of-type {
    margin-bottom: 40px;
  }
  margin: 0 50px 0 40px;
  @media (max-width: 720px) {
    display: none;
  }
`;

const HighlightTitleContainer = styled.div`
  width: 100%;
  padding-left: 15px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;

const HighlightTitle = styled.div`
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.5px;
  color: #fff;
  margin-right: 12px;
  line-height: 28px;
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
  margin-left: auto;
  @media (max-width: 1100px) {
    margin-right: 3px;
    font-size: 22px;
  }
  @media (max-width: 720px) {
    margin-right: calc((3 / 720) * 100vw);
    font-size: calc((22 / 720) * 100vw);
  }
`;

const ListWrapper = styled.div`
  height: 232px;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  :hover {
    transform: translate(0px, -5px);
  }
  :active {
    transform: scale(0.95);
  }
`;

const ImageContainer = styled.div`
  width: 298px;
  height: 168px;
  border-radius: 12px;
  background-color: #fff;
  background-image: url(${(props) => props.backgroud});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 6px;
  position: relative;
`;

const TextContainer = styled.div`
  width: 298px;
  height: 67px;
  border-radius: 12px;
  background-color: #2c2d2d;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 17px;

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
`;

const ListContainer = styled.div`
  display: flex;
  width: 100%;
  height: 500px;
  justify-content: space-between;
  flex-direction: column;

  > div {
    display: flex;
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 570px;
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 61px;
  @media (max-width: 720px) {
    display: none;
  }
`;

const VideoContents = styled.div`
  width: 820px;
  height: 100%;
  display: flex;
  flex-direction: column;

  .video {
    background-image: url("/images/highlight/Soccer.png");
    width: 820px;
    height: 461px;
    margin-bottom: 10px;
    position: relative;
  }
`;

const VideoTextContainer = styled.div`
  width: 820px;
  height: 99px;
  border-radius: 12px;
  background-color: #2c2d2d;
  display: flex;
  padding: 0 30px;

  .text {
    width: 50%;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .title {
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.4px;
      color: #ccc;
    }
    .description {
      display: flex;
      font-size: 16px;
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
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
    > div {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    div > img {
      width: 24px;
      height: auto;
      margin: 0;
    }
    > div > div {
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.4px;
      color: #999;
    }
  }
`;

const VideoListContainer = styled.div`
  width: 391px;
  height: 100%;
  display: flex;
  flex-direction: column;
  > .title {
    height: 16px;
    display: flex;

    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.24px;
    color: #ccc;
    margin-bottom: 22px;

    .title {
      color: #ffffff;
      margin-right: 30px;
    }
  }
  cursor: pointer;
  .list {
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    > div {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
  }
`;

const VideoImg = styled.div`
  width: 173px;
  height: 95px;
  border-radius: 8px;
  background-color: #fff;
  background-image: url("/images/highlight/Audience.png");
  background-size: cover;
  background-position: center;
  position: relative;

  .rectangle {
    width: 57px;
    height: 18px;
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    bottom: 7px;
    right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: 0.28px;
    color: #fff;
  }
  :active {
    transform: scale(0.95);
  }
`;

const VideoTitle = styled.div`
  width: 187px;
  height: 95px;
  border-radius: 8px;
  background-color: #2c2d2d;
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 10px;

  .title {
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.23px;
    color: #ccc;
  }

  .type {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.21px;
    color: #666;
  }
`;

const VideoOrder = styled.div`
  margin-left: auto;
  display: flex;

  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.4px;
  color: rgba(153, 153, 153, 0.7);

  > div {
    cursor: pointer;
  }

  .latest {
    color: ${(props) => props.order === "최신순" && "#fff"};
  }
  .popular {
    margin-left: 20px;
    color: ${(props) => props.order === "인기순" && "#fff"};
  }
`;

const Pagination = styled.div`
  width: 259px;
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 50px;
  div {
    display: flex;
    width: 200px;
    justify-content: space-between;
    margin: 0 25px;
  }
  img {
    width: 12px;
    height: 10px;
    cursor: pointer;
  }
  @media (max-width: 720px) {
    margin: 0;
    width: calc((531 / 720) * 100vw);
    div {
      width: calc((400 / 720) * 100vw);
    }
    img {
      width: calc((24 / 720) * 100vw);
      height: calc((25 / 1280) * 100vh);
    }
    margin: calc((80 / 1280) * 100vh) auto;
  }
`;

const PaginationButton = styled.button`
  width: 28px;
  height: 27px;
  border-radius: 6px;
  background-color: ${(props) => (props.active ? "#19793a" : "#2c2d2d")};
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  color: ${(props) => (props.active ? "#fff" : "#cccccc")};
  &:hover {
    filter: brightness(1.2);
    background-color: #19793a;
  }
  &:active {
    transform: scale(0.95);
  }
  @media (max-width: 720px) {
    margin: 0;
    font-size: calc((30 / 720) * 100vw);
    width: calc((50 / 720) * 100vw);
    height: calc((50 / 720) * 100vw);
  }
`;

const PaginationArrow = styled.img`
  &:hover {
    filter: brightness(10);
  }
`;

const ShareModal = styled.div`
  width: 400px;
  height: 260px;

  border-radius: 8px;
  background-color: #202221;
  padding-top: 31px;
  display: flex;
  flex-direction: column;

  .button {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }

  @media (max-width: 720px) {
    width: calc((600 / 720) * 100vw);
    height: calc((444 / 1280) * 100vh);
  }
`;

const TitleContainer = styled.div`
  height: 21px;
  margin: 0 0 30px;
  display: flex;
  padding: 0 25px;
  justify-content: space-between;
  align-items: center;
  img {
    width: 13px;
    height: 12px;
    cursor: pointer;
  }
  @media (max-width: 720px) {
    height: calc((28 / 1280) * 100vh);
    padding: 0 calc((40 / 720) * 100vw);
    margin-bottom: calc((60 / 1280) * 100vh);
    img {
      width: calc((28 / 720) * 100vw);
      height: calc((28 / 1280) * 100vh);
    }
  }
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.45px;
  color: #fff;

  @media (max-width: 720px) {
    font-size: calc((30 / 720) * 100vw);
    display: flex;
    align-items: center;
  }
`;

const SNSButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.38px;
    color: #fff;

    @media (max-width: 720px) {
      font-size: calc((27.5 / 720) * 100vw);
    }
  }
`;

const SNSButton = styled.button`
  width: 69px;
  height: 69px;
  border-radius: 12px;
  background-color: #353736;
  margin-bottom: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  .facebook {
    width: 16px;
  }
  .twitter {
    width: 28px;
  }
  .link {
    width: 30px;
  }

  @media (max-width: 720px) {
    width: calc((112 / 720) * 100vw);
    height: calc((112 / 720) * 100vw);
    .facebook {
      width: calc((26 / 720) * 100vw);
    }
    .twitter {
      width: calc((45 / 720) * 100vw);
    }
    .link {
      width: calc((47 / 720) * 100vw);
    }
  }
`;

const ModalFooter = styled.div`
  width: 400px;
  height: 52px;
  border-radius: 6px;
  background-color: #1a1c1b;
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.35px;
  color: rgba(204, 204, 204, 0.7);

  @media (max-width: 720px) {
    width: 100%;
    height: calc((92 / 1280) * 100vh);
    font-size: calc((24 / 720) * 100vw);
  }
`;

const Banner = styled.div`
  width: 353px;
  height: 85px;
  border-radius: 8px;
  background-color: #f2f2f2;
  position: absolute;
  bottom: 39px;
  left: 21px;
  overflow: hidden;

  .contents {
    display: flex;
    align-items: center;

    padding: 0 9px 0 6px;
    height: 100%;
  }

  .image {
    width: 74px;
    height: 73px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 34px;
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
      font-size: 18px;
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
      font-size: 14px;
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
  width: 84px;
  height: 31px;
  border-radius: 4px;
  background-color: #099f3c;

  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.35px;
  color: #fff;
  cursor: pointer;
  :hover {
    filter: brightness(1.2);
  }
  :active {
    transform: scale(0.95);
  }
`;

const CloseButton = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.95);
  position: absolute;
  top: 3px;
  right: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 12px;
  }
  cursor: pointer;
  :hover {
    filter: brightness(1.2);
  }
  :active {
    transform: scale(0.95);
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

const HighlightVideo = ({ setMobileMenu, mobileMenu }) => {
  const [sportsType, setSportsType] = useState("soccer");
  const [videoOrder, setVideoOrder] = useState("최신순");
  const [shareModal, setShareModal] = useState(false);

  return (
    <>
      <Wrapper>
        <ContentsContainer>
          <AssuranceContainer>
            <AssuranceTitmeContainer className="title">
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
                <AssuranceText style={{ marginLeft: "7px" }}>
                  스포시티 보증업체
                </AssuranceText>
              </div>
              <MoreDetails>더보기</MoreDetails>
            </AssuranceTitmeContainer>
            <GuaranteeCompanySlider />
          </AssuranceContainer>
          <HighlightVideoMobile
            shareModal={shareModal}
            setShareModal={setShareModal}
          ></HighlightVideoMobile>

          <MenuContainer>
            <MenuContents onClick={() => setSportsType("soccer")}>
              <MenuRectangle
                background={sportsType === "soccer" ? "#19793a" : "#3c3e3d"}
              >
                <img src="/images/live/Soccer.png" alt="" />
                <MenuCount background={sportsType === "soccer" && "active"}>
                  8
                </MenuCount>
              </MenuRectangle>
              <MenuText>축구</MenuText>
            </MenuContents>
            <MenuContents onClick={() => setSportsType("basketball")}>
              <MenuRectangle
                background={sportsType === "basketball" ? "#19793a" : "#3c3e3d"}
              >
                <img src="/images/live/Basketball.png" alt="" />
                <MenuCount background={sportsType === "basketball" && "active"}>
                  2
                </MenuCount>
              </MenuRectangle>
              <MenuText>농구</MenuText>
            </MenuContents>
            <MenuContents onClick={() => setSportsType("baseball")}>
              <MenuRectangle
                background={sportsType === "baseball" ? "#19793a" : "#3c3e3d"}
              >
                <img src="/images/live/Baseball.png" alt="" />
                <MenuCount background={sportsType === "baseball" && "active"}>
                  12
                </MenuCount>
              </MenuRectangle>
              <MenuText>야구</MenuText>
            </MenuContents>

            <MenuContents onClick={() => setSportsType("volleyball")}>
              <MenuRectangle
                background={sportsType === "volleyball" ? "#19793a" : "#3c3e3d"}
              >
                <img src="/images/live/Volleyball.png" alt="" />
              </MenuRectangle>
              <MenuText>배구</MenuText>
            </MenuContents>

            <MenuContents onClick={() => setSportsType("tennis")}>
              <MenuRectangle
                background={sportsType === "tennis" ? "#19793a" : "#3c3e3d"}
              >
                <img src="/images/live/Tennis.png" alt="" />
              </MenuRectangle>
              <MenuText>테니스</MenuText>
            </MenuContents>

            <MenuContents onClick={() => setSportsType("UFC")}>
              <MenuRectangle
                background={sportsType === "UFC" ? "#19793a" : "#3c3e3d"}
              >
                <img src="/images/highlight/UFC.png" alt="" />
              </MenuRectangle>
              <MenuText>종합격투기</MenuText>
            </MenuContents>

            <MenuContents onClick={() => setSportsType("golf")}>
              <MenuRectangle
                background={sportsType === "golf" ? "#19793a" : "#3c3e3d"}
              >
                <img src="/images/highlight/Golf.png" alt="" />
              </MenuRectangle>
              <MenuText>골프</MenuText>
            </MenuContents>

            <MenuContents onClick={() => setSportsType("general")}>
              <MenuRectangle
                background={sportsType === "general" ? "#19793a" : "#3c3e3d"}
              >
                <img src="/images/highlight/General.png" alt="" />
              </MenuRectangle>
              <MenuText>일반</MenuText>
            </MenuContents>
          </MenuContainer>

          <VideoContainer>
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
                  <div className="title">
                    [PL] 23R C.팰리스 vs 리버풀 하이라이트
                  </div>
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
            </VideoContents>
            <VideoListContainer>
              <div className="title">
                <div className="title">연관영상</div>
                <div className="game">C.팰리스 VS 리버풀</div>
              </div>
              <div className="list">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
                  <div>
                    <VideoImg>
                      <div className="rectangle">1:50:00</div>
                    </VideoImg>
                    <VideoTitle>
                      <div className="title">
                        [PL] 엄청난 높이의 다이크 공중을 지배하는 헤더골
                      </div>
                      <div className="type">하이라이트</div>
                    </VideoTitle>
                  </div>
                ))}
              </div>
            </VideoListContainer>
          </VideoContainer>

          <HighlightContainer>
            <HighlightTitleContainer>
              <HighlightTitle>최신 영상</HighlightTitle>
              <VideoOrder order={videoOrder}>
                <div className="latest" onClick={() => setVideoOrder("최신순")}>
                  최신순
                </div>
                <div
                  className="popular"
                  onClick={() => setVideoOrder("인기순")}
                >
                  인기순
                </div>
              </VideoOrder>
            </HighlightTitleContainer>
            <ListContainer>
              <div>
                {[1, 2, 3, 4].map(() => (
                  <ListWrapper>
                    <ImageContainer backgroud="/images/highlight/Baseball.png">
                      <TimeRectangle>01:42:57</TimeRectangle>
                    </ImageContainer>
                    <TextContainer>
                      <div className="title">
                        첼시 토스넘 훗스퍼 vs 조앤더슨
                      </div>
                      <ButtonRectangle>주요장면</ButtonRectangle>
                    </TextContainer>
                  </ListWrapper>
                ))}
              </div>
              <div>
                {[1, 2, 3, 4].map(() => (
                  <ListWrapper>
                    <ImageContainer backgroud="/images/highlight/Baseball.png">
                      <TimeRectangle>01:42:57</TimeRectangle>
                    </ImageContainer>
                    <TextContainer>
                      <div className="title">
                        첼시 토스넘 훗스퍼 vs 조앤더슨
                      </div>
                      <ButtonRectangle>주요장면</ButtonRectangle>
                    </TextContainer>
                  </ListWrapper>
                ))}
              </div>
            </ListContainer>
          </HighlightContainer>
          <Pagination>
            <PaginationArrow
              src="/images/popup/ArrowLeft.png"
              alt=""
            ></PaginationArrow>
            <div>
              <PaginationButton active="1">1</PaginationButton>
              <PaginationButton>2</PaginationButton>
              <PaginationButton>3</PaginationButton>
              <PaginationButton>4</PaginationButton>
              <PaginationButton>5</PaginationButton>
            </div>
            <PaginationArrow
              src="/images/popup/ArrowRight.png"
              alt=""
            ></PaginationArrow>
          </Pagination>
          <Footer
            setMobileMenu={setMobileMenu}
            mobileMeunu={mobileMenu}
          ></Footer>
        </ContentsContainer>
      </Wrapper>
      {shareModal && (
        <Modal
          isOpen={shareModal}
          style={ModalStyle}
          onRequestClose={() => setShareModal(false)}
        >
          <ShareModal>
            <TitleContainer>
              <Title>SNS 공유</Title>
              <img
                src="/images/common/Close.png"
                alt=""
                onClick={() => setShareModal(false)}
              ></img>
            </TitleContainer>
            <div className="button">
              <SNSButtonContainer>
                <SNSButton>
                  <img
                    className="facebook"
                    src="/images/highlight/Facebook.png"
                    alt=""
                  />
                </SNSButton>
                <div>페이스북</div>
              </SNSButtonContainer>
              <SNSButtonContainer>
                <SNSButton>
                  <img
                    className="twitter"
                    src="/images/highlight/Twitter.png"
                    alt=""
                  />
                </SNSButton>
                <div>트위터</div>
              </SNSButtonContainer>
              <SNSButtonContainer>
                <SNSButton>
                  <img
                    className="link"
                    src="/images/highlight/Link.png"
                    alt=""
                  />
                </SNSButton>
                <div>링크복사</div>
              </SNSButtonContainer>
            </div>
            <ModalFooter>
              SNS공유를 통해 주변지인분들에게 많이 알려주세요!
            </ModalFooter>
          </ShareModal>
        </Modal>
      )}
    </>
  );
};

export default HighlightVideo;
