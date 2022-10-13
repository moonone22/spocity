import React, { useCallback, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "../common/Footer";
import GuaranteeCompanySlider from "../slider/GuaranteeCompanySlider";
import 'react-quill/dist/quill.snow.css';
import styles from './quillEditor.module.css';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const Wrapper = styled.div`
  width: 100%;
`;

const AssuranceContainer = styled.div`
  height: fit-content;
  padding: 0 45px 0 43px;
  margin-bottom: 40px;
  margin-top: 44px;
  @media (max-width: 1100px) {
    padding: 0 30px 0 40px;
    margin-bottom: 40px;
  }
  @media (max-width: 720px) {
    display: none;
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

const NoticeContainer = styled.div`
  width: 100%;
  padding: 0 50px;
  > .title {
    width: 100%;
    font-size: 25px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.5px;
    color: #fff;
    margin-bottom: 30px;
  }
  @media (max-width: 720px) {
    margin-top: calc((40 / 1280) * 100vh);
    padding: 0 calc((40 / 720) * 100vw);

    > .title {
      margin-bottom: calc((24 / 1280) * 100vh);
      font-size: calc((32 / 1280) * 100vh);
    }
  }
`;

const WriteContainer = styled.div``;

const InputTtile = styled.div`
  width: 100%;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.32px;
  text-align: left;
  color: #fff;

  @media (max-width: 720px) {
    font-size: calc((24 / 720) * 100vw);
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 50px;
  background-color: #303231;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  border: ${(props) =>
    Number(props.inputFocus) === Number(props.number)
      ? "solid 1px #099f3c"
      : "none"};

  @media (max-width: 720px) {
    height: calc((80 / 1280) * 100vh);
  }
`;

const Input = styled.input`
  width: 80%;
  height: 80%;
  margin-left: 15px;
  background-color: transparent;
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


const CheckContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 39px;

  span {
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.3px;
    text-align: left;
    color: #ccc;
    margin-left: 6px;

    @media (max-width: 720px) {
      font-size: calc((24 / 720) * 100vw);
    }
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

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 75px;

  > button {
    width: 100px;
    height: 45px;
    border-radius: 6px;
    border: solid 1px #666;

    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.3px;
    text-align: center;
    color: #fff;

    @media (max-width: 720px) {
      width: calc((200 / 720) * 100vw);
      height: calc((80 / 1280) * 100vh);
      font-size: calc((28 / 720) * 100vw);
    }
  }

  .confirm {
    border: none;
    background-color: #19793a;
    margin-right: 10px;
  }
`;
// 테스트 

const MyBlock = styled.div`
    .wrapper-class{
      width: 100%;
      margin: 0 auto;
      margin-bottom: 4rem;
    }
    .rdw-editor-toolbar{
      background-color : #0-0
    }
    .editor {
      height: 500px !important;
      padding: 5px !important;
      border-radius: 2px !important;
      border: ${(props) =>
        Number(props.TextAreaFocus) === Number(props.number)
          ? "solid 1px #099f3c"
          : "none"};
      color : white;
    }
`;

const NoticeWrite = ({ setMobileMenu, mobileMenu }) => {
  let { id } = useParams();
  const [inputFocus, setInputFocus] = useState(false);
  const [TextAreaFocus, setTextAreaFocus] = useState(false);
  const [check, setCheck] = useState(false);

  
  const quillRef = useRef(); //🌈
  const [htmlContent, setHtmlContent] = useState(""); //🌈

  const imageHandler = useCallback(() => {
    const formData = new FormData(); // 이미지를 url로 바꾸기위해 서버로 전달할 폼데이터 만들기
    
    // const res = await api.uploadImage(formData);
    // if (!res.success) {
    //     alert("이미지 업로드에 실패하였습니다.");
    // }
    
    // const url = res.payload.url;
    const input = document.createElement("input"); // input 태그를 동적으로 생성하기
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*"); // 이미지 파일만 선택가능하도록 제한
    input.setAttribute("name", "image");
    input.click(); 

    // 파일 선택창에서 이미지를 선택하면 실행될 콜백 함수 등록
    input.onchange = async () => {
        const file = input.files[0];
        formData.append("image", file); // 위에서 만든 폼데이터에 이미지 추가
        
        const quill = quillRef.current.getEditor();
        /* ReactQuill 노드에 대한 Ref가 있어야 메서드들을 호출할 수 있으므로
        useRef()로 ReactQuill에 ref를 걸어주자.
        getEditor() : 편집기를 지원하는 Quill 인스턴스를 반환함
        여기서 만든 인스턴스로 getText()와 같은 메서드를 사용할 수 있다.*/
        
        const range = quill.getSelection()?.index; 
        //getSelection()은 현재 선택된 범위를 리턴한다. 에디터가 포커싱되지 않았다면 null을 반환한다.
        
        if (typeof (range) !== "number") return;
        /*range는 0이 될 수도 있으므로 null만 생각하고 !range로 체크하면 잘못 작동할 수 있다.
        따라서 타입이 숫자이지 않을 경우를 체크해 리턴해주었다.*/
      
        quill.setSelection(range, 1);
        /* 사용자 선택을 지정된 범위로 설정하여 에디터에 포커싱할 수 있다. 
           위치 인덱스와 길이를 넣어주면 된다.*/
      
        // quill.clipboard.dangerouslyPasteHTML(
        //     range,
        //     `<img src=${url} alt="image" />`);
    }   //주어진 인덱스에 HTML로 작성된 내용물을 에디터에 삽입한다.
}, [ quillRef]);

  console.log(htmlContent)
  // NoticeDetail
  const modules = useMemo(
    () => ({
        toolbar: { // 툴바에 넣을 기능들을 순서대로 나열하면 된다.
            container: [
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ size: ["small", false, "large", "huge"] }, { color: [] }],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                    { align: [] },
                ],
                ["image", "video"],
            ],
            handlers: { // 위에서 만든 이미지 핸들러 사용하도록 설정
                image: imageHandler,
            },
        },
    }), [imageHandler]);

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (editorState) => {
      // editorState에 값 설정
      setEditorState(editorState);
    };

  return (
    <Wrapper>
      <AssuranceContainer>
        <TitleContainer className="title">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img className="icon" src="/images/main/Sidebar4.png" alt=""></img>
            <Title style={{ marginLeft: "7px" }}>스포시티 보증업체</Title>
          </div>
          <MoreDetails>더보기</MoreDetails>
        </TitleContainer>
        <GuaranteeCompanySlider />
      </AssuranceContainer>
      <NoticeContainer>
        <div className="title">공지사항</div>
        <WriteContainer>
          <InputTtile>카테고리</InputTtile>
          <InputWrapper></InputWrapper>
          <InputTtile>공지명</InputTtile>
          <InputWrapper inputFocus={inputFocus} number={1}>
            <Input
              onFocus={() => setInputFocus(1)}
              onBlur={() => setInputFocus(0)}
            ></Input>
          </InputWrapper>
          <InputTtile>공지내용</InputTtile>

          <MyBlock TextAreaFocus={TextAreaFocus} number={1}>
            <Editor
              onFocus={() =>  setTextAreaFocus(1)}
              onBlur={() =>  setTextAreaFocus(0)}
              // 에디터와 툴바 모두에 적용되는 클래스
              wrapperClassName="wrapper-class"
              // 에디터 주변에 적용된 클래스
              editorClassName="editor"
              // 툴바 주위에 적용된 클래스
              toolbarClassName="toolbar-class"
              // 툴바 설정
              toolbar={{
                // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: false },
              }} 
              placeholder="내용을 작성해주세요."
              // 한국어 설정
              localization={{
                locale: 'ko',
              }}
              // 초기값 설정
              editorState={editorState}
              // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
              onEditorStateChange={onEditorStateChange}
            />
          </MyBlock>
        {/* 
          <EditerContainer>
              <ReactQuill
                  ref={quillRef}
                  value={htmlContent}
                  onChange={setHtmlContent}
                  theme="snow"
                  modules={modules}
                  className={styles.quillEditor}
              />
          </EditerContainer> */}
          <CheckContainer>
            {check ? (
              <CheckBoxOn onClick={() => setCheck(false)} />
            ) : (
              <CheckBoxOff onClick={() => setCheck(true)} />
            )}
            <span>위 게시글을 고정하시겠습니까?</span>
          </CheckContainer>
          <ButtonContainer>
            <button className="confirm">확인</button>
            <button>취소</button>
          </ButtonContainer>
        </WriteContainer>
      </NoticeContainer>

      <Footer setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
    </Wrapper>
  );
};

export default NoticeWrite;
