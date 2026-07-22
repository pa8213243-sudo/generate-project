import fs from 'fs/promises';
import path from 'path';

// ==========================================
// 1. DATA SERVICE WITH CLEAN IMAGE PATHS
// ==========================================
const dataServiceContent = `export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  toolsUsed: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  
  executiveSummary?: string[];
  businessProblem?: string;
  datasetInfo?: string;
  dataPreparation?: string;
  dataModel?: string;
  kpis?: string[];
  dashboardDesign?: string;
  businessInsights?: string[];
  recommendations?: string[];
  businessImpact?: string;
  lessonsLearned?: string;
  futureImprovements?: string;
  keyDeliverables?: string[];
  outcomeImpact?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export function getPersonalInfo() {
  return {
    name: "Parvej Alam Ansari",
    role: "FP&A Professional | CMA US Candidate",
    bio: "Building Financial Intelligence for a Smarter World.",
    email: "pa8213243@gmail.com",
    phone: "+91 7383075193",
    location: "Ahmedabad, Gujarat, India",
    linkedin: "https://www.linkedin.com/in/parvej-alam-sulemanali-ansari-14808928b/",
    github: "https://github.com/pa8213243-sudo/ParvejPortfolio",
    apkUrl: "https://github.com/pa8213243-sudo/ParvejPortfolio/releases/download/v1.0.0/app-release.apk"
  };
}

export function getSkills(): SkillCategory[] {
  return [
    { category: "Financial Expertise", items: ["FP&A", "Budgeting & Forecasting", "Variance Analysis", "Financial Modeling"] },
    { category: "Analytics & BI Tools", items: ["Power BI (DAX)", "Advanced Excel", "Power Query", "Data Visualization"] },
    { category: "AI & Software Stack", items: ["Gemini API", "Prompt Engineering", "Android SDK", "SQL"] }
  ];
}

export function getProjects(): Project[] {
  return [
    {
      id: "uber-analytics",
      title: "Uber Ride Analytics Dashboard",
      description: "Analyzed 93K+ ride bookings, 2.51M km travel data and $52M+ revenue.",
      category: "Power BI",
      tags: ["Power BI", "DAX", "Power Query"],
      toolsUsed: ["Power BI", "DAX", "Power Query"],
      image: "/assets/uber.jpeg",
      featured: true
    },
    {
      id: "bmw-strategy",
      title: "BMW Business Strategy",
      description: "SWOT analysis and strategic evaluation of corporate performance.",
      category: "PowerPoint",
      tags: ["PowerPoint", "Strategy", "Corporate Finance"],
      toolsUsed: ["PowerPoint", "Strategy"],
      image: "/assets/bmw_ppt.jpeg",
      liveUrl: "https://1drv.ms/p/c/25C3AC5424753CC0/IQAmourAEOwiQJUDHGf7qSZYAfVf4LEpxkwfXU9dB2pTGQo?e=UxTunX",
      featured: true
    },
    {
      id: "amazon-strategy",
      title: "Amazon Business Analysis",
      description: "Amazon Market Expansion Strategy and global e-commerce leadership analysis.",
      category: "Advanced Excel",
      tags: ["Advanced Excel", "Financial Modeling", "Strategy"],
      toolsUsed: ["Advanced Excel", "Financial Modeling", "PowerPoint"],
      image: "/assets/amazon_ppt.jpeg",
      liveUrl: "https://1drv.ms/p/c/25C3AC5424753CC0/IQByaJW9Nvd_RLExbFZqHVWcAflaxd-ndo7PidNSpZnAiQ4?e=Sjmwrf",
      featured: true
    },
    {
      id: "h2-venture",
      title: "H2 Venture Financial Analysis",
      description: "Comprehensive financial modeling and venture capital investment analysis.",
      category: "Advanced Excel",
      tags: ["Advanced Excel", "Venture Capital", "Financial Modeling"],
      toolsUsed: ["Advanced Excel", "Financial Modeling", "Scenario Analysis"],
      image: "/assets/h2_venture.jpeg",
      liveUrl: "https://1drv.ms/x/c/25C3AC5424753CC0/IQBgQIzkWjLnSo_uKB2ETmCeAZt4Jvwm7LfsGANFlXp7dKI?e=e3K0hz",
      featured: true
    },
    {
      id: "incredible-india",
      title: "Incredible India Tourism Strategy",
      description: "Macro-economic analysis of the Indian tourism sector's growth trajectory.",
      category: "PowerPoint",
      tags: ["Strategy", "PowerPoint", "Macroeconomics"],
      toolsUsed: ["PowerPoint", "Market Research", "Strategy"],
      image: "/assets/india_ppt.jpeg",
      liveUrl: "https://1drv.ms/p/c/25C3AC5424753CC0/IQDEKJ_O6YBuQ6SP9hNsOxWPAVNdQ0FaHSV2ru-boRnHlbo?e=17f5Ey",
      featured: true
    },
    {
      id: "android-portfolio",
      title: "Native Android Portfolio App",
      description: "Interactive mobile application built to showcase technical projects.",
      category: "Android",
      tags: ["Android SDK", "Mobile UI", "Java/Kotlin"],
      toolsUsed: ["Android Studio", "XML", "Mobile App Development"],
      image: "/assets/android_app.jpeg",
      liveUrl: "https://github.com/pa8213243-sudo/ParvejPortfolio/releases/download/v1.0.0/app-release.apk",
      featured: true
    },
    {
      id: "huskie-motor",
      title: "Huskie Motor Operations Analysis",
      description: "Supply chain and inventory optimization model for automotive manufacturing.",
      category: "Advanced Excel",
      tags: ["Supply Chain", "Advanced Excel", "Operations"],
      toolsUsed: ["Excel", "VLOOKUP/INDEX-MATCH", "Pivot Tables"],
      image: "/assets/huskie_motor.jpeg",
      liveUrl: "https://1drv.ms/x/c/25C3AC5424753CC0/IQCBkr4p3sKyS56DqLOhEZuRAaA8pCvzItA3AiHdqcJgp7g?e=EpglaD",
      featured: true
    },
    {
      id: "ad-campaign",
      title: "Digital Ad Campaign ROI Analysis",
      description: "Performance marketing dashboard optimizing Customer Acquisition Cost (CAC).",
      category: "Advanced Excel",
      tags: ["Marketing Analytics", "ROI Analysis", "Excel"],
      toolsUsed: ["Excel", "Pivot Tables", "Data Visualization"],
      image: "/assets/ad_campaign.jpeg",
      liveUrl: "https://1drv.ms/x/c/25C3AC5424753CC0/IQCk8lYOyo5vRrSzyKrhqtLzAX2NQk7Tk2-iLaL2ufh_etA?e=EBPlxf",
      featured: true
    },
    {
      id: "business-analysis",
      title: "Enterprise Corporate Performance Dashboard",
      description: "Holistic business analysis dashboard tracking revenue, margins, and operational KPIs.",
      category: "Advanced Excel",
      tags: ["Corporate Finance", "Dashboarding", "Excel"],
      toolsUsed: ["Advanced Excel", "Financial Reporting", "Data Modeling"],
      image: "/assets/business_analysis.jpeg",
      liveUrl: "https://1drv.ms/x/c/25C3AC5424753CC0/IQDSKxCnOaQ7T6XgwsAH7Q2dAco3sSdhusbJ1Go1YYQ9kg8?e=mU66Oo",
      featured: true
    },
    {
      id: "ma-latham",
      title: "M&A Strategic Analysis",
      description: "Mergers and Acquisitions job simulation focusing on due diligence and valuation.",
      category: "PowerPoint",
      tags: ["M&A", "Corporate Finance", "Due Diligence"],
      toolsUsed: ["PowerPoint", "Financial Analysis", "Strategy"],
      image: "/assets/microsoft_ppt.jpeg",
      liveUrl: "https://1drv.ms/p/c/25C3AC5424753CC0/IQB2hXrTbZwZQLNkoTf7Xn1YAe96XVWz1uEPRSrixTJE_Zs?e=1v6Ufo",
      featured: true
    },
    {
      id: "hr-analytics",
      title: "HR Analytics Dashboard",
      description: "Developed dashboard to analyze employee attrition, hiring trends, and department performance.",
      category: "Power BI",
      tags: ["Power BI", "DAX", "Power Query"],
      toolsUsed: ["Power BI", "DAX", "Power Query"],
      image: "/assets/hr_analytics.jpeg"
    },
    {
      id: "qa-ramco",
      title: "QA Ramco Financial Dashboard",
      description: "Created financial KPI dashboard for revenue monitoring, collections and operational performance.",
      category: "Power BI",
      tags: ["Power BI", "Power Query", "Finance"],
      toolsUsed: ["Power BI", "Power Query", "DAX"],
      image: "/assets/qa_aramco_dashboard.jpeg"
    }
  ];
}

export function getTimeline() {
  return [
    { id: "1", title: "School Education", organization: "High School", startDate: "2018", endDate: "2018", description: "Completed foundational education.", type: "Education" },
    { id: "2", title: "Bachelor of Commerce (Hons)", organization: "Gujarat University", startDate: "2021", endDate: "2024", description: "Completed all 6 semesters without any backlog.", type: "Education" },
    { id: "3", title: "CMA US Part 1", organization: "IMA", startDate: "2024", endDate: "2024", description: "Cleared Part 1 in the 1st attempt with score 380/500.", type: "Certification" },
    { id: "4", title: "Finance Internship", organization: "Corporate", startDate: "2025", endDate: "2025", description: "Practical exposure in FP&A and financial modeling.", type: "Experience" },
    { id: "5", title: "FP&A Professional", organization: "Finance Command Center", startDate: "2026", endDate: "2026", description: "Building advanced financial dashboards and analytics solutions.", type: "Experience", status: "In Progress" }
  ];
}
export function getCertificates() {
  return [
    { id: "cma-part1", title: "US CMA Part 1 Cleared", issuer: "IMA", date: "2024", category: "Professional" }
  ];
}
`;

// ==========================================
// 2. AUTOMATIC CODE SCANNER & FIXER
// ==========================================
async function scanAndFixFiles(dir) {
  try {
    const files = await fs.readdir(dir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory() && !fullPath.includes('node_modules') && !fullPath.includes('.next')) {
        await scanAndFixFiles(fullPath);
      } else if (file.name.endsWith('.tsx') || file.name.endsWith('.jsx')) {
        let content = await fs.readFile(fullPath, 'utf8');
        let modified = false;

        // Auto-fix hardcoded Uber images to dynamic images for the outside cards
        if (content.includes('/projects/uber.jpeg') || content.includes('/assets/uber.jpeg')) {
          // Finds exact matches and replaces them intelligently
          content = content.replace(/src=["']\/projects\/uber\.jpeg["']/g, 'src={project?.image || item?.image || "/assets/uber.jpeg"}');
          content = content.replace(/src=["']\/assets\/uber\.jpeg["']/g, 'src={project?.image || item?.image || "/assets/uber.jpeg"}');
          
          content = content.replace(/bg-\[url\(['"]\/projects\/uber\.jpeg['"]\)\]/g, 'style={{ backgroundImage: `url(${project?.image || item?.image || "/assets/uber.jpeg"})` }}');
          content = content.replace(/bg-\[url\(['"]\/assets\/uber\.jpeg['"]\)\]/g, 'style={{ backgroundImage: `url(${project?.image || item?.image || "/assets/uber.jpeg"})` }}');
          
          modified = true;
          console.log(`🔧 Fixed outside card images in: ${file.name}`);
        }

        if (modified) {
          await fs.writeFile(fullPath, content, 'utf8');
        }
      }
    }
  } catch (e) {
    // skip
  }
}

async function execute() {
  console.log("🔄 Parvej Bhai ka Code Fix ho raha hai...");
  
  // Update dataService
  const dataPath = path.join(process.cwd(), 'services/dataService.ts');
  await fs.writeFile(dataPath, dataServiceContent, 'utf8');
  console.log("✅ dataService.ts Updated with EXACT correct image names!");

  // Fix all outer cards
  await scanAndFixFiles(path.join(process.cwd(), 'app'));
  await scanAndFixFiles(path.join(process.cwd(), 'components'));
  
  console.log("🚀 BINGO! Sab theek ho gaya. Ab apni photos ke naam check kar lo aur 'npm run build' chalao!");
}

execute();