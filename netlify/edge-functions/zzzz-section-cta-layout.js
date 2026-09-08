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

  // 2) 생활과 시설: 카드 중간 텍스트 링크를 제거하고 각 묶음의 하단 버튼으로 이동.
  html = html.replace(/<section class="sec"><div class="wrap"><div class="sec__hd reveal"><span class="tag">생활과 시설<\/span>[\s\S]*?<\/section>/, (section) => {
    section = section.replace(/<a href="\/accommodation\.html"[^>]*>기숙사·홈스테이 자세히 보기 →<\/a>/g, "");
    section = section.replace(/<a href="\/clubs\.html"[^>]*>동아리 전체 보기 →<\/a>/g, "");

    if (!section.includes('class="uis-section-footer-actions uis-accommodation-actions"')) {
      const titleIndex = section.indexOf('동아리와 학교 행사');
      if (titleIndex !== -1) {
        const divIndex = section.lastIndexOf('<div class="reveal"', titleIndex);
        const h3Index = section.lastIndexOf('<h3 class="reveal"', titleIndex);
        const insertAt = Math.max(divIndex, h3Index);
        if (insertAt !== -1) {
          const accommodationButton = '<p class="reveal uis-section-footer-actions uis-accommodation-actions" style="margin:24px 0 30px"><a class="btn btn--line" href="/accommodation.html">기숙사·홈스테이 자세히 보기 →</a></p>';
          section = section.slice(0, insertAt) + accommodationButton + section.slice(insertAt);
        }
      }
    }

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
