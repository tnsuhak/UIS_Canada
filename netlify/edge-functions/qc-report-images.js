export default async (request) => {
  const url = new URL(request.url);
  const isLunch = url.pathname.endsWith('/uis-qc-lunch-inspection-anonymized.webp');
  const sourcePath = isLunch ? '/assets/qc/lunch-a.txt' : '/assets/qc/homestay-a.txt';

  const sourceUrl = new URL(sourcePath, request.url);
  const source = await fetch(sourceUrl, { cache: 'no-store' });
  if (!source.ok) {
    return new Response('QC report image not found', { status: 404 });
  }

  const b64 = (await source.text()).replace(/\s+/g, '');
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new Response(bytes, {
    status: 200,
    headers: {
      'content-type': 'image/avif',
      'cache-control': 'no-store, max-age=0'
    }
  });
};

export const config = {
  path: [
    '/assets/uis-qc-lunch-inspection-anonymized.webp',
    '/assets/uis-qc-homestay-inspection-anonymized.webp'
  ]
};
