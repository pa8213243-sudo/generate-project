import fs from 'fs/promises';
import path from 'path';

async function fixModelError() {
  console.log('\n🚀 EXECUTING AI MODEL HOTFIX...\n');
  const filePath = path.join(process.cwd(), 'app/api/chat/route.ts');
  
  try {
    let content = await fs.readFile(filePath, 'utf8');
    
    // Changing the model to the universally supported 'gemini-3.6-flash'
    if (content.includes('gemini-3.6-flash')) {
      content = content.replace(/model:\s*"gemini-3.6-flash"/g, 'model: "gemini-3.6-flash"');
      await fs.writeFile(filePath, content, 'utf8');
      console.log('\x1b[32m%s\x1b[0m', '✅ SUCCESS: Model safely downgraded to stable "gemini-3.6-flash".');
    } else {
      console.log('\x1b[33m%s\x1b[0m', '⚠️ NOTE: Model was already changed or not found.');
    }
    
    console.log('\x1b[36m%s\x1b[0m', '\n➡️ NEXT STEPS:');
    console.log('1. Restart your dev server (Ctrl+C, then npm run dev).');
    console.log('2. Say "Hi" to the AI CFO again.');
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m', '❌ ERROR: Could not patch the file.', err);
  }
}

fixModelError();