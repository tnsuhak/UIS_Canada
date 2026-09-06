export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  let html = await response.text();

  const style = `<style id="uis-admission-layout-style">
  #admission .admission-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin:0;padding:0;list-style:none;counter-reset:admissionStep}
  #admission .admission-step{counter-increment:admissionStep;background:#fff;border:1px solid var(--rule);padding:22px 20px;min-height:180px;display:flex;gap:16px;align-items:flex-start}
  #admission .admission-step::before{content:counter(admissionStep,decimal-leading-zero);font-family:var(--serif);font-size:24px;font-weight:700;line-height:1;color:var(--crimson);flex:0 0 auto;margin-top:2px}
  #admission .admission-step h3{font-size:17px;margin:0 0 7px}
  #admission .admission-step p{font-size:14.2px;color:var(--muted);margin:0;line-height:1.68}
  #admission .admission-checklist{margin-top:16px;background:#fff;border:1px solid var(--rule);padding:22px 20px}
  #admission .admission-checklist h3{font-size:18px;margin:0 0 14px}
  #admission .admission-checklist .checks{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));column-gap:24px;row-gap:2px}
  #admission .admission-checklist .checks li{margin:0;padding-top:5px;padding-bottom:5px}
  @media(max-width:960px){#admission .admission-steps{grid-template-columns:repeat(2,minmax(0,1fr))}#admission .admission-checklist .checks{grid-template-columns:repeat(2,minmax(0,1fr))}}
  @media(max-width:620px){#admission .admission-steps{grid-template-columns:1fr}#admission .admission-step{min-height:0;padding:18px 16px}#admission .admission-checklist{padding:18px 16px}#admission .admission-checklist .checks{grid-template-columns:1fr}}
  </style>`;
  if (!html.includes('id="uis-admission-layout-style"')) html = html.replace('</head>', `${style}</head>`);

  const newSection = `<section class="sec" id="admission"><div class="wrap"><div class="sec__hd reveal"><span class="tag">입학 절차</span><h2>서류 제출부터 출국까지 다섯 단계</h2></div><ol class="admission-steps reveal"><li class="admission-step"><div><h3>지원서와 서류 제출</h3><p>UIS 지원에 필요한 서류를 준비한 뒤 TNS유학으로 보내 주세요. 최근 2개 학년 영문 성적표와 여권 사본 등 필요한 자료를 확인하고, 학교 제출 및 이후 절차를 안내해 드립니다.</p></div></li><li class="admission-step"><div><h3>학업 플랜과 조건부 입학허가서 수령</h3><p>학생별 학업 플랜, 인보이스, 조건부 입학허가서(CLOA)를 받습니다.</p></div></li><li class="admission-step"><div><h3>학비 납부 후 정식 입학허가서(LOA) 발급</h3><p>환불 규정을 확인한 뒤 인보이스 하단의 계좌로 납부합니다. 입금이 확인되면 정식 입학허가서와 영수증이 발급됩니다.</p></div></li><li class="admission-step"><div><h3>학생비자(Study Permit) 신청</h3><p>캐나다 입국 전 학생비자를 신청합니다. 심사 기간은 신청 국가에 따라 다릅니다.</p></div></li><li class="admission-step"><div><h3>출국 준비와 오리엔테이션</h3><p>비자 승인 후 출국을 준비합니다. 오리엔테이션 당일 영어 레벨 테스트, 프로필 사진 촬영, 은행 계좌 개설, 교복 수령, 서류 제출이 한 번에 진행됩니다.</p></div></li></ol><div class="admission-checklist reveal"><h3>필요 서류 체크리스트</h3><ul class="checks"><li>UIS 입학지원서</li><li>최근 2개 학년 영문 성적표 (원본 지참 권장)</li><li>여권 사본 (인적사항 면)</li><li>학생비자(Study Permit) 사본</li><li>영문 예방접종 증명서</li><li>보험 신청서 (학교에서 대행 가능)</li><li>IELTS 공식 성적표 (보유 시, 학업 플랜에 반영)</li></ul></div></div></section>`;

  html = html.replace(/<section class="sec" id="admission">[\s\S]*?<\/section>\s*<section class="sec sec--tint" id="news">/, `${newSection}\n<section class="sec sec--tint" id="news">`);

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html,{status:response.status,statusText:response.statusText,headers});
};

export const config = { path: ["/", "/index.html"] };
