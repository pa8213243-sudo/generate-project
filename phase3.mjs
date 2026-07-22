import fs from 'fs/promises';
import path from 'path';

const phase3Files = [
  // ==========================================
  // EXTENDED TYPESCRIPT SCHEMAS
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
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  portfolio: string;
  androidApp: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'Power BI' | 'Excel' | 'PowerPoint' | 'Web' | 'Android';
  featured: boolean;
  status: string;
  date: string;
  displayOrder: number;
  shortDescription: string;
  fullDescription?: string;
  businessProblem?: string;
  objective?: string;
  solution?: string;
  impact?: string;
  keyMetrics?: string[];
  skillsDemonstrated?: string[];
  toolsUsed: string[];
  technologies: string[];
  projectDuration?: string;
  projectType?: string;
  platform?: string;
  githubRepository?: string;
  liveDemo?: string;
  downloadLink?: string;
  caseStudyAvailable: boolean;
  link?: string;
  coverImage?: string;
  galleryImages?: string[];
  thumbnail?: string;
  categoryIcon?: string;
  tags?: string[];
  difficulty?: string;
  themeColor?: string;
  accentColor?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  certificateImage?: string;
  skills?: string[];
  category: string;
  displayOrder: number;
  featured: boolean;
}

export interface TimelineEvent {
  id: string;
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
  type: string;
  icon?: string;
  status: string;
}

export interface Skill {
  category: string;
  skill: string;
  level: string;
  icon?: string;
  displayOrder: number;
}`
  },
  // ==========================================
  // DATA: SOCIAL LINKS
  // ==========================================
  {
    path: 'public/data/social.json',
    content: `{
  "github": "https://github.com/pa8213243-sudo/ParvejPortfolio",
  "linkedin": "https://www.linkedin.com/in/parvej-alam-sulemanali-ansari-14808928b/",
  "email": "mailto:pa8213243@gmail.com",
  "portfolio": "https://playful-cheesecake-e15083.netlify.app/",
  "androidApp": "https://github.com/pa8213243-sudo/ParvejPortfolio/releases/download/v1.0.0/app-release.apk"
}`
  },
  // ==========================================
  // DATA: SKILLS
  // ==========================================
  {
    path: 'public/data/skills.json',
    content: `[
  {
    "category": "Data & Analytics Tools",
    "skill": "Power BI (DAX, Dashboards)",
    "level": "Advanced",
    "displayOrder": 1
  },
  {
    "category": "Data & Analytics Tools",
    "skill": "Advanced Excel & Power Query",
    "level": "Advanced",
    "displayOrder": 2
  },
  {
    "category": "Data & Analytics Tools",
    "skill": "SQL",
    "level": "Intermediate",
    "displayOrder": 3
  },
  {
    "category": "Financial Expertise",
    "skill": "Financial Planning & Analysis (FP&A)",
    "level": "Advanced",
    "displayOrder": 4
  },
  {
    "category": "Financial Expertise",
    "skill": "Financial Modeling",
    "level": "Advanced",
    "displayOrder": 5
  },
  {
    "category": "Financial Expertise",
    "skill": "Variance Analysis & Budgeting",
    "level": "Advanced",
    "displayOrder": 6
  }
]`
  },
  // ==========================================
  // DATA: TIMELINE
  // ==========================================
  {
    path: 'public/data/timeline.json',
    content: `[
  {
    "id": "t-1",
    "title": "School Education",
    "organization": "High School",
    "startDate": "2018",
    "endDate": "2021",
    "description": "Foundation years of learning.",
    "type": "Education",
    "status": "Completed"
  },
  {
    "id": "t-2",
    "title": "Bachelor of Commerce (Honours)",
    "organization": "N.C. Bodiwala & Prin. M.C. Desai Commerce College",
    "location": "Ahmedabad, Gujarat",
    "startDate": "2023",
    "endDate": "2027",
    "description": "Pursuing degree with focus on commerce, finance, and accounting. Currently in Semester 7.",
    "type": "Education",
    "status": "In Progress"
  },
  {
    "id": "t-3",
    "title": "CMA US Preparation",
    "organization": "Institute of Management Accountants (IMA) / Miles Education",
    "startDate": "2024",
    "endDate": "Present",
    "description": "Part 1 cleared in first attempt (380/500). Part 2 currently in progress. Mentored by industry professionals.",
    "type": "Certification",
    "status": "In Progress"
  },
  {
    "id": "t-4",
    "title": "FP&A Professional Experience",
    "organization": "Targeted Companies (India)",
    "startDate": "Future",
    "endDate": "Future",
    "description": "Acquiring 2 years of solid core experience in financial planning and analysis.",
    "type": "Experience",
    "status": "Future Goal"
  },
  {
    "id": "t-5",
    "title": "Strategic Finance & Oil/Gas Sector",
    "organization": "ADNOC / UAE Region",
    "startDate": "Future",
    "endDate": "Future",
    "description": "Targeting senior FP&A roles in Abu Dhabi National Oil Company (ADNOC) and broader UAE oil & gas sector.",
    "type": "Experience",
    "status": "Future Goal"
  }
]`
  },
  // ==========================================
  // DATA: CERTIFICATES
  // ==========================================
  {
    path: 'public/data/certificates.json',
    content: `[
  {
    "id": "cert-cma-1",
    "title": "US Certified Management Accountant (CMA) - Part 1 Cleared",
    "issuer": "Institute of Management Accountants (IMA)",
    "issueDate": "2026",
    "category": "Finance",
    "displayOrder": 1,
    "featured": true,
    "skills": ["Corporate Finance", "Cost Management", "Internal Controls"]
  },
  {
    "id": "cert-bcg",
    "title": "BCG Strategy Consulting Job Simulation",
    "issuer": "Forage",
    "issueDate": "TBD",
    "category": "Strategy",
    "displayOrder": 2,
    "featured": true
  },
  {
    "id": "cert-mna",
    "title": "M&A Job Simulation - Latham & Watkins",
    "issuer": "Forage",
    "issueDate": "TBD",
    "category": "Finance",
    "displayOrder": 3,
    "featured": false
  },
  {
    "id": "cert-powerbi",
    "title": "Microsoft Power BI Data Analyst Professional Certificate",
    "issuer": "Coursera",
    "issueDate": "TBD",
    "category": "Data Analytics",
    "displayOrder": 4,
    "featured": true,
    "skills": ["Power BI", "DAX", "Data Modeling"]
  },
  {
    "id": "cert-ima-ai",
    "title": "IMA Ethics of AI: Implications for the Management Accountant",
    "issuer": "Institute of Management Accountants",
    "issueDate": "April 2026",
    "category": "Finance / AI",
    "displayOrder": 5,
    "featured": false
  }
]`
  },
  // ==========================================
  // DATA: UPGRADED PROJECTS SCHEMA
  // ==========================================
  {
    path: 'public/data/projects.json',
    content: `[
  {
    "id": "pbi-uber",
    "slug": "uber-ride-analytics",
    "title": "Uber Ride Analytics Dashboard",
    "category": "Power BI",
    "featured": true,
    "status": "Completed",
    "date": "2025",
    "displayOrder": 1,
    "shortDescription": "Analyzed 93K+ ride bookings, 2.51M km travel data and $52M+ revenue.",
    "businessProblem": "Additional project insights will be added after reviewing the original file.",
    "objective": "Track revenue, rides, cancellations, ratings and vehicle performance via interactive dashboard.",
    "solution": "Used DAX measures and Power Query to automate calculations and data transformation.",
    "impact": "Enabled data-driven decisions leading to improved operational visibility.",
    "keyMetrics": ["93K+ Ride Bookings", "2.51M km Travel Data", "$52M+ Revenue"],
    "toolsUsed": ["Power BI", "DAX", "Power Query"],
    "technologies": ["Power BI Desktop"],
    "caseStudyAvailable": true,
    "coverImage": "/images/projects/uber-cover.jpg",
    "tags": ["Analytics", "Transportation", "Revenue Tracking"]
  },
  {
    "id": "pbi-hr",
    "slug": "hr-analytics-dashboard",
    "title": "HR Analytics Dashboard",
    "category": "Power BI",
    "featured": true,
    "status": "Completed",
    "date": "2025",
    "displayOrder": 2,
    "shortDescription": "Developed dashboard to analyze employee attrition, hiring trends, and department performance.",
    "businessProblem": "Additional project insights will be added after reviewing the original file.",
    "objective": "Build KPIs for attrition rate, headcount, and retention.",
    "solution": "Integrated multiple data sources into a unified Power BI dashboard.",
    "impact": "Helped HR team identify key trends and take proactive actions.",
    "toolsUsed": ["Power BI", "DAX", "Power Query"],
    "technologies": ["Power BI Desktop"],
    "caseStudyAvailable": true,
    "tags": ["HR", "Attrition", "KPI"]
  },
  {
    "id": "pbi-qa-ramco",
    "slug": "qa-ramco-financial",
    "title": "QA Ramco Financial Dashboard",
    "category": "Power BI",
    "featured": false,
    "status": "Completed",
    "date": "2025",
    "displayOrder": 3,
    "shortDescription": "Created financial KPI dashboard for revenue monitoring, collections and operational performance.",
    "impact": "Reduced manual reporting effort by 70%.",
    "toolsUsed": ["Power BI", "Power Query"],
    "technologies": ["Power BI Desktop"],
    "caseStudyAvailable": true
  },
  {
    "id": "pbi-croma",
    "slug": "croma-sales-dashboard",
    "title": "Croma Sales Dashboard",
    "category": "Power BI",
    "featured": false,
    "status": "Completed",
    "date": "2025",
    "displayOrder": 4,
    "shortDescription": "Built sales performance dashboard to analyze product category, region and monthly trends.",
    "impact": "Identified top-performing products and regions which improved inventory planning.",
    "toolsUsed": ["Power BI"],
    "technologies": ["Power BI Desktop"],
    "caseStudyAvailable": true
  },
  {
    "id": "pbi-flipkart",
    "slug": "flipkart-sales",
    "title": "Flipkart Sales Dashboard",
    "category": "Power BI",
    "featured": false,
    "status": "Completed",
    "date": "TBD",
    "displayOrder": 5,
    "shortDescription": "Additional project insights will be added after reviewing the original file.",
    "toolsUsed": ["Power BI"],
    "technologies": ["Power BI Desktop"],
    "caseStudyAvailable": true
  },
  {
    "id": "excel-business-analysis",
    "slug": "business-analysis",
    "title": "Business Analysis Dashboard",
    "category": "Excel",
    "featured": false,
    "status": "Completed",
    "date": "TBD",
    "displayOrder": 6,
    "shortDescription": "Additional project insights will be added after reviewing the original file.",
    "toolsUsed": ["Advanced Excel"],
    "technologies": ["Excel", "Pivot Tables", "Power Query"],
    "caseStudyAvailable": false,
    "liveDemo": "https://1drv.ms/x/c/25C3AC5424753CC0/IQDSKxCnOaQ7T6XgwsAH7Q2dAco3sSdhusbJ1Go1YYQ9kg8?e=IdQHt7"
  },
  {
    "id": "excel-financial-performance",
    "slug": "financial-performance",
    "title": "Financial Performance Analysis Dashboard",
    "category": "Excel",
    "featured": false,
    "status": "Completed",
    "date": "TBD",
    "displayOrder": 7,
    "shortDescription": "Additional project insights will be added after reviewing the original file.",
    "toolsUsed": ["Advanced Excel"],
    "technologies": ["Excel"],
    "caseStudyAvailable": false,
    "liveDemo": "https://1drv.ms/x/c/25C3AC5424753CC0/IQCk8lYOyo5vRrSzyKrhqtLzAX2-iLaL2ufh_etA?e=rl5H7m"
  },
  {
    "id": "ppt-bmw",
    "slug": "bmw-business-strategy",
    "title": "BMW Business Strategy",
    "category": "PowerPoint",
    "featured": true,
    "status": "Completed",
    "date": "TBD",
    "displayOrder": 8,
    "shortDescription": "Additional project insights will be added after reviewing the original file.",
    "toolsUsed": ["PowerPoint"],
    "technologies": ["Microsoft PowerPoint"],
    "caseStudyAvailable": false,
    "liveDemo": "https://1drv.ms/p/c/25C3AC5424753CC0/IQAmourAEOwiQJUDHGf7qSZYAfVf4LEpxkwfXU9dB2pTGQo?e=LMhjpH"
  },
  {
    "id": "ppt-apple",
    "slug": "apple-financial-analysis",
    "title": "Apple Financial Analysis",
    "category": "PowerPoint",
    "featured": true,
    "status": "Completed",
    "date": "TBD",
    "displayOrder": 9,
    "shortDescription": "Additional project insights will be added after reviewing the original file.",
    "toolsUsed": ["PowerPoint"],
    "technologies": ["Microsoft PowerPoint"],
    "caseStudyAvailable": false,
    "liveDemo": "https://1drv.ms/p/c/25C3AC5424753CC0/IQAv5uyBr_63SLD_TZgosAbQAcz_c0kmhqNCFwp7s9qMwSg?e=QaqexW"
  },
  {
    "id": "app-android",
    "slug": "android-app-portfolio",
    "title": "Android App",
    "category": "Android",
    "featured": false,
    "status": "Completed",
    "date": "TBD",
    "displayOrder": 10,
    "shortDescription": "Additional project insights will be added after reviewing the original file.",
    "toolsUsed": ["Android SDK"],
    "technologies": ["Java/Kotlin"],
    "caseStudyAvailable": false,
    "downloadLink": "https://github.com/pa8213243-sudo/ParvejPortfolio/releases/download/v1.0.0/app-release.apk"
  }
]`
  },
  // ==========================================
  // EXTENDED DATA SERVICE
  // ==========================================
  {
    path: 'services/dataService.ts',
    content: `import { PersonalInfo, Project, Certificate, TimelineEvent, Skill, SocialLinks } from '@/types';
import personalData from '@/public/data/personal.json';
import projectsData from '@/public/data/projects.json';
import certificatesData from '@/public/data/certificates.json';
import timelineData from '@/public/data/timeline.json';
import skillsData from '@/public/data/skills.json';
import socialData from '@/public/data/social.json';

export const getPersonalInfo = (): PersonalInfo => {
  return personalData as PersonalInfo;
};

export const getSocialLinks = (): SocialLinks => {
  return socialData as SocialLinks;
};

export const getProjects = (): Project[] => {
  return (projectsData as Project[]).sort((a, b) => a.displayOrder - b.displayOrder);
};

export const getProjectById = (id: string): Project | undefined => {
  return (projectsData as Project[]).find(p => p.id === id || p.slug === id);
};

export const getFeaturedProjects = (): Project[] => {
  return (projectsData as Project[]).filter(p => p.featured).sort((a, b) => a.displayOrder - b.displayOrder);
};

export const getProjectsByCategory = (category: Project['category']): Project[] => {
  return (projectsData as Project[]).filter(p => p.category === category).sort((a, b) => a.displayOrder - b.displayOrder);
};

export const getCertificates = (): Certificate[] => {
  return (certificatesData as Certificate[]).sort((a, b) => a.displayOrder - b.displayOrder);
};

export const getTimeline = (): TimelineEvent[] => {
  return timelineData as TimelineEvent[];
};

export const getSkills = (): Skill[] => {
  return (skillsData as Skill[]).sort((a, b) => a.displayOrder - b.displayOrder);
};`
  }
];

async function generatePhase3Upgrade() {
  console.log('🚀 INITIALIZING PHASE 3 ARCHITECTURE UPGRADE...');

  try {
    for (const file of phase3Files) {
      const dir = path.dirname(file.path);
      await fs.mkdir(dir, { recursive: true }); 
      await fs.writeFile(file.path, file.content, 'utf8');
      console.log(`✅ Upgraded file: ${file.path}`);
    }

    console.log('\n🎉 PHASE 3 FUTURE-PROOFING COMPLETE!');
    console.log('✅ 10/10 Architecture achieved. Zero UI hardcoding required.');
    console.log('\n➡️ Next Step: Let me know when this is done, so we can finally trigger Phase 4 (Boot Sequence & 3D Background)!');

  } catch (error) {
    console.error('❌ ERROR DURING UPGRADE:', error);
  }
}

generatePhase3Upgrade();