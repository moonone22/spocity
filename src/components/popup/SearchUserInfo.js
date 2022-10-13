import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 500px;
  height: 264px;
  padding: 31px 24px 40px;
  background-color: #202221;
  border-radius: 12px;
  @media (max-width: 720px) {
    width: calc((640 / 720) * 100vw);
    height: calc((416 / 1280) * 100vh);
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
  margin: 15px 2px 0 0;
  padding: 17px 170px 17px 170px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #19793a;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 16px;
  line-height: 10px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
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
    padding: calc((27 / 1280) * 100vh) 0;
    height: calc((80 / 1280) * 100vh);
    font-size: calc((28 / 720) * 100vw);
  }
`;
const RectangleDisabled = styled.button`
  width: 450px;
  height: 50px;
  margin: 15px 2px 0 0;
  padding: 17px 170px 17px 170px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #19793a;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 16px;
  line-height: 10px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.4px;
  color: #fff;
  @media (max-width: 720px) {
    width: 100%;
    padding: calc((27 / 1280) * 100vh) 0;
    height: calc((80 / 1280) * 100vh);
    font-size: calc((28 / 720) * 100vw);
  }
`;




// 이메일 유효성 검사
const isEmail = (email) => {
  const emailRegex =
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  return emailRegex.test(email);
};


const SearchUserInfo = ({ setSearchUserInfo , emialLoadingBlooean , setEmailLoadingBlooean}) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [emailFoundData, setEmailFoundData] = useState("")

  const [emailLoading , setEmailLoading] = useState(false)

  const searchUserButton = () => {
    if(emailFoundData === "" ){
      alert("이메일을 입력해주세요")
    }else if(isEmail(emailFoundData) === false){
      alert("이메일 형식이 맞지 않습니다")
    }else {
      emailFoundHasy()
    }
  }
  // 인증 확인
  const emailFoundHasy = async() => {
    setEmailLoading(true)
    await axios.post(process.env.REACT_APP_DB_HOST +  '/api/auth/find/account', {
      email : emailFoundData
    }).then(res => {
      if(res.data.status_code === 400){
        alert(res.data.msg)
      }else if(res.data.status_code === 200 ){
        setEmailLoadingBlooean(true)
        setSearchUserInfo(false)
      }else if(res.status === 200){
        alert(res.data.data.msg)
      }
      
      if(res.status === 400){
        alert(res.data.data.msg)
      }
  }).catch(function (error) {
    console.log(error)
      // alert(error)
  });
  setEmailLoading(false)
}

  // // 인증번호 발송
  // const emailFound = async() => {
  //   await axios.post( process.env.REACT_APP_DB_HOST + '/account/findpassword/?s=3nhhovxw6czuhfejx5etk1u3cqqd0z66yhcaxwambwbx4ov460/api/find/acount', {
  //     email: emailFoundData
  //   }).then(res => {
  //     console.log(res)
  //   }).catch(function (error) {
  //       alert(error);
  //   });
  // }

  return (
    <Wrapper>
      <TitleContainer>
        <Title>아이디/비밀번호찾기</Title>
        <img
          src="/images/common/Close.png"
          alt=""
          onClick={() => setSearchUserInfo(false)}
        ></img>
      </TitleContainer>
      <InputContainer>
        <InputTitle>이메일</InputTitle>
        <InputWrapper inputFocus={inputFocus} number={1}>
          <Input
            placeholder="이메일 입력"
            onFocus={() => setInputFocus(1)}
            onBlur={() => setInputFocus(0)}
            onChange={(e) => setEmailFoundData(e.target.value)}
          ></Input>
        </InputWrapper>
      </InputContainer>
        {
            emailLoading === false && emialLoadingBlooean === false ?
            <Rectangle onClick={() => searchUserButton()}>이메일 발송하기</Rectangle>
            :
            (
              emailLoading === true && emialLoadingBlooean === false ?
              <RectangleDisabled disabled>발송중</RectangleDisabled>
              :
              emailLoading === false && emialLoadingBlooean === true &&
              <RectangleDisabled disabled>이메일 발송 완료</RectangleDisabled>
            )
          }
    </Wrapper>
  );
};

export default SearchUserInfo;
