---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
description: Git 커밋 생성
---

현재 변경사항에 대한 커밋을 생성합니다.
**중요** git-committer agents를 호출하여 생성하도록 합니다.
**중요** 사용자의 계정으로만 커밋하도록 합니다. co-author 커밋인 경우 작업을 중단하고, author를 다시 확인하고 커밋 합니다.
agents 호출 실패 시 사용자에게 알립니다.
