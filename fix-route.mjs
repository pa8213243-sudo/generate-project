import fs from 'fs/promises';
import path from 'path';

async function fixRoutingConflict() {
  const slugPath = path.join(process.cwd(), 'app/projects/[slug]');
  
  try {
    // Purana [slug] folder delete kar rahe hain
    await fs.rm(slugPath, { recursive: true, force: true });
    console.log('✅ BINGO! Purana conflicting [slug] folder delete ho gaya!');
  } catch (err) {
    console.log('ℹ️ [slug] folder nahi mila, sab theek hai.');
  }
}

fixRoutingConflict();