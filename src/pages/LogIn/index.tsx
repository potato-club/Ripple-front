import styled from "styled-components";
import googleIcon from "../../assets/icons/web_neutral_rd_na@2x.png";
import { useState } from "react";
import type { FormValues } from "../../types/LoginFormInterface";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../stores/useAuthStore";
import { useNavigate } from "react-router";

const StyledCnt = styled.form`
  width: 80%;
  margin: 0 auto;
  padding-top: 30%;
  text-align: center;
  font-size: 16px;
`;
const StyledTitle = styled.h1`
  font-size: 34px;
  margin-bottom: 10%;
`;
const StyledFieldWrapper = styled.div`
  margin-bottom: 20px;
`;
const StyledFieldLabel = styled.h2`
  font-size: 12px;
  color: gray;
  opacity: 0.8;
  text-align: left;
  padding-left: 8px;
  padding-bottom: 4px;
`;
const StyledField = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  background-color: #dddddd;
  padding: 10px 0;
  padding-left: 8px;
  margin-bottom: 20px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: gray;
    opacity: 0.4;
    padding-left: 8px;
  }
`;
const StyledErrMsg = styled.p`
  font-size: 12px;
  color: red;
  text-align: left;
  margin-bottom: 10px;
`;
const StyledLoginBtn = styled.button`
  width: 100%;
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 16px;
`;
const StyledShortcutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
`;
const StyledShortcut = styled.div`
  width: 70px; // 일시적으로 공간 만들어둠.
  font-size: 12px;
  color: inherit;
  text-decoration: none;
  &:visited {
    color: inherit;
  }
`;
const StyledShortcutSeparator = styled.span`
  width: 2px;
  height: 32px;
  background-color: #d6d6d6;
`;
const StyledOr = styled.div`
  margin-bottom: 24px;
`;
const StyledSigninWithGoogleAccount = styled.div`
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 6px;
  padding: 8px 10px;
  border-radius: 8px;
  width: 80%;
  margin: auto;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.17);
  & > img {
    width: 19px;
    height: 19px;
  }
`;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange" });

  const logIn = useAuthStore((state) => state.logIn);

  const onSubmit = async (data: FormValues) => {
    const res = await logIn(data.id, data.pw);
    if (res.ok) {
      setIsLoginErr(false);
      navigate("/");
      console.log(errors); // 이거 쓰긴 써야함
    } else {
      setIsLoginErr(true);
    }
  };

  const [isLoginErr, setIsLoginErr] = useState<boolean>(false);

  const navigate = useNavigate();
  return (
    <StyledCnt onSubmit={handleSubmit(onSubmit)}>
      <StyledTitle>로그인</StyledTitle>

      <StyledFieldWrapper>
        <StyledFieldLabel>아이디</StyledFieldLabel>
        <StyledField
          placeholder="아이디를 입력하세요"
          type="text"
          {...register("id", {
            required: "아이디 입력은 필수입니다.",
          })}
        />

        <StyledFieldLabel>비밀번호</StyledFieldLabel>
        <StyledField
          placeholder="비밀번호를 입력하세요"
          type="password"
          {...register("pw", {
            required: "비밀번호 입력은 필수입니다.",
          })}
        />
      </StyledFieldWrapper>
        <StyledErrMsg style={{visibility: isLoginErr ? "visible" : "hidden"}}>아이디 혹은 비밀번호가 일치하지 않습니다.</StyledErrMsg>
      <StyledLoginBtn type="submit">로그인</StyledLoginBtn>

      <StyledShortcutWrapper>
        <StyledShortcut onClick={()=>{navigate("/findIDPW", {state:{seletedTap: "id"}})}}>아이디 찾기</StyledShortcut>
        <StyledShortcutSeparator />
        <StyledShortcut onClick={()=>{navigate("/findIDPW", {state:{seletedTap: "pw"}})}}>비밀번호 찾기</StyledShortcut>
        <StyledShortcutSeparator />
        <StyledShortcut onClick={()=>{navigate("/signup")}}>회원가입</StyledShortcut>
      </StyledShortcutWrapper>

      <StyledOr>OR</StyledOr>

      <StyledSigninWithGoogleAccount>
        <img src={googleIcon} alt="" />
        <span>구글 계정으로 로그인</span>
      </StyledSigninWithGoogleAccount>
    </StyledCnt>
  );
};

export default Login;
