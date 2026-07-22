import fs from 'fs/promises';
import path from 'path';

async function fixTypescript() {
  try {
    const dataPath = path.join(process.cwd(), 'services/dataService.ts');
    let content = await fs.readFile(dataPath, 'utf8');

    // Check if it's already fixed
    if (content.includes('export interface Certificate')) {
      console.log('✅ Already fixed!');
      return;
    }

    const targetIndex = content.indexOf('export function getCertificates()');
    if (targetIndex !== -1) {
      const topPart = content.slice(0, targetIndex);
      
      const newBottomPart = `export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  credentialUrl?: string;
  verificationUrl?: string;
  image?: string;
  badgeImage?: string;
  certificateImage?: string;
}

export function getCertificates(): Certificate[] {
  return [
    { id: "cma-part1", title: "US CMA Part 1 Cleared (380/500)", issuer: "IMA", date: "2024", category: "Professional" },
    { id: "power-bi-cert", title: "Microsoft Power BI Data Analyst Professional", issuer: "Coursera", date: "2024", category: "Analytics" }
  ];
}
`;
      await fs.writeFile(dataPath, topPart + newBottomPart, 'utf8');
      console.log('✅ BINGO! TypeScript Error completely fixed in dataService.ts');
    } else {
      console.log('❌ Error: Could not find getCertificates function.');
    }
  } catch (err) {
    console.error('❌ Script Error:', err);
  }
}

fixTypescript();