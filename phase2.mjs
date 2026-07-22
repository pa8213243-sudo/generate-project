import fs from 'fs/promises';
import path from 'path';

const phase3Files = [
  // ==========================================
  // PHASE 3: TYPESCRIPT INTERFACES
  // ==========================================
  {
    path: 'types/index.ts',
    content: `export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
  education: {
    degree: string;
    institution: string;
    timeline: string;
    details: string;
  }[];
  socials: {
    github: string;
    linkedin: string;
  };
}

export interface Project {
  id: string;
  title: string;
  category: 'Power BI' | 'Excel' | 'PowerPoint' | 'Web' | 'Android';
  shortDescription: string;
  fullDescription?: string;
  keyInsights?: string[];
  toolsUsed: string[];
  link?: string;
  imagePlaceholder?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  status?: string;
}`
  },
  // ==========================================
  // PHASE 3: DATA LAYER (PERSONAL INFO)
  // ==========================================
  {
    path: 'public/data/personal.json',
    content: `{
  "name": "Parvej Alam Sulemanali Ansari",
  "email": "pa8213243@gmail.com",
  "phone": "+91 7383075193",
  "location": "Ahmedabad, Gujarat, India",
  "title": "CMA (US) Candidate | FP&A | Strategic Finance | Business Intelligence",
  "summary": "CMA (US) Candidate with Part 1 cleared (380/500) and a strong foundation in Financial Planning & Analysis (FP&A), Strategic Finance, Financial Reporting, and Business Intelligence. Experienced in building interactive dashboards, financial models, and data-driven reports using Power BI, Advanced Excel, and Power Query.",
  "education": [
    {
      "degree": "US CMA",
      "institution": "Institute of Management Accountants (IMA)",
      "timeline": "Current",
      "details": "Part 1 Cleared in the First Attempt (380/500). Part 2 in Progress."
    },
    {
      "degree": "Bachelor of Commerce (Honours)",
      "institution": "N.C. Bodiwala & Prin. M.C. Desai Commerce College",
      "timeline": "2023 - 2027",
      "details": "Current Semester: 7"
    }
  ],
  "socials": {
    "github": "https://github.com/pa8213243-sudo/ParvejPortfolio",
    "linkedin": "https://www.linkedin.com/in/parvej-alam-sulemanali-ansari-14808928b/"
  }
}`
  },
  // ==========================================
  // PHASE 3: DATA LAYER (PROJECTS VAULT)
  // ==========================================
  {
    path: 'public/data/projects.json',
    content: `[
  {
    "id": "pbi-uber",
    "title": "Uber Ride Analytics Dashboard",
    "category": "Power BI",
    "shortDescription": "Analyzed 93K+ ride bookings, 2.51M km travel data and $52M+ revenue.",
    "keyInsights": [
      "Built an interactive dashboard to track revenue, rides, cancellations, ratings and vehicle performance.",
      "Used DAX measures and Power Query to automate calculations and data transformation.",
      "Enabled data-driven decisions leading to improved operational visibility."
    ],
    "toolsUsed": ["Power BI", "DAX", "Power Query"],
    "imagePlaceholder": "Uber"
  },
  {
    "id": "pbi-hr",
    "title": "HR Analytics Dashboard",
    "category": "Power BI",
    "shortDescription": "Developed dashboard to analyze employee attrition, hiring trends, and department performance.",
    "keyInsights": [
      "Integrated multiple data sources and built KPIs for attrition rate, headcount, and retention.",
      "Helped HR team identify key trends and take proactive actions."
    ],
    "toolsUsed": ["Power BI", "DAX", "Power Query"],
    "imagePlaceholder": "HR"
  },
  {
    "id": "pbi-qa-ramco",
    "title": "QA Ramco Financial Dashboard",
    "category": "Power BI",
    "shortDescription": "Created financial KPI dashboard for revenue monitoring, collections and operational performance.",
    "keyInsights": [
      "Automated reporting process using Power Query which reduced manual effort by 70%.",
      "Improved data visibility and accuracy for management decision-making."
    ],
    "toolsUsed": ["Power BI", "Power Query"],
    "imagePlaceholder": "QA Ramco"
  },
  {
    "id": "pbi-croma",
    "title": "Croma Sales Dashboard",
    "category": "Power BI",
    "shortDescription": "Built sales performance dashboard to analyze product category, region and monthly trends.",
    "keyInsights": [
      "Identified top-performing products and regions which improved inventory planning and sales strategy.",
      "Delivered actionable insights that supported business growth."
    ],
    "toolsUsed": ["Power BI"],
    "imagePlaceholder": "Croma"
  },
  {
    "id": "pbi-flipkart",
    "title": "Flipkart Sales Dashboard",
    "category": "Power BI",
    "shortDescription": "Additional project insights will be added after reviewing the original file.",
    "toolsUsed": ["Power BI"],
    "imagePlaceholder": "Flipkart"
  },
  {
    "id": "excel-business-analysis",
    "title": "Business Analysis Dashboard",
    "category": "Excel",
    "shortDescription": "Additional project insights will be added after reviewing the original file.",
    "toolsUsed": ["Advanced Excel"],
    "link": "https://1drv.ms/x/c/25C3AC5424753CC0/IQDSKxCnOaQ7T6XgwsAH7Q2dAco3sSdhusbJ1Go1YYQ9kg8?e=IdQHt7"
  },
  {
    "id": "excel-financial-performance",
    "title": "Financial Performance Analysis Dashboard",
    "category": "Excel",
    "shortDescription": "Additional project insights will be added after reviewing the original file.",
    "toolsUsed": ["Advanced Excel"],
    "link": "https://1drv.ms/x/c/25C3AC5424753CC0/IQCk8lYOyo5vRrSzyKrhqtLzAX2-iLaL2ufh_etA?e=rl5H7m"
  },
  {
    "id": "excel-huskin-motor",
    "title": "Huskin Motor Sales Analysis Dashboard",
    "category": "Excel",
    "shortDescription": "Additional project insights will be added after reviewing the original file.",
    "toolsUsed": ["Advanced Excel"],
    "link": "https://1drv.ms/x/c/25C3AC5424753CC0/IQCBkr4p3sKyS56DqLOhEZuRAaA8pCvzItA3AiHdqcJgp7g?e=qZBhXd"
  },
  {
    "id": "ppt-bmw",
    "title": "BMW Business Strategy",
    "category": "PowerPoint",
    "shortDescription": "Additional project insights will be added after reviewing the original file.",
    "toolsUsed": ["PowerPoint"],
    "link": "https://1drv.ms/p/c/25C3AC5424753CC0/IQAmourAEOwiQJUDHGf7qSZYAfVf4LEpxkwfXU9dB2pTGQo?e=LMhjpH"
  },
  {
    "id": "ppt-m-and-a",
    "title": "Mergers & Acquisitions",
    "category": "PowerPoint",
    "shortDescription": "Additional project insights will be added after reviewing the original file.",
    "toolsUsed": ["PowerPoint"],
    "link": "https://1drv.ms/p/c/25C3AC5424753CC0/IQB2hXrTbZwZQLNkoTf7Xn1YAe96XVWz1uEPRSrixTJE_Zs?e=ln0t90"
  },
  {
    "id": "ppt-portfolio-growth",
    "title": "Portfolio Growth Advisory",
    "category": "PowerPoint",
    "shortDescription": "Additional project insights will be added after reviewing the original file.",
    "toolsUsed": ["PowerPoint"],
    "link": "https://1drv.ms/p/c/25C3AC5424753CC0/IQCSxydBJmicT7_DSyuWeGo7ARuZw8mRYgFb_oWF8VSPfL0?e=XyEGsx"
  },
  {
    "id": "ppt-india",
    "title": "Incredible India",
    "category": "PowerPoint",
    "shortDescription": "Additional project insights will be added after reviewing the original file.",
    "toolsUsed": ["PowerPoint"],
    "link": "https://1drv.ms/p/c/25C3AC5424753CC0/IQDEKJ_O6YBuQ6SP9hNsOxWPAVNdQ0FaHSV2ru-boRnHlbo?e=uMAoLc"
  },
  {
    "id": "ppt-apple",
    "title": "Apple Financial Analysis",
    "category": "PowerPoint",
    "shortDescription": "Additional project insights will be added after reviewing the original file.",
    "toolsUsed": ["PowerPoint"],
    "link": "https://1drv.ms/p/c/25C3AC5424753CC0/IQAv5uyBr_63SLD_TZgosAbQAcz_c0kmhqNCFwp7s9qMwSg?e=QaqexW"
  },
  {
    "id": "ppt-microsoft",
    "title": "Microsoft SWOT Analysis",
    "category": "PowerPoint",
    "shortDescription": "Additional project insights will be added after reviewing the original file.",
    "toolsUsed": ["PowerPoint"],
    "link": "https://1drv.ms/p/c/25C3AC5424753CC0/IQClIMidZ9ueSrevjCe3F-wgAYrLegldECzmzZPwErkD3lY?e=6ZrIcg"
  },
  {
    "id": "ppt-amazon",
    "title": "Amazon Market Expansion Strategy",
    "category": "PowerPoint",
    "shortDescription": "Additional project insights will be added after reviewing the original file.",
    "toolsUsed": ["PowerPoint"],
    "link": "https://1drv.ms/p/c/25C3AC5424753CC0/IQByaJW9Nvd_RLExbFZqHVWcAflaxd-ndo7PidNSpZnAiQ4?e=0EhDah"
  },
  {
    "id": "ppt-tesla",
    "title": "Tesla Business Strategy",
    "category": "PowerPoint",
    "shortDescription": "Additional project insights will be added after reviewing the original file.",
    "toolsUsed": ["PowerPoint"],
    "link": "https://1drv.ms/p/c/25C3AC5424753CC0/IQDGYxTvH-bxQYlszHiyxrBjAduoqxZ3QgCu6FjriXpGtBI?e=11QS41"
  },
  {
    "id": "app-android",
    "title": "Android App",
    "category": "Android",
    "shortDescription": "Additional project insights will be added after reviewing the original file.",
    "toolsUsed": ["Android"],
    "link": "https://github.com/pa8213243-sudo/ParvejPortfolio/releases/download/v1.0.0/app-release.apk"
  }
]`
  },
  // ==========================================
  // PHASE 3: DATA SERVICE FETCHER
  // ==========================================
  {
    path: 'services/dataService.ts',
    content: `import { PersonalInfo, Project } from '@/types';
import personalData from '@/public/data/personal.json';
import projectsData from '@/public/data/projects.json';

export const getPersonalInfo = (): PersonalInfo => {
  return personalData as PersonalInfo;
};

export const getProjects = (): Project[] => {
  return projectsData as Project[];
};

export const getProjectsByCategory = (category: Project['category']): Project[] => {
  return (projectsData as Project[]).filter(p => p.category === category);
};`
  }
];

async function generatePhase3() {
  console.log('🚀 INITIALIZING PHASE 3: DATA LAYER...');

  try {
    for (const file of phase3Files) {
      const dir = path.dirname(file.path);
      await fs.mkdir(dir, { recursive: true }); 
      await fs.writeFile(file.path, file.content, 'utf8');
      console.log(`✅ Generated/Updated file: ${file.path}`);
    }

    console.log('\n🎉 PHASE 3 DATA VAULTS SECURED!');
    console.log('Your Non-Assumption Policy is strictly active. External links have been safely stored.');
    console.log('\n➡️ Next Step: Let me know when this is done so we can build the 3D Space Background and Boot Sequence (Phase 4)!');

  } catch (error) {
    console.error('❌ ERROR DURING SCAFFOLDING:', error);
  }
}

generatePhase3();