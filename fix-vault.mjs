import fs from 'fs/promises';
import path from 'path';

const cleanDataServiceContent = `export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  image?: string;
  category: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
  type: 'Education' | 'Experience' | 'Project' | 'Certification';
  status?: string;
}

export function getPersonalInfo() {
  return {
    name: "Parvej Alam Ansari",
    role: "FP&A Professional | CMA US Candidate",
    bio: "Building Financial Intelligence for a Smarter World.",
    email: "pa8213243@gmail.com",
    linkedin: "https://www.linkedin.com/in/parvej-alam-sulemanali-ansari-14808928b/",
    github: "https://github.com/pa8213243-sudo/ParvejPortfolio",
    oldWebsite: "https://courageous-queijadas-97ef87.netlify.app/",
    apkUrl: "https://github.com/pa8213243-sudo/ParvejPortfolio/releases/download/v1.0.0/app-release.apk"
  };
}

export function getProjects(): Project[] {
  return [
    {
      id: "uber-analytics",
      title: "Uber Ride Analytics Dashboard",
      description: "Analyzed 93K+ ride bookings, 2.51M km travel data and $52M+ revenue.",
      category: "Power BI",
      tags: ["Power BI", "DAX", "Power Query"],
      image: "/projects/uber.jpeg",
      featured: true
    },
    {
      id: "hr-analytics",
      title: "HR Analytics Dashboard",
      description: "Developed dashboard to analyze employee attrition, hiring trends, and department performance.",
      category: "Power BI",
      tags: ["Power BI", "DAX", "Power Query"],
      image: "/projects/Hr analytics.jpeg",
      featured: true
    },
    {
      id: "qa-ramco",
      title: "QA Ramco Financial Dashboard",
      description: "Created financial KPI dashboard for revenue monitoring, collections and operational performance.",
      category: "Power BI",
      tags: ["Power BI", "Power Query"],
      image: "/projects/QA aramco dasboard.jpeg",
      featured: true
    },
    {
      id: "croma-sales",
      title: "Croma Sales Dashboard",
      description: "Built sales performance dashboard to analyze product category, region and monthly trends.",
      category: "Power BI",
      tags: ["Power BI", "DAX"],
      image: "/projects/sales dashboard.jpeg",
      featured: true
    },
    {
      id: "flipkart-sales",
      title: "Flipkart Sales Dashboard",
      description: "Comprehensive e-commerce analytics for payment methods, age groups, and mobile model sales.",
      category: "Power BI",
      tags: ["Power BI", "Excel"],
      image: "/projects/flipcart.jpeg",
      featured: true
    },
    {
      id: "amazon-strategy",
      title: "Business Analysis Dashboard",
      description: "Amazon Market Expansion Strategy and global e-commerce leadership analysis.",
      category: "Advanced Excel",
      tags: ["Advanced Excel", "Financial Modeling"],
      image: "/projects/Amazon ppt.jpeg"
    },
    {
      id: "tesla-performance",
      title: "Financial Performance Analysis Dashboard",
      description: "Tesla business strategy, revenue streams, and electric vehicle market trajectory.",
      category: "Advanced Excel",
      tags: ["Advanced Excel", "Valuation"],
      image: "/projects/tesla ppt.jpeg"
    },
    {
      id: "bmw-strategy",
      title: "BMW Business Strategy",
      description: "SWOT analysis and strategic analysis of corporate performance.",
      category: "PowerPoint",
      tags: ["PowerPoint", "Strategy"],
      image: "/projects/microsoft ppt.jpeg"
    },
    {
      id: "apple-valuation",
      title: "Apple Financial Analysis",
      description: "Apple Inc. deep dive financial performance, DCF valuation, and ratio metrics.",
      category: "PowerPoint",
      tags: ["PowerPoint", "Valuation"],
      image: "/projects/apple ppt.jpeg"
    },
    {
      id: "android-portfolio",
      title: "Android App",
      description: "Native Android portfolio mobile application built with custom UI and project showcases.",
      category: "Android",
      tags: ["Android SDK", "Mobile App"],
      image: "/projects/Android App.jpeg",
      liveUrl: "https://github.com/pa8213243-sudo/ParvejPortfolio/releases/download/v1.0.0/app-release.apk"
    }
  ];
}

export function getCertificates(): Certificate[] {
  return [
    { id: "cma-part1", title: "US CMA Part 1 Cleared (380/500)", issuer: "IMA (Institute of Management Accountants)", date: "2024", category: "Professional" },
    { id: "power-bi-cert", title: "Microsoft Power BI Data Analyst Professional Certificate", issuer: "Coursera", date: "2024", category: "Analytics" },
    { id: "bcg-strategy", title: "BCG Strategy Consulting Job Simulation", issuer: "Forage", date: "2024", category: "Consulting" },
    { id: "ma-latham", title: "M&A Job Simulation", issuer: "Latham & Watkins", date: "2024", category: "Finance" },
    { id: "ima-ethics", title: "IMA Ethics of AI: Implications for Management Accountants", issuer: "IMA", date: "2026", category: "AI & Ethics" }
  ];
}

export function getTimeline(): TimelineItem[] {
  return [
    { id: "1", title: "School Education", organization: "High School", startDate: "2018", endDate: "2018", description: "Completed foundational education.", type: "Education" },
    { id: "2", title: "Bachelor of Commerce (Hons)", organization: "Gujarat University", startDate: "2021", endDate: "2024", description: "Completed all 6 semesters without any backlog.", type: "Education" },
    { id: "3", title: "CMA US Part 1", organization: "IMA", startDate: "2024", endDate: "2024", description: "Cleared Part 1 in the 1st attempt with score 380/500.", type: "Certification" },
    { id: "4", title: "Finance Internship", organization: "Corporate", startDate: "2025", endDate: "2025", description: "Practical exposure in FP&A and financial modeling.", type: "Experience" },
    { id: "5", title: "FP&A Professional", organization: "Finance Command Center", startDate: "2026", endDate: "2026", description: "Building advanced financial dashboards and analytics solutions.", type: "Experience", status: "In Progress" },
    { id: "6", title: "Future CFO", organization: "ADNOC / UAE Energy Sector", startDate: "2030+", endDate: "2030+", description: "Targeting leadership roles in strategic corporate finance.", type: "Project", status: "Future Goal" }
  ];
}
`;

async function fixVault() {
  try {
    const targetPath = path.join(process.cwd(), 'services', 'dataService.ts');
    await fs.writeFile(targetPath, cleanDataServiceContent, 'utf8');
    console.log('✅ BINGO! All project images and data updated without any errors!');
  } catch (err) {
    console.error('❌ Error updating file:', err);
  }
}

fixVault();