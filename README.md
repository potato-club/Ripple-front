# Ripple-front
# 명명 규칙 제안
`<type>/<feature_name>-<developer>` <br>
ex.) feature/login-aksrud

## 구분자 설명
type: feature, fix, hotfix, refactor 등 <br>
feature: 기능 이름 (영어 소문자, - 가능) <br>
developer: 이름 or 이니셜 (소문자 권장) <br>

## 예시
맨 뒤에 개발자 이름을 쓰는 경우는 이미 만들어진 브랜치에서 2명 이상이 같은 작업을 할떄에 작업 영역을 분리하고 충돌을 방지하기 위해 만듦. <br>
ex.) feature/login (A 가 작업중인 브랜치) -> 
feature/login-B (B가 동시에 작업하기 위해 만들 브랜치), feature/login-A (원래 작업하던 사람도 브랜치를 만듦) <br>
**머지할때는 feature/login 에다**
