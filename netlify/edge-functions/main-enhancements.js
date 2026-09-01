export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  let html = await response.text();

  const oldParentRow = '<tr><th>학부모 소통</th><td>Edsembli를 통한 <b>일상 기록 공유</b>, 8개 언어로 카운슬러와 직접 소통</td><td>간헐적인 영문 이메일 안내</td></tr><tr><th>대학 진학 지원</th>';
  const newParentRow = '<tr><th>학부모 소통</th><td>Edsembli를 통한 <b>학생 성적/출결 공유</b>, 한국인 카운슬러와 직접 소통</td><td>간헐적인 영문 이메일 안내</td></tr><tr><th>학부모 미팅</th><td><b>Grade 7–10 연 2회(3월·11월)</b> 과목교사–학부모 상담<br><a href="/parent-communication.html" style="display:inline-block;margin-top:7px;color:#9D2335;font-weight:800;text-decoration:none">자세하게 보기 →</a></td><td>학교별 상담 일정·언어 지원 방식에 따라 운영</td></tr><tr><th>대학 진학 지원</th>';
  html = html.replace(oldParentRow, newParentRow);

  const oldParentCard = '<div class="card"><span class="card__key">7–10학년 · 연 2회</span><h3>학부모–교사 상담 리포트</h3><p style="margin-bottom:16px">3월과 11월에 과목 담당 교사와 학부모가 직접 만납니다. 국가별 아카데믹 카운슬러가 통역으로 함께 참석하며, 상담 직후 6개 언어로 리포트가 제공됩니다.</p><ul class="checks"><li>학업 성취도와 수업 참여도</li><li>과목 교사 코멘트</li><li>교우 관계와 정서적 적응 상태</li><li>향후 학업 계획과 진로 방향</li></ul></div>';
  const newParentCard = '<div class="card"><span class="card__key">7–10학년 · 연 2회</span><h3>학부모–교사 상담 리포트</h3><p style="margin-bottom:16px">3월과 11월에 과목 담당 교사와 학부모가 직접 상담하고, 한국인 카운슬러가 학부모 소통을 지원합니다. 상담 내용은 Parent and Teacher Conference Report로 정리됩니다.</p><ul class="checks"><li>학업 진척도와 수업 참여 확인</li><li>과목 교사 코멘트</li><li>강점과 개선 포인트</li><li>다음 학기 학습 방향 공유</li></ul><a href="/parent-communication.html" style="display:inline-block;margin-top:18px;color:#BE9134;font-weight:800;text-decoration:none">학부모 소통·미팅 자세하게 보기 →</a></div>';
  html = html.replace(oldParentCard, newParentCard);

  const oldQcCard = '<div class="card"><span class="card__key">숙소 거주 학생</span><h3>생활 점검(QC) 리포트</h3><p style="margin-bottom:16px">학교 숙소 담당팀이 호스트 가정을 직접 방문해 점검하고 결과를 학부모에게 보냅니다. 개선이 필요한 부분은 호스트와 즉시 협의합니다.</p><ul class="checks"><li>기상·등하교·식사·귀가 시간 등 하루 일과</li><li>호스트 가정과의 관계, 성격과 적응 상태</li><li>식사 사진과 방 상태를 포함한 생활 환경</li></ul></div>';
  const newQcCard = '<div class="card"><span class="card__key">숙소 거주 학생</span><h3>생활 점검(QC) 리포트</h3><p style="margin-bottom:16px">학교 숙소 담당팀이 홈스테이를 방문해 학생의 실제 생활 상태를 확인하고, Student Welfare QC Report를 통해 점검 결과를 학부모에게 공유합니다.</p><ul class="checks"><li>Daily Schedule · 생활 루틴</li><li>Adjustment & Engagement · 적응과 생활 상태</li><li>Meal Inspection · 식사 제공 상태</li><li>필요 시 카운슬러·숙소팀 후속 관리</li></ul><div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:18px"><a href="/accommodation.html" style="color:#BE9134;font-weight:800;text-decoration:none">숙소 유형 안내 →</a><a href="/accommodation-qc.html" style="color:#BE9134;font-weight:800;text-decoration:none">숙소 QC 자세히 보기 →</a></div></div>';
  html = html.replace(oldQcCard, newQcCard);

  html = html.replace(
    '<tr><th>동아리·활동</th><td>전공 계열과 연결된 동아리, NGO 봉사, 미디어·리더십·다문화 행사</td><td>활동 수가 적고 비교과 역량 관리가 어려움</td></tr>',
    '<tr><th>동아리·활동</th><td>전공 계열과 연결된 동아리, NGO 봉사, 미디어·리더십·다문화 행사<br><a href="/clubs.html" style="display:inline-block;margin-top:7px;color:#9D2335;font-weight:800;text-decoration:none">동아리·학생 활동 보기 →</a></td><td>활동 수가 적고 비교과 역량 관리가 어려움</td></tr>'
  );

  html = html.replace(
    '<div class="card"><span class="card__key">숙소</span><h3>네 가지 주거 형태</h3><p>Main Residence(Drewry·Charlton), UIS Residence, Premium Homestay, Regular Homestay 모두 학교 팀이 직접 관리합니다.</p></div>',
    '<div class="card"><span class="card__key">숙소</span><h3>네 가지 주거 형태</h3><p>Main Residence(Drewry·Charlton), UIS Residence, Premium Homestay, Regular Homestay 등 여러 주거 형태를 안내합니다.</p><a href="/accommodation.html" style="display:inline-block;margin-top:16px;color:#9D2335;font-weight:800;text-decoration:none">기숙사·홈스테이 자세히 보기 →</a></div>'
  );

  html = html.replace(
    '<div class="card"><span class="card__key">Edsembli</span><h3>출결·성적 실시간 확인</h3><p>학생과 학부모가 출결, 성적, 교사 피드백을 직접 확인하며 개인 학업 플랜을 관리합니다.</p></div>',
    '<div class="card"><span class="card__key">Edsembli</span><h3>출결·성적 실시간 확인</h3><p>한국에 있는 부모님도 직접 로그인해 학생의 성적과 출결, 학교에서 공유되는 학업·학교생활 기록과 교사 피드백을 수시로 확인할 수 있습니다.</p><a href="/edsembli-parent-portal.html" style="display:inline-block;margin-top:16px;color:#BE9134;font-weight:800;text-decoration:none">Edsembli 학부모 포털 자세히 보기 →</a></div>'
  );

  html = html.replace(
    '<h3 class="reveal" style="margin:clamp(38px,5vw,52px) 0 18px;font-size:21px">동아리와 학교 행사</h3>',
    '<div class="reveal" style="margin:clamp(38px,5vw,52px) 0 18px;display:flex;align-items:baseline;justify-content:space-between;gap:16px;flex-wrap:wrap"><h3 style="font-size:21px;margin:0">동아리와 학교 행사</h3><a href="/clubs.html" style="color:#9D2335;font-weight:800;text-decoration:none;font-size:14px">동아리 전체 보기 →</a></div>'
  );

  html = html.replace(
    '<div class="sec__hd reveal"><span class="tag">학비와 숙소비</span><h2>2027학년도 비용이 조정됩니다</h2>',
    '<div class="sec__hd reveal"><span class="tag">학비와 숙소비</span><h2>2027학년도 비용이 조정됩니다</h2><p style="margin:14px 0 0"><a href="/accommodation.html" style="color:#9D2335;font-weight:800;text-decoration:none">숙소 유형·홈스테이 안내 먼저 보기 →</a></p>'
  );

  html = html.replace(
    '<div class="record__ft">출처: UIS 공식 홈페이지(uihs.ca) 게재 자료</div>',
    '<div class="record__ft">출처: UIS 공식 홈페이지(uihs.ca) 게재 자료<br><a href="/outcomes/2025-university-offers-scholarships.html" style="display:inline-block;margin-top:7px;color:#8E1B22;font-weight:800;text-decoration:none">2025 대입·장학금 결과 자세히 보기 →</a></div>'
  );

  html = html.replace(
    '<div class="card"><span class="card__key">2026년 졸업생</span><h3>장학금 240만 달러 이상</h3><p>토론토대학교 수리·물리과학, 일본 와세다대학교와 게이오대학교 국제교양학부, 웨스턴대학교 아이비 경영대와 의과학 프로그램 등에 합격했고, 4만 달러 장학금 사례도 포함되어 있습니다.</p></div>',
    '<div class="card"><span class="card__key">2026년 졸업생</span><h3>장학금 240만 달러 이상</h3><p>토론토대학교 수리·물리과학, 일본 와세다대학교와 게이오대학교 국제교양학부, 웨스턴대학교 아이비 경영대와 의과학 프로그램 등에 합격했고, 4만 달러 장학금 사례도 포함되어 있습니다.</p><a href="/outcomes/2026-university-offers-scholarships.html" style="display:inline-block;margin-top:18px;color:#9D2335;font-weight:800;text-decoration:none">2026 대입·장학금 결과 자세히 보기 →</a></div>'
  );

  const newNewsSection = `<section class="sec sec--tint" id="news"><div class="wrap"><div class="sec__hd reveal"><span class="tag">UIS 최신 소식</span><h2>최근 2개월 뉴스레터</h2><p class="lede">매월 발행되는 UIS 뉴스레터 중 가장 최근 2개월 소식을 빠르게 볼 수 있도록 정리했습니다. 이전 소식은 뉴스 아카이브에서 계속 확인할 수 있습니다.</p></div><div class="grid g2 reveal"><div class="card"><span class="card__key">2026년 8월</span><h3>Summer Immersion 현장학습과 BBQ Party</h3><p>여름 집중 프로그램 학생들이 나이아가라 폭포, 아가 칸 박물관, 로열 온타리오 박물관을 탐방했고, 연례 BBQ Party로 여름학기를 마무리했습니다. UIS는 이어서 9월 새 학기와 신입생 오리엔테이션을 준비했습니다.</p><a href="/news/2026-08-newsletter.html" style="display:inline-block;margin-top:18px;color:#9D2335;font-weight:800;text-decoration:none">8월 뉴스 자세히 보기 →</a></div><div class="card"><span class="card__key">2026년 7월</span><h3>여름학기·신입생 오리엔테이션·Breakfast Club</h3><p>Summer Immersion Program과 7월 신입생 오리엔테이션이 시작됐고, 여름학기 학생들을 위한 Breakfast Club, Horoscope 이벤트, 월드컵 응원 등 다양한 학교생활이 이어졌습니다.</p><a href="/news/2026-07-newsletter.html" style="display:inline-block;margin-top:18px;color:#9D2335;font-weight:800;text-decoration:none">7월 뉴스 자세히 보기 →</a></div></div><p class="reveal" style="margin:24px 0 0"><a class="btn btn--line" href="/news.html">UIS 전체 뉴스 보기 →</a></p></div></section>`;

  html = html.replace(
    /<section class="sec sec--tint" id="news">[\s\S]*?<\/section>\s*<section class="sec sec--dark">/,
    `${newNewsSection}\n<section class="sec sec--dark">`
  );

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
};

export const config = {
  path: ["/", "/index.html"]
};
