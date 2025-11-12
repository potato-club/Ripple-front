import { useState } from "react";
import styled from "styled-components";

const StyledCnt = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
`;
const StyledName = styled.div``;
const StyledToggleInput = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;
const StyledToggleBg = styled.label`
  margin-left: auto;
  background-color: #5f5f5f;
  width: 65px;
  border-radius: 999px;
  padding: 4px;
  &.active {
    background-color: #818181;
  }
`;
const StyledToggleThumb = styled.div`
  background-color: #9e9e9e;
  border-radius: 999px;
  width: 50%;
  aspect-ratio: 1 / 1;
  transition: all 0.2s ease-in-out;
  position: relative;
  left: 0;
  &.active {
    background-color: #29e004;
    left: 50%;
  }
`;

export function ToggleOption({
  name,
  onChange,
  checked,
}: {
  name: string;
  onChange?: (checked: boolean) => any;
  checked: boolean;
}) {
  const [checkedState, setCheckedState] = useState<boolean>(checked);
  return (
    <StyledCnt>
      <StyledName>{name}</StyledName>

      <StyledToggleBg className={checkedState ? "active" : ""}>
        <StyledToggleInput
          checked={checkedState}
          onChange={() => {
            onChange?.(!checkedState);
            setCheckedState(!checkedState);
          }}
        />
        <StyledToggleThumb className={checkedState ? "active" : ""} />
      </StyledToggleBg>
    </StyledCnt>
  );
}
