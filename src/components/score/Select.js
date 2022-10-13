import React from "react";
import styled, { css } from "styled-components";

const SelectContainer = styled.div`
  height: 100%;
  :hover {
    filter: brightness(1.2);
  }
  @media (max-width: 720px) {
    :hover {
      filter: brightness(1);
    }
    ${(props) => {
      props.number === 1 || props.number === 2
        ? css`
            width: 49%;
            margin: 0;
          `
        : css`
            width: 100%;
          `;
    }}
  }
`;

const SelectDefault = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  align-items: center;
  width: ${(props) => props.width || "92px"};
  height: ${(props) => props.height || "37px"};
  border-radius: 6px;
  border: solid 1px #202221;
  background-color: ${(props) => props.background || "#383a39"};
  position: relative;
  cursor: pointer;

  .multi {
    width: 16px;
  }
  .relay {
    width: 21px;
  }
  .arrow {
    width: 10px;
    height: 5px;
  }

  * {
    ${(props) =>
      props.type === "option"
        ? css`
            font-size: 14px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: -0.28px;
            color: rgba(255, 255, 255, 0.8);
          `
        : css`
            font-family: "Roboto", sans-serif;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: -0.32px;
            color: #fff;
            text-align: start;
            @media (max-width: 720px) {
              font-size: calc((24 / 720) * 100vw);
            }
          `}
  }

  @media (max-width: 720px) {
    width: calc((110 / 720) * 100vw);
    height: calc((50 / 1280) * 100vh);
    font-size: calc((26 / 720) * 100vw);
    padding: 0 calc((20 / 720) * 100vw);
    /* ${(props) =>
      props.number === 1 || props.number === 2
        ? css`
            width: 100%;
          `
        : css`
            width: 100%;
          `} */
    ${(props) =>
      props.type === "option" &&
      css`
        width: calc((201 / 720) * 100vw);
        height: calc((58 / 1280) * 100vh);
        * {
          font-size: calc((22 / 720) * 100vw);
        }
      `}

    ${(props) =>
      props.name === "relay" &&
      css`
        width: calc((227 / 720) * 100vw);
        .relay {
          width: calc((34 / 720) * 100vw);
        }
      `}
      .arrow {
      width: calc((19 / 720) * 100vw);
      height: calc((9 / 720) * 100vw);
    }
  }
`;


const SelectFullContainer = styled.div`
  width: ${(props) => props.width || "92px"};
  height: max-content;
  object-fit: contain;
  border-radius: 6px;
  border: solid 1px #202221;
  background-color: ${(props) => props.background || "#383a39"};
  position: absolute;
  bottom : -3px;
  right: -1px;
  z-index: 10000;
  @media (max-width: 720px) {
    right: 0;
    width: 100%;
  }
`;

const SelectFullTop = styled.div`
  background-color: ${(props) => props.background || "#383a39"};
  width: 100%;
  height: ${(props) => props.height || "37px"};
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  align-items: center;
  border-bottom: solid 1px #202221;
  border-radius: 8px 8px 0 0;
  cursor: pointer;

  .multi {
    width: 16px;
  }
  .relay {
    width: 21px;
  }
  .arrow {
    width: 10px;
    height: 5px;
    cursor: pointer;
  }
  @media (max-width: 720px) {
    padding: 0 calc((20 / 720) * 100vw);
    justify-content: flex-start;

    height: calc((70 / 1280) * 100vh);
    .arrow {
      width: calc((19 / 720) * 100vw);
      height: calc((9 / 720) * 100vw);
      margin-left: auto;
    }
    .relay {
      width: calc((34 / 720) * 100vw);
      margin-right: calc((12 / 720) * 100vw);
    }
    .multi {
      width: calc((34 / 720) * 100vw);
      margin-right: calc((12 / 720) * 100vw);
    }
    ${(props) =>
      props.type === "option" &&
      css`
        height: calc((58 / 1280) * 100vh);
      `}
  }
`;

const SelectContentsWrapper = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  background-color: ${(props) => props.background || "#383a39"};
  border-radius: 0 0 8px 8px;
  @media (max-width: 720px) {
    height: max-content;
  }
`;

const SelectText = styled.span`
  ${(props) =>
    props.type === "option"
      ? css`
          font-size: 14px;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;
          letter-spacing: -0.28px;
          color: rgba(255, 255, 255, 0.8);
        `
      : css`
          font-family: "Roboto", sans-serif;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          letter-spacing: -0.32px;
          color: #fff;
        `}

  @media (max-width: 720px) {
    font-size: calc((26 / 720) * 100vw);
    ${(props) =>
      props.type === "option" &&
      css`
        font-size: calc((22 / 720) * 100vw);
      `}
  }
`;

const SelectContents = styled.div`
  width: 100%;
  padding-left: 15px;
  height: 26px;
  line-height: 26px;
  object-fit: contain;
  border-radius: 5px;
  cursor: pointer;
  margin: 4px 0;
  display: flex;
  align-items: center;

  img {
    ${(props) =>
      props.name === "relay" &&
      css`
        width: 21px;
        margin-right: 6px;
      `}
  }

  ${(props) =>
    props.type === "option"
      ? css`
          font-size: 14px;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;
          letter-spacing: -0.28px;
          color: rgba(255, 255, 255, 0.8);
        `
      : css`
          font-family: "Roboto", sans-serif;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          letter-spacing: -0.32px;
          color: #fff;
          text-align: start;
        `}

  &:hover {
    background-color: #19793a;
  }
  @media (max-width: 720px) {
    font-size: calc((26 / 720) * 100vw);
    margin: calc((16 / 720) * 100vw) 0;
    padding-left: calc((20 / 720) * 100vw);
    ${(props) =>
      props.type === "option" &&
      css`
        font-size: calc((22 / 720) * 100vw);
        img {
          width: calc((34 / 720) * 100vw);
        }
      `}
  }
`;

const Select = ({
  select,
  setSelect,
  width,
  type,
  background,
  height,
  name,
}) => {
  return (
    <SelectContainer number={1} name={name}>
      <SelectDefault
        number={1}
        width={width}
        onClick={() => setSelect({ ...select, open: true })}
        type={type}
        background={background}
        height={height}
        name={name}
      >
        {select?.text === "멀티뷰" && (
          <img
            className="multi"
            src="/images/watchinglive/multiview.png"
            alt=""
          ></img>
        )}
        {name === "relay" && select?.text === "그래픽중계" && (
          <img
            className="relay"
            src="/images/watchinglive/graphic.png"
            alt=""
          ></img>
        )}
        {name === "relay" && select?.text === "실시간중계" && (
          <img
            className="relay"
            src="/images/watchinglive/realtime.png"
            alt=""
          ></img>
        )}

        <div placeholder={select?.text}>{select?.text || ""}</div>
        <img className="arrow" src="/images/chat/ArrowDown.png" alt="" />
        {select?.open === true && (
          <SelectFullContainer width={width} number={1} background={background}>
          {/* 그래픽중계, 화질, 멀티뷰 클릭시 내용부분 */}
            <SelectContentsWrapper background={background}>
              {select?.list?.map((item, idx) => {
                return (
                  <SelectContents
                    name={name}
                    idx={idx}
                    type={type}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelect({ ...select, open: false, text: item });
                    }}
                  >
                    {name === "relay" && idx === 0 && (
                      <img src="/images/watchinglive/graphic.png" alt=""></img>
                    )}
                    {name === "relay" && idx === 1 && (
                      <img src="/images/watchinglive/realtime.png" alt=""></img>
                    )}
                    {item}
                  </SelectContents>
                );
              })}
                 {/* 그래픽중계, 화질, 멀티뷰 클릭시 제목부분 */}
            <SelectFullTop
              type={type}
              background={background}
              height={height}
              onClick={(e) => {
                e.stopPropagation();
                setSelect({ ...select, open: false });
              }}
            >
              {/* 그래픽 중계나 멀티뷰등에 맞춰서 아이콘 나타나게 */}
              {select?.text === "멀티뷰" && (
                <img
                  className="multi"
                  src="/images/watchinglive/multiview.png"
                  alt=""
                ></img>
              )}
              {name === "relay" && select?.text === "그래픽중계" && (
                <img
                  className="relay"
                  src="/images/watchinglive/graphic.png"
                  alt=""
                ></img>
              )}
              {name === "relay" && select?.text === "실시간중계" && (
                <img
                  className="relay"
                  src="/images/watchinglive/realtime.png"
                  alt=""
                ></img>
              )}
              {/* 타입 선택시 글자 나타나게 */}
              <SelectText type={type}>{select?.text}</SelectText>
              <img
                className="arrow"
                src="/images/chat/ArrowDown.png"
                alt=""
                style={{
                  transform: `${
                    select?.open ? "rotate(180deg)" : "rotate(0deg)"
                  }`,
                }}
              ></img>
            </SelectFullTop>
            </SelectContentsWrapper>
          </SelectFullContainer>
        )}
      </SelectDefault>
    </SelectContainer>
  );
};

export default Select;
