export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  let html = await response.text();

  // 1) 진학 성과: 카드 안의 텍스트 링크를 제거하고 섹션 하단 버튼으로 이동.
  html = html.replace(/<section class="sec sec--tint" id="outcomes">[\s\S]*?<\/section>/, (section) => {
    section = section.replace(/<a href="\/outcomes\/2026-university-offers-scholarships\.html"[^>]*>2026 대입·장학금 결과 자세히 보기 →<\/a>/, "");
    if (!section.includes('class="uis-section-footer-actions uis-outcomes-actions"')) {
      section = section.replace(/<\/div><\/section>$/, '<p class="reveal uis-section-footer-actions uis-outcomes-actions" style="margin:24px 0 0"><a class="btn btn--line" href="/outcomes/2026-university-offers-scholarships.html">2026 대입·장학금 결과 자세히 보기 →</a></p></div></section>');
    }
    return section;
  });

  // 2) 생활과 시설: 숙소 카드 내부 링크를 첫 카드 그리드 아래로 이동하고,
  //    동아리 링크는 동아리 카드 전체 아래의 버튼으로 이동.
  html = html.replace(/<section class="sec"><div class="wrap"><div class="sec__hd reveal"><span class="tag">생활과 시설<\/span>[\s\S]*?<\/section>/, (section) => {
    section = section.replace(/<a href="\/accommodation\.html"[^>]*>기숙사·홈스테이 자세히 보기 →<\/a>/, "");

    section = section.replace(
      /<div class="reveal" style="margin:clamp\(38px,5vw,52px\) 0 18px;display:flex;align-items:baseline;justify-content:space-between;gap:16px;flex-wrap:wrap"><h3 style="font-size:21px;margin:0">동아리와 학교 행사<\/h3><a href="\/clubs\.html"[^>]*>동아리 전체 보기 →<\/a><\/div>/,
      '<p class="reveal uis-section-footer-actions uis-accommodation-actions" style="margin:24px 0 30px"><a class="btn btn--line" href="/accommodation.html">기숙사·홈스테이 자세히 보기 →</a></p><h3 class="reveal" style="margin:clamp(38px,5vw,52px) 0 18px;font-size:21px">동아리와 학교 행사</h3>'
    );

    if (!section.includes('class="uis-section-footer-actions uis-clubs-actions"')) {
      section = section.replace(/<\/div><\/section>$/, '<p class="reveal uis-section-footer-actions uis-clubs-actions" style="margin:24px 0 0"><a class="btn btn--line" href="/clubs.html">동아리·학생 활동 자세히 보기 →</a></p></div></section>');
    }
    return section;
  });

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
};

export const config = { path: ["/", "/index.html"] };
