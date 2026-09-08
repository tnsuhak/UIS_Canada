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

  // Keep the school video library curated. These older/general videos were
  // explicitly removed from the user-visible /videos.html page.
  const pathname = new URL(request.url).pathname;
  if (pathname === "/videos.html") {
    const removedVideoIds = ["5MoAe5azjf0", "Cwy1yaxxjTU", "k859ommyDOI"];
    for (const id of removedVideoIds) {
      const cardPattern = new RegExp(
        `<article class="video-card">(?:(?!<article class="video-card">)[\\s\\S])*?${id}(?:(?!<article class="video-card">)[\\s\\S])*?<\\/article>\\s*`,
        "g"
      );
      html = html.replace(cardPattern, "");
    }

    html = html.replace(
      "학교 소개, 캠퍼스 투어, 숙소·기숙사 후기, 학생 관리, 학부모 소통, 학생 인터뷰, 중등부, 여름 과정, 페스티벌, 졸업식·Prom 영상을 페이지 안에서 바로 확인하세요.",
      "숙소·기숙사 후기, 학생 관리, 학부모 소통, 학생 인터뷰, 중등부, 페스티벌, 졸업식·Prom 영상을 페이지 안에서 바로 확인하세요."
    );
    html = html.replace(
      "캠퍼스와 숙소, 학교생활, 학생 관리, 학부모 상담, 중등부와 여름 과정, 졸업식·Prom 행사까지 관련 영상을 이 페이지 안에서 바로 재생할 수 있습니다.",
      "숙소와 학교생활, 학생 관리, 학부모 상담, 중등부, 페스티벌, 졸업식·Prom 행사까지 관련 영상을 이 페이지 안에서 바로 재생할 수 있습니다."
    );
    html = html.replace(
      "학생 인터뷰와 국제학생의 일상, 중등부 학교생활, 여름 집중 과정, 페스티벌, 졸업식과 Prom 등 실제 UIS 생활을 영상으로 볼 수 있습니다.",
      "학생 인터뷰와 국제학생의 일상, 중등부 학교생활, 페스티벌, 졸업식과 Prom 등 실제 UIS 생활을 영상으로 볼 수 있습니다."
    );
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
