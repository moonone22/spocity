import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 600px;
  height: 894px;
  padding: 29px 0 41px;
  object-fit: contain;
  border-radius: 12px;
  background-color: #202221;

  @media (max-width: 720px) {
    width: 100vw;
    height: calc(var(--vh, 1vh) * 100);
    overflow: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 calc((40 / 720) * 100vw);
  }
`;

const TitleContainer = styled.div`
  height: 21px;
  margin: 0 0 30px;
  padding: 0 24px 1px 29px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 13px;
    height: 12px;
    cursor: pointer;
  }
  @media (max-width: 720px) {
    margin: 0;
    width: 100%;
    margin: calc((40 / 1280) * 100vh) 0;
    padding: 0;
    img {
      width: calc((28 / 720) * 100vw);
      height: auto;
      cursor: pointer;
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
  line-height: 100%;
  @media (max-width: 720px) {
    font-size: calc((30 / 720) * 100vw);
  }
`;

const ExplanationContainer = styled.div`
  width: 510px;
  height: 69px;
  margin: 30px 67px 37px 28px;
  display: flex;
  @media (max-width: 720px) {
    margin: 0;
    margin-bottom: calc((37 / 1280) * 100vh);
    width: 100%;
    height: calc((104 / 1280) * 100vh);
    .text {
      display: flex;
      flex-direction: column;
    }
  }
`;

const LogoContainer = styled.div`
  width: 198px;
  height: 69px;
  padding: 18px 30px 19px 27px;
  border-radius: 6px;
  background-color: #303231;
  img {
    width: 141px;
    height: 35px;
    object-fit: cover;
  }
  @media (max-width: 720px) {
    width: calc((202 / 720) * 100vw);
    height: calc((101 / 1280) * 100vh);
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: calc((148 / 720) * 100vw);
      height: auto;
      object-fit: cover;
      /* transform: scale(0.8); */
    }
  }
`;

const TextContainer = styled.div`
  width: 286px;
  margin: 1px 0 2px 25px;
  object-fit: contain;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 22px;
  letter-spacing: -0.38px;
  text-align: left;
  color: ${(props) => props.color};
  @media (max-width: 720px) {
    font-size: calc((22 / 720) * 100vw);
    width: calc((411 / 720) * 100vw);
    margin-left: 10px;
    line-height: calc((30 / 1280) * 100vh);
  }
`;

const Table = styled.table`
  width: 540px;
  margin: 0 auto;
  padding: 18px 296px 17px 18px;
  object-fit: contain;
  border-collapse: collapse;

  @media (max-width: 720px) {
    margin: 0;
    width: 100%;
    height: calc((900 / 1280) * 100vh);
  }

  th,
  td {
    border: 1px solid #202221;
    background-color: #303231;
    font-family: "Noto Sans KR", sans-serif;
    height: 50px;
  }

  .ranking {
    text-align: center;
    font-family: "Roboto", sans-serif;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    /* line-height: 3.4; */
    letter-spacing: -0.38px;
    text-align: center;
    color: #ccc;
    @media (max-width: 720px) {
      font-size: calc((24 / 720) * 100vw);
    }
  }

  .nickname {
    padding-left: 22px;
    object-fit: contain;
    height: 100%;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 6px;
    letter-spacing: -0.38px;
    text-align: left;
    color: #ccc;
    vertical-align: middle;
    @media (max-width: 720px) {
      font-size: calc((22 / 720) * 100vw);
    }
  }

  .tier {
    padding-left: 26px;
    width: 130px;
    img {
      width: 16px;
      height: 18px;
    }
    @media (max-width: 720px) {
      img {
        width: calc((29 / 720) * 100vw);
        height: calc((32 / 1280) * 100vh);
      }
    }
  }

  thead tr th {
    height: 50px;
    background-color: #3b3c3b;
    color: #fff;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 10px;
    letter-spacing: -0.38px;
    color: #ccc;
    @media (max-width: 720px) {
      height: calc((80 / 720) * 100vw);
      font-size: calc((22 / 720) * 100vw);
      &:first-child {
        width: calc((80 / 720) * 100vw);
      }
      &:last-child {
        width: calc((200 / 720) * 100vw);
      }
    }
  }

  .tiername {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 10px;
    letter-spacing: -0.38px;
    text-align: left;
    color: #ccc;
    margin-left: 11px;
    @media (max-width: 720px) {
      font-size: calc((22 / 720) * 100vw);
    }
  }
`;

const ApplicationButton = styled.div`
  width: 105px;
  height: 40px;
  margin: 20px 250px;
  object-fit: contain;
  border-radius: 6px;
  border: solid 1px #666;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 35px;
  letter-spacing: -0.28px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #19793a;
    border: none;
    line-height: 36px;
  }
  &:active {
    transform: scale(0.95);
    transition: all 0.1s ease-in-out;
  }
  @media (max-width: 720px) {
    margin: 0;
    width: calc((200 / 720) * 100vw);
    height: calc((80 / 1280) * 100vh);
    font-size: calc((28 / 720) * 100vw);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    border: solid 2px #666;
    margin: calc((40 / 1280) * 100vh) 0;
  }
`;

const Pagination = styled.div`
  width: 259px;
  height: 27px;
  margin: 20px 170px 0 171px;
  object-fit: contain;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    display: flex;
    width: 200px;
    justify-content: space-around;
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
    margin-bottom: calc((50 / 1280) * 100vh);
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
  color: #fff;
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
    height: calc((50 / 1280) * 100vh);
  }
`;

const PaginationArrow = styled.img`
  &:hover {
    filter: brightness(10);
  }
`;

const Ranking = ({ setRankingModal, setRequestForLevelUp }) => {
  const tmpList = [
    { ranking: 1, nickname: "나는 진짜 힐링을원한다", tier: "Diamonds" },
    { ranking: 2, nickname: "오른쪽이지", tier: "Platinum" },
    { ranking: 3, nickname: "레이나88", tier: "Gold" },
    { ranking: 4, nickname: "자메이비레르트닷", tier: "Silver" },
    { ranking: 5, nickname: "지지클라이", tier: "Bronze" },
    { ranking: 6, nickname: "키즈소프카와", tier: "" },
    { ranking: 7, nickname: "나는 진짜 힐링을원한다", tier: "" },
    { ranking: 8, nickname: "지지클라이 스카이1888", tier: "" },
    { ranking: 9, nickname: "키즈소프카와", tier: "" },
    { ranking: 10, nickname: "지지클라이 스카이1888", tier: "" },
  ];

  const tierToKorean = (tier) => {
    switch (tier) {
      case "Bronze":
        return "브론즈";
      case "Silver":
        return "실버";
      case "Gold":
        return "골드";
      case "Platinum":
        return "플레티넘";
      case "Diamonds":
        return "다이아";
      default:
        return "";
    }
  };

  return (
    <Wrapper>
      <TitleContainer>
        <Title>명예의 전당</Title>
        <img
          src="/images/common/Close.png"
          alt=""
          onClick={() => setRankingModal(false)}
        ></img>
      </TitleContainer>
      <ExplanationContainer>
        <LogoContainer>
          <img src="/images/popup/Logo.webp" alt="" style={{}}></img>
        </LogoContainer>
        <div className="text">
          <TextContainer color="#ccc">
            이 순위는 Spocity의 등급별 랭킹을 나타냅니다. 등급별로 많은 혜택을
            누려보세요!
          </TextContainer>
          <TextContainer
            color="#099f3c"
            style={{ cursor: "pointer" }}
          >{`(등업별 혜택과 등업방법 보러가기)`}</TextContainer>
        </div>
      </ExplanationContainer>
      <Table>
        <thead>
          <tr>
            <th>순위</th>
            <th>닉네임</th>
            <th>등급</th>
          </tr>
        </thead>
        {tmpList.map((item, index) => (
          <tbody>
            <tr>
              <td
                className="ranking"
                style={{ color: `${index < 5 ? "#ffcc00" : "#ccc"}` }}
              >
                {index + 1}
              </td>
              <td className="nickname">{item.nickname}</td>
              <td className="tier">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {item.tier && (
                    <img src={`/images/chat/${item.tier}.png`} alt=""></img>
                  )}
                  <span className="tiername">{tierToKorean(item.tier)}</span>
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
      <ApplicationButton
        onClick={() => {
          setRequestForLevelUp(true);
          setRankingModal(false);
        }}
      >
        등업신청
      </ApplicationButton>
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
    </Wrapper>
  );
};

export default Ranking;
