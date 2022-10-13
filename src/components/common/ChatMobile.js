import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wrapper = styled.div`
  width: 100vw;
  height: calc((600 / 1280) * 100vh);
  position: absolute;
  bottom: calc((100 / 1280) * 100vh);
  z-index: 100;
  display: flex;
  flex-direction: column;
  filter: ${(props) => (props.reportPopup ? "brightness(0.1)" : "")};
`;

const TabContainer = styled.div`
  width: 100%;
  background-color: #202221;
  display: flex;
  flex: 1 0 calc((70 / 1280) * 100vh);
`;

const TabContents = styled.div`
  flex: 2 0;
  margin-left: calc((32 / 720) * 100vw);
  display: flex;
`;

const IconContents = styled.div`
  flex: 1 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  img {
    height: ${(props) => props.height};
  }
`;

const TabTitle = styled.div`
  height: 16px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: calc((22 / 720) * 100vw);
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  /* line-height: 16px; */
  letter-spacing: -0.4px;
  text-align: left;
  color: #fff;
  margin-left: 7px;
  opacity: ${(props) => props.opacity || 1};
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;

const Icon = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  img {
  }
`;

const IconText = styled.span`
  height: 16px;
  margin-left: 6px;
  font-family: "Roboto", sans-serif;
  font-size: calc((20.5 / 720) * 100vw);
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;

const AnnouncementContainer = styled.div`
  width: 100%;
  background-color: #3b3c3b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0 15px;
  position : ${(props) =>
    props.announcement
      ? "absolute"
      : "relative"};
  top : ${(props) =>
    props.announcement
      ? "37px"
      : "0"};
  z-index : 20;
  flex: 1 0
    ${(props) =>
      props.announcement
        ? "calc((70 / 1280) * 100vh)"
        : "calc((50 / 1280) * 100vh)"};
`;

const Announcement = styled.div`
  width: 80vw;
  height: 100%;
  font-family: "Noto Sans KR", sans-serif;
  font-size: calc((20 / 720) * 100vw);
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: ${(props) =>
    props.announcement
      ? "alc((0 / 1280) * 100vh)"
      : "calc((50 / 1280) * 100vh)"};
  letter-spacing: -0.35px;
  color: #fff;
  margin-left: 5px;

  ${(props) =>
    props.announcement
      ? ""
      : css`
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        `};
`;

const ChatContainer = styled.div`
  width: 100%;
  /* height: ${(props) => (props.announcement ? "58%" : "63%")};
   */
  flex-grow: 1;
  display: inline-block;
  overflow-y: scroll;
  position: relative;
  background-color: #202221;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${(props) =>
    props.announcement
      ? "31px"
      : "5px"};
`;

const ChatContents = styled.div`
  width: 90%;
  height: calc((70 / 1280) * 100vh);
  margin: 0 0 6px;
`;

const SeepchBubble = styled.div`
  width: 100%;
  height: calc((40 / 1280) * 100vh);
  padding: 6px 0px 6px 9px;
  border-radius: 5px;
  background-color: #515151;

  font-family: "Noto Sans KR", sans-serif;
  font-size: calc((20 / 720) * 100vw);
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.35px;
  color: #fff;
  display: flex;
  align-items: center;
`;

const Class = styled.div`
  width: calc((23 / 1280) * 100vh);
  height: calc((23 / 1280) * 100vh);
  border-radius: 8px;
  background: ${(props) => props.background};
  font-family: "Roboto", sans-serif;
  font-size: calc((16 / 720) * 100vw);
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 10px;
  letter-spacing: normal;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: calc((6 / 720) * 100vw);
`;

const ClassText = styled.span`
  font-family: "Noto Sans KR", sans-serif;
  font-size: calc((18 / 720) * 100vw);
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.3px;
  color: #fff;
  cursor: pointer;
`;

const UserMenuContainer = styled.div`
  width: calc((149 / 720) * 100vw);
  height: calc((138 / 1280) * 100vh);
  margin: 7px 175px 48px 41px;
  padding: 0px 1px 6px 0;
  object-fit: contain;
  border-radius: 6px;
  border: solid 1px #7d7d7d;
  background-color: #2c2d2d;
  position: absolute;
  top: -10px;
  left: -45px;
  z-index: 1000;
  display: flex;
  flex-direction: column;

  & > div.nickname {
    width: 100%;
    height: 100%;
    border-top: solid 1px #7d7d7d;
    display: flex;
    flex-direction: column;
    align-content: space-around;
  }
`;

const MenuNickname = styled.span`
  margin: 0px 0px 0px 6px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: calc((19.5 / 720) * 100vw);
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 20px;
  letter-spacing: -0.3px;
  text-align: left;
  color: #099f3c;
  flex: 0 1 calc((38 / 1280) * 100vh);
  display: inline-block;
  display: flex;
  align-items: center;
`;

const MenuTextContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  height: 40%;
  margin: 2px 2px;
  border-radius: 5px;
  &:hover {
    background-color: #19793a;
  }
`;

const MenuText = styled.p`
  /* margin: 7px 0px 7px 6px; */
  margin-left: 6px;
  object-fit: contain;
  font-family: "Noto Sans KR", sans-serif;
  font-size: calc((19.5 / 720) * 100vw);
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.3px;
  color: #fff;
  cursor: pointer;
`;

const MessegeContainer = styled.div`
  width: 100%;
  height: calc((90 / 1280) * 100vh);
  background-color: #2c2d2d;
  display: flex;
  justify-content: space-around;
  padding: 0 10px;
  flex: 1 0
    ${(props) =>
      props.inputFocus
        ? "calc((110 / 1280) * 100vh)"
        : "calc((90 / 1280) * 100vh)"};
  align-items: ${(props) => (props.inputFocus ? "flex-start" : "center")};

  .smile {
    width: calc((30 / 720) * 100vw);
    margin-right: calc((20 / 720) * 100vw);
    cursor: pointer;
  }
`;

const MessegeInput = styled.div`
  width: calc((604 / 720) * 100vw);
  border-radius: 6px;
  background-color: #202221;
  display: flex;

  align-items: center;
  margin: auto 0;
  margin-right: 5px;
  border: ${(props) => (props.inputFocus ? "1px solid #099f3c" : "none")};
  height: ${(props) =>
    props.inputFocus
      ? "calc((90 / 1280) * 100vh)"
      : "calc((60 / 1280) * 100vh)"};

  textarea::placeholder {
    font-family: "Noto Sans KR", sans-serif;
    font-size: calc((22 / 720) * 100vw);
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.33px;
    color: rgba(255, 255, 255, 0.5);
    margin: auto 0;
  }

  textarea:focus::placeholder {
    color: transparent;
  }

  textarea {
    caret-color: #fff;
    font-family: "Noto Sans KR", sans-serif;
    font-size: calc((22 / 720) * 100vw);
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.33px;
    color: rgba(255, 255, 255, 0.5);
    /* height: calc((60 / 1280) * 100vh); */
    /* padding: calc((10 / 1280) * 100vh) 0; */
    margin-left: 15px;
    background: transparent;
    border: none;
    width: calc((604 / 720) * 100vw);
    overflow: hidden;
    resize: none;
    color: #fff;

    /* ${(props) => (props.inputFocus ? "72px" : "18px")} */
  }
`;

const ArrowContainer = styled.div`
  width: calc((65 / 720) * 100vw);
  height: ${(props) =>
    props.inputFocus
      ? "calc((90 / 1280) * 100vh)"
      : "calc((60 / 1280) * 100vh)"};
  object-fit: contain;
  border-radius: 6px;
  background-color: #202221;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto 0;
  cursor: pointer;
  &:active {
    transform: scale(0.95);
  }
  img {
    width: calc((28 / 720) * 100vw);
  }
`;

const RegulationBack = styled.div`
  width: 100%;
  height: calc((725 / 1280) * 100vh);
  background-color: #202221;
  overflow: hidden;
  overflow-y: auto;
`;

const RegulationWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
`;

const RegulationContainer = styled.div`
  width: 100%;
  background-color: #202221;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RegulationContents = styled.div`
  width: 90%;
  display: flex;
  border-radius: 12px;
  flex-direction: column;
  background-color: #2c2d2d;
  padding: 2rem;
`;

const RegulationTitle = styled.p`
  width: 90%;
  height: calc((25 / 1280) * 100vh);
  margin: 0 0px 18px 0;
  object-fit: contain;
  font-family: "Noto Sans KR", sans-serif;
  font-size: calc((24 / 720) * 100vw);
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.8px;
  text-align: left;
  color: #fff;
  margin-top: 1rem;
`;

const RegulationText = styled.p`
  margin: 10px 0 0;
  object-fit: contain;
  opacity: 0.7;
  font-family: "Noto Sans KR", sans-serif;
  font-size: calc((22 / 720) * 100vw);
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.65px;
  text-align: left;
  color: rgba(255, 255, 255, 0.7);
`;

const Rectangle = styled.button`
  width: 90%;
  height: calc((71 / 1280) * 100vh);
  object-fit: contain;
  border-radius: 6px;
  background-color: #19793a;
  margin: 38px 0;

  font-family: "Noto Sans KR", sans-serif;
  font-size: calc((24 / 1280) * 100vh);
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  /* line-height: 2; */
  letter-spacing: -0.75px;
  text-align: center;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.verification
      ? css`
          background-color: #50504d;
          cursor: default;
        `
      : css`
          &:hover {
            filter: brightness(1.1);
          }
          &:active {
            transform: scale(0.95);
            transition: all 0.1s ease-in-out;
          }
        `}
`;

const ReportRectangle = styled.button`
  width: 100%;
  height: calc((80 / 1280) * 100vh);
  object-fit: contain;
  border-radius: 6px;
  background-color: #19793a;
  margin-top: calc((40 / 1280) * 100vh);

  font-family: "Noto Sans KR", sans-serif;
  font-size: calc((28 / 720) * 100vw);
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  /* line-height: 2; */
  letter-spacing: -0.75px;
  text-align: center;
  color: #fff;
  &:hover {
    filter: brightness(1.1);
  }
  &:active {
    transform: scale(0.95);
    transition: all 0.1s ease-in-out;
  }
`;

const UserReportContainer = styled.div`
  width: calc((640 / 720) * 100vw);
  height: calc((369 / 1280) * 100vh);
  object-fit: contain;
  border-radius: 8px;
  background-color: #202221;
  position: absolute;
  bottom: 200%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100000;
  padding: 0 calc((40 / 720) * 100vw);
`;

const TitleContainer = styled.div`
  /* height: 21px; */
  margin: calc((40 / 720) * 100vw) 0;
  /* padding: 0 24px 1px 29px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  object-fit: contain;
  font-family: "Noto Sans KR", sans-serif;
  font-size: calc((30 / 720) * 100vw);
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.4px;
  text-align: left;
  color: #fff;
`;

const SelectDefault = styled.div`
  width: calc((560 / 720) * 100vw);
  height: calc((79 / 1280) * 100vh);
  padding: 0px 16px 0px 15px;
  object-fit: contain;
  border-radius: 6px;
  border: solid 1px #333;
  background-color: #191a1a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding-left: calc((30 / 720) * 100vw);
`;

const SelectText = styled.span`
  font-family: "Noto Sans KR", sans-serif;
  font-size: calc((24 / 720) * 100vw);
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  /* line-height: 100px; */
  letter-spacing: -0.35px;
  text-align: left;
  color: #fff;
`;

const SelectFullContainer = styled.div`
  width: calc((560 / 720) * 100vw);
  height: calc((604 / 1280) * 100vh);
  object-fit: contain;
  border-radius: 6px;
  border: solid 1px #333;
  background-color: #191a1a;
  position: absolute;
`;

const SelectFullTop = styled.div`
  width: 100%;
  height: calc((79 / 1280) * 100vh);
  margin: 1px 0;
  padding: 0px 16px 0px 16px;
  object-fit: contain;
  border-bottom: solid 1px #333;
  background-color: #191a1a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding-left: calc((30 / 720) * 100vw);
`;

const SelectContentsWrapper = styled.div`
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  justify-content: space-around;
  margin-top: 5px;
  height: calc((525 / 1280) * 100vh);
`;

const SelectContents = styled.div`
  object-fit: contain;
  border-radius: 5px;
  cursor: pointer;
  padding-left: calc((30 / 720) * 100vw);

  font-family: "Noto Sans KR", sans-serif;
  font-size: calc((24 / 720) * 100vw);
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 25px;
  letter-spacing: -0.35px;
  text-align: left;
  color: #fff;
  flex: 1;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #19793a;
  }
`;

const Toast = styled.div`
  * {
    vertical-align: middle;
    font-size: calc((24 / 720) * 100vw);
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.35px;
    text-align: left;
    color: #fff;
  }

  span {
    margin-right: 5px;
  }

  img {
    width: calc((31 / 720) * 100vw);
  }
`;

const ToastTop = styled.div`
  display: flex;
  align-items: center;

  font-size: calc((24 / 720) * 100vw);
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.35px;
  text-align: left;
  color: #fff;

  span {
    font-weight: bold;
    color: ${(props) => props.color};
  }

  img {
    width: calc((50 / 720) * 100vw);
    margin-right: 6px;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc((50 / 720) * 100vw);
    height: calc((50 / 720) * 100vw);
    background-image: url("/images/toast/VIP.png");
    background-size: cover;
    background-position: center;
    font-family: "Roboto", sans-serif;
    font-size: calc((19.5 / 720) * 100vw);
    font-weight: 900;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: 0.6px;
    text-align: left;
    color: #fff;
    margin-right: 6px;
  }
`;

const EmojiContainer = styled.div`
  width: calc((690 / 720) * 100vw);
  height: calc((224 / 1280) * 100vh);
  object-fit: contain;
  background-color: #202221;
  position: absolute;
  bottom: calc((90 / 1280) * 100vh);
  /* left: 8px; */
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(36px, auto));
  grid-template-rows: repeat(auto-fill, minmax(36px, auto));
  row-gap: 15px;
  column-gap: 7px;
  box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.39);
  overflow-y: auto;
`;

const Emoji = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  width: 36px;
  height: 36px;
  margin: auto;
  padding: 6px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #515151;
  position: relative;
  cursor: pointer;
  background-image: ${(props) => `url(${props.img})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 26px;
  :hover {
    background-color: #161717;
  }

  ${(props) =>
    props.lock &&
    css`
      &::before {
        content: "";
        width: 36px;
        height: 36px;
        background-image: url("/images/chat/lock.png");
        z-index: 2;
        top: 0;
        position: absolute;
        background-size: 14px 15px;
        background-position: center;
        background-repeat: no-repeat;
      }

      &::after {
        content: "";
        display: flex;
        background-color: #515151;
        position: absolute;
        width: 36px;
        height: 36px;
        top: 0;
        border-radius: 6px;
        background: rgba(0, 0, 0, 0.5);
        background-size: 14px 15px;
        background-position: center;
        background-repeat: no-repeat;
        z-index: 1;
      }
    `}
`;

const ChatMobile = () => {
  const [tab, setTab] = useState(1);
  const [inputFocus, setInputFocus] = useState(false);
  const [announcement, setAnnouncement] = useState(false);
  const [reportPopup, setReportPopup] = useState(false);
  const [openSelect, setOpenSelect] = useState({
    open: false,
    text: "신고이유 선택",
  });
  const chatRef = useRef();

  const scrollToBottom = () => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };

  const detectBottom = () => {
    const scrollTop = chatRef.current?.scrollTop;
    const clientHeight = chatRef.current?.clientHeight;
    const scrollHeight = chatRef.current?.scrollHeight;
    setIsScrollBottom(scrollTop + clientHeight >= scrollHeight);
  };

  const [isScrollBottom, setIsScrollBottom] = useState(false);
  const [verification, setVerification] = useState(false);
  const [userMenuIndex, setUserMenuIndex] = useState(-1);
  const [emoji, setEmoji] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", clickModalOutside);

    return () => {
      document.removeEventListener("mousedown", clickModalOutside);
    };
  });

  const clickModalOutside = (e) => {
    if (
      e.target.className.indexOf("nickname") === -1 &&
      e.target.parentNode.className.indexOf("nickname") === -1
    ) {
      setUserMenuIndex(-1);
    }
  };

  const tierConversion = (tier) => {
    switch (tier) {
      case "Bronze":
        return ["B", "#9a624e"];
      case "Silver":
        return ["S", "#6690a0"];
      case "Gold":
        return ["G", "#ba963e"];
      case "Platinum":
        return ["P", "#aba349"];
      case "Diamonds":
        return ["D", "#665eb3"];
      case "Admin":
        return ["A", "linear-gradient(to right, #00e03b, #00a4f0);"];
      default:
        return "";
    }
  };

  const tmpList = [
    {
      tier: "Bronze",
      nickname: "스페이스",
      text: "스포시티 채팅방 채팅메시지가 노출됩니다",
    },
    {
      tier: "Silver",
      nickname: "스페이스",
      text: "스포시티 채팅방 채팅메시지가 노출됩니다",
    },
    {
      tier: "Gold",
      nickname: "스페이스",
      text: "스포시티 채팅방 채팅메시지가 노출됩니다",
    },
    {
      tier: "Platinum",
      nickname: "스페이스",
      text: "스포시티 채팅방 채팅메시지가 노출됩니다",
    },
    {
      tier: "Diamonds",
      nickname: "스페이스",
      text: "스포시티 채팅방 채팅메시지가 노출됩니다",
    },
    {
      tier: "Admin",
      nickname: "스페이스",
      text: "스포시티 채팅방 채팅메시지가 노출됩니다",
    },
  ];

  const onToastPopup = () => {
    toast(
      <Toast>
        <span>관리자가 유저를 채팅금지 시켰을때 나오는 알림 메세지</span>
        <img src="/images/toast/error.png" alt="" />
      </Toast>,
      {
        position: "bottom-center",
        icon: false,
        className: "toast-error",
      }
    );

    toast(
      <Toast>
        <span>내용이 없어서 아이콘을 만들수 없습니다</span>
      </Toast>,
      {
        position: "bottom-center",
        icon: false,
        className: "toast-no-content",
      }
    );

    toast(
      <Toast>
        <span>
          채팅금지를 당한 유저가 메세지를 입력했을때 채팅치려면 몇분남았다고
          뜨는 알림 메세지
        </span>
        <img src="/images/toast/time.png" alt="" />
      </Toast>,
      {
        position: "bottom-center",
        icon: false,
        className: "toast-time",
      }
    );

    toast(
      <Toast>
        <span>관리자가 채팅청소를 했을시 나오는 알림 메세지</span>
        <img src="/images/toast/eraser.png" alt="" />
      </Toast>,
      {
        position: "bottom-center",
        icon: false,
        className: "toast-eraser",
      }
    );

    toast(
      <Toast>
        <span>
          스포시티 가입을 환영해요. 채팅방 규정을 확인 해야 채팅할 수 있어요
        </span>
        <img src="/images/toast/message.png" alt="" />
      </Toast>,
      {
        position: "bottom-center",
        icon: false,
        className: "toast-wellcom",
      }
    );

    toast(
      <Toast>
        <span>
          채팅 삭제 완료, 채팅 금지 완료, 채팅 삭제 완료 채팅 금지 완료
        </span>
        <img src="/images/toast/check.png" alt="" />
      </Toast>,
      {
        position: "bottom-center",
        icon: false,
        className: "toast-check",
      }
    );
  };

  const TopToastPopup = () => {
    toast(
      <ToastTop color="#18e25d">
        <div>VIP</div>
        <p>
          <span>스포시티</span>님이 채팅방에 입장하셨습니다.
        </p>
      </ToastTop>,
      {
        position: toast.POSITION.BOTTOM_CENTER,
        icon: false,
        className: "toast-enter",
      }
    );

    toast(
      <ToastTop color="#bc7bff">
        <img src="/images/toast/message-pupple.png" alt=""></img>
        <p>
          <span>스포시티</span> : 확성기 메시지 내용이 많이 나올 경우
          2줄일경우에는 이렇게 나옵니다
        </p>
      </ToastTop>,
      {
        position: toast.POSITION.BOTTOM_CENTER,
        icon: false,
        className: "toast-message",
      }
    );
  };

  const tmpEmojiList = [
    { img: "/images/chat/emoji1.png", lock: false },
    { img: "/images/chat/emoji2.png", lock: true },
    { img: "/images/chat/emoji3.png", lock: false },
    { img: "/images/chat/emoji4.png", lock: false },
    { img: "/images/chat/emoji5.png", lock: false },
  ];


  console.log(announcement)

  return (
    <>
      <Wrapper reportPopup={reportPopup}>
        <TabContainer>
          <TabContents>
            <Tab
              tab={1}
              onClick={() => setTab(1)}
              style={{
                borderBottom: `${tab === 1 ? "2px solid #099f3c" : ""}`,
              }}
              height="calc((25 / 1280) * 100vh)"
            >
              <img src="/images/chat/ChatBubble.png" alt=""></img>
              <TabTitle>공개 채팅방</TabTitle>
            </Tab>
            <Tab
              tab={2}
              onClick={() => setTab(2)}
              style={{
                borderBottom: `${tab === 2 ? "2px solid #099f3c" : ""}`,
                marginLeft: "calc((31 / 720) * 100vw)",
              }}
              height="calc((23 / 1280) * 100vh)"
            >
              <img src="/images/chat/Regulation.png" alt=""></img>
              <TabTitle>채팅방 규정</TabTitle>
            </Tab>
          </TabContents>
          <IconContents>
            <Icon>
              <img
                src="/images/chat/Human.png"
                alt=""
                style={{ height: "calc((23 / 1280) * 100vh)" }}
              ></img>
              <IconText onClick={TopToastPopup}>2,308명</IconText>
            </Icon>
            <img
              src="/images/chat/Eraser.png"
              alt=""
              style={{
                height: "calc((21 / 1280) * 100vh)",
                cursor: "pointer",
                marginRight: "15px",
                marginLeft: "10px",
              }}
            ></img>
          </IconContents>
        </TabContainer>
        {tab === 1 && (
          <>
            <AnnouncementContainer
              announcement={announcement}
              onClick={() => setAnnouncement(!announcement)}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <img
                  src="/images/chat/Loudspeaker.png"
                  alt=""
                  style={{ height: "calc((41 / 1280) * 100vh)" }}
                ></img>
                <Announcement announcement={announcement}>
                  공지를 안내해드립니다 즐겁고 재밌게 시청하세요! 모두 행복한
                  하루되세요!!
                </Announcement>
              </div>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src="/images/chat/ArrowDown.png"
                  alt=""
                  style={{
                    height: "calc((10 / 1280) * 100vh)",
                    transform: `${
                      announcement ? "rotate(180deg)" : "rotate(0deg)"
                    }`,
                    transition: "transform 0.2s linear",
                  }}
                ></img>
              </div>
            </AnnouncementContainer>
            <ChatContainer
              ref={chatRef}
              onScroll={detectBottom}
              announcement={announcement}
              inputFocus={inputFocus}
            >
              {[...tmpList, ...tmpList, ...tmpList, ...tmpList, ...tmpList].map(
                (item, idx) => (
                  <>
                    <ChatContents>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "calc((3 / 1280) * 100vh)",
                        }}
                      >
                        <img
                          src={`/images/chat/${item.tier}.png`}
                          alt=""
                          style={{
                            height: "calc((26 / 1280) * 100vh)",
                            marginRight: "calc((6 / 720) * 100vw)",
                          }}
                        ></img>
                        <Class background={tierConversion(item.tier)[1]}>
                          {tierConversion(item.tier)[0]}
                        </Class>
                        <ClassText
                          style={{ position: "relative" }}
                          onClick={() => setUserMenuIndex(idx)}
                          className="nickname"
                        >
                          스페이스
                          {userMenuIndex === idx && (
                            <UserMenuContainer className="nickname">
                              <MenuNickname className="nickname">
                                스페이스
                              </MenuNickname>
                              <div className="nickname">
                                <MenuTextContainer>
                                  <MenuText
                                    className="nickname"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setUserMenuIndex(-1);
                                      setReportPopup(true);
                                      setOpenSelect({
                                        open: false,
                                        text: "신고이유 선택",
                                      });
                                    }}
                                  >
                                    채팅 신고하기
                                  </MenuText>
                                </MenuTextContainer>
                                <MenuTextContainer>
                                  <MenuText className="nickname">
                                    채팅 안보기
                                  </MenuText>
                                </MenuTextContainer>
                              </div>
                            </UserMenuContainer>
                          )}
                        </ClassText>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <SeepchBubble>{item.text}</SeepchBubble>
                      </div>
                    </ChatContents>
                  </>
                )
              )}
              {!isScrollBottom && (
                <img
                  src="/images/chat/ArrowToBottom.png"
                  alt=""
                  style={{
                    width: "calc((50 / 720) * 100vw)",
                    height: "calc((30 / 1280) * 100vh)",
                    position: "fixed",
                    bottom: `${
                      inputFocus
                        ? "calc((220 / 1280) * 100vh)"
                        : "calc((190 / 1280) * 100vh)"
                    }`,
                    // top: 50%;
                    // left: 50%;
                    // transform: translate(-50%, -50%);
                    cursor: "pointer",
                  }}
                  onClick={scrollToBottom}
                ></img>
              )}
            </ChatContainer>
            <MessegeContainer inputFocus={inputFocus}>
              <MessegeInput inputFocus={inputFocus}>
                <textarea
                  rows={inputFocus ? 2 : 1}
                  style={{ cursor: `${inputFocus ? "" : "pointer"}` }}
                  placeholder="메시지 보내기"
                  onFocus={() => setInputFocus(true)}
                  onBlur={() => setInputFocus(false)}
                  onKeyDown={(e) => {
                    if (e.shiftKey && e.key === "Enter") {
                    } else if (e.key === "Enter") e.preventDefault();
                  }}
                ></textarea>
                <img
                  className="smile"
                  src="/images/chat/smile.png"
                  alt=""
                  onClick={() => setEmoji(!emoji)}
                ></img>
              </MessegeInput>
              <ArrowContainer
                inputFocus={inputFocus}
                onClick={() => onToastPopup()}
              >
                <img src="/images/chat/SendMessege.png" alt=""></img>
              </ArrowContainer>
              {emoji && (
                <EmojiContainer>
                  {[
                    ...tmpEmojiList,
                    ...tmpEmojiList,
                    ...tmpEmojiList,
                    ...tmpEmojiList,
                    ...tmpEmojiList,
                    ...tmpEmojiList,
                  ].map((item) => (
                    <Emoji img={item.img} lock={item.lock}></Emoji>
                  ))}
                </EmojiContainer>
              )}
            </MessegeContainer>
          </>
        )}
        {tab === 2 && (
          <RegulationBack>
            <RegulationWrapper>
              <RegulationContainer>
                <RegulationTitle>
                  채팅차단이 되는 경우(차단수위)
                </RegulationTitle>
                <RegulationContents>
                  <RegulationText>
                    1. 불법사이트 링크 및 불법언급(영구차단)
                  </RegulationText>
                  <RegulationText>
                    2. 저작권위반,까페,블로그,카톡 링크(영구차단)
                  </RegulationText>
                  <RegulationText>
                    3. 운영진 비방 및 욕설(영구차단)
                  </RegulationText>
                  <RegulationText>
                    4. 국내 타 스코어 사이트 명시,링크(영구차단)
                  </RegulationText>
                  <RegulationText>
                    5. 의도적인 스코어 거짓중계(영구차단)
                  </RegulationText>
                  <RegulationText>
                    6. 일반,낚시성 거짓중계(30일차단)
                  </RegulationText>
                  <RegulationText>
                    7. 타회원 부모,가족욕설(아이디 삭제/형사 고소 협조)
                  </RegulationText>
                  <RegulationText>
                    8. 지역감정유발/기타 분란 행위(영구차단)
                  </RegulationText>
                  <RegulationText>
                    9. 욕설/싸움/기타 비매너 행위(15일차단)
                  </RegulationText>
                  <RegulationText>
                    10. 타회원 비하 발언(호구, 목돌아간)(50일차단)
                  </RegulationText>
                  <RegulationText></RegulationText>
                  <RegulationText></RegulationText>
                </RegulationContents>
                <RegulationTitle>
                  대화가 금지되는 경우 (금지시간)
                </RegulationTitle>
                <RegulationContents>
                  <RegulationText>1. 도배(60분)</RegulationText>
                  <RegulationText>
                    2. ㄹㄷ어ㅇㅁ 같은 무의미한 단어반복(30분)
                  </RegulationText>
                  <RegulationText>
                    3. 관심을 끌기위한 대화반복(15분)
                  </RegulationText>
                  <RegulationText>
                    4. 불법사이트를 유도하기 대화라고 판단되는 경우(30분)
                  </RegulationText>
                  <RegulationText>
                    5. 기타 채팅창 분위기를 해치고 있다고 판단되어 경고가 필요한
                    경우(20분)
                  </RegulationText>
                </RegulationContents>
                <Rectangle
                  onClick={() => setVerification(true)}
                  verification={verification}
                >
                  <span>네, 알겠습니다</span>
                  {verification && (
                    <img
                      src="/images/common/LogoSingle.png"
                      alt=""
                      style={{ height: "50%", marginLeft: "3px" }}
                    ></img>
                  )}
                </Rectangle>
              </RegulationContainer>
            </RegulationWrapper>
          </RegulationBack>
        )}
      </Wrapper>
      {reportPopup && (
        <UserReportContainer>
          <TitleContainer>
            <Title>유저 '스페이스' 신고하기</Title>
            <img
              src="/images/common/Close.png"
              alt=""
              style={{ width: "calc((28 / 720) * 100vw)", cursor: "pointer" }}
              onClick={() => setReportPopup(false)}
            ></img>
          </TitleContainer>
          {openSelect.open ? (
            <SelectFullContainer>
              <SelectFullTop
                onClick={() => setOpenSelect({ ...openSelect, open: false })}
                style={{ borderRadius: "6px 6px 0 0" }}
              >
                <SelectText>{openSelect.text}</SelectText>
                <img
                  src="/images/chat/ArrowDown.png"
                  alt=""
                  style={{
                    width: "calc((18 / 720) * 100vw)",
                    cursor: "pointer",
                  }}
                  // onClick={() => setRankingModal(false)}
                ></img>
              </SelectFullTop>
              <SelectContentsWrapper>
                <SelectContents
                  onClick={() => setOpenSelect({ open: false, text: "욕설" })}
                >
                  욕설
                </SelectContents>
                <SelectContents
                  onClick={() =>
                    setOpenSelect({ open: false, text: "거짓중계" })
                  }
                >
                  거짓중계
                </SelectContents>
                <SelectContents
                  onClick={() => setOpenSelect({ open: false, text: "비매너" })}
                >
                  비매너
                </SelectContents>
                <SelectContents
                  onClick={() => setOpenSelect({ open: false, text: "도배" })}
                >
                  도배
                </SelectContents>
                <SelectContents
                  onClick={() =>
                    setOpenSelect({ open: false, text: "불법광고" })
                  }
                >
                  불법광고
                </SelectContents>
                <SelectContents
                  onClick={() =>
                    setOpenSelect({ open: false, text: "관심끌기" })
                  }
                >
                  관심끌기
                </SelectContents>
                <SelectContents
                  onClick={() =>
                    setOpenSelect({ open: false, text: "타회원비하" })
                  }
                >
                  타회원비하
                </SelectContents>
              </SelectContentsWrapper>
            </SelectFullContainer>
          ) : (
            <SelectDefault
              onClick={() => setOpenSelect({ ...openSelect, open: true })}
            >
              <SelectText>{openSelect.text}</SelectText>
              <img
                src="/images/chat/ArrowDown.png"
                alt=""
                style={{ width: "calc((18 / 720) * 100vw)", cursor: "pointer" }}
                // onClick={() => setRankingModal(false)}
              ></img>
            </SelectDefault>
          )}
          <ReportRectangle>채팅신고하기</ReportRectangle>
          {/* <ToastContainer containerId="mobile"></ToastContainer> */}
        </UserReportContainer>
      )}
    </>
  );
};

export default ChatMobile;
