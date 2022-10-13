import React from "react";
import styled, { css } from "styled-components";
import MobileFooter from "../common/MobileFooter";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  padding: 0 50px;
  @media (max-width: 720px) {
    height: calc((400 / 1280) * 100vh);
    padding: 0;
  }
`;

const AnnouncementWrapper = styled.div`
  width: 100%;
`;

const AnnouncementContainer = styled.div`
  width: 100%;
  height: 48px;
  background-color: #161717;
  display: flex;
  align-items: center;
  padding-left: 20px;

  @media (max-width: 1100px) {
    margin-top: 30px;
    padding: 0 45px;
    * {
      transform: scale(1.1);
    }
  }
  @media (max-width: 720px) {
    margin-top: calc((30 / 720) * 100vw);
    padding: 0 calc((40 / 720) * 100vw);
    * {
      transform: none;
    }
  }
`;

const New = styled.div`
  padding: 0 5px;
  height: 22px;
  background-color: #19793a;
  border-radius: 11px;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  text-align: center;
  line-height: 22px;
  margin-right: 15px;

  @media (max-width: 1100px) {
    height: 22px;
    margin: 0;
    width: calc((61 / 720) * 100vw);
    height: calc((28 / 1280) * 100vh);
    border-radius: 14px;
    font-size: calc((18 / 720) * 100vw);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: calc((10 / 720) * 100vw);
  }
`;

const NewText = styled.span`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #cccccc;
  cursor: pointer;
  @media (max-width: 1100px) {
    margin-left: 20px;
    margin-right: 30px;
  }
  @media (max-width: 720px) {
    margin: 0;
    font-size: calc((22 / 720) * 100vw);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: calc(100% - (120 / 720) * 100vw);
    height: calc((21 / 1280) * 100vh);
    line-height: calc((18 / 1280) * 100vh);
  }
`;

const Imprint = styled.div`
  width: 100%;
  height: 120px;
  margin-top: 20px;
  display: flex;

  .copyright {
    margin-left: 28px;
  }
  img {
    width: 32px;
    height: 32px;
  }
  @media (max-width: 1100px) {
    flex-direction: column;
    height: 190px;
    margin-bottom: 40px;
    padding: 0 40px;
    .copyright {
      margin-left: 15px;
    }
  }
  @media (max-width: 720px) {
    flex-direction: column;
    height: 160px;
    .copyright {
      margin-left: 15px;
      font-size: calc((20 / 720) * 100vw);
    }
    padding: 0 0 0 calc((40 / 720) * 100vw);
    margin-bottom: calc((100 / 1280) * 100vh);
  }
`;

const Copyright = styled.span`
  font-family: "Noto Sans KR", sans-serif;
  color: #fff;
`;

const Text = styled.span`
  font-family: "Noto Sans KR", sans-serif;
  color: #fff;
  opacity: 0.7;
  font-size: 12px;
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      &:hover {
        color: #a9a9a9;
      }
    `}
  @media (max-width: 1100px) {
    font-size: 14px;
  }
  @media (max-width: 720px) {
    font-size: calc((18 / 720) * 100vw);
  }
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto;
  margin-right: 30px;
  .companyInfo2 {
    margin-top: 10px;
  }
  @media (max-width: 1100px) {
    margin: 10px 0;
    align-items: flex-start;
  }
  @media (max-width: 600px) {
    font-size: 10px;
    width: 240px;
    .companyInfo2 {
      margin-top: 0px;
    }
  }
`;

const VerticalBar = styled.div`
  width: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 720px) {
    width: 6px;
    margin: 0 calc((6 / 720) * 100vw);
  }
`;

const LogoImageContainer = styled.div`
  width: 57px;
  height: 56px;
  padding: 12px 12px 12px 13px;
  background-color: #161717;
  border-radius: 12px;
  @media (max-width: 720px) {
    width: calc((77 / 720) * 100vw);
    height: calc((77 / 1280) * 100vh);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: calc((41 / 720) * 100vw);
      height: calc((41 / 1280) * 100vh);
    }
  }
`;

const Footer = ({ setMobileMenu, mobileMenu }) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <AnnouncementWrapper>
        <AnnouncementContainer>
          <New>NEW</New>
          <NewText>
            2022년 7월30일 오픈이벤트를 실시합니다 공지사항을 확인 하시길
            바랍니다
          </NewText>
        </AnnouncementContainer>
      </AnnouncementWrapper>
      <Imprint>
        <div style={{ display: "flex" }}>
          <LogoImageContainer>
            <img src="/images/common/LogoSingle.png" alt=""></img>
          </LogoImageContainer>

          <div className="copyright">
            <div style={{ display: "flex" }}>
              <Copyright>COPYRIGHT BY&nbsp;</Copyright>
              <Copyright style={{ color: "green" }}>SPOCITY</Copyright>
              <Copyright>. ALL RIGHTS RESERVED</Copyright>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "10px",
                whiteSpace: "nowrap",
              }}
            >
              <Text active={1}>이용약관</Text>
              <VerticalBar>
                <Text style={{ fontSize: "9px", cursor: "default" }}>|</Text>
              </VerticalBar>
              <Text active={1}>개인정보취급방침</Text>
              <VerticalBar>
                <Text style={{ fontSize: "9px", cursor: "default" }}>|</Text>{" "}
              </VerticalBar>
              <Text onClick={() => navigate("/notice")} active={1}>
                공지사항
              </Text>
              <VerticalBar>
                <Text style={{ fontSize: "9px", cursor: "default" }}>|</Text>{" "}
              </VerticalBar>
              <Text active={1}>광고 제휴문의</Text>
              <VerticalBar>
                <Text style={{ fontSize: "9px", cursor: "default" }}>|</Text>{" "}
              </VerticalBar>
              <Text active={1}>고객센터</Text>
            </div>
          </div>
        </div>

        <CompanyInfo>
          <Text>
            상호 : 스포시티 대표 : 홍길동 개인정보관리책임자 : 홍길동 Contact :
            test1@test.com
          </Text>
          <Text className="companyInfo2">
            사업자등록번호 : test1 통신판매업: test2
          </Text>
        </CompanyInfo>
      </Imprint>

      <MobileFooter
        setMobileMenu={setMobileMenu}
        mobileMeunu={mobileMenu}
      ></MobileFooter>
    </Wrapper>
  );
};

export default Footer;
