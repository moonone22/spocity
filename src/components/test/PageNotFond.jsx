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

const NotFoundWrapper = styled.div`  
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

const NotFoundContainer = styled.div`  
  position : absolute;
  left: 50%;
  top: 50%;
  transform : translate(-50%, -50%);
  width : 100%;
  margin: 0 auto;
`;

const NotFondTitle = styled.div`
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
      margin : 5px auto 10px
    }
    
`
const NotFondSubTitle = styled.div`
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
      margin: 10px auto 30px;
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
const NotIcon = styled.div`
  width: 112px;
  margin : 0 auto;
`

const NotFondButton = styled.button`
    width: 170px;
    height: 45px;
    display : block;
    margin: 0 auto;
    object-fit: contain;
    border-radius: 6px;
    background-color: #19793a;

    object-fit: contain;
    font-family: "Noto Sans KR", sans-serif;
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
const PageNotFond = () => {
    
  let navigate = useNavigate();
    return (
        <Wrapper>
            <MainWrapper>
                <NotFoundWrapper>
                    <NotFoundContainer>
                        <NotIcon>
                            <img src="/images/common/group-71.png" alt="404icon" />
                        </NotIcon>
                        <NotFondTitle>
                            404 페이지를 찾을수없습니다
                        </NotFondTitle>
                        <NotFondSubTitle>
                            페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다. 
                        </NotFondSubTitle>
                        <NotFondButton 
                            onClick={() => {
                            navigate("/");
                            }}>
                            홈으로 이동하기
                        </NotFondButton>
                    </NotFoundContainer>
                </NotFoundWrapper>
            </MainWrapper>
        </Wrapper>
    );
};

export default PageNotFond;