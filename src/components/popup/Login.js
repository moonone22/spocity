import axios from "axios";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { MemberMe, TimeStampData } from "../apis/api";
import { getCookie, setCookie } from "../apis/cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";

const Wrapper = styled.div`
  width: 500px;
  height: 446px;
  padding: 31px 24px 29px;
  object-fit: contain;
  border-radius: 12px;
  background-color: #202221;
  @media (max-width: 720px) {
    width: calc((640 / 720) * 100vw);
    height: calc((793 / 1280) * 100vh);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: calc((40 / 1280) * 100vh) calc((40 / 720) * 100vw);
  }
`;

const TitleContainer = styled.div`
  height: 21px;
  margin: 0 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 13px;
    height: 12px;
    cursor: pointer;
  }
  @media (max-width: 720px) {
    height: calc((28 / 1280) * 100vh);
    img {
      width: calc((28 / 720) * 100vw);
      height: calc((28 / 1280) * 100vh);
    }
  }
`;

const Title = styled.span`
  height: 17px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.45px;
  text-align: left;
  color: #fff;
  @media (max-width: 720px) {
    font-size: calc((30 / 720) * 100vw);
    display: flex;
    align-items: center;
  }
`;

const InputContainer = styled.div`
  width: 450px;
  object-fit: contain;
  margin-bottom: 12px;
  @media (max-width: 720px) {
    width: 100%;
    height: calc((126 / 1280) * 100vh);
  }
`;

const InputTitle = styled.span`
  opacity: 0.7;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.38px;
  text-align: left;
  color: rgba(255, 255, 255, 0.7);
  @media (max-width: 720px) {
    font-size: calc((24 / 720) * 100vw);
  }
`;

const InputWrapper = styled.div`
  width: 450px;
  height: 40px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #191a1a;
  display: flex;
  align-items: center;
  margin-top: 12px;
  border: ${(props) =>
    Number(props.inputFocus) === Number(props.number)
      ? "solid 1px #099f3c"
      : "none"};
  @media (max-width: 720px) {
    width: 100%;
    height: calc((79 / 1280) * 100vh);
    border: ${(props) =>
      Number(props.inputFocus) === Number(props.number)
        ? "solid 1px #099f3c"
        : "solid 2px #333"};
  }
`;

const Input = styled.input`
  width: 80%;
  height: 80%;
  margin-left: 15px;
  background-color: #191a1a;
  border: none;
  caret-color: #fff;
  color: #fff;

  &:focus::placeholder {
    color: transparent;
  }
  &::placeholder {
    font-family: "Noto Sans KR", sans-serif;
    opacity: 0.4;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 3.93;
    letter-spacing: -0.35px;
    text-align: left;
    color: rgba(255, 255, 255, 0.4);
  }
  &:hover {
    cursor: pointer;
  }

  @media (max-width: 720px) {
    width: 100%;
    font-size: calc((24 / 720) * 100vw);
    &::placeholder {
      font-size: calc((24 / 720) * 100vw);
    }
  }
`;

const CheckBoxContainer = styled.div`
  width: 400px;
  height: 16px;
  display: flex;
  align-items: center;
`;

const CheckBoxOn = styled.div`
  background-image: url("/images/popup/Check.png");
  background-size: contain;
  width: 16px;
  height: 16px;
  @media (max-width: 720px) {
    width: calc((34 / 720) * 100vw);
    height: calc((34 / 1280) * 100vh);
  }
`;

const CheckBoxOff = styled.div`
  width: 16px;
  height: 16px;
  border: 1.5px solid #000;
  border-radius: 5px;
  background-color: #fff;
  @media (max-width: 720px) {
    width: calc((34 / 720) * 100vw);
    height: calc((34 / 1280) * 100vh);
  }
`;

const CheckText = styled.span`
  margin: 1px 0 1px 7px;
  height: auto;
  object-fit: contain;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.3px;
  text-align: left;
  color: #ccc;
  @media (max-width: 720px) {
    font-size: calc((24 / 720) * 100vw);
  }
`;

const Rectangle = styled.button`
  width: 450px;
  height: 50px;
  margin: 25px 2px 15px 0;
  padding: 17px 202px 17px 202px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #19793a;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 10px;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.4px;
  text-align: left;
  color: #fff;
  span{
    display : inline-block;
    width : 100px;
  }
  &:hover {
    filter: brightness(1.1);
  }
  &:active {
    transform: scale(0.95);
    transition: all 0.1s ease-in-out;
  }

  @media (max-width: 720px) {
    width: 100%;
    padding: 0;
    height: calc((80 / 1280) * 100vh);
    font-size: calc((28 / 720) * 100vw);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align : center;
    span {
      margin: 0 auto;
    }
  }
`;

const RectangleDisabled = styled.button`
  width: 450px;
  height: 50px;
  margin: 25px 2px 15px 0;
  padding: 17px 202px 17px 202px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #19793a;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 10px;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.4px;
  text-align: left;
  color: #fff;
  span{
    display : inline-block;
    width : 100px;
  }
  @media (max-width: 720px) {
    width: 100%;
    padding: 0;
    height: calc((80 / 1280) * 100vh);
    font-size: calc((28 / 720) * 100vw);
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      margin: 0 auto;
    }
  }
`;

const Text = styled.p`
  opacity: 0.5;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.14;
  letter-spacing: -0.35px;
  text-align: center;
  color: ${(props) => props.color || "rgba(255, 255, 255, 0.5)"};
  &:hover {
    color: ${(props) => props.color && "rgba(0, 255, 88, 0.8)"};
  }
  @media (max-width: 720px) {
    font-size: calc((24 / 720) * 100vw);
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

//???????????? ????????? ?????? ?????????
const checkPassword = (memberPassword) => {
  // let regExp = /\d/
  let regExp =  /^[0-9]*$/;
  // ????????? ?????? ?????? true ??????
  return regExp.test(memberPassword)
}

//???????????? ????????? ?????? ?????????
const checkPasswordNumber = (memberPassword) => {
  var eng = /^[a-zA-Z]*$/; 
  // ????????? ?????? ?????? true ??????
  return eng.test(memberPassword)
}
//????????? ????????? ??????
const checkId = (memberId) => {
  //  8 ~ 10??? ??????, ?????? ??????
  // var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
  let regExp = /^[|a-z|A-Z|0-9|]+$/;
  // ????????? ?????? ?????? true ??????
  return regExp.test(memberId)
}


  
const Login = ({ login , setLogin, setSearchUserInfo, setSignup ,signToggle , setSignToggle , check, setCheck  }) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [memberId , setMemberId] = useState("")
  const [memberPassword , setMemberPassword] = useState("")
  const [autorization, setAutorization] = useState()
  const [loginCheckToggle, setLoginCheckToggle] = useState(false)

  // ?????? ???????????????
  const [ timeStamp, setTimeStamp] = useState("")

  // const expires = new Date();
  // // ?????? ??????, ????????? ????????? ????????? +3
  // expires.setFullYear(expires.getFullYear() + 3);

  const LoginLogic = () => {
    if(memberId === ""){
      alert("???????????? ????????? ?????????")
    }else if(!(memberId.length >= 4 && memberId.length <= 16)){
      alert("???????????? 4?????? ?????? 16?????? ???????????? ?????????.")
    }else if(checkId(memberId) === false){
      alert("???????????? ??????/???????????? ??????????????? ?????????")
    }else if(memberPassword === ""){
      alert("??????????????? ????????? ?????????")
    }else if(checkPassword(memberPassword)){
      alert("??????????????? ?????? 1??? ????????? ????????? ??????????????? ?????????")
    }else if(checkPasswordNumber(memberPassword)){
      alert("??????????????? ?????? 1??? ????????? ????????? ??????????????? ?????????")
    }else if(!(memberPassword.length >= 6 && memberId.length <= 20)){
      alert("??????????????? 6?????? ?????? 20?????? ???????????? ?????????")
    }else{
      Login()
    }
  }
  useEffect(()=>{
    TimeStampData(setTimeStamp)
  },[])

  // ????????????????????? newdate??? ??????
  const dateTime = timeStamp !== "" && Math.floor(new Date().getTime() / 1000)  - timeStamp

  // let expires = new Date();
  // expires.setSeconds(expires.getSeconds() + timePlus);

  const cookies = new Cookies();
  // ?????????
  const Login = async() => {
    setLoginCheckToggle(true)
    await axios.post(process.env.REACT_APP_DB_HOST +  '/api/auth/login', {
      member_id: memberId, // [String] ?????????
      password: memberPassword, // [String] ????????????
      auto_login: check.autoLogin // [Boolean] True or False (??????????????? ??????)
    }).then(res => {
      if(res.data.status_code === 400){
        alert(res.data.msg)
      }
      // ???????????? ???????????????
      if(res.data.status_code === 200 && check.id === true ){
        // ????????? ?????? ????????? 3??? ??????
        const timePlus = dateTime + 94608000;
        let expires = new Date();
        expires.setSeconds(expires.getSeconds() + timePlus);
        setCookie('remember_login_id' , memberId , {
          path:"/",
          expires,
          // secure:true,
          // sameSite:'none',
        })
      }else{
        cookies.remove("remember_login_id")
      }

      // ???????????? ???????????????
      if(res.data.status_code === 200 && check.id === true && check.autoLogin === false ){
        // ????????? ?????? 
        const token = res.data.data.Authorization 
        const tokenReplace = token.replace("Bearer ", "")
          // 3??? ??????
          const timePlus = dateTime + 94608000;
          let expires = new Date();
          expires.setSeconds(expires.getSeconds() + timePlus);
          // ????????? ??????2 ?????? ?????? ?????? ?????? 
            setCookie('cityauth' , tokenReplace , {
              path:"/",
              expires,
              // secure:true,
              // sameSite:'none',
            })
            // setAutorization(getCookie('remember_login_id'));
            setSignToggle(true) 
            MemberMe()
      }

      // autoLogin??? ???????????????
      if(res.data.status_code === 200 && check.id === false && check.autoLogin === true ){
        // ????????? ?????? 
        const token = res.data.data.Authorization 
        const tokenReplace = token.replace("Bearer ", "")
          // 3?????? ??????
          const timePlus = dateTime + 7776000;
          let expires = new Date();
          expires.setSeconds(expires.getSeconds() + timePlus);
          // ????????? ??????2 ?????? ?????? ?????? ?????? 
            setCookie('cityauth' , tokenReplace , {
              path:"/",
              expires,
              // secure:true,
              // sameSite:'none',
            })
            // setAutorization(getCookie('remember_login_id'));
            setSignToggle(true) 
            MemberMe()
      }
      
      // ?????? ?????? ????????????
      if(res.data.status_code === 200 && check.autoLogin === false && check.id === false ){
        // ????????? ?????? 
        const token = res.data.data.Authorization 
        const tokenReplace = token.replace("Bearer ", "")
          // 6?????? ??????
          const timePlus = dateTime + 21600;
          let expires = new Date();
          expires.setSeconds(expires.getSeconds() + timePlus);
          // ????????? ??????2 ?????? ?????? ?????? ?????? 
            setCookie('cityauth' , tokenReplace , {
              path:"/",
              expires,
              // secure:true,
              // sameSite:'none',
            })
            // setAutorization(getCookie('remember_login_id'));
            setSignToggle(true) 
            MemberMe()
      }
      
      // ?????? ??????????????? 3?????? cityauth ?????????
      if(res.data.status_code === 200 && (check.autoLogin === true && check.id=== true) ){
        // ????????? ?????? 
        const token = res.data.data.Authorization 
        const tokenReplace = token.replace("Bearer ", "")
        // 3?????? ??????
        const timePlus = dateTime + 7776000;
        let expires = new Date();
        expires.setSeconds(expires.getSeconds() + timePlus);
        // ????????? ??????2 ?????? ?????? ?????? ?????? 
          setCookie('cityauth' , tokenReplace , {
            path:"/",
            expires,
            // secure:true,
            // sameSite:'none',
          })
          // setAutorization(getCookie('remember_login_id'));
          setSignToggle(true) 
          MemberMe()
      }

      if(res.status === 400){
        alert(res.data.data.msg)
      }
    }).catch(function (error) {
        console.log(error)
    });
    setLoginCheckToggle(false)
  }

  useEffect(()=>{
    if(getCookie("remember_login_id") !== undefined ){
      setMemberId(getCookie("remember_login_id"))
      setCheck({ ...check, id: true })
    }
  },[getCookie("remember_login_id")])
  useEffect(()=>{
    getCookie("remember_login_id")
  },[])

  console.log(getCookie("remember_login_id"))

  const onKeyPress = (e) => {
    if(e.key === 'Enter'){
      LoginLogic()
    }
  }

  return (
    <Wrapper>
      <TitleContainer>
        <Title>?????????</Title>
        <img
          src="/images/common/Close.png"
          alt=""
          onClick={() => setLogin(false)}
        ></img>
      </TitleContainer>
      <InputContainer>
        <InputTitle>?????????</InputTitle>
        <InputWrapper inputFocus={inputFocus} number={1}>
          <Input
            placeholder="????????? ??????"
            onFocus={() => setInputFocus(1)}
            onBlur={() => setInputFocus(0)}
            onChange={(e)=> setMemberId(e.target.value)}
            // value={getCookie("remember_login_id") !== "" && getCookie("remember_login_id")}
            defaultValue={getCookie("remember_login_id") !== "" ? getCookie("remember_login_id") : ""}
          ></Input>
        </InputWrapper>
      </InputContainer>
      <InputContainer>
        <InputTitle>????????????</InputTitle>
        <InputWrapper inputFocus={inputFocus} number={2}>
          <Input
            placeholder="???????????? ??????"
            onFocus={() => setInputFocus(2)}
            onBlur={() => setInputFocus(0)}
            onChange={(e) => setMemberPassword(e.target.value)}
            type="password"
            onKeyPress={(e) => onKeyPress(e)}
          ></Input>
        </InputWrapper>
      </InputContainer>
      <CheckBoxContainer>
        {check.id ? (
          <CheckBoxOn onClick={() => setCheck({ ...check, id: false })} />
        ) : (
          <CheckBoxOff onClick={() => setCheck({ ...check, id: true })} />
        )}
        <CheckText>???????????????</CheckText>
        {check.autoLogin ? (
          <CheckBoxOn
            onClick={() => setCheck({ ...check, autoLogin: false })}
            style={{ marginLeft: "21px" }}
          />
        ) : (
          <CheckBoxOff
            onClick={() => setCheck({ ...check, autoLogin: true })}
            style={{ marginLeft: "21px" }}
          />
        )}
        <CheckText>???????????????</CheckText>
      </CheckBoxContainer>
        {
          loginCheckToggle === false && signToggle === false ?
          <Rectangle onClick={() => LoginLogic()}>
            <span>?????????</span>
          </Rectangle>
          :
          (
            loginCheckToggle === true && signToggle === false ?
            <RectangleDisabled disabled>
              <span>????????????</span>
            </RectangleDisabled>
            :
            loginCheckToggle === false && signToggle === true &&
            <RectangleDisabled disabled>
              <span>????????? ??????</span>
            </RectangleDisabled>
          )
        }

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>?????? ????????? ?????????????&nbsp;</Text>
        <Text
          color="rgba(0, 255, 88, 0.5)"
          onClick={() => {
            setSignup(true);
            setLogin(false);
          }}
          style={{ cursor: "pointer" }}
        >
          ????????????
        </Text>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>?????????/??????????????? ????????????????&nbsp;</Text>
        <Text
          color="rgba(0, 255, 88, 0.5)"
          onClick={() => {
            setSearchUserInfo(true);
            setLogin(false);
          }}
          style={{ cursor: "pointer" }}
        >
          ?????????/??????????????????
        </Text>
      </div>
    </Wrapper>
  );
};

export default Login;
