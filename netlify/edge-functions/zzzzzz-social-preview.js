export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  let html = await response.text();
  const imageUrl = "https://img.youtube.com/vi/_TQOHyJ9E4o/maxresdefault.jpg";
  const imageAlt = "UIS 어반 인터내셔널 스쿨 - TNS 현장 방문";

  if (!/property=["']og:image["']/i.test(html)) {
    const ogImage = [
      `<meta property="og:image" content="${imageUrl}">`,
      `<meta property="og:image:secure_url" content="${imageUrl}">`,
      '<meta property="og:image:type" content="image/jpeg">',
      '<meta property="og:image:width" content="1280">',
      '<meta property="og:image:height" content="720">',
      `<meta property="og:image:alt" content="${imageAlt}">`
    ].join("\n");
    html = html.replace(/<\/head>/i, `${ogImage}\n</head>`);
  }

  if (/name=["']twitter:card["'][^>]*content=["']summary["']/i.test(html)) {
    html = html.replace(
      /<meta\s+name=["']twitter:card["']\s+content=["']summary["']\s*\/?>/i,
      '<meta name="twitter:card" content="summary_large_image">'
    );
  }
  if (!/name=["']twitter:image["']/i.test(html)) {
    html = html.replace(/<\/head>/i, `<meta name="twitter:image" content="${imageUrl}">\n<meta name="twitter:image:alt" content="${imageAlt}">\n</head>`);
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
    "/",
    "/index.html",
    "/*.html",
    "/news/*",
    "/outcomes/*"
  ]
};
