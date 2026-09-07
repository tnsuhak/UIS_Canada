const NAV_MARKUP = `
<nav class="uis-site-nav" data-uis-global-nav aria-label="UIS 전체 메뉴">
  <div class="uis-site-nav__in">
    <a class="uis-site-nav__brand" href="/" aria-label="UIS 메인으로 이동">
      <svg class="uis-site-nav__mark" viewBox="0 0 60 70" aria-hidden="true">
        <path d="M30 2 55 12v28c0 15-11 24-25 28C16 64 5 55 5 40V12z" fill="none" stroke="#BE9134" stroke-width="3"/>
        <path d="M30 10 47 17v22c0 11-8 18-17 21-9-3-17-10-17-21V17z" fill="#fff" opacity=".14"/>
        <text x="30" y="43" text-anchor="middle" font-family="Georgia,serif" font-size="21" font-weight="700" fill="#fff">U</text>
      </svg>
      <span class="uis-site-nav__brand-txt">UIS<small>URBAN INTERNATIONAL SCHOOL</small></span>
    </a>
    <button class="uis-site-nav__burger" type="button" aria-label="전체보기 메뉴 열기" aria-expanded="false" aria-controls="uis-subpage-menu"><span aria-hidden="true">☰</span><b>전체보기</b></button>
    <div class="uis-site-nav__links" id="uis-subpage-menu">
      <a href="/#about">학교 소개</a>
      <a href="/#outcomes">진학 성과</a>
      <a href="/#academics">학사 과정</a>
      <a href="/#programs">특별 프로그램</a>
      <a href="/#care">학생 관리</a>
      <a href="/#fees">학비·숙소</a>
      <a href="/#admission">입학 절차</a>
      <a href="/#contact" class="uis-site-nav__cta">상담 문의</a>
    </div>
  </div>
</nav>`;

const NAV_STYLE = `<style data-uis-global-nav-style>
.uis-site-nav{position:sticky;top:0;z-index:5000;background:rgba(19,28,54,.97);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,.12);font-family:"IBM Plex Sans KR","Noto Sans KR","Apple SD Gothic Neo","Malgun Gothic",sans-serif}
.uis-site-nav *{box-sizing:border-box}.uis-site-nav__in{max-width:1140px;margin:0 auto;padding:0 clamp(20px,5vw,48px);height:64px;display:flex;align-items:center;justify-content:space-between;gap:20px;position:relative}.uis-site-nav__brand{display:flex;align-items:center;gap:11px;text-decoration:none;color:#fff;min-width:0}.uis-site-nav__mark{width:30px;height:34px;flex:0 0 auto}.uis-site-nav__brand-txt{font-family:"Noto Serif KR",Georgia,serif;font-weight:700;font-size:17px;letter-spacing:.02em;line-height:1.05;white-space:nowrap}.uis-site-nav__brand-txt small{display:block;font-family:"IBM Plex Sans KR","Noto Sans KR",sans-serif;font-weight:300;font-size:10.5px;letter-spacing:.16em;color:#E4D3A8;margin-top:2px}.uis-site-nav__burger{margin-left:auto;display:inline-flex;align-items:center;justify-content:center;gap:7px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.32);color:#fff;min-height:38px;padding:0 13px;border-radius:3px;font-size:16px;line-height:1;cursor:pointer;white-space:nowrap}.uis-site-nav__burger b{font-size:13px;font-weight:600;letter-spacing:-.01em}.uis-site-nav__burger:hover,.uis-site-nav__burger[aria-expanded="true"]{background:rgba(255,255,255,.13);border-color:#BE9134}.uis-site-nav__burger:focus-visible{outline:3px solid #BE9134;outline-offset:2px}.uis-site-nav__links{position:absolute;right:clamp(20px,5vw,48px);top:calc(100% + 8px);width:min(360px,calc(100vw - 40px));background:#131C36;border:1px solid rgba(255,255,255,.16);box-shadow:0 18px 38px rgba(0,0,0,.28);padding:8px 16px 16px;display:none}.uis-site-nav__links.open{display:flex;flex-direction:column}.uis-site-nav__links a{color:rgba(255,255,255,.88);text-decoration:none;font-size:14.5px;font-weight:400;padding:12px 2px;border-bottom:1px solid rgba(255,255,255,.09)}.uis-site-nav__links a:hover,.uis-site-nav__links a:focus-visible{color:#fff}.uis-site-nav__cta{background:#8E1B22;color:#fff!important;text-align:center;margin-top:12px;padding:11px 14px!important;border:0!important;border-radius:2px;font-weight:600!important}.uis-site-nav__cta:hover{background:#A32029!important}
@media(max-width:560px){.uis-site-nav__in{padding:0 16px}.uis-site-nav__brand-txt{font-size:16px}.uis-site-nav__brand-txt small{font-size:9.5px;letter-spacing:.12em}.uis-site-nav__burger{padding:0 11px}.uis-site-nav__burger b{font-size:12.5px}.uis-site-nav__links{right:16px;width:min(340px,calc(100vw - 32px))}}
</style>`;

const NAV_SCRIPT = `<script data-uis-global-nav-script>
(function(){
  var nav=document.querySelector('[data-uis-global-nav]');
  if(!nav)return;
  var button=nav.querySelector('.uis-site-nav__burger');
  var menu=nav.querySelector('.uis-site-nav__links');
  if(!button||!menu)return;
  function closeMenu(){menu.classList.remove('open');button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','전체보기 메뉴 열기');}
  button.addEventListener('click',function(){var open=menu.classList.toggle('open');button.setAttribute('aria-expanded',open?'true':'false');button.setAttribute('aria-label',open?'전체보기 메뉴 닫기':'전체보기 메뉴 열기');});
  menu.addEventListener('click',function(e){if(e.target.closest('a'))closeMenu();});
  document.addEventListener('click',function(e){if(menu.classList.contains('open')&&!nav.contains(e.target))closeMenu();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu();});
})();
</script>`;

function removeLocalSubpageHeader(html){
  html = html.replace(/<header\b[^>]*>[\s\S]*?<\/header>/gi, function(block){
    return block.includes('UIS 한국어 안내') ? '' : block;
  });
  html = html.replace(/<div\b[^>]*class=["'][^"']*\btop\b[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, function(block){
    return block.includes('UIS 한국어 안내') ? '' : block;
  });
  return html;
}

export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  let html = await response.text();
  html = removeLocalSubpageHeader(html);

  if (!html.includes("data-uis-global-nav")) {
    html = html.replace(/<\/head>/i, `${NAV_STYLE}</head>`);
    html = html.replace(/<body([^>]*)>/i, `<body$1>${NAV_MARKUP}`);
    html = html.replace(/<\/body>/i, `${NAV_SCRIPT}</body>`);
  }

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

export const config = {
  path: [
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
