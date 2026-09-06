# UIS Korea site-specific operating notes

## Consultation / conversion
- All user-visible admission/contact CTAs route to **TNS유학 · ㈜티앤에스월드와이드**, not UIS Korea direct contact.
- Primary Kakao consultation: https://open.kakao.com/o/slehLvKi
- Primary office phone: 02-3288-1733 (company listing 02-3288-1733~5); mobile: 010-5150-0105.
- Email: tns@tnsuhak.com.
- Company information and Seoul/Busan office addresses should appear on contact surfaces.
- User-visible CTA wording should say **TNS유학** or **무료 상담**, not `한국센터 상담`.
- School contact details may remain in structured data or factual source context when needed, but are not the primary conversion path.
- Application documents and inquiry flow should be described as going through TNS consultation/support rather than sending users directly to UIS Korea or the school.
- Official UIS social/news source links may remain where needed for factual verification; they must not replace TNS as the consultation path.

## Homepage special-program presentation
- The homepage `특별 프로그램` section should feature **B2 부티크 프로그램 only**.
- Do not restore Pathway, Immersion, ESL/UHUB tabs to the homepage unless the user explicitly changes this policy.
- The homepage B2 summary should link to `/b2-boutique-program.html` for the detailed programme explanation.
- The detailed B2 page should keep current official schedule facts source-backed and should clearly label package pricing by the applicable year because B2 package fees may change.

## B2 accommodation operating rule
- For B2 students who need accommodation, the first recommended options are **Premium Homestay** or **UIS Regular Residence**.
- These recommended B2 options allow a **single room**.
- **UIS Regular Residence** is a homestay-type residence that accepts UIS students only.
- **Main Residence is not the default B2 accommodation.** It is a 2-person room option that may be requested when the student/parent prefers it.
- When Main Residence is requested, UIS can prioritize the allocation request, but actual move-in depends on vacancy and the student may need to wait.
- On user-visible B2 pricing, translate `With Boarding` as **숙소 포함**, not `기숙 포함`, because the standard B2 accommodation is not necessarily Main Residence.
- Do not invent separate B2 package prices by accommodation type unless UIS provides an explicit current price table.
- Current 2026 B2 package figures remain CAD 63,000 with accommodation and CAD 51,000 without accommodation; later intakes must reconfirm current pricing.

## Homepage navigation / sitemap menu
- The persistent homepage top navigation is for **same-page section jumps** only: 학교 소개, 진학 성과, 학사 과정, 특별 프로그램, 학생 관리, 학비·숙소, 입학 절차.
- Do not place the primary consultation CTA in the top navigation; consultation remains in the body and bottom/floating CTA surfaces.
- The right-side `전체 메뉴` is a **site-map style hierarchy**, not an unrelated re-categorization of pages.
- Sitemap groups should mirror the homepage topics. Each group heading links back to the matching homepage section, and directly related detail pages are listed underneath.
- Current mappings: 학교 소개 → 학생 이야기/동아리·학생 활동/UIS 학교 영상 모음/UIS 학생 후기 영상 모음; 진학 성과 → 2025/2026 결과; 특별 프로그램 → B2; 학생 관리 → 학부모 소통/Edsembli/숙소 QC; 학비·숙소 → 숙소 상세; 최신 소식 → 뉴스 아카이브.
- Monthly news article links belong inside the news archive and should not be individually expanded in the global sitemap menu.
- 학사 과정 and 입학 절차 currently have no dedicated detail page, so keep only the homepage section link rather than inventing a weakly related subpage.
- As new detail pages are added, place them under the homepage topic they extend so the relationship remains obvious to users.

## Homepage fee presentation
- The homepage `학비·숙소` section should show the **2027 fee schedule only** while 2027 is the target intake year.
- Do not restore a separate `2026년(현행)` tab or the `국가별 비교` tab unless the user explicitly requests them again.
- Label the main tuition tab simply **`2027년`**, not `2027년 (12/1부터)`.
- Keep a separate `숙소비` tab, but show the 2027 accommodation rates only rather than a 2026-vs-2027 comparison.
- Older fee schedules may remain in repository history/source material for internal reference, but should not occupy homepage space.

## Video presentation
- The homepage `영상으로 보기` section should feature the **TNS UIS on-site visit video** (`_TQOHyJ9E4o`) as the single primary embedded video.
- The featured school video must play **inline on the UIS page** via an embedded YouTube player rather than sending the user to YouTube.
- The homepage school-video CTA wording is **`UIS 학교 영상 모음`** and links to `/videos.html`.
- `/videos.html` is the broad UIS video library. School/campus, residence and accommodation, general student life, middle school, programmes, student care, parent communication, graduation/Prom and similar non-admission videos belong here.
- Avoid duplicate embeds within `/videos.html`; if a video already exists in the appropriate section, keep the existing card rather than adding another copy.
- The homepage `학생 이야기` section should feature a **Korean-student testimonial video** as the single primary inline video instead of long testimonial-card grids.
- The student-story CTA wording is **`UIS 학생 후기 영상 모음`** and links to `/student-videos.html`.
- `/student-videos.html` is intentionally narrow. Keep only the user-selected **1:1 student interview** and **university admission/scholarship outcome** videos; residence-only, general school-life, programme, event and other videos belong on `/videos.html`.
- `/student-videos.html` must always place the **해대쉽 video first**. Current top video: `uOiiWw4qEIk`.
- Current student-testimonial set and order to preserve unless the user changes it: `uOiiWw4qEIk` → `5pfXyfCMVP4` → `XxVtMjgRL6M` → `BNChwQMLOxg`.
- `YAEim0A_xo8` belongs on `/videos.html`, not on `/student-videos.html`.
- `/student-videos.html` should stay compact: no repeated section headings or introductory paragraphs between groups of videos. Each video card may keep a **short Korean title plus 1–2 lines of useful context** such as who the student is or notable university admission/scholarship results.
- Translate user-visible English video titles into natural Korean. Keep official acronyms such as RVC only when useful, with the Korean institution name alongside them.
- `/edsembli-parent-portal.html` should embed the Edsembli video `eLHE7Np1Wks` inline on the page.
- Use `youtube-nocookie.com` embed URLs and `loading="lazy"` for non-featured videos to reduce unnecessary loading while preserving inline playback.

## User-visible source policy
- General UIS guide/detail pages should **not display `자료 출처`, `출처:` or source-link boxes by default**.
- Facts should still be verified against official/current materials during editing, but source references are kept in the working context/repository rather than automatically shown to users.
- Add a visible source only when the user explicitly asks for it or when a page-specific policy requires it.
- **News articles are the exception:** keep the official original/source link on news content as required by the project news policy.

## Korean editorial voice
- 본문은 UIS 한국어 안내페이지에서 직접 설명하는 1인칭 기관형 문체를 사용한다.
- `UIS가 공개한`, `UIS 자료에 따르면`, `UIS가 말하기를`, `뉴스레터를 바탕으로 정리했다`처럼 제3자가 UIS를 설명하는 출처 귀속 문장은 피한다.
- 사실은 본문에서 바로 설명하고, 일반 안내 페이지에는 출처 박스를 기본 노출하지 않는다. 뉴스 기사만 원문 출처를 유지한다.
- 실제 학교 소유 공식 도메인으로 오해할 수 있는 `UIS 공식 한국 홈페이지` 표기는 사용하지 않고 `UIS 한국어 안내`를 사용한다.
