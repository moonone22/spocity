import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import Footer from "../common/Footer";
import GuaranteeCompanySlider from "../slider/GuaranteeCompanySlider";

const Wrapper = styled.div`
  width: 100%;
  background-color: #202221;
  padding-top: 16px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ContentsContainer = styled.div`
  width: 100%;
  max-width: 1344px;
  @media (max-width: 1100px) {
    width: 100%;
  }
`;

const AssuranceContainer = styled.div`
  height: fit-content;
  padding: 0 45px 0 43px;
  margin-bottom: 40px;
  @media (max-width: 1100px) {
    padding: 0 30px 0 40px;
    margin-bottom: 40px;
  }
  @media (max-width: 720px) {
    padding: 0;
    margin-bottom: calc((40 / 1280) * 100vh);
    height: max-content;
    .title {
      padding: 0 calc((40 / 720) * 100vw);
    }
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div .icon {
    width: 20px;
    height: auto;
    @media (max-width: 720px) {
      width: calc((35 / 720) * 100vw);
    }
  }
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.5px;
  color: #fff;
  font-family: "Noto Sans KR", sans-serif;
  @media (max-width: 1100px) {
    font-size: 22px;
  }
  @media (max-width: 720px) {
    font-size: calc((28 / 720) * 100vw);
  }
`;

const MoreDetails = styled.span`
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.38px;
  color: #fff;
  opacity: 0.7;
  cursor: pointer;
  @media (max-width: 1100px) {
    margin-right: 3px;
    font-size: 22px;
  }
  @media (max-width: 720px) {
    margin-right: calc((3 / 720) * 100vw);
    font-size: calc((22 / 720) * 100vw);
  }
`;

const Contents = styled.div`
  width: 100%;
  padding: 0 50px;
`;

const WriteTitle = styled.div`
  font-size: 25px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.5px;
  color: #fff;
  margin-bottom: 22px;
`;

const WriteContainer = styled.div`
  width: 100%;
  height: 499px;
  padding: 40px;
  object-fit: contain;
  background-color: #303231;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;

  > div {
    display: flex;
    flex-direction: column;
    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      /* margin-bottom: 30px; */
    }
  }

  .color {
    flex-direction: row;
    justify-content: space-between;
    & > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
`;

const InputTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.32px;
  color: #fff;
  margin-bottom: 16px;
`;

const InputContainer = styled.div`
  flex: 1 0 auto;
  height: 50px;
  object-fit: contain;
  background-color: #3b3c3b;
  display: flex;
  align-items: center;

  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  font-family: "Roboto", sans-serif;
  color: rgba(255, 255, 255, 0.7);
  padding-left: 19px;

  border: ${(props) =>
    Number(props.inputFocus) === Number(props.number) || Number(props.file)
      ? "solid 1px #099f3c"
      : "none"};
`;

const Input = styled.input`
  width: 95%;
  height: 80%;
  background-color: transparent;
  border: none;
  caret-color: #fff;
  color: rgba(255, 255, 255, 0.7);

  &:focus::placeholder {
    color: transparent;
  }
  &::placeholder {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    font-family: "Roboto", sans-serif;
    letter-spacing: normal;
    color: rgba(255, 255, 255, 0.7);
  }
  cursor: pointer;
`;

const SearchFileButton = styled.button`
  width: 99px;
  height: 50px;
  margin-left: 10px;
  object-fit: contain;
  background-color: #3b3c3b;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.32px;
  color: #fff;
  :hover {
    filter: brightness(1.2);
  }
  :active {
    transform: scale(0.95);
  }
`;

const Rectangle = styled.div`
  width: 100px;
  height: 45px;
  border-radius: 6px;
  background-color: #19793a;
  margin: 30px auto 0 auto;
  display: flex;
  justify-content: center;
  /* align-items: center; */

  font-size: 15px;
  line-height: 43px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.3px;
  color: #fff;
  cursor: pointer;
  :hover {
    filter: brightness(1.2);
  }
  :active {
    transform: scale(0.95);
  }
`;

const ColorContainer = styled.div`
  width: 375px;
  height: 82px;
`;

const ColorInputContainer = styled.div`
  width: 375px;
  height: 50px;
  background-color: #3b3c3b;
  padding-left: 19px;
  display: flex;
  align-items: center;
  border: ${(props) =>
    props.color === "red"
      ? "solid 1px #b8321d"
      : props.color === "yellow"
      ? "solid 1px #b98c2d"
      : "solid 1px #199a16"};
  border-width: ${(props) =>
    Number(props.inputFocus) === Number(props.number) ? "2px" : "1px"}; ;
`;

const AssuranceWrite = () => {
  const [thumbnailImage, setThumbnailImage] = useState();
  const [popupImage, setPopupImage] = useState();
  const [inputFocus, setInputFocus] = useState();

  const thumbnailInput = useRef(null);
  const popupInput = useRef(null);

  const onCickThumbnailInput = () => {
    thumbnailInput.current.click();
  };
  const onCickPopupInput = () => {
    popupInput.current.click();
  };
  return (
    <Wrapper>
      <ContentsContainer>
        <AssuranceContainer>
          <TitleContainer className="title">
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                className="icon"
                src="/images/main/Sidebar4.png"
                alt=""
              ></img>
              <Title style={{ marginLeft: "7px" }}>스포시티 보증업체</Title>
            </div>
            <MoreDetails>더보기</MoreDetails>
          </TitleContainer>
          <GuaranteeCompanySlider />
        </AssuranceContainer>
        <Contents>
          <WriteTitle>보증업체 글작성</WriteTitle>

          <WriteContainer>
            <div>
              <InputTitle>썸네일 이미지 업로드</InputTitle>
              <div className="container">
                <InputContainer file={thumbnailImage?.name !== undefined}>
                  <Input
                    style={{
                      cursor: "default",
                      display: "none",
                    }}
                    ref={thumbnailInput}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setThumbnailImage(e.target.files[0]);
                    }}
                  />
                  {thumbnailImage?.name}
                </InputContainer>
                <SearchFileButton onClick={onCickThumbnailInput}>
                  파일 찾기
                </SearchFileButton>
              </div>
            </div>
            <div>
              <InputTitle>썸네일 이미지명</InputTitle>
              <div className="container">
                <InputContainer inputFocus={inputFocus} number={1}>
                  <Input
                    // placeholder="썸네일 이미지명 입력"
                    onFocus={() => setInputFocus(1)}
                    onBlur={() => setInputFocus(0)}
                  ></Input>
                </InputContainer>
              </div>
            </div>
            <div>
              <InputTitle>팝업 이미지 업로드</InputTitle>
              <div className="container">
                <InputContainer file={popupImage?.name !== undefined}>
                  <Input
                    style={{
                      cursor: "default",
                      display: "none",
                    }}
                    ref={popupInput}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setPopupImage(e.target.files[0]);
                    }}
                  />
                  {popupImage?.name}
                </InputContainer>
                <SearchFileButton onClick={onCickPopupInput}>
                  파일 찾기
                </SearchFileButton>
              </div>
            </div>

            <div>
              <InputTitle>팝업 이미지명</InputTitle>
              <div className="container">
                <InputContainer inputFocus={inputFocus} number={2}>
                  <Input
                    // placeholder="업체명 입력"
                    onFocus={() => setInputFocus(2)}
                    onBlur={() => setInputFocus(0)}
                  ></Input>
                </InputContainer>
              </div>
            </div>
          </WriteContainer>

          <WriteContainer>
            <div>
              <InputTitle>링크</InputTitle>
              <div className="container">
                <InputContainer inputFocus={inputFocus} number={3}>
                  <Input
                    // placeholder="링크 입력"
                    onFocus={() => setInputFocus(3)}
                    onBlur={() => setInputFocus(0)}
                  ></Input>
                </InputContainer>
              </div>
            </div>
            <div>
              <InputTitle>업체명</InputTitle>
              <div className="container">
                <InputContainer inputFocus={inputFocus} number={4}>
                  <Input
                    // placeholder="링크 입력"
                    onFocus={() => setInputFocus(4)}
                    onBlur={() => setInputFocus(0)}
                  ></Input>
                </InputContainer>
              </div>
            </div>
            <div>
              <InputTitle>보증업체 순서</InputTitle>
              <div className="container">
                <InputContainer inputFocus={inputFocus} number={5}>
                  <Input
                    // placeholder="링크 입력"
                    onFocus={() => setInputFocus(5)}
                    onBlur={() => setInputFocus(0)}
                  ></Input>
                </InputContainer>
              </div>
            </div>

            <div className="color">
              <ColorContainer>
                <div>
                  <InputTitle>빨강 텍스트</InputTitle>
                  <ColorInputContainer
                    color="red"
                    inputFocus={inputFocus}
                    number={6}
                  >
                    <Input
                      onFocus={() => setInputFocus(6)}
                      onBlur={() => setInputFocus(0)}
                    ></Input>
                  </ColorInputContainer>
                </div>
              </ColorContainer>
              <ColorContainer>
                <div>
                  <InputTitle>노랑 텍스트</InputTitle>
                  <ColorInputContainer
                    color="yellow"
                    inputFocus={inputFocus}
                    number={7}
                  >
                    <Input
                      onFocus={() => setInputFocus(7)}
                      onBlur={() => setInputFocus(0)}
                    ></Input>
                  </ColorInputContainer>
                </div>
              </ColorContainer>
              <ColorContainer>
                <div>
                  <InputTitle>초록 텍스트</InputTitle>
                  <ColorInputContainer
                    color="green"
                    inputFocus={inputFocus}
                    number={8}
                  >
                    <Input
                      onFocus={() => setInputFocus(8)}
                      onBlur={() => setInputFocus(0)}
                    ></Input>
                  </ColorInputContainer>
                </div>
              </ColorContainer>
            </div>
          </WriteContainer>
          <Rectangle>등록</Rectangle>
        </Contents>
      </ContentsContainer>
      <Footer />
    </Wrapper>
  );
};

export default AssuranceWrite;
