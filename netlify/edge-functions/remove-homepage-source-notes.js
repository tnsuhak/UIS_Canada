export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  let html = await response.text();
  html = html.replace('<p class="note">출처: UIS 공식 학교 소개 자료(2026년 4월판).</p>', '');
  html = html.replace('<p class="note">UIS 공식 학교 소개 자료(2026년 4월판)에 수록된 졸업생 사례입니다.</p>', '');

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
};

export const config = { path: ["/", "/index.html"] };
