export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  let html = await response.text();

  const newFeesSection = `<section class="sec sec--tint" id="fees"><div class="wrap"><div class="sec__hd reveal"><span class="tag">학비와 숙소비</span><h2>2027학년도 학비와 숙소비</h2><p class="lede">2027년 적용 학비와 숙소비를 간단하게 확인할 수 있습니다.</p></div><div class="tabs reveal" role="tablist" aria-label="2027 학비와 숙소비"><button class="tab" role="tab" aria-selected="true" aria-controls="f-2027" id="t-2027">2027년</button><button class="tab" role="tab" aria-selected="false" aria-controls="f-room" id="t-room">숙소비</button></div><div class="panel" role="tabpanel" id="f-2027" aria-labelledby="t-2027"><div class="tblwrap"><table><thead><tr><th style="width:42%">항목</th><th>2027년 비용</th></tr></thead><tbody><tr><th>중등부 Grade 7–8 · 연간 학비</th><td><b>$20,000</b></td></tr><tr><th>중등부 Grade 7–8 · 학기별 학비</th><td><b>$10,000</b></td></tr><tr><th>고등부 Grade 9–12 · 학점당</th><td><b>$2,800</b></td></tr><tr><th>고등부 · 8학점</th><td><b>$22,400</b></td></tr><tr><th>고등부 · 9학점</th><td><b>$25,200</b></td></tr><tr><th>고등부 · 10학점</th><td><b>$28,000</b></td></tr><tr><th>유학생 의료보험</th><td><b>$800 / 년</b></td></tr></tbody></table></div><p class="note">모든 금액은 캐나다 달러(CAD) 기준입니다.</p></div><div class="panel" role="tabpanel" id="f-room" aria-labelledby="t-room" hidden><div class="tblwrap"><table><thead><tr><th style="width:42%">숙소 유형</th><th>2027년 비용 / 4주</th></tr></thead><tbody><tr><th>Main Residence — Drewry</th><td>싱글 <b>$1,800</b> · 더블 <b>$1,650</b></td></tr><tr><th>Main Residence — Charlton</th><td>더블 <b>$1,650</b></td></tr><tr><th>UIS Residence</th><td>싱글 <b>$1,800</b></td></tr><tr><th>Premium Homestay</th><td>싱글 <b>$1,800</b></td></tr><tr><th>Regular Homestay</th><td>싱글 <b>$1,500</b></td></tr></tbody></table></div><p class="note">공통 비용: 배정비 $250(1회), 재배정비 $150(1회), 보증금 $500(환급), 키 보증금 $200(환급). 홈스테이는 보증금과 키 보증금이 없습니다.</p></div><p class="reveal" style="margin:24px 0 0;display:flex;flex-wrap:wrap;gap:10px"><a class="btn btn--line" href="/tuition.html">2027 학비 자세히 보기 →</a><a class="btn btn--line" href="/accommodation.html">기숙사·홈스테이 자세히 보기 →</a></p></div></section>`;

  html = html.replace(/<section class="sec sec--tint" id="fees">[\s\S]*?<\/section>\s*<section class="sec" id="admission">/, `${newFeesSection}\n<section class="sec" id="admission">`);

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
};

export const config = { path: ["/", "/index.html"] };
