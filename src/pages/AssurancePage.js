import React, { useState } from "react";
import styled, { css } from "styled-components";
import Footer from "../components/common/Footer";
import GuaranteeCompanySlider from "../components/slider/GuaranteeCompanySlider";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

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

const Wrapper = styled.div`
  width: 100%;
  background-color: #202221;
  padding-top: 16px;
  display: flex;
  justify-content: center;
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

const Content = styled.div`
  margin-top: 40px;
  padding: 0 50px;
  margin-bottom: 47px;
  @media (max-width: 720px) {
    padding: 0 calc((40 / 720) * 100vw);
  }
`;

const CriteriaContainer = styled.div`
  hr {
    height: 1px;
    object-fit: contain;
    opacity: 0.1;
    background-color: #fff;
    margin-bottom: 21px;
    @media (max-width: 720px) {
      display: none;
    }
  }
`;

const CriteriaTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.4px;
  color: #fff;
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  @media (max-width: 720px) {
    font-size: calc((28 / 720) * 100vw);
    margin-bottom: calc((20 / 1280) * 100vh);
  }
`;

const CriteriaText = styled.div`
  width: 165px;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.33px;
  color: #07ac40;
  cursor: default;
  @media (max-width: 720px) {
    width: 90%;
    font-size: calc((18 / 720) * 100vw);
  }
`;

const Rectangle = styled.div`
  width: 192px;
  height: 187px;
  border-radius: 10px;
  background-color: #2c2d2d;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 40px;
  ${CriteriaText} {
    display: none;
  }

  &:hover {
    border: solid 1px #07ac40;
    * {
      display: none;
    }
    ${CriteriaText} {
      display: block;
    }
  }

  img {
    width: ${(props) => props.width};
    /* height: ${(props) => props.height}; */
    @media (max-width: 720px) {
      margin-bottom: calc((26 / 1280) * 100vh);
    }
  }

  @media (max-width: 720px) {
    width: calc((200 / 720) * 100vw);
    height: calc((227 / 1280) * 100vh);
    margin-bottom: calc((20 / 1280) * 100vh);
    justify-content: center;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  span {
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.3px;
    color: #fff;
    @media (max-width: 720px) {
      font-size: calc((22 / 720) * 100vw);
    }
  }
`;

const RectangleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 720px) {
    flex-wrap: wrap;
    > div:nth-child(1) {
      img {
        width: calc((73 / 720) * 100vw);
      }
      span {
        width: 60%;
        text-align: center;
        word-break: keep-all;
      }
    }
    > div:nth-child(2) {
      img {
        width: calc((67 / 720) * 100vw);
      }
      span {
        width: 60%;
        text-align: center;
        word-break: keep-all;
      }
    }
    > div:nth-child(3) {
      img {
        width: calc((62 / 720) * 100vw);
      }
    }
    > div:nth-child(4) {
      img {
        width: calc((67 / 720) * 100vw);
      }
      span {
        width: 50%;
        text-align: center;
        word-break: keep-all;
      }
    }
    > div:nth-child(5) {
      img {
        width: calc((92 / 720) * 100vw);
      }
    }
    > div:nth-child(6) {
      img {
        width: calc((64 / 720) * 100vw);
      }
      span {
        width: 50%;
        text-align: center;
        word-break: keep-all;
      }
    }
  }
`;

const RegistrationButton = styled.button`
  width: 87px;
  height: 35px;
  border-radius: 6px;
  border: solid 1px #666;
  background-color: rgba(32, 34, 33);
  margin-left: auto;

  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.3px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    filter: brightness(1.2);
  }
  &:active {
    transform: scale(0.95);
  }
  @media (max-width: 720px) {
    display: none;
  }
`;

const CompanyContainer = styled.div`
  width: 100%;
  height: 744px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  @media (max-width: 720px) {
    height: max-content;
    > div {
      flex-wrap: wrap;
      width: 100%;
    }
    .second {
      display: none;
    }
  }
`;

const CompanyContent = styled.div`
  width: 234px;
  height: 357px;
  object-fit: contain;
  display: flex;
  flex-direction: column;
  @media (max-width: 720px) {
    width: calc((310 / 720) * 100vw);
    height: max-content;
    margin-bottom: calc((20 / 1280) * 100vh);
  }

  .image {
    width: 234px;
    height: 293px;
    object-fit: contain;
    background-image: url("/images/assurance/AssuranceAd.png");
    background-size: cover;
    background-position: center;
    border-radius: 10px 10px 0 0;
    position: relative;
    cursor: pointer;
    @media (max-width: 720px) {
      width: calc((310 / 720) * 100vw);
      height: calc((386 / 1280) * 100vh);
    }
  }
  .button {
    width: 234px;
    height: 64px;
    background-color: #2c2d2d;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    @media (max-width: 720px) {
      width: calc((310 / 720) * 100vw);
      height: calc((90 / 1280) * 100vh);
    }
    button {
      width: 102px;
      height: 35px;
      border-radius: 6px;
      background-color: #19793a;
      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 14px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.28px;
      color: #fff;
      :hover {
        filter: brightness(1.2);
      }
      &:active {
        transform: scale(0.95);
      }
      @media (max-width: 720px) {
        width: calc((139 / 720) * 100vw);
        height: calc((60 / 1280) * 100vh);
        font-size: calc((22 / 720) * 100vw);
      }
    }
    .right {
      border: solid 1px #19793a;
      background-color: #2c2d2d;
      color: #08c649;
    }
  }
`;

const ModalWrapper = styled.div`
  width: 362px;
  height: 660px;
  border-radius: 8px;
  background-color: #202221;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 22px;
  hr {
    width: 100%;
    height: 1px;
    object-fit: contain;
    opacity: 0.1;
    background-color: #fff;
    margin-bottom: 20px;
  }
  @media (max-width: 720px) {
    width: calc((540 / 720) * 100vw);
    height: calc((836 / 1280) * 100vh);
    padding-top: calc((43 / 1280) * 100vh);
    hr {
      display: none;
    }
  }
`;

const ModalTitleContainer = styled.div`
  width: 100%;
  margin: 0 0 20px;
  padding: 0 29px;
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
    padding: 0 calc((40 / 720) * 100vw);
    margin-bottom: calc((40 / 1280) * 100vh);
    img {
      width: calc((28 / 720) * 100vw);
      height: calc((28 / 1280) * 100vh);
    }
  }
`;

const ModalTitle = styled.span`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.45px;
  color: #fff;
  display: flex;
  align-items: center;
  @media (max-width: 720px) {
    font-size: calc((30 / 720) * 100vw);
    display: flex;
    align-items: center;
  }
`;

const ModalContent = styled.div`
  width: 100%;
  height: 500px;
  overflow: hidden;
  overflow-y: auto;
  padding: 0 29px;
  img {
    width: 100%;
  }
  margin-bottom: 15px;
  @media (max-width: 720px) {
    padding: 0 calc((40 / 720) * 100vw);
    height: calc((585 / 1280) * 100vh);
  }
`;

const ModalButtonContainer = styled.div`
  width: 300px;
  height: 45px;
  object-fit: contain;
  display: flex;
  justify-content: space-between;

  button {
    width: 146px;
    height: 45px;
    border-radius: 6px;
    border: solid 1px #666;
    background-color: #2c2d2d;

    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.3px;
    text-align: center;
    color: #fff;
    :hover {
      filter: brightness(1.2);
    }
    :active {
      transform: scale(0.95);
    }
  }
  @media (max-width: 720px) {
    display: none;
  }
`;

const TextContainer = styled.div`
  display: flex;
  padding-top: 5px;
  padding-left: 10px;
`;

const Text = styled.div`
  width: 50px;
  height: 18px;
  margin-right: 5px;
  object-fit: contain;
  border-radius: 3px;
  position: relative;
  z-index: 1;
  border-radius: 3px;
  :after {
    width: 100%;
    height: 100%;
    opacity: 0.7;
    top: 0;
    left: 0;
    z-index: -1;
    content: "";
    position: absolute;
    border-radius: 3px;
    background-color: ${(props) => props.background};
  }

  font-family: "Noto Sans KR", sans-serif;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  /* line-height: 2.08; */
  letter-spacing: -0.24px;
  text-align: center;
  color: #fff;
`;

const AssurancePage = ({ setMobileMenu, mobileMenu }) => {
  const [modal, setModal] = useState(false);
  const tmpList = [
    { color: "#dd3737", text: "테스트1" },
    { color: "#ef9421", text: "테스트2" },
    { color: "#0ca700", text: "테스트3" },
  ];
  let navigate = useNavigate();

  return (
    <>
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
          <Content>
            <CriteriaContainer>
              <CriteriaTitle>스포시티만의 보증업체 선별 기준</CriteriaTitle>
              <hr></hr>
              <RectangleContainer>
                <Rectangle width="61px">
                  <img src="/images/assurance/Money.png" alt="" />
                  <span>입출금의 편리성/속도</span>
                  <CriteriaText>
                    안전 보증업체가 되기 위해서는 타 토토사이트 대비 충전 및
                    환전 속도를 비교하여 스포시티 보증 업체 선정 기준에 맞는
                    점수를 충족해야 합니다.
                  </CriteriaText>
                </Rectangle>
                <Rectangle width="56px">
                  <img src="/images/assurance/Manager.png" alt="" />
                  <span>메이저의 자질</span>
                  <CriteriaText>
                    어떤 운영진이 운영하는가가 중요합니다. 최소 3년이상의
                    운영업체만 입점 가능하며 유저들의 평판까지 기반하여 안전
                    업체를 선정합니다
                  </CriteriaText>
                </Rectangle>
                <Rectangle width="52px">
                  <img src="/images/assurance/Consulting.png" alt="" />
                  <div>
                    <span>고객센터 응대 및</span>
                    <span>처리능력</span>
                  </div>
                  <CriteriaText>
                    회원들에게 친절한 CS제공과 유저와 업체간의 분쟁 내역이 없는
                    사이트만을 선별 하였습니다.
                  </CriteriaText>
                </Rectangle>
                <Rectangle width="56px">
                  <img src="/images/assurance/Information.png" alt="" />
                  <span> 정보관리 검증 </span>
                  <CriteriaText>
                    회원님들의 소중한 정보는 안전 하게 보호되어야 합니다. 스포
                    시티만의 까다로운 솔루션 및 정보관리 기준을 통과한 업체만을
                    선정하였습니다.
                  </CriteriaText>
                </Rectangle>
                <Rectangle width="77px">
                  <img src="/images/assurance/Safety.png" alt="" />
                  <div>
                    <span> 자본력 검증 및 </span>
                    <span>안전보증금 예치</span>
                  </div>
                  <CriteriaText>
                    최소 3000만원 이상의 실제 보증금을 스포시티에 예치하여
                    예상못할 사고에 이용자들의 안전을 보장합니다.
                  </CriteriaText>
                </Rectangle>
                <Rectangle width="53px">
                  <img src="/images/assurance/Gift.png" alt="" />
                  <span> 보너스 및 프로모션 </span>
                  <CriteriaText>
                    보너스/프로모션의 경우 유저들의 배팅전 즐거운 요소중 하나
                    입니다 타업체들의 비해 많은 이벤트를 제공하는 업체만을 선별
                    하였습니다.
                  </CriteriaText>
                </Rectangle>
              </RectangleContainer>
              <CriteriaTitle>
                보증업체
                <RegistrationButton
                  onClick={() => navigate("/AssurancePage/write")}
                >
                  업체등록
                </RegistrationButton>
              </CriteriaTitle>
              <hr></hr>
            </CriteriaContainer>
            <CompanyContainer>
              <div>
                {[1, 2, 3, 4].map(() => (
                  <CompanyContent>
                    <div className="image">
                      <TextContainer>
                        {tmpList?.map((element) => (
                          <Text background={element.color}>{element.text}</Text>
                        ))}
                      </TextContainer>
                    </div>
                    <div className="button">
                      <button className="left">가입하기</button>
                      <button className="right" onClick={() => setModal(true)}>
                        자세히보기
                      </button>
                    </div>
                  </CompanyContent>
                ))}
              </div>
              <div className="second">
                {[1, 2, 3, 4].map(() => (
                  <CompanyContent>
                    <div className="image">
                      <TextContainer>
                        {tmpList?.map((element) => (
                          <Text background={element.color}>{element.text}</Text>
                        ))}
                      </TextContainer>
                    </div>
                    <div className="button">
                      <button className="left">가입하기</button>
                      <button className="right" onClick={() => setModal(true)}>
                        자세히보기
                      </button>
                    </div>
                  </CompanyContent>
                ))}
              </div>
            </CompanyContainer>
          </Content>

          <Footer setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
        </ContentsContainer>
      </Wrapper>
      <Modal
        isOpen={modal}
        style={ModalStyle}
        onRequestClose={() => setModal(false)}
      >
        <ModalWrapper>
          <ModalTitleContainer>
            <ModalTitle>윈윈 업체소개</ModalTitle>
            <img
              src="/images/common/Close.png"
              alt=""
              onClick={() => setModal(false)}
            ></img>
          </ModalTitleContainer>
          <hr />
          <ModalContent>
            <img src="/images/assurance/AssuranceAd.png" alt=""></img>
            <img src="/images/assurance/AssuranceAd.png" alt=""></img>
            <img src="/images/assurance/AssuranceAd.png" alt=""></img>
          </ModalContent>
          <ModalButtonContainer>
            <button>수정</button>
            <button>삭제</button>
          </ModalButtonContainer>
        </ModalWrapper>
      </Modal>
    </>
  );
};

export default AssurancePage;
