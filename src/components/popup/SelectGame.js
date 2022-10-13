import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ScoreCount } from "../apis/api";

const Wrapper = styled.div`
  width: ${(props) => (props.sportsType === "baseball" ? "821px" : "696px")};
  height: 623px;
  border-radius: 8px;
  background-color: #202221;
  padding: 30px 0;
  overflow-y : scroll;
  overflow-x : hidden;
  ::-webkit-scrollbar-track {
      background-color : #202221;
      z-index : -1;
  }
`;

const TitleContainer = styled.div`
  height: 21px;
  margin: 0 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  img {
    width: 13px;
    height: 12px;
    cursor: pointer;
  }
  @media (max-width: 720px) {
    height: calc((28 / 1280) * 100vh);
    img {
      width: calc((28 / 720) * 100vw);
      height: calc((28 / 1280) * 100vh);
    }
  }
`;

const Title = styled.span`
  height: 17px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.45px;
  text-align: left;
  color: #fff;

  @media (max-width: 720px) {
    font-size: calc((30 / 720) * 100vw);
    display: flex;
    align-items: center;
  }
`;

const Contents = styled.div`
  hr {
    width: 689px;
    height: 1px;
    margin: 25px 0;
    opacity: 0.1;
    border: solid 1px #fff;
    background-color: #fff;
  }
`;

const MenuContainer = styled.div`
  height: 77px;
  padding: 0 20px;
  display: flex;
  @media (max-width: 720px) {
    padding: 0 calc((40 / 720) * 100vw);
    overflow: hidden;
    overflow-x: auto;
    height: calc((69 / 1280) * 100vh);
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
  @media (max-width: 720px) {
    display: none;
  }
`;

const ContentTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  margin-bottom: 13px;

  > span {
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.4px;
    color: #fff;
  }

  > div {
    width: 89px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const SelectText = styled.span`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.28px;
  text-align: right;
  cursor: pointer;
  color: ${(props) => (props.active ? "#fff" : "rgba(255,255,255,0.4)")};
`;

const ListContainer = styled.div`
  padding: 0 30px;
`;

const ListTitle = styled.div`
  width: ${(props) => (props.sportsType === "baseball" ? "755px" : "630px")};
  height: 50px;
  background-color: #303231;
  padding: 0 15px;
  display: flex;
  align-items: center;
  margin-bottom: 1px;
  cursor: pointer;

  img {
    width: 20px;
    margin-right: 10px;
  }
  span {
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.3px;
    color: #ccc;
    margin-right: 3px;
  }
  .arrow {
    width: 10px;
    height: 5px;
    cursor: pointer;
    margin-left: auto;
  }

  > div {
    margin-left: ${(props) =>
      props.sportsType === "baseball" ? "28px" : "30px"};
    font-family: "Roboto", sans-serif;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    color: #ccc;
    display: flex;

    > div {
      display: flex;
      justify-content: center;
      width: ${(props) => (props.sportsType === "baseball" ? "36px" : "34px")};
    }
  }
`;

const List = styled.div`
  height: ${(props) => (props.type === "basketball" ? "78px" : "50px")};
  padding: 0 15px;
  background-color: #3b3c3b;
  margin-bottom: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .home {
    height: 10px;
    margin-left: 6px;
  }

  .container {
    width: 440px;
    height: 100%;
    > div {
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > .time {
        width: 115px;
        text-align: start;
      }
      > img {
        height: 16px;
      }
      > p {
        width: 57px;
        font-family: "Roboto", sans-serif;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        color: #f66f03;
        text-align: center;
      }
    }
  }

  .time {
    font-family: "Roboto", sans-serif;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
  }
  .team {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.28px;
    text-align: center;
    color: #fff;
  }
  > img {
    height: 16px;
  }

  .button_cotainer {
    width: 120px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    > div {
      width: 83px;
      height: 28px;
      border-radius: 6px;
      background-color: #525252;
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      font-size: 13px;
      font-weight: 300;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.26px;
      text-align: center;
      color: #fff;
    }
    img {
      height: 12px;
    }
  }
`;

const TimeRectangle = styled.div`
  width: ${(props) => props.width || "57px"};
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 6px;
  background-color: #19793a;
  font-size: 13px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.26px;
  text-align: center;
  color: ${(props) => (props.active ? "#ffcc00" : "#fff")};

  > p {
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.32px;
    text-align: center;
    color: #fff;

    > span {
      color: #ffcc00;
    }
  }
`;

const ButtonContainer = styled.div`
  width: 178px;
  display: flex;

  > div:first-child {
    margin-right: 12px;
  }
  > div {
    width: 83px;
    height: 28px;
    border-radius: 6px;
    background-color: #525252;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    font-size: 13px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.26px;
    text-align: center;
    color: #fff;
  }
  img {
    height: 12px;
  }
`;

const ScoreContainer = styled.div`
  height: 100%;
  display: flex;
  border-bottom: ${(props) =>
    props.type === "top" && "solid 1px rgba(255,255,255,0.1)"};
`;

const Score = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 100%;
  border-right: solid 1px rgba(255, 255, 255, 0.1);

  font-family: "Roboto", sans-serif;
  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  color: #fff;
  background-color: ${(props) => props.active && "rgba(12,114,185, .4)"};
`;

const TimeContents = styled.div`
  /* flex: 250px 0 0; */
  max-width: 280px;
  width: 250px;
  min-width: 130px;
  display: flex;
  align-items: center;
`;

const TeamContents = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  /* justify-content: center; */
`;

const LeagueInfoCotainer = styled.div`
  width: 100%;
  height: ${(props) => props.height};
  margin-top: 1px;
  background-color: #3b3c3b;
  display: flex;
  :hover {
    background-color: #424342;
  }
  cursor: pointer;
  ${TeamContents} {
    justify-content: ${(props) => props.type === "soccer" && "center"};
  }
  .button_cotainer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    > div {
      width: 83px;
      height: 28px;
      border-radius: 6px;
      background-color: #525252;
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      font-size: 13px;
      font-weight: 300;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.26px;
      text-align: center;
      color: #fff;
    }
    img {
      height: 12px;
    }
  }
`;

const TeamName = styled.div`
  height: 100%;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.3px;
  color: #fff;
  display: flex;
  line-height: 48px;
  margin: 0 3.5px;
  white-space: nowrap;
`;

const BasketballScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-evenly;
  width: 60px;
`;

const BasketballScoreRectangle = styled.div`
  background-color: ${(props) => props.background};
  width: 34px;
  height: 30px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Roboto", sans-serif;
  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
`;

const BasketballScore = styled.div`
  height: 81px;
  div {
    height: 40px;
    display: flex;
    align-items: center;
  }
  & > div:first-child {
    border-bottom: solid 1px rgba(255, 255, 255, 0.1);
  }
`;

const BasketballScoreContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  border-right: solid 1px rgba(255, 255, 255, 0.1);

  font-family: "Roboto", sans-serif;
  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  color: #fff;
  background-color: ${(props) => props.active && "rgba(12,114,185,0.4)"};
`;

const BaseballScoreRectangle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  background-color: ${(props) => (props.background ? "#daae00" : "#19793a")};
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Roboto", sans-serif;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${(props) => (props.active ? "#ffcc00" : "#fff")};
`;

const AttackContainer = styled.div`
  height: 50px;
  display: flex;
  align-items: flex-end;

  img {
    width: 14px;
  }
`;

const BaseballTimeContents = styled.div`
  flex: 0 1 80px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  * {
    margin: 0;
  }
`;

const Time = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
  margin-left: 15px;
  margin-right: 9px;
`;

const BaseballRectangle = styled.div`
  width: 48px;
  height: 26px;
  border-radius: 6px;
  background-color: #19793a;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4px;

  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.35px;
  color: #fff;
`;

const BasketballTeamContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  img {
    width: 16px;
  }
  img:last-child {
    width: 10px;
    margin-left: 5px;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 30px;
    width: 143px;
  }
`;

const SelectGame = ({ setWithdrawal , setMultiModalToggle }) => {
  const [sportsType, setSportsType] = useState("soccer");

  // 시간순 , 리그순
  const [activeTab, setActiveTab] = useState(1);
  //  별표
  const [bookmark, setBookmark] = useState(false);

  // 나중에 데이터 받아왔을때 쓸것
  const [openSelect, setopenSelect] = useState(false);
  const [openList, setopenList] = useState(false);

  const [scoreCount, setScoreCount] = useState()
  useEffect(()=>{
    ScoreCount(  `/api/main/count/live/5` , setScoreCount)
  },[])

  return (
    <Wrapper sportsType={sportsType}>
      <TitleContainer>
        <Title>경기선택</Title>
        <img
          src="/images/common/Close.png"
          alt=""
          onClick={() => {
            // setWithdrawal(false);
            setMultiModalToggle(false);
          }}
        ></img>
      </TitleContainer>

      <Contents>
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
        <hr />
        <ContentTitle
          activeTab={activeTab}
          // onClick={() => setopenList(!openList)}
        >
          <span>라이브(4)</span>
          <div>
            <SelectText
              active={activeTab === 1}
              onClick={() => {
                setActiveTab(1);
              }}
            >
              시간순
            </SelectText>
            <SelectText
              active={activeTab === 2}
              onClick={() => {
                setActiveTab(2);
              }}
            >
              리그순
            </SelectText>
          </div>
        </ContentTitle>
        {sportsType === "soccer" && (
          <ListContainer>
            <ListTitle
              onClick={() => {
                setopenSelect(!openSelect);
                setopenList(!openList);
              }}
            >
              <img src="/images/live/United-kingdom.png" alt=""></img>
              <span>아르헨티나 : 리세르바르리가</span>
              {bookmark ? (
                <img
                  className="star"
                  src="/images/live/Star-on.png"
                  alt=""
                  onClick={() => setBookmark(false)}
                ></img>
              ) : (
                <img
                  className="star"
                  src="/images/live/Star-off.png"
                  alt=""
                  onClick={() => setBookmark(true)}
                ></img>
              )}
              <img
                className="arrow"
                src="/images/chat/ArrowDown.png"
                alt=""
                style={{
                  transform: `${
                    !openSelect ? "rotate(180deg)" : "rotate(0deg)"
                  }`,
                }}
              ></img>
            </ListTitle>
            {activeTab === 1 && (
              <>
                <List>
                  <span className="time">00:30</span>
                  <TimeRectangle>후반 82’</TimeRectangle>
                  <span className="time">메이크도니자 GP</span>
                  <img src="/images/live/Team2.png" alt=""></img>
                  <TimeRectangle>
                    <p>
                      0 : <span>3</span>
                    </p>
                  </TimeRectangle>
                  <img src="/images/live/Team1.png" alt=""></img>
                  <span className="time">CSKA 소피아</span>
                  <ButtonContainer>
                    <div>
                      <img src="/images/main/Ground.png" alt=""></img>
                      <span>영상추가</span>
                    </div>
                    <div>
                      <img src="/images/main/Youtube.png" alt=""></img>
                      <span>영상보기</span>
                    </div>
                  </ButtonContainer>
                </List>
                <List>
                  <span className="time">00:30</span>
                  <TimeRectangle>후반 82’</TimeRectangle>
                  <span className="time">메이크도니자 GP</span>
                  <img src="/images/live/Team2.png" alt=""></img>
                  <TimeRectangle>
                    <p>
                      0 : <span>3</span>
                    </p>
                  </TimeRectangle>
                  <img src="/images/live/Team1.png" alt=""></img>
                  <span className="time">CSKA 소피아</span>
                  <ButtonContainer>
                    <div>
                      <img src="/images/main/Ground.png" alt=""></img>
                      <span>영상추가</span>
                    </div>
                  </ButtonContainer>
                </List>
                <List>
                  <span className="time">00:30</span>
                  <TimeRectangle>후반 82’</TimeRectangle>
                  <span className="time">메이크도니자 GP</span>
                  <img src="/images/live/Team2.png" alt=""></img>
                  <TimeRectangle>
                    <p>
                      0 : <span>3</span>
                    </p>
                  </TimeRectangle>
                  <img src="/images/live/Team1.png" alt=""></img>
                  <span className="time">CSKA 소피아</span>
                  <ButtonContainer>
                    <div>
                      <img src="/images/main/Ground.png" alt=""></img>
                      <span>영상추가</span>
                    </div>
                  </ButtonContainer>
                </List>
                <List>
                  <span className="time">00:30</span>
                  <TimeRectangle>후반 82’</TimeRectangle>
                  <span className="time">메이크도니자 GP</span>
                  <img src="/images/live/Team2.png" alt=""></img>
                  <TimeRectangle>
                    <p>
                      0 : <span>3</span>
                    </p>
                  </TimeRectangle>
                  <img src="/images/live/Team1.png" alt=""></img>
                  <span className="time">CSKA 소피아</span>
                  <ButtonContainer>
                    <div>
                      <img src="/images/main/Ground.png" alt=""></img>
                      <span>영상추가</span>
                    </div>
                  </ButtonContainer>
                </List>
                <List>
                  <span className="time">00:30</span>
                  <TimeRectangle>후반 82’</TimeRectangle>
                  <span className="time">메이크도니자 GP</span>
                  <img src="/images/live/Team2.png" alt=""></img>
                  <TimeRectangle>
                    <p>
                      0 : <span>3</span>
                    </p>
                  </TimeRectangle>
                  <img src="/images/live/Team1.png" alt=""></img>
                  <span className="time">CSKA 소피아</span>
                  <ButtonContainer>
                    <div>
                      <img src="/images/main/Ground.png" alt=""></img>
                      <span>영상추가</span>
                    </div>
                  </ButtonContainer>
                </List>
                <List>
                  <span className="time">00:30</span>
                  <TimeRectangle>후반 82’</TimeRectangle>
                  <span className="time">메이크도니자 GP</span>
                  <img src="/images/live/Team2.png" alt=""></img>
                  <TimeRectangle>
                    <p>
                      0 : <span>3</span>
                    </p>
                  </TimeRectangle>
                  <img src="/images/live/Team1.png" alt=""></img>
                  <span className="time">CSKA 소피아</span>
                  <ButtonContainer>
                    <div>
                      <img src="/images/main/Ground.png" alt=""></img>
                      <span>영상추가</span>
                    </div>
                  </ButtonContainer>
                </List>
                <List>
                  <span className="time">00:30</span>
                  <TimeRectangle>후반 82’</TimeRectangle>
                  <span className="time">메이크도니자 GP</span>
                  <img src="/images/live/Team2.png" alt=""></img>
                  <TimeRectangle>
                    <p>
                      0 : <span>3</span>
                    </p>
                  </TimeRectangle>
                  <img src="/images/live/Team1.png" alt=""></img>
                  <span className="time">CSKA 소피아</span>
                  <ButtonContainer>
                    <div>
                      <img src="/images/main/Ground.png" alt=""></img>
                      <span>영상추가</span>
                    </div>
                  </ButtonContainer>
                </List>
              </>
            )}
          </ListContainer>
        )}
        {sportsType === "basketball" && (
          <ListContainer>
            <ListTitle
              onClick={() => {
                // setopenSelect(!openSelect);
                // setopenList(!openList);
              }}
            >
              <img src="/images/live/United-kingdom.png" alt=""></img>

              <span>아르헨티나 : 리세르바르리가</span>
              {bookmark ? (
                <img
                  className="star"
                  src="/images/live/Star-on.png"
                  alt=""
                  onClick={() => setBookmark(false)}
                ></img>
              ) : (
                <img
                  className="star"
                  src="/images/live/Star-off.png"
                  alt=""
                  onClick={() => setBookmark(true)}
                ></img>
              )}
              <div style={{marginLeft : "53px"}}>
                <div>1Q</div>
                <div>2Q</div>
                <div>3Q</div>
                <div>4Q</div>
                <div>연장</div>
              </div>
              <img
                className="arrow"
                src="/images/chat/ArrowDown.png"
                alt=""
                style={{
                  transform: `${
                    !openSelect ? "rotate(180deg)" : "rotate(0deg)"
                  }`,
                }}
              ></img>
            </ListTitle>
            {activeTab === 1 && (
              <>
                <List type={sportsType}>
                  <span className="time">00:30</span>
                  <div className="container">
                    <div>
                      <TimeRectangle>4Q</TimeRectangle>
                      <img src="/images/live/Team2.png" alt=""></img>
                      <span className="time">메이크도니자 GP</span>
                      <TimeRectangle width="34px">102</TimeRectangle>
                      <ScoreContainer type="top">
                        <Score>1</Score>
                        <Score active={true}>2</Score>
                        <Score>0</Score>
                        <Score>0</Score>
                        <Score></Score>
                      </ScoreContainer>

                      <div></div>
                      <div></div>
                    </div>
                    <div>
                      <p>03:14</p>
                      <img src="/images/live/Team2.png" alt=""></img>
                      <span className="time">
                        메이크도니자 GP
                        <img
                          className="home"
                          src="/images/main/Home.png"
                          alt=""
                        ></img>
                      </span>
                      <TimeRectangle width="34px" active={true}>
                        118
                      </TimeRectangle>
                      <ScoreContainer type="top">
                        <Score>1</Score>
                        <Score active={true}>2</Score>
                        <Score>0</Score>
                        <Score>0</Score>
                        <Score></Score>
                      </ScoreContainer>

                      <div></div>
                      <div></div>
                    </div>
                  </div>
                  <div className="button_cotainer">
                    <div>
                      <img src="/images/main/Youtube.png" alt=""></img>
                      <span>영상보기</span>
                    </div>
                    <div>
                      <img src="/images/main/Ground.png" alt=""></img>
                      <span>영상추가</span>
                    </div>
                  </div>
                </List>
                {[1, 2, 3, 4, 5, 6].map(() => (
                  <List type={sportsType}>
                    <span className="time">00:30</span>
                    <div className="container">
                      <div>
                        <TimeRectangle>4Q</TimeRectangle>
                        <img src="/images/live/Team2.png" alt=""></img>
                        <span className="time">메이크도니자 GP</span>
                        <TimeRectangle width="34px">102</TimeRectangle>
                        <ScoreContainer type="top">
                          <Score>1</Score>
                          <Score active={true}>2</Score>
                          <Score>0</Score>
                          <Score>0</Score>
                          <Score></Score>
                        </ScoreContainer>

                        <div></div>
                        <div></div>
                      </div>
                      <div>
                        <p>03:14</p>
                        <img src="/images/live/Team2.png" alt=""></img>
                        <span className="time">
                          메이크도니자 GP
                          <img
                            className="home"
                            src="/images/main/Home.png"
                            alt=""
                          ></img>
                        </span>
                        <TimeRectangle width="34px" active={true}>
                          118
                        </TimeRectangle>
                        <ScoreContainer type="top">
                          <Score>1</Score>
                          <Score active={true}>2</Score>
                          <Score>0</Score>
                          <Score>0</Score>
                          <Score></Score>
                        </ScoreContainer>

                        <div></div>
                        <div></div>
                      </div>
                    </div>
                    <div className="button_cotainer">
                      <div>
                        <img src="/images/main/Ground.png" alt=""></img>
                        <span>영상추가</span>
                      </div>
                    </div>
                  </List>
                ))}
              </>
            )}
          </ListContainer>
        )}
        {sportsType === "baseball" && (
          <ListContainer>
            <ListTitle
              sportsType={sportsType}
              onClick={() => {
                // setopenSelect(!openSelect);
                // setopenList(!openList);
              }}
            >
              <img src="/images/live/United-kingdom.png" alt=""></img>

              <span>아르헨티나 : 리세르바르리가</span>
              {bookmark ? (
                <img
                  className="star"
                  src="/images/live/Star-on.png"
                  alt=""
                  onClick={() => setBookmark(false)}
                ></img>
              ) : (
                <img
                  className="star"
                  src="/images/live/Star-off.png"
                  alt=""
                  onClick={() => setBookmark(true)}
                ></img>
              )}
              <div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>연장</div>
              </div>
              <img
                className="arrow"
                src="/images/chat/ArrowDown.png"
                alt=""
                style={{
                  transform: `${
                    !openSelect ? "rotate(180deg)" : "rotate(0deg)"
                  }`,
                }}
              ></img>
            </ListTitle>
            {activeTab === 1 &&
              [1, 2, 3, 4, 5, 6].map(() => (
                <>
                  <LeagueInfoCotainer height="81px">
                    <BaseballTimeContents>
                      <Time>00:30</Time>
                      <BaseballRectangle>1회말</BaseballRectangle>
                    </BaseballTimeContents>
                    <TeamContents>
                      <BasketballTeamContainer>
                        <div>
                          <img src="/images/live/Team2.png" alt=""></img>
                          <TeamName>메이크도니자 GP</TeamName>
                        </div>
                        <div>
                          <img src="/images/live/Team2.png" alt=""></img>
                          <TeamName>메이크도니자 GP</TeamName>
                          <img src="/images/main/Home.png" alt=""></img>
                        </div>
                      </BasketballTeamContainer>
                      <BasketballScoreContainer>
                        <BaseballScoreRectangle>12</BaseballScoreRectangle>
                        <BaseballScoreRectangle active={true}>
                          27
                        </BaseballScoreRectangle>
                      </BasketballScoreContainer>
                      <AttackContainer>
                        <img src="/images/live/bat.png" alt=""></img>
                      </AttackContainer>
                      <BasketballScore>
                        <div>
                          <BasketballScoreContent>1</BasketballScoreContent>
                          <BasketballScoreContent>2</BasketballScoreContent>
                          <BasketballScoreContent>0</BasketballScoreContent>
                          <BasketballScoreContent>0</BasketballScoreContent>
                          <BasketballScoreContent>5</BasketballScoreContent>
                          <BasketballScoreContent active={true}>
                            1
                          </BasketballScoreContent>
                          <BasketballScoreContent>0</BasketballScoreContent>
                          <BasketballScoreContent>0</BasketballScoreContent>
                          <BasketballScoreContent>0</BasketballScoreContent>
                          <BasketballScoreContent>1</BasketballScoreContent>
                        </div>
                        <div>
                          <BasketballScoreContent>4</BasketballScoreContent>
                          <BasketballScoreContent>2</BasketballScoreContent>
                          <BasketballScoreContent>0</BasketballScoreContent>
                          <BasketballScoreContent>0</BasketballScoreContent>
                          <BasketballScoreContent>5</BasketballScoreContent>
                          <BasketballScoreContent active={true}>
                            1
                          </BasketballScoreContent>
                          <BasketballScoreContent>0</BasketballScoreContent>
                          <BasketballScoreContent>0</BasketballScoreContent>
                          <BasketballScoreContent>0</BasketballScoreContent>
                          <BasketballScoreContent>1</BasketballScoreContent>
                        </div>
                        <div></div>
                      </BasketballScore>
                    </TeamContents>
                    <div className="button_cotainer">
                      <div>
                        <img src="/images/main/Youtube.png" alt=""></img>
                        <span>영상보기</span>
                      </div>
                      <div>
                        <img src="/images/main/Ground.png" alt=""></img>
                        <span>영상추가</span>
                      </div>
                    </div>
                  </LeagueInfoCotainer>
                </>
              ))}
          </ListContainer>
        )}
        {sportsType === "volleyball" && (
          <ListContainer>
            <ListTitle
              onClick={() => {
                // setopenSelect(!openSelect);
                // setopenList(!openList);
              }}
            >
              <img src="/images/live/United-kingdom.png" alt=""></img>

              <span>아르헨티나 : 리세르바르리가</span>
              {bookmark ? (
                <img
                  className="star"
                  src="/images/live/Star-on.png"
                  alt=""
                  onClick={() => setBookmark(false)}
                ></img>
              ) : (
                <img
                  className="star"
                  src="/images/live/Star-off.png"
                  alt=""
                  onClick={() => setBookmark(true)}
                ></img>
              )}
              <div>
                <div>S1</div>
                <div>S2</div>
                <div>S3</div>
                <div>S4</div>
                <div>연장</div>
              </div>
              <img
                className="arrow"
                src="/images/chat/ArrowDown.png"
                alt=""
                style={{
                  transform: `${
                    !openSelect ? "rotate(180deg)" : "rotate(0deg)"
                  }`,
                }}
              ></img>
            </ListTitle>
            {activeTab === 1 && (
              <>
                {[1, 2, 3, 4, 5, 6].map(() => (
                  <LeagueInfoCotainer height="81px">
                    <BaseballTimeContents>
                      <Time>00:30</Time>
                      <BaseballRectangle>Set 3</BaseballRectangle>
                    </BaseballTimeContents>
                    <TeamContents>
                      <BasketballTeamContainer>
                        <div>
                          <img src="/images/live/Team2.png" alt=""></img>
                          <TeamName>메이크도니자 GP</TeamName>
                        </div>
                        <div>
                          <img src="/images/live/Team2.png" alt=""></img>
                          <TeamName>메이크도니자 GP</TeamName>
                          <img src="/images/main/Home.png" alt=""></img>
                        </div>
                      </BasketballTeamContainer>
                      <BasketballScoreContainer>
                        <BaseballScoreRectangle>1</BaseballScoreRectangle>
                        <BaseballScoreRectangle active={true}>
                          4
                        </BaseballScoreRectangle>
                      </BasketballScoreContainer>
                      <AttackContainer>
                        <img
                          src="/images/live/volleyball-blue.png"
                          alt=""
                        ></img>
                      </AttackContainer>
                      <BasketballScore>
                        <div>
                          <BasketballScoreContent>2</BasketballScoreContent>
                          <BasketballScoreContent active={true}>
                            0
                          </BasketballScoreContent>
                          <BasketballScoreContent>1</BasketballScoreContent>
                          <BasketballScoreContent>0</BasketballScoreContent>
                          <BasketballScoreContent></BasketballScoreContent>
                        </div>
                        <div>
                          <BasketballScoreContent>2</BasketballScoreContent>
                          <BasketballScoreContent active={true}>
                            0
                          </BasketballScoreContent>
                          <BasketballScoreContent>1</BasketballScoreContent>
                          <BasketballScoreContent>0</BasketballScoreContent>
                          <BasketballScoreContent></BasketballScoreContent>
                        </div>
                        <div></div>
                      </BasketballScore>
                    </TeamContents>
                    <div className="button_cotainer">
                      <div>
                        <img src="/images/main/Youtube.png" alt=""></img>
                        <span>영상보기</span>
                      </div>
                      <div>
                        <img src="/images/main/Ground.png" alt=""></img>
                        <span>영상추가</span>
                      </div>
                    </div>
                  </LeagueInfoCotainer>
                ))}
              </>
            )}
          </ListContainer>
        )}
        {sportsType === "tennis" && (
          <ListContainer>
            <ListTitle
              // onClick={() => {
              //   setopenSelect(!openSelect);
              //   setopenList(!openList);
              // }}
            >
              <img src="/images/live/United-kingdom.png" alt=""></img>

              <span>아르헨티나 : 리세르바르리가</span>
              {bookmark ? (
                <img
                  className="star"
                  src="/images/live/Star-on.png"
                  alt=""
                  onClick={() => setBookmark(false)}
                ></img>
              ) : (
                <img
                  className="star"
                  src="/images/live/Star-off.png"
                  alt=""
                  onClick={() => setBookmark(true)}
                ></img>
              )}
              <div>
                <div>S1</div>
                <div>S2</div>
                <div>S3</div>
                <div>S4</div>
                <div>연장</div>
              </div>
              <img
                className="arrow"
                src="/images/chat/ArrowDown.png"
                alt=""
                style={{
                  transform: `${
                    !openSelect ? "rotate(180deg)" : "rotate(0deg)"
                  }`,
                }}
              ></img>
            </ListTitle>
            {!openList && (
              <>
                {[1, 2, 3, 4, 5, 6].map(() => (
                  <LeagueInfoCotainer height="81px">
                    <BaseballTimeContents>
                      <Time>00:30</Time>
                      <BaseballRectangle>Set 3</BaseballRectangle>
                    </BaseballTimeContents>
                    <TeamContents>
                      <BasketballTeamContainer>
                        <div>
                          <img src="/images/live/Team2.png" alt=""></img>
                          <TeamName>메이크도니자 GP</TeamName>
                        </div>
                        <div>
                          <img src="/images/live/Team2.png" alt=""></img>
                          <TeamName>메이크도니자 GP</TeamName>
                          <img src="/images/main/Home.png" alt=""></img>
                        </div>
                      </BasketballTeamContainer>
                      <BasketballScoreContainer>
                        <BaseballScoreRectangle>1</BaseballScoreRectangle>
                        <BaseballScoreRectangle active={true}>
                          4
                        </BaseballScoreRectangle>
                      </BasketballScoreContainer>
                      <AttackContainer>
                        <img src="/images/live/TennisBall.png" alt=""></img>
                      </AttackContainer>
                      <BasketballScore>
                        <div>
                          <BasketballScoreContent>2</BasketballScoreContent>
                          <BasketballScoreContent>0</BasketballScoreContent>
                          <BasketballScoreContent active={true}>
                            1
                          </BasketballScoreContent>
                          <BasketballScoreContent>0</BasketballScoreContent>
                          <BasketballScoreContent></BasketballScoreContent>
                        </div>
                        <div>
                          <BasketballScoreContent>2</BasketballScoreContent>
                          <BasketballScoreContent>0</BasketballScoreContent>
                          <BasketballScoreContent active={true}>
                            1
                          </BasketballScoreContent>
                          <BasketballScoreContent>0</BasketballScoreContent>
                          <BasketballScoreContent></BasketballScoreContent>
                        </div>
                      </BasketballScore>
                    </TeamContents>
                    <div className="button_cotainer">
                      <div>
                        <img src="/images/main/Youtube.png" alt=""></img>
                        <span>영상보기</span>
                      </div>
                      <div>
                        <img src="/images/main/Ground.png" alt=""></img>
                        <span>영상추가</span>
                      </div>
                    </div>
                  </LeagueInfoCotainer>
                ))}
              </>
            )}
          </ListContainer>
        )}
      </Contents>
    </Wrapper>
  );
};

export default SelectGame;
