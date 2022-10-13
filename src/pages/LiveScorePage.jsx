// import React, { useState, useEffect } from "react";
// import styled, { css } from "styled-components";
// import Footer from "../components/common/Footer";
// import GuaranteeCompanySlider from "../components/slider/GuaranteeCompanySlider";
// import moment from "moment";
// import "moment/locale/ko";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import LiveMobile from "../components/score/LiveMobile";
// import { useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ScoreCount } from "../components/apis/api";
// // import io from 'socket.io-client'
// // const socket = io()

// import "./LiveScorePage.css"



// const TitleContainer = styled.div`
//   width: 100%;
//   font-family: "Noto Sans KR", sans-serif;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   div .icon {
//     width: 20px;
//     height: auto;
//     @media (max-width: 720px) {
//       width: calc((35 / 720) * 100vw);
//     }
//   }
// `;

// const Title = styled.p`
//   font-size: 20px;
//   font-weight: 500;
//   font-stretch: normal;
//   font-style: normal;
//   letter-spacing: -0.5px;
//   color: #fff;
//   font-family: "Noto Sans KR", sans-serif;
//   @media (max-width: 1100px) {
//     font-size: 22px;
//   }
//   @media (max-width: 720px) {
//     font-size: calc((28 / 720) * 100vw);
//   }
// `;

// const MoreDetails = styled.span`
//   font-size: 15px;
//   font-weight: normal;
//   font-stretch: normal;
//   font-style: normal;
//   letter-spacing: -0.38px;
//   color: #fff;
//   opacity: 0.7;
//   cursor: pointer;
//   @media (max-width: 1100px) {
//     margin-right: 3px;
//     font-size: 22px;
//   }
//   @media (max-width: 720px) {
//     margin-right: calc((3 / 720) * 100vw);
//     font-size: calc((22 / 720) * 100vw);
//   }
// `;

// const MenuContainer = styled.div`
//   height: 77px;
//   padding: 0 42px;
//   display: flex;
//   @media (max-width: 720px) {
//     padding: 0 calc((40 / 720) * 100vw);
//     overflow: hidden;
//     overflow-x: auto;
//     height: 50px;
//     &::-webkit-scrollbar {
//       display: none;
//     }
//   }
// `;

// const MenuContents = styled.div`
//   width: 68px;
//   height: 77px;
//   margin-right: 10px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   cursor: pointer;
//   @media (max-width: 720px) {
//     padding-top : 10px;
//     width: calc((69 / 720) * 100vw);
//     margin-right: calc((23 / 720) * 100vw);
//   }
// `;

// const MenuRectangle = styled.div`
//   width: 44px;
//   height: 44px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: ${(props) => props.background};
//   border-radius: 10px;
//   position: relative;

//   :hover {
//     filter: brightness(1.2);
//   }
//   :active {
//     transform: scale(0.95);
//   }
//   img {
//     width: 48%;
//   }

//   @media (max-width: 720px) {
//     width: calc((69 / 720) * 100vw);
//     height: calc((69 / 1280) * 100vh);
//   }
// `;

// const MenuText = styled.div`
//   width: 100%;
//   font-family: "Noto Sans KR", sans-serif;
//   font-size: 15px;
//   font-weight: 500;
//   font-stretch: normal;
//   font-style: normal;
//   letter-spacing: -0.3px;
//   text-align: left;
//   color: ${(props) => props.color || "#fff"};
//   margin-top: 10px;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   text-align: center;
//   @media (max-width: 720px) {
//     display: none;
//   }
// `;

// const MenuCount = styled.div`
//   width: 21px;
//   height: 19px;
//   object-fit: contain;
//   border-radius: 6px;
//   background-color: ${(props) =>
//     props.background === "active" ? "#156330" : "#3c3e3d"};
//   position: absolute;
//   top: -15%;
//   right: -15%;

//   object-fit: contain;
//   font-family: "Roboto", sans-serif;
//   font-size: 13px;
//   font-weight: 500;
//   font-stretch: normal;
//   font-style: normal;
//   letter-spacing: -0.26px;
//   text-align: left;
//   color: #fff;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const LiveComponent = styled.div`
//   margin-top: 40px;
//   padding: 0 50px;
//   margin-bottom: 100px;
//   @media (max-width: 720px) {
//     display: none;
//   }
// `;

// const TopBarContainer = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;

//   @media (max-width: 720px) {
//     display: none;
//   }
// `;

// const TabContainer = styled.div`
//   height: 49px;
//   display: flex;
// `;

// const Tab = styled.div`
//   width: 130px;
//   height: 49px;
//   background-color: ${(props) => (props.active ? "#3b3c3b" : "#303231")};
//   border-radius: 12px 12px 0 0;
//   margin-right: 1px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
// `;

// const TabText = styled.span`
//   font-family: "Roboto", sans-serif;
//   font-size: 15px;
//   font-weight: bold;
//   font-stretch: normal;
//   font-style: normal;
//   letter-spacing: -0.3px;
//   color: ${(props) => (props.active ? "#099f3c" : "#999")};
// `;

// const OptionContainer = styled.div`
//   width: ${(props) => (props.tab !== 2 && props.tab !== 3 ? "510px" : "680px")};
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   position: relative;
//   > img {
//     width: 35px;
//     cursor: pointer;
//     &:active {
//       transform: scale(0.95);
//     }
//   }
// `;

// const SoundContainer = styled.div`
//   width: 110px;
//   height: 35px;
//   display: flex;
//   cursor: pointer;
//   &:active {
//     transform: scale(0.95);
//   }
// `;

// const Sound = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 67px;
//   height: 35px;
//   background-color: #383a39;
//   border-radius: 8px 0 0 8px;
//   img {
//     width: 16px;
//     margin-right: 7px;
//   }
//   div {
//     height: 100%;
//     font-family: "Noto Sans KR", sans-serif;
//     font-size: 14px;
//     font-weight: 500;
//     line-height: 34px;
//     font-stretch: normal;
//     font-style: normal;
//     letter-spacing: -0.28px;
//     color: #fff;
//   }
// `;

// const OnoFFButton = styled.div`
//   cursor: pointer;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 43px;
//   height: 35px;
//   background-color: ${(props) => (props.active ? "#515151" : "#303231")};
//   border-radius: 0 8px 8px 0;

//   font-family: "Noto Sans KR", sans-serif;
//   font-size: 14px;
//   font-weight: normal;
//   font-stretch: normal;
//   font-style: normal;
//   letter-spacing: -0.28px;
//   color: ${(props) => (props.active ? "#fff" : "#aaa")};
// `;

// const ScoreContainer = styled.div`
//   width: 150px;
//   height: 35px;
//   display: flex;
//   cursor: pointer;
//   &:active {
//     transform: scale(0.95);
//   }
// `;

// const Score = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 107px;
//   height: 35px;
//   background-color: #383a39;
//   border-radius: 8px 0 0 8px;
//   img {
//     width: 18px;
//     margin-right: 7px;
//   }
//   div {
//     height: 100%;
//     font-family: "Noto Sans KR", sans-serif;
//     font-size: 14px;
//     font-weight: 500;
//     line-height: 34px;
//     font-stretch: normal;
//     font-style: normal;
//     letter-spacing: -0.28px;
//     color: #fff;
//   }
// `;

// const SelectFullContainer = styled.div`
//   width: 120px;
//   height: max-content;
//   object-fit: contain;
//   border-radius: 6px;
//   border: solid 1px #202221;
//   background-color: #383a39;
//   position: absolute;
//   top: -1px;
//   right: -1px;
//   z-index: 10000;
//   @media (max-width: 720px) {
//     right: 0;
//     width: 45%;
//   }
// `;

// const SelectFullTop = styled.div`
//   background-color: #383a39;
//   width: 120px;
//   height: 37px;
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   border-bottom: solid 1px #202221;
//   border-radius: 8px 8px 0 0;
//   cursor: pointer;
// `;

// const SelectContentsWrapper = styled.div`
//   width: 120px;
//   height: 70px;
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   justify-content: space-around;
//   background-color: #383a39;
//   border-radius: 0 0 8px 8px;
// `;

// const SelectText = styled.span`
//   font-family: "Noto Sans KR", sans-serif;
//   font-size: 14px;
//   font-weight: normal;
//   font-stretch: normal;
//   font-style: normal;
//   line-height: 1px;
//   letter-spacing: -0.35px;
//   text-align: left;
//   color: #fff;
// `;

// const SelectContents = styled.div`
//   width: 90%;
//   height: 26px;
//   object-fit: contain;
//   border-radius: 5px;
//   padding-left: 10px;
//   cursor: pointer;

//   font-family: "Noto Sans KR", sans-serif;
//   font-size: 14px;
//   font-weight: normal;
//   font-stretch: normal;
//   font-style: normal;
//   line-height: 25px;
//   letter-spacing: -0.35px;
//   text-align: left;
//   color: #fff;

//   &:hover {
//     background-color: #19793a;
//   }
// `;

// const SelectDefault = styled.div`
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   width: 120px;
//   height: 37px;
//   border-radius: 6px;
//   border: solid 1px #202221;
//   background-color: #383a39;
//   position: relative;

//   font-family: "Noto Sans KR", sans-serif;
//   font-size: 14px;
//   font-weight: 500;
//   font-stretch: normal;
//   font-style: normal;
//   letter-spacing: -0.28px;
//   color: #fff;
//   cursor: pointer;
// `;

// const LiveContents = styled.div`
//   margin-top: 1px;

//   @media (max-width: 720px) {
//     display: none;
//   }
// `;

// const LeagueContainer = styled.div`
//   width: 100%;
//   height: 50px;
//   margin-top: 1px;
//   background-color: #303231;
//   display: flex;
//   align-items: center;
//   img:first-child {
//     width: 20px;
//     height: 20px;
//     margin-right: 9px;
//   }
//   img:last-of-type {
//     width: 15px;
//     height: 15px;
//     margin-bottom: 4px;
//     cursor: pointer;
//   }
//   & > div {
//     height: 100%;
//     font-family: "Noto Sans KR", sans-serif;
//     font-size: 15px;
//     font-weight: 500;
//     font-stretch: normal;
//     font-style: normal;
//     letter-spacing: -0.3px;
//     color: #ccc;
//     line-height: 48px;
//     margin-right: 4px;
//     span {
//       color: #fff;
//     }
//   }
//   .dividendText {
//     margin-right: 47px;
//   }
// `;

// const TimeContents = styled.div`
//   /* flex: 250px 0 0; */
//   max-width: 280px;
//   width: 250px;
//   min-width: 130px;
//   display: flex;
//   align-items: center;
// `;

// const TeamContents = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
//   /* justify-content: center; */
// `;

// const LeagueInfoCotainer = styled.div`
//   width: 100%;
//   height: ${(props) => props.height};
//   margin-top: 1px;
//   background-color: #3b3c3b;
//   display: flex;
//   padding : 0;
//   :hover {
//     background-color: #424342;
//   }
//   cursor: pointer;
//   ${TeamContents} {
//     justify-content: ${(props) => props.type === "soccer" && "center"};
//   }
// `;

// const Time = styled.div`
//   font-family: "Roboto", sans-serif;
//   font-size: 15px;
//   font-weight: normal;
//   font-stretch: normal;
//   font-style: normal;
//   letter-spacing: normal;
//   text-align: center;
//   color: #fff;
//   margin-left: 15px;
//   margin-right: 9px;
// `;

// const TimeRectangle = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 67px;
//   height: 26px;
//   border-radius: 6px;

//   font-family: "Noto Sans KR", sans-serif;
//   font-size: 14px;
//   font-weight: 500;
//   font-stretch: normal;
//   font-style: normal;
//   letter-spacing: -0.28px;
//   color: #fff;
//   ${(props) =>
//     props.type === "before" &&
//     css`
//       background-color: #8c8c8c;
//     `}
//   ${(props) =>
//     props.type === "delay" &&
//     css`
//       background-color: #0c72b9;
//     `}
//   ${(props) =>
//     props.type === "cancel" &&
//     css`
//       background-color: #a92731;
//     `}
//   ${(props) =>
//     props.type === "live" &&
//     css`
//       background-color: #19793a;
//     `} 
//   ${(props) =>
//     props.type === "end" &&
//     css`
//       background-color: #515151;
//     `}
// `;

// const Team1 = styled.div`
//   max-width: 344px;
//   min-width: 200px;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
//   img {
//     width: 16px;
//   }
//   ${(props) =>
//     props.goal &&
//     css`
//       border-radius: 8px;
//       background-color: #ffe400;
//       ${TeamName} {
//         color: #e74c21;
//         font-weight: bold;
//       }
//       ${RankingText} {
//         color: #000000;
//       }
//     `}
// `;

// const Team2 = styled.div`
//   max-width: 344px;
//   min-width: 200px;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
//   img {
//     width: 16px;
//   }
//   ${(props) =>
//     props.goal &&
//     css`
//       border-radius: 8px;
//       background-color: #ffe400;
//       ${TeamName} {
//         color: #e74c21;
//         font-weight: bold;
//       }
//       ${RankingText} {
//         color: #000000;
//       }
//     `}
// `;

// const ScoreRectangle = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 77px;
//   height: 26px;
//   border-radius: 6px;
//   background-color: ${(props) =>
//     props.type === "before"
//       ? ""
//       : props.type === "end"
//       ? "#515151"
//       : "#19793a"};
//   margin: 0 10px;
//   position: relative;

//   font-family: "Roboto", sans-serif;
//   font-size: 15px;
//   font-weight: 500;
//   font-stretch: normal;
//   font-style: normal;
//   color: #fff;
//   & > div {
//     color: #ffcc00;
//     width: 13px;
//     height: 100%;
//     display: flex;
//     align-items: center;
//     /* justify-content: center; */
//     font-family: "Roboto", sans-serif;
//     font-size: 15px;
//     font-weight: 500;
//     font-stretch: normal;
//     font-style: normal;
//     justify-content: ${(props) =>
//       props.direction === "left" ? "start" : "end"};
//   }
//   .ScorePopupContainer {
//     display: none;
//   }
//   &:hover {
//     .ScorePopupContainer {
//       display: block;
//       width: 300px;
//       height: 425px;
//       border-radius: 8px;
//       border: solid 1px #0f0f0f;
//       background-color: rgba(22, 23, 23, 0.8);
//       position: absolute;
//       z-index: 1000;
//       top: 30px;
//       left: 90px;
//     }
//   }
// `;

// const RankingText = styled.div`
//   height: 100%;
//   font-family: "Noto Sans KR", sans-serif;
//   font-size: 13px;
//   font-weight: 500;
//   font-stretch: normal;
//   font-style: normal;
//   letter-spacing: -0.26px;
//   color: #ff7200;
//   line-height: 48px;
//   margin: 0 3.5px;
//   white-space: nowrap;
// `;

// const TeamRectangle = styled.div`
//   width: 14px;
//   height: 14px;
//   object-fit: contain;
//   border-radius: 3px;
//   background-color: ${(props) => props.background || "#cba344"};

//   font-family: "Roboto", sans-serif;
//   font-size: 11px;
//   font-weight: 500;
//   font-stretch: normal;
//   font-style: normal;
//   letter-spacing: -0.22px;
//   text-align: center;
//   color: #fff;

//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 0 3.5px;
// `;

// const TeamName = styled.div`
//   height: 100%;
//   font-family: "Noto Sans KR", sans-serif;
//   font-size: 15px;
//   font-weight: 300;
//   font-stretch: normal;
//   font-style: normal;
//   letter-spacing: -0.3px;
//   color: #fff;
//   display: flex;
//   line-height: 48px;
//   margin: 0 3.5px;
//   white-space: nowrap;
// `;

// const OptionContents = styled.div`
//   /* flex: 0 0 250px; */
//   max-width: 250px;
//   min-width: 250px;
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
// `;

// const IconContents = styled.div`
//   min-width: 105px;
//   width: max-content;
//   height: 100%;
//   margin-right: 16px;
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
//   img {
//     height: 14px;
//     margin-left: 8px;
//     cursor: pointer;
//   }
//   img:last-child {
//     margin-left: 16px;
//     cursor: pointer;
//   }
// `;

// const OptionInfo = styled.div`
//   width: 105px;
//   margin-right: 23px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;

//   object-fit: contain;
//   font-family: "Roboto", sans-serif;
//   font-size: 15px;
//   font-weight: 300;
//   font-stretch: normal;
//   font-style: normal;
//   letter-spacing: -0.3px;
//   text-align: center;
//   color: #fff;
//   img {
//     width: 14px;
//     margin-right: 6px;
//   }
// `;

// const HT = styled.div``;

// const Flag = styled.div`
//   height: 100%;
//   display: flex;
//   align-items: center;
// `;

// const TimeButton = styled.div`
//   width: 160px;
//   height: 35px;
//   object-fit: contain;
//   border-radius: 6px;
//   background-color: #383a39;
//   display: flex;
//   align-items: center;
//   justify-content: space-evenly;
//   position: relative;

//   & > img {
//     height: 12px;
//     width: 7px;
//     cursor: pointer;
//   }
//   .date {
//     width: 90px;
//     display: flex;
//     align-items: center;

//     font-family: "Roboto", sans-serif;
//     font-size: 15px;
//     font-weight: normal;
//     font-stretch: normal;
//     font-style: normal;
//     letter-spacing: normal;
//     color: #fff;
//     img {
//       height: 17px;
//       width: 16px;
//       margin-right: 8px;
//     }
//   }
// `;

// const CalendarContainer = styled.div`
//   width: 323px;
//   height: 340px;
//   position: absolute;
//   right: 80px;
//   top: 40px;
//   .react-calendar {
//     width: 323px;
//     border-radius: 6px;
//     border: solid 1px #202221;
//     background-color: #3b3c3b;
//   }
//   .react-calendar__tile--active {
//     border-radius: 6px;
//     background: #07ac40;
//   }
//   .react-calendar__tile {
//     color: #fff;
//     font-family: "Roboto", sans-serif;
//     font-size: 12px;
//     font-weight: normal;
//     font-stretch: normal;
//     font-style: normal;
//     letter-spacing: -0.24px;
//   }
//   .react-calendar__month-view__days__day--neighboringMonth {
//     color: #aaaaaa;
//   }
//   .react-calendar__month-view__weekdays {
//     font-family: "Noto Sans KR", sans-serif;
//     font-size: 14px;
//     font-weight: 300;
//     font-stretch: normal;
//     font-style: normal;
//     letter-spacing: -0.28px;
//     color: #fff;
//     border-bottom: 1px solid rgba(255, 255, 255, 0.1);
//   }
//   .react-calendar__navigation {
//     margin: 0;
//   }
//   .react-calendar__navigation {
//     font-family: "Roboto", sans-serif;
//     font-size: 16px;
//     font-weight: normal;
//     font-stretch: normal;
//     font-style: normal;
//     letter-spacing: -0.32px;
//     text-align: center;
//     color: #fff;
//     * {
//       color: #fff;
//     }
//   }
//   abbr[title] {
//     text-decoration: none;
//   }
//   .react-calendar__tile--now {
//     background-color: transparent;
//     color: #00d349;
//     &:focus,
//     &:hover {
//       color: #fff;
//     }
//   }
//   .react-calendar__tile:enabled:hover,
//   .react-calendar__tile:enabled:focus {
//     background-color: #07ac40;
//     border-radius: 6px;
//   }
//   .react-calendar__navigation button:disabled {
//     background-color: transparent;
//   }
// `;

// const ScorePopupTitle = styled.div`
//   width: 298px;
//   height: 30px;
//   background-color: rgba(22, 23, 23, 0.96);
//   z-index: 100000;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border-radius: 8px 8px 0 0;
//   padding: 0 20px;
//   span {
//     font-family: "Noto Sans KR", sans-serif;
//     font-size: 13px;
//     font-weight: normal;
//     font-stretch: normal;
//     font-style: normal;
//     letter-spacing: -0.26px;
//     text-align: center;
//     color: #fff;
//   }
// `;

// const ScorePopupGoalContainer = styled.div`
//   width: 298px;
//   height: 98px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-evenly;
//   align-items: center;
//   img {
//     width: 12px;
//     height: 12px;
//   }
// `;

// const ScorePopupGoal = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 40px;
// `;

// const ScorePopupStatsTitle = styled.div`
//   width: 298px;
//   height: 30px;
//   background-color: rgba(22, 23, 23, 0.96);
//   z-index: 100000;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 0 20px;
//   span {
//     font-family: "Noto Sans KR", sans-serif;
//     font-size: 13px;
//     font-weight: normal;
//     font-stretch: normal;
//     font-style: normal;
//     letter-spacing: -0.26px;
//     text-align: center;
//     color: #fff;
//   }
// `;

// const ScorePopupStatsContainer = styled.div`
//   width: 298px;
//   height: 264px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-evenly;

//   font-family: "Noto Sans KR", sans-serif;
//   font-size: 13px;
//   font-weight: normal;
//   font-stretch: normal;
//   font-style: normal;
//   letter-spacing: -0.26px;
//   text-align: center;
//   color: #fff;
// `;

// const ScorePopupStatsContents = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-evenly;
//   div {
//     display: flex;
//     align-items: center;
//   }
//   .propgress {
//     width: 90px;
//     justify-content: space-between;
//   }
//   .text {
//     width: 60px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
// `;

// const ProgressBar = styled.div`
//   width: 69px;
//   height: 4px;
//   border-radius: 2px;
//   background-color: #000;
//   display: flex;
//   justify-content: ${(props) =>
//     props.type === "left" ? "flex-end" : "flex-start"};
// `;

// const Progress = styled.div`
//   width: ${(props) => props.width};
//   height: 4px;
//   object-fit: contain;
//   border-radius: 2px;
//   background-color: #07ac40;
// `;

// const BasketballTime = styled.div`
//   width: 48px;
//   height: 51px;
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   div {
//     width: 48px;
//     height: 26px;
//     border-radius: 6px;
//     background-color: #19793a;
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     font-family: "Roboto", sans-serif;
//     font-size: 14px;
//     font-weight: normal;
//     font-stretch: normal;
//     font-style: normal;
//     letter-spacing: normal;
//     color: #fff;
//   }
//   span {
//     width: 34px;
//     height: 11px;
//     font-family: "Roboto", sans-serif;
//     font-size: 14px;
//     font-weight: normal;
//     font-stretch: normal;
//     font-style: normal;
//     letter-spacing: normal;
//     color: #f66f03;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     margin-top: 10px;
//   }
// `;

// const BasketballTimeContents = styled.div`
//   flex: 0 1 140px;
//   display: flex;
//   align-items: center;
// `;

// const BasketballTeamContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   flex-direction: column;
//   img {
//     width: 16px;
//   }
//   img:last-child {
//     width: 10px;
//     margin-left: 5px;
//   }
//   div {
//     display: flex;
//     align-items: center;
//     justify-content: flex-start;
//     height: 30px;
//     width: 143px;
//   }
// `;

// const BasketballScoreContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   height: 100%;
//   justify-content: space-evenly;
//   width: 60px;
// `;

// const BasketballScoreRectangle = styled.div`
//   background-color: ${(props) => props.background};
//   width: 34px;
//   height: 30px;
//   border-radius: 6px;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   font-family: "Roboto", sans-serif;
//   font-size: 15px;
//   font-weight: 500;
//   font-stretch: normal;
//   font-style: normal;
//   letter-spacing: normal;
//   text-align: center;
//   color: #fff;
// `;

// const BasketballScore = styled.div`
//   height: 81px;
//   div {
//     height: 40px;
//     display: flex;
//     align-items: center;
//   }
//   & > div:first-child {
//     border-bottom: solid 1px rgba(255, 255, 255, 0.1);
//   }
// `;

// const li = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 36px;
//   border-right: solid 1px rgba(255, 255, 255, 0.1);

//   font-family: "Roboto", sans-serif;
//   font-size: 15px;
//   font-weight: 500;
//   font-stretch: normal;
//   font-style: normal;
//   color: #fff;
//   background-color: ${(props) => props.active && "rgba(12,114,185,0.4)"};
// `;

// const BasketballQuarter = styled.div`
//   margin-left: 172px;
//   display: flex;
//   align-items: center;
//   div {
//     font-family: "Roboto", sans-serif;
//     font-size: 15px;
//     font-weight: normal;
//     font-stretch: normal;
//     font-style: normal;
//     color: #ccc;
//     border: none;
//   }
// `;

// const BaseballTimeContents = styled.div`
//   flex: 0 1 80px;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   justify-content: center;
//   * {
//     margin: 0;
//   }
// `;

// const BaseballRectangle = styled.div`
//   width: 48px;
//   height: 26px;
//   border-radius: 6px;
//   background-color: #19793a;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 4px;

//   font-family: "Noto Sans KR", sans-serif;
//   font-size: 14px;
//   font-weight: normal;
//   font-stretch: normal;
//   font-style: normal;
//   letter-spacing: -0.35px;
//   color: #fff;
// `;

// const BaseballScoreRectangle = styled.div`
//   width: 30px;
//   height: 30px;
//   border-radius: 6px;
//   background-color: ${(props) => (props.background ? "#daae00" : "#19793a")};
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   font-family: "Roboto", sans-serif;
//   font-size: 18px;
//   font-weight: 500;
//   font-stretch: normal;
//   font-style: normal;
//   letter-spacing: normal;
//   color: ${(props) => (props.active ? "#ffcc00" : "#fff")};
// `;

// const DividendContainer = styled.div`
//   width: 54px;
//   margin-left: 19px;
//   div:last-child {
//     margin-top: 5px;
//   }
// `;

// const DividendRectangle = styled.div`
//   width: 53px;
//   height: 23px;
//   border-radius: 6px;
//   background-color: ${(props) => props.active && "#515151"};
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   font-family: "Roboto", sans-serif;
//   font-size: 15px;
//   font-weight: 500;
//   font-stretch: normal;
//   font-style: normal;
//   color: ${(props) => (props.active ? "#fff" : "#cccccc")};
// `;

// const DividendText = styled.div`
//   font-family: "Noto Sans KR", sans-serif;
//   font-size: 15px;
//   font-weight: normal;
//   font-stretch: normal;
//   font-style: normal;
//   letter-spacing: -0.3px;
//   text-align: center;
//   color: #ccc;
//   margin-left: auto;
// `;

// const AttackContainer = styled.div`
//   height: 50px;
//   display: flex;
//   align-items: flex-end;

//   img {
//     width: 14px;
//   }
// `;

// const TennisScoreContainer = styled.div`
//   height: 100%;
//   width: 40px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-around;
// `;

// const TennisScore = styled.div`
//   width: 21px;
//   height: 21px;
//   border-radius: 3px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: ${(props) => props.active && "rgba(255,255,255,0.2)"};

//   font-family: "Roboto", sans-serif;
//   font-size: 15px;
//   font-weight: 500;
//   font-stretch: normal;
//   font-style: normal;
//   color: #00cc45;
// `;

// const IconRectangle = styled.div`
//   width: 35px;
//   height: 35px;
//   border-radius: 6px;
//   background-color: #383a39;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: relative;
//   img {
//     width: 16px;
//   }
//   cursor: pointer;
//   &:active {
//     transform: scale(0.95);
//   }
//   .star {
//     width: 19px;
//   }
//   &.star:hover {
//     .tooltip {
//       display: flex;
//     }
//   }
//   .tooltip {
//     display: none;
//     width: 324px;
//     height: 29px;
//     border-radius: 4px;
//     background-color: #161717;
//     position: absolute;
//     bottom: -35px;
//     align-items: center;
//     justify-content: center;

//     font-size: 13.5px;
//     font-weight: normal;
//     font-stretch: normal;
//     font-style: normal;
//     letter-spacing: -0.27px;
//     text-align: center;
//     color: #fff;
//     & > div {
//       width: 16px;
//       height: 16px;
//       object-fit: contain;
//       border: solid 1px #000;
//       background-color: #ccc;
//       border-radius: 25px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-weight: 900;
//       font-size: 15px;
//       margin-right: 4px;
//     }
//   }
// `;

// const SearchContainer = styled.div`
//   width: 360px;
//   height: 45px;
//   border-radius: 6px;
//   box-shadow: 0px 10px 20px 0 rgba(0, 0, 0, 0.06);
//   border: solid 1px #07ac40;
//   background-color: #3b3c3b;
//   position: absolute;
//   top: 55px;
//   left: 40px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 10;
//   padding: 0 15px;
//   &::after {
//     // Our small triangle to fill the space
//     content: "";
//     border-color: transparent transparent #3b3c3b;
//     border-style: solid;
//     border-width: 10px;
//     width: 0;
//     height: 0;
//     position: absolute;
//     top: -20px;
//     left: 8px;
//   }

//   &::before {
//     content: "";
//     border-color: transparent transparent #07ac40;
//     border-style: solid;
//     border-width: 11px;
//     width: 0;
//     height: 0;
//     position: absolute;
//     top: -22px;
//     left: 7px;
//   }

//   img {
//     width: 18px;
//     cursor: pointer;
//   }
// `;

// const SearchInput = styled.input`
//   width: 90%;
//   height: 90%;
//   background-color: transparent;
//   border: none;
//   color: #fff;

//   font-family: "Noto Sans KR", sans-serif;
//   font-size: 15px;
//   font-weight: normal;
//   font-stretch: normal;
//   font-style: normal;
//   letter-spacing: -0.44px;

//   &::placeholder {
//     color: #999999;
//   }
// `;

// const LiveScorePage = ({ setMobileMenu, mobileMenu , sportsType, setSportsType , pageBasicData }) => {
//   const navigate = useNavigate();
//   const [openSelect, setOpenSelect] = useState({
//     open: false,
//     text: "리그순",
//   });
//   const [tab, setTab] = useState(1);
//   const [date, setDate] = useState(new Date());
//   const [calendar, setCalendar] = useState(false);
//   const [openSearch, setOpenSearch] = useState(false);
//   const [onOffButton, setOnOffButton] = useState({
//     sound: false,
//     score: false,
//   });
//   const [bookmark, setBookmark] = useState(false);

//   const [tmpList, setTmpList] = useState([
//     {
//       bookmark: false,
//       image: "/images/live/Gambia.png",
//       name: (
//         <div>
//           감비아 : <span>GFA</span> 리그
//         </div>
//       ),
//       game: [
//         {
//           bookmark: false,
//           time: "00:30",
//           type: "end",
//           left: {
//             rank: "(4위)",
//             red: "1",
//             yellow: "4",
//             name: "메이크도니자 GP",
//             image: "/images/live/Team1.png",
//           },
//           score: {
//             text: "0 : 0",
//             type: "end",
//           },
//           right: {
//             image: "/images/live/Team2.png",
//             name: "CSKA 소피아",
//             rank: "(1위)",
//           },
//           icon: {
//             youtube: true,
//             uniform: true,
//             ground: true,
//           },
//         },
//       ],
//     },
//     {
//       bookmark: false,
//       image: "/images/live/Argentina.png",
//       name: <div>아르헨티나 : 리세르바르리가</div>,
//       game: [
//         {
//           bookmark: false,
//           time: "00:30",
//           type: "before",
//           left: {
//             name: "메이크도니자 GP",
//             image: "/images/live/Team1.png",
//           },
//           score: {
//             text: <div>vs</div>,
//             type: "before",
//           },
//           right: {
//             image: "/images/live/Team2.png",
//             name: "CSKA 소피아",
//           },
//           icon: {
//             HT: "HT 0-0",
//             flag: "3:3",
//             youtube: true,
//             uniform: true,
//             ground: true,
//           },
//         },
//         {
//           bookmark: false,
//           time: "00:30",
//           type: "delay",
//           left: {
//             name: "메이크도니자 GP",
//             image: "/images/live/Team1.png",
//           },
//           score: {
//             text: (
//               <>
//                 0 : <div>3</div>
//               </>
//             ),
//           },
//           right: {
//             image: "/images/live/Team2.png",
//             name: "CSKA 소피아",
//             yellow: "4",
//           },
//           icon: {
//             HT: "HT 0-0",
//             flag: "3:3",
//             uniform: true,
//             ground: true,
//           },
//         },
//         {
//           bookmark: false,
//           time: "00:30",
//           type: "cancel",
//           left: {
//             name: "메이크도니자 GP",
//             image: "/images/live/Team1.png",
//           },
//           score: {
//             direction: "left",
//             text: (
//               <>
//                 <div>4</div>: 1
//               </>
//             ),
//           },
//           right: {
//             image: "/images/live/Team2.png",
//             name: "CSKA 소피아",
//           },
//           icon: {
//             HT: "HT 0-0",
//             flag: "3:3",
//             ground: true,
//           },
//         },
//         {
//           bookmark: false,
//           time: "00:30",
//           type: "live",
//           left: {
//             name: "메이크도니자 GP",
//             image: "/images/live/Team1.png",
//             goal: true,
//           },
//           score: {
//             text: (
//               <>
//                 1 : <div>3</div>
//               </>
//             ),
//           },
//           right: {
//             image: "/images/live/Team2.png",
//             name: "CSKA 소피아",
//             yellow: "4",
//           },
//           icon: {
//             HT: "HT 0-0",
//             flag: "3:3",
//             youtube: true,
//             uniform: true,
//             ground: true,
//           },
//         },
//       ],
//     },
//   ]);

//   const [scoreCount , setScoreCount] = useState()

//   const changeBookmark = (index) => {
//     let tmpData = tmpList;
//     tmpData[index] = { ...tmpData[index], bookmark: !tmpData[index].bookmark };
//     setTmpList([...tmpData]);
//   };

//   const changeGameBookmark = (listIdx, gameIdx) => {
//     let tmpData = tmpList;
//     tmpData[listIdx].game[gameIdx] = {
//       ...tmpData[listIdx].game[gameIdx],
//       bookmark: !tmpData[listIdx].game[gameIdx].bookmark,
//     };
//     setTmpList([...tmpData]);
//   };

//   const isLeageBookmark = (data) => {
//     if (data.bookmark) {
//       return true;
//     }
//     const findBookmark = (e) => {
//       if (e.bookmark === true) {
//         return true;
//       } else {
//         return false;
//       }
//     };
//     const result = data?.game.some(findBookmark);
//     return result;
//   };

//   const isGameBookmark = (leagueData, gameData) => {
//     const findBookmark = (e) => {
//       return e.bookmark === false;
//     };
//     const result = leagueData?.game.every(findBookmark);

//     if (leagueData.bookmark && result) {
//       return true;
//     } else {
//       return gameData.bookmark;
//     }
//   };

//   const plusDate = () => {
//     setDate(new Date(date.setDate(date.getDate() + 1)));
//   };

//   const minusDate = () => {
//     setDate(new Date(date.setDate(date.getDate() - 1)));
//   };

//   const searchRef = useRef();
//   const searchIconRef = useRef();

//   const handleClickOutside = (event) => {
//     if (
//       !searchRef?.current?.contains(event.target) &&
//       !searchIconRef?.current?.contains(event.target)
//     ) {
//       setOpenSearch(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside, true);
//     return () => {
//       document.removeEventListener("click", handleClickOutside, true);
//     };
//   });

//   // 스코어 카운터 
//   useEffect(()=>{
//     ScoreCount(  `/api/main/count/live/5` , setScoreCount)
//   },[])

//   const [liveCount, setLiveCount] = useState()

//   useEffect(()=>{
//     // 스포츠 타입에 맞춰 스코어값을 다르게 적용
//     if(sportsType === "soccer"){
//       setLiveCount(scoreCount?.football)
//     }else if(sportsType === "basketball"){
//       setLiveCount(scoreCount?.basketball)
//     }else if(sportsType === "baseball"){
//       setLiveCount(scoreCount?.baseball)
//     }else if(sportsType === "volleyball"){
//       setLiveCount(scoreCount?.volleyball)
//     }else if(sportsType === "tennis"){
//       setLiveCount(scoreCount?.tennis)
//     }
//   },[scoreCount , sportsType])

//   // // pageBasicData

//   //   // 소켓
//   //   const [sportsSocket, setSportsSocket] = useState("")

//   //   // const sendMessage = () => {
//   //   //   // 연결된 서버로 send_message라는 값에 해당 메세지를 보낸다.
//   //   //   socket.emit("send_message" , {message})
//   //   // }

//   //   const locations = useLocation();
//   //   let clientPrivate = io('http://localhost:3001/football_score')

//   //   useEffect(()=>{
//   //     if((locations.pathname === "/score") === true){ 
//   //       clientPrivate.on("football_score" , (data)=>{
//   //         console.log(data)
//   //         setSportsSocket(data)
//   //       })
//   //     }
//   //   },[locations.pathname , socket])
//   //   // pageBasicData

//   return (
//     <section className="Wrapper">
//       <div className="ContentsContainer">
//         <LiveComponent>
//           {/*헤더 */}
//         <div className= "AssuranceContainer" >
//           <TitleContainer className="title">
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               <img
//                 className="icon"
//                 src="/images/main/Sidebar4.png"
//                 alt=""
//               ></img>
//               <Title style={{ marginLeft: "7px" }}>
//                 스포시티 보증업체 
//               </Title>
//             </div>
//             <MoreDetails>더보기</MoreDetails>
//           </TitleContainer>
//           <GuaranteeCompanySlider />
//         </div>
//         <div className="MenuContainer" >
//           <MenuContents onClick={() => setSportsType("soccer")}>
//             <MenuRectangle
//               background={sportsType === "soccer" ? "#19793a" : "#3c3e3d"}
//             >
//               <img src="/images/live/Soccer.png" alt="" />
//               <MenuCount background={sportsType === "soccer" && "active"}>
//                 {scoreCount?.football}
//               </MenuCount>
//             </MenuRectangle>
//             <MenuText>축구</MenuText>
//             </MenuContents>
//             <MenuContents onClick={() => setSportsType("basketball")}>
//               <MenuRectangle
//                 background={sportsType === "basketball" ? "#19793a" : "#3c3e3d"}
//               >
//                 <img src="/images/live/Basketball.png" alt="" />
//                 <MenuCount background={sportsType === "basketball" && "active"}>
//                   {scoreCount?.basketball}
//                 </MenuCount>
//               </MenuRectangle>
//               <MenuText>농구</MenuText>
//             </MenuContents>
//             <MenuContents onClick={() => setSportsType("baseball")}>
//               <MenuRectangle
//                 background={sportsType === "baseball" ? "#19793a" : "#3c3e3d"}
//               >
//                 <img src="/images/live/Baseball.png" alt="" />
//                 <MenuCount background={sportsType === "baseball" && "active"}>
//                   {scoreCount?.baseball}
//                 </MenuCount>
//               </MenuRectangle>
//               <MenuText>야구</MenuText>
//             </MenuContents>
//             <MenuContents onClick={() => setSportsType("volleyball")}>
//               <MenuRectangle
//                 background={sportsType === "volleyball" ? "#19793a" : "#3c3e3d"}
//               >
//                 <img src="/images/live/Volleyball.png" alt="" />
//                 <MenuCount background={sportsType === "volleyball" && "active"}>
//                   {scoreCount?.volleyball}
//                 </MenuCount>
//               </MenuRectangle>

//               <MenuText>배구</MenuText>
//             </MenuContents>
//             <MenuContents onClick={() => setSportsType("tennis")}>
//               <MenuRectangle
//                 background={sportsType === "tennis" ? "#19793a" : "#3c3e3d"}
//               >
//                 <img src="/images/live/Tennis.png" alt="" />
//                 <MenuCount background={sportsType === "tennis" && "active"}>
//                   {scoreCount?.tennis}
//                 </MenuCount>
//               </MenuRectangle>

//               <MenuText>테니스</MenuText>
//             </MenuContents>
//             <MenuContents>
//               <MenuRectangle background="rgba(255, 255, 255, 0.1)">
//                 <img src="/images/live/UFC.png" alt="" />
//               </MenuRectangle>

//               <MenuText color="rgba(255, 255, 255, 0.4)">UFC</MenuText>
//             </MenuContents>
//             <MenuContents>
//               <MenuRectangle background="rgba(255, 255, 255, 0.1)">
//                 <img src="/images/live/Football.png" alt="" />
//               </MenuRectangle>
//               <MenuText color="rgba(255, 255, 255, 0.4)">미식축구</MenuText>
//             </MenuContents>
//             <MenuContents>
//               <MenuRectangle background="rgba(255, 255, 255, 0.1)">
//                 <img src="/images/live/Hockey.png" alt="" />
//               </MenuRectangle>
//               <MenuText color="rgba(255, 255, 255, 0.4)">하키</MenuText>
//             </MenuContents>
//             <MenuContents>
//               <MenuRectangle background="rgba(255, 255, 255, 0.1)">
//                 <img src="/images/live/LOL.png" alt="" />
//               </MenuRectangle>
//               <MenuText color="rgba(255, 255, 255, 0.4)">
//                 리그 오브 레전드
//               </MenuText>
//             </MenuContents>
//             {/* 여기서부터 내용 */}
//           </ div>

          
//           <div className="LiveContents">
//             <LiveComponent>
//               <TopBarContainer>
//               <TabContainer>
//                 <Tab active={tab === 1} onClick={() => setTab(1)}>
//                   <TabText active={tab === 1}>라이브</TabText>
//                   <TabText active={tab === 1}>({liveCount})</TabText>
//                 </Tab>
//                 <Tab active={tab === 2} onClick={() => setTab(2)}>
//                   <TabText>종료</TabText>
//                 </Tab>
//                 <Tab active={tab === 3} onClick={() => setTab(3)}>
//                   <TabText>예정</TabText>
//                 </Tab>
//               </TabContainer>
//               <OptionContainer tab={tab}>
//                 <IconRectangle
//                   onClick={() => setBookmark(!bookmark)}
//                   className="star"
//                 >
//                   {bookmark ? (
//                     <img className="star" src="/images/live/Star-on.png" alt="" />
//                   ) : (
//                     <img
//                       className="star"
//                       src="/images/live/Star-off.png"
//                       alt=""
//                     />
//                   )}
//                   <div className="tooltip">
//                     <div>!</div>즐겨찾기한 리그/경기만 모아보고 알림을 받을수
//                     있어요
//                   </div>
//                 </IconRectangle>
//                 {openSearch && (
//                     <SearchContainer
//                       ref={searchRef}
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       <SearchInput placeholder="리그명 또는 팀 이름을 검색하세요" />
//                       <img src="/images/live/Search.png" alt="" />
//                     </SearchContainer>
//                   )}
//                   <IconRectangle
//                     ref={searchIconRef}
//                     onClick={() => setOpenSearch(!openSearch)}
//                   >
//                     <img src="/images/live/Search.png" alt="" />
//                   </IconRectangle>
//                   <img src="/images/live/Refresh.png" alt="" />
//                   <SoundContainer
//                     onClick={() =>
//                       setOnOffButton({
//                         ...onOffButton,
//                         sound: !onOffButton.sound,
//                       })
//                     }
//                   >
//                     <Sound>
//                       <img src="/images/live/Sound.png" alt="" />
//                       <div>소리</div>
//                     </Sound>
//                     <OnoFFButton active={onOffButton.sound}>
//                       {onOffButton.sound ? "ON" : "OFF"}
//                     </OnoFFButton>
//                   </SoundContainer>
//                   <ScoreContainer
//                     onClick={() =>
//                       setOnOffButton({
//                         ...onOffButton,
//                         score: !onOffButton.score,
//                       })
//                     }
//                   >
//                     <Score>
//                       <img src="/images/live/Notice.png" alt="" />
//                       <div>스코어 알림</div>
//                     </Score>
//                     <OnoFFButton active={onOffButton.score}>
//                       {onOffButton.score ? "ON" : "OFF"}
//                     </OnoFFButton>
//                   </ScoreContainer>

//                   <SelectDefault
//                     number={10}
//                     onClick={() => setOpenSelect({ ...openSelect, open: true })}
//                   >
//                     <div placeholder={openSelect.text} disabled={1} select={1}>
//                       {openSelect?.text || ""}
//                     </div>
//                     <img
//                       src="/images/chat/ArrowDown.png"
//                       alt=""
//                       style={{
//                         width: "10px",
//                         height: "5px",
//                       }}
//                     ></img>
//                     {openSelect.open === true && (
//                       <SelectFullContainer>
//                         <SelectFullTop
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setOpenSelect({ ...openSelect, open: false });
//                           }}
//                         >
//                           <SelectText>{openSelect.text}</SelectText>
//                           <img
//                             src="/images/chat/ArrowDown.png"
//                             alt=""
//                             style={{
//                               width: "10px",
//                               height: "5px",
//                               cursor: "pointer",
//                               transform: `${
//                                 openSelect.open ? "rotate(180deg)" : "rotate(0deg)"
//                               }`,
//                             }}
//                           ></img>
//                         </SelectFullTop>
//                         <SelectContentsWrapper>
//                           <SelectContents
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setOpenSelect({ open: false, text: "시간순" });
//                             }}
//                           >
//                             시간순
//                           </SelectContents>
//                           <SelectContents
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setOpenSelect({ open: false, text: "리그순" });
//                             }}
//                           >
//                             리그순
//                           </SelectContents>
//                         </SelectContentsWrapper>
//                       </SelectFullContainer>
//                     )}
//                   </SelectDefault>

//                   {(tab === 2 || tab === 3) && (
//                     <TimeButton>
//                       <img
//                         src="/images/live/Arrow-left.png"
//                         alt=""
//                         onClick={minusDate}
//                       />
//                       <div
//                         className="date"
//                         onClick={() => setCalendar(!calendar)}
//                         style={{ cursor: "pointer" }}
//                       >
//                         <img src="/images/live/Calendar.png" alt="" />
//                         <span>{moment(date).format("MM/DD dd")}</span>
//                       </div>
//                       <img
//                         src="/images/live/Arrow-right.png"
//                         alt=""
//                         onClick={plusDate}
//                       />
//                       {calendar && (
//                         <CalendarContainer>
//                           <Calendar
//                             onChange={(e) => {
//                               setDate(e);
//                               setCalendar(false);
//                             }}
//                             value={date}
//                             formatDay={(locale, date) =>
//                               date.toLocaleString("en", { day: "numeric" })
//                             }
//                             minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
//                             maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
//                             navigationLabel={null}
//                           />
//                         </CalendarContainer>
//                       )}
//                     </TimeButton>
//                   )}
//                 </OptionContainer>
//               </TopBarContainer>
//             </LiveComponent> 




            
//             <LiveComponent>
//               {/* header */}
//               <LeagueContainer>
//                   <section className="regHeaderContainer">
//                     <article className="regHeaderLeft">
//                       <div>
//                         <img src="/images/live/Gambia.png" alt=""/>
//                         <span>
//                             감비아 : GFA 리그
//                         </span>
//                         <img src="/images/live/Star-on.png" alt=""/>
//                       </div>
//                       <div>
//                         <ul>
//                           <li>S1</li>
//                           <li>S2</li>
//                           <li>S3</li>
//                           <li>S4</li>
//                         </ul>
//                       </div>
//                     </article>
//                     <article className="regHeaderRight">
//                       <div>
//                         <span>
//                           해외배당
//                         </span>
//                       </div>
//                     </article>
//                   </section>
//                   <ul className="BaseballQuarter">
//                     <li>1</li>
//                     <li>2</li>
//                     <li>3</li>
//                     <li>4</li>
//                     <li>5</li>
//                     <li>6</li>
//                     <li>7</li>
//                     <li>8</li>
//                     <li>9</li>
//                     <li>연장</li>
//                   </ul>
//               </LeagueContainer>
//             </LiveComponent>
//           </div>
//         </LiveComponent>
//         <LiveMobile sportsType={sportsType} liveCount={liveCount} ></LiveMobile>
//         <Footer setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
//       </div>
//     </section>
//   );
// };

// export default LiveScorePage;
