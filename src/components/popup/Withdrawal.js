import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UserDelte } from "../apis/api";
import { getCookie } from "../apis/cookie";
import "./Withdrawal.css"
const Wrapper = styled.div`
  width: 600px;
  height: 90vh;
  padding: 31px 24px 40px 25px;
  object-fit: contain;
  border-radius: 12px;
  background-color: #202221;
  overflow: hidden;
  overflow-y: auto;
  @media (max-width: 720px) {
    width: calc((640 / 720) * 100vw);
    height: calc((1000 / 1280) * 100vh);
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

const InputTitle = styled.span`
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

const SubTitle = styled.span`
  width: 227px;
  height: 15px;
  margin: 29px 0px 21px 1px;
  object-fit: contain;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 3.67;
  letter-spacing: -0.38px;
  text-align: left;
  color: #fff;
  @media (max-width: 720px) {
    font-size: calc((24 / 720) * 100vw);
    line-height: 0;
    width: 100%;
    display: inline-block;
    margin: calc((40 / 1280) * 100vh) 0;
  }
`;

const CheckBoxContainer = styled.div`
  width: 550px;
  height: 56px;
  object-fit: contain;
  border-top: solid 1px rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  height: ${(props) => props.type === "etc" && "30px"};
  padding-top: ${(props) => props.type === "etc" && "10px"};
  .radio {
    height : 30px;
  }
  @media (max-width: 720px) {
    width: 100%;
    height: fit-content;
  }
`;

const CheckBoxText = styled.span`
  opacity: 0.7;
  margin-left: 10px;
  margin-bottom: 3px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.35px;
  color: rgba(255, 255, 255, 0.7);
  @media (max-width: 720px) {
    font-size: calc((24 / 720) * 100vw);
    margin: calc((42 / 1280) * 100vh) 0;
    margin: ${(props) => props.type === "etc" && "calc((20 / 1280) * 100vh) 0"};
    margin-left: calc((19 / 720) * 100vw);
  }
`;

const InputContainer = styled.div`
  margin-top : 10px;
  width: 548px;
  height: 40px;
  object-fit: contain;
  margin-bottom: 12px;
  @media (max-width: 720px) {
    width: 100%;
    height: fit-content;
  }
`;

const InputWrapper = styled.div`
  width: 548px;
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

const CautionContainer = styled.div`
  width: 550px;
  /* height: 324px; */
  margin: 61px 0 0;
  padding: 30px 23px 32px 17px;
  object-fit: contain;
  border-radius: 8px;
  background-color: #2c2d2d;
  height: max-content;
  @media (max-width: 720px) {
    width: 100%;
    margin-top: calc((40 / 1280) * 100vh);
    padding: calc((50 / 1280) * 100vh) calc((30 / 720) * 100vw);
  }
`;

const CautionList = styled.ul`
  display: inline-block;
  @media (max-width: 720px) {
    width: 100%;
    height: fit-content;
  }
`;

const CautionText = styled.li`
  margin: 0 0 0 6px;
  object-fit: contain;
  opacity: 0.7;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.92;
  letter-spacing: -0.65px;
  text-align: left;
  color: rgba(255, 255, 255, 0.7);
  list-style-type: "-";
  float: left;
  padding-left: 5px;
  @media (max-width: 720px) {
    font-size: calc((20 / 720) * 100vw);
  }
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
  object-fit: contain;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 5;
  letter-spacing: -0.3px;
  text-align: left;
  color: #ccc;
  @media (max-width: 720px) {
    font-size: calc((24 / 720) * 100vw);
  }
`;

const Rectangle = styled.button`
  width: 100px;
  height: 40px;
  margin: auto;
  display: block;
  border-radius: 6px;
  border: solid 1px #666;

  object-fit: contain;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 10px;
  letter-spacing: -0.3px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);

  &:hover {
    background-color: #19793a;
    color: rgba(255, 255, 255, 1);
    border: none;
  }
  &:active {
    transform: scale(0.95);
    transition: all 0.1s ease-in-out;
  }
  @media (max-width: 720px) {
    width: calc((200 / 720) * 100vw);
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc((80 / 1280) * 100vh);
    font-size: calc((28 / 720) * 100vw);
  }
`;

//비밀번호 유효성 검사 숫자만
const checkPassword = (memberPassword) => {
  // let regExp = /\d/
  let regExp =  /^[0-9]*$/;
  // 형식에 맞는 경우 true 리턴
  return regExp.test(memberPassword)
}

//비밀번호 유효성 검사 영어만
const checkPasswordNumber = (memberPassword) => {
  var eng = /^[a-zA-Z]*$/; 
  // 형식에 맞는 경우 true 리턴
  return eng.test(memberPassword)
}

const Withdrawal = ({ setWithdrawal }) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [check, setCheck] = useState(false);

  // 비밀번호 확인
  const [ userPassword, setUserPassword] = useState("")
  // 탈퇴이유
  const [ userReason, setUserReason] = useState("")
  // 기타
  const [ userEtc , setUserEtc ] = useState(false)
  const [ userReasonInput, setUserReasonInput] = useState("")

  const userDelteButton = () => {
    if(userPassword === ""){
      alert("비밀번호를 입력해주세요")
    }else if(checkPassword(userPassword)){
      alert("비밀번호는 최소 1개 이상의 영어가 포함되어야 합니다")
    }else if(checkPasswordNumber(userPassword)){
      alert("비밀번호는 최소 1개 이상의 숫자가 포함되어야 합니다")
    }else if(check === false){
      alert("주의사항을 확인해주세요")
    }else{
      UserDelte(userPassword , userReason === "기타" ? userReasonInput : userReason)
    }
  }

  useEffect(()=>{
   if(userReason === "기타"){
      setUserEtc(true)
    }else{
      setUserEtc(false)
    }
  },[ userReason , userEtc])

  const labelTextValue = (e) => {
    setUserReason(e)
  }

  return (
    <Wrapper>
      <TitleContainer>
        <Title>회원탈퇴</Title>
        <img
          src="/images/common/Close.png"
          alt=""
          onClick={() => setWithdrawal(false)}
        ></img>
      </TitleContainer>
      <SubTitle>스포시티를 떠나는 이유를 알려주세요.</SubTitle>
      <CheckBoxContainer>   
        <span className="radio" id="lend_list">
            <input type="radio" id="view_live0" name="viewtype" value="이용하고 싶은 서비스가 없어요" className="inputss" onClick={(e) => labelTextValue(e.target.value)}/>
            <label for="view_live0" className="labelText">
            </label>
            <label for="view_live0" className="labelText">
              <CheckBoxText>이용하고 싶은 서비스가 없어요</CheckBoxText>
            </label>
         </span>
      </CheckBoxContainer>
      <CheckBoxContainer>
        <span className="radio" id="lend_list">
            <input type="radio" id="view_live2" name="viewtype" value="서비스 퀄리티가 낮아요"className="inputss" onClick={(e) => labelTextValue(e.target.value)}/>
            <label for="view_live2">
            </label>
            <label for="view_live2">
              <CheckBoxText>서비스 퀄리티가 낮아요</CheckBoxText>
            </label>
         </span>
      </CheckBoxContainer>
      <CheckBoxContainer>
        <span className="radio" id="lend_list">
            <input type="radio" id="view_live3" name="viewtype" value="비매너 회원을 만났어요"className="inputss" onClick={(e) => labelTextValue(e.target.value)}/>
            <label for="view_live3">
            </label>
            <label for="view_live3">
             <CheckBoxText>비매너 회원을 만났어요</CheckBoxText>
            </label>
         </span>
      </CheckBoxContainer>
      <CheckBoxContainer>
        <span className="radio" id="lend_list">
            <input type="radio" id="view_live4" name="viewtype" value="잦은 오류가 발생해요"className="inputss" onClick={(e) => labelTextValue(e.target.value)}/>
            <label for="view_live4">
            </label>
            <label for="view_live4">
              <CheckBoxText>잦은 오류가 발생해요</CheckBoxText>
            </label>
         </span>
      </CheckBoxContainer>
      <CheckBoxContainer>
        <span className="radio" id="lend_list">
            <input type="radio" id="view_live5" name="viewtype" value="대체할 만한 서비스를 찾았어요"className="inputss" onClick={(e) => labelTextValue(e.target.value)}/>
            <label for="view_live5">
            </label>
            <label for="view_live5">
              <CheckBoxText>대체할 만한 서비스를 찾았어요</CheckBoxText>
            </label>
         </span>
      </CheckBoxContainer>
      <CheckBoxContainer type="etc">
        <span className="radio" id="lend_list">
            <input type="radio" id="view_live6" name="viewtype" value="기타" className="inputss" onClick={(e) => labelTextValue(e.target.value)}/>
            <label for="view_live6">
            </label>
            <label for="view_live6">
              <CheckBoxText type="etc">기타</CheckBoxText>
            </label>
         </span>
      </CheckBoxContainer>
      {
        userEtc === true ?
        <InputContainer>
          <InputWrapper inputFocus={inputFocus} number={1}>
            <Input
              placeholder="기타 입력"
              onFocus={() => setInputFocus(1)}
              onBlur={() => setInputFocus(0)}
              onChange={(e)=> setUserReasonInput(e.target.value)}
            ></Input>
          </InputWrapper>
        </InputContainer>
        :
        ""
      }
      <InputContainer>
        <InputTitle>비밀번호 확인</InputTitle>
        <InputWrapper inputFocus={inputFocus} number={2}>
          <Input
            placeholder="비밀번호 입력"
            type="password"
            onFocus={() => setInputFocus(2)}
            onBlur={() => setInputFocus(0)}
            onChange={(e)=>setUserPassword(e.target.value)}
          ></Input>
        </InputWrapper>
      </InputContainer>
      {/*
       */}
      <CautionContainer>
        <CautionList>
          <CautionText>
            {/* 현재 사용중인 계정 정보는 회원 탈퇴 후 복구가 불가합니다. */}
            탈퇴 후 회원님의 정보는 스포시티 개인정보처리방침에 따라 삭제 처리 됩니다.
          </CautionText>
          <CautionText>
            진행 중인 거래건이 있거나 페널티 조치 중인 경우 탈퇴 신청이
            불가합니다.
          </CautionText>
          <CautionText>
            탈퇴 후 회원님의 정보는 전자상거래 소비자보호법에 의거한 스포시티
            개인정보처리방침에 따라 관리 됩니다.
          </CautionText>
          <CautionText>
            현재 보유 중인 쿠폰 및 무상지급된 스포시티 캐시와 마일리지는 모두
            자동 소멸되며, 탈퇴 후 재가입 하더라도 이미 소멸되었기 때문에
            양도되지 않습니다.
          </CautionText>
          <CautionText>
            구매후기 및 답글은 탈퇴 시 자동 삭제되지 않습니다. 탈퇴 후에는 계정
            정보가 삭제되어 본인 확인이 불가하므로, 탈퇴 신청 전에 게시글 삭제를
            요청해 주시기 바랍니다.
          </CautionText>
          <CautionText>
            충전 캐시 또는 수익금이 있을 경우, 캐시 환불 및 수익금 출금을 통해
            정산이 완료된
          </CautionText>
          <CautionText>이후 탈퇴를 신청 하셔야 합니다.</CautionText>
          <CautionText>
            무상으로 지급된 스포시티 캐시는 탈퇴와 함께 자동 소멸됩니다.
          </CautionText>
        </CautionList>
      </CautionContainer>
      <CheckBoxContainer style={{ border: "none" }}>
        {check ? (
          <CheckBoxOn onClick={() => setCheck(!check)} />
        ) : (
          <CheckBoxOff onClick={() => setCheck(!check)} />
        )}
        <CheckText>주의사항을 모두 확인하였습니다.</CheckText>
      </CheckBoxContainer>
      <div style={{ width: "100%" }}>
        <Rectangle onClick={()=> userDelteButton()}>회원탈퇴</Rectangle>
      </div>
    </Wrapper>
  );
};

export default Withdrawal;
