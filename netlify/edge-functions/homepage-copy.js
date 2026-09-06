export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  let html = await response.text();
  html = html.replace(/UIS 영상 전체 모아 보기/g, "UIS 학교 영상 모음");

  const script = `<script id="uis-homepage-detail-links">(function(){function apply(){var feeHeading=document.querySelector('.uis-sitemap__group h3 a[href="#fees"]');if(!feeHeading)return;var group=feeHeading.closest('.uis-sitemap__group');if(!group||group.querySelector('a[href="/tuition.html"]'))return;var link=document.createElement('a');link.href='/tuition.html';link.textContent='2027 학비·예상 납부내역';var accommodation=group.querySelector('a[href="/accommodation.html"]');if(accommodation){group.insertBefore(link,accommodation);}else{group.appendChild(link);}}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',apply);}else{apply();}})();</script>`;
  if (!html.includes('id="uis-homepage-detail-links"')) {
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
