import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top : 50%;
  left : 50%;
  transform  : translate(-50%,-50%);
  width: 500px;
  height: 439px;
  padding: 31px 24px 41px;
  object-fit: contain;
  border-radius: 12px;
  background-color: #202221;
  @media (max-width: 720px) {
    width: calc((640 / 720) * 100vw);
    height: calc((761 / 1280) * 100vh);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
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
    height: calc((80 / 1280) * 100vh);
    border: ${(props) =>
      Number(props.inputFocus) === Number(props.number)
        ? "solid 1px #099f3c"
        : "solid 2px #333"};
    margin-left: 0;
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
  cursor: pointer;
  @media (max-width: 720px) {
    width: 100%;
    font-size: calc((24 / 720) * 100vw);
    &::placeholder {
      font-size: calc((24 / 720) * 100vw);
    }
  }
`;

const Rectangle = styled.button`
  width: 450px;
  height: 50px;
  margin: 15px 2px 15px 0;
  object-fit: contain;
  border-radius: 6px;
  background-color: #19793a;

  font-family: "Noto Sans KR", sans-serif;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  /* line-height: 10px; */
  text-align: center;
  letter-spacing: -0.4px;
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
    align-items: center;
    justify-content: center;
    height: calc((80 / 1280) * 100vh);
    font-size: calc((28 / 720) * 100vw);
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

const ChangePW = ({ setPath , setLogin }) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [ userPassword , setUserPassword] = useState("")
  const [ userPasswordConfirm , setUserPasswordConfirm] = useState("")

  const [ userPasswordToggle, setUserPasswordToggle] = useState(false)
  const [ userPasswordBlooean, setUserPasswordBlooean] = useState(false)

  const [hashKey , setHashKey] = useState()
  const [userId , setUserId] = useState("")

  // const [test, setTest] = useState()

  let navigate = useNavigate();
  useEffect(()=>{
    const test = window.location.search
    setHashKey(test.replace("?s=", ""))
  },[])
  
  const changePassWordEvent = () => {
    if(userPassword === "" ){
      alert("??????????????? ??????????????????")
    }else if(userPasswordConfirm === "" ){
      alert("???????????? ???????????? ??????????????????")
    }else if(!(userPassword === userPasswordConfirm) ){
      alert("??????????????? ?????? ????????????")
    }else if(checkPassword(userPassword)){
      alert("??????????????? ?????? 1??? ????????? ????????? ??????????????? ?????????")
    }else if(checkPasswordNumber(userPassword)){
      alert("??????????????? ?????? 1??? ????????? ????????? ??????????????? ?????????")
    }else {
      changePassword()
    }
  }

  //  ?????? ??????
  const changePassword = async() => {
    setUserPasswordToggle(true)
      await axios.post(process.env.REACT_APP_DB_HOST +  '/api/auth/find/account/change', {
        password: userPassword,// [String] ????????? ????????????
        hash_key:  hashKey// [String] ?????????
      }).then(res => {
          if(res.data.status_code === 200 ){
            alert(res.data.data.msg)
          }else if(res.data.status_code === 400){
            alert(res.data.msg)
          }else if(res.status === 200){
            alert(res.data.data.msg)
          }
          setUserPasswordBlooean(true)
          setLogin(true)
    }).catch(function (error) {
      console.log(error.respose.data.msg)
    });
    setUserPasswordToggle(false)
  }

  // ???????????? ???????????? ????????? 
  const changeId = async() => {
      await axios.post(process.env.REACT_APP_DB_HOST +  '/api/auth/find/account/look', {
        hash_key:  hashKey// [String] ?????????
      }).then(res => {
        if(res.data.status_code === 400 && res.data.msg !== "???????????? ???????????? ???????????????."){
          alert(res.data.msg)
          navigate("/");
          return; 
        }
        if(res.data.status_code !== 400){
          setUserId(res.data.data.member_id)
        }
    }).catch(function (error) {
      console.log(error)
      navigate("/");
    });
  }

  useEffect(()=>{
    if(hashKey !== ""){
      changeId()
    }
  },[hashKey])
  // useEffect(()=>{
  //   if(userId === "" && test !== "???????????? ???????????? ???????????????." ){
  //     changeId()
  //   }
  // },[])

  useEffect(()=>{
    if(userPasswordToggle === false && userPasswordBlooean === true){
      navigate("/");
    }
  },[userPasswordToggle,userPasswordBlooean])
  console.log(userPasswordToggle)

  useEffect(()=>{
    if(window.location.pathname === "/account/findpassword/"){
      setPath(true)
    }else{
      setPath(false)
    }
  },[setPath])
  
  return (
    <Wrapper>
      <TitleContainer>
        <Title>???????????? ?????????</Title>
        {/* <img
          src="/images/common/Close.png"
          alt=""
          onClick={() => setChangePW(false)}
        ></img> */}
      </TitleContainer>
      <InputContainer>
        <InputTitle>?????????(????????????)</InputTitle>
        <InputWrapper inputFocus={inputFocus} number={1}>
          <Input
            placeholder={userId === "" ? "?????? ???????????? ???????????? ????????????" : userId}
            onFocus={() => setInputFocus(1)}
            onBlur={() => setInputFocus(0)}
            disabled={1}
          ></Input>
        </InputWrapper>
      </InputContainer>
      <InputContainer>
        <InputTitle>????????? ????????????</InputTitle>
        <InputWrapper inputFocus={inputFocus} number={2}>
          <Input
            placeholder="????????? ???????????? ??????"
            type="password"
            onFocus={() => setInputFocus(2)}
            onBlur={() => setInputFocus(0)}
            onChange={(e) => setUserPassword(e.target.value)}
          ></Input>
        </InputWrapper>
      </InputContainer>
      <InputContainer>
        <InputTitle>????????? ???????????? ??????</InputTitle>
        <InputWrapper inputFocus={inputFocus} number={3}>
          <Input
            placeholder="????????? ???????????? ??????"
            type="password"
            onFocus={() => setInputFocus(3)}
            onBlur={() => setInputFocus(0)}
            onChange={(e) => setUserPasswordConfirm(e.target.value)}
          ></Input>
        </InputWrapper>
      </InputContainer>
      {
        userPasswordToggle === false && userPasswordBlooean === false ?
        <Rectangle onClick={() => changePassWordEvent()}>????????????</Rectangle>
        :
        (
          userPasswordToggle === true && userPasswordBlooean === false ?
          <Rectangle onClick={() => changePassWordEvent()}>?????????</Rectangle>
          :
          userPasswordToggle === false && userPasswordBlooean === true &&
          <Rectangle onClick={() => changePassWordEvent()}>????????????</Rectangle>
        )
      }
    </Wrapper>
  );
};

export default ChangePW;
