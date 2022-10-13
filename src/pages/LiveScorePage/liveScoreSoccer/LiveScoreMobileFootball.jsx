import styled, { css } from "styled-components";
import React from "react";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "moment/locale/ko";
import { useNavigate } from "react-router-dom";
// import LiveScoreSoccerMobile from '../../pages/LiveScorePage/liveScoreSoccer/LiveScoreSoccerMobile';

const Wrapper = styled.div`
  width: 100%;
  @media (min-width: 721px) {
    display: none;
  }
`;

const TopBarContainer = styled.div`
  padding: 0 calc((40 / 720) * 100vw);
  display: flex;
  align-items: center;
  /* height: calc((100 / 1280) * 100vh); */
  flex-direction: column;
  justify-content: space-between;

  & > div:first-of-type {
    display: flex;
    align-items: center;
    height: calc((100 / 1280) * 100vh);
    justify-content: space-between;
    width: 100%;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc((380 / 720) * 100vw);
`;

const Tab = styled.div`
  width: calc((123 / 720) * 100vw);
  height: calc((60 / 1280) * 100vh);
  border-radius: 8px;
  background-color: ${(props) => (props.active ? "#3b3c3b" : "#303231")};
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Noto Sans KR", sans-serif;
  font-size: calc((22 / 720) * 100vw);
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.44px;
  color: ${(props) => props.color};
  position: relative;
`;

const IconContents = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: max-content;
  > * {
    margin-left: calc((5 / 720) * 100vw);
  }

  & > img {
    width: calc((60 / 1280) * 100vh);
    /* margin-left: calc((4 / 720) * 100vw); */
  }
`;

const IconRectangle = styled.div`
  width: calc((60 / 1280) * 100vh);
  height: calc((60 / 1280) * 100vh);
  object-fit: contain;
  border-radius: 6px;
  background-color: #383a39;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: calc((29 / 720) * 100vw);
  }
`;

const TabCount = styled.div`
  width: calc((34 / 720) * 100vw);
  height: calc((28 / 1280) * 100vh);
  position: absolute;
  top: calc((10 / 1280) * -100vh);
  right: 0;
  background-color: #585a58;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Roboto", sans-serif;
  font-size: calc((22 / 720) * 100vw);
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.44px;
  color: #07ac40;
`;

const SearchContainer = styled.div`
  width: calc((640 / 720) * 100vw);
  height: calc((62 / 1280) * 100vh);
  border-radius: 6px;
  box-shadow: 0px 10px 20px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #07ac40;
  background-color: #3b3c3b;
  position: absolute;
  bottom: calc((80 / 1280) * -100vh);
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  &::after {
    // Our small triangle to fill the space
    content: "";
    border-color: transparent transparent #3b3c3b;
    border-style: solid;
    border-width: calc((11 / 720) * 100vw);
    width: 0;
    height: 0;
    position: absolute;
    top: calc((18 / 1280) * -100vh);
    right: calc((80 / 720) * 100vw);
  }

  &::before {
    content: "";
    border-color: transparent transparent #07ac40;
    border-style: solid;
    border-width: calc((12 / 720) * 100vw);
    width: 0;
    height: 0;
    position: absolute;
    top: calc((21 / 1280) * -100vh);
    right: calc((79 / 720) * 100vw);
  }

  img {
    width: calc((28 / 720) * 100vw);
  }
`;

const SearchInput = styled.input`
  width: 90%;
  height: calc((62 / 1280) * 100vh);
  background-color: transparent;
  border: none;
  color: #fff;

  font-family: "Noto Sans KR", sans-serif;
  font-size: calc((22 / 720) * 100vw);
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.44px;

  &::placeholder {
    color: #999999;
  }
`;

const CalendarContainer = styled.div`
  position: absolute;
  z-index: 1;
  right: calc((60 / 720) * 100vw);
  top: calc((70 / 1280) * 100vh);
  .react-calendar {
    width: calc((515 / 720) * 100vw);
    border-radius: 12px;
    border: solid 1px #202221;
    background-color: #3b3c3b;
  }
  .react-calendar__month-view__days {
    height: calc((350 / 1280) * 100vh);
  }
  .react-calendar__tile--active {
    border-radius: 6px;
    background: #07ac40;
  }
  .react-calendar__tile {
    color: #fff;
    font-family: "Roboto", sans-serif;
    font-size: calc((22.5 / 720) * 100vw);
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #aaaaaa;
  }
  .react-calendar__month-view__weekdays {
    font-family: "Noto Sans KR", sans-serif;
    font-size: calc((22.5 / 720) * 100vw);
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.28px;
    color: #fff;
    padding-bottom: calc((34 / 1280) * 100vh);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .react-calendar__navigation {
    margin: calc((34 / 1280) * 100vh);
    align-items: center;
    * {
      font-family: "Roboto", sans-serif;
      font-size: calc((24 / 720) * 100vw);
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.32px;
      text-align: center;
      color: #fff;
    }
    * {
      color: #fff;
    }
  }
  .react-calendar__navigation__arrow {
    font-size: calc((40 / 720) * 100vw);
  }
  abbr[title] {
    text-decoration: none;
  }
  .react-calendar__tile--now {
    background-color: transparent;
    color: #00d349;
    &:focus,
    &:hover {
      color: #fff;
    }
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #07ac40;
    border-radius: 6px;
  }
  .react-calendar__navigation button:disabled {
    background-color: transparent;
  }
  .react-calendar__navigation button:enabled:hover {
    background-color: transparent;
  }

  &::after {
    content: "";
    border-color: transparent transparent #3b3c3b;
    border-style: solid;
    border-width: calc((11 / 720) * 100vw);
    width: 0;
    height: 0;
    position: absolute;
    top: calc((17 / 1280) * -100vh);
    right: calc(50% - 11px);
  }
`;

const TimeButton = styled.div`
  width: 100%;
  height: calc((60 / 1280) * 100vh);
  object-fit: contain;
  border-radius: 6px;
  background-color: #383a39;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
  margin-bottom: calc((20 / 1280) * 100vh);

  & > img {
    height: calc((24 / 1280) * 100vh);
  }
  .date {
    width: calc((500 / 720) * 100vw);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Roboto", sans-serif;
    font-size: calc((24 / 720) * 100vw);
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #fff;
    img {
      width: calc((25 / 720) * 100vw);
      margin-right: 8px;
    }
  }
`;

const LeagueContainer = styled.div`
  width: 100%;
  height: calc((65 / 1280) * 100vh);
  margin-top: 1px;
  background-color: #303231;
  display: flex;
  align-items: center;
  padding: 0 calc((25 / 720) * 100vw);
  margin-bottom: 1px;
  img:first-child {
    width: calc((26 / 720) * 100vw);
    margin-right: calc((12 / 720) * 100vw);
  }
  .star {
    width: calc((26 / 720) * 100vw);
  }
  .arrow {
    width: calc((18 / 720) * 100vw);
    margin-left: auto;
    transform: ${(props) => (!props.open ? "rotate(0deg)" : "rotate(180deg)")};
  }
  & > div {
    font-family: "Noto Sans KR", sans-serif;
    font-size: calc((24 / 720) * 100vw);
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.3px;
    color: #ccc;
    margin-right: calc((17 / 720) * 100vw);
    span {
      color: #fff;
    }
  }
`;

const SoccerContainer = styled.div`
  width: 100%;
  height: calc((140 / 1280) * 100vh);
  object-fit: contain;
  background-color: #3b3c3b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: calc((22 / 720) * 100vw);
  padding-right: calc((43 / 720) * 100vw);
  margin-bottom: 1px;
  position: relative;
`;

const TeamContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  height: 70%;
  img {
    height: calc((50 / 1280) * 100vh);
  }
`;

const TeamName = styled.span`
  font-family: "Noto Sans KR", sans-serif;
  font-size: calc((22 / 720) * 100vw);
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #fff;
`;

const RankText = styled.span`
  font-family: "Noto Sans KR", sans-serif;
  font-size: calc((18 / 720) * 100vw);
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.36px;
  color: #ff7200;
  margin-right: calc((7 / 720) * 100vw);
`;

const TeamNameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ScoreContainer = styled.div`
  width: calc((45 / 720) * 100vw);
  height: calc((45 / 720) * 100vw);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  font-size: calc((36 / 720) * 100vw);
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  border-radius: 6px;
  color: ${(props) => (props.color ? "#fc0" : "#fff")};
  background-color: ${(props) => (props.background ? "#ffcc00" : "")};
`;

const GameInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: calc((130 / 720) * 100vw);
  span {
    font-family: "Roboto", sans-serif;
    font-size: calc((22 / 720) * 100vw);
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #fff;
  }
`;

const GameTime = styled.div`
  width: calc((83 / 720) * 100vw);
  height: calc((30 / 1280) * 100vh);
  border-radius: 6px;
  background-color: #206c3a;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Noto Sans KR", sans-serif;
  font-size: calc((20 / 720) * 100vw);
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #fff;
`;

const GameIconCantainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  img {
    height: calc((25 / 1280) * 100vh);
    margin-right: calc((14 / 720) * 100vw);
  }
  img:last-of-type {
    margin: 0;
  }
`;

const Star = styled.div`
  position: absolute;
  right: calc((25 / 720) * 100vw);
  top: calc((27 / 1280) * 100vh);
  img {
    width: calc((26 / 720) * 100vw);
  }
`;

const BaseballNum = styled.div`
  width: calc((58 / 720) * 100vw);
  height: calc((27 / 1280) * 100vh);
  border-radius: 6px;
  background-color: ${(props) => props.background && "#515151"};
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Roboto", sans-serif;
  font-size: calc((20 / 720) * 100vw);
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.4px;
  color: #fff;
`;

const BasketballGameTime = styled.div`
  width: calc((110 / 720) * 100vw);
  height: calc((30 / 1280) * 100vh);
  border-radius: 6px;
  background-color: #206c3a;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  .quarter {
    font-family: "Noto Sans KR", sans-serif;
    font-size: calc((20 / 720) * 100vw);
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #fff;
    display: flex;
    align-items: center;
  }

  .time {
    font-family: "Roboto", sans-serif;
    font-size: calc((22 / 720) * 100vw);
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #ff8400;
    display: flex;
    align-items: center;
  }
`;

const TimeRectangle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 67px;
  height: 26px;
  border-radius: 6px;

  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.28px;
  color: #fff;
  ${(props) =>
    props.type === "before" &&
    css`
      background-color: #8c8c8c;
    `}
  ${(props) =>
    props.type === "delay" &&
    css`
      background-color: #0c72b9;
    `}
  ${(props) =>
    props.type === "cancel" &&
    css`
      background-color: #a92731;
    `}
  ${(props) =>
    props.type === "live" &&
    css`
      background-color: #19793a;
    `} 
  ${(props) =>
    props.type === "end" &&
    css`
      background-color: #515151;
    `}
`;

function getTimeStringSeconds(seconds){
	var hour, min, sec
	hour = parseInt(seconds/3600);
	min = parseInt((seconds%3600)/60);
	sec = seconds%60;

	if (hour.toString().length==1) hour = "0" + hour;
	if (min.toString().length==1) min = "0" + min;
	if (sec.toString().length==1) sec = "0" + sec;

	return hour + ":" + min + ":" + sec;
}


const LiveScoreMobileFootball = ({ sportsType , liveCount , footballData , pageBasicImgUrl, tab , setTab}) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [tmpList, setTmpList] = useState([
    {
      open: true,
      bookmark: false,
      game: [
        {
          LeftScore: 4,
          LeftScoreStyle: "color",
          RightScore: 2,
          RightScoreStyle: "none",
          bookmark: false,
        },
        {
          LeftScore: 2,
          LeftScoreStyle: "none",
          RightScore: 2,
          RightScoreStyle: "none",
          bookmark: false,
        },
        {
          LeftScore: 1,
          LeftScoreStyle: "none",
          RightScore: 3,
          RightScoreStyle: "background",
          bookmark: false,
        },
        {
          LeftScore: 3,
          LeftScoreStyle: "color",
          RightScore: 2,
          RightScoreStyle: "none",
          bookmark: false,
        },
      ],
    },
    {
      open: true,
      bookmark: false,
      game: [
        {
          LeftScore: 4,
          LeftScoreStyle: "color",
          RightScore: 2,
          RightScoreStyle: "none",
          bookmark: false,
        },
        {
          LeftScore: 2,
          LeftScoreStyle: "none",
          RightScore: 2,
          RightScoreStyle: "none",
          bookmark: false,
        },
        {
          LeftScore: 1,
          LeftScoreStyle: "none",
          RightScore: 3,
          RightScoreStyle: "background",
          bookmark: false,
        },
        {
          LeftScore: 3,
          LeftScoreStyle: "color",
          RightScore: 2,
          RightScoreStyle: "none",
          bookmark: false,
        },
      ],
    },
  ]);

  const navigate = useNavigate();
  const changeOpen = (index) => {
    let tmpData = tmpList;
    tmpData[index] = { ...tmpData[index], open: !tmpData[index].open };
    setTmpList([...tmpData]);
  };

  const changeBookmark = (index) => {
    let tmpData = tmpList;
    tmpData[index] = { ...tmpData[index], bookmark: !tmpData[index].bookmark };
    setTmpList([...tmpData]);
  };

  const changeGameBookmark = (listIdx, gameIdx) => {
    let tmpData = tmpList;
    tmpData[listIdx].game[gameIdx] = {
      ...tmpData[listIdx].game[gameIdx],
      bookmark: !tmpData[listIdx].game[gameIdx].bookmark,
    };
    setTmpList([...tmpData]);
  };

  const isBookmark = (data) => {
    if (data.bookmark) {
      return true;
    }
    const findBookmark = (e) => {
      if (e.bookmark === true) {
        return true;
      } else {
        return false;
      }
    };
    const result = data?.game.some(findBookmark);
    return result;
  };

  const plusDate = () => {
    setDate(new Date(date.setDate(date.getDate() + 1)));
  };

  const minusDate = () => {
    setDate(new Date(date.setDate(date.getDate() - 1)));
  };

  return (
    <Wrapper>
      <TopBarContainer>
          <div>
            <TabContainer>
              <Tab
                onClick={() => setTab(1)}
                active={tab === 1}
                color={tab === 1 ? "#07ac40" : "#999999"}
              >
                라이브
                <TabCount>{liveCount}</TabCount>
              </Tab>

              <Tab
                onClick={() => setTab(2)}
                color={tab === 2 ? "#fff" : "#999999"}
              >
                종료
              </Tab>
              <Tab
                onClick={() => setTab(3)}
                color={tab === 3 ? "#fff" : "#999999"}
              >
                예정
              </Tab>
            </TabContainer>
            <IconContents>
              <IconRectangle onClick={() => setTab(4)}>
                {tab === 4 ? (
                  <img src="/images/live/Star-on.png" alt="" />
                ) : (
                  <img src="/images/live/Star-off.png" alt="" />
                )}
              </IconRectangle>
              <IconRectangle onClick={() => setOpenSearch(!openSearch)}>
                <img src="/images/live/Search.png" alt="" />
              </IconRectangle>
              <img src="/images/live/Refresh.png" alt="" />
              {openSearch && (
                <SearchContainer>
                  <SearchInput placeholder="리그명 또는 팀 이름을 검색하세요" />
                  <img src="/images/live/Search.png" alt="" />
                </SearchContainer>
              )}
            </IconContents>
          </div>
          {(tab === 2 || tab === 3) && (
            <TimeButton>
              <img src="/images/live/Arrow-left.png" alt="" onClick={minusDate} />
              <div
                className="date"
                onClick={() => setCalendar(!calendar)}
                style={{ cursor: "pointer" }}
              >
                <img src="/images/live/Calendar.png" alt="" />
                <span>{moment(date).format("MM/DD dd")}</span>
              </div>
              <img src="/images/live/Arrow-right.png" alt="" onClick={plusDate} />
              {calendar && (
                <CalendarContainer>
                  <Calendar
                    onChange={(e) => {
                      setDate(e);
                      setCalendar(false);
                    }}
                    value={date}
                    formatDay={(locale, date) =>
                      date.toLocaleString("en", { day: "numeric" })
                    }
                    minDetail="month"
                    maxDetail="month"
                    navigationLabel={null}
                  />
                </CalendarContainer>
              )}
            </TimeButton>
          )}
        </TopBarContainer>
              {footballData?.data?.map((data, index) => {
                return (
                  <div 
                    onClick={() =>{
                        navigate(`/live/watch/football/${data?.match_id && data?.match_id}`)
                        // setFootballMatchIdData(data?.match_id)
                      }}
                  >
                    <LeagueContainer>
                        <img src={pageBasicImgUrl+data?.country_logo} alt=""></img>
                        <div>
                          {data.category_name} : <span>{data.competition_name}</span> 리그
                        </div>
                        <img
                            className="star"
                            src="/images/live/Star-on.png"
                            alt=""
                            // onClick={() => changeBookmark(index)}
                          ></img>
                      
                          {/* {item.bookmark ? (
                          <img
                              className="star"
                              src="/images/live/Star-on.png"
                              alt=""
                              onClick={() => changeBookmark(index)}
                          ></img>
                          ) : (
                          <img
                              className="star"
                              src="/images/live/Star-off.png"
                              alt=""
                              onClick={() => changeBookmark(index)}
                          ></img>
                          )} */}
                          <img
                          className="arrow"
                          src="/images/chat/ArrowDown.png"
                          alt=""
                          //   onClick={() => changeOpen(index)}
                          ></img>
                      </LeagueContainer>
                      <SoccerContainer>
                        <TeamContainer>
                            <img
                                className="arrow"
                                src={pageBasicImgUrl+data.home_team_info.team_logo}
                                alt=""
                            ></img>
                            <TeamNameContainer>
                                <RankText className="rank">
                                  {
                                    data.home_team_info.rankup !== " " ?
                                    <>
                                      ({data.home_team_info.rankup})
                                    </>
                                    :
                                    ""                                
                                  }
                                </RankText>
                                <TeamName>{data.home_team_info.team_name}</TeamName>
                            </TeamNameContainer>
                        </TeamContainer>
                        <ScoreContainer
                        // color={element.LeftScoreStyle === "color"}
                        // background={element.LeftScoreStyle === "background"}
                        >
                        {data.home_team_info.score}
                        </ScoreContainer>
                        <GameInfoContainer>
                        {
                              data.status_id === 0 ?
                              ""
                              :
                              (
                                data.status_id === 1 ?
                                <TimeRectangle type="before">
                                  경기전
                                </TimeRectangle>
                                :
                                (
                                  data.status_id === 2 ?
                                  <TimeRectangle type="live">
                                    전반
                                  </TimeRectangle>
                                  :
                                  (
                                    data.status_id === 3 ?
                                    <TimeRectangle type="live">
                                      하프타임
                                    </TimeRectangle>
                                    :
                                    (
                                      data.status_id === 4?
                                      <TimeRectangle type="live">
                                        후반
                                      </TimeRectangle>
                                      :
                                      (
                                        data.status_id === 5?
                                        <TimeRectangle type="live">
                                          연장
                                        </TimeRectangle>
                                        :
                                        (
                                          data.status_id === 6?
                                          ""
                                          :
                                          (
                                            data.status_id === 7?
                                            <TimeRectangle type="live">
                                              승부차기
                                            </TimeRectangle>
                                            :
                                            (
                                              data.status_id === 8?
                                              <TimeRectangle type="end">
                                                경기종료
                                              </TimeRectangle>
                                              :
                                              (
                                                data.status_id === 9?
                                                <TimeRectangle type="delay">
                                                  경기연기
                                                </TimeRectangle>
                                                :
                                                (
                                                  data.status_id === 10 || data.status_id === 11?
                                                  <TimeRectangle type="cancel">
                                                    경기중단
                                                  </TimeRectangle>
                                                  :
                                                  (
                                                    data.status_id === 12?
                                                  <TimeRectangle type="cancel">
                                                    경기 취소
                                                  </TimeRectangle>
                                                    :
                                                    (
                                                      data.status_id === 13?
                                                      <TimeRectangle type="delay">
                                                        경기미정
                                                      </TimeRectangle>
                                                      :
                                                      ""
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      )
                                    )
                                  )
                                )
                              )
                            }
                            {/* <GameTime>후반 52’</GameTime> */}
                            {/* <span>05:10</span> */}
                            <span>
                            {(getTimeStringSeconds(data.match_time))}
                            </span>
                            <GameIconCantainer>
                                <img src="/images/main/Youtube.png" alt="" />
                                <img src="/images/main/Uniform.png" alt="" />
                                <img src="/images/main/Ground.png" alt="" />
                            </GameIconCantainer>
                        </GameInfoContainer>
                        <ScoreContainer >
                          {data.away_team_info.score}
                        </ScoreContainer>
                        <TeamContainer>
                            <img
                                className="arrow"
                                src={pageBasicImgUrl+data.away_team_info.team_logo}
                                alt=""
                            ></img>
                            <TeamNameContainer>
                                <RankText className="rank">
                                  {
                                    data.away_team_info.rankup !== " " ?
                                    <>
                                      ({data.away_team_info.rankup})
                                    </>
                                    :
                                    ""                                
                                  }
                                </RankText>
                                <TeamName>{data.away_team_info.team_name}</TeamName>
                            </TeamNameContainer>
                        </TeamContainer>
                        <Star>
                            <img src="/images/live/Star-on.png" alt=""></img>
                        </Star>
                        {/* <Star onClick={() => changeGameBookmark(index, idx)}>
                        {element.bookmark ? (
                            <img src="/images/live/Star-on.png" alt=""></img>
                        ) : (
                            <img src="/images/live/Star-off.png" alt=""></img>
                        )}
                        </Star> */}
                    </SoccerContainer>
                  </div>
                )
          })}
    </Wrapper>
  );
};

export default LiveScoreMobileFootball;
