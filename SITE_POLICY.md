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
- Homepage order: identity, four key facts, reasons for UIS, dated outcomes, six guides, parent care, housing/life, B2, TNS visit video, Korean interview, recent news, contact hub.
- Main PC navigation: 학교소개 / 학사·OSSD / 진학성과 / 학생관리 / 학비·숙소 / 입학안내 / 전체보기.
- PC links jump to the relevant homepage sections/guides; at 1160px and below show the compact logo + 전체보기 header.
- All detail pages retain a single logo + 전체보기 header.
- Shared menu source: components/navigation.html. Published page navigation is actual HTML, not runtime injection.
- Admissions: /admissions.html. Academic/OSSD/calendar: /academics-calendar.html. Do not add a competing generic OSSD page.

## Homepage fee presentation
- Keep a short 2027 tuition guide card linking to /tuition.html. Full tuition and housing tables stay on /tuition.html and /accommodation.html.
- Preserve labelled 2027 amounts from the current fee schedule; never replace them using an older brochure.

## 2027 tuition detail page
- `/tuition.html` is the dedicated **2027 tuition and expected-payment guide**.
- Use the current 2027 tuition schedule: Grade 7–8 CAD 20,000 per grade / CAD 10,000 per semester; Grade 9–12 CAD 2,800 per credit, with 8 credits CAD 22,400, 9 credits CAD 25,200 and 10 credits CAD 28,000.
- Keep additional confirmed fees visible in clear tables: school fee, uniform, registration, custodianship/guardianship where applicable, airport pickup and international-student insurance.
- The page may use an **invoice-style HTML table** to help users understand a realistic payment breakdown, but it must be clearly labelled as an example rather than an official issued invoice.
- Current example model: Grade 9, 8 credits, Regular (UIS) Residence / UIS Residence 12 weeks, Custodianship 1 year. Confirmed 2027 example total is CAD 33,400 before any unconfirmed bank/transaction fee.
- Do not carry forward old sample-invoice fees into the 2027 total unless they are reconfirmed in current materials. For example, an old CAD 20 Bank Fee should remain excluded until reconfirmed.
- Keep `/tuition.html` indexable with canonical metadata, sitemap inclusion and internal links to accommodation, admission and TNS consultation.

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
- Current student-testimonial set and order to preserve unless the user changes it: `uOiiWw4qEIk` → `5pfXyfCMVP4` → `7WKfdB9_RQ8` → `oMdfbRgyFf8` → `XxVtMjgRL6M` → `uheYaM0pZ3k` → `GOjFrOmtiyg`.
- For the Baek Songhyun University of Toronto scholarship testimonial, prefer the **Haedaeship/TNS upload** `uheYaM0pZ3k` rather than the UIS-channel copy.
- `YAEim0A_xo8` belongs on `/videos.html`, not on `/student-videos.html`.
- `/student-videos.html` should stay compact: no repeated section headings or introductory paragraphs between groups of videos. Each video card may keep a **short Korean title plus 1–2 lines of useful context** such as who the student is or notable university admission/scholarship results.
- Translate user-visible English video titles into natural Korean. Keep official acronyms such as RVC only when useful, with the Korean institution name alongside them.
- For English-language YouTube embeds, request captions on and Korean as the preferred caption language with `cc_load_policy=1&cc_lang_pref=ko&hl=ko` when helpful. This only selects an available Korean caption track; it does **not** guarantee YouTube auto-translation into Korean when no Korean caption track exists.
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

## UIS Korea scope and implementation (2026-09-14)
- Online UHUB / online OSSD are outside this site. Do not expose them in page content, menus, metadata or SEO targeting. This does not prohibit describing the existing Edsembli parent portal or online parent-teacher meetings.
- No runtime Edge Function rewriting of HTML. The September parent journey revision materializes the approved visible content into source HTML with shared CSS and JS.
- Build: python3 scripts/build.py. Publish dist only. Preview/branch deployments receive noindex headers and disallow robots; production retains crawlable metadata and sitemap.
- Keep the existing navy, burgundy, warm paper and gold visual language.
- Local social card: assets/uis-social-card.png (1200×630). The existing PR #4 is expanded to include the revision; no production merge without user approval.
- Favicon from PR #3 is incorporated; that independent PR can be closed as superseded after this change is published.
- General detail pages have no visible source boxes. Internal verification goes in CONTENT_VERIFICATION.md; news original source links remain.
- Community counts require dated verification before redisplay. Do not invent a count or verification date.
- Optional analytics events carry only link category, page pathname and placement; they do not imply active GA/GTM collection.
