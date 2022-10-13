import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Footer from "../components/common/Footer";
import GuaranteeCompanySlider from "../components/slider/GuaranteeCompanySlider";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ScoreCount } from "../components/apis/api";
// import io from 'socket.io-client'
// const socket = io()

const Wrapper = styled.div`
  width: 100%;
  padding-top: 16px;
  display: flex;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentsContainer = styled.div`
  width: 100%;
  max-width: 1344px;
  margin-bottom: 26px;
  @media (max-width: 1100px) {
    width: 100%;
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

const MenuContainer = styled.div`
  height: 77px;
  padding: 0 42px;
  display: flex;
  margin-bottom: 40px;
  @media (max-width: 720px) {
    padding: 10px calc((40 / 720) * 100vw);
    overflow: hidden;
    overflow-x: auto;
    margin-bottom: 0;
    &::-webkit-scrollbar {
      display: none;
    }
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
  text-overflow: ellipsis;
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
`;

const BroadcastComponent = styled.div`
  width: 100%;
  padding: 0 50px;
  margin-bottom: 10px;
  @media (max-width: 720px) {
    /* display: none; */
    padding: 0 calc((40 / 720) * 100vw);
  }
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 21px;

  .title {
    display: flex;
    align-items: center;

    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #fff;
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 25px;
      background-color: #cb3333;
      margin-right: 9px;
    }
  }

  .tab {
    width: 220px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  @media (max-width: 720px) {
    margin-bottom: -5px;
    .title {
      font-size: calc((28 / 720) * 100vw);
      .dot {
        width: calc((10 / 720) * 100vw);
        height: calc((10 / 720) * 100vw);
        border-radius: 25px;
        background-color: #cb3333;
        margin-right: calc((16 / 720) * 100vw);
      }
    }
    .tab {
      width: calc((300 / 720) * 100vw);
    }
  }
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  .dot {
    width: 5px;
    height: 5px;
    border-radius: 25px;
    background-color: ${(props) => (props.active ? "#07ac40" : "#888888")};
    margin-right: 7px;
  }
  span {
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 3.67;
    letter-spacing: -0.38px;
    text-align: right;
    color: ${(props) => (props.active ? "#fff" : "#999999")};
  }

  @media (max-width: 720px) {
    .dot {
      width: calc((6 / 720) * 100vw);
      height: calc((6 / 720) * 100vw);
    }

    span {
      font-size: calc((22 / 720) * 100vw);
    }
  }
`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 0 50px;
  flex-direction: column;
  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-wrap: wrap;
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;
      :hover {
        transform: translate(0px, -5px);
        transition: all 0.1s ease-in-out;
      }
      :active {
        transform: scale(0.95);
      }
    }
  }
  @media (max-width: 720px) {
    padding: 0 calc((40 / 720) * 100vw);
  }
`;

const ImageContainer = styled.div`
  width: 298px;
  height: 168px;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 8px;
  padding-top: 8px;
  cursor: pointer;
  @media (max-width: 720px) {
    width: calc((310 / 720) * 100vw);
    height: calc((175 / 1280) * 100vh);
  }
`;

const ImageInfoContainer = styled.div`
  height: 22px;
  display: flex;
  @media (max-width: 1100px) {
    height: 30px;
    justify-content: space-between;
  }
  @media (max-width: 720px) {
    height: calc((30 / 1280) * 100vh);
  }
`;

const League = styled.div`
  width: 132px;
  height: 22px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 6px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  img {
    width: 21px;
    height: 13px;
    margin-left: 4px;
  }
  @media (max-width: 1100px) {
    transform: scale(1.1);
  }
  @media (max-width: 720px) {
    transform: none;
    margin-left: calc((8 / 720) * 100vw);
    width: max-content;
    height: 100%;
    img {
      width: calc((22 / 720) * 100vw);
      height: calc((14 / 1280) * 100vh);
      margin-left: 4px;
    }
    div {
      margin-right: 3px;
    }
  }
`;

const Text = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-size: ${(props) => props.fontSize};
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.38px;
  text-align: left;
  color: #fff;
  margin-left: 6px;
  line-height: 14px;
  white-space: nowrap;

  @media (max-width: 1100px) {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  @media (max-width: 720px) {
    /* font-size: calc((22 / 720) * 100vw); */
    ${(props) =>
      props.type === "cup"
        ? css`
            font-size: calc((18 / 720) * 100vw);
            height: 100%;
            line-height: calc((28 / 1280) * 100vh);
          `
        : props.type === "team"
        ? css`
            font-size: calc((22 / 720) * 100vw);
          `
        : props.type === "time"
        ? css`
            font-size: calc((18 / 720) * 100vw);
            height: 100%;
            line-height: calc((28 / 1280) * 100vh);
          `
        : ""}
  }
`;

const TimeContainer = styled.div`
  width: 65px;
  height: 22px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 6px;
  margin-left: 80px;
  display: flex;
  align-items: center;
  img {
    width: 7px;
    height: 7px;
    margin-left: 7px;
  }

  @media (max-width: 720px) {
    width: max-content;
    height: 100%;
    margin: 0;
    margin-right: calc((8 / 720) * 100vw);
    padding-right: calc((9 / 720) * 100vw);
    padding-right: calc((9 / 720) * 100vw);
    img {
      width: calc((12 / 720) * 100vw);
      height: calc((12 / 1280) * 100vh);
      margin: 0;
    }
  }
`;

const GameInfoContainer = styled.div`
  width: 298px;
  height: 67px;
  border-radius: 12px;
  background-color: #2c2d2d;
  margin-top: 6px;
  padding: 14px 13px;
  display: flex;

  @media (max-width: 1100px) {
    justify-content: space-around;
    align-items: center;
  }
  @media (max-width: 720px) {
    height: calc((94 / 1280) * 100vh);
    padding: 0 10px;
    display: none;
  }
`;

const LogoContainer = styled.div`
  width: ${(props) => props.width};
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: ${(props) => props.marginLeft};
  .logo {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 1100px) {
    margin-left: 5px;
    ${(props) =>
      props.type === "text" &&
      css`
        width: 80px;
        * {
          margin: 0;
        }
      `}
    ${(props) =>
      props.type === "info" &&
      css`
        margin-left: 10px;
      `}
    transform: scale(1.1);
  }
  @media (max-width: 720px) {
    margin: 0;
    height: calc((53 / 1280) * 100vh);
    .logo {
      width: calc((22 / 720) * 100vw);
      height: calc((22 / 1280) * 100vh);
    }
    ${(props) =>
      props.type === "text" &&
      css`
        width: calc((102 / 720) * 100vw);
        & > div {
          height: 80px;
        }
        * {
          margin: 0;
        }
        div:last-child {
          line-height: calc((48 / 720) * 100vw);
        }
      `}
    ${(props) =>
      props.type === "info" &&
      css`
        width: calc((100 / 720) * 100vw);
        margin: 0px;
        * {
          margin: 0;
        }
      `}
      ${(props) =>
      props.type === "score" &&
      css`
        width: calc((24 / 720) * 100vw);
        margin: 0px;
        justify-content: space-between;
      `}
    transform: none;
  }
`;

const ScoreContainer = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 5px;
  background-color: #161717;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 19px;
  letter-spacing: -0.35px;
  text-align: center;
  color: ${(props) => (props.active ? "#f5c703" : "#fff")};
  margin-left: 13px;
  @media (max-width: 1100px) {
    transform: scale(1.1);
  }
  @media (max-width: 720px) {
    transform: none;
    width: calc((24 / 720) * 100vw);
    height: calc((24 / 1280) * 100vh);
    margin: 0;
    font-size: calc((20 / 720) * 100vw);
    line-height: calc((24 / 1280) * 100vh);
  }
`;

const Time = styled.span`
  width: 75px;
  height: 11px;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: right;
  color: rgba(255, 255, 255, 0.8);

  @media (max-width: 720px) {
    font-size: calc((18 / 720) * 100vw);
    width: calc((93 / 720) * 100vw);
    height: calc((14 / 1280) * 100vh);
    text-align: left;
    white-space: nowrap;
    margin-left: 4px;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 12px;
  display: flex;
  img {
    margin-left: 7px;
    margin-bottom: 3px;
    width: 17px;
    height: 14px;
  }
  @media (max-width: 1100px) {
    transform: scale(1.1);
    /* justify-content: space-between; */
    img {
      margin: 0 4px;
    }
  }
  @media (max-width: 720px) {
    transform: none;
    justify-content: space-between;
    img {
      margin: 0 2px;
      width: calc((26 / 720) * 100vw);
      height: calc((21 / 1280) * 100vh);
    }
  }
`;

const Home = styled.img`
  width: 9px;
  height: 9px;
  margin-left: 7px;
  margin-top: 3px;
  @media (max-width: 1100px) {
    width: 12px;
    height: 12px;
    margin-left: 0;
    margin-right: 4px;
    margin-top: 2px;
  }
  @media (max-width: 720px) {
    width: calc((14 / 720) * 100vw);
    height: calc((14 / 1280) * 100vh);
  }
`;

const MobileGameInfoContainer = styled.div`
  width: 100%;
  height: 67px;
  border-radius: 12px;
  background-color: #2c2d2d;
  margin-top: 6px;
  padding: 14px 13px;
  display: none;
  @media (max-width: 1100px) {
    justify-content: space-around;
    align-items: center;
  }
  @media (max-width: 720px) {
    height: calc((94 / 1280) * 100vh);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    > :nth-child(1) {
      margin-bottom: calc((10 / 1280) * 100vh);
    }
  }
`;

const MobileGameInfoContents = styled.div`
  width: 100%;
  height: calc((25 / 1280) * 100vh);
  display: flex;
  justify-content: space-between;
`;

const MobileGameInfoContentsLeft = styled.div`
  display: flex;
  align-items: center;
  img {
    width: calc((22 / 720) * 100vw);
    margin-right: calc((9 / 720) * 100vw);
  }
  .home {
    width: calc((14 / 720) * 100vw);
  }
  div {
    /* display: flex;
    align-items: center;
    justify-content: center; */
    height: 100%;
    line-height: calc((22 / 1280) * 100vh);
    font-family: "Noto Sans KR", sans-serif;
    font-size: calc((22 / 720) * 100vw);
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.55px;
    color: #fff;
    margin-right: calc((9 / 720) * 100vw);
  }
`;

const MobileScore = styled.div`
  width: calc((24 / 720) * 100vw);
  height: calc((24 / 720) * 100vw);
  border-radius: calc((5 / 720) * 100vw);
  background-color: #161717;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Roboto", sans-serif;
  font-size: calc((20 / 720) * 100vw);
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.5px;
  color: ${(props) => (props.active ? "#f5c703" : "#fff")};
`;

const SportsBroadcast = ({ setMobileMenu, mobileMenu }) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      setSportsType(state);
    }
  }, [state]);

  const [sportsType, setSportsType] = useState("soccer");
  const [activeTab, setActiveTab] = useState(1);
  const tmpList = [
    {
      image: "/images/main/Live1.png",
      home: 0,
      winner: "bottom",
      scoreTop: 1,
      scoreBottom: 2,
      iconImage: "/images/main/Ground.png",
    },
    {
      image: "/images/sportsBroadcast/list-img-1.png",
      home: 0,
      winner: "",
      scoreTop: 3,
      scoreBottom: 3,
      iconImage: "/images/main/Ground-orange.png",
    },
    {
      image: "/images/main/Live1.png",
      home: 0,
      winner: "bottom",
      scoreTop: 1,
      scoreBottom: 2,
      iconImage: "/images/live/volleyballGround.png",
    },
    {
      image: "/images/sportsBroadcast/list-img-2.png",
      home: 0,
      winner: "bottom",
      scoreTop: 1,
      scoreBottom: 2,
      iconImage: "/images/live/volleyballGround.png",
    },
    {
      image: "/images/sportsBroadcast/list-img-2.png",
      home: 0,
      winner: "top",
      scoreTop: 3,
      scoreBottom: 2,
      iconImage: "/images/live/BaseballGround.png",
    },
    {
      image: "/images/main/Live1.png",
      home: 0,
      winner: "bottom",
      scoreTop: 1,
      scoreBottom: 2,
      iconImage: "/images/main/Ground.png",
    },
    {
      image: "/images/sportsBroadcast/list-img-1.png",
      home: 0,
      winner: "bottom",
      scoreTop: 1,
      scoreBottom: 2,
      iconImage: "/images/main/Ground.png",
    },
    {
      image: "/images/main/Live1.png",
      home: 0,
      winner: "top",
      scoreTop: 3,
      scoreBottom: 2,
      iconImage: "/images/live/TennisGround.png",
    },
  ];


  const NoLive = styled.div`
  width: 1250px;
  height: 401px;
  background-color: #2c2d2d;
  display:flex ;
  justify-content:center !important;
  align-items:center !important;
  span{
  width: 262px;
  height: 18px;
  font-family: NotoSansCJKkr;
  font-size: 17px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  }
  img{
  width: 95px;
  height: 80px;
  margin: 0 83px 31px 84px;
  }
`;

  // score 숫자
  const [scoreCount, setScoreCount] = useState()
  useEffect(()=>{
    ScoreCount(  `/api/main/count/live/5` , setScoreCount)
  },[])

  // 아이콘 클릭시 해당하는 live로 이동하는 값
  const [liveToggle, setLiveToggle] = useState("")

  useEffect(()=>{
    if(sportsType === "soccer"){
      setLiveToggle("/soccer")
    }else if(sportsType === "basketball"){
      setLiveToggle("/basketball")
    }else if(sportsType === "baseball"){
      setLiveToggle("/baseball")
    }else if(sportsType === "volleyball"){
      setLiveToggle("/volleyball")
    }else if(sportsType === "tennis"){
      setLiveToggle("/tennis")
    }
  },[sportsType])
  // // 소켓
  // const [sportsSocket, setSportsSocket] = useState("")


  // const locations = useLocation();
  // let clientPrivates = io('http://localhost:3001/football_scores')

  // useEffect(()=>{
  //   if((locations.pathname === "/broadcast") === true){ 
  //     clientPrivates.on("football_scores" , (data)=>{
  //       setSportsSocket(data)
  //     })
  //   }
  // },[locations.pathname , socket ])
    // pageBasicData
  // pageBasicData
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
          <GuaranteeCompanySlider className="slider" />
        </AssuranceContainer>
        <MenuContainer>
          <MenuContents onClick={() => setSportsType("soccer")}>
            <MenuRectangle
              background={sportsType === "soccer" ? "#19793a" : "#3c3e3d"}
            >
              <img src="/images/live/Soccer.png" alt="" />
              <MenuCount background={sportsType === "soccer" && "active"}>
                {scoreCount?.football}
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
                {scoreCount?.basketball}
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
                {scoreCount?.baseball}
              </MenuCount>
            </MenuRectangle>
            <MenuText>야구</MenuText>
          </MenuContents>
          <MenuContents onClick={() => setSportsType("volleyball")}>
            <MenuRectangle
              background={sportsType === "volleyball" ? "#19793a" : "#3c3e3d"}
            >
              <img src="/images/live/Volleyball.png" alt="" />
              
              <MenuCount background={sportsType === "volleyball" && "active"}>
                {scoreCount?.volleyball}
              </MenuCount>
            </MenuRectangle>

            <MenuText>배구</MenuText>
          </MenuContents>
          <MenuContents onClick={() => setSportsType("tennis")}>
            <MenuRectangle
              background={sportsType === "tennis" ? "#19793a" : "#3c3e3d"}
            >
              <img src="/images/live/Tennis.png" alt="" />
              
              <MenuCount background={sportsType === "tennis" && "active"}>
                {scoreCount?.tennis}
              </MenuCount>
            </MenuRectangle>

            <MenuText>테니스</MenuText>
          </MenuContents>
          <MenuContents>
            <MenuRectangle background="rgba(255, 255, 255, 0.1)">
              <img src="/images/live/UFC.png" alt="" />
            </MenuRectangle>

            <MenuText color="rgba(255, 255, 255, 0.4)">UFC</MenuText>
          </MenuContents>
          <MenuContents>
            <MenuRectangle background="rgba(255, 255, 255, 0.1)">
              <img src="/images/live/Football.png" alt="" />
            </MenuRectangle>
            <MenuText color="rgba(255, 255, 255, 0.4)">미식축구</MenuText>
          </MenuContents>
          <MenuContents>
            <MenuRectangle background="rgba(255, 255, 255, 0.1)">
              <img src="/images/live/Hockey.png" alt="" />
            </MenuRectangle>
            <MenuText color="rgba(255, 255, 255, 0.4)">하키</MenuText>
          </MenuContents>
          <MenuContents>
            <MenuRectangle background="rgba(255, 255, 255, 0.1)">
              <img src="/images/live/LOL.png" alt="" />
            </MenuRectangle>
            <MenuText color="rgba(255, 255, 255, 0.4)">
              리그 오브 레전드
            </MenuText>
          </MenuContents>
        </MenuContainer>
        <BroadcastComponent>
          <TabContainer>
            <div className="title">
              <div className="dot"></div>
              <span>Live</span>
            </div>
            <div className="tab">
              <Tab
                active={activeTab === 1}
                onClick={() => {
                  setActiveTab(1);
                }}
              >
                <div className="dot"></div>
                <span>시청률순</span>
              </Tab>
              <Tab
                active={activeTab === 2}
                onClick={() => {
                  setActiveTab(2);
                }}
              >
                <div className="dot"></div>
                <span>시간순</span>
              </Tab>
              <Tab
                active={activeTab === 3}
                onClick={() => {
                  setActiveTab(3);
                }}
              >
                <div className="dot"></div>
                <span>리그별순</span>
              </Tab>
            </div>
          </TabContainer>
        </BroadcastComponent>
        <ListContainer>
          <NoLive>
          <div>
            <img src="/images/live/nolive.png"/>
            <span class="\-">
              현재 라이브중인 중계가 없습니다
            </span>          
          </div>
          </NoLive>
        </ListContainer>
      </ContentsContainer>
      <Footer setMobileMenu={setMobileMenu} mobileMeunu={mobileMenu} />
    </Wrapper>
  );
};

export default SportsBroadcast;
