import { useCallback, useEffect } from "react";
import { BrowserRouter, useParams } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Modal from "react-modal";
import Ranking from "./components/popup/Ranking";
import RequestForLevelUp from "./components/popup/RequestForLevelUp";
import SearchUserInfo from "./components/popup/SearchUserInfo";
import Login from "./components/popup/Login";
import ChangePW from "./components/popup/ChangePW";
import Signup from "./components/popup/Signup";
import ChangeUserInfo from "./components/popup/ChangeUserInfo";
import Withdrawal from "./components/popup/Withdrawal";
import SelectGame from "./components/popup/SelectGame";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { BasicData, MemberMe, TimeCountApi } from "./components/apis/api";
// import io from 'socket.io-client'
import { getCookie } from "./components/apis/cookie";
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();


// const socket = io.connect("http://localhost:3001")
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
    overflow: "visible",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "0px",
  },
};

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

function App() {
  const [rankingModal, setRankingModal] = useState(false);
  const [requestForLevelUp, setRequestForLevelUp] = useState(false);
  const [login, setLogin] = useState(false);
  const [searchUserInfo, setSearchUserInfo] = useState(false);
  const [changePW, setChangePW] = useState(false);
  const [signup, setSignup] = useState(false);
  const [changeUserInfo, setChangeUserInfo] = useState(false);
  const [withdrawal, setWithdrawal] = useState(false);
  const [selectGame, setSelectGame] = useState(1);

  // 로그인 연장시 alert창 나타나게
  const [modalToast, setModalToast] = useState(false);
  // 이메일 발송중, 알림창

  const [emialLoadingBlooean , setEmailLoadingBlooean] = useState(false)
  // const [email , setEmail] = useState("")
  const [check, setCheck] = useState({
    id: false,
    autoLogin: false,
  });
  // 회원정보 수정 
  const [changeUserToggle, setChangeUserToggle] = useState(false)

  // 멀티에서 경기선택시 모달창 뜨게 하는 토글 
  const [multiModalToggle, setMultiModalToggle] = useState(false)

  // 로그인 로직 
  const [signToggle, setSignToggle] = useState(false)
  // 로그인 타이머값
  const [ timeExtension, setTimeExtension] = useState()

  const [loginExtenButton , setLoginExtenButton] = useState(false)
  const onToastPopup = useCallback(() => {
    toast.error(
      <Toast>
        <span>스포시티 텍스트 1줄일 경우의 디자인</span>
        <img src="/images/toast/check.png" alt="" />
      </Toast>,
      {
        position: "bottom-left",
        icon: false,
        className: "toast-green",
      }
    );

    toast.error(
      <Toast>
        <span>스포시티 팝업이 노출됩니다 2줄일경우의 디자인입니다</span>
        <img src="/images/toast/error.png" alt="" />
      </Toast>,
      {
        position: "bottom-left",
        icon: false,
        className: "toast-red",
      }
    );
  }, []);

  useEffect(() => {
    onToastPopup();
  }, []);


  // 로그인시 알림팝업
  const onToastPopupLogin = useCallback(() => {
    toast.error(
      <Toast>
        <span>로그인 성공!</span>
        <img src="/images/toast/check.png" alt="" />
      </Toast>,
      {
        position: "bottom-left",
        icon: false,
        className: "toast-green",
      }
    );
  }, []);
  


  // 아이디 비밀번호 알림팝업
  const onToastIdFound = useCallback(() => {
    toast.error(
      <Toast>
        <span>이메일로 비밀번호를 변경할 수 있는 링크를 발급 해드렸습니다! 지금 확인해 주세요.</span>
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
    if( emialLoadingBlooean=== true){
      onToastIdFound();
      setEmailLoadingBlooean(false)
    }
  },[emialLoadingBlooean]);

  const [pageBasicData, setPageBasicData] = useState()

  useEffect(()=>{
    BasicData(setPageBasicData)
  },[])

  const [test, setTest] = useState(false)

  useEffect(()=>{
    if(timeExtension < 1 && timeExtension !== null){
      setTest(true)
    }
  })
  
  useEffect(()=>{
    if( getCookie('cityauth') !== undefined){
      if(  modalToast === true ){
        window.localStorage.clear("counts")
        TimeCountApi(21600, timeExtension)
        window.location.reload()
      }else if( test === true && modalToast === false ){
        cookies.remove("cityauth")
        window.localStorage.removeItem("counts")
        window.location.reload()
        // TimeCountApi(5 )
      }else if(  modalToast === false){
        TimeCountApi(check.autoLogin === false ? 21600 : 7776000, timeExtension)
        // 제한시간
      }
    }else if(getCookie('cityauth') === undefined){
      window.localStorage.clear("counts")
    }
  },[ getCookie('cityauth') , modalToast , test , check ])

  // useEffect(()=>{
  //   if(loginExtenButton === false && (((getCookie('cityauth') !== "" || getCookie('cityauth') !== undefined) && modalToast === true) || (window.localStorage.getItem("counts") !== null && window.localStorage.getItem("counts") < 1 && getCookie('cityauth') !== undefined) )){
  //     console.log(">?1")
  //     alert("1")
  //     window.localStorage.clear("counts")
  //     TimeCountApi(13)
  //     setModalToast(false)
  //     cookies.remove("cityauth")
  //     window.location.reload()
  //   }else if((getCookie('cityauth') !== "" || getCookie('cityauth') !== undefined) && modalToast === false && (window.localStorage.getItem("counts") === null || window.localStorage.getItem("counts") > 1)){
  //     console.log(">?2")
  //     TimeCountApi(13)
  //   }else if((getCookie('cityauth') !== "" || getCookie('cityauth') !== undefined) && window.localStorage.getItem("counts") !== null && loginExtenButton === true){
  //     console.log(">?3")
  //     TimeCountApi(10 )
  //     setLoginExtenButton(false)
  //   }
  // },[getCookie('cityauth') , modalToast , window.localStorage.getItem("counts") , loginExtenButton])


  useState(()=>{
    setModalToast(false)
  },[])
  useEffect(() => {
    if(signToggle === true){
      onToastPopupLogin();
    }
  },[signToggle]);

  useEffect(()=>{
    setModalToast(false)
  },[])

   return (
    <div className="App">
      <BrowserRouter>
        <MainPage
          setRankingModal={setRankingModal}
          setLogin={setLogin}
          setSignup={setSignup}
          signToggle={signToggle}
          multiModalToggle={multiModalToggle}
          setMultiModalToggle={setMultiModalToggle}
          changeUserToggle={changeUserToggle}
          setChangeUserToggle={setChangeUserToggle}
          check={check}
          setCheck={setCheck}
          setWithdrawal={setWithdrawal}
          // 페이지 기본 정보
          pageBasicData={pageBasicData}
          modalToast={modalToast}
          setModalToast={setModalToast}
          setRequestForLevelUp={setRequestForLevelUp}
          timeExtension={timeExtension}
          setTimeExtension={setTimeExtension}
          loginExtenButton={loginExtenButton} 
          setLoginExtenButton={setLoginExtenButton}
        />
      </BrowserRouter>

      {rankingModal && (
        <Modal
          isOpen={rankingModal}
          style={ModalStyle}
          onRequestClose={() => setRankingModal(false)}
        >
          <Ranking
            setRankingModal={setRankingModal}
            setRequestForLevelUp={setRequestForLevelUp}
          ></Ranking>
        </Modal>
      )}

      {requestForLevelUp && (
        <Modal
          isOpen={requestForLevelUp}
          style={ModalStyle}
          onRequestClose={() => setRequestForLevelUp(false)}
        >
          <RequestForLevelUp
            setRequestForLevelUp={setRequestForLevelUp}
          ></RequestForLevelUp>
        </Modal>
      )}

      {login && signToggle === false && (
        <Modal
          isOpen={login}
          style={ModalStyle}
          onRequestClose={() => setLogin(false)}
        >
          <Login
            login={login}
            setLogin={setLogin}
            setSearchUserInfo={setSearchUserInfo}
            setSignup={setSignup}
            signToggle={signToggle}
            setSignToggle={setSignToggle}
            check={check}
            setCheck={setCheck}
          ></Login>
        </Modal>
      )}

  
      {searchUserInfo && (
        <Modal
          isOpen={searchUserInfo}
          style={ModalStyle}
          onRequestClose={() => setSearchUserInfo(false)}
        >
          <SearchUserInfo
            setLogin={setLogin}
            setSearchUserInfo={setSearchUserInfo}
            emialLoadingBlooean={emialLoadingBlooean}
            setEmailLoadingBlooean={setEmailLoadingBlooean}
          ></SearchUserInfo>
        </Modal>
      )}
      {/* 
      {changePW && (
        <Modal
          isOpen={changePW}
          style={ModalStyle}
          onRequestClose={() => setChangePW(false)}
        >
          <ChangePW setChangePW={setChangePW}></ChangePW>
        </Modal>
      )} */}

      {signup && (
        <Modal
          isOpen={signup}
          style={ModalStyle}
          onRequestClose={() => setSignup(false)}
        >
          <Signup setSignup={setSignup} setLogin={setLogin}></Signup>
        </Modal>
      )}
{/* 
      {changeUserToggle && (
        <Modal
          isOpen={changeUserInfo}
          style={ModalStyle}
          onRequestClose={() => setChangeUserInfo(false)}
        >
          <ChangeUserInfo
            setChangeUserInfo={setChangeUserInfo}
          ></ChangeUserInfo>
        </Modal>
      )} */}

      {withdrawal && (
        <Modal
          isOpen={withdrawal}
          style={ModalStyle}
          onRequestClose={() => setWithdrawal(false)}
        >
          <Withdrawal setWithdrawal={setWithdrawal}></Withdrawal>
        </Modal>
      )}
      {
        multiModalToggle === true &&
          <Modal
            isOpen={selectGame}
            style={ModalStyle}
            onRequestClose={() => setSelectGame(false)}
          >
            <SelectGame 
              selectGame={setWithdrawal} 
              setMultiModalToggle={setMultiModalToggle}>
            </SelectGame>
          </Modal>
      }
      <ToastContainer className="toast-position" />
    </div>
  );
}

Modal.setAppElement("#root");

export default App;
