export interface PersonalInfo {
  name: string;
  role: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  oldWebsite: string;
  apkUrl: string;
  education: {
    degree: string;
    institution: string;
    timeline: string;
    details: string;
  }[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description?: string;
  shortDescription: string;
  category: 'Power BI' | 'Excel' | 'Advanced Excel' | 'PowerPoint' | 'Web' | 'Android';
  featured: boolean;
  status: string;
  date: string;
  displayOrder: number;
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
  image?: string;
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
  verificationUrl?: string;
  badgeImage?: string;
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
}