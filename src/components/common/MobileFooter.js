import React, { useState } from "react";
import styled from "styled-components";
import ChatMobile from "../common/ChatMobile";
import { useNavigate, useLocation } from "react-router-dom";

const MobileMenuContainer = styled.div`
  height: calc((100 / 1280) * 100vh);
  background-color: #161717;
  justify-content: space-evenly;
  align-items: center;
  display: none;
  position: fixed;
  bottom: 0;
  z-index: 100000;
  width: 100%;
  @media (max-width: 1100px) {
    display: flex;
  }
`;

const MobileMenuContent = styled.div`
  width: calc((130 / 720) * 100vw);
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.active && "#464947"};
  border-radius: 14px;
`;

const MobileMenuImg = styled.img`
  src: ${(props) => props.img};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;

const MobileMenuText = styled.span`
  color: #fff;
  white-space: nowrap;
  font-family: "Noto Sans KR", sans-serif;
  font-size: calc((20 / 720) * 100vw);
`;

const MobileFooter = ({ setMobileMenu, mobileMenu }) => {
  const [openChat, setOpenchat] = useState(false);
  let navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <MobileMenuContainer>
      <MobileMenuContent
        onClick={() => {
          setMobileMenu(!mobileMenu);
        }}
        active={mobileMenu}
      >
        <MobileMenuImg
          src="/images/main/Menu_mobile.png"
          height="calc((40 / 1280) * 100vh)"
        />
        <MobileMenuText>메뉴</MobileMenuText>
      </MobileMenuContent>
      <MobileMenuContent
        onClick={() => {
          navigate("/score");
          setMobileMenu(false);
        }}
        active={pathname === "/live"}
      >
        <MobileMenuImg
          src="/images/main/Sidebar1.png"
          height="calc((36 / 1280) * 100vh)"
        />
        <MobileMenuText>라이브스코어</MobileMenuText>
      </MobileMenuContent>
      <MobileMenuContent
        active={false}
        onClick={() => {
          navigate("/broadcast");
          setMobileMenu(false);
        }}
      >
        <MobileMenuImg
          src="/images/main/Sidebar2.png"
          height="calc((39 / 1280) * 100vh)"
        />
        <MobileMenuText>스포츠중계</MobileMenuText>
      </MobileMenuContent>
      <MobileMenuContent
        onClick={() => setOpenchat(!openChat)}
        active={openChat}
      >
        <MobileMenuImg
          src="/images/main/Chat_mobile.png"
          height="calc((33 / 1280) * 100vh)"
        />
        <MobileMenuText>채팅방</MobileMenuText>
      </MobileMenuContent>
      {openChat && <ChatMobile />}
    </MobileMenuContainer>
  );
};

export default MobileFooter;
