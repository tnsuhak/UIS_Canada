export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  let html = await response.text();

  const loader = `<script id="uis-qc-report-image-loader">
(function(){
  const reports = [
    {match:'uis-qc-lunch-inspection-anonymized.webp', data:'/assets/qc/lunch-a.txt', mime:'image/avif'},
    {match:'uis-qc-homestay-inspection-anonymized.webp', data:'/assets/qc/homestay-a.txt', mime:'image/avif'}
  ];
  async function loadReport(item){
    const img = Array.from(document.querySelectorAll('.report-frame img')).find(el => (el.getAttribute('src') || '').includes(item.match));
    if(!img) return;
    try{
      const res = await fetch(item.data, {cache:'no-store'});
      if(!res.ok) throw new Error('image data '+res.status);
      const b64 = (await res.text()).replace(/\s+/g,'');
      if(!b64 || b64.length < 1000) throw new Error('image data incomplete');
      const dataUrl = 'data:' + item.mime + ';base64,' + b64;
      img.src = dataUrl;
      img.removeAttribute('loading');
      const link = img.closest('a');
      if(link) link.href = dataUrl;
    }catch(err){
      console.error('UIS QC report image load failed', err);
    }
  }
  reports.forEach(loadReport);
})();
</script>`;

  if (!html.includes('id="uis-qc-report-image-loader"')) {
    html = html.replace('</body>', `${loader}</body>`);
  }

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.set("cache-control", "no-cache, no-store, must-revalidate");
  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
};

export const config = { path: "/accommodation-qc.html" };
