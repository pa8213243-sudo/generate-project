import fs from 'fs/promises';
import path from 'path';

async function fixAllTsErrors() {
  try {
    const dataPath = path.join(process.cwd(), 'services/dataService.ts');
    let content = await fs.readFile(dataPath, 'utf8');

    // Regex to find and replace the complete Certificate interface
    const interfaceRegex = /export interface Certificate \{[\s\S]*?\}/;
    
    const fullInterface = `export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  credentialId?: string;
  credentialUrl?: string;
  verificationUrl?: string;
  image?: string;
  badgeImage?: string;
  certificateImage?: string;
  skills?: string[];
  description?: string;
}`;

    if (interfaceRegex.test(content)) {
      content = content.replace(interfaceRegex, fullInterface);
      await fs.writeFile(dataPath, content, 'utf8');
      console.log('✅ BINGO! Master Fix Applied: All possible properties added to Certificate interface!');
    } else {
      console.log('❌ Error: Could not find Certificate interface.');
    }
  } catch (err) {
    console.error('❌ Script Error:', err);
  }
}

fixAllTsErrors();