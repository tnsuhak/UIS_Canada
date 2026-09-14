# UIS September 2026 parent journey update

## Source baseline
- Production commit: 2847e600e405bd45263c58bcac84fbc829b749d5.
- Existing preview PR #4: feature/og-link-preview, 9dffd2213f19e87c9f7d8172ed6a20f1563c7ffd.
- Saved actual HTML responses from Preview #4 for 22 pages on 2026-09-14 before editing. Runtime Edge changes were materialized into static HTML; scripts served by Netlify itself were excluded.
- Main source was compared with existing preview. An old feature/uis-structure-v2 branch was not reused.

## Fact verification
- Admission documents / CLOA / invoice / payment / LOA sequence: https://www.uihs.ca/uis-admission-process/ (read 2026-09-14).
- Official website does not establish a universal minimum IELTS / school grade cutoff on that page. No cutoff is invented.
- User-provided `_UIS_ Overview- Short Version (04-27-2026).pdf`: 88 pages; supports school identity, international-student focus, student support and Grade 7–12. Its 2026 fee table is NOT a replacement for the existing 2027 fee schedule.
- User-provided `_UIS_ Unified School Report (03-2026).pdf`: 12 pages; confirms parent-teacher report, middle-school weekly report and Student Welfare QC report categories. Private original reports were not uploaded.
- 2027 tuition and accommodation rates: retained from latest production tuition.html, accommodation.html and SITE_POLICY.md. No exchange rate or newly inferred 2027 fee was added. Existing September 2026 fee confirmation date retained.
- Academic dates: retained from academics-calendar.html; originating materials are UIS Korea's detailed 2026–2027 and 2027–2028 calendars received 2026-09-01 per source history. Rephrased introduction distinguishes middle-school and high-school calendars.
- Outcome figures: carried over from existing 2025/2026 outcome guides. Main differentiates offer count (including multiple offers) from student count, labels each cohort, removes ambiguous top-five-university claim and unsupported increasing-scholarship headline.
- Existing QC images, real report assets, student interview sequence, school visit video and news source links preserved.

## Search intent mapping
| URL | Primary Korean search intent |
|---|---|
| / | UIS 국제학교, 토론토 사립학교 |
| /academics-calendar.html | UIS OSSD 과정, 학사 일정 |
| /admissions.html | UIS 입학조건, 준비서류, 입학시기 |
| /tuition.html | UIS 학비, 2027 유학 비용 |
| /accommodation.html | UIS 기숙사, 홈스테이 |
| /parent-communication.html | UIS 학생관리, 학부모 상담 |
| /edsembli-parent-portal.html | UIS 성적 출결 확인 |
| /accommodation-qc.html | UIS 숙소 점검 |
| /b2-boutique-program.html | UIS B2 관리형 유학 |

Search service Korean query results on 2026-09-14 surfaced UIS pages focused on fees, admissions, accommodation and managed study. These observations support the page-intent grouping but are not search-volume evidence. Engine-specific Google/Naver SERP and keyword-tool comparisons remain unverified; do not claim completed keyword demand research.

## Measurement / outstanding verification
- GSC Wizard list-sites call failed with payment_required (trial expired/no active subscription). Existing ownership cannot be inferred from absence of verification HTML/meta; DNS verification may exist.
- No Naver Search Advisor management connector available. Ownership/submission status unknown.
- No verified GA/GTM ID found. site.js prepares dataLayer events only; it does not install an analytics collector or transmit personal data.
- Community counts removed from display because a reliable verification date is unavailable; no new count inferred.
- Search engine registrations and sitemap submissions should use production only after approval.
- Shared local social card uses repository-owned text/vector layout; no remote image dependence or unsupported school ownership badge.

## Preview verification completed
- Preview deployed successfully; no Edge Functions remain in deployed manifest.
- Desktop and 390px/768px iframe viewports reviewed in the cloud browser. Mobile document width equals scroll width (375px usable within 390px viewport); full menu opened via pointer click.
- Preview homepage and admissions guide return 200 with one H1 and preview-resolved OG image. Local social PNG returns 200, image/png, 1200×630.
- Preview sends X-Robots-Tag noindex,nofollow; missing URL returns 404.
- GitHub source audit passed for 24 public HTML files / 23 sitemap URLs.
- Kakao chat delivery itself has not been tested; no message was sent. Production OG changes await production approval.
