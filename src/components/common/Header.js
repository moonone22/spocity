import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import { getCookie, setCookie } from "../apis/cookie";
import { LogOut,  MemberMe,  TimeCountApi,  TimeStampData } from "../apis/api";
import Cookies from 'universal-cookie';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wrapper = styled.div`
  height: 56px;
  background-color: rgba(32, 34, 33);
  justify-content: space-between;
  padding-right: 50px;
  align-items: center;
  position: sticky;
  display: ${(props) => (props.fullScreen ? "none" : "flex")};

  top: 0;
  box-shadow: 0px 0px 14px rgb(0 0 0 / 80%);
  z-index: 10000;
  @media (max-width: 1100px) {
    background-color: #000;
    height: 60px;
    padding: 0 30px;
  }
  @media (max-width: 720px) {
    position: ${(props) => (props.headerPosition ? "unset" : "sticky")};
    background-color: #000;
    height: calc((100 / 1280) * 100vh);
    padding: 0 calc((40 / 720) * 100vw);
  }
`;

const Button = styled.button`
  margin: auto 0;
  width: 79px;
  height: 34px;
  border-radius: 6px;
  background-color: ${(props) => props.color};
  color: #fff;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  margin-left: 19px;
  opacity: 0.8;
  &:hover {
    filter: brightness(1.2);
  }
  &:active {
    transform: scale(0.95);
    transition: all 0.1s ease-in-out;
  }
  @media (max-width: 1100px) {
    margin-left: 2px;
    margin-right: 2px;
    width: 60px;
    height: 35px;
  }
  @media (max-width: 800px) {
    margin-left: 10px;
    width: calc((100 / 720) * 100vw);
    height: calc((54 / 1280) * 100vh);
    font-size: calc((22 / 720) * 100vw);
  }
`;

const UserPopupContainer = styled.div`
  width: 141px;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  border: solid 1px #3b3c3c;
  background-color: #2c2d2d;
  position: absolute;
  top: 25px;
  right: -5px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  div {
    padding : 5px 10px;
    &:hover {
      background-color: #19793a;
      border-radius: 6px;
    }
  }

  @media (max-width: 1100px) {
    height: auto;
    width: 120px;
  }
`;

const UserPopupContents = styled.div`
  flex: 1;
  border-bottom: solid 1px #3b3c3c;
  display: flex;
  align-items: center;
  width : 100%;
  padding-left : 10px
`;

const Class = styled.div`
  width: 16px;
  height: 18px;
  margin-left: 11px;
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
  position : relative;
  span {
    position : relative;
    right : 4px;
    bottom : 2px;
    display : inline-block;
  }
`;

const PopupTitle = styled.span`
  font-family: "Roboto", sans-serif;
  margin-left: 8px;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  /* line-height: 4.23; */
  letter-spacing: normal;
  color: #fff;
  
`;

const PopupText = styled.span`
  display : inline-block;
  width : 100%;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.33px;
  color: ${(props) => props.color || "#fff"};
  margin-left: ${(props) => props.marginLeft};
  
  @media (max-width: 720px) {
    font-size: 11px;
  }
`;
const PopupTextTime = styled.span`
  display : inline-block;
  width : 100%;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.33px;
  color: ${(props) => props.color || "#fff"};
  margin-left: ${(props) => props.marginLeft};
  
  &:hover {
    color : #aaa;
  }
  @media (max-width: 720px) {
    font-size: 11px;
  }
`;



const Image = styled.img`
  &:active {
    transform: scale(0.95);
    transition: all 0.1s ease-in-out;
  }

  width: ${(props) => props.hide === "Trophy" && "30px"};
  height: ${(props) => props.hide === "Trophy" && "30px"};
  display: block;

  @media (max-width: 1100px) {
    display: ${(props) => props.hide === "hide" && "none"};
    width: ${(props) => props.hide === "Trophy" && "40px"};
    height: ${(props) => props.hide === "Trophy" && "40px"};
  }
  @media (max-width: 800px) {
    display: ${(props) => props.hide === "hide" && "none"};
    width: ${(props) => props.hide === "Trophy" && "calc((62 / 720) * 100vw)"};
    height: ${(props) => props.hide === "Trophy" && "auto"};
  }
`;

const Logo = styled.img`
  visibility: ${(props) => (props.openSidebar ? "hidden" : "visible")};
  margin-left: 40px;
  cursor: pointer;
  &:active {
    transform: scale(0.95);
  }
  width: 141px;
  height: auto;

  @media (max-width: 1100px) {
    visibility: visible;
    margin-left: 0;
  }
  @media (max-width: 800px) {
    background-color: #000;
    width: calc((224 / 720) * 100vw);
  }
`;

const ModalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 100000,
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    border: "none",
    background: "transparent",
    overflow: "hidden",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
  },
};

const ModalContainer = styled.div`
  width: 440px;
  height: 331px;
  border-radius: 12px;
  background-color: #202221;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: 720px) {
    width: calc((640 / 720) * 100vw);
    height: calc((498 / 1280) * 100vh);
  }

  img {
    width: 68px;
    height: 76px;
    margin: 52px 0px 27px 0px;
    @media (max-width: 720px) {
      width: calc((100 / 720) * 100vw);
      height: calc((111 / 720) * 100vw);
      margin: calc((81 / 1280) * 100vh) 0 calc((35 / 1280) * 100vh) 0;
    }
  }
  > span {
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.4px;
    text-align: center;
    color: #0adc4b;
    @media (max-width: 720px) {
      font-size: calc((28 / 720) * 100vw);
    }
  }
  > p {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.4px;
    text-align: center;
    color: #fff;
    @media (max-width: 720px) {
      font-size: calc((28 / 720) * 100vw);
    }
  }
  > div {
    display: flex;
    margin-top: 41px;
    button {
      width: 193px;
      height: 50px;
      border-radius: 6px;
      border: solid 1px #666;

      font-size: 16px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.4px;
      color: #fff;
      @media (max-width: 720px) {
        width: calc((270 / 720) * 100vw);
        height: calc((80 / 720) * 100vw);
        font-size: calc((28 / 720) * 100vw);
      }
    }
    .logout {
      background-color: #202221;
      margin-right: 10px;
      cursor: pointer;
      &:hover {
        filter: brightness(1.2);
      }
      :active {
        transform: scale(0.95);
      }
    }
    .login {
      cursor: pointer;
      &:hover {
        filter: brightness(1.2);
      }
      :active {
        transform: scale(0.95);
      }
      background-color: #19793a;
    }
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

const Header = ({
  setRankingModal,
  setLogin,
  setSignup,
  openSidebar,
  setOpenChat,
  openChat,
  headerPosition,
  fullScreen,
  signToggle,
  changeUserToggle , 
  setChangeUserToggle,
  check,
  setCheck,
  modalToast,
  setModalToast,
  // 등업신청 모달창
  setRequestForLevelUp,
  timeExtension, 
  setTimeExtension, 
  loginExtenButton , 
  setLoginExtenButton
}) => {
  const [userPopup, setUserPopup] = useState(false);
  const [modal, setModal] = useState(false);


  // 시간 받아오는거
  const [ timeStamp, setTimeStamp] = useState("")
  // 랭크에 따라 이미지 변환 
  const [ lankImg, setLankImg] = useState()
  // 랭크에 따라 이미지 변환 
  const [ lankText, setLankText] = useState()
  // 유저데이터
  const [userDropData, setUserDropData] = useState()
  const [lankBackground, setLankBackground] = useState()


  useEffect(()=>{
    TimeStampData(setTimeStamp)
  },[])

  // 타임스탬프값과 newdate값 비교
  const dateTime = timeStamp !== "" && Math.floor(new Date().getTime() / 1000)  - timeStamp
  // 비교한 값에 6시간 더함
  const timePlus = dateTime + 21600;
  let expires = new Date();
  expires.setSeconds(expires.getSeconds() + timePlus);
  let navigate = useNavigate();

  const loginExtension = async() => {
    await axios.get(process.env.REACT_APP_DB_HOST +  '/api/member/login/extend', {
      headers : {
        Authorization : getCookie('cityauth')
      }
    }).then(res => {
      const token = res.data.data.Authorization 
      // 로그인 토큰 
      const tokenReplace = token?.replace("Bearer ", "")
      if(!(token ===null || token === "") && res.data.status_code === 200 ){
        // setCookie('cityauth' , tokenReplace  , {
        //   path:"/",
        //   expires,
        //   // secure:true,
        //   // sameSite:'none',
        // })
        setModalToast(true)
        setModal(false)
        MemberMe(setUserDropData)
        MemberMe()
        setLoginExtenButton(true)
      }else if(res.data.status_code === 400){
        alert(res.data.msg)
      }
    }).catch(function (error) {
      console.log(error)
        // alert(error)
    });
  } 
  const cookies = new Cookies();

  const remove = () => {
    LogOut()
    console.log("로그아웃")
    cookies.remove("cityauth")
  }

  const onToastPopup = useCallback(() => {
    toast.error(
      <Toast>
        <span>로그인 유지 시간이 최대로 연장 되었어요</span>
        <img src="/images/toast/check.png" alt="" />
      </Toast>,
      {
        position: "bottom-left",
        icon: false,
        className: "toast-green",
      }
    );
  }, []);

  useEffect(() => {
    if(modal === true ){
      onToastPopup();
    }
  }, [modal , onToastPopup]);

  useEffect(()=>{
    if(userDropData?.data.ranked === 1){
      setLankImg("/images/chat/Bronze.png")
      setLankText("B")
      setLankBackground("#9a624e")
    }else if(userDropData?.data.ranked === 2){
      setLankImg("/images/chat/Silver.png")
      setLankText("S")
      setLankBackground("#6690a0")
    }else if(userDropData?.data.ranked === 3){
      setLankImg("/images/chat/Gold.png")
      setLankText("G")
      setLankBackground("#ba963e")
    }else if(userDropData?.data.ranked === 4){
      setLankImg("/images/chat/Platinum.png")
      setLankText("P")
      setLankBackground("#aba349")
    }else if(userDropData?.data.ranked === 5){
      setLankImg("/images/chat/Diamonds.png")
      setLankText("D")
      setLankBackground("##665eb3")
    }
  },[userDropData])

  useEffect(()=>{
    // if(getCookie('cityauth') !== ""){
    if( getCookie('cityauth') !== undefined){
      MemberMe(setUserDropData)
    }
  },[getCookie('cityauth')])

  useEffect(()=>{
    if(getCookie("cityauth")!==""){
      const timerId = setTimeout(()=>{
        setTimeExtension(window.localStorage.getItem('counts'))
      },1000)
      return () => clearTimeout(timerId)
    }
  })

  return (
    // <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
    <Wrapper
      fullScreen={fullScreen}
      openSidebar={openSidebar}
      headerPosition={headerPosition}
    >
      <Logo
        openSidebar={openSidebar}
        src={"/images/main/MainLogo.png"}
        alt="logo"
        onClick={() => {
          navigate("/");
        }}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image
          src="/images/common/Taegeukgi.png"
          alt=""
          style={{ width: "26px", height: "19px", cursor: "pointer" }}
          hide="hide"
        ></Image>
        <Image
          src="/images/common/Trophy.png"
          alt=""
          style={{
            marginLeft: "19px",
            cursor: "pointer",
          }}
          hide="Trophy"
          onClick={() => setRankingModal(true)}
        ></Image>
        <Image
          src="/images/common/SpeechBubble.png"
          alt=""
          style={{
            width: "20px",
            height: "18px",
            marginLeft: "23px",
            cursor: "pointer",
          }}
          onClick={() => setOpenChat(!openChat)}
          hide="hide"
        ></Image>
        { getCookie('cityauth') ? (
          <div style={{ position: "relative" }}>
            <Image
              src="/images/common/User.png"
              alt=""
              style={{
                width: "15px",
                height: "15px",
                marginLeft: "23px",
                cursor: "pointer",
              }}
              onClick={() => setUserPopup(!userPopup)}
            ></Image>
            {userPopup && (
              <UserPopupContainer>
                <UserPopupContents>
                  <img
                    src={lankImg}
                    alt=""
                    style={{ width: "16px", height: "18px" }}
                  ></img>
                  <Class background={lankBackground}>
                    <span>
                      {lankText}
                    </span>
                  </Class>
                  <PopupTitle>
                    {userDropData?.data.nick}
                  </PopupTitle>
                </UserPopupContents>
                <UserPopupContents style={{ cursor: "pointer" }} onClick={()=>{
                  setRequestForLevelUp(true)
                  }}>
                  <img
                    src="/images/common/1.png"
                    alt=""
                    style={{ width: "16px", height: "16px" }}
                  ></img>
                  <PopupText marginLeft="10px">등업신청</PopupText>
                </UserPopupContents>
                <UserPopupContents style={{ cursor: "pointer" }} onClick={()=>{
                  setChangeUserToggle(!changeUserToggle)
                  }}>
                  <img
                    src="/images/common/2.png"
                    alt=""
                    style={{ width: "16px", height: "16px" }}
                  ></img>
                  <PopupText marginLeft="10px">회원정보수정</PopupText>
                </UserPopupContents>
                <UserPopupContents style={{ cursor: "pointer" }} onClick={()=>remove()}>
                    <img
                      src="/images/common/3.png"
                      alt=""
                      style={{ width: "16px", height: "16px" }}
                    ></img>
                  <PopupText marginLeft="10px" >로그아웃</PopupText>
                </UserPopupContents>
                <UserPopupContents style={{ cursor: "pointer" }} onClick={()=>remove()}>
                    <img
                      src="/images/common/4.png"
                      alt=""
                      style={{ width: "16px", height: "16px" }}
                    ></img>
                  <PopupText marginLeft="10px" >
                    <a href="https://op.spo.city" target={"_black"}>
                        관리자 페이지
                    </a>  
                  </PopupText>
                </UserPopupContents>
              
                {check.autoLogin === false ? 
                    <>
                      <UserPopupContents>
                          <PopupText>
                            {Math.floor(timeExtension / 60)}분후 자동로그아웃
                          </PopupText>
                      </UserPopupContents>
                      <UserPopupContents
                          style={{ border: "none", cursor: "pointer" }}
                          onClick={() => {
                            setModal(true);
                            setUserPopup(false);
                            loginExtension()
                          }}
                        >
                        <PopupTextTime color="#00bd40" marginLeft="12px">로그인 시간 연장</PopupTextTime>
                      </UserPopupContents>
                    </>
                    :
                    ""
                  }
                </UserPopupContainer>
              )}
          </div>
        ) : (
          <>
            <Button color="#313231" onClick={() => setLogin(true)}>
              로그인
            </Button>
            <Button
              color="#19793a"
              style={{ opacity: "0.8" }}
              onClick={() => setSignup(true)}
            >
              회원가입
            </Button>
          </>
        )}
      </div>
      <Modal
      // 이부분이 로그인 시간 연장 할때 blooean값
        isOpen={timeExtension !== null &&timeExtension < 21150 && getCookie('cityauth') !== undefined}
        style={ModalStyle}
        // onRequestClose={() => setModal(false)}
      >
        <ModalContainer>
          <img src="/images/common/Clock.png" alt=""></img>
          <span>남은시간 10분</span>
          <p>지금 로그인을 연장하시겠습니까?</p>
          <div>
            <button className="logout" onClick={()=>remove()}>로그아웃</button>
            <button className="login" onClick={ ()=>{
              // setLoginExtenButton(true) 
              loginExtension() 
            }}>로그인 연장</button>
          </div>
        </ModalContainer>
      </Modal>
    </Wrapper>
  );
};

export default Header;
