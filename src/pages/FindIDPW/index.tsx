import styled from "styled-components";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";

const StyledCnt = styled.form`
  width: 80%;
  margin: 0 auto;
  padding-top: 30%;
  text-align: center;
  font-size: 16px;
`;
const StyledToggleTapMenu = styled.div`
  border-radius: 5px;
  background-color: #F0F0F0;
  display: flex;
`;
const StyledToggleTapMenuSelected = styled.div<{active: boolean}>`
  width: 50%;
  margin: 5px;
  border-radius: 5px;
  background-color: ${(props) => (props.active ? "#FFFFFF" : "transparent")};
`;
const StyledTitle = styled.h1`
  text-align: left;
  font-size: 34px;
  margin-top: 64px;
  margin-bottom: 48px;
`;
const StyledFieldWrapper = styled.div`
  margin-bottom: 64px;
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
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: gray;
    opacity: 0.4;
    padding-left: 8px;
  }
`;
const StyledSubmitBtn = styled.button`
  width: 100%;
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 16px;
`;
const StyledErrMsg = styled.p`
  font-size: 12px;
  color: red;
  text-align: left;
`;
const StyledSuccessMsg = styled.p`
  font-size: 12px;
  color: cornflowerblue;
  text-align: left;
  margin-bottom: 10px;
`;
const StyledReSubmit = styled.p`
  font-size: 12px;
  color: gray;
  &>button{
    background: none;
    border: none;
    padding: 0;
    text-decoration: underline;
    cursor: pointer;
    font: inherit;
  }
`;
interface FindFormValue {
  email: string;
}

const FindIDPW = () => {

  // 쿼리 파라미터 사용
  const location = useLocation();
  const [currentTap, setCurrentTap] = useState<string>(location.state?.seletedTap ?? "id"); // 테스트용 임시 문자열

  const {register, handleSubmit, watch, formState: {errors}} = useForm<FindFormValue>({mode:"onBlur"});

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // 유효성 검사를 기준으로 호춛되는 함수들
  const onValid = (data:any) => {
    /* 이메일에 보내는 처리 */
    const isProcessSuccess = true;
    if (isProcessSuccess) {
      setIsSuccess(true);
    }
    else {
      setIsSuccess(false);
    }
  };
  const onInValid = (errors:any) => {
    setIsSuccess(false);
  }

  // 이메일 필드 감시
  const emailValue = watch("email");

  useEffect(() => {
    // 전송 버튼을 누른뒤 필드 값이 바뀌면 성공 메시지 안뜨게 하기
    if (isSuccess) {
      setIsSuccess(false);
    }
  }, [emailValue]);

  return (
    <StyledCnt onSubmit={handleSubmit(onValid, onInValid)}>
        <StyledToggleTapMenu>
            <StyledToggleTapMenuSelected active={currentTap === "id"} onClick={()=>{setCurrentTap("id")}}>
                <span>아이디 찾기</span>
            </StyledToggleTapMenuSelected>
            <StyledToggleTapMenuSelected active={currentTap === "pw"} onClick={()=>{setCurrentTap("pw")}}>
                <span>비밀번호 찾기</span>
            </StyledToggleTapMenuSelected>
        </StyledToggleTapMenu>

        <StyledTitle>{currentTap === "id" ? "아이디 찾기":"비밀번호 변경"}</StyledTitle>
        <StyledFieldWrapper>
          <StyledFieldLabel>이메일</StyledFieldLabel>
          <StyledField placeholder="이메일을 입력하세요" type="text" 
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "이메일 형식이 올바르지 않습니다.",
            },
          })}></StyledField>
          <StyledErrMsg style={{visibility: errors.email ? "visible" : "hidden"}}>{errors.email?.message || 'dummy text'}</StyledErrMsg>
        </StyledFieldWrapper>

        <StyledSubmitBtn type="submit">{currentTap === "id" ? "아이디 찾기":"비밀번호 변경"}</StyledSubmitBtn>
        {
          isSuccess ?
          <>
            <StyledSuccessMsg>{currentTap === "id" ? "해당 이메일로 아이디를 전송하였습니다." : "해당 이메일로 비밀번호 변경 링크를 전송하였습니다."}</StyledSuccessMsg>
            <StyledReSubmit>이메일을 받지 못하셨다면 <button type="submit">여기</button>를 클릭해주세요.</StyledReSubmit>
          </>
          : null
        }
    </StyledCnt>
  );
};

export default FindIDPW;
