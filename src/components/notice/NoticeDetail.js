import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "../common/Footer";
import GuaranteeCompanySlider from "../slider/GuaranteeCompanySlider";

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
  margin-bottom: 80px;
  > .title {
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

    > .title {
      margin-bottom: calc((24 / 1280) * 100vh);
      font-size: calc((32 / 1280) * 100vh);
    }
  }
`;

const BoardContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
  > * {
    border-bottom: 1px solid #2c2d2d;
  }
  > .top {
    width: 100%;
    height: 50px;
    background-color: #3b3c3b;
    padding: 0 31px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > .title {
      font-size: 15px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      text-align: left;
      color: #fff;
    }

    > .date {
      &,
      * {
        font-family: "Roboto", sans-serif;
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        color: #ccc;
      }
    }

    @media (max-width: 720px) {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      height: calc((144 / 1280) * 100vh);
      padding: 0 calc((31 / 1280) * 100vh);

      > .title {
        font-size: calc((24 / 720) * 100vw);
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: -0.6px;
        text-align: left;
        color: #fff;
      }

      > .date {
        &,
        * {
          font-size: calc((24 / 720) * 100vw);
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          letter-spacing: normal;
          text-align: left;
          color: #aaa;
        }
      }

      span {
        display: none;
      }
    }
  }

  > .content {
    display: flex;
    align-items: center;
    width: 100%;
    height: 425px;
    background-color: #303231;
    padding-left: 30px;

    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    line-height: 2;
    color: #ccc;

    @media (max-width: 720px) {
      height: max-content;
      font-size: calc((24 / 720) * 100vw);
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -1.2px;
      text-align: left;
      color: #fff;
      padding: calc((60 / 1280) * 100vh) calc((40 / 720) * 100vw);
      padding-right: calc((17 / 720) * 100vw);
    }
  }

  > .navigation {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: #3b3c3b;
    > span {
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      text-align: left;
      color: #fff;
    }
    @media (max-width: 720px) {
      height: calc((80 / 1280) * 100vh);
      > span {
        font-size: calc((24 / 720) * 100vw);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`;

const Rectangle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 27px;
  border-radius: 6px;
  background-color: #515151;
  margin-left: 28px;

  * {
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }
  p {
    display: none;
  }
  span {
    display: block;
  }

  @media (max-width: 720px) {
    width: calc((98 / 720) * 100vw);
    height: calc((45 / 1280) * 100vh);
    margin: 0 calc((20 / 720) * 100vw);
    * {
      font-size: calc((24 / 720) * 100vw);
      font-weight: normal;
    }
    span {
      display: none;
    }
    p {
      display: block;
    }
  }
`;

const VerticalBar = styled.div`
  width: 1px;
  height: 18px;
  opacity: 0.1;
  background-color: #fff;
  margin-left: 20px;
  margin-right: 28px;
  @media (max-width: 720px) {
    display: none;
  }
`;

const ButtonContainer = styled.div`
  width: 320px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;

  @media (max-width: 720px) {
    width: 100%;
    height: calc((80 / 1280) * 100vh);
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 45px;

  border-radius: 6px;
  border: solid 1px #666;

  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.3px;
  text-align: center;
  color: #fff;

  @media (max-width: 720px) {
    width: calc((200 / 720) * 100vw);
    height: calc((80 / 1280) * 100vh);
    font-size: calc((28 / 720) * 100vw);
    border: solid 2px #666;
  }
`;

const NoticeDetail = ({ setMobileMenu, mobileMenu }) => {
  let { id } = useParams();

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
        <BoardContainer>
          <div className="top">
            <div className="title">
              [공지] 이제부터 크롬캐스트 및 Airplay 를 공식적으로 지원합니다!
            </div>
            <div className="date">
              <span>등록일</span> 2022.02.19
            </div>
          </div>
          <div className="content">
            안녕하세요.
            <br />
            언제나 유저분들을 최우선으로 생각하는 테스트1입니다.
            <br /> 이제부터 크롬캐스트 및 Airplay 를 이용하여 사용하고 계시는
            TV에 연결하여 LIVE 및 VOD 영상을 감상하실 수 있습니다.
            <br /> 플레이어 우측 하단에 TV 아이콘이 표시되며, 클릭하시면 연결할
            수 있는 디바이스 목록이 표시됩니다.
            <br /> 만약 연결 가능한 디바이스가 뜨지 않는 경우 아래를
            참고해주시기 바랍니다. <br />
            1. 사용중이신 TV와 스마트폰 혹은 PC가 같은
            네트워크(공유기,와이파이)에 연결된 상태인지 확인합니다.
            <br /> 2. 크롬캐스트를 사용중이실 경우 TV에 HDMI 를 제대로
            설정하셨는지 확인합니다. <br />
            3. Wifi 공유기, 크롬캐스트 기기, TV 전원, 모바일/PC 기기를
            재부팅합니다. <br />
            4. 크롬캐스트 기기를 초기화합니다. <br />
            5. Wifi 공유기를 초기화합니다.
            <br /> 6. TV에 연결된 와이파이 혹은 인터넷 선을 확인하고
            초기화합니다. <br />
            감사합니다.
          </div>
          <div className="navigation">
            <Rectangle>
              <span>다음 글</span>
              <p>다음글</p>
            </Rectangle>
            <VerticalBar></VerticalBar>
            <span>[공지] 2022년 03월 첫째주, 공지사항 정리해드립니다.</span>
          </div>
          <div className="navigation">
            <Rectangle>
              <span>이전 글</span>
              <p>이전글</p>
            </Rectangle>
            <VerticalBar></VerticalBar>
            <span>[공지] 해외에 거주하는 유저 여러분들은 필히 읽어주세요</span>
          </div>
        </BoardContainer>
        <ButtonContainer>
          <Button>목록</Button>
          <Button>수정</Button>
          <Button>삭제</Button>
        </ButtonContainer>
      </NoticeContainer>
      <Footer setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
    </Wrapper>
  );
};

export default NoticeDetail;
