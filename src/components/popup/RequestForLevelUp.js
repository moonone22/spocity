import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 500px;
  height: max-content;
  padding: 30px 24px 41px;
  object-fit: contain;
  border-radius: 12px;
  background-color: #202221;
  @media (max-width: 1100px) {
    width: calc((640 / 720) * 100vw);
    /* height: calc((914 / 1280) * 100vh); */
    display: flex;
    padding: calc((30 / 1280) * 100vh) calc((30 / 720) * 100vw);
    flex-direction: column;
    justify-content: space-evenly;
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
  }
  @media (max-width: 1100px) {
    width: 100%;
    height: 28px;
    margin-bottom: 40px;
    img {
      width: 28px;
      height: 28px;
    }
  }
  @media (max-width: 720px) {
    width: 100%;
    margin: calc((20 / 1280) * 100vh) 0;
    img {
      width: calc((28 / 720) * 100vw);
      height: calc((28 / 720) * 100vw);
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
  @media (max-width: 1100px) {
    font-size: 30px;
    height: max-content;
  }
  @media (max-width: 720px) {
    font-size: calc((30 / 720) * 100vw);
  }
`;

const InputContainer = styled.div`
  width: 100%;
  object-fit: contain;
  margin-bottom: 12px;
  @media (max-width: 720px) {
    margin: calc((10 / 1280) * 100vh) 0;
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
  @media (max-width: 1100px) {
    font-size: 24px;
  }
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
      : "solid 1px #333"};
  @media (max-width: 1100px) {
    width: 100%;
    height: 79px;
  }
  @media (max-width: 720px) {
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
  @media (max-width: 1100px) {
    font-size: 24px;
    &::placeholder {
      font-size: 24px;
    }
  }
  @media (max-width: 720px) {
    font-size: calc((24 / 720) * 100vw);
    &::placeholder {
      font-size: calc((24 / 720) * 100vw);
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
  line-height: 1.79;
  letter-spacing: -0.35px;
  text-align: left;
  color: rgba(255, 255, 255, 0.7);

  @media (max-width: 1100px) {
    font-size: 20px;
  }
  @media (max-width: 720px) {
    font-size: calc((24 / 720) * 100vw);
  }
`;

const Rectangle = styled.button`
  width: 100px;
  height: 40px;
  margin: 29px 44px 0 176px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #19793a;

  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 10px;
  letter-spacing: -0.38px;
  color: #fff;
  &:hover {
    filter: brightness(1.1);
  }
  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 1100px) {
    width: 100%;
    height: 80px;
    margin: 0 auto;
    margin-top: 30px;
    font-size: 28px;
  }
  @media (max-width: 720px) {
    width: 100%;
    height: calc((80 / 1280) * 100vh);
    margin: calc((20 / 1280) * 100vh) 0;
    font-size: calc((28 / 720) * 100vw);
  }
`;

const SelectFullContainer = styled.div`
  width: 100%;
  height: max-content;
  object-fit: contain;
  border-radius: 6px;
  background-color: #191a1a;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10000;
  @media (max-width: 720px) {
    right: 0;
    width: 100%;
  }
`;

const SelectFullTop = styled.div`
  width: 100%;
  height: 33px;
  padding: 0 13px;
  object-fit: contain;
  border-bottom: solid 1px #333;
  background-color: #191a1a;
  border-radius: 6px 6px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  @media (max-width: 720px) {
    height: calc((79 / 1280) * 100vh);
  }
`;

const SelectContentsWrapper = styled.div`
  width: 100%;
  height: 124px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: solid 1px #333;

  @media (max-width: 720px) {
    height: calc((293 / 1280) * 100vh);
  }
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

  @media (max-width: 720px) {
    font-size: calc((24 / 720) * 100vw);
  }
`;

const SelectContents = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 26px;
  object-fit: contain;
  border-radius: 5px;

  padding-left: 13px;
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

  @media (max-width: 720px) {
    font-size: calc((24 / 720) * 100vw);
    height: calc((50 / 1280) * 100vh);
  }
`;

const SelectDefault = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  align-items: center;
  width: 100%;
  height: 37px;
  border-radius: 6px;
  border: solid 1px #333;
  background-color: #191a1a;
  position: relative;
  margin-top: 12px;

  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.28px;
  color: #fff;
  cursor: pointer;

  @media (max-width: 720px) {
    width: 100%;
    height: calc((79 / 1280) * 100vh);
    font-size: calc((24 / 720) * 100vw);
  }
`;

const AttendanceCheckContainer = styled.div`
  width: 450px;
  height: 80px;
  border-radius: 6px;
  background-color: #303231;

  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.38px;
  color: #07ac40;

  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 20px;

  p {
    font-size: 15px;
    font-weight: normal;
    letter-spacing: -0.38px;
    color: rgba(255, 255, 255, 0.7);
  }

  @media (max-width: 720px) {
    width: calc((560 / 720) * 100vw);
    height: calc((121 / 1280) * 100vh);
    font-size: calc((24 / 720) * 100vw);
    margin: calc((20 / 1280) * 100vh) 0;
    p {
      font-size: calc((24 / 720) * 100vw);
    }
  }
`;

const RequestForLevelUp = ({ setRequestForLevelUp }) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [openSelect, setOpenSelect] = useState({
    open: false,
    text: "실버",
    index: 1,
  });

  return (
    <Wrapper>
      <TitleContainer>
        <Title>등업 신청</Title>
        <img
          src="/images/main/Close_mobile.png"
          alt=""
          style={{ cursor: "pointer" }}
          onClick={() => setRequestForLevelUp(false)}
        ></img>
      </TitleContainer>
      <InputContainer>
        <InputTitle>등급 선택</InputTitle>
        <SelectDefault
          number={10}
          onClick={() => setOpenSelect({ ...openSelect, open: true })}
        >
          <div placeholder={openSelect.text} disabled={1} select={1}>
            {openSelect?.text || ""}
          </div>
          <img
            src="/images/chat/ArrowDown.png"
            alt=""
            style={{
              width: "10px",
              height: "5px",
            }}
          ></img>
          {openSelect.open === true && (
            <SelectFullContainer>
              <SelectFullTop
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenSelect({ ...openSelect, open: false });
                }}
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
                      openSelect.open ? "rotate(180deg)" : "rotate(0deg)"
                    }`,
                  }}
                ></img>
              </SelectFullTop>
              <SelectContentsWrapper>
                <SelectContents
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenSelect({ open: false, text: "실버", index: 1 });
                  }}
                >
                  실버
                </SelectContents>
                <SelectContents
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenSelect({ open: false, text: "골드", index: 2 });
                  }}
                >
                  골드
                </SelectContents>
                <SelectContents
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenSelect({ open: false, text: "플레티넘", index: 3 });
                  }}
                >
                  플레티넘
                </SelectContents>
                <SelectContents
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenSelect({ open: false, text: "다이아", index: 4 });
                  }}
                >
                  다이아
                </SelectContents>
              </SelectContentsWrapper>
            </SelectFullContainer>
          )}
        </SelectDefault>
      </InputContainer>
      {openSelect.index === 1 && (
        <AttendanceCheckContainer>
          <span>나의 출석 횟수 : 1</span>
          <p>(출석횟수 3회 이상 실버로 등급상승 가능 합니다)</p>
        </AttendanceCheckContainer>
      )}
      {openSelect.index > 1 && (
        <InputContainer>
          <InputTitle>보증업체명</InputTitle>
          <InputWrapper inputFocus={inputFocus} number={1}>
            <Input
              placeholder="보증업체명 입력"
              onFocus={() => setInputFocus(1)}
              onBlur={() => setInputFocus(0)}
            ></Input>
          </InputWrapper>
        </InputContainer>
      )}
      {openSelect.index > 1 && (
        <InputContainer>
          <InputTitle>닉네임</InputTitle>
          <InputWrapper inputFocus={inputFocus} number={2}>
            <Input
              placeholder="닉네임 입력"
              onFocus={() => setInputFocus(2)}
              onBlur={() => setInputFocus(0)}
            ></Input>
          </InputWrapper>
        </InputContainer>
      )}
      {openSelect.index > 2 && (
        <InputContainer>
          <InputTitle>충전금액</InputTitle>
          <InputWrapper inputFocus={inputFocus} number={3}>
            <Input
              placeholder="충전금액 입력"
              onFocus={() => setInputFocus(3)}
              onBlur={() => setInputFocus(0)}
            ></Input>
          </InputWrapper>
        </InputContainer>
      )}
      <div style={{ marginTop: "18px" }}>
        <Text>- 등업신청은 본사에 내역 확인후 1일내로 자동 처리됩니다</Text>
        <Text>- 거짓으로 정보 입력시, 스포시티 이용이 제한됩니다</Text>
        <Text>- 보증업체 각 업체별 충전금액 합산가능</Text>
      </div>
      <Rectangle>신청하기</Rectangle>
    </Wrapper>
  );
};

export default RequestForLevelUp;
