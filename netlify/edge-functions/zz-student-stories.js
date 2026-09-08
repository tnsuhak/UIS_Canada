export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  let html = await response.text();

  const studentSection = `<section class="sec" id="voices"><div class="wrap"><div class="sec__hd reveal"><span class="tag">학생 이야기</span><h2>한국 학생이 직접 전하는 UIS</h2><p class="lede">UIS에서 공부한 한국 학생의 대학 진학 경험을 영상으로 확인해 보세요.</p></div><div class="reveal" style="max-width:900px"><div style="position:relative;width:100%;aspect-ratio:16/9;background:#0b1325;overflow:hidden"><iframe src="https://www.youtube-nocookie.com/embed/BNChwQMLOxg" title="Songhyun Back UIS 장학금 스토리" style="position:absolute;inset:0;width:100%;height:100%;border:0" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><p style="margin:18px 0 0"><a class="btn btn--line" href="/student-videos.html">UIS 학생 후기 영상 모음 →</a></p></div></div></section>`;

  html = html.replace(/<section class="sec" id="voices">[\s\S]*?<\/section>\s*<!-- TNS-CONTACT-START -->/, `${studentSection}\n<!-- TNS-CONTACT-START -->`);

  if (!html.includes('href="/student-videos.html"') || html.indexOf('href="/student-videos.html"') > html.indexOf('id="voices"')) {
    html = html.replace(/<a href="\/videos\.html">(?:UIS 영상 모아보기|UIS 학교 영상 모음)<\/a>/, '<a href="/videos.html">UIS 학교 영상 모음</a><a href="/student-videos.html">UIS 학생 후기 영상 모음</a>');
  }

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html,{status:response.status,statusText:response.statusText,headers});
};

export const config = { path: ["/", "/index.html"] };
