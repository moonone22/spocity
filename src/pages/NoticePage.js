import React from "react";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import GuaranteeCompanySlider from "../components/slider/GuaranteeCompanySlider";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
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
    display: none;
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

const NoticeContainer = styled.div`
  width: 100%;
  padding: 0 50px;
  .title {
    width: 100%;
    font-size: 25px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.5px;
    color: #fff;
    margin-bottom: 30px;
  }
  @media (max-width: 720px) {
    margin-top: calc((40 / 1280) * 100vh);
    padding: 0 calc((40 / 720) * 100vw);
    .title {
      margin-top: calc((24 / 1280) * 100vh);
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0px;
  margin-bottom: 30px;
  th,
  td {
    height: 50px;
  }

  thead {
    background-color: #3b3c3b;
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.3px;
    color: #fff;
  }

  @media (max-width: 720px) {
    th,
    td {
      height: calc((80 / 1280) * 100vh);
    }

    thead {
      font-size: calc((22 / 720) * 100vw);
      font-weight: normal;
    }
    th {
      font-weight: normal;
    }
    margin-bottom: calc((40 / 1280) * 100vh);
  }
`;

const Tbody = styled.tbody`
  background-color: #303231;
  &:hover {
    background-color: #424342;
  }
  td {
    border-top: 2px solid #2c2d2d;
  }

  tr {
    > :nth-child(1) {
      font-family: "Roboto", sans-serif;
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.3px;
      text-align: center;
      color: #ccc;
      @media (max-width: 720px) {
        font-size: calc((24 / 720) * 100vw);
      }
    }
    > :nth-child(2) {
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.3px;
      text-align: left;
      color: #fff;
      cursor: pointer;
      @media (max-width: 720px) {
        font-size: calc((20 / 720) * 100vw);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: calc((380 / 720) * 100vw);
      }
    }
    > :nth-child(3) {
      font-family: "Roboto", sans-serif;
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.3px;
      text-align: center;
      color: #ccc;
      @media (max-width: 720px) {
        font-size: calc((20 / 720) * 100vw);
      }
    }
    .notice {
      > div {
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 49px;
        height: 25px;
        border-radius: 6px;
        border: solid 1px #19793a;
        background-color: #19793a;
        color: #fff;
        font-weight: 500;

        @media (max-width: 720px) {
          width: calc((59 / 720) * 100vw);
          height: calc((34 / 1280) * 100vh);
          font-size: calc((18 / 720) * 100vw);
        }
      }
    }
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

const PaginationCotainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0 50px;
  padding-left: 150px;
  .write {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 100px;
    height: 37px;
    border-radius: 6px;
    border: solid 1px #666;

    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.28px;
    text-align: center;
    color: #fff;
  }

  @media (max-width: 720px) {
    flex-direction: column;
    padding: 0;
    .write {
      width: calc((200 / 720) * 100vw);
      height: calc((80 / 1280) * 100vh);
      margin: 0 auto;

      font-size: calc((28 / 720) * 100vw);
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.56px;
      text-align: center;
      color: #fff;
    }
  }
`;

const NoticePage = ({ setMobileMenu, mobileMenu }) => {
  const navigate = useNavigate();
  const tmpList = [
    {
      text: "[공지] 이제부터 크롬캐스트 및 Airplay 를 공식적으로 지원합니다!",
      date: "2022.02.19",
      index: 18,
      type: "notice",
    },
    {
      text: "[공지] 해외에 거주하는 유저 여러분들은 필히 읽어주세요",
      date: "2022.02.19",
      index: 17,
      type: "notice",
    },
    {
      text: "[업데이트] VOD 시청페이지가 대규모 업데이트 되었습니다!",
      date: "2022.02.19",
      index: 16,
      type: "notice",
    },
    {
      text: "[공지] 이제부터 크롬캐스트 및 Airplay 를 공식적으로 지원합니다!",
      date: "2022.02.19",
      index: 15,
      type: "notice",
    },
    {
      text: "[안내] 각종 버그/오류 문의, 광고문의, 자료요청을 하는 방법",
      date: "2022.02.19",
      index: 14,
    },
    {
      text: "[공지] LIVE 채팅 서버 증설 및 최적화 작업 완료",
      date: "2022.02.19",
      index: 13,
    },
    {
      text: "[업데이트] VOD 시청페이지가 대규모 업데이트 되었습니다!",
      date: "2022.02.19",
      index: 12,
    },
    {
      text: "[공지] 이제부터 크롬캐스트 및 Airplay 를 공식적으로 지원합니다!",
      date: "2022.02.19",
      index: 11,
    },
    {
      text: "[안내] 각종 버그/오류 문의, 광고문의, 자료요청을 하는 방법",
      date: "2022.02.19",
      index: 10,
    },
    {
      text: "[공지] LIVE 채팅 서버 증설 및 최적화 작업 완료",
      date: "2022.02.19",
      index: 9,
    },
  ];

  return (
    <Wrapper>
      <AssuranceContainer>
        <TitleContainer className="title">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img className="icon" src="/images/main/Sidebar4.png" alt=""></img>
            <Title style={{ marginLeft: "7px" }}>스포시티 보증업체</Title>
          </div>
          <MoreDetails>더보기</MoreDetails>
        </TitleContainer>
        <GuaranteeCompanySlider />
      </AssuranceContainer>
      <NoticeContainer>
        <div className="title">공지사항</div>
        <Table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>등록일</th>
            </tr>
          </thead>
          {tmpList.map((item, index) => (
            <Tbody>
              <tr>
                <td className={item.type === "notice" && "notice"}>
                  <div>{item.type === "notice" ? "공지" : item.index}</div>
                </td>
                <td onClick={() => navigate(`/notice/${item.index}`)}>
                  {item.text}
                </td>
                <td>{item.date}</td>
              </tr>
            </Tbody>
          ))}
        </Table>
      </NoticeContainer>
      <PaginationCotainer>
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
        <div className="write" onClick={() => navigate("/notice/write")}>
          글쓰기
        </div>
      </PaginationCotainer>
      <Footer setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
    </Wrapper>
  );
};

export default NoticePage;
