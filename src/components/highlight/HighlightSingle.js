import React, { useState } from "react";
import styled, { css } from "styled-components";
import HighlightSlider from "./HighlightSlider";
import GuaranteeCompanySlider from "../slider/GuaranteeCompanySlider";
import Footer from "../common/Footer";

const ContentsContainer = styled.div`
  width: 100%;
  max-width: 1344px;
  @media (max-width: 1100px) {
    width: 100%;
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 35px;
  padding: 0 50px;
  margin-bottom: 29px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 720px) {
    flex-direction: column;
    height: max-content;
    padding: 0 calc((40 / 720) * 100vw);
  }

  .select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 600px;
    @media (max-width: 720px) {
      flex-direction: column;
      width: 100%;
    }
    section {
      display: flex;
      width: 600px;
      @media (max-width: 720px) {
        justify-content: space-between;
        margin-bottom: calc((15 / 1280) * 100vh);
        width: 100%;
      }
      > div {
        margin-right: 3px;
        @media (max-width: 720px) {
          margin: 0;
        }
      }
    }
  }
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.63px;
  color: #fff;

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
    margin: 0;
    padding: 0 calc((40 / 720) * 100vw);
  }
`;

const HighlightContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

const SelectContainer = styled.div`
  height: 100%;
  @media (max-width: 720px) {
    ${(props) =>
      props.number === 1 || props.number === 2
        ? css`
            width: 49%;
            margin: 0;
          `
        : css`
            width: 100%;
          `}
  }
`;

const SelectDefault = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  align-items: center;
  width: ${(props) => props.width};
  height: 37px;
  border-radius: 6px;
  border: solid 1px #202221;
  background-color: #383a39;
  position: relative;
  cursor : pointer;

  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.28px;
  color: #fff;
  @media (max-width: 720px) {
    height: calc((70 / 1280) * 100vh);
    font-size: calc((26 / 720) * 100vw);
    ${(props) =>
      props.number === 1 || props.number === 2
        ? css`
            width: 100%;
          `
        : css`
            width: 100%;
          `}
  }
`;

const SelectFullContainer = styled.div`
  width: ${(props) => props.width};
  height: max-content;
  object-fit: contain;
  border-radius: 6px;
  border: solid 1px #202221;
  background-color: #383a39;
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 10000;
  @media (max-width: 720px) {
    right: 0;
    width: 100%;
  }
`;

const SelectFullTop = styled.div`
  background-color: #383a39;
  width: 100%;
  height: 37px;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  align-items: center;
  border-bottom: solid 1px #202221;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  @media (max-width: 720px) {
    height: calc((70 / 1280) * 100vh);
  }
`;

const SelectContentsWrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  background-color: #383a39;
  border-radius: 0 0 8px 8px;
  @media (max-width: 720px) {
    height: calc((120 / 1280) * 100vh);
  }
`;

const SelectText = styled.span`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1px;
  letter-spacing: -0.35px;
  text-align: left;
  color: #fff;
  @media (max-width: 720px) {
    font-size: calc((26 / 720) * 100vw);
  }
`;

const SelectContents = styled.div`
  width: 100%;
  padding-left: 15px;
  height: 26px;
  object-fit: contain;
  border-radius: 5px;
  cursor: pointer;

  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 25px;
  letter-spacing: -0.35px;
  text-align: left;
  color: #fff;

  &:hover {
    background-color: #19793a;
  }
  @media (max-width: 720px) {
    font-size: calc((26 / 720) * 100vw);
  }
`;

const HighlightTitleContainer = styled.div`
  width: 100%;
  padding-left: 15px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  @media (max-width: 720px) {
    padding: 0;
  }
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
  @media (max-width: 720px) {
    font-size: calc((26 / 720) * 100vw);
  }
`;

const HighlightDate = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: rgba(204, 204, 204, 0.5);
  @media (max-width: 720px) {
    font-size: calc((22 / 720) * 100vw);
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

const HighlightSingle = ({ setMobileMenu, mobileMeunu }) => {
  const [sportsType, setSportsType] = useState("soccer");
  const [seasonSelect, setSeasonSelect] = useState({
    open: false,
    text: "시즌 전체",
  });
  const [teamSelect, setTeamSelect] = useState({
    open: false,
    text: "팀 전체",
  });
  const [roundSelect, setRoundSelect] = useState({
    open: false,
    text: "라운드 전체",
  });

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
    <ContentsContainer>
      <TitleContainer>
        <Title>프리미어리그</Title>
        <div className="select">
          <section>
            <SelectContainer number={1}>
              <SelectDefault
                number={1}
                width="228px"
                onClick={() => setSeasonSelect({ ...seasonSelect, open: true })}
              >
                <div placeholder={seasonSelect.text}>
                  {seasonSelect?.text || ""}
                </div>
                <img
                  src="/images/chat/ArrowDown.png"
                  alt=""
                  style={{
                    width: "10px",
                    height: "5px",
                  }}
                />
                {seasonSelect.open === true && (
                  <SelectFullContainer width="228px" number={1}>
                    <SelectFullTop
                      onClick={(e) => {
                        e.stopPropagation();
                        setSeasonSelect({ ...seasonSelect, open: false });
                      }}
                    >
                      <SelectText>{seasonSelect.text}</SelectText>
                      <img
                        src="/images/chat/ArrowDown.png"
                        alt=""
                        style={{
                          width: "10px",
                          height: "5px",
                          cursor: "pointer",
                          transform: `${
                            seasonSelect.open
                              ? "rotate(180deg)"
                              : "rotate(0deg)"
                          }`,
                        }}
                      ></img>
                    </SelectFullTop>
                    <SelectContentsWrapper>
                      <SelectContents
                        onClick={(e) => {
                          e.stopPropagation();
                          setSeasonSelect({ open: false, text: "시즌 전체" });
                        }}
                      >
                        시즌 전체
                      </SelectContents>
                      <SelectContents
                        onClick={(e) => {
                          e.stopPropagation();
                          setSeasonSelect({ open: false, text: "2021-22" });
                        }}
                      >
                        2021-22
                      </SelectContents>
                    </SelectContentsWrapper>
                  </SelectFullContainer>
                )}
              </SelectDefault>
            </SelectContainer>

            <SelectContainer number={2}>
              <SelectDefault
                number={2}
                width="229px"
                onClick={() => setTeamSelect({ ...teamSelect, open: true })}
              >
                <div placeholder={teamSelect.text}>
                  {teamSelect?.text || ""}
                </div>
                <img
                  src="/images/chat/ArrowDown.png"
                  alt=""
                  style={{
                    width: "10px",
                    height: "5px",
                  }}
                />
                {teamSelect.open === true && (
                  <SelectFullContainer width="229px" number={2}>
                    <SelectFullTop
                      onClick={(e) => {
                        e.stopPropagation();
                        setTeamSelect({ ...teamSelect, open: false });
                      }}
                    >
                      <SelectText>{teamSelect.text}</SelectText>
                      <img
                        src="/images/chat/ArrowDown.png"
                        alt=""
                        style={{
                          width: "10px",
                          height: "5px",
                          cursor: "pointer",
                          transform: `${
                            teamSelect.open ? "rotate(180deg)" : "rotate(0deg)"
                          }`,
                        }}
                      ></img>
                    </SelectFullTop>
                    <SelectContentsWrapper>
                      <SelectContents
                        onClick={(e) => {
                          e.stopPropagation();
                          setTeamSelect({ open: false, text: "노리치 시티" });
                        }}
                      >
                        노리치 시티
                      </SelectContents>
                      <SelectContents
                        onClick={(e) => {
                          e.stopPropagation();
                          setTeamSelect({ open: false, text: "토트넘 홋스퍼" });
                        }}
                      >
                        토트넘 홋스퍼
                      </SelectContents>
                    </SelectContentsWrapper>
                  </SelectFullContainer>
                )}
              </SelectDefault>
            </SelectContainer>
          </section>
          <SelectContainer number={3}>
            <SelectDefault
              number={3}
              width="138px"
              onClick={() => setRoundSelect({ ...roundSelect, open: true })}
            >
              <div placeholder={roundSelect.text}>
                {roundSelect?.text || ""}
              </div>
              <img
                src="/images/chat/ArrowDown.png"
                alt=""
                style={{
                  width: "10px",
                  height: "5px",
                }}
              />
              {roundSelect.open === true && (
                <SelectFullContainer width="138px" number={3}>
                  <SelectFullTop
                    onClick={(e) => {
                      e.stopPropagation();
                      setRoundSelect({ ...roundSelect, open: false });
                    }}
                  >
                    <SelectText>{roundSelect.text}</SelectText>
                    <img
                      src="/images/chat/ArrowDown.png"
                      alt=""
                      style={{
                        width: "10px",
                        height: "5px",
                        cursor: "pointer",
                        transform: `${
                          roundSelect.open ? "rotate(180deg)" : "rotate(0deg)"
                        }`,
                      }}
                    ></img>
                  </SelectFullTop>
                  <SelectContentsWrapper>
                    <SelectContents
                      onClick={(e) => {
                        e.stopPropagation();
                        setRoundSelect({ open: false, text: "1라운드" });
                      }}
                    >
                      1라운드
                    </SelectContents>
                    <SelectContents
                      onClick={(e) => {
                        e.stopPropagation();
                        setRoundSelect({ open: false, text: "2라운드" });
                      }}
                    >
                      2라운드
                    </SelectContents>
                  </SelectContentsWrapper>
                </SelectFullContainer>
              )}
            </SelectDefault>
          </SelectContainer>
        </div>
      </TitleContainer>
      <HighlightContainer>
        <HighlightContent>
          <HighlightTitleContainer>
            <HighlightTitle>노리치 시티 vs 토트넘 홋스퍼 </HighlightTitle>
            <HighlightDate>2022.05.23</HighlightDate>
            <MoreDetails>더보기</MoreDetails>
          </HighlightTitleContainer>
          <HighlightSlider tmpList={tmpList1} single={true} />
        </HighlightContent>
        <HighlightContent>
          <HighlightContent>
            <HighlightTitleContainer>
              <HighlightTitle>리버풀 vs 울버햄튼 원더러스</HighlightTitle>
              <HighlightDate>2022.05.23</HighlightDate>
              <MoreDetails>더보기</MoreDetails>
            </HighlightTitleContainer>
            <HighlightSlider tmpList={tmpList2} single={true} />
          </HighlightContent>
        </HighlightContent>
      </HighlightContainer>
    </ContentsContainer>
  );
};

export default HighlightSingle;
