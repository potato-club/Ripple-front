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

const StyledUploadImgPreview = styled.img`
  aspect-ratio: 1/1;
  width: 100%;
`;

const Upload = () => {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files) return;

  const imageUrls = Array.from(files).map((file) => 
    URL.createObjectURL(file)
  );
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
      </StyledHeader>
      <StyledBody>
        {previews.map((src, index) => (
          <StyledUploadImgPreview
            key={index}
            src={src}
            alt={`preview-${index}`}
          />
        ))}
      </StyledBody>
      <StyledUploadBtn>
        <input type="file" multiple id="file-input" onChange={handleFile} style={{ display: "none" }} />
        <label htmlFor="file-input">
          <StyledUploadIcon src={uploadIcon} />
        </label>
      </StyledUploadBtn>
      <Navbar />
    </Cnt>
  )
}

export default Upload;