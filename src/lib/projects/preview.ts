export function generateFallbackSvg(title: string, host: string): string {
  const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const safeHost = host.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0c0c18"/>
      <stop offset="50%" stop-color="#12121e"/>
      <stop offset="100%" stop-color="#1a1a2e"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8b7cf5"/>
      <stop offset="100%" stop-color="#a99ef0"/>
    </linearGradient>
  </defs>
  
  <rect width="1280" height="720" fill="url(#bg)"/>
  
  <!-- Grid Lines -->
  <g stroke="rgba(139, 124, 245, 0.08)" stroke-width="1">
    <line x1="0" y1="180" x2="1280" y2="180"/>
    <line x1="0" y1="360" x2="1280" y2="360"/>
    <line x1="0" y1="540" x2="1280" y2="540"/>
    <line x1="320" y1="0" x2="320" y2="720"/>
    <line x1="640" y1="0" x2="640" y2="720"/>
    <line x1="960" y1="0" x2="960" y2="720"/>
  </g>

  <!-- Top bar -->
  <rect x="0" y="0" width="1280" height="6" fill="url(#accent)"/>

  <!-- Main Content Card -->
  <rect x="240" y="180" width="800" height="360" rx="20" fill="rgba(7, 7, 15, 0.7)" stroke="rgba(139, 124, 245, 0.2)" stroke-width="2"/>
  
  <!-- Icon Circle -->
  <circle cx="640" cy="270" r="40" fill="rgba(139, 124, 245, 0.15)" stroke="#8b7cf5" stroke-width="2"/>
  <path d="M625 270 L655 270 M645 260 L655 270 L645 280" stroke="#a99ef0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

  <!-- Title & Host Text -->
  <text x="640" y="360" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="800" fill="#ffffff" text-anchor="middle">
    ${safeTitle}
  </text>

  <text x="640" y="410" font-family="monospace, sans-serif" font-size="20" font-weight="600" fill="#8b7cf5" text-anchor="middle">
    https://${safeHost}
  </text>
  
  <text x="640" y="470" font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="#8a8ab0" text-anchor="middle">
    Clique para acessar a demonstração ao vivo
  </text>
</svg>`
}
