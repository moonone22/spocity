import React from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  margin: 0 5px;
  &:hover {
    transform: translate(0px, -5px);
    transition: all 0.1s ease-in-out;
  }
  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 720px) {
    height: calc((279 / 1280) * 100vh);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 168px;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 8px;
  padding-top: 8px;
  cursor: pointer;
  @media (max-width: 720px) {
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
    margin: 0;
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
  @media (max-width: 1100px) {
    margin: 0;
    transform: scale(1.1);
    /* margin-left: 60px; */
    margin-right: 8px;
    img {
      transform: scale(1.4);
    }
  }
  @media (max-width: 1100px) {
    transform: none;
    width: max-content;
    height: 100%;
    img {
      transform: none;
    }
  }
`;

const GameInfoContainer = styled.div`
  width: 100%;
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
  color: ${(props) => props.color};
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
    font-size: calc((18 / 720) * 100vw);
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

const LiveComponent = ({ home }) => {
  const navigate = useNavigate();

  return (
    <Wrapper onClick={() => navigate("/live/basketball")}>
      <ImageContainer image="/images/main/Live1.png">
        <ImageInfoContainer>
          <League>
            <img
              src="/images/common/Italy.png"
              alt=""
              style={{ width: "21px", height: "13px", marginLeft: "4px" }}
            ></img>
            <Text fontSize="15px" type="cup">
              오스트리아 Cup
            </Text>
          </League>
          <TimeContainer>
            <img
              src="/images/main/GreenLight.png"
              alt=""
              style={{ width: "7px", height: "7px", marginLeft: "7px" }}
            ></img>
            <Text fontSize="13px" type="time">
              전반 42
            </Text>
          </TimeContainer>
        </ImageInfoContainer>
      </ImageContainer>
      <GameInfoContainer>
        <LogoContainer width="16px" style={{ marginRight: "6px" }}>
          <img src="/images/main/KansasCity.png" alt="" className="logo"></img>
          <img src="/images/main/Toronto.png" alt="" className="logo"></img>
        </LogoContainer>
        <LogoContainer width="113px" type="text">
          <div style={{ display: "flex" }}>
            <Text fontSize="13px" type="team" className="team1">
              캔자스시티 로열스
            </Text>
            {home === 0 && (
              <Home
                src="/images/main/Home.png"
                alt=""
                home={home}
                idx={0}
              ></Home>
            )}
          </div>
          <div style={{ display: "flex" }}>
            <Text fontSize="13px" type="team" className="team2">
              토론토 블루제이스
            </Text>
            {home === 1 && (
              <Home
                src="/images/main/Home.png"
                alt=""
                home={home}
                idx={1}
              ></Home>
            )}
          </div>
        </LogoContainer>
        <LogoContainer width="18px" type="score">
          <ScoreContainer color="#fff">1</ScoreContainer>
          <ScoreContainer color="#f5c703">2</ScoreContainer>
        </LogoContainer>
        <LogoContainer width="73px" marginLeft="30px" type="info">
          <Time fontSize="14px">07-17 23:00 </Time>
          <ButtonContainer>
            <img src="/images/main/Uniform.png" alt=""></img>
            <img src="/images/main/Youtube.png" alt=""></img>
            <img src="/images/main/Ground.png" alt=""></img>
          </ButtonContainer>
        </LogoContainer>
      </GameInfoContainer>
      <MobileGameInfoContainer>
        <MobileGameInfoContents>
          <MobileGameInfoContentsLeft>
            <img
              src="/images/main/KansasCity.png"
              alt=""
              className="logo"
            ></img>
            <div>뉴욕 양키스</div>
          </MobileGameInfoContentsLeft>
          <MobileScore>1</MobileScore>
        </MobileGameInfoContents>
        <MobileGameInfoContents>
          <MobileGameInfoContentsLeft>
            <img src="/images/main/Toronto.png" alt="" className="logo"></img>
            <div>볼티모어</div>
            <img className="home" src="/images/main/Home.png" alt=""></img>
          </MobileGameInfoContentsLeft>
          <MobileScore active={true}>2</MobileScore>
        </MobileGameInfoContents>
      </MobileGameInfoContainer>
    </Wrapper>
  );
};

export default LiveComponent;
