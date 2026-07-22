import fs from 'fs/promises';
import path from 'path';

async function deleteSkillsBlock() {
  try {
    const pagePath = path.join(process.cwd(), 'app/certificates/page.tsx');
    let content = await fs.readFile(pagePath, 'utf8');

    // This regex looks for the {cert.skills && ...} block and deletes it completely
    const skillsBlockRegex = /\{cert\.skills\s*&&\s*\([\s\S]*?\}\s*\)\}/g;
    
    if (skillsBlockRegex.test(content)) {
      content = content.replace(skillsBlockRegex, '');
      await fs.writeFile(pagePath, content, 'utf8');
      console.log('✅ BINGO! The "skills" code block has been completely deleted from the page!');
    } else {
      console.log('✅ The "skills" block is already gone.');
    }
  } catch (err) {
    console.error('❌ Script Error:', err);
  }
}

deleteSkillsBlock();