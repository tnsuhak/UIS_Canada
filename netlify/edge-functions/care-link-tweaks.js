export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  let html = await response.text();

  const style = `<style id="uis-care-link-tweaks-style">
  #care .card a[href^="/"]{font-size:13.5px!important;line-height:1.45!important}
  @media(max-width:720px){#care .card a[href^="/"]{font-size:13px!important}}
  </style>`;

  const script = `<script id="uis-care-link-tweaks-script">(function(){function apply(){var care=document.getElementById('care');if(!care)return;care.querySelectorAll('a').forEach(function(a){var text=(a.textContent||'').trim();var href=a.getAttribute('href')||'';if(text.indexOf('숙소 유형 안내')!==-1){a.remove();return;}if(a.closest('.card')&&(href==='/parent-communication.html'||href==='/accommodation-qc.html'||href==='/edsembli-parent-portal.html')){a.textContent='자세하게 보기 →';}});care.querySelectorAll('.card').forEach(function(card){var h3=card.querySelector('h3');if(!h3||((h3.textContent||'').trim()!=='2주에 한 번 도시락 확인'))return;if(card.querySelector('a[href="/accommodation-qc.html#lunch-inspection"]'))return;var a=document.createElement('a');a.href='/accommodation-qc.html#lunch-inspection';a.textContent='자세하게 보기 →';a.style.cssText='display:inline-block;margin-top:14px;color:#BE9134;font-weight:800;text-decoration:none';card.appendChild(a);});}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',apply);}else{apply();}})();</script>`;

  if (!html.includes('id="uis-care-link-tweaks-style"')) {
    html = html.replace('</head>', `${style}</head>`);
  }
  if (!html.includes('id="uis-care-link-tweaks-script"')) {
    html = html.replace('</body>', `${script}</body>`);
  }

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

export const config = { path: ["/", "/index.html"] };
