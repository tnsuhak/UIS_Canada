const CONTACT_MARKUP = `
<section class="uis-contact-hub" id="contact" aria-labelledby="uis-contact-title">
  <div class="uis-contact-hub__inner">
    <div class="uis-contact-hub__head">
      <span>TNS유학 · UIS 입학상담</span>
      <h2 id="uis-contact-title">상담이 필요하신가요?</h2>
      <p>입학, 학업 플랜, 학비·숙소와 출국 준비까지 편한 채널로 문의해 주세요.</p>
    </div>
    <div class="uis-contact-grid">
      <a class="uis-contact-card uis-contact-card--kakao uis-contact-card--wide" href="https://open.kakao.com/o/slehLvKi" target="_blank" rel="noopener">
        <span class="uis-contact-card__icon" aria-hidden="true">💬</span>
        <strong>카톡 상담</strong>
        <small>1:1 실시간 문의</small>
      </a>
      <a class="uis-contact-card uis-contact-card--phone uis-contact-card--wide" href="tel:010-5150-0105">
        <span class="uis-contact-card__icon" aria-hidden="true">☎</span>
        <strong>전화 상담</strong>
        <small>010-5150-0105</small>
      </a>
      <a class="uis-contact-card uis-contact-card--naver" href="https://cafe.naver.com/tnsuhak.cafe" target="_blank" rel="noopener">
        <span class="uis-contact-card__icon uis-contact-card__naver" aria-hidden="true">N</span>
        <strong>네이버 유학카페</strong>
        <small>회원 43,000명</small>
      </a>
      <a class="uis-contact-card uis-contact-card--openchat" href="https://open.kakao.com/o/gotTB6re" target="_blank" rel="noopener">
        <span class="uis-contact-card__icon" aria-hidden="true">💬</span>
        <strong>캐나다 오픈채팅방</strong>
        <small>참가자 1,250명</small>
      </a>
      <a class="uis-contact-card uis-contact-card--home" href="https://www.tnsuhak.com/" target="_blank" rel="noopener">
        <span class="uis-contact-card__icon" aria-hidden="true">🏠</span>
        <strong>TNS유학 홈페이지</strong>
        <small>전체 프로그램 보기</small>
      </a>
    </div>
    <div class="uis-contact-hub__company">
      <div class="uis-contact-hub__company-main">
        <strong>TNS유학 · ㈜티앤에스월드와이드</strong>
        <span>대표 신윤옥 · 사업자등록번호 220-87-54964</span>
        <span>Tel. 02-3288-1733~5 · 010-5150-0105</span>
        <span>Email. <a href="mailto:tns@tnsuhak.com">tns@tnsuhak.com</a></span>
      </div>
      <div>
        <strong>서울 본사</strong>
        <span>서울 강남구 테헤란로5길 7 KG타워 B1</span>
      </div>
      <div>
        <strong>부산 지사</strong>
        <span>부산 부산진구 중앙대로 694 쥬디스태화 9층 37호</span>
        <span>010-5024-1733</span>
      </div>
    </div>
  </div>
</section>`;

const CONTACT_STYLE = `<style data-uis-contact-hub-style>
.uis-contact-hub{background:#fff;color:#17233a;padding:32px 0;border-top:1px solid #e5e8ee;font-family:"IBM Plex Sans KR","Noto Sans KR","Apple SD Gothic Neo","Malgun Gothic",Arial,sans-serif}
.uis-contact-hub *{box-sizing:border-box}.uis-contact-hub__inner{width:min(920px,calc(100% - 32px));margin:0 auto}.uis-contact-hub__head{text-align:center;margin:0 auto 16px}.uis-contact-hub__head>span{display:block;color:#8E1B22;font-size:10.5px;font-weight:800;letter-spacing:.09em;margin-bottom:4px}.uis-contact-hub__head h2{margin:0;color:#131C36;font-family:Georgia,"Noto Serif KR",serif;font-size:clamp(22px,2.8vw,30px);line-height:1.2}.uis-contact-hub__head p{margin:6px 0 0;color:#687487;font-size:12.5px}.uis-contact-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px}.uis-contact-card{min-height:88px;border-radius:11px;border:1px solid #d7dde6;text-decoration:none;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:10px 8px;transition:transform .16s ease,box-shadow .16s ease,border-color .16s ease}.uis-contact-card:hover{transform:translateY(-2px);box-shadow:0 6px 14px rgba(19,28,54,.09)}.uis-contact-card--wide{grid-column:span 3}.uis-contact-card:not(.uis-contact-card--wide){grid-column:span 2}.uis-contact-card__icon{display:flex;align-items:center;justify-content:center;min-height:22px;font-size:19px;line-height:1;margin-bottom:5px}.uis-contact-card__naver{font-family:Arial,sans-serif;font-size:14px;font-weight:800;width:24px;height:24px;min-height:24px;border:1.5px dotted currentColor;border-radius:2px}.uis-contact-card strong{display:block;font-size:14px;line-height:1.2}.uis-contact-card small{display:block;margin-top:4px;font-size:10.5px;line-height:1.2;font-weight:500}.uis-contact-card--kakao,.uis-contact-card--openchat{background:#FEE500;border-color:#efd700;color:#17233a}.uis-contact-card--kakao small,.uis-contact-card--openchat small{color:#675c36}.uis-contact-card--phone{background:#e9eff7;border-color:#c9d4e2;color:#17233a}.uis-contact-card--phone small{color:#607086}.uis-contact-card--naver{background:#03C75A;border-color:#02b852;color:#fff}.uis-contact-card--naver small{color:#def8e8}.uis-contact-card--home{background:#112a48;border-color:#112a48;color:#f3e6bd}.uis-contact-card--home small{color:#d2d9e4}.uis-contact-hub__company{display:grid;grid-template-columns:1.35fr 1fr 1.1fr;gap:12px;margin-top:18px;padding-top:15px;border-top:1px solid #e1e5eb;color:#687487;font-size:11.5px;line-height:1.6}.uis-contact-hub__company>div{display:flex;flex-direction:column;gap:2px}.uis-contact-hub__company strong{color:#17233a;font-size:12px}.uis-contact-hub__company a{color:#8E1B22;text-decoration:none}.uis-contact-hub__company-main{padding-right:8px}
@media(max-width:720px){.uis-contact-hub{padding:26px 0}.uis-contact-hub__inner{width:min(100% - 24px,620px)}.uis-contact-hub__head{margin-bottom:13px}.uis-contact-hub__head h2{font-size:22px}.uis-contact-hub__head p{font-size:11.5px}.uis-contact-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.uis-contact-card--wide,.uis-contact-card:not(.uis-contact-card--wide){grid-column:span 1}.uis-contact-card:last-child{grid-column:1/-1}.uis-contact-card{min-height:76px;border-radius:10px;padding:8px 6px}.uis-contact-card__icon{font-size:17px;margin-bottom:4px;min-height:19px}.uis-contact-card__naver{font-size:13px;width:21px;height:21px;min-height:21px}.uis-contact-card strong{font-size:13px}.uis-contact-card small{font-size:10px;margin-top:3px}.uis-contact-hub__company{grid-template-columns:1fr;gap:10px;font-size:11px;margin-top:15px;padding-top:13px}.uis-contact-hub__company>div{gap:1px}.uis-contact-hub__company strong{font-size:11.5px}}
@media(max-width:390px){.uis-contact-hub__inner{width:calc(100% - 20px)}.uis-contact-card{min-height:72px}.uis-contact-card strong{font-size:12.5px}.uis-contact-card small{font-size:9.5px}}
</style>`;

function stripLegacyContact(html){
  html = html.replace(/<!--\s*TNS-CONTACT-START\s*-->[\s\S]*?<!--\s*TNS-CONTACT-END\s*-->/gi,'');
  html = html.replace(/<section\b[^>]*class=["'][^"']*\btns-contact\b[^"']*["'][^>]*>[\s\S]*?<\/section>/gi,'');
  html = html.replace(/<section\b[^>]*class=["'][^"']*\bcontact\b[^"']*["'][^>]*\bid=["']contact["'][^>]*>[\s\S]*?<\/section>/gi,'');
  html = html.replace(/<section\b[^>]*\bid=["']contact["'][^>]*class=["'][^"']*\bcontact\b[^"']*["'][^>]*>[\s\S]*?<\/section>/gi,'');
  return html;
}

export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) return response;

  let html = await response.text();
  html = stripLegacyContact(html);
  if (!html.includes('data-uis-contact-hub-style')) {
    html = html.replace(/<\/head>/i,`${CONTACT_STYLE}</head>`);
  }
  if (!html.includes('class="uis-contact-hub"')) {
    if (/<\/main>/i.test(html)) html = html.replace(/<\/main>/i,`${CONTACT_MARKUP}</main>`);
    else if (/<footer\b/i.test(html)) html = html.replace(/<footer\b/i,`${CONTACT_MARKUP}<footer`);
    else html = html.replace(/<\/body>/i,`${CONTACT_MARKUP}</body>`);
  }

  const headers = new Headers(response.headers);
  headers.delete('content-length');
  return new Response(html,{status:response.status,statusText:response.statusText,headers});
};

export const config = {
  path: [
    "/",
    "/index.html",
    "/accommodation-qc.html",
    "/accommodation.html",
    "/b2-boutique-program.html",
    "/clubs.html",
    "/edsembli-parent-portal.html",
    "/news.html",
    "/news/*",
    "/outcomes/*",
    "/parent-communication.html",
    "/student-videos.html",
    "/tuition.html",
    "/videos.html"
  ]
};
