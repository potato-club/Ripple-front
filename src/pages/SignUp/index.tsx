import { useState } from "react";
import styled from "styled-components";
import type {FormValues, EmailStatus} from "../../types/SignUpFormErrInterfaces";
import { useForm } from "react-hook-form";

const StyledCnt = styled.form`
  width: 80%;
  margin: 0 auto;
  padding-top: 10%;
  text-align: center;
  font-size: 16px;
`;

const StyledTitle = styled.h1`
  font-size: 34px;
  margin-bottom: 10%;
`;

const StyledFieldWrapper = styled.div`
  margin-bottom: 60px;
`;
const StyledFieldLabel = styled.h2`
  font-size: 12px;
  color: gray;
  opacity: 0.8;
  text-align: left;
  padding-left: 8px;
  padding-bottom: 4px;
  padding-top: 4px;
`;
const StyledField = styled.input`
  flex: 7;
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

const StyledBtn = styled.button`
  margin: 0;
  border: none;
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 1rem;
  padding: 12px 16px;
  border-radius: 8px;
  background: #B0B0B0;
  color: #ffffff;
  &>input{
    width: 50%;
  }
  &:active{
   color: #C0C0C0;
  }
`;

const StyledFieldAndBtnWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  gap: 6px;
`;

const StyledErrMsg = styled.p`
  font-size: 12px;
  color: red;
  text-align: left;
  margin-bottom: 10px;
`;

const StyledSuccessAndNoticeMsg = styled.p`
  font-size: 12px;
  color: cornflowerblue;
  text-align: left;
  margin-bottom: 10px;
`;

const StyledSignUpBtn = styled.button`
  width: 100%;
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 16px;
`;

const StyledTimer = styled.text`
  font-size: 12px;
  font-weight: bold;
  color: cornflowerblue;
  text-align: left;
  margin-bottom: 10px;
  padding: 12px 0;
`;



const SignUp = () => {
  const {register, handleSubmit, watch, setError, clearErrors, formState: {errors}} = useForm<FormValues>({mode:"onChange"});

  const onSubmit = (data:any) => {
    console.log(data); 
  };

  const [emailStatus, setEmailStatus] = useState<EmailStatus>({
    sent: false,
    verified: false,
    timerOn: false
  });

  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

  const sendVerificationEmail = (email: string) => {

    /* api 요청중 ... */

    let emailDuplicated = false
    if(!emailDuplicated) {
      setEmailStatus((prev) => ({ ...prev, 
        sent: true, // 이메일 인증 코드 보냄
        verified: false, // 다른 이메일로 인증할시 전에 한 인증 취소
        timerOn: true // 인증 타이머 온
      }));
      
      clearErrors("email");
    } else {
      setEmailStatus((prev) => ({ ...prev, 
        sent: false,
        timerOn: false
      }));

      setError("email", {
        type: "manual",
        message: "이메일이 이미 사용중입니다."
      })
    }
  }

  const verifyCertificationCode = (CertifyCode: string) => {

    /* 인증 번호 확인 작업... */
    const isCorrect = true;
    if (isCorrect) {
      setEmailStatus((prev) => ({ ...prev, 
        sent: false,
        verified: true,
        timerOn: false
      }));

      clearErrors("certifyCode");
    } else {
      setError("certifyCode", {
        type: "manual",
        message: "인증 번호가 일치하지 않습니다.",
      });
    }
  }

  const checkIdDuplicate = (id:string) => {
    let isIdDuplicated = false;

    if (isIdDuplicated) {
      setError("id", {
        type: "manual",
        message: "이미 사용 중인 아이디입니다."
      });
    } else {
      clearErrors("id");
      setIsUsernameAvailable(true);
    }
  }

  return (
    <StyledCnt onSubmit={handleSubmit(onSubmit)}>
      <StyledTitle>회원가입</StyledTitle>

      <StyledFieldWrapper>
        <StyledFieldLabel>이메일</StyledFieldLabel>
        <StyledFieldAndBtnWrapper>
          <StyledField 
          placeholder="이메일을 입력하세요" type="email" 
          {...register("email", {
            required: "이메일은 필수입니다.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "이메일 형식이 올바르지 않습니다.",
            },
          })}
          ></StyledField>
          <StyledBtn type="button" onClick={()=>{sendVerificationEmail(watch("email"))}}>인증</StyledBtn>
        </StyledFieldAndBtnWrapper>
        { 
          errors.email ?
          <StyledErrMsg style={{visibility: errors.email ? "visible" : "hidden"}}>{errors.email?.message}</StyledErrMsg>:
          <StyledSuccessAndNoticeMsg style={{visibility: emailStatus.sent ? "visible" : "hidden"}}>이메일로 인증코드를 보냈습니다.</StyledSuccessAndNoticeMsg>
        }


        <StyledFieldLabel>인증번호</StyledFieldLabel>
        <StyledFieldAndBtnWrapper>
          <StyledField placeholder="인증번호를 입력하세요" type="text" 
          {...register("certifyCode", {
            required: "이메일 인증은 필수 입니다.",
          })}
          disabled={!emailStatus.sent}></StyledField>
          {emailStatus.timerOn?<StyledTimer>5:00</StyledTimer>:null}
          <StyledBtn type="button" disabled={!emailStatus.sent} onClick={()=>{verifyCertificationCode(watch("certifyCode"))}}>확인</StyledBtn>
        </StyledFieldAndBtnWrapper>
        {
          errors.certifyCode ?
          <StyledErrMsg style={{visibility: errors.certifyCode ? "visible" : "hidden"}}>{errors.certifyCode?.message}</StyledErrMsg>:
          <StyledSuccessAndNoticeMsg style={{visibility: emailStatus.verified ? "visible" : "hidden"}}>인증되었습니다.</StyledSuccessAndNoticeMsg>
        }

        <StyledFieldLabel>아이디</StyledFieldLabel>
        <StyledFieldAndBtnWrapper>
          <StyledField placeholder="아이디를 입력하세요" type="text" 
          {...register("id", {
            required: "아이디 입력은 필수입니다.",
            maxLength: {value: 12, message: "최대 12글자 이하여야 합니다."},
            validate: {
              hasNoSpecialChar: (value) => /^[a-zA-Z0-9]*$/.test(value) || "특수문자는 사용하실 수 없습니다.",
            }
          })}
          ></StyledField>
          <StyledBtn type="button" onClick={()=>{checkIdDuplicate(watch("id"))}}>중복 확인</StyledBtn>
        </StyledFieldAndBtnWrapper>
        {
          errors.id ?
          <StyledErrMsg style={{visibility: errors.id ? "visible" : "hidden"}}>{errors.id?.message}</StyledErrMsg>:
          <StyledSuccessAndNoticeMsg style={{visibility: isUsernameAvailable ? "visible" : "hidden"}}>이 아이디는 사용 가능합니다.</StyledSuccessAndNoticeMsg>
        }


        <StyledFieldLabel>비밀번호</StyledFieldLabel>
        <StyledField placeholder="비밀번호를 입력하세요" type="password"
        {...register("pw", {
            required: "비밀번호 입력은 필수입니다.",
            minLength: {value: 8, message: "최소 8글자 이상이여야 합니다."},
            validate: {
              duplicateEmail: (value) => /\d/.test(value) || "숫자를 포함해야 합니다.",
              hasSpecialChar: (value) => /[!@#$%^&*]/.test(value) || "특수문자를 포함해야 합니다.",
            }
          })}
        ></StyledField>
        <StyledErrMsg style={{visibility: errors.pw ? "visible" : "hidden"}}>{errors.pw?.message || 'dummy text'}</StyledErrMsg>


        <StyledFieldLabel>비밀번호 확인</StyledFieldLabel>
        <StyledField placeholder="비밀번호를 입력하세요" type="password" 
        {...register("pwCheck", {
            required: "비밀번호 확인은 필수입니다.",
            validate: {
              correctPw: (value) => value === watch("pw") || "비밀번호가 일치하지 않습니다.",
            }
          })}
          ></StyledField>
        <StyledErrMsg style={{visibility: errors.pwCheck ? "visible" : "hidden"}}>{errors.pwCheck?.message || 'dummy text'} </StyledErrMsg>
      </StyledFieldWrapper>


      <StyledSignUpBtn type="submit">회원가입</StyledSignUpBtn>
    </StyledCnt>
  );
};

export default SignUp;