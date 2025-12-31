import styled from "styled-components";
import Navbar from "../../components/Navbar";
import uploadIcon from "../../assets/icons/upload.svg";
import { useEffect, useRef, useState } from "react";
import { useOverflowTagList } from "../../hooks/useOverflowTagList";
import { feedImagesPresign } from "../../services/feeds/feedImagesPresign";
import getImageSize from "../../utils/getImageSize";
import { feedImagesUpload } from "../../services/feeds/feedImagesUpload";
import { PostFeed } from "../../services/feeds/PostFeed";
import { useNavigate } from "react-router";

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
  min-height: 30px;
`;

const StyledTagList = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  overflow: hidden;
`;

const StyledTagListItem = styled.div`
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 16px;
  flex-shrink: 0;

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

const StyledNotSelectedFeedWrp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;

const StyledNotSelectedFeed = styled.div`
  font-size: 16px;
`;

const HiddenMoreTag = styled.div`
  position: absolute;
  visibility: hidden;
  white-space: nowrap;
  padding: 4px 8px;
  font-size: 14px;
  border-radius: 16px;
  font-weight: bold;
`;

const StyledNoneTagWrp = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  min-height: 30px;
`;

const StyledNoneTag = styled.div`
  font-size: 14px;
  line-height: 200%;
  color: #888;
`;

const Upload = () => {
  const [previews, setPreviews] = useState<string[]>([]); // 미리보기 이미지 URL 배열
  const [isMultiple, setIsMultiple] = useState(false); // 다중 선택 여부
  const [isSingleCss, setIsSingleCss] = useState(true); // 다중에서 단일 선택일 경우 CSS 조정
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 입력 참조
  const filesRef = useRef<FileList | null>(null); // 선택된 파일들 참조

  const [tagList, setTagList] = useState<string[]>([]); // 태그 리스트
  const [tagInput, setTagInput] = useState(""); // 태그 입력 값
  const tagListRef = useRef<HTMLDivElement>(null); // 태그 리스트 참조
  const moreTagRef = useRef<HTMLDivElement>(null); // 숨겨진 더보기 태그 참조
  // 태그 리스트 오버플로우 훅
  const {visibleCount, hiddenCount} = useOverflowTagList<string>(
    tagListRef,
    moreTagRef,
    tagList
  );

  const [content, setContent] = useState(""); // 게시물 내용
  const [visibility, setVisibility] = useState<"PUBLIC" | "FOLLOWERS" | "PRIVATE">("PUBLIC");

  const navigate = useNavigate();

  /** 다중 선택 여부 또는 미리보기 이미지 변경 시 CSS 조정 */
  useEffect(() => {
    setIsSingleCss(!isMultiple || (isMultiple && previews.length <= 1));
  }, [isMultiple, previews]);

  /** 파일 선택 핸들러 */
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    filesRef.current = files;
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
    setIsMultiple(e.target.checked); // 다중선택 모드 변경
    setPreviews([]); // 미리보기 이미지 싹 비우기 (초기화)
    
    // 실제 input 태그에 들어있는 파일 값도 초기화 (중요)
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /** 태그 입력 핸들러 */
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  /** 태그 추가 핸들러 (Enter 키) */
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/^#/, ""); // # 제거
      if (!tagList.includes(newTag)) {
        setTagList([...tagList, newTag]);
      }
      setTagInput(""); // 입력 필드 초기화
    }
  };

  /** 태그 추가 핸들러 (포커스 아웃) */
  const handleTagInputBlur = () => {
    if (tagInput.trim() !== "") {
      const newTag = tagInput.trim().replace(/^#/, ""); // # 제거
      if (!tagList.includes(newTag)) {
        setTagList([...tagList, newTag]);
      }
      setTagInput(""); // 입력 필드 초기화
    }
  };

  const uploadFeed = async () => {
    const Files = filesRef.current;

    if (!Files || Files.length === 0) { // 파일이 없으면 종료
      console.error("No files selected for upload.");
      return;
    } 

    if (content.trim() === "") { // 내용이 없으면 종료
      console.error("Content cannot be empty.");
      return;
    }

    const lenFiles = Files.length;

    const fileTypes = Array.from(Files).map(file => file.type);
    const fileSizeBytes = Array.from(Files).map(file => file.size);

    // 프리사인드 URL 요청
    const presignResponse = await feedImagesPresign({
      files: Array.from({ length: lenFiles }, (_, i) => ({
        mimeType: fileTypes[i],
        sizeBytes: fileSizeBytes[i],
      })),
    });

    if (!presignResponse) return;

    const [objectKeys, uploadUrls, maxSizeBytes] = [
      presignResponse.items.map(item => item.objectKey),
      presignResponse.items.map(item => item.uploadUrl),
      presignResponse.items.map(item => item.maxSizeBytes),
    ];

    console.log("maxSizeBytes:", maxSizeBytes);

    // 업로드 실행
    const uploadResults = await Promise.all(Array.from({ length: lenFiles }, (_, i) => 
      feedImagesUpload(uploadUrls[i], Files[i])
    ));

    if (uploadResults.includes(false)) {
      console.error("Some images failed to upload.");
      return;
    }

    // 이미지 크기 가져오기
    const sizes = await Promise.all(
      Array.from(Files).map(file => getImageSize(file))
    );

    const [widths, heights] = [
      sizes.map(s => s.width),
      sizes.map(s => s.height),
    ];

    const res = await PostFeed({
      content: content,
      tags: tagList,
      visibility: visibility,
      images: Array.from({ length: lenFiles }, (_, i) => ({
        objectKey: objectKeys[i],
        mimeType: fileTypes[i],
        width: widths[i],
        height: heights[i],
        sizeBytes: fileSizeBytes[i]
      })),
    });
    if (!res) {
      console.error("Failed to post feed.");
      return;
    }
    else {
      navigate("/");
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
          )) : 
            <StyledNotSelectedFeedWrp>
              <input
              type="file"
              multiple={isMultiple}
              id="file-input"
              onChange={handleFile}
              hidden
              />
              <label htmlFor="file-input">
                <StyledNotSelectedFeed>여기를 클릭하여 올릴 게시물을 선택해주세요</StyledNotSelectedFeed>
              </label>
            </StyledNotSelectedFeedWrp>
          }
        </StyledUploadImgPreviewWrp>

        <StyledInputWrp>
          <StyledContentInput 
          type="text" 
          placeholder="설명을 입력하세요." 
          value={content}
          onChange={(e) => setContent(e.target.value)}
        >
        </StyledContentInput>
        </StyledInputWrp>
        
        {tagList.length > 0 ? <StyledTagListWrp>
          <StyledTagList
            ref={tagListRef}
          >
            {tagList
              .slice(0, visibleCount ?? tagList.length)
              .map((tag, index) => (
                <StyledTagListItem key={index}>#{tag}</StyledTagListItem>
              ))
            }
            {hiddenCount > 0 && (
              <StyledTagListItem style={{
                fontWeight: "bold"
              }}>
                +{hiddenCount}
              </StyledTagListItem>
            )}
          </StyledTagList>

          {/* ✅ width 측정 전용 (절대 보이면 안 됨) */}
          <HiddenMoreTag ref={moreTagRef}>
            +99
          </HiddenMoreTag>
        </StyledTagListWrp> :
          <StyledNoneTagWrp>
            <StyledNoneTag>태그가 없습니다.</StyledNoneTag>
          </StyledNoneTagWrp>
        }
        
        <StyledTagInputWrp>
          <StyledTagInput 
            type="text"
            placeholder="#태그 추가"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagInputKeyDown}
            onBlur={handleTagInputBlur}
          >
          </StyledTagInput>
        </StyledTagInputWrp>
        
        <StyledVisibilitySelectTileWrp>
          <StyledVisibilitySelectTile>공개 설정</StyledVisibilitySelectTile>
        </StyledVisibilitySelectTileWrp>

        <StyledVisibilitySelectBtnListWrp>
          <StyledVisibilitySelectBtnList>
            <StyledVisibilitySelectBtn
              style={{
                backgroundColor: visibility === "PUBLIC" ? "#1FA6F4" : "",
                color: visibility === "PUBLIC" ? "white" : "",
              }}
              onClick={() => setVisibility("PUBLIC")}
            >
              전체 공개
            </StyledVisibilitySelectBtn>
            <StyledVisibilitySelectBtn
              style={{
                backgroundColor: visibility === "FOLLOWERS" ? "#1FA6F4" : "",
                color: visibility === "FOLLOWERS" ? "white" : "",
              }}
              onClick={() => setVisibility("FOLLOWERS")}
            >
              팔로워 공개
            </StyledVisibilitySelectBtn>
            <StyledVisibilitySelectBtn
              style={{
                backgroundColor: visibility === "PRIVATE" ? "#1FA6F4" : "",
                color: visibility === "PRIVATE" ? "white" : "",
              }}
              onClick={() => setVisibility("PRIVATE")}
            >
              나만 보기
            </StyledVisibilitySelectBtn>
          </StyledVisibilitySelectBtnList>
        </StyledVisibilitySelectBtnListWrp>

      </StyledBody>
      <StyledUploadBtn>
        <StyledUploadIcon src={uploadIcon} onClick={()=>{uploadFeed()}}/>
      </StyledUploadBtn>
      <Navbar />
    </Cnt>
  )
}

export default Upload;