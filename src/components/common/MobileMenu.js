import React from "react";
import styled from "styled-components";
import MobileFooter from "../common/MobileFooter";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100 - calc((100 / 1280) * 100vh));
  width: 100vw;
  background-color: #191a19;
  display: flex;
  flex-direction: column;
`;

const MenuListContainer = styled.div`
  flex: 1 0;
  display: flex;
  flex-direction: column;
`;

const TopMenuContainer = styled.div`
  background-color: #202221;
  flex: 1 0;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  padding-top: calc((30 / 1280) * 100vh);
`;

const BottomMenuContainer = styled.div`
  background-color: #202221;
  flex: 2 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  .wrapper {
    width: 100%;
    height: calc((500 / 1280) * 100vh);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;

const ContentsContainer = styled.div`
  width: 80%;
  flex: 1 0;
  border-bottom: ${(props) => !props.end && "1px solid #444"};
  display: flex;
  align-items: center;
`;

const MenuText = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-size: calc((28 / 720) * 100vw);
  font-weight: 500;
  line-height: 3.24;
  letter-spacing: -0.43px;
  text-align: left;
  color: rgba(255, 255, 255, 0.8);
  width: 130px;
  white-space: nowrap;
`;

const Count = styled.div`
  width: calc((60 / 720) * 100vw);
  height: calc((43 / 1280) * 100vh);
  border-radius: 25px;
  background-color: #3b3c3b;
  text-align: center;
  font-family: "Roboto", sans-serif;
  color: #fff;
  font-size: calc((24 / 720) * 100vw);
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 25px;
  margin-top: 2px;
  transform: skew(-1deg);
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SportTitle = styled.span`
  width: 80%;
  height: 12px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: calc((24 / 720) * 100vw);
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  text-align: left;
  color: #ccc;
  margin-top: calc((20 / 1280) * 100vh);
  margin-bottom: calc((30 / 1280) * 100vh);
`;

const Image = styled.img`
  height: ${(props) => props.height};
  margin-right: calc((18 / 720) * 100vw);
`;

const MobileMenu = ({ mobileMenu, setMobileMenu , setSportsType }) => {
  let navigate = useNavigate();
  return (
    <Wrapper>
      <MenuListContainer>
        <TopMenuContainer>
          <ContentsContainer
            onClick={() => {
              navigate("/score/football");
              setMobileMenu(false);
            }}
          >
            <Image
              src={"/images/main/Sidebar1.png"}
              height="calc((32 / 720) * 100vw)"
              alt="sidebar"
            />
            <MenuText>라이브스코어</MenuText>
            <Count>91</Count>
          </ContentsContainer>
          <ContentsContainer
            onClick={() => {
              navigate("/broadcast");
              setMobileMenu(false);
            }}
          >
            <Image
              src={"/images/main/Sidebar2.png"}
              height="calc((35 / 720) * 100vw)"
              alt="sidebar"
            />
            <MenuText>스포츠 중계</MenuText>
          </ContentsContainer>
          <ContentsContainer
            onClick={() => {
              navigate("/highlight");
              setMobileMenu(false);
            }}
          >
            <Image
              src={"/images/main/Sidebar3.png"}
              height="calc((32 / 720) * 100vw)"
              alt="sidebar"
            />
            <MenuText>경기 하이라이트</MenuText>
          </ContentsContainer>
          <ContentsContainer
            end="end"
            onClick={() => {
              navigate("/assurance");
              setMobileMenu(false);
            }}
          >
            <Image
              src={"/images/main/Sidebar4.png"}
              height="calc((32 / 720) * 100vw)"
              alt="sidebar"
            />
            <MenuText>보증업체</MenuText>
          </ContentsContainer>
        </TopMenuContainer>
        <BottomMenuContainer>
          <SportTitle>스포츠</SportTitle>
          <div className="wrapper">
            <ContentsContainer
              onClick={() => {
                navigate("/score/football");
                setMobileMenu(false);
                setSportsType("soccer")
              }}
            >
              <Image
                src={"/images/main/Sports1.png"}
                height="calc((32 / 720) * 100vw)"
                alt="sidebar"
              />
              <MenuText>축구</MenuText>
            </ContentsContainer>
            <ContentsContainer
              onClick={() => {
                navigate("/score/football");
                setMobileMenu(false);
                setSportsType("basketball")
              }}
            >
              <Image
                src={"/images/main/Sports2.png"}
                height="calc((32 / 720) * 100vw)"
                alt="sidebar"
              />
              <MenuText>농구</MenuText>
            </ContentsContainer>
            <ContentsContainer
              onClick={() => {
                navigate("/score/baseball");
                setMobileMenu(false);
                setSportsType("baseball")
              }}
            >
              <Image
                src={"/images/main/Sports3.png"}
                height="calc((32 / 720) * 100vw)"
                alt="sidebar"
              />
              <MenuText>야구</MenuText>
            </ContentsContainer>
            <ContentsContainer
              onClick={() => {
                navigate("/score/volleyball");
                setMobileMenu(false);
                setSportsType("volleyball")
              }}
            >
              <Image
                src={"/images/main/Sports4.png"}
                height="calc((32 / 720) * 100vw)"
                alt="sidebar"
              />
              <MenuText>배구</MenuText>
            </ContentsContainer>
            <ContentsContainer
              end="end"
              onClick={() => {
                navigate("/score/tennis");
                setMobileMenu(false);
                setSportsType("tennis")
              }}
            >
              <Image
                src={"/images/main/Sports5.png"}
                height="calc((32 / 720) * 100vw)"
                alt="sidebar"
              />
              <MenuText>테니스</MenuText>
            </ContentsContainer>
          </div>
        </BottomMenuContainer>
      </MenuListContainer>
      <MobileFooter
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
      ></MobileFooter>
    </Wrapper>
  );
};

export default MobileMenu;
