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
    <button class="uis-sitemap-btn" id="uisSitemapBtn" type="button" aria-label="전체 메뉴 열기" aria-expanded="false" aria-controls="uisSitemap"><b aria-hidden="true">☰</b><span>전체보기</span></button>
  </div>
  <div class="uis-sitemap" id="uisSitemap">
    <div class="uis-sitemap__inner">
      <div class="uis-sitemap__head">
        <div>
          <span>UIS 한국어 안내</span>
          <h2>전체 메뉴</h2>
          <p>메인 페이지의 주제와 관련 상세페이지를 함께 확인하세요.</p>
        </div>
        <button type="button" id="uisSitemapClose" aria-label="전체 메뉴 닫기">✕</button>
      </div>
      <div class="uis-sitemap__grid">
        <section class="uis-sitemap__group">
          <h3><a href="/#about">학교 소개 <small>메인에서 보기 →</small></a></h3>
          <a href="/#voices">학생 이야기</a>
          <a href="/clubs.html">동아리·학생 활동</a>
          <a href="/videos.html">UIS 학교 영상 모음</a>
          <a href="/student-videos.html">UIS 학생 후기 영상 모음</a>
        </section>
        <section class="uis-sitemap__group">
          <h3><a href="/#outcomes">진학 성과 <small>메인에서 보기 →</small></a></h3>
          <a href="/outcomes/2026-university-offers-scholarships.html">2026 대입·장학금 결과</a>
          <a href="/outcomes/2025-university-offers-scholarships.html">2025 대입·장학금 결과</a>
        </section>
        <section class="uis-sitemap__group">
          <h3><a href="/#academics">학사 과정 <small>메인에서 보기 →</small></a></h3>
          <p>Grade 7–12, OSSD, 학업 스트림과 연 5회 입학 일정을 메인에서 확인합니다.</p>
        </section>
        <section class="uis-sitemap__group">
          <h3><a href="/#programs">특별 프로그램 <small>메인에서 보기 →</small></a></h3>
          <a href="/b2-boutique-program.html">B2 부티크 프로그램 자세히 보기</a>
        </section>
        <section class="uis-sitemap__group">
          <h3><a href="/#care">학생 관리 <small>메인에서 보기 →</small></a></h3>
          <a href="/parent-communication.html">학부모 소통·온라인 상담</a>
          <a href="/edsembli-parent-portal.html">Edsembli 학부모 포털</a>
          <a href="/accommodation-qc.html">숙소 Quality Control</a>
        </section>
        <section class="uis-sitemap__group">
          <h3><a href="/#fees">학비·숙소 <small>메인에서 보기 →</small></a></h3>
          <a href="/tuition.html">2027 학비·예상 납부내역</a>
          <a href="/accommodation.html">기숙사·홈스테이 안내</a>
        </section>
        <section class="uis-sitemap__group">
          <h3><a href="/#admission">입학 절차 <small>메인에서 보기 →</small></a></h3>
          <p>지원서 제출부터 LOA, 학생비자, 출국 준비까지 메인에서 확인합니다.</p>
        </section>
        <section class="uis-sitemap__group uis-sitemap__news">
          <h3><a href="/#news">최신 소식 <small>메인에서 보기 →</small></a></h3>
          <a href="/news.html">전체 뉴스·뉴스레터</a>
        </section>
      </div>
    </div>
  </div>
</nav>`;

const NAV_STYLE = `<style data-uis-global-nav-style>
.uis-site-nav{position:sticky;top:0;z-index:5000;background:rgba(19,28,54,.97);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,.12);font-family:"IBM Plex Sans KR","Noto Sans KR","Apple SD Gothic Neo","Malgun Gothic",sans-serif;color:#262D40}
.uis-site-nav *{box-sizing:border-box}.uis-site-nav__in{max-width:1140px;margin:0 auto;padding:0 clamp(20px,5vw,48px);height:64px;display:flex;align-items:center;justify-content:space-between;gap:20px}.uis-site-nav__brand{display:flex;align-items:center;gap:11px;text-decoration:none;color:#fff;min-width:0}.uis-site-nav__mark{width:30px;height:34px;flex:0 0 auto}.uis-site-nav__brand-txt{font-family:"Noto Serif KR",Georgia,serif;font-weight:700;font-size:17px;letter-spacing:.02em;line-height:1.05;white-space:nowrap}.uis-site-nav__brand-txt small{display:block;font-family:"IBM Plex Sans KR","Noto Sans KR",sans-serif;font-weight:300;font-size:10.5px;letter-spacing:.16em;color:#E4D3A8;margin-top:2px}
.uis-sitemap-btn{display:inline-flex;align-items:center;gap:8px;flex:0 0 auto;background:transparent;border:1px solid rgba(255,255,255,.38);color:#fff;padding:9px 13px;border-radius:2px;font-family:"IBM Plex Sans KR","Noto Sans KR",sans-serif;font-size:13.5px;font-weight:600;cursor:pointer;white-space:nowrap}.uis-sitemap-btn:hover,.uis-sitemap-btn[aria-expanded="true"]{background:#fff;color:#131C36;border-color:#fff}.uis-sitemap-btn b{font-size:14px;font-weight:400}.uis-sitemap{display:none;position:absolute;top:64px;left:0;right:0;background:#fff;color:#262D40;border-top:1px solid rgba(19,28,54,.1);box-shadow:0 24px 55px rgba(10,18,34,.22);max-height:calc(100vh - 64px);overflow-y:auto}.uis-sitemap.open{display:block}.uis-sitemap__inner{max-width:1140px;margin:0 auto;padding:28px clamp(20px,5vw,48px) 34px}.uis-sitemap__head{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;padding-bottom:18px;border-bottom:1px solid #E7E2D6}.uis-sitemap__head span{display:block;color:#8E1B22;font-size:11px;font-weight:700;letter-spacing:.12em;margin-bottom:4px}.uis-sitemap__head h2{font-family:Georgia,"Noto Serif KR",serif;font-size:25px;margin:0;color:#131C36;line-height:1.3}.uis-sitemap__head p{margin:6px 0 0;color:#6A7283;font-size:13px}.uis-sitemap__head button{border:1px solid #D9D3C4;background:#fff;color:#131C36;width:38px;height:38px;cursor:pointer;font-size:16px}.uis-sitemap__grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px 30px;padding-top:24px}.uis-sitemap__group{min-width:0}.uis-sitemap__group h3{font-family:Georgia,"Noto Serif KR",serif;font-size:16px;color:#131C36;margin:0 0 7px;border-bottom:2px solid #131C36}.uis-sitemap__group h3 a{display:flex;align-items:baseline;justify-content:space-between;gap:10px;text-decoration:none;color:#131C36;padding:0 2px 10px}.uis-sitemap__group h3 a:hover{color:#8E1B22}.uis-sitemap__group h3 small{font-family:"IBM Plex Sans KR","Noto Sans KR",sans-serif;font-size:10.5px;font-weight:600;color:#8E1B22;white-space:nowrap}.uis-sitemap__group>a{display:block;text-decoration:none;color:#4F596E;font-size:14px;padding:8px 2px;border-bottom:1px solid #EEEAE1}.uis-sitemap__group>a:hover{color:#8E1B22}.uis-sitemap__group>p{font-size:13px;line-height:1.65;color:#747C8C;margin:10px 2px 0}
@media(max-width:960px){.uis-sitemap__grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:720px){.uis-sitemap{top:100%;max-height:calc(100vh - 64px)}.uis-sitemap__inner{padding:22px 20px 30px}.uis-sitemap__grid{grid-template-columns:1fr;gap:22px}}@media(max-width:560px){.uis-site-nav__in{padding:0 16px}.uis-site-nav__brand-txt{font-size:16px}.uis-site-nav__brand-txt small{font-size:9.5px;letter-spacing:.12em}}@media(max-width:420px){.uis-sitemap-btn span{display:none}.uis-sitemap-btn{width:42px;height:38px;justify-content:center;padding:0}}
</style>`;

const NAV_SCRIPT = `<script data-uis-global-nav-script>
(function(){
  var nav=document.querySelector('[data-uis-global-nav]');
  var btn=document.getElementById('uisSitemapBtn');
  var panel=document.getElementById('uisSitemap');
  var close=document.getElementById('uisSitemapClose');
  if(!nav||!btn||!panel)return;
  function setOpen(open){
    panel.classList.toggle('open',open);
    btn.setAttribute('aria-expanded',open?'true':'false');
    btn.setAttribute('aria-label',open?'전체 메뉴 닫기':'전체 메뉴 열기');
    var icon=btn.querySelector('b');
    if(icon)icon.textContent=open?'✕':'☰';
  }
  btn.addEventListener('click',function(e){e.stopPropagation();setOpen(!panel.classList.contains('open'));});
  if(close)close.addEventListener('click',function(){setOpen(false);btn.focus();});
  panel.addEventListener('click',function(e){if(e.target.closest('a'))setOpen(false);});
  document.addEventListener('click',function(e){if(panel.classList.contains('open')&&!nav.contains(e.target))setOpen(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&panel.classList.contains('open')){setOpen(false);btn.focus();}});
})();
</script>`;

function isLegacySubpageBar(block){
  return /UIS/i.test(block) && /(한국어 안내|메인|돌아가기|←)/.test(block);
}

function removeLocalSubpageHeader(html){
  html = html.replace(/<header\b[^>]*>[\s\S]*?<\/header>/gi,function(block){return isLegacySubpageBar(block)?'':block;});
  html = html.replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/gi,function(block){return isLegacySubpageBar(block)?'':block;});
  html = html.replace(/<div\b[^>]*class=["'][^"']*\btop\b[^"']*["'][^>]*>[\s\S]*?<\/div>/gi,function(block){return isLegacySubpageBar(block)?'':block;});
  return html;
}

export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  let html = await response.text();
  html = removeLocalSubpageHeader(html);

  if (!html.includes("data-uis-global-nav")) {
    html = html.replace(/<\/head>/i,`${NAV_STYLE}</head>`);
    html = html.replace(/<body([^>]*)>/i,`<body$1>${NAV_MARKUP}`);
    html = html.replace(/<\/body>/i,`${NAV_SCRIPT}</body>`);
  }

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html,{status:response.status,statusText:response.statusText,headers});
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
