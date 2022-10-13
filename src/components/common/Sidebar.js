import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  /* width: ${(props) => (props.openSidebar ? "240px" : "48px")}; */
  height: 100vh;
  flex: ${(props) => (props.openSidebar ? "0 0 240px" : "0 0 48px")};
  display: ${(props) => (props.fullScreen ? "none" : "block")};

  @media (max-width: 1100px) {
    display: none;
  }
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 56px;
  background-color: rgba(22, 23, 23, 1.1);
  display: flex;
  align-items: center;
  padding-left: 30px;
  cursor: pointer;
  img:active {
    transform: scale(0.95);
  }
`;

const Boundary = styled.div`
  height: 16px;
  background: linear-gradient(#0c0d0d, #161717);
`;

const NavigationContainer = styled.div`
  height: calc(100% - 56px - 16px);
  background-color: #161717;
  padding: 0 10px;
`;

const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 193px;
`;

const Count = styled.div`
  width: 35px;
  height: 25px;
  border-radius: 12.5px;
  background-color: #3b3c3b;
  text-align: center;
  font-family: "Roboto", sans-serif;
  color: #fff;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 25px;
  margin-top: 2px;
  transform: skew(-1deg);
`;

const MenuContents = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 20px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    button {
      color: rgba(255, 255, 255, 1);
    }
    ${Count} {
      background-color: #000;
    }
  }
  &:active {
    transform: scale(0.95);
    transition: all 0.1s ease-in-out;
  }
`;

const MenuText = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 17px;
  font-weight: 500;
  line-height: 3.24;
  letter-spacing: -0.43px;
  text-align: left;
  color: rgba(255, 255, 255, 0.8);
  width: 130px;
`;

const SpotsContainer = styled.div`
  height: 236px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 81px;
`;

const SportTitle = styled.span`
  width: 100%;
  height: 12px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  text-align: left;
  color: #ccc;
  margin-bottom: 20px;
  padding-left: 30px;
`;

const OnoffButton = styled.div`
  width: 34px;
  height: 34px;
  background-color: #2c2d2d;
  border-radius: 25px;
  position: absolute;
  top: 12px;
  left: ${(props) => (props.openSidebar ? "222px" : "30px")};
  display: flex;
  cursor: pointer;
  &:hover {
    filter: brightness(1.2);
  }
  z-index: 100000;
`;

const Arrow = styled.div`
  &::after {
    content: "";
    display: inline-block;
    width: 5px;
    height: 5px;
    margin-left: ${(props) => (props.openSidebar ? "15px" : "13px")};
    margin-top: 14px;
    border-top: 1.9px solid #fff;
    border-right: 1.9px solid #fff;
    transform: ${(props) =>
      props.openSidebar ? "rotate(225deg)" : "rotate(45deg)"};
    transition: transform 0.2s linear;
  }
`;

const CloseSidebarContainer = styled.div`
  height: calc(100% - 56px - 16px);
  background-color: #161717;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseSidebarIcon = styled.div`
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
  }
`;

const Sidebar = ({ openSidebar, setOpenSidebar, fullScreen ,sportsType, setSportsType}) => {
  const navigate = useNavigate();

  return (
    <Wrapper openSidebar={openSidebar} fullScreen={fullScreen}>
      <OnoffButton
        openSidebar={openSidebar}
        onClick={() => setOpenSidebar(!openSidebar)}
      >
        <Arrow openSidebar={openSidebar}></Arrow>
      </OnoffButton>
      {!openSidebar && (
        <>
          <LogoContainer onClick={() => navigate("/")}></LogoContainer>
          <Boundary />
          <CloseSidebarContainer>
            <CloseSidebarIcon>
              <img
                src={"/images/main/Sidebar1.png"}
                style={{ width: "20px" }}
                alt="sidebar"
              ></img>
            </CloseSidebarIcon>
            <CloseSidebarIcon>
              <img
                src={"/images/main/Sidebar2.png"}
                style={{ width: "20px" }}
                alt="sidebar"
              ></img>
            </CloseSidebarIcon>
            <CloseSidebarIcon>
              <img
                src={"/images/main/Sidebar3.png"}
                style={{ width: "20px" }}
                alt="sidebar"
              ></img>
            </CloseSidebarIcon>
            <CloseSidebarIcon>
              <img
                src={"/images/main/Sidebar4.png"}
                style={{ width: "20px" }}
                alt="sidebar"
              ></img>
            </CloseSidebarIcon>
            <CloseSidebarIcon>
              <img
                src={"/images/main/Sports1.png"}
                style={{
                  width: "18px",
                  height: "18px",
                }}
                alt="sidebar"
              ></img>
            </CloseSidebarIcon>
            <CloseSidebarIcon>
              <img
                src={"/images/main/Sports2.png"}
                style={{
                  width: "18px",
                  height: "18px",
                }}
                alt="sidebar"
              ></img>
            </CloseSidebarIcon>
            <CloseSidebarIcon>
              <img
                src={"/images/main/Sports3.png"}
                style={{
                  width: "18px",
                  height: "18px",
                }}
                alt="sidebar"
              ></img>
            </CloseSidebarIcon>
            <CloseSidebarIcon>
              <img
                src={"/images/main/Sports4.png"}
                style={{
                  width: "18px",
                  height: "18px",
                }}
                alt="sidebar"
              ></img>
            </CloseSidebarIcon>
            <CloseSidebarIcon>
              <img
                src={"/images/main/Sports5.png"}
                style={{
                  width: "18px",
                  height: "18px",
                }}
                alt="sidebar"
              ></img>
            </CloseSidebarIcon>
          </CloseSidebarContainer>
        </>
      )}
      {openSidebar && (
        <>
          <LogoContainer onClick={() => navigate("/")}>
            <img
              src={"/images/main/MainLogo.png"}
              style={{ width: "141px", height: "auto" }}
              alt="logo"
            />
          </LogoContainer>
          <Boundary />
          <NavigationContainer>
            <MenuContainer>
              <MenuContents>
                <img
                  src={"/images/main/Sidebar1.png"}
                  style={{ width: "20px", marginRight: "12px" }}
                  alt="sidebar"
                />

                <MenuText onClick={() =>
                    {
                      navigate("/score/football");
                      setSportsType("soccer")
                    } 
                  }>
                  라이브 스코어
                </MenuText>

                <Count>91</Count>
              </MenuContents>
              <MenuContents onClick={() => navigate("/broadcast")}>
                <img
                  src={"/images/main/Sidebar2.png"}
                  style={{ width: "20px", marginRight: "12px" }}
                  alt="sidebar"
                />
                <MenuText>스포츠 중계</MenuText>
              </MenuContents>
              <MenuContents onClick={() => navigate("/highlight")}>
                <img
                  src={"/images/main/Sidebar3.png"}
                  style={{ width: "20px", marginRight: "12px" }}
                  alt="sidebar"
                />
                <MenuText>경기 하이라이트</MenuText>
              </MenuContents>
              <MenuContents onClick={() => navigate("/assurance")}>
                <img
                  src={"/images/main/Sidebar4.png"}
                  style={{ width: "20px", marginRight: "12px" }}
                  alt="sidebar"
                />
                <MenuText>보증업체</MenuText>
              </MenuContents>
            </MenuContainer>
            <SpotsContainer>
              <SportTitle>스포츠</SportTitle>
              <MenuContents
                onClick={() => navigate("/score/football", { state: "soccer" })}
              >
                <img
                  src={"/images/main/Sports1.png"}
                  style={{
                    width: "18px",
                    marginRight: "12px",
                    marginTop: "5px",
                  }}
                  alt="sidebar"
                />
                <MenuText onClick={() => setSportsType("soccer")}>축구</MenuText>
              </MenuContents>
              <MenuContents
                onClick={() => navigate("/score/basketball", { state: "basketball" })}
              >
                <img
                  src={"/images/main/Sports2.png"}
                  style={{
                    width: "18px",
                    marginRight: "12px",
                    marginTop: "5px",
                  }}
                  alt="sidebar"
                />
                <MenuText onClick={() => setSportsType("basketball")}>농구</MenuText>
              </MenuContents>
              <MenuContents
                onClick={() => navigate("/score/baseball", { state: "baseball" })}
              >
                <img
                  src={"/images/main/Sports3.png"}
                  style={{
                    width: "18px",
                    marginRight: "12px",
                    marginTop: "5px",
                  }}
                  alt="sidebar"
                />
                <MenuText onClick={() => setSportsType("baseball")}>야구</MenuText>
              </MenuContents>
              <MenuContents
                onClick={() => navigate("/score/volleyball", { state: "volleyball" })}
              >
                <img
                  src={"/images/main/Sports4.png"}
                  style={{
                    width: "18px",
                    marginRight: "12px",
                    marginTop: "5px",
                  }}
                  alt="sidebar"
                />
                <MenuText onClick={() => setSportsType("volleyball")}>배구</MenuText>
              </MenuContents>
              <MenuContents
                onClick={() => navigate("/score/tennis", { state: "tennis" })}
              >
                <img
                  src={"/images/main/Sports5.png"}
                  style={{ width: "18px", marginRight: "12px" }}
                  alt="sidebar"
                />
                <MenuText onClick={() => setSportsType("tennis")}>테니스</MenuText>
              </MenuContents>
            </SpotsContainer>
          </NavigationContainer>
        </>
      )}
    </Wrapper>
  );
};

export default Sidebar;
