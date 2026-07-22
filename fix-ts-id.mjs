import fs from 'fs/promises';
import path from 'path';

async function fixTsCertId() {
  try {
    const dataPath = path.join(process.cwd(), 'services/dataService.ts');
    let content = await fs.readFile(dataPath, 'utf8');

    // Agar pehle se nahi hai toh add karo
    if (!content.includes('credentialId?: string;')) {
      content = content.replace(
        'export interface Certificate {',
        'export interface Certificate {\n  credentialId?: string;'
      );
      await fs.writeFile(dataPath, content, 'utf8');
      console.log('✅ BINGO! credentialId successfully added to Certificate interface!');
    } else {
      console.log('✅ credentialId is already there!');
    }
  } catch (err) {
    console.error('❌ Script Error:', err);
  }
}

fixTsCertId();