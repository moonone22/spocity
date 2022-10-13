import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HighlightSlider from "../components/highlight/HighlightSlider";
import GuaranteeCompanySlider from "../components/slider/GuaranteeCompanySlider";
import Footer from "../components/common/Footer";
import queryString from "query-string";
import HighlightSingle from "../components/highlight/HighlightSingle";
import { useNavigate } from "react-router-dom";
import { ScoreCount } from "../components/apis/api";

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
    padding: 0 calc((40 / 720) * 100vw);
    overflow: hidden;
    overflow-x: auto;
    height: calc((119 / 1280) * 100vh);
    align-items: center;
    &::-webkit-scrollbar {
      display: none;
    }
    background-color: #1a1c1b;
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
    justify-content: center;
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
  margin: 0 50px;
  @media (max-width: 720px) {
    margin: 0;
    padding: 0 calc((40 / 720) * 100vw);
  }
`;

const HighlightContent = styled.div`
  width: 100%;
  height: 227px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 720px) {
    /* width: calc((520 / 720) * 100vw); */
    height: calc((241 / 1280) * 100vh);
  }
`;

const LeagueContainer = styled.div`
  width: 99px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 5px;

  @media (max-width: 720px) {
    width: calc((123 / 720) * 100vw);
    height: calc((241 / 1280) * 100vh);
    padding-top: 0;
    /* justify-content: space-between; */
  }
`;

const LeagueImage = styled.div`
  width: 99px;
  height: 149px;
  border-radius: 12px;
  background-color: #161717;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
  cursor: pointer;

  @media (max-width: 720px) {
    width: calc((123 / 720) * 100vw);
    height: calc((134 / 1280) * 100vh);
    /* margin: 0; */
  }

  .PremierLeague {
    width: 77px;
    @media (max-width: 720px) {
      width: calc((84 / 720) * 100vw);
    }
  }
  .laliga {
    width: 41px;
    @media (max-width: 720px) {
      width: calc((48 / 720) * 100vw);
    }
  }
`;

const LeagueInfo = styled.div`
  width: 99px;
  height: 67px;
  border-radius: 12px;
  background-color: #161717;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 720px) {
    width: calc((123 / 720) * 100vw);
    height: calc((99 / 1280) * 100vh);
  }

  .more {
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.28px;
    color: #aaa;
    cursor: pointer;

    @media (max-width: 720px) {
      width: calc((93 / 720) * 100vw);
      font-size: calc((17.5 / 720) * 100vw);
    }
    img {
      width: 15px;
      @media (max-width: 720px) {
        width: calc((18 / 720) * 100vw);
      }
    }
    .vertical-bar {
      opacity: 0.1;
      color: #fff;
      cursor: default;
    }
  }
`;

const LeagueInfoTitle = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.75px;
  color: #fff;
  margin-bottom: 2px;
  @media (max-width: 720px) {
    font-size: calc((17.5 / 720) * 100vw);
  }
`;

const HighlightPage = ({ setMobileMenu, mobileMenu }) => {
  const [sportsType, setSportsType] = useState("soccer");
  const [singlePage, setSinglePage] = useState("");
  let navigate = useNavigate();
  const query = queryString?.parse(window?.location?.search);

  useEffect(() => {
    if (query?.league) {
      setSinglePage(query.league);
    } else {
      setSinglePage("");
    }
  }, [query]);

  const tmpList1 = [
    {
      img: "/images/highlight/Ball.png",
      text: "첼시 토스넘 훗스퍼 vs 조앤더슨",
      date: "2022.01.25",
    },
    {
      img: "/images/highlight/Ball.png",
      text: "첼시 토스넘 훗스퍼 vs 조앤더슨",
      date: "23R 2022.01.25",
    },
    {
      img: "/images/highlight/Ball.png",
      text: "첼시 토스넘 훗스퍼 vs 조앤더슨",
      date: "23R 2022.01.25",
    },
    {
      img: "/images/highlight/Ball.png",
      text: "첼시 토스넘 훗스퍼 vs 조앤더슨",
      date: "23R 2022.01.25",
    },
    {
      img: "/images/highlight/Ball.png",
      text: "첼시 토스넘 훗스퍼 vs 조앤더슨",
      date: "23R 2022.01.25",
    },
  ];

  const tmpList2 = [
    {
      img: "/images/highlight/Ground.png",
      text: "첼시 토스넘 훗스퍼 vs 조앤더슨",
      date: "2022.01.25",
    },
    {
      img: "/images/highlight/Ground.png",
      text: "첼시 토스넘 훗스퍼 vs 조앤더슨",
      date: "2022.01.25",
    },
    {
      img: "/images/highlight/Ground.png",
      text: "첼시 토스넘 훗스퍼 vs 조앤더슨",
      date: "2022.01.25",
    },
    {
      img: "/images/highlight/Ground.png",
      text: "첼시 토스넘 훗스퍼 vs 조앤더슨",
      date: "2022.01.25",
    },
    {
      img: "/images/highlight/Ground.png",
      text: "첼시 토스넘 훗스퍼 vs 조앤더슨",
      date: "2022.01.25",
    },
  ];

  const [scoreCount, setScoreCount] = useState()
  useEffect(()=>{
    ScoreCount(  `/api/main/count/live/5` , setScoreCount)
  },[])

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
        {singlePage === "" ? (
          <HighlightContainer>
            <HighlightContent>
              <LeagueContainer>
                <LeagueImage
                  onClick={() => navigate("/highlight?league=primier")}
                >
                  <img
                    className="PremierLeague"
                    src="/images/highlight/PremierLeague.png"
                    alt=""
                  />
                </LeagueImage>
                <LeagueInfo>
                  <LeagueInfoTitle>프리미어 리그</LeagueInfoTitle>
                  <div className="more">
                    <div onClick={() => navigate("/highlight?league=primier")}>
                      더보기
                    </div>
                    <div className="vertical-bar">|</div>
                    <img src="/images/live/Star-on.png" alt=""></img>
                  </div>
                </LeagueInfo>
              </LeagueContainer>
              <HighlightSlider tmpList={tmpList1} main={true} />
            </HighlightContent>
            <HighlightContent>
              <HighlightContent>
                <LeagueContainer>
                  <LeagueImage>
                    <img
                      className="laliga"
                      src="/images/highlight/Laliga.png"
                      alt=""
                    />
                  </LeagueImage>
                  <LeagueInfo>
                    <LeagueInfoTitle>라리가</LeagueInfoTitle>
                    <div className="more">
                      <div>더보기</div>
                      <div className="vertical-bar">|</div>
                      <img src="/images/live/Star-on.png" alt=""></img>
                    </div>
                  </LeagueInfo>
                </LeagueContainer>
                <HighlightSlider tmpList={tmpList2} main={true} />
              </HighlightContent>
            </HighlightContent>
          </HighlightContainer>
        ) : (
          <HighlightSingle
            singlePage={singlePage}
            setMobileMenu={setMobileMenu}
            mobileMeunu={mobileMenu}
          ></HighlightSingle>
        )}
        <Footer setMobileMenu={setMobileMenu} mobileMeunu={mobileMenu} />
      </ContentsContainer>
    </Wrapper>
  );
};

export default HighlightPage;
