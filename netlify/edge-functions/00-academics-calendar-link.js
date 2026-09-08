export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  let html = await response.text();

  // Replace the long non-clickable academic-menu note with a useful internal guide link.
  html = html.replaceAll(
    '<p>Grade 7–12, OSSD, 학업 스트림과 연 5회 입학 일정을 메인에서 확인합니다.</p>',
    '<a href="/academics-calendar.html">학사 과정·2026–2028 학사 일정 자세히 보기</a>'
  );

  // Add a clear CTA to the homepage academic section.
  const academicsHead = '<span class="tag">학사 과정</span><h2>중등부 2년, 고등부 4년.<br>진로에 따라 여섯 갈래로 나뉩니다</h2></div>';
  const academicsHeadLinked = '<span class="tag">학사 과정</span><h2>중등부 2년, 고등부 4년.<br>진로에 따라 여섯 갈래로 나뉩니다</h2><p style="margin:14px 0 0"><a href="/academics-calendar.html" style="color:#8E1B22;font-weight:800;text-decoration:none">학사 과정·2026–2028 학사 일정 자세히 보기 →</a></p></div>';
  html = html.replace(academicsHead, academicsHeadLinked);

  // Align homepage wording with the latest UIS Korea 2026/27 and 2027/28 calendars.
  html = html.replaceAll('연 5회 입학, 5학기제 학사 일정', '정규학기 4회 + 여름학기 2개 세션');
  html = html.replace(
    '<td><b>연 5회 입학</b>, 학생의 학업 수준과 진학 목표에 맞춘 개인별 학업 플랜 제공</td>',
    '<td><b>정규학기 4회 + 여름학기 2개 세션</b>, 학생의 학업 수준과 진학 목표에 맞춘 개인별 학업 플랜 제공</td>'
  );
  html = html.replace(
    '<tr><th>5학기</th><td>7월 – 8월</td><td>7월 신입생 입학 · 여름학기</td></tr>',
    '<tr><th>여름학기</th><td>7월 · 8월</td><td>두 개 세션으로 운영 · 각 세션 시작일 오리엔테이션</td></tr>'
  );
  html = html.replace(
    '<tr><th>5학기</th><td>7월 – 8월</td><td>여름 학기 (Summer Semester)</td></tr>',
    '<tr><th>여름학기</th><td>7월 · 8월</td><td>두 개 세션으로 운영 · 각 세션 시작일 오리엔테이션</td></tr>'
  );
  html = html.replaceAll('Grade 7–12, OSSD 취득, 연 5회 입학,', 'Grade 7–12, OSSD 취득, 정규 4개 학기와 여름 2개 세션,');
  html = html.replaceAll('OSSD, 연 5회 입학,', 'OSSD, 정규 4개 학기와 여름 2개 세션,');

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, {status: response.status, statusText: response.statusText, headers});
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
