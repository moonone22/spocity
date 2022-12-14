import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { cookies } from "react-cookie";
import styled from "styled-components";
import { TimeStampData } from "../apis/api";
import { getCookie, setCookie } from "../apis/cookie";

const Wrapper = styled.div`
  width: 500px;
  /* height: 446px; */
  padding: 31px 24px 29px;
  object-fit: contain;
  border-radius: 12px;
  background-color: #202221;
  @media (max-width: 720px) {
    overflow: hidden;
    overflow-y: auto;
    width: calc((640 / 720) * 100vw);
    height: calc((1000 / 1280) * 100vh);
    display: flex;
    flex-direction: column;
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
    .email {
      display: flex;
      flex-direction: column;
      & > div {
        width: 100%;
        justify-content: ${(props) => props.hide && "flex-start"};
      }
    }
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
  width: ${(props) => props.width || "450px"};
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
    height: calc((80 / 1280) * 100vh);
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
    opacity: ${(props) => (props.select ? "1" : "0.4")};
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 3.93;
    letter-spacing: -0.35px;
    text-align: left;
    color: ${(props) => (props.select ? "#fff" : "rgba(255, 255, 255, 0.4)")};
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

const EmailContainer = styled.div`
  display: flex;
  align-items: center;
  .confirm {
    width: 130px;
  }
  @media (max-width: 720px) {
    width: 100%;
    .confirm {
      width: 30%;
    }
  }
`;

const Span = styled.span`
  width: 13px;
  height: 13px;
  margin: 0px 7px 0px 6px;
  object-fit: contain;
  opacity: 0.4;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.35px;
  text-align: left;
  color: rgba(255, 255, 255, 0.4);
  @media (max-width: 720px) {
    font-size: calc((28 / 720) * 100vw);
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc((28 / 720) * 100vw);
    height: calc((80 / 1280) * 100vh);
    margin-top: 12px;
  }
`;

const RectangleGray = styled.button`
  width: 107px;
  height: 42px;
  margin: 0px 0 0px 11px;
  padding: 10px 14px 14px 14px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #383a39;
  margin-top: 12px;

  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.35px;
  color: #fff;
  &:hover {
    filter: brightness(1.1);
  }
  &:active {
    transform: scale(0.95);
    transition: all 0.1s ease-in-out;
  }

  @media (max-width: 720px) {
    width: 100%;
    margin-left: 0;
    height: calc((80 / 1280) * 100vh);
    font-size: calc((28 / 720) * 100vw);
    .confirm {
      width: 10%;
    }
  }
`;
const RectangleGrayDisabled = styled.button`
    width: 107px;
    height: 42px;
    margin: 0px 0 0px 11px;
    padding: 10px 14px 14px 14px;
    object-fit: contain;
    border-radius: 6px;
    background-color: #383a39;
    margin-top: 12px;

    font-family: "Noto Sans KR", sans-serif;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.35px;
    color: #fff;
    
    filter: brightness(1.1);
    @media (max-width: 720px) {
      width: 100%;
      margin-left: 0;
      height: calc((80 / 1280) * 100vh);
      font-size: calc((28 / 720) * 100vw);
      .confirm {
        width: 10%;
      }
    }
`
const RectangleGrayEnable = styled.button`
    width: 107px;
    height: 42px;
    margin: 0px 0 0px 11px;
    padding: 10px 14px 14px 14px;
    object-fit: contain;
    border-radius: 6px;
    background-color: #383a39;
    margin-top: 12px;

    font-family: "Noto Sans KR", sans-serif;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.35px;
    color: rgba(255,255,255,0.5);
    
    filter: brightness(1.1);
    @media (max-width: 720px) {
      width: 100%;
      margin-left: 0;
      height: calc((80 / 1280) * 100vh);
      font-size: calc((28 / 720) * 100vw);
      .confirm {
        width: 10%;
      }
    }
`
const RectangleGrays = styled.button`
  width: 107px;
  height: 42px;
  margin: 0px 0 0px 11px;
  padding: 10px 14px 14px 14px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #383a39;
  margin-top: 12px;

  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.35px;
  color: #fff;
  &:hover {
    filter: brightness(1.1);
  }
  &:active {
    transform: scale(0.95);
    transition: all 0.1s ease-in-out;
  }

  @media (max-width: 720px) {
    width: 100%;
    margin-left: 0;
    height: calc((80 / 1280) * 100vh);
    font-size: calc((28 / 720) * 100vw);
    .confirm {
      width: 10%;
    }
  }
`;

const RectangleGraysDisabled = styled.button`
  width: 107px;
  height: 42px;
  margin: 0px 0 0px 11px;
  padding: 10px 14px 14px 14px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #383a39;
  margin-top: 12px;

  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.35px;
  color: #fff;

  @media (max-width: 720px) {
    width: 100%;
    margin-left: 0;
    height: calc((80 / 1280) * 100vh);
    font-size: calc((28 / 720) * 100vw);
    .confirm {
      width: 10%;
    }
  }
`;


// ???????????? ??????
const Rectangle = styled.button`
  width: 450px;
  height: 40px;
  margin: 24px 0 0;
  border-radius: 6px;
  background-color: #19793a;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.38px;
  color: #fff;
  &:hover {
    filter: brightness(1.1);
  }
  &:active {
    transform: scale(0.95);
    transition: all 0.1s ease-in-out;
  }
  @media (max-width: 720px) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: calc((27 / 1280) * 100vh) 0;
    height: calc((80 / 1280) * 100vh);
    font-size: calc((28 / 720) * 100vw);
  }
`;
// ???????????? ?????? ??????
const RectangleDisabled = styled.button`
  width: 450px;
  height: 40px;
  margin: 24px 0 0;
  border-radius: 6px;
  background-color: #19793a;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.38px;
  color: #fff;
  @media (max-width: 720px) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: calc((27 / 1280) * 100vh) 0;
    height: calc((80 / 1280) * 100vh);
    font-size: calc((28 / 720) * 100vw);
  }
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0 0 0;
  @media (max-width: 720px) {
    width: 100%;
    flex-direction: column;
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

const SelectFullContainer = styled.div`
  width: 154px;
  height: max-content;
  object-fit: contain;
  border-radius: 6px;
  background-color: #191a1a;
  position: absolute;
  top: 12px;
  right: 115px;
  z-index: 10000;
  @media (max-width: 720px) {
    right: 0;
    width: 45%;
  }
`;

const SelectFullTop = styled.div`
  width: 100%;
  height: 33px;
  margin: 1px 0;
  padding: 0px 16px 0px 20px;
  object-fit: contain;
  border-bottom: solid 1px #333;
  background-color: #191a1a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const SelectContentsWrapper = styled.div`
  height: 380px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 5px;
`;

const SelectText = styled.span`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1px;
  letter-spacing: -0.35px;
  text-align: left;
  color: #fff;
`;

const SelectContents = styled.div`
  width: 90%;
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
// ????????? ????????? ??????
const isEmail = (email) => {
  const emailRegex =
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  return emailRegex.test(email);
};

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

// // ???????????? ?????? ??????
// const test = (memberPassword) => {
//   //  8 ~ 10??? ??????, ?????? ??????
//   if(checkPassword(memberPassword) === false){
//     alert("??????????????? ?????? 1??? ????????? ????????? ??????????????? ?????????")
//   }else if(checkPasswordNumber(memberPassword) === false){
//     alert("??????????????? ?????? 1??? ????????? ????????? ??????????????? ?????????")
//   }else {

//     var reg = /^[a-zA-Z0-9]*$/
//     return reg.test(e)
//   }
// }

//????????? ????????? ??????
const checkId = (memberId) => {
  //  8 ~ 10??? ??????, ?????? ??????
  // var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
  let regExp = /^[|a-z|A-Z|0-9|]+$/;
  // ????????? ?????? ?????? true ??????
  return regExp.test(memberId)
}

//????????? ????????? ??????
const nickName = (memberNick) => {
  //  8 ~ 10??? ??????, ?????? ??????
  // var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
  let regExpNick =/^[???-???|???-???|a-z|A-Z|0-9|]+$/;
  // ????????? ?????? ?????? true ??????
  return regExpNick.test(memberNick)
}



const Signup = ({ setSignup, setLogin }) => {
  const [inputFocus, setInputFocus] = useState(false);
  // email input
  const [inputEmail , setInputEmail] = useState("")
  // email selector
  const [openSelect, setOpenSelect] = useState({
    open: false,
    text: "gmail.com",
  });

  // ?????? ????????? ??????
  const [getCookieData, setGetCookieData] = useState()
  // ???????????? ??????
  const [certification , setCertification  ] = useState("")
  
  // ??????????????? ??????????????? ?????? ??????, ????????? 
  // const [emailConfirmToggle , setEmailConfirmToggle] = useState(false)
  // const [authNum, setAuthNum] = useState(false);
  
  // ?????? ?????????
  const [email, setEmail] = useState("")
  const [memberId, setMemberId] = useState("")
  const [memberPassword, setMemberPassword] = useState("")
  const [memberPasswordConfirm, setMemberPasswordConfirm] = useState("")
  const [memberNick , setMemberNick] = useState("")

  const [emailToggleButton , setEmailToggleButton] = useState(false)
  const [emailToggleConfrim , setEmailToggleConfrim ] = useState(false)

  useEffect(()=>{
    setEmail(inputEmail + "@" + openSelect.text)
  },[inputEmail , openSelect])

  // ????????? ??????, ?????????, ???????????? ?????? ?????? ????????? 
  const [emailLodaing , setEmailLodaing] = useState(false)

  // ???????????? ?????? ?????????
  const [emailConfirmLodaing , setEmailConfirmLodaing] = useState(false)

  // ???????????? ?????? ????????? 
  const [userCreateLodaing , setUserCreateLodaing] = useState(false)
  // ???????????? ?????? ????????? 
  const [userCreateLodaingData , setUserCreateLodaingData] = useState(false)


  const emailSend = async() => {
    setEmailLodaing(true)
    const expires =  moment().add('3','h').toDate()
    await axios.post(process.env.REACT_APP_DB_HOST +  '/api/auth/register/verify/email/send', {
      email: email
    }).then(res => {
      if(res.data.status_code === 400){
        alert(res.data.msg)
      }
      setCookie('email_verify_secret_key' , res.data.data.email_verify_secret_key , {
        path:"/",
        expires,
        // secure:true,
        // sameSite:'none',
      })
      if(res.data.status_code === 200){
        setGetCookieData(getCookie('email_verify_secret_key'))
        alert("?????? ????????? ?????? ???????????? ???????????????! ?????? ????????? 3???????????????")
      }
      setEmailToggleButton(true)
      
    }).catch(function (error) {
      if(error.response){
        console.log(error.response.data.msg)
      }
    });
    setEmailLodaing(false)
  }

  // ?????? ??????
  const emailConfirmSend = async() => {
    setEmailConfirmLodaing(true)
      if(certification === ""){
        alert("??????????????? ??????????????????")
      }else if (checkPassword(certification) === false){
        alert("??????????????? ????????? ????????? ?????????")
      }else {
        await axios.post(process.env.REACT_APP_DB_HOST +  '/api/auth/register/verify/email/check', {
          email_verify_secret_key: getCookieData,
          code : certification
        }).then(res => {
          if(res.data.status_code === 200 ){
            alert(res.data.data.msg)
            setEmailToggleConfrim(true)
          }else if(res.data.status_code === 400){
            alert(res.data.msg)
          }
      }).catch(function (error) {
        console.log(error)
          // alert(error)
      });
    }
    setEmailConfirmLodaing(false)
  }


  // ????????? ?????????
  const createId = async() => {
    setUserCreateLodaing(true)
    if(emailToggleButton === true){
      await axios.post(process.env.REACT_APP_DB_HOST +  '/api/auth/register', {
        member_id: memberId, // [String] ?????????
        email: email, // [String] ????????? ??????
        password: memberPassword === memberPasswordConfirm && memberPassword , // [String] ????????????
        nick: memberNick, // [String] ?????????
        email_verify_secret_key: getCookieData,
      }).then(res => {
          if(res.data.status_code === 200 ){
            alert(res.data.data.msg)
            // ???????????? ????????????
            setLogin(true);
            // ??????????????? ????????????
            setSignup(false)

            setUserCreateLodaingData(true)
          }else if(res.status === 400){
            alert(res.data.data.msg)
          }else if(res.data.status_code === 400){
            alert(res.data.msg)
          }
      }).catch(function (error) {
          console.log(error)
          alert(error.response.data.msg)
      });
    }
    setUserCreateLodaing(false)
  }

  const emailForm = () => {
    if(isEmail(email) === false){
      alert("????????? ????????? ?????? ????????????")
    }
  }

  const emptyErr = () => {
    if(email === "" ){
      alert("???????????? ??????????????????")
    }else if (memberId === ""){
      alert("???????????? ??????????????????")
    }else if(!(memberId.length >= 4 && memberId.length <= 16)){
      alert("???????????? 4?????? ?????? 16?????? ???????????? ?????????.")
    }else if(checkId(memberId) === false){
      alert("???????????? ??????/???????????? ??????????????? ?????????")
    }else if(inputEmail === ""){
      alert("???????????? ????????? ?????????")
    }else if ( memberPassword === ""){
      alert("??????????????? ??????????????????")
    }else if (memberPasswordConfirm === "" ){
      alert("???????????? ???????????? ??????????????????")
    }else if(!(memberPassword.length >= 6 && memberId.length <= 20)){
      alert("??????????????? 6?????? ?????? 20?????? ???????????? ?????????")
    }else if(!(memberPassword === memberPasswordConfirm)){
      alert("??????????????? ???????????? ??????????????? ???????????? ????????????")
    }else if(checkPassword(memberPassword)){
      alert("??????????????? ?????? 1??? ????????? ????????? ??????????????? ?????????")
    }else if(checkPasswordNumber(memberPassword)){
      alert("??????????????? ?????? 1??? ????????? ????????? ??????????????? ?????????")
    }else if (memberNick === "" ){
      alert("???????????? ??????????????????")
    }else if(!(memberNick.length >= 2 && memberNick.length <= 12)){
      alert("????????? 2?????? ?????? 12?????? ???????????? ?????????.")
    }else if(nickName(memberNick) === false){
      alert("???????????? ??????/??????/????????? ?????? ????????????")
    }else if (email !== "" && emailToggleButton === false){
      alert("?????? ????????? ?????? ????????? ????????? ?????????")
    }else {
      createId()
    }
  }


  return (
    <Wrapper>
      <TitleContainer>
        <Title>????????????</Title>
        <img
          src="/images/common/Close.png"
          alt=""
          onClick={() => setSignup(false)}
        ></img>
      </TitleContainer>
      <InputContainer>
        <InputTitle>?????????</InputTitle>
        <InputWrapper inputFocus={inputFocus} number={1}>
          <Input
            placeholder="????????? ??????"
            onFocus={() => setInputFocus(1)}
            onBlur={() => setInputFocus(0)}
            maxLength="16"
            onChange={(e) => setMemberId(e.target.value)}
          ></Input>
        </InputWrapper>
      </InputContainer>
      <InputContainer hide={openSelect.open}>
        <InputTitle>????????? ??????</InputTitle>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
          className="email"
          hide={openSelect.open}
        >
          <EmailContainer>
            <InputWrapper inputFocus={inputFocus} number={2} width={"154px"}>
              <Input
                placeholder="????????? ??????"
                onFocus={() => setInputFocus(2)}
                onBlur={() => setInputFocus(0)}
                onChange={(e) => setInputEmail(e.target.value)}
                disabled={emailToggleButton  === true ? true : false}
                style={emailToggleButton  === false ? {color : "#fff"} :
                {color: "rgba(255,255,255,0.5)"}}
              ></Input>
            </InputWrapper>
            <Span>@</Span>
            {openSelect.open  && emailToggleButton === false ? (
              <>
                <InputWrapper
                  inputFocus={inputFocus}
                  number={10}
                  width={"154px"}
                  style={{ height: "42px", visibility: "hidden" }}
                  onClick={() => setOpenSelect({ ...openSelect, open: true })}
                ></InputWrapper>
                <SelectFullContainer>
                  <SelectFullTop
                    onClick={() =>
                      setOpenSelect({ ...openSelect, open: false })
                    }
                    style={{ borderRadius: "6px 6px 0 0" }}
                  >
                    <SelectText>{openSelect.text}</SelectText>
                    <img
                      src="/images/chat/ArrowDown.png"
                      alt=""
                      style={{
                        width: "10px",
                        height: "5px",
                        cursor: "pointer",
                        transform: `${
                          (openSelect.open)? "rotate(180deg)" : "rotate(0deg)"
                        }`,
                        // transition: "all 0.2s ease-in-out",
                      }}
                      // onClick={() => setOpenSelect({ ...openSelect, open: true })}
                    ></img>
                  </SelectFullTop>
                  <SelectContentsWrapper >
                    <SelectContents
                      onClick={() =>
                        setOpenSelect({ open: false, text: "naver.com" })
                      }
                    >
                      naver.com
                    </SelectContents>
                    <SelectContents
                      onClick={() =>
                        setOpenSelect({ open: false, text: "gmail.com" })
                      }
                    >
                      gmail.com
                    </SelectContents>
                    <SelectContents
                      onClick={() =>
                        setOpenSelect({ open: false, text: "hotmail.com" })
                      }
                    >
                      hotmail.com
                    </SelectContents>
                    <SelectContents
                      onClick={() =>
                        setOpenSelect({ open: false, text: "yahoo.co.kr" })
                      }
                    >
                      yahoo.co.kr
                    </SelectContents>
                    <SelectContents
                      onClick={() =>
                        setOpenSelect({ open: false, text: "yahoo.com" })
                      }
                    >
                      yahoo.com
                    </SelectContents>
                    <SelectContents
                      onClick={() =>
                        setOpenSelect({ open: false, text: "kakao.com" })
                      }
                    >
                      kakao.com
                    </SelectContents>
                    <SelectContents
                      onClick={() =>
                        setOpenSelect({ open: false, text: "korea.com" })
                      }
                    >
                      korea.com
                    </SelectContents>
                    <SelectContents
                      onClick={() =>
                        setOpenSelect({ open: false, text: "daum.net" })
                      }
                    >
                      daum.net
                    </SelectContents>
                    <SelectContents
                      onClick={() =>
                        setOpenSelect({ open: false, text: "hanmail.net" })
                      }
                    >
                      hanmail.net
                    </SelectContents>
                    <SelectContents
                      onClick={() =>
                        setOpenSelect({ open: false, text: "nate.com" })
                      }
                    >
                      nate.com
                    </SelectContents>
                    <SelectContents
                      onClick={() =>
                        setOpenSelect({ open: false, text: "live.com" })
                      }
                    >
                      live.com
                    </SelectContents>
                    <SelectContents
                      onClick={() =>
                        setOpenSelect({ open: false, text: "dreamwiz.com" })
                      }
                    >
                      dreamwiz.com
                    </SelectContents>
                    <SelectContents
                      onClick={() =>
                        setOpenSelect({ open: false, text: "outlook.com" })
                      }
                    >
                      outlook.com
                    </SelectContents>
                    <SelectContents
                      onClick={() =>
                        setOpenSelect({ open: false, text: "proton.me" })
                      }
                    >
                      proton.me
                    </SelectContents>
                    <SelectContents
                      onClick={() =>
                        setOpenSelect({ open: false, text: "protonmail.com" })
                      }
                    >
                      protonmail.com
                    </SelectContents>
                  </SelectContentsWrapper>
                </SelectFullContainer>
              </>
            ) : (
              <InputWrapper
                inputFocus={inputFocus}
                number={10}
                width={"154px"}
                onClick={() => setOpenSelect({ ...openSelect, open: true })}
              >
                <Input
                  placeholder={openSelect.text}
                  onFocus={() => setInputFocus(3)}
                  onBlur={() => setInputFocus(0)}
                  disabled={1}
                  select={1}
                ></Input>
                <img
                  src="/images/chat/ArrowDown.png"
                  alt=""
                  style={{
                    width: "10px",
                    height: "5px",
                    // transform: `${
                    //   openSelect.open ? "rotate(180deg)" : "rotate(0deg)"
                    // }`,
                    // transition: "transform 0.2s linear",
                    marginRight: "12px",
                  }}
                ></img>
              </InputWrapper>
            )}
          </EmailContainer>
          {
            emailLodaing === false && emailToggleButton === false ?
            <RectangleGray onClick={() => {
              emailSend();
              emailForm()
              }}>
                ??????????????????
            </RectangleGray>
            :
            (
              emailLodaing === true && emailToggleButton === false ?
                <RectangleGrayDisabled disabled>
                    ?????????
                </RectangleGrayDisabled>
              :
              emailLodaing === false && emailToggleButton === true &&
              <RectangleGrayEnable disabled>?????? ??????</RectangleGrayEnable>
            )
          }
        </div>
      </InputContainer>
      {getCookieData !== "" && emailToggleButton === true ? (
        <InputContainer hide={openSelect.open}>
          <InputTitle >????????????</InputTitle>
          <EmailContainer>
            <InputWrapper inputFocus={inputFocus} number={4}>
              <Input
                placeholder="???????????? ??????"
                onFocus={() => setInputFocus(4)}
                onBlur={() => setInputFocus(0)}
                onChange={(e) => setCertification(e.target.value)}
                maxLength='7'
                disabled={emailToggleConfrim  === true ? true : false}
                style={emailToggleConfrim  === false ? {color : "#fff"} :
                {color: "rgba(255,255,255,0.5)"}}
              ></Input>
            </InputWrapper>
            {
              emailConfirmLodaing === false && emailToggleConfrim === false ?
              <RectangleGrays className="confirm" onClick={() => {emailConfirmSend()}}>??????</RectangleGrays>
              :
              (
                emailConfirmLodaing === true && emailToggleConfrim === false ?
                <RectangleGraysDisabled disabled>?????????</RectangleGraysDisabled>
                :
                emailConfirmLodaing === false && emailToggleConfrim === true &&
                <RectangleGrayEnable disabled>?????? ??????</RectangleGrayEnable>
              )
            }
          </EmailContainer>
        </InputContainer>)
        :
        ""
      }
      <InputContainer>
        <InputTitle>????????????</InputTitle>
        <InputWrapper inputFocus={inputFocus} number={5}>
          <Input
            placeholder="???????????? ??????"
            onFocus={() => setInputFocus(5)}
            onBlur={() => setInputFocus(0)}
            type="password"
            onChange={(e) => setMemberPassword(e.target.value)}
            maxLength="20"
          ></Input>
        </InputWrapper>
      </InputContainer>
      <InputContainer>
        <InputTitle>???????????? ?????????</InputTitle>
        <InputWrapper inputFocus={inputFocus} number={6}>
          <Input
            placeholder="???????????? ?????????"
            onFocus={() => setInputFocus(6)}
            onBlur={() => setInputFocus(0)}
            type="password"
            onChange={(e) => setMemberPasswordConfirm(e.target.value)}
            maxLength="20"
          ></Input>
        </InputWrapper>
      </InputContainer>
      <InputContainer>
        <InputTitle>?????????</InputTitle>
        <InputWrapper inputFocus={inputFocus} number={7}>
          <Input
            placeholder="????????? ??????"
            onFocus={() => setInputFocus(7)}
            onBlur={() => setInputFocus(0)}
            onChange={(e) => setMemberNick(e.target.value)}
            maxLength="12"
          ></Input>
        </InputWrapper>
      </InputContainer>
      {/* <Rectangle onClick={()=>{
        emptyErr()
      }}>????????????</Rectangle> */}
      {
        userCreateLodaing === false && userCreateLodaingData === false ?
        <Rectangle onClick={()=>{
          emptyErr()
        }}>????????????</Rectangle>
        :
        (
          userCreateLodaing === true && userCreateLodaingData === false ?
          <RectangleDisabled disabled>???????????????</RectangleDisabled>
          :
          userCreateLodaing === false && userCreateLodaingData === true &&
          <RectangleDisabled disabled>????????????</RectangleDisabled>
        )
      }
      <TextContainer>
        <Text>????????? ?????? ????????? ????????? ?????????????&nbsp;</Text>
        <Text
          color="rgba(0, 255, 88, 0.5)"
          onClick={() => {
            setLogin(true);
            setSignup(false);
          }}
          style={{ cursor: "pointer" }}
        >
          ????????? ???????????? ??? ????????????.
        </Text>
      </TextContainer>
    </Wrapper>
  );
};

export default Signup;
