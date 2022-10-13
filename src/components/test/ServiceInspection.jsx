import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";


const Wrapper = styled.div`
  display: flex;
  height: fit-content;
  overflow-y: auto;
`;

const MainWrapper = styled.div`
  flex: 1 0;
  overflow: hidden;
  overflow-y: auto;
  height: 100vh;
  @media (max-width: 1100px) {
    overflow-x: hidden;
    height: calc(var(--vh, 1vh) * 100);
  }
`;

const ServicedWrapper = styled.div`  
    position : relative;
    margin : 39px auto;
    width: calc(100% - 39px);
    height: 441px;
    padding: 72px 418px 80px;
    object-fit: contain;
    border-radius: 16px;
    background-color: #2c2d2d;

    @media (max-width: 720px) {
      margin : 60px 40px;
      padding: 50px 69px 61px 87px;
      width: calc(100% - 80px);
    }
`;

const ServiceContainer = styled.div`  
  position : absolute;
  left: 50%;
  top: 50%;
  transform : translate(-50%, -50%);
  width : 100%;
  margin: 0 auto;
`;

const ServiceTitle = styled.div`
    width: 450px;
    margin: 5px auto 10px;
    object-fit: contain;
    opacity: 0.85;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 35px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: -0.88px;
    text-align: center;
    color: rgba(255, 255, 255, 0.85);

    @media (max-width: 720px) {
      width: 100%;
      height: auto;
      font-size: 24px;
      margin : 10px auto 0; 
    }
    
`
const ServiceSubTitle = styled.div`
    width: 350px;
    height: 15px;
    margin: 0 auto 40px;
    object-fit: contain;
    opacity: 0.7;
    font-family: "Noto Sans KR";
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: -0.38px;
    text-align: center;  
    color: rgba(255, 255, 255, 0.7);
    
    @media (max-width: 720px) {
      width: 100%;
      height: auto;
      margin: 5px auto 30px;
      font-family: "Noto Sans KR";
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.45;
      letter-spacing: -0.55px;
      text-align: center;
    }
`
const ServiceIcon = styled.div`
  width: 112px;
  margin : 0 auto;
`

const ServiceButton = styled.button`
    display: block;
    position : relative;
    top : 11px;
    width: 170px;
    height: 45px;
    margin: 0 auto;
    border-radius: 6px;
    background-color: #19793a;

    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: -0.4px;
    text-align: center;
    color: #fff;

    cursor: pointer;
    &:active {
      transform: scale(0.95);
    }
`


const ServiceSpan = styled.span`
  color : rgba(0, 255, 88, 0.7)

`
const ServiceInspection = () => {
    
  let navigate = useNavigate();
    return (
        <Wrapper>
            <MainWrapper>
                <ServicedWrapper>
                    <ServiceContainer>
                        <ServiceIcon>
                            <img src="/images/common/serviceImg.png" alt="404icon" />
                        </ServiceIcon>
                        <ServiceTitle>
                            서비스 점검중입니다
                        </ServiceTitle>
                        <ServiceSubTitle>
                            점검시간  <ServiceSpan >2022년 9월 21일 06시~08시</ServiceSpan>
                            <br />
                            서비스 품질 향상 점검 
                        </ServiceSubTitle>
                        <ServiceButton 
                            onClick={() => {
                            navigate("/notice");
                            }}>
                            공지사항 확인하기
                        </ServiceButton>
                    </ServiceContainer>
                </ServicedWrapper>
            </MainWrapper>
        </Wrapper>
    );
};

export default ServiceInspection;