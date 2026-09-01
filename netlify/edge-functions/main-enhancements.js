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
  const newQcCard = '<div class="card"><span class="card__key">숙소 거주 학생</span><h3>생활 점검(QC) 리포트</h3><p style="margin-bottom:16px">학교 숙소 담당팀이 홈스테이를 방문해 학생의 실제 생활 상태를 확인하고, Student Welfare QC Report를 통해 점검 결과를 학부모에게 공유합니다.</p><ul class="checks"><li>Daily Schedule · 생활 루틴</li><li>Adjustment & Engagement · 적응과 생활 상태</li><li>Meal Inspection · 식사 제공 상태</li><li>필요 시 카운슬러·숙소팀 후속 관리</li></ul><a href="/accommodation-qc.html" style="display:inline-block;margin-top:18px;color:#BE9134;font-weight:800;text-decoration:none">숙소 Quality Control 자세하게 보기 →</a></div>';
  html = html.replace(oldQcCard, newQcCard);

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
