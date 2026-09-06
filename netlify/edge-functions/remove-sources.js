export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  let html = await response.text();

  // General UIS guide/detail pages do not show source blocks by default.
  // If a source is explicitly requested later, add data-keep-source to that element.
  html = html.replace(
    /<(div|p|aside|section|footer|small)(?=[^>]*class=["'][^"']*\bsource[\w-]*\b[^"']*["'])(?![^>]*data-keep-source)[^>]*>[\s\S]*?<\/\1>/gi,
    ""
  );

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
    "/outcomes/2025-university-offers-scholarships.html",
    "/outcomes/2026-university-offers-scholarships.html",
    "/parent-communication.html",
    "/videos.html"
  ]
};
