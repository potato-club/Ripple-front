import styled from "styled-components";
import Navbar from "../../components/Navbar";
import uploadIcon from "../../assets/icons/upload.svg";
import { useEffect, useState } from "react";

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
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const StyledUploadImgPreview = styled.img`
  aspect-ratio: 1/1;
  flex-shrink: 0;
  width: 70%;
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

const Upload = () => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [isMultiple, setIsMultiple] = useState(true);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = isMultiple ? Array.from(files) : (files[0] ? [files[0]] : []);

    const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(imageUrls);
  };

  // 메모리 누수 방지
  useEffect(() => {
    return () => {
      if (previews) previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previews]);

  return (
    <Cnt>
      <StyledHeader>
        <StyledUploadIcon src={uploadIcon} />
        <StyledHeaderTtitle>업로드</StyledHeaderTtitle>
        <StyledToggle>
          <StyledCheckbox
            type="checkbox"
            checked={isMultiple}
            onChange={(e) => setIsMultiple(e.target.checked)}
          />
          다중 선택
        </StyledToggle>
      </StyledHeader>
      <StyledBody>
        <StyledUploadImgPreviewWrp style={{ justifyContent: isMultiple ? "flex-start" : "center" }}>
          {previews.map((src, index) => (
            <StyledUploadImgPreview
              key={index}
              src={src}
              alt={`preview-${index}`}
            />
          ))}
        </StyledUploadImgPreviewWrp>
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