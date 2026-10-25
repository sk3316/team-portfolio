const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ICONS = [
  { id: 'sap', file: 'sap.svg', name: 'SAP', color: '#0090D6', fallback: 'SAP' },
  { id: 'aws', file: 'amazonaws.svg', name: 'AWS', color: '#FF9900', fallback: 'AWS' },
  { id: 'salesforce', file: 'salesforce.svg', name: 'Salesforce', color: '#00A1E0', fallback: 'SF' },
  { id: 'azure', file: 'microsoftazure.svg', name: 'Azure', color: '#0078D4', fallback: 'AZ' },
  { id: 'gcp', file: 'googlecloud.svg', name: 'Google Cloud', color: '#4285F4', fallback: 'GCP' },
  { id: 'mulesoft', file: 'mulesoft.svg', name: 'MuleSoft', color: '#00A0DF', fallback: 'MULE' },
  { id: 'kubernetes', file: 'kubernetes.svg', name: 'Kubernetes', color: '#326CE5', fallback: 'K8S' },
  { id: 'docker', file: 'docker.svg', name: 'Docker', color: '#2496ED', fallback: 'DOC' },
  { id: 'python', file: 'python.svg', name: 'Python', color: '#3776AB', fallback: 'PY' },
  { id: 'oracle', file: 'oracle.svg', name: 'Oracle', color: '#F80000', fallback: 'ORA' },
  { id: 'react', file: 'react.svg', name: 'React', color: '#61DAFB', fallback: 'REACT' },
];

function fetchSvg(file) {
  const url = `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${file}`;
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to fetch ${url}: ${res.statusCode}`));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const outDir = path.join(__dirname, '..', 'public', 'assets', 'badges');
  fs.mkdirSync(outDir, { recursive: true });

  const results = [];

  for (const icon of ICONS) {
    try {
      console.log(`Processing ${icon.id}...`);
      let svg = await fetchSvg(icon.file);

      // Colorize the SVG path with brand color
      if (!svg.includes('fill="')) {
        svg = svg.replace('<path ', `<path fill="${icon.color}" `);
      } else {
        svg = svg.replace(/fill="[^"]*"/, `fill="${icon.color}"`);
      }

      svg = svg.replace('<svg ', '<svg width="256" height="256" ');

      const pngBuffer = await sharp(Buffer.from(svg))
        .resize(160, 160, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer();

      const pngPath = path.join(outDir, `${icon.id}.png`);
      fs.writeFileSync(pngPath, pngBuffer);

      const base64 = `data:image/png;base64,${pngBuffer.toString('base64')}`;

      results.push({
        ...icon,
        pngPath: `/assets/badges/${icon.id}.png`,
        base64,
      });

      console.log(`Saved ${icon.id}.png (${pngBuffer.length} bytes)`);
    } catch (err) {
      console.error(`Error processing ${icon.id}:`, err.message);
    }
  }

  // Also create a crisp TOGAF architecture badge
  try {
    const togafSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
      <rect width="256" height="256" rx="36" fill="#0A4D68"/>
      <text x="128" y="152" fill="#FFFFFF" font-family="Calibri, Arial, sans-serif" font-size="64" font-weight="bold" text-anchor="middle" letter-spacing="4">TOGAF</text>
    </svg>`;
    const togafBuffer = await sharp(Buffer.from(togafSvg))
      .resize(160, 160, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    fs.writeFileSync(path.join(outDir, 'togaf.png'), togafBuffer);
    results.push({
      id: 'togaf',
      name: 'TOGAF',
      color: '#0A4D68',
      fallback: 'TG',
      pngPath: '/assets/badges/togaf.png',
      base64: `data:image/png;base64,${togafBuffer.toString('base64')}`,
    });
    console.log('Saved togaf.png');
  } catch (err) {
    console.error('Error creating togaf:', err.message);
  }

  // Write TypeScript badge definitions
  const dict = results.reduce((acc, curr) => {
    acc[curr.id] = {
      id: curr.id,
      name: curr.name,
      color: curr.color,
      fallbackText: curr.fallback,
      localPath: curr.pngPath,
      base64: curr.base64,
    };
    return acc;
  }, {});

  const tsContent = `// lib/pptx/badgeLogos.ts
// Embedded PNG data URIs for 100% offline & zero-CORS PPTX generation

export interface BadgeDefinition {
  id: string;
  name: string;
  color: string;
  fallbackText: string;
  localPath: string;
  base64: string;
}

export const BADGE_DEFINITIONS: Record<string, BadgeDefinition> = ${JSON.stringify(dict, null, 2)};

/**
 * Resolves any badge name, certification text, or alias to a known BadgeDefinition.
 */
export function resolveBadge(input: string): BadgeDefinition | null {
  if (!input || typeof input !== "string") return null;
  const s = input.trim().toLowerCase();

  // SAP family
  if (s.includes("sap") || s.includes("s/4") || s.includes("btp") || s.includes("cpi") || s.includes("hana")) {
    return BADGE_DEFINITIONS["sap"];
  }
  // AWS family
  if (s.includes("aws") || s.includes("amazon web services")) {
    return BADGE_DEFINITIONS["aws"];
  }
  // Salesforce family
  if (s.includes("salesforce") || s.includes("sfdc")) {
    return BADGE_DEFINITIONS["salesforce"];
  }
  // Microsoft Azure family
  if (s.includes("azure") || s.includes("microsoft certified")) {
    return BADGE_DEFINITIONS["azure"];
  }
  // Google Cloud family
  if (s.includes("google") || s.includes("gcp")) {
    return BADGE_DEFINITIONS["gcp"];
  }
  // MuleSoft family
  if (s.includes("mule") || s.includes("mulesoft")) {
    return BADGE_DEFINITIONS["mulesoft"];
  }
  // Kubernetes family
  if (s.includes("kube") || s.includes("k8s") || s.includes("ckad") || s.includes("cka")) {
    return BADGE_DEFINITIONS["kubernetes"];
  }
  // Docker family
  if (s.includes("docker")) {
    return BADGE_DEFINITIONS["docker"];
  }
  // TOGAF
  if (s.includes("togaf")) {
    return BADGE_DEFINITIONS["togaf"];
  }
  // Python
  if (s.includes("python")) {
    return BADGE_DEFINITIONS["python"];
  }
  // Oracle
  if (s.includes("oracle")) {
    return BADGE_DEFINITIONS["oracle"];
  }
  // React
  if (s.includes("react")) {
    return BADGE_DEFINITIONS["react"];
  }

  // Exact ID check
  if (BADGE_DEFINITIONS[s]) {
    return BADGE_DEFINITIONS[s];
  }

  return null;
}
`;

  const tsPath = path.join(__dirname, '..', 'lib', 'pptx', 'badgeLogos.ts');
  fs.writeFileSync(tsPath, tsContent, 'utf8');
  console.log(`Generated ${tsPath} successfully! Total badges: ${results.length}`);
}

run();
