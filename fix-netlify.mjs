import fs from 'fs/promises';
import path from 'path';

async function fixNetlifyBuild() {
  try {
    // 1. Fix the double quotes issue in app/page.tsx
    const pagePath = path.join(process.cwd(), 'app/page.tsx');
    let pageContent = await fs.readFile(pagePath, 'utf8');
    
    // Replace raw quotes with safe HTML entities
    pageContent = pageContent.replace(
      /"The goal is not to be in the best company, but to build something that outlives me."/g,
      '&quot;The goal is not to be in the best company, but to build something that outlives me.&quot;'
    );
    await fs.writeFile(pagePath, pageContent, 'utf8');
    console.log('✅ BINGO! Fixed unescaped double quotes in app/page.tsx');

    // 2. Fix the <img> warning in app/projects/[id]/page.tsx
    const projectPagePath = path.join(process.cwd(), 'app/projects/[id]/page.tsx');
    let projectPageContent = await fs.readFile(projectPagePath, 'utf8');
    
    // Tell ESLint to ignore the standard <img> tag warning
    if (!projectPageContent.includes('eslint-disable-next-line @next/next/no-img-element')) {
      projectPageContent = projectPageContent.replace(
        /<img src=\{project\.image\}/g,
        '{/* eslint-disable-next-line @next/next/no-img-element */}\n          <img src={project.image}'
      );
      await fs.writeFile(projectPagePath, projectPageContent, 'utf8');
      console.log('✅ BINGO! Suppressed image warning in project page.');
    }

  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

fixNetlifyBuild();