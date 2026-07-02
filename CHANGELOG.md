# The Root — 업데이트 기록

> 관리자: Jennifer Minja Lee  
> 사이트: theroot-theta.vercel.app  
> 최종 업데이트: 2026-07-01

---

## v2.0 — 2026년 7월 (현재)

### 새로 만든 페이지

| 파일 | 내용 |
|------|------|
| `quiz.html` | 단계 진단 퀴즈 — Q1~Q4 분기, 7가지 결과, UWorld 어필리에이트 링크, sessionStorage로 index.html 스테이지 자동 선택 |
| `immigration.html` | 이민 허브 — EB-3 Visa Bulletin 체커, 그린카드/랜딩 체크리스트 (accordion), 카드 클릭 시 해당 탭으로 스크롤 |
| `clinical-quiz.html` | 임상 영어 퀴즈 — 96문제, 5개 카테고리(SBAR소통/Patient Teaching/약어&차팅/응급상황/환자슬랭), 복습 모드(localStorage), streak dots |
| `adapt-quiz.html` | 적응력 퀴즈 "나도 미국에 적응할 수 있을까?" — 10문항, 5가지 결과 유형, 점수 합산 알고리즘 |
| `events.html` | Career Stories 아카이브 — 다가오는 세션 + 지난 세션 |

### index.html 업데이트

- **스테이지 칩** (6단계): 학생 / 한국 간호사 / 비자 대기 / 랜딩 완료 / 첫 출근 / 성장 중
- **임상 영어 섹션** 추가 (VHE ~ Jennifer 사이) — 샘플 퀴즈 + clinical-quiz.html 링크
- **이벤트 팝업** 추가 — 접속 1.2초 후 자동 표시, "오늘 하루 보지 않기" 지원

### 이벤트

| 이벤트 | 날짜 | 스피커 | 신청 |
|--------|------|--------|------|
| Career Stories Vol.1 — Dream BIG, Practice Bigger | 2026-07-18 (미국) / 07-19 (한국) | Jooha Park (UCLA Health EP NP) | [Google Form](https://forms.gle/t8VV3WGMnoypFwcg8) |

---

## v1.0 — 초기 버전

- `index.html` 기본 구조 — 히어로, VHE(360° 병동 투어), Jennifer 섹션, Final CTA
- `hospital_360_v3.html` — 360° 가상 병동 투어

---

## 파일 구조

```
throotvhe/
├── index.html              # 메인 페이지
├── quiz.html               # 단계 진단 퀴즈
├── immigration.html        # 이민 허브
├── clinical-quiz.html      # 임상 영어 퀴즈
├── adapt-quiz.html         # 적응력 퀴즈
├── events.html             # Career Stories 아카이브
├── hospital_360_v3.html    # 360° 병동 투어
├── poster-event.jpg        # 이벤트 포스터 (팝업용) ← 직접 추가 필요
├── jennifer-headshot.JPG   # Jennifer 사진
├── cardnews_theroot.html   # 인스타 카드뉴스 (The Root 전체)
├── cardnews_clinical.html  # 인스타 카드뉴스 (임상영어)
└── CHANGELOG.md            # 이 파일
```

---

## 다음 할 일 (아이디어)

- [ ] Career Stories Vol.1 종료 후 → events.html 지난 세션으로 이동
- [ ] 팝업 이벤트 교체 (다음 이벤트 시)
- [ ] 코호트 등록 페이지 별도 제작
- [ ] Jennifer YouTube/Substack 콘텐츠 연동
