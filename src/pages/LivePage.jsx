import React, { useState } from "react";
import styled from "styled-components";

import LiveSoccer from "../components/live/LiveSoccer";
import LiveBaseball from "../components/live/LiveBaseball";
import LiveBasketball from "../components/live/LiveBasketball";
import LiveTennis from "../components/live/LiveTennis";
import LiveVolleyball from "../components/live/LiveVolleyball";
import PageNotFond from "../components/test/PageNotFond";
import ServiceInspection from "../components/test/ServiceInspection";
import SystemDelay from "../components/test/SystemDelay";
import { useLocation } from "react-router-dom";

const LivePage = ({
  pathname,
  setMobileMenu,
  mobileMenu,
  fullScreen,
  setFullScreen,
  multiModalToggle,
  setMultiModalToggle,
  footballH2HData,
  footballMatchIdData,
  matchIdData,
  pageBasicData
}) => {

    const matchIdLocation = useLocation();
    console.log(matchIdLocation.pathname.split("/")[4])
        
  return pathname === `/live/watch/football/${matchIdLocation.pathname.split("/")[4]}` || pathname === `/live/watch/football/`? (
    <LiveSoccer
      setMobileMenu={setMobileMenu}
      mobileMeunu={mobileMenu}
      fullScreen={fullScreen}
      setFullScreen={setFullScreen}
      // 경기선택 모달창 토글
      multiModalToggle={multiModalToggle}
      setMultiModalToggle={setMultiModalToggle}
      footballH2HData={footballH2HData}
      footballMatchIdData={footballMatchIdData}
      matchIdData={matchIdData}
      pageBasicData={pageBasicData}
    ></LiveSoccer>
  ) : pathname === "/live/watch/baseball/*" ? (
    <LiveBaseball
      setMobileMenu={setMobileMenu}
      mobileMeunu={mobileMenu}
      fullScreen={fullScreen}
      setFullScreen={setFullScreen}
      // 경기선택 모달창 토글
      multiModalToggle={multiModalToggle}
      setMultiModalToggle={setMultiModalToggle}
      pageBasicData={pageBasicData}
    ></LiveBaseball>
  ) : pathname === "/live/watch/basketball/*" ? (
    <LiveBasketball
      setMobileMenu={setMobileMenu}
      mobileMeunu={mobileMenu}
      fullScreen={fullScreen}
      setFullScreen={setFullScreen}
      // 경기선택 모달창 토글
      multiModalToggle={multiModalToggle}
      setMultiModalToggle={setMultiModalToggle}
      pageBasicData={pageBasicData}
    ></LiveBasketball>
  ) : pathname === "/live/watch/tennis/*" ? (
    <LiveTennis
      setMobileMenu={setMobileMenu}
      mobileMeunu={mobileMenu}
      fullScreen={fullScreen}
      setFullScreen={setFullScreen}
      // 경기선택 모달창 토글
      multiModalToggle={multiModalToggle}
      setMultiModalToggle={setMultiModalToggle}
      pageBasicData={pageBasicData}
    ></LiveTennis>
  ) : pathname === "/live/watch/volleyball/*" ? (
    <LiveVolleyball
      setMobileMenu={setMobileMenu}
      mobileMeunu={mobileMenu}
      fullScreen={fullScreen}
      setFullScreen={setFullScreen}
      // 경기선택 모달창 토글
      multiModalToggle={multiModalToggle}
      setMultiModalToggle={setMultiModalToggle}
      pageBasicData={pageBasicData}
    ></LiveVolleyball>
  ): pathname === "/live/pageNotFond" ? (
    <PageNotFond
      setMobileMenu={setMobileMenu}
      mobileMeunu={mobileMenu}
      fullScreen={fullScreen}
      setFullScreen={setFullScreen}
    ></PageNotFond>
  ): pathname === "/live/serviceInspection" ? (
    <ServiceInspection
      setMobileMenu={setMobileMenu}
      mobileMeunu={mobileMenu}
      fullScreen={fullScreen}
      setFullScreen={setFullScreen}
    ></ServiceInspection>
  ): pathname === "/live/systemDelay" ? (
    <SystemDelay
      setMobileMenu={setMobileMenu}
      mobileMeunu={mobileMenu}
      fullScreen={fullScreen}
      setFullScreen={setFullScreen}
    ></SystemDelay>
  ) : (
    <></>
  );
};

export default LivePage;
