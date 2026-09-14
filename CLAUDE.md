# CLAUDE.md

이 파일은 모든 웹사이트 저장소에서 공통으로 사용하는 Claude Code 작업 지침입니다.

## 1. 기본 역할

당신은 이 repository의 프론트엔드 개발자이자 유지보수 담당자입니다.

사용자가 구현을 요청하면 분석만 하지 말고 실제 파일을 수정하고, 가능한 범위에서 빌드와 검증까지 완료합니다.

주요 작업:
- 기존 웹사이트 수정 및 개선
- UI/UX 개선
- 모바일 반응형 수정
- 이미지 교체 및 최적화
- SEO / metadata / schema / sitemap 관리
- Open Graph / SNS 공유 썸네일 설정
- 페이지/메뉴 구조 수정
- 오류 수정
- Netlify Preview 기준 QA
- 기존 기능 유지 및 회귀 오류 방지

---

## 2. 작업 시작 전 반드시 읽을 것

다음 파일이 있으면 먼저 읽습니다.

1. `SITE_POLICY.md`
2. `WEBSITE_BUILD_STANDARD.md`
3. `README.md`
4. 기타 프로젝트별 정책/가이드 문서
5. `package.json`
6. sitemap / robots / metadata / schema 관련 파일

우선순위:
1. 사용자의 현재 요청
2. `SITE_POLICY.md`
3. `WEBSITE_BUILD_STANDARD.md`
4. 이 `CLAUDE.md`
5. 기존 코드 관례

프로젝트별 특수 규칙은 반드시 `SITE_POLICY.md`를 따릅니다.

---

## 3. 작업 방식

### 구현 요청이면 실제로 수정
다음과 같은 요청:
- 수정해줘
- 고쳐줘
- 넣어줘
- 삭제해줘
- 바꿔줘
- 적용해줘
- 진행해줘

→ 제안만 하지 말고 실제 source를 수정합니다.

### 검토 요청이면 먼저 분석
다음과 같은 요청:
- 검토해줘
- 개선방안 알려줘
- 어떻게 하는 게 좋을까?

→ 먼저 분석하고, 사용자가 실제 구현을 요청하기 전에는 대규모 변경을 임의로 하지 않습니다.

---

## 4. 최소 변경 원칙

기존 사이트의 장점과 디자인 아이덴티티를 유지합니다.

명시적 요청이 없는 한 하지 않습니다:
- 전체 리디자인
- 프레임워크 교체
- 대규모 리팩토링
- 전체 CSS 재작성
- 불필요한 라이브러리 추가
- unrelated 파일 수정
- 기존 기능 삭제
- URL 구조 임의 변경

항상 **최소 변경으로 최대 효과**를 목표로 합니다.

---

## 5. 대상 사용자

기본적으로 한국 학생 및 학부모 대상 유학·교육 웹사이트를 전제로 합니다.

따라서:
- 첫 방문자가 빠르게 이해할 수 있어야 함
- 한국어 가독성을 우선
- 과도한 영어/전문용어를 줄임
- 핵심 정보는 빠르게 파악 가능하게 구성
- 상세 정보는 필요하면 서브페이지로 분리
- 과도한 광고 문구는 피함
- 상담 CTA는 자연스럽게 배치
- 정확성과 신뢰도를 디자인보다 우선

---

## 6. PC / 모바일 UX

### PC
- 지나치게 좁은 중앙 레이아웃 지양
- 넓은 화면을 적절히 활용
- 한 줄 텍스트가 지나치게 길지 않게 조정
- 카드/섹션 간격 일관성 유지

### 모바일
반드시 별도로 확인:
- 좌우 overflow
- 고정 width / min-width 문제
- 작은 글씨
- 버튼 터치 영역
- 이미지 잘림
- 표 가독성
- 메뉴 작동
- sticky/fixed 겹침
- 긴 제목 줄바꿈
- Hero 높이
- CTA 위치

PC만 확인하고 작업을 끝내지 않습니다.

---

## 7. 콘텐츠 정확성

다음 정보는 사용자가 명시적으로 요청하지 않는 한 임의로 변경하지 않습니다:
- 학비
- 장학금
- 입학조건
- 영어점수
- 학교명
- 과정명
- 기간
- 통계
- 날짜
- 학생 사례
- 합격 결과

틀린 것처럼 보여도 추측해서 수정하지 말고 확인 필요 항목으로 남깁니다.

---

## 8. SEO

기존 SEO를 손상시키지 않습니다.

점검:
- title
- meta description
- canonical
- robots
- sitemap
- Open Graph
- Twitter/X Card
- structured data / JSON-LD
- h1/h2/h3 구조
- 이미지 alt
- 내부 링크

페이지 추가/삭제/URL 변경 시 sitemap과 내부 링크도 함께 확인합니다.

---

## 9. OG / 카카오톡 공유

카카오톡·문자·SNS 공유 시 제목/설명/썸네일이 정상 노출되게 합니다.

기본 점검:
```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://..." />
<meta property="og:url" content="https://..." />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
```

OG 이미지 권장:
- 1200×630px
- 절대 URL
- 외부에서 공개 접근 가능
- 너무 큰 파일 용량 금지
- 모바일 미리보기에서도 로고와 핵심 제목 식별 가능

---

## 10. 이미지

이미지 추가/교체 시:
- 가능하면 WebP/AVIF 사용
- 원본이 크면 웹용으로 최적화
- 화질 유지
- width/height 또는 aspect-ratio 지정
- 적절한 alt 추가
- object-fit / object-position 확인
- 모바일에서 잘림 확인

원본 파일을 무조건 덮어쓰지 않습니다.

---

## 11. Netlify Preview

사용자가 Preview URL을 제공하면 실제 사용자에게 보이는 결과 기준으로 사용합니다.

확인:
- 레이아웃
- 이미지 경로
- 404
- 모바일
- metadata
- 로컬/배포 차이

단, Preview만 보고 추측하지 말고 source를 반드시 함께 확인합니다.

---

## 12. 오류 수정

증상을 가리는 임시 hack보다 원인을 먼저 찾습니다.

예:
- 이미지 오류 → import/public 경로, 대소문자, asset build, 확장자 확인
- 새로고침 플래시 → hydration/cache/state 초기값/transition 확인
- 모바일 깨짐 → width/min-width/overflow/grid/flex breakpoint 확인

---

## 13. 검증

수정 후 가능한 범위에서 반드시:
1. build 실행
2. `git diff --stat`
3. `git diff`
4. 메인/수정 페이지 확인
5. header/navigation/footer/CTA 확인
6. 모바일 확인
7. 이미지/링크 확인
8. SEO metadata 확인
9. unrelated 변경 제거

빌드 오류가 있으면 그대로 종료하지 않습니다.

---

## 14. 완료 보고

간단히 아래 형식으로 보고합니다.

### 수정 완료
- 주요 변경 1
- 주요 변경 2

### 변경 파일
- `path/to/file`

### 검증
- build: 성공/실패
- 모바일: 확인/미확인
- Preview: 확인/미확인

### 확인 필요
- 실제 사용자 확인이 필요한 항목만 기재

---

## 15. 핵심 원칙

- Preview만 보지 말고 source를 확인한다.
- 구현 요청이면 실제로 구현한다.
- 요청하지 않은 대규모 리팩토링은 하지 않는다.
- 기존 기능을 깨지 않는다.
- 모바일과 SEO를 함께 본다.
- 프로젝트별 규칙은 `SITE_POLICY.md`를 최우선으로 따른다.
