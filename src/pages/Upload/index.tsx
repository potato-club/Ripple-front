import styled from "styled-components";
import Navbar from "../../components/Navbar";
import uploadimg from "../../assets/icons/upload.svg";

const Cnt = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #222;
  height: 100vh;
  width: 100%;
`;

const StyledHeader = styled.div`
  flex-shrink: 0;
  height: 80px;
  color: white;
  display: flex;
  align-items: center;
  padding: 24px;
`;

const StyledUploadImg = styled.img`
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

const Upload = () => {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  console.log(file);
  console.log(file.type); // image/png, video/mp4
};

  return (
    <Cnt>
      <StyledHeader>
        <StyledUploadImg src={uploadimg} />
        <StyledHeaderTtitle>업로드</StyledHeaderTtitle>
      </StyledHeader>
      <StyledBody>
        aaaa
      </StyledBody>
      <StyledUploadBtn>
        <input type="file" id="file-input" onChange={handleFile} style={{ display: "none" }} />
        <label htmlFor="file-input">
          <StyledUploadImg src={uploadimg} />
        </label>
      </StyledUploadBtn>
      <Navbar />
    </Cnt>
  )
}

export default Upload;