import React, { useState } from "react";
import styled, { css } from "styled-components";
import GuaranteeCompanySlider from "../slider/GuaranteeCompanySlider";
import Select from "../score/Select";
import { AiOutlineClose } from "react-icons/ai";
import Footer from "../common/Footer";
import LiveTennisMobile from "./LiveTennisMobile";

const Wrapper = styled.div`
  width: 100%;
  @media (max-width: 720px) {
    display: none;
  }
`;

const AssuranceContainer = styled.div`
  height: fit-content;
  padding: 0 45px 0 43px;
  margin-bottom: 40px;
  margin-top: 44px;
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

const VideoContainer = styled.div`
  width: 100%;
  height: 759px;
  background-color: #37840c;
  background-image: url("/images/watchinglive/tennis.png");
  background-size: cover;
  position: relative;

  ${(props) =>
    props.fullScreen &&
    css`
      height: calc(100vh - 46px);
    `}
`;

const TeamContainer = styled.div`
  width: 100%;
  height: 421px;
  background-color: #2a2c2b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  > span {
    font-size: 14px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #ccc;
  }
  > .middle {
    width: 805px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > .team {
      display: flex;
      flex-direction: column;
      align-items: center;
      /* margin-top: 10px; */

      font-size: 25px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.5px;
      text-align: center;
      color: #fff;
      .rank {
        font-size: 17px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: -0.34px;
        text-align: center;
        color: #fe7300;
      }
    }
    img {
      width: 40px;
    }
    > .middle {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      > div:first-child {
        margin-bottom: 9px;
      }
      div {
        width: 72px;
        height: 26px;
        border-radius: 6px;
        background-color: #19793a;

        font-family: "Roboto", sans-serif;
        font-size: 16px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: -0.32px;
        text-align: center;
        color: #fff;

        display: flex;
        align-items: center;
        justify-content: center;
      }
      > div:last-child {
        width: 72px;
        height: 26px;
        border-radius: 6px;
        background-color: #202221;

        font-family: "Roboto", sans-serif;
        font-size: 18px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: 1.8px;
        text-align: center;
        color: #00cc45;
      }
      span {
        object-fit: contain;
        opacity: 0.5;
        font-family: "Roboto", sans-serif;

        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        text-align: center;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
`;

const TeamScore = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 40px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.8px;
  text-align: center;

  width: 45px;
  height: 45px;
  object-fit: contain;
  border-radius: 6px;
  background-color: ${(props) => props.active && "#daae00"};
  color: ${(props) => (props.active ? "#fff" : "#f5c703")};
`;

const ButtonContainer = styled.div`
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.28px;
  text-align: center;
  color: #fff;
  cursor: pointer;

  .text {
    height: 100%;
    line-height: 30px;
  }
  :hover {
    filter: brightness(1.2);
  }

  > :nth-child(1) {
    width: 107px;
    height: 32px;
    border-radius: 6px;
    background-color: #be4853;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hot {
    width: 13px;
    margin-right: 5px;
  }
`;

const ContentsContainer = styled.div`
  width: 100%;
  padding: 0 50px;
`;

const ContentsTabContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #303231;
  margin-bottom: 39px;
  > div {
    display: flex;
  }
  img {
    width: 35px;
    margin-left: auto;
  }
`;

const ContentsTab = styled.div`
  width: 130px;
  height: 49px;
  background-color: ${(props) => (props.active ? "#3b3c3b" : "#303231")};
  margin-right: 1px;
  border-radius: 6px 6px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.3px;
  color: ${(props) => (props.active ? "#fff" : "#999999")};
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  display: ${(props) => !props.active && "none"};
`;

const ContentTitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  margin-bottom: 11px;

  .title {
    font-size: 20px;
    letter-spacing: -0.4px;
    text-align: center;
    color: #2196f5;
    > span {
      font-size: 20px;
      letter-spacing: -0.4px;
      text-align: center;
      color: #fff;
      margin-left: 6px;
    }
  }

  > div {
    display: flex;
    align-items: center;
    position: relative;
    > span {
      margin-right: 14px;

      font-size: 15px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.3px;
      text-align: center;
      color: #fff;
      display: flex;
      align-items: center;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  margin: 0;
  object-fit: contain;
  margin-bottom: 20px;

  th,
  td {
    height: 50px;
    /* border: 1px solid #202221; */
  }

  th {
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    color: #fff;
    background-color: #3b3c3b;
  }

  td {
    font-family: "Roboto", sans-serif;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.3px;
    text-align: center;
    color: #ccc;
  }

  thead {
    .one {
      width: 243px;
    }
    .two {
      width: 141px;
    }
    .three {
      width: 303px;
    }
    .four {
      width: 118px;
    }
    .five {
      width: 303px;
    }
    .six {
      width: 137px;
    }
  }
`;

const ResultCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.28px;
  color: #fff;
`;

const Tbody = styled.tbody`
  background-color: #2a2c2b;
  .result {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .active {
    color: #2196f5;
  }
  &:hover {
    background-color: #424342;
  }
  .score {
    color: ${(props) => (props.type === "lose" ? "#e74c5b" : "")};
    color: ${(props) => (props.type === "draw" ? "#ffa42d" : "")};
    color: ${(props) => (props.type === "win" ? "#07ac40" : "")};
    letter-spacing: 3px;
  }
  ${ResultCircle} {
    background-color: ${(props) => (props.type === "lose" ? "#e74c5b" : "")};
    background-color: ${(props) => (props.type === "draw" ? "#ffa42d" : "")};
    background-color: ${(props) => (props.type === "win" ? "#07ac40" : "")};
  }
`;

// 리그명 따로 빼서 호버시 같이 css 변경 되도록 수정
const League = styled.td`
  background-color: #303231;
  ${Tbody}:hover & {
    background-color: #424342;
  }
` 

const SummaryText = styled.div`
  width: 100%;

  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.3px;
  text-align: left;
  color: #fff;
  margin-bottom: 40px;
  .win {
    color: #07ac40;
  }
  .draw {
    color: #ffa42d;
  }
  .lose {
    color: #e74c5b;
  }
`;

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 22px;
`;

const CheckBoxOn = styled.div`
  background-image: url("/images/popup/Check.png");
  background-size: contain;
  width: 16px;
  height: 16px;
  @media (max-width: 720px) {
    width: calc((34 / 720) * 100vw);
    height: calc((34 / 1280) * 100vh);
  }
`;

const CheckBoxOff = styled.div`
  width: 16px;
  height: 16px;
  border: 1.5px solid #000;
  border-radius: 5px;
  background-color: #fff;
  @media (max-width: 720px) {
    width: calc((34 / 720) * 100vw);
    height: calc((34 / 1280) * 100vh);
  }
`;

const CheckText = styled.span`
  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.3px;
  color: #fff;
  margin-left: 7px;
  @media (max-width: 720px) {
    font-size: calc((24 / 720) * 100vw);
  }
`;

const OptionContainer = styled.div`
  width: 100%;
  height: 46px;
  background-color: rgba(0, 0, 0, 0.9);
  padding-left: 21px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OptionTeam = styled.div`
  width: 275px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.3px;
  text-align: center;
  color: #ccc;

  > span {
    height: 100%;
    line-height: 24px;
  }
  > img {
    height: 100%;
  }
  > div {
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 24px;
    letter-spacing: 0.8px;
    text-align: center;
    color: #ccc;
  }
`;

const OptionSelectContainer = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin-left: 10px;
  }
`;

const ScoreTable = styled.table`
  border-spacing: 0px;

  > :nth-child(2) {
    * {
      border-top: none;
    }
  }
  * {
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    color: #ccc;
  }
  thead {
    tr {
      > :last-child {
        font-size: 17px;
        margin-right: 231px;
      }
    }
  }
  tbody {
    tr {
      > :nth-child(2) {
        font-size: 17px;
      }
    }
  }
  th {
    background-color: #303231;
    height: 50px;
  }
  td {
    background-color: #3b3c3b;
    height: 45px;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 21px;
      height: 21px;
      margin: auto;
      border-radius: 3px;
      border: none;
      color: #00cc45;
    }
    .win {
      background-color: rgb(255, 255, 255, 0.2);
    }
  }
`;

const ScoreTbody = styled.tbody`
  .image {
    background-image: ${(props) => "url(" + props.item?.logo + ")"};
    background-size: 18px auto;
    background-position: center;
    background-repeat: no-repeat;
  }
  .home {
    background-image: ${(props) => "url(" + props.item?.home + ")"};
    background-size: 13px 14px;
    background-position: center;
    background-repeat: no-repeat;
  }
  .icon {
    background-image: ${(props) => "url(" + props.item?.icon + ")"};
    background-size: 16px 16px;
    background-position: center;
    background-repeat: no-repeat;
  }
  tr {
    text-align: center;
    .active {
      background-color: rgba(12, 114, 185, 0.4);
    }
    * {
      width: 44px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      border-right: 1px solid rgba(255, 255, 255, 0.1);

      font-family: "Roboto", sans-serif;
      font-size: 18px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      color: #fff;
    }
    > :nth-child(1) {
      width: 36px;
      border: none;
    }
    > :nth-child(2) {
      text-align: start;
      width: 150px;
      border: none;
      font-size: 17px;
      font-family: "Noto Sans KR", sans-serif;
      font-weight: 300;
    }
    > :nth-child(3) {
      width: 26px;
      border: none;
    }
    > :nth-child(4) {
      width: 30px;
      border: none;
    }
    > :nth-child(5) {
      border-left: none;
    }
    > :last-child {
      border-right: none;
    }
    > :nth-child(n + 10) {
      border: none;
    }
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 181px;
  background-color: #2a2c2b;
  border-bottom: 1px solid #161717;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 90px;
  > div {
    display: flex;
    flex-direction: column;
  }
  .side {
    > :nth-child(1) {
      margin-bottom: 30px;
    }
  }
  .middle {
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.32px;
    text-align: center;
    color: #fff;
    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 30px;
    }
    > div:last-child {
      margin: 0;
    }
    .shot {
      width: 115px;
      white-space: nowrap;
      font-size: 17px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.34px;
      text-align: center;
      color: #fff;
    }
  }
  section {
    width: 1px;
    height: 104px;
    background-color: #161717;
  }
`;

const SideInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  > div {
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.36px;
    color: #fff;
  }
  > span {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.32px;
    color: #999;
  }
`;

const InfoBar = styled.div`
  width: 227px;
  height: 8px;
  border-radius: 2px;
  background-color: #000;
  margin-left: ${(props) => (props.type === "left" ? "10px" : "36px")};
  margin-right: ${(props) => (props.type === "left" ? "36px" : "10px")};
  position: relative;
  > div {
    position: absolute;
    border-radius: 2px;
    width: ${(props) => props.width};
    background-color: ${(props) =>
      props.type === "left" ? "#07ac40" : "#ffba5a"};
    z-index: 1;
    height: 100%;
    right: ${(props) => (props.type === "left" ? "0" : "none")};
    left: ${(props) => (props.type === "left" ? "none" : "0")};
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

const LiveTennis = ({
  setMobileMenu,
  mobileMenu,
  fullScreen,
  setFullScreen,
  // 경기선택 모달창 토글
  multiModalToggle,
  setMultiModalToggle
}) => {
  const [contentsTab, setContentsTab] = useState(1);
  const [check, setCheck] = useState({
    home: false,
    away: false,
  });
  const [selectOne, setSelectOne] = useState({
    open: false,
    text: 5,
    list: [5, 10, 15],
  });
  const [selectTwo, setSelectTwo] = useState({
    open: false,
    text: 5,
    list: [5, 10, 15],
  });
  const [selectThree, setSelectThree] = useState({
    open: false,
    text: 5,
    list: [5, 10, 15],
  });

  const [relay, setRelay] = useState({
    open: false,
    text: "그래픽중계",
    list: ["그래픽중계", "실시간중계"],
  });

  const [quality, setQuality] = useState({
    open: false,
    text: "화질선택",
    list: ["1080p", "720p", "360p"],
  });

  const [multiView, setMultiView] = useState({
    open: false,
    text: "멀티뷰",
    list: ["기본(1화면)", "2멀티화면", "4멀티화면"],
  });

  const tmpList = [
    {
      type: "head",
      score: ["S1", "S2", "S3", "S4", "S5", "", "", "", "", ""],
    },
    {
      logo: "/images/main/KansasCity.png",
      name: "메이크도니자 GP",
      score: [1, 2, 0, 0, "", 0, "", "", "", ""],
      activeScore: 1,
    },
    {
      logo: "/images/main/KansasCity.png",
      name: "메이크도니자 GP",
      home: "/images/main/Home.png",
      icon: "/images/live/TennisBall.png",
      score: [4, 2, 0, 0, "", 5, "", "", "", ""],
      activeScore: 1,
      win: true,
    },
  ];

  return (
    <>
      <Wrapper>
        <VideoContainer fullScreen={fullScreen}>
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
        </VideoContainer>
        <OptionContainer>
          <OptionTeam>
            <span>알 메사이미어</span>
            <img src="/images/live/Team4.png" alt=""></img>
            <div>vs</div>
            <img src="/images/live/Team3.png" alt=""></img>
            <span>하포엘 예루살렘</span>
          </OptionTeam>
          <OptionSelectContainer>
            <Select
              select={relay}
              setSelect={setRelay}
              width="133px"
              type="option"
              background="#2c2d2d"
              height="32px"
              name="relay"
            ></Select>
            <Select
              select={quality}
              setSelect={setQuality}
              width="111px"
              type="option"
              background="#2c2d2d"
              height="32px"
            ></Select>
            <Select
              select={multiView}
              setSelect={setMultiView}
              width="111px"
              type="option"
              background="#3081c3"
              height="32px"
              name="multi"
            ></Select>
            <ButtonContainer onClick={() => setFullScreen(!fullScreen)}>
              <div>
                <img
                  className="hot"
                  src="/images/watchinglive/hot.png"
                  alt=""
                />
                <div className="text">집중모드</div>
              </div>
            </ButtonContainer>
          </OptionSelectContainer>
        </OptionContainer>
        {!fullScreen && (
          <>
            <InfoContainer>
              <div className="side">
                <SideInfo>
                  <div>1</div>
                  <span>에이스</span>
                </SideInfo>
                <SideInfo>
                  <div>2</div>
                  <span>서브에러</span>
                </SideInfo>
              </div>
              <section></section>
              <div className="middle">
                <div>
                  <div>49%</div>
                  <InfoBar type="left" width="49%">
                    <div></div>
                  </InfoBar>
                  <div className="shot">리시브 득점 성공률</div>
                  <InfoBar type="right" width="49%">
                    <div></div>
                  </InfoBar>
                  <div>49%</div>
                </div>

                <div>
                  <div>21%</div>
                  <InfoBar type="left" width="21%">
                    <div></div>
                  </InfoBar>
                  <div className="shot">서브 득점 성공률</div>
                  <InfoBar type="right" width="25%">
                    <div></div>
                  </InfoBar>
                  <div>25%</div>
                </div>
              </div>

              <section></section>
              <div className="side">
                <SideInfo>
                  <div>1</div>
                  <span>에이스</span>
                </SideInfo>
                <SideInfo>
                  <div>2</div>
                  <span>서브에러</span>
                </SideInfo>
              </div>
            </InfoContainer>

            <TeamContainer>
              <span>인터내셔널 클럽 프렌들리 2022/07/26 19:00:00</span>
              <div className="middle">
                <div className="team">
                  <div>알 메사이미어</div>
                </div>
                <img src="/images/live/Team4.png" alt=""></img>
                <TeamScore>3</TeamScore>
                <div className="middle">
                  <div>Set 3</div>
                  <div>0-5</div>
                </div>
                <TeamScore active={true}>1</TeamScore>
                <img src="/images/live/Team3.png" alt=""></img>
                <div className="team">
                  <div>하포엘 예루살렘</div>
                </div>
              </div>
              <ScoreTable width="640px">
                {tmpList.map((item, index) =>
                  item.type === "head" ? (
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        {item.score.map((item) => (
                          <th>{item}</th>
                        ))}
                      </tr>
                    </thead>
                  ) : (
                    <ScoreTbody item={item}>
                      <tr>
                        <td className="image"></td>
                        <td>{item.name}</td>
                        <td className="home"></td>
                        <td className="icon"></td>
                        {item.score.map((e, idx) =>
                          idx === 5 ? (
                            <td>
                              <div className={item.win && "win"}>{e}</div>
                            </td>
                          ) : (
                            <td
                              className={
                                item.activeScore === idx ? "active" : ""
                              }
                            >
                              {e}
                            </td>
                          )
                        )}
                      </tr>
                    </ScoreTbody>
                  )
                )}
              </ScoreTable>
            </TeamContainer>

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
            <ContentsContainer>
              <ContentsTabContainer>
                <div>
                  <ContentsTab
                    active={contentsTab === 1}
                    onClick={() => setContentsTab(1)}
                  >
                    전력비교
                  </ContentsTab>
                </div>
                <img src="/images/live/Refresh.png" alt="" />
              </ContentsTabContainer>
              <Content active={contentsTab === 1}>
                <ContentTitleContainer>
                  <span className="title">상대 전적</span>
                  <div>
                    <span>최근</span>
                    <Select
                      select={selectOne}
                      setSelect={setSelectOne}
                    ></Select>
                  </div>
                </ContentTitleContainer>
                <Table>
                  <thead>
                    <tr>
                      <th className="one">리그명</th>
                      <th className="two">날짜</th>
                      <th className="three">홈팀</th>
                      <th className="four">점수</th>
                      <th className="five">원정팀</th>
                      <th className="six">결과</th>
                    </tr>
                  </thead>
                  <Tbody type="lose">
                    <tr>
                      <League>IND DSD</League>
                      <td>2022/07/22</td>
                      <td>델리 FC</td>
                      <td className="score">0-3</td>
                      <td>가르활 FC</td>
                      <td className="result">
                        <ResultCircle>L</ResultCircle>
                      </td>
                    </tr>
                  </Tbody>
                </Table>
                <SummaryText>
                  최근 5 , 마자틀란 우먼 승리 <span className="win">1</span>,
                  무승부 <span className="draw">0</span> , 패배{" "}
                  <span className="lose">4</span>, 승리 : 20.00%
                </SummaryText>

                <ContentTitleContainer>
                  <span className="title">
                    최근 경기 내역 <span>Uttarakhand FC</span>
                  </span>
                  <div>
                    <span>최근</span>
                    <Select
                      select={selectTwo}
                      setSelect={setSelectTwo}
                    ></Select>
                    <CheckBoxContainer>
                      {check.home ? (
                        <CheckBoxOn
                          onClick={() => setCheck({ ...check, home: false })}
                        />
                      ) : (
                        <CheckBoxOff
                          onClick={() => setCheck({ ...check, home: true })}
                        />
                      )}
                      <CheckText>홈경기만</CheckText>
                    </CheckBoxContainer>
                  </div>
                </ContentTitleContainer>
                <Table>
                  <thead>
                    <tr>
                      <th className="one">리그명</th>
                      <th className="two">날짜</th>
                      <th className="three">홈팀</th>
                      <th className="four">점수</th>
                      <th className="five">원정팀</th>
                      <th className="six">결과</th>
                    </tr>
                  </thead>
                  <Tbody type="lose">
                    <tr>
                      <League>IND DSD</League>
                      <td>2022/07/22</td>
                      <td className="active">델리 FC</td>
                      <td className="score">0-3</td>
                      <td>마자틀란 우먼</td>
                      <td className="result">
                        <ResultCircle>L</ResultCircle>
                      </td>
                    </tr>
                  </Tbody>
                  <Tbody type="win">
                    <tr>
                      <League>IND DSD</League>
                      <td>2022/07/22</td>
                      <td>델리 FC</td>
                      <td className="score">0-3</td>
                      <td>마자틀란 우먼</td>
                      <td className="result">
                        <ResultCircle>L</ResultCircle>
                      </td>
                    </tr>
                  </Tbody>
                  <Tbody type="draw">
                    <tr>
                      <League>IND DSD</League>
                      <td>2022/07/22</td>
                      <td>델리 FC</td>
                      <td className="score">0-3</td>
                      <td>클럽 네카사 우먼</td>
                      <td className="result">
                        <ResultCircle>L</ResultCircle>
                      </td>
                    </tr>
                  </Tbody>
                  <Tbody type="lose">
                    <tr>
                      <League>IND DSD</League>
                      <td>2022/07/22</td>
                      <td>Uttarakhand FC</td>
                      <td className="score">0-3</td>
                      <td className="active">마자틀란 우먼</td>
                      <td className="result">
                        <ResultCircle>L</ResultCircle>
                      </td>
                    </tr>
                  </Tbody>
                  <Tbody type="lose">
                    <tr>
                      <League>IND DSD</League>
                      <td>2022/07/22</td>
                      <td>델리 FC</td>
                      <td className="score">0-3</td>
                      <td>마자틀란 우먼</td>
                      <td className="result">
                        <ResultCircle>L</ResultCircle>
                      </td>
                    </tr>
                  </Tbody>
                </Table>
                <SummaryText>
                  최근 5 , 마자틀란 우먼 승리 <span className="win">1</span>,
                  무승부 <span className="draw">0</span> , 패배{" "}
                  <span className="lose">4</span>, 승리 : 20.00%
                </SummaryText>

                <ContentTitleContainer>
                  <span className="title">
                    최근 경기 내역 <span>Uttarakhand FC</span>
                  </span>
                  <div>
                    <span>최근</span>
                    <Select
                      select={selectThree}
                      setSelect={setSelectThree}
                    ></Select>
                    <CheckBoxContainer>
                      {check.away ? (
                        <CheckBoxOn
                          onClick={() => setCheck({ ...check, away: false })}
                        />
                      ) : (
                        <CheckBoxOff
                          onClick={() => setCheck({ ...check, away: true })}
                        />
                      )}
                      <CheckText>원정경기만</CheckText>
                    </CheckBoxContainer>
                  </div>
                </ContentTitleContainer>
                <Table>
                  <thead>
                    <tr>
                      <th className="one">리그명</th>
                      <th className="two">날짜</th>
                      <th className="three">홈팀</th>
                      <th className="four">점수</th>
                      <th className="five">원정팀</th>
                      <th className="six">결과</th>
                    </tr>
                  </thead>
                  <Tbody type="lose">
                    <tr>
                      <League>IND DSD</League>
                      <td>2022/07/22</td>
                      <td className="active">델리 FC</td>
                      <td className="score">0-3</td>
                      <td>마자틀란 우먼</td>
                      <td className="result">
                        <ResultCircle>L</ResultCircle>
                      </td>
                    </tr>
                  </Tbody>
                  <Tbody type="win">
                    <tr>
                      <League>IND DSD</League>
                      <td>2022/07/22</td>
                      <td>델리 FC</td>
                      <td className="score">0-3</td>
                      <td>마자틀란 우먼</td>
                      <td className="result">
                        <ResultCircle>L</ResultCircle>
                      </td>
                    </tr>
                  </Tbody>
                  <Tbody type="draw">
                    <tr>
                      <League>IND DSD</League>
                      <td>2022/07/22</td>
                      <td>델리 FC</td>
                      <td className="score">0-3</td>
                      <td>클럽 네카사 우먼</td>
                      <td className="result">
                        <ResultCircle>L</ResultCircle>
                      </td>
                    </tr>
                  </Tbody>
                  <Tbody type="lose">
                    <tr>
                      <League>IND DSD</League>
                      <td>2022/07/22</td>
                      <td>Uttarakhand FC</td>
                      <td className="score">0-3</td>
                      <td className="active">마자틀란 우먼</td>
                      <td className="result">
                        <ResultCircle>L</ResultCircle>
                      </td>
                    </tr>
                  </Tbody>
                  <Tbody type="lose">
                    <tr>
                      <League>IND DSD</League>
                      <td>2022/07/22</td>
                      <td>델리 FC</td>
                      <td className="score">0-3</td>
                      <td>마자틀란 우먼</td>
                      <td className="result">
                        <ResultCircle>L</ResultCircle>
                      </td>
                    </tr>
                  </Tbody>
                </Table>
                <SummaryText>
                  최근 5 , 마자틀란 우먼 승리 <span className="win">1</span>,
                  무승부 <span className="draw">0</span> , 패배{" "}
                  <span className="lose">4</span>, 승리 : 20.00%
                </SummaryText>
              </Content>
            </ContentsContainer>
            <Footer setMobileMenu={setMobileMenu} mobileMeunu={mobileMenu} />
          </>
        )}{" "}
      </Wrapper>
      <LiveTennisMobile
        setMobileMenu={setMobileMenu}
        mobileMeunu={mobileMenu}
      />
    </>
  );
};

export default LiveTennis;
