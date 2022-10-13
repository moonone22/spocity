import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Chart.css"

const Wrapper = styled.div`
  /* width: 330px; */
  flex: 330px 0 0;
  background-color: #2c2d2d;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  filter: ${(props) => (props.reportPopup ? "brightness(0.2)" : "")};

  @media (max-width: 1100px) {
    display: none;
  }
`;

const UserReportContainer = styled.div`
  width: 260px;
  height: 158px;
  object-fit: contain;
  border-radius: 8px;
  background-color: #202221;
  position: absolute;
  top: 319px;
  right: 34px;
  z-index: 1000;
  padding: 0 20px;
`;

const TitleContainer = styled.div`
  height: 21px;
  margin: 18px 0 21px;
  /* padding: 0 24px 1px 29px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  object-fit: contain;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.4px;
  text-align: left;
  color: #fff;
`;

const SelectDefault = styled.div`
  width: 220px;
  height: 33px;
  padding: 0px 16px 0px 15px;
  object-fit: contain;
  border-radius: 6px;
  border: solid 1px #333;
  background-color: #191a1a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const SelectText = styled.span`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  /* line-height: 100px; */
  letter-spacing: -0.35px;
  text-align: left;
  color: #fff;
`;

const SelectFullContainer = styled.div`
  width: 220px;
  height: 257px;
  object-fit: contain;
  border-radius: 6px;
  border: solid 1px #333;
  background-color: #191a1a;
  position: absolute;
`;

const SelectFullTop = styled.div`
  width: 100%;
  height: 33px;
  margin: 1px 0;
  padding: 0px 16px 0px 16px;
  object-fit: contain;
  border-bottom: solid 1px #333;
  background-color: #191a1a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const SelectContentsWrapper = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 5px;
`;

const SelectContents = styled.div`
  width: 200px;
  height: 26px;
  object-fit: contain;
  border-radius: 5px;
  padding-left: 10px;
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
`;

const TabContainer = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #444;
`;

const TabTitle = styled.div`
  height: 16px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.4px;
  text-align: left;
  color: #fff;
  margin-left: 7px;
  opacity: ${(props) => props.opacity || 1};
`;

const MenuContainer = styled.div`
  width: 300px;
  height: 17px;
  margin: 17px 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AnnouncementContainer = styled.div`
  width: 299px;
  height: ${(props) => (props.announcement ? "70px" : "42px")};
  padding: 5px 16px 4px 9px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #3b3c3b;
  margin-top: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const AnnouncementContainerOpen = styled.div`
  width: 299px;
  height: 60px;
  padding: 0px 16px 4px 9px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #3b3c3b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  position : absolute;
  top : 103px;
  z-index : 2;
`;

const Announcement = styled.div`
  width: 220px;
  height: 100%;
  margin-left: 7px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.35px;
  color: #fff;

  ${(props) =>
    props.announcement
      ? ""
      : css`
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        `}
`;

const ChatContainer = styled.div`
  width: 306px;
  height: 820px;
  margin: 10px 0 0 15px;
  object-fit: contain;
  overflow-y: scroll;
  position: absolute;
  top : 143px;
`;

const ChatContents = styled.div`
  width: 300px;
  height: 47px;
  margin: 0 0 6px;
`;

const Class = styled.div`
  width: 16px;
  height: 14px;
  margin: 2px 5px 6px 4px;
  padding: 2px 5px 3px 5px;
  border-radius: 4px;
  background: ${(props) => props.background};
  font-family: "Roboto", sans-serif;
  font-size: 11px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 12px;
  letter-spacing: normal;
  color: rgba(255, 255, 255, 0.8);
`;

const ClassText = styled.span`
  height: 11px;
  object-fit: contain;
  margin: 3px 0 8px 0px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 11px;
  letter-spacing: -0.3px;
  text-align: left;
  color: #fff;
  cursor: pointer;
`;

const SeepchBubble = styled.div`
  width: 290px;
  height: 25px;
  padding: 6px 0px 6px 9px;
  border-radius: 5px;
  background-color: #515151;

  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 12px;
  letter-spacing: -0.35px;
  color: #fff;
`;

const MessegeContainer = styled.div`
  width: 330px;
  height: ${(props) => (props.inputFocus ? "100px" : "56px")};
  padding: 0 0 10px;
  object-fit: contain;
  background-color: #2c2d2d;
  border-top: 1px solid #444444;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-top: auto;
  position: relative;
`;

const MessegeInput = styled.div`
  width: 264px;
  height: ${(props) => (props.inputFocus ? "72px" : "36px")};
  border-radius: 6px;
  background-color: #202221;
  display: flex;
  align-items: center;
  margin-top: 10px;
  border: ${(props) => (props.inputFocus ? "1px solid #099f3c" : "none")};
  
  img {
    width: 16px;
    margin-right: 10px;
    cursor: pointer;
    z-index : 2;
  }

  &::-webkit-textarea-placeholder {
    opacity: 0.5;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.33px;
    color: rgba(255, 255, 255, 0.5);
  }
  &::-moz-placeholder {
    opacity: 0.5;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.33px;
    color: rgba(255, 255, 255, 0.5);
  }
  &:-ms-textarea-placeholder {
    opacity: 0.5;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.33px;
    color: rgba(255, 255, 255, 0.5);
  }
  &:-moz-placeholder {
    opacity: 0.5;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.33px;
    color: rgba(255, 255, 255, 0.5);
  }
  textarea::placeholder {
    opacity: 0.5;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.33px;
    color: rgba(255, 255, 255, 0.5);
    line-height: 15px;
  }

  textarea:focus::placeholder {
    color: transparent;
  }

  textarea {
    caret-color: #fff;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.33px;
    line-height: 15px;
    color: rgba(255, 255, 255, 0.5);
    margin-left: 15px;
    background: transparent;
    border: none;
    width: 240px;
    overflow: hidden;
    resize: none;
    color: #fff;
    cursor: ${(props) => (props.inputFocus ? "" : "pointer")};

    ${(props) => (props.inputFocus ? "72px" : "18px")}
  }
`;

const ArrowContainer = styled.div`
  width: 39px;
  height: 36px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #202221;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  cursor: pointer;
  &:active {
    transform: scale(0.95);
  }
`;

const UserMenuContainer = styled.div`
  width: 84px;
  height: auto;
  margin: 7px 175px 48px 41px;
  object-fit: contain;
  border-radius: 6px;
  border: solid 1px #7d7d7d;
  background-color: #2c2d2d;
  position: absolute;
  top: -10px;
  left: -45px;
  z-index: 1000;
`;

const MenuNickname = styled.span`
  margin: 0px 0px 0px 6px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 20px;
  letter-spacing: -0.3px;
  text-align: left;
  color: #099f3c;
`;

const MenuText = styled.p`
  /* margin: 7px 0px 7px 6px; */
  margin-left: 6px;
  object-fit: contain;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 10px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 10px;
  letter-spacing: -0.3px;
  color: #fff;
  cursor: pointer;
`;

const RegulationContainer = styled.div`
  width: 300px;
  margin: 40px auto 0 auto;
  background-color: #2c2d2d;
  overflow: hidden;
  overflow-y: auto;
`;

const RegulationContents = styled.div`
  width: 280px;
  margin: 0 18px 38px 0;
  object-fit: contain;
`;

const RegulationTitle = styled.p`
  height: 18px;
  margin: 0 0px 18px 0;
  object-fit: contain;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.8px;
  text-align: left;
  color: #fff;
`;

const RegulationText = styled.p`
  margin: 10px 0 0;
  object-fit: contain;
  opacity: 0.7;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.65px;
  text-align: left;
  color: rgba(255, 255, 255, 0.7);
`;

const Rectangle = styled.button`
  width: 280px;
  height: 45px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #19793a;
  margin-top: 38px;

  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
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
  height: 40px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #19793a;
  margin-top: 10px;

  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
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

const MenuTextContainer = styled.div`
  display: flex;
  align-items: center;
  height: 25px;
  margin: 2px 2px;
  border-radius: 5px;
  &:hover {
    background-color: #19793a;
  }
`;

const Toast = styled.div`
  * {
    vertical-align: middle;
    font-size: 14px;
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
    width: 17px;
  }
`;

const ToastTop = styled.div`
  display: flex;
  align-items: center;

  font-size: 14px;
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
    width: 36px;
    margin-right: 6px;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    background-image: url("/images/toast/VIP.png");
    background-size: cover;
    background-position: center;
    font-family: "Roboto", sans-serif;
    font-size: 12px;
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
  width: 310px;
  height: 280px;
  object-fit: contain;
  background-color: #202221;
  position: absolute;
  bottom: 50px;
  left: 8px;
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(36px, auto));
  grid-template-rows: repeat(auto-fill, minmax(36px, auto));
  row-gap: 15px;
  column-gap: 7px;
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

const Chat = () => {
  const [inputFocus, setInputFocus] = useState(false);
  const [announcement, setAnnouncement] = useState(false);
  const [userMenuIndex, setUserMenuIndex] = useState(-1);
  const [tab, setTab] = useState(1);
  const [reportPopup, setReportPopup] = useState(false);
  const [openSelect, setOpenSelect] = useState({
    open: false,
    text: "신고이유 선택",
  });
  const chatRef = useRef();
  const [isScrollBottom, setIsScrollBottom] = useState(false);
  const [verification, setVerification] = useState(false);
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

  const tmpList = [
    {
      tier: "Bronze",
      nickname: "스페이스",
      text: "아 맞네 임성빈 음주운전이네 ...",
    },
    {
      tier: "Silver",
      nickname: "스페이스",
      text: "아 맞네 임성빈 음주운전이네 ...",
    },
    {
      tier: "Gold",
      nickname: "스페이스",
      text: "아 맞네 임성빈 음주운전이네 ...",
    },
    {
      tier: "Platinum",
      nickname: "스페이스",
      text: "아 맞네 임성빈 음주운전이네 ...",
    },
    {
      tier: "Diamonds",
      nickname: "스페이스",
      text: "아 맞네 임성빈 음주운전이네 ...",
    },
    {
      tier: "Admin",
      nickname: "스페이스",
      text: "아 맞네 임성빈 음주운전이네 ...",
    },
  ];

  const tmpEmojiList = [
    { img: "/images/chat/emoji1.png", lock: false },
    { img: "/images/chat/emoji2.png", lock: true },
    { img: "/images/chat/emoji3.png", lock: false },
    { img: "/images/chat/emoji4.png", lock: false },
    { img: "/images/chat/emoji5.png", lock: false },
  ];

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

  const scrollToBottom = () => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };

  const detectBottom = () => {
    const scrollTop = chatRef.current?.scrollTop;
    const clientHeight = chatRef.current?.clientHeight;
    const scrollHeight = chatRef.current?.scrollHeight;
    setIsScrollBottom(scrollTop + clientHeight >= scrollHeight);
  };

  const onToastPopup = () => {
    toast(
      <Toast>
        <span>관리자가 유저를 채팅금지 시켰을때 나오는 알림 메세지</span>
        <img src="/images/toast/error.png" alt="" />
      </Toast>,
      {
        position: "bottom-right",
        icon: false,
        className: "toast-error",
      }
    );

    toast(
      <Toast>
        <span>내용이 없어서 아이콘을 만들수 없습니다</span>
      </Toast>,
      {
        position: "bottom-right",
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
        position: "bottom-right",
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
        position: "bottom-right",
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
        position: "bottom-right",
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
        position: "bottom-right",
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
        position: "top-right",
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
        position: "top-right",
        icon: false,
        className: "toast-message",
      }
    );
  };

  useEffect(() => {
    TopToastPopup();
  }, []);

  return (
    <>
      {reportPopup && (
        <UserReportContainer>
          <TitleContainer>
            <Title>유저 '스페이스' 신고하기</Title>
            <img
              src="/images/common/Close.png"
              alt=""
              style={{ width: "13px", height: "12px", cursor: "pointer" }}
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
                  style={{ width: "10px", height: "5px", cursor: "pointer" }}
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
                style={{ width: "10px", height: "5px", cursor: "pointer" }}
                // onClick={() => setRankingModal(false)}
              ></img>
            </SelectDefault>
          )}
          <ReportRectangle>채팅신고하기</ReportRectangle>
        </UserReportContainer>
      )}
      <Wrapper reportPopup={reportPopup}>
        <TabContainer>
          <div
            style={{
              width: "110px",
              height: "56px",
              display: "flex",
              alignItems: "flex-start",
              paddingTop: "20px",
              borderBottom: `${tab === 1 ? "2px solid #099f3c" : ""}`,
              cursor: "pointer",
            }}
            onClick={() => setTab(1)}
            opacity={tab !== 1 ? 0.7 : 1}
          >
            <img
              src="/images/chat/ChatBubble.png"
              alt=""
              style={{
                width: "24px",
                height: "21px",
                opacity: `${tab !== 1 ? 0.7 : 1}`,
              }}
            ></img>
            <TabTitle>공개 채팅방</TabTitle>
          </div>
          <div
            style={{
              width: "110px",
              height: "56px",
              display: "flex",
              alignItems: "flex-start",
              borderBottom: `${tab === 2 ? "2px solid #099f3c" : ""}`,
              paddingTop: "20px",
              cursor: "pointer",
            }}
            onClick={() => setTab(2)}
            opacity={tab !== 2 ? 0.7 : 1}
          >
            <img
              src="/images/chat/Regulation.png"
              alt=""
              style={{
                width: "17px",
                height: "17px",
                opacity: `${tab !== 2 ? 0.7 : 1}`,
              }}
            ></img>
            <TabTitle>채팅방 규정</TabTitle>
          </div>
        </TabContainer>
        {tab === 1 && (
          <>
            <MenuContainer>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="/images/chat/Human.png"
                  alt=""
                  style={{ width: "17px", height: "17px" }}
                ></img>
                <span
                  style={{
                    width: "60px",
                    height: "16px",
                    marginLeft: "8px",
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "14px",
                    fontWeight: "normal",
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: "16px",
                    letterSpacing: "normal",
                    color: "#fff",
                    transform: "skew(-0.1deg)",
                  }}
                >
                  2,308명
                </span>
              </div>
              <img
                src="/images/chat/Eraser.png"
                alt=""
                style={{ width: "18px", height: "15px", cursor: "pointer" }}
              ></img>
            </MenuContainer>
            {announcement === false ? 
              <AnnouncementContainer
                announcement={announcement}
                onClick={() => setAnnouncement(!announcement)}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="/images/chat/Loudspeaker.png"
                    alt=""
                    style={{ width: "33px", height: "33px" }}
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
                      width: "13px",
                      height: "7px",
                      transform: `${
                        announcement ? "rotate(180deg)" : "rotate(0deg)"
                      }`,
                      transition: "transform 0.2s linear",
                    }}
                  ></img>
                </div>
              </AnnouncementContainer>
              :
              <AnnouncementContainerOpen
                  announcement={announcement}
                  onClick={() => setAnnouncement(!announcement)}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src="/images/chat/Loudspeaker.png"
                      alt=""
                      style={{ width: "33px", height: "33px" }}
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
                        width: "13px",
                        height: "7px",
                        transform: `${
                          announcement ? "rotate(180deg)" : "rotate(0deg)"
                        }`,
                        transition: "transform 0.2s linear",
                      }}
                    ></img>
                  </div>
              </AnnouncementContainerOpen>
          }
            
            <ChatContainer
              ref={chatRef}
              onScroll={detectBottom}
              announcement={announcement}
            >
              {[...tmpList, ...tmpList, ...tmpList, ...tmpList, ...tmpList].map(
                (item, idx) => (
                  <>
                    <ChatContents>
                      <div style={{ display: "flex" }}>
                        <img
                          src={`/images/chat/${item.tier}.png`}
                          alt=""
                          style={{ width: "16px", height: "18px" }}
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
                              <div
                                style={{
                                  width: "100%",
                                  height: "auto",
                                  borderTop: "solid 1px #7d7d7d",
                                }}
                                className="nickname"
                              >
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
                        <img
                          src="/images/chat/ArrowLeft.png"
                          alt=""
                          style={{ width: "5px", height: "8px" }}
                        ></img>
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
                    width: "42px",
                    height: "23px",
                    position: "fixed",
                    bottom: `${inputFocus ? "100px" : "60px"}`,
                    right: "140px",
                    cursor: "pointer",
                  }}
                  onClick={scrollToBottom}
                ></img>
              )}
            </ChatContainer>
          </>
        )}
        {tab === 2 && (
          <>
            <RegulationContainer>
              <RegulationContents
                style={{ borderBottom: "1px solid #444", height: "358px" }}
              >
                <RegulationTitle>
                  채팅차단이 되는 경우(차단수위)
                </RegulationTitle>
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
              <RegulationContents style={{ height: "300px" }}>
                <RegulationTitle>
                  대화가 금지되는 경우 (금지시간)
                </RegulationTitle>
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
                  5. 기타 채팅창 분위기를 해치고 있다고 판단되어 경고가
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;필요한 경우(20분)
                </RegulationText>
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
              </RegulationContents>
            </RegulationContainer>
          </>
        )}

        <MessegeContainer inputFocus={inputFocus}>
          <MessegeInput inputFocus={inputFocus}>
            <textarea
              rows={inputFocus ? 2 : 1}
              inputFocus={inputFocus}
              placeholder="메시지 보내기"
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
              onKeyDown={(e) => {
                if (e.shiftKey && e.key === "Enter") {
                } else if (e.key === "Enter") e.preventDefault();
              }}
            ></textarea>
            <img
              src="/images/chat/smile.png"
              alt=""
              onClick={() => setEmoji(!emoji)}
            ></img>
          </MessegeInput>

          <ArrowContainer onClick={() => onToastPopup()}>
            <img
              src="/images/chat/SendMessege.png"
              alt=""
              style={{ width: "18px", height: "18px" }}
            ></img>
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
      </Wrapper>
    </>
  );
};

export default Chat;
