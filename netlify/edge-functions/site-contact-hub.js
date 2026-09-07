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
      <div><strong>서울 본사</strong><span>02-3288-1733~5 · 010-5150-0105</span></div>
      <div><strong>부산 지사</strong><span>010-5024-1733</span></div>
      <div><strong>Email</strong><a href="mailto:tns@tnsuhak.com">tns@tnsuhak.com</a></div>
    </div>
  </div>
</section>`;

const CONTACT_STYLE = `<style data-uis-contact-hub-style>
.uis-contact-hub{background:#fff;color:#17233a;padding:clamp(52px,7vw,78px) 0;border-top:1px solid #e5e8ee;font-family:"IBM Plex Sans KR","Noto Sans KR","Apple SD Gothic Neo","Malgun Gothic",Arial,sans-serif}
.uis-contact-hub *{box-sizing:border-box}.uis-contact-hub__inner{width:min(1120px,calc(100% - 36px));margin:0 auto}.uis-contact-hub__head{text-align:center;margin:0 auto 28px}.uis-contact-hub__head>span{display:block;color:#8E1B22;font-size:12px;font-weight:800;letter-spacing:.1em;margin-bottom:7px}.uis-contact-hub__head h2{margin:0;color:#131C36;font-family:Georgia,"Noto Serif KR",serif;font-size:clamp(27px,4vw,38px);line-height:1.25}.uis-contact-hub__head p{margin:10px 0 0;color:#687487;font-size:15px}.uis-contact-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:14px}.uis-contact-card{min-height:170px;border-radius:18px;border:1px solid #d7dde6;text-decoration:none;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px 18px;transition:transform .16s ease,box-shadow .16s ease,border-color .16s ease}.uis-contact-card:hover{transform:translateY(-3px);box-shadow:0 10px 26px rgba(19,28,54,.12)}.uis-contact-card--wide{grid-column:span 3}.uis-contact-card:not(.uis-contact-card--wide){grid-column:span 2}.uis-contact-card__icon{display:flex;align-items:center;justify-content:center;min-height:36px;font-size:31px;line-height:1;margin-bottom:13px}.uis-contact-card__naver{font-family:Arial,sans-serif;font-size:23px;font-weight:800;width:38px;height:38px;min-height:38px;border:2px dotted currentColor;border-radius:2px}.uis-contact-card strong{display:block;font-size:19px;line-height:1.3}.uis-contact-card small{display:block;margin-top:10px;font-size:14px;line-height:1.35;font-weight:500}.uis-contact-card--kakao,.uis-contact-card--openchat{background:#FEE500;border-color:#efd700;color:#17233a}.uis-contact-card--kakao small,.uis-contact-card--openchat small{color:#675c36}.uis-contact-card--phone{background:#e9eff7;border-color:#c9d4e2;color:#17233a}.uis-contact-card--phone small{color:#607086}.uis-contact-card--naver{background:#03C75A;border-color:#02b852;color:#fff}.uis-contact-card--naver small{color:#def8e8}.uis-contact-card--home{background:#112a48;border-color:#112a48;color:#f3e6bd}.uis-contact-card--home small{color:#d2d9e4}.uis-contact-hub__company{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:18px;margin-top:28px;padding-top:22px;border-top:1px solid #e1e5eb;color:#687487;font-size:13.5px}.uis-contact-hub__company>div{display:flex;gap:8px;flex-wrap:wrap}.uis-contact-hub__company strong{color:#17233a}.uis-contact-hub__company a{color:#8E1B22;text-decoration:none}
@media(max-width:720px){.uis-contact-hub{padding:46px 0}.uis-contact-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.uis-contact-card--wide,.uis-contact-card:not(.uis-contact-card--wide){grid-column:span 1}.uis-contact-card:last-child{grid-column:1/-1}.uis-contact-card{min-height:142px;border-radius:14px;padding:18px 10px}.uis-contact-card__icon{font-size:26px;margin-bottom:10px}.uis-contact-card__naver{font-size:20px;width:34px;height:34px;min-height:34px}.uis-contact-card strong{font-size:16px}.uis-contact-card small{font-size:12.5px;margin-top:7px}.uis-contact-hub__company{grid-template-columns:1fr;gap:7px;font-size:12.5px}}
@media(max-width:390px){.uis-contact-grid{grid-template-columns:1fr}.uis-contact-card,.uis-contact-card:last-child{grid-column:1}.uis-contact-card{min-height:126px}}
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
