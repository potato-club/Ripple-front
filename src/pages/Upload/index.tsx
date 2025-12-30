import styled from "styled-components";
import Navbar from "../../components/Navbar";
import uploadIcon from "../../assets/icons/upload.svg";
import { useEffect, useRef, useState } from "react";
import { refreshToken } from "../../services/Auth/refreshToken";

const Cnt = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #222;
  height: 100vh;
  width: 100%;
`;

const StyledHeader = styled.div`
  flex-shrink: 0;
  color: white;
  background-color: #222;
  display: flex;
  position: fixed;
  top: 0;
  height: 70px;
  width: 100%;
  align-items: center;
  padding: 8px 16px;
`;

const StyledUploadIcon = styled.img`
  height: 32px;
  width: 32px;
  cursor: pointer;
`;

const StyledHeaderTtitle = styled.div`
  font-size: 32px;
  margin-left: 20px;
`;

const StyledBody = styled.div`
  flex: 1;
  background-color: #ffffff;
  aspect-ratio: 2/3;
  height: calc(100vh - 150px);
  width: 100%;
  margin-bottom: 80px;
  margin-top: 70px;
`;

const StyledUploadBtn = styled.button`
  position: fixed;
  right: 16px;
  bottom: calc(80px + 16px);

  width: 64px;
  height: 64px;

  background-color: #1FA6F4;
  border-radius: 64px;
`;

const StyledUploadImgPreviewWrp = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  min-height: 300px;

  margin: 16px 0;
`;
const StyledUploadImgPreview = styled.img`
  aspect-ratio: 1/1;
  flex-shrink: 0;
  height: 300px;
  border-radius: 8px;
`;

const StyledToggle = styled.label`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

const StyledCheckbox = styled.input`
  width: 16px;
  height: 16px;
`;

const StyledInputWrp = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

const StyledContentInput = styled.input`
  width: 90%;
  height: 60px;
  margin: 0 auto;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 8px;

  font-size: 20px;
`;

const StyledTagListWrp = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

const StyledTagList = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-start;
  gap: 8px;
`;

const StyledTagListItem = styled.div`
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 16px;

  background-color: #C7EDFF;
`;

const StyledTagInputWrp = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

const StyledTagInput = styled.input`
  width: 90%;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 8px;

  font-size: 16px;
`;

const StyledVisibilitySelectTileWrp = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

const StyledVisibilitySelectTile = styled.h2`
  width: 90%;
  font-size: 18px;
`;

const StyledVisibilitySelectBtnListWrp = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledVisibilitySelectBtnList = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-around;
`;

const StyledVisibilitySelectBtn = styled.button`
  width: 30%;
  font-size: 16px;
  padding: 8px 0;
  border-radius: 8px;
`;

const StyledNotSelectedFeedPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Upload = () => {
  const [previews, setPreviews] = useState<string[]>([]); // 미리보기 이미지 URL 배열
  const [isMultiple, setIsMultiple] = useState(false); // 다중 선택 여부
  const [isSingleCss, setIsSingleCss] = useState(true); // 다중에서 단일 선택일 경우 CSS 조정

  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 입력 참조

  /** 다중 선택 여부 또는 미리보기 이미지 변경 시 CSS 조정 */
  useEffect(() => {
    setIsSingleCss(!isMultiple || (isMultiple && previews.length <= 1));
  }, [isMultiple, previews]);

  /** 파일 선택 핸들러 */
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    handlePreviewChange(files);
  };

  /** 미리보기 이미지 URL 생성 및 상태 업데이트 */
  const handlePreviewChange  = async (files: FileList) => {
    const selectedFiles = isMultiple ? Array.from(files) : (files[0] ? [files[0]] : []);
    const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(imageUrls);
  }

  /** 컴포넌트 언마운트 시 미리보기 URL 해제 */
  useEffect(() => {
    return () => {
      if (previews) previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previews]);

  /** 다중 선택 모드 토글 핸들러 */
  const handleToggleMode = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await refreshToken();
    setIsMultiple(e.target.checked); // 다중선택 모드 변경
    setPreviews([]); // 미리보기 이미지 싹 비우기 (초기화)
    
    // 실제 input 태그에 들어있는 파일 값도 초기화 (중요)
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Cnt>
      <StyledHeader>
        <StyledUploadIcon src={uploadIcon} />
        <StyledHeaderTtitle>업로드</StyledHeaderTtitle>
        <StyledToggle>
          <StyledCheckbox
            type="checkbox"
            checked={isMultiple}
            onChange={(e) => handleToggleMode(e)}
          />
          다중 선택
        </StyledToggle>
      </StyledHeader>
      <StyledBody>
        <StyledUploadImgPreviewWrp style={{ justifyContent: isSingleCss ? "center" : "flex-start"}}>
          {(previews.length > 0) ? previews.map((src, index) => (
            <StyledUploadImgPreview
              key={index}
              src={src}
              alt={`preview-${index}`}
            />
          )) : <StyledNotSelectedFeedPage>올릴 게시물을 선택해주세요</StyledNotSelectedFeedPage>}
        </StyledUploadImgPreviewWrp>

        <StyledInputWrp>
          <StyledContentInput 
          type="text" 
          placeholder="설명을 입력하세요." 
        >
        </StyledContentInput>
        </StyledInputWrp>
        
        <StyledTagListWrp>
          <StyledTagList>
            {Array.from({ length: 5 }).map((_, index) => (
              <StyledTagListItem key={index}>#태그{index + 1}</StyledTagListItem>
            ))}
          </StyledTagList>
        </StyledTagListWrp>
        
        <StyledTagInputWrp>
          <StyledTagInput 
            type="text" 
            placeholder="#day"
          >
          </StyledTagInput>
        </StyledTagInputWrp>
        
        <StyledVisibilitySelectTileWrp>
          <StyledVisibilitySelectTile>공개 설정</StyledVisibilitySelectTile>
        </StyledVisibilitySelectTileWrp>

        <StyledVisibilitySelectBtnListWrp>
          <StyledVisibilitySelectBtnList>
            <StyledVisibilitySelectBtn>전체 공개</StyledVisibilitySelectBtn>
            <StyledVisibilitySelectBtn>팔로워 공개</StyledVisibilitySelectBtn>
            <StyledVisibilitySelectBtn>나만 보기</StyledVisibilitySelectBtn>
          </StyledVisibilitySelectBtnList>
        </StyledVisibilitySelectBtnListWrp>

      </StyledBody>
      <StyledUploadBtn>
        <input
          type="file"
          multiple={isMultiple}
          id="file-input"
          onChange={handleFile}
          style={{ display: "none" }}
        />
        <label htmlFor="file-input">
          <StyledUploadIcon src={uploadIcon} />
        </label>
      </StyledUploadBtn>
      <Navbar />
    </Cnt>
  )
}

export default Upload;