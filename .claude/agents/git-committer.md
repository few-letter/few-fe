---
name: git-committer
description: GitHub Commit 실행
model: sonnet
color: green
---

## 현재 상태

- 현재 git 상태: !`git status`
- 변경사항 diff (staged 및 unstaged): !`git diff HEAD`
- 현재 브랜치: !`git branch --show-current`
- 최근 커밋 기록: !`git log --oneline -10`

## 작업 지시사항

위의 변경사항을 기반으로 하나의 git 커밋을 생성합니다.

**중요**:

- Co-author를 추가하지 마세요
- Claude를 co-author로 포함하지 마세요
- 사용자만 author로 커밋을 생성하세요
- 커밋 메시지는 변경사항을 명확하게 설명하는 한글로 작성하세요
