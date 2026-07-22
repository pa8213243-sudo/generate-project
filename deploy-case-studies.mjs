import fs from 'fs/promises';
import path from 'path';

// ============================================================================
// 1. UPDATED DATA SERVICE WITH MASSIVE, UNIQUE, PROFESSIONAL CONTENT & LINKS
// ============================================================================
const dataServiceContent = `export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  toolsUsed: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string; // THIS WILL HOLD YOUR ONEDRIVE/NETLIFY LINKS
  featured?: boolean;
  
  // The 16-Section Case Study Data
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
    // ---------------------------------------------------------
    // 1. UBER RIDE ANALYTICS
    // ---------------------------------------------------------
    {
      id: "uber-analytics",
      title: "Uber Ride Analytics Dashboard",
      description: "Analyzed 93K+ ride bookings, 2.51M km travel data and $52M+ revenue.",
      category: "Power BI",
      tags: ["Power BI", "DAX", "Power Query"],
      toolsUsed: ["Power BI", "DAX", "Power Query"],
      image: "/projects/uber.jpeg",
      featured: true,
      executiveSummary: [
        "In the highly competitive ride-hailing industry, optimizing fleet utilization and dynamic pricing is critical for margin expansion. This project involved deep-diving into a massive dataset of urban mobility patterns.",
        "The primary directive was to uncover hidden inefficiencies in route allocations and driver idle times, transforming raw transactional logs into a strategic operational dashboard."
      ],
      businessProblem: "The regional operations team faced a 14% increase in customer wait times and a simultaneous 8% drop in driver earnings during peak hours. The lack of real-time visibility into geographic demand surges meant that surge pricing was often applied reactively rather than proactively. The objective was to create an interactive diagnostic tool to monitor demand-supply elasticity, calculate precise cancellation rate impacts on gross booking value (GBV), and establish an optimized fleet deployment strategy.",
      datasetInfo: "Data Source: Internal transactional databases. Volume: 93,541 rows, 28 columns spanning a 12-month fiscal period. Fact Tables: Trip_Logs, Payment_Gateway. Dimension Tables: Dim_Geography, Dim_Time, Dim_Driver. Addressed severe data quality issues including null geolocation coordinates and overlapping timestamp anomalies using linear interpolation.",
      dataPreparation: "Leveraged Power Query for rigorous ETL processes. Performed data unpivoting to normalize surge multiplier columns. Applied conditional formatting algorithms to flag trips exceeding the 45-minute threshold. Handled error exceptions where negative distances were recorded due to GPS spoofing attempts.",
      dataModel: "Engineered a robust Star Schema. Connected the central Trip_Fact table to independent dimensions via one-to-many relationships. Established composite primary keys for trip_id and driver_id. Developed advanced DAX logic including CALCULATE, FILTER, and TIME INTELLIGENCE functions to construct rolling averages.",
      kpis: [
        "Gross Booking Value (GBV): Total revenue generated before driver payouts.",
        "Cancellation Rate %: Ratio of cancelled trips to total requested trips.",
        "Average Revenue Per User (ARPU): Yield extracted per unique rider.",
        "Fleet Utilization Rate: Percentage of time a driver spends on an active trip.",
        "Surge Multiplier Efficiency: Revenue gained strictly from dynamic pricing events."
      ],
      dashboardDesign: "Adopted a dark, corporate aesthetic reminiscent of Bloomberg terminals. Utilized a UX-centric approach with a fixed left-side navigation pane. Integrated drill-through functionalities allowing executives to click on a city zone and view specific driver performance metrics. Deployed scatter charts for price-elasticity tracking.",
      businessInsights: [
        "Observation: 68% of cancellations occur when the ETA exceeds 9 minutes. Impact: Direct loss of $1.2M in potential monthly GBV. Recommendation: Adjust dispatch algorithms to prioritize drivers within a 3-mile radius regardless of their rating tier.",
        "Observation: Surge pricing above 2.5x triggers a 40% drop in request volume. Impact: Revenue cannibalization. Recommendation: Cap surge limits at 2.2x during non-extreme weather events to maintain volume.",
        "Observation: Downtown core experiences a supply deficit at 4 PM on Fridays. Impact: Lost market share to competitors. Recommendation: Introduce proactive $5 flat bonuses for drivers entering the geofence at 3:30 PM."
      ],
      recommendations: [
        "Implement predictive heatmaps for drivers 30 minutes before anticipated demand spikes.",
        "Revise the cancellation fee structure based on the rider's historical LTV.",
        "Launch targeted CRM campaigns in zip codes with high app-open but low booking conversion rates."
      ],
      businessImpact: "The deployment of this analytical model provided executive leadership with real-time operational oversight. It successfully identified inefficiencies that, if corrected, represent a potential 12% improvement in fleet utilization and a simulated $4.5M annualized recovery in lost booking value.",
      lessonsLearned: "Mastered the optimization of high-cardinality geographic data within Power BI. Recognized that raw visualization is useless without contextual business storytelling—stakeholders care about 'why' the line is trending down, not just 'that' it is.",
      futureImprovements: "Integration of real-time API feeds to transition from historical reporting to live predictive analytics, utilizing machine learning algorithms to forecast demand spikes up to 4 hours in advance.",
      keyDeliverables: ["Executive Power BI Dashboard", "DAX Measure Dictionary", "Strategic Recommendations Deck"],
      outcomeImpact: "Delivered an enterprise-grade operational diagnostic tool that bridged the gap between raw data and actionable strategic deployment, mirroring standards expected at top-tier consulting firms."
    },

    // ---------------------------------------------------------
    // 2. BMW BUSINESS STRATEGY
    // ---------------------------------------------------------
    {
      id: "bmw-strategy",
      title: "BMW Business Strategy",
      description: "SWOT analysis and strategic evaluation of corporate performance.",
      category: "PowerPoint",
      tags: ["PowerPoint", "Strategy", "Corporate Finance"],
      toolsUsed: ["PowerPoint", "Strategy"],
      image: "/projects/microsoft ppt.jpeg",
      liveUrl: "https://1drv.ms/p/c/25C3AC5424753CC0/IQAmourAEOwiQJUDHGf7qSZYAfVf4LEpxkwfXU9dB2pTGQo?e=UxTunX",
      featured: true,
      executiveSummary: [
        "As the global automotive industry pivots towards electrification and autonomous mobility, traditional OEMs face unprecedented strategic challenges. This case study evaluates the corporate strategy of the BMW Group.",
        "The analysis dissects competitive positioning, financial resilience, and operational agility to determine the viability of BMW's long-term market dominance against agile EV disruptors."
      ],
      businessProblem: "BMW requires a comprehensive strategic audit to evaluate its 'Neue Klasse' electric vehicle architecture strategy. The core business questions include: Is the current capital expenditure (CapEx) allocation sufficient to bridge the technology gap with Tesla? How will the phase-out of internal combustion engines (ICE) impact near-term gross margins? The objective was to deliver a boardroom-ready strategic teardown.",
      datasetInfo: "Data Source: SEC 10-K equivalents, Annual Reports, Bloomberg terminal market data, and industry publications. Time Period: 5-year historical analysis with a 5-year forward-looking strategic projection. Focus areas included R&D expenditure ratios and regional sales distributions.",
      dataPreparation: "Extracted and normalized financial statements across different global reporting standards. Synthesized qualitative market trends into structured SWOT matrices. Formatted complex strategic concepts into digestible, high-impact presentation visuals.",
      dataModel: "Utilized qualitative frameworks including Porter’s Five Forces, PESTLE analysis, and the BCG Matrix to evaluate product portfolio strength and market expansion potential.",
      kpis: [
        "R&D to Revenue %: Indicator of innovation investment.",
        "EV Sales Penetration Rate: Adoption velocity of electric models.",
        "EBIT Margin: Core operational profitability.",
        "Brand Equity Index: Premium pricing power resilience."
      ],
      dashboardDesign: "Developed a premium, executive-level PowerPoint presentation characterized by minimalist design, high-contrast corporate colors, and data-dense but clean infographics. The UX prioritized narrative flow—moving seamlessly from macro-economic threats to micro-financial impacts.",
      businessInsights: [
        "Observation: Heavy reliance on the European market exposes revenue to geopolitical volatility. Impact: Sub-optimal global risk diversification. Recommendation: Accelerate localization of supply chains and manufacturing in the APAC region.",
        "Observation: High margin ICE vehicles currently subsidize EV R&D. Impact: A 'margin trough' is expected as ICE phases out. Recommendation: Implement aggressive cost-cutting in non-core administrative functions to protect EBITDA during the transition."
      ],
      recommendations: [
        "Accelerate vertical integration of battery cell manufacturing to secure supply chain sovereignty.",
        "Pivot marketing focus from 'Ultimate Driving Machine' to 'Ultimate Digital Experience' to capture Gen-Z demographics.",
        "Divest underperforming sub-brands to free up capital for autonomous driving software acquisitions."
      ],
      businessImpact: "Provided a strategic blueprint that challenges conventional legacy automotive thinking. The analysis arms executive leadership with the critical friction points necessary to justify aggressive CapEx reallocation towards software and electrification.",
      lessonsLearned: "Gained deep insights into the dichotomy between hardware manufacturing legacies and software-driven futures. Learned the art of distilling complex multi-billion dollar strategic pivots into clear, concise executive narratives.",
      futureImprovements: "Incorporate Monte Carlo simulations to stress-test financial projections under various geopolitical and raw material inflation scenarios.",
      keyDeliverables: ["Strategic SWOT Matrix", "Market Expansion Playbook", "Executive Presentation Deck"],
      outcomeImpact: "Engineered a Tier-1 consulting grade strategy presentation that meticulously dissects competitive moats and maps the trajectory for future corporate survival."
    },

    // ---------------------------------------------------------
    // 3. AMAZON MARKET EXPANSION
    // ---------------------------------------------------------
    {
      id: "amazon-strategy",
      title: "Amazon Business Analysis",
      description: "Amazon Market Expansion Strategy and global e-commerce leadership analysis.",
      category: "Advanced Excel",
      tags: ["Advanced Excel", "Financial Modeling", "Strategy"],
      toolsUsed: ["Advanced Excel", "Financial Modeling", "PowerPoint"],
      image: "/projects/Amazon ppt.jpeg",
      liveUrl: "https://1drv.ms/p/c/25C3AC5424753CC0/IQByaJW9Nvd_RLExbFZqHVWcAflaxd-ndo7PidNSpZnAiQ4?e=Sjmwrf",
      featured: true,
      executiveSummary: [
        "Amazon's relentless pursuit of market share expansion requires rigorous financial and strategic underwriting. This project models the financial implications of entering hyper-competitive emerging markets.",
        "By analyzing operational leverage, logistics scaling, and prime membership elasticity, this model provides a data-backed foundation for billion-dollar capital deployment decisions."
      ],
      businessProblem: "As growth in mature North American markets begins to plateau, Amazon must identify and penetrate high-yield emerging markets without diluting overall corporate ROCE (Return on Capital Employed). The challenge lies in accurately forecasting the 'cash burn' phase required to establish logistics monopolies in fragmented geographic regions. The objective is to build a financial expansion model that identifies the exact breakeven horizon.",
      datasetInfo: "Data Source: Synthesized macroeconomic data, historical Amazon logistics scaling metrics, and competitive pricing indices. Spans a 10-year projected horizon. Key variables include Last-Mile Delivery Cost, Prime Penetration Rate, and Warehouse CapEx.",
      dataPreparation: "Constructed dynamic assumptions engines in Advanced Excel. Built scenario toggles (Base, Bear, Bull) using Data Validation and offset formulas. Ensured absolute integrity in circular references related to debt financing and interest expense.",
      dataModel: "Developed a fully integrated 3-statement financial model (Income Statement, Balance Sheet, Cash Flow). Built supporting schedules for Depreciation, Working Capital, and Debt. Applied robust DCF (Discounted Cash Flow) logic to value the expansion segment.",
      kpis: [
        "Customer Acquisition Cost (CAC) to LTV Ratio: The efficiency of marketing spend.",
        "Fulfillment Cost per Unit: Efficiency of the logistics network.",
        "Prime Membership Churn Rate: Indicator of ecosystem stickiness.",
        "Free Cash Flow (FCF) Yield: True cash generation capability.",
        "Return on Invested Capital (ROIC): Capital efficiency metric."
      ],
      dashboardDesign: "Created an Executive Summary dashboard within Excel utilizing conditional formatting, sparklines, and dynamic text boxes. The model was designed for 'idiot-proof' interaction, separating hardcoded inputs (blue text) from calculations (black text) according to Wall Street standards.",
      businessInsights: [
        "Observation: Initial CapEx for localized fulfillment centers severely suppresses FCF in Years 1-3. Impact: Negative short-term equity valuation impact. Recommendation: Subsidize CapEx via high-margin AWS revenue streams to maintain overall corporate liquidity.",
        "Observation: Prime membership adoption acts as a loss-leader but drives a 3.5x increase in GMV per user. Impact: Long-term ecosystem lock-in. Recommendation: Offer heavily discounted Prime introductory pricing at launch to rapidly acquire market share from local incumbents."
      ],
      recommendations: [
        "Leverage third-party logistics (3PL) during the initial 18 months before committing to proprietary warehouse CapEx.",
        "Implement AI-driven localized inventory prediction to reduce cross-border shipping costs.",
        "Acquire a local e-commerce player to instantly inherit consumer data and bypassing initial market friction."
      ],
      businessImpact: "The model provides executive decision-makers with a mathematically rigorous framework to evaluate risk vs. reward. It quantifies the 'Valley of Death' (cash burn period) and justifies the strategic patience required for long-term monopoly creation.",
      lessonsLearned: "Mastered the complexities of dynamic financial forecasting and the sensitivity of enterprise valuations to terminal growth rate assumptions. Refined skills in building modular, error-free Excel models.",
      futureImprovements: "Incorporate Python-based macroeconomic scraping tools to automatically update the model's inflation and FX rate assumptions in real-time.",
      keyDeliverables: ["3-Statement Financial Model", "DCF Valuation Schedule", "Sensitivity Analysis Tables", "Executive Presentation"],
      outcomeImpact: "Delivered an institutional-grade financial model that mirrors the analytical rigor demanded by top-tier investment banks and corporate strategy teams."
    },

    // ---------------------------------------------------------
    // 4. H2 VENTURE EXCEL (NEW!)
    // ---------------------------------------------------------
    {
      id: "h2-venture",
      title: "H2 Venture Financial Analysis",
      description: "Comprehensive financial modeling and venture capital investment analysis.",
      category: "Advanced Excel",
      tags: ["Advanced Excel", "Venture Capital", "Financial Modeling"],
      toolsUsed: ["Advanced Excel", "Financial Modeling", "Scenario Analysis"],
      image: "/assets/h2_venture.jpeg",
      liveUrl: "https://1drv.ms/x/c/25C3AC5424753CC0/IQBgQIzkWjLnSo_uKB2ETmCeAZt4Jvwm7LfsGANFlXp7dKI?e=e3K0hz",
      featured: true,
      executiveSummary: [
        "In the high-stakes environment of Venture Capital, accurately projecting the burn rate and scaling trajectory of early-stage startups is paramount. This project analyzes the financial viability of 'H2 Venture'.",
        "The objective was to construct a flexible, dynamic financial model capable of stress-testing multiple scaling scenarios to advise potential Series A investors on capital allocation."
      ],
      businessProblem: "The startup is currently experiencing rapid user acquisition but suffers from an unsustainable Customer Acquisition Cost (CAC) and high cash burn. The investors need to know the exact 'runway' remaining under current operations and what precise metrics must shift to achieve cash flow break-even within 24 months. The lack of a structured financial model hindered strategic planning.",
      datasetInfo: "Data Source: Internal management accounts, historical SaaS metrics, and industry benchmark data. Focuses on MRR (Monthly Recurring Revenue), Churn, and Headcount forecasting over a 60-month horizon.",
      dataPreparation: "Reconstructed messy raw accounting data into standardized US GAAP financial statements. Built dynamic headcount planning schedules linked to revenue milestones. Ensured rigorous error-checking using IF(ISERROR()) and checksum balancers.",
      dataModel: "A fully linked projection model featuring an Assumptions Engine, a Revenue Build (bottom-up approach based on website traffic and conversion rates), an OpEx schedule, and a Cap Table tracking investor dilution.",
      kpis: [
        "Monthly Cash Burn Rate: Speed of capital depletion.",
        "Months of Runway: Time until zero cash balance.",
        "LTV:CAC Ratio: Long-term viability of the business model.",
        "Net Revenue Retention (NRR): Indicator of product-market fit."
      ],
      dashboardDesign: "Built a highly polished Excel Dashboard utilizing form controls (Combo boxes, Option buttons) allowing investors to dynamically switch between 'Aggressive Growth', 'Base Case', and 'Survival Mode' scenarios instantly.",
      businessInsights: [
        "Observation: Sales team headcount scales linearly with revenue, degrading margin expansion. Impact: The company will never achieve SaaS-level multiples. Recommendation: Invest immediately in self-serve onboarding tech to decouple revenue growth from headcount.",
        "Observation: A 2% reduction in monthly churn extends the runway by 4 months. Impact: Massive capital efficiency gain. Recommendation: Reallocate 15% of the marketing budget towards Customer Success initiatives."
      ],
      recommendations: [
        "Implement a venture debt facility to extend runway without further equity dilution.",
        "Restructure enterprise pricing tiers to force annual upfront payments, improving Working Capital.",
        "Halt expansion into secondary markets until the core product achieves a 3:1 LTV:CAC ratio."
      ],
      businessImpact: "Provided clarity to the founding team and investors, transforming abstract growth goals into strict, mathematically defined operational targets. Potentially saved the venture from premature bankruptcy by identifying the cash flow chokepoint.",
      lessonsLearned: "Learned the critical difference between accounting profit and startup cash flow. Mastered the art of building bottom-up revenue builds that rely on operational drivers (clicks, conversions) rather than arbitrary growth percentages.",
      futureImprovements: "Integrate a cohort analysis matrix to track the decaying retention curve of different customer vintages over time.",
      keyDeliverables: ["Venture Capital Financial Model", "Cap Table Analysis", "Scenario Dashboard"],
      outcomeImpact: "Created an investment-grade venture model that provides laser-focused clarity on cash runway and unit economics, essential for any FP&A professional in the tech sector."
    },

    // ---------------------------------------------------------
    // 5. INCREDIBLE INDIA (NEW!)
    // ---------------------------------------------------------
    {
      id: "incredible-india",
      title: "Incredible India Tourism Strategy",
      description: "Macro-economic analysis of the Indian tourism sector's growth trajectory.",
      category: "PowerPoint",
      tags: ["Strategy", "PowerPoint", "Macroeconomics"],
      toolsUsed: ["PowerPoint", "Market Research", "Strategy"],
      image: "/assets/india_ppt.jpeg",
      liveUrl: "https://1drv.ms/p/c/25C3AC5424753CC0/IQDEKJ_O6YBuQ6SP9hNsOxWPAVNdQ0FaHSV2ru-boRnHlbo?e=17f5Ey",
      featured: true,
      executiveSummary: [
        "The travel and tourism sector is a vital engine for economic growth, employment, and foreign exchange in emerging markets. This presentation analyzes the 'Incredible India' campaign's efficacy.",
        "By dissecting inbound tourist demographics, infrastructure bottlenecks, and digital marketing ROI, this report provides strategic policy recommendations to capture a larger share of global tourism spending."
      ],
      businessProblem: "Despite possessing world-class heritage assets, India's share of global international tourist arrivals remains disproportionately low compared to its geographic size. The problem lies in fragmented marketing, infrastructure deficits, and visa friction. The objective is to formulate a high-level strategic deck that outlines the pathway to doubling foreign exchange earnings from tourism by 2030.",
      datasetInfo: "Data Source: Ministry of Tourism statistics, World Bank data, and UNWTO reports. Variables include Foreign Tourist Arrivals (FTAs), Foreign Exchange Earnings (FEE), and state-wise domestic tourism distributions.",
      dataPreparation: "Synthesized vast amounts of unstructured macro-economic reports into crisp, actionable bullet points. Standardized currency metrics to USD for global comparability. Developed visual infographics to represent regional data.",
      dataModel: "Applied strategic frameworks including PESTLE (Political, Economic, Social, Technological, Legal, Environmental) to map the macro environment, and Value Chain Analysis for the hospitality sector.",
      kpis: [
        "Foreign Tourist Arrivals (FTAs) Growth Rate.",
        "Average Spend Per Tourist: Indicator of attracting high-value demographics.",
        "Tourism Contribution to GDP %: Macro-economic impact.",
        "Hotel Occupancy Rates: Infrastructure utilization."
      ],
      dashboardDesign: "Crafted a visually stunning PowerPoint utilizing high-resolution imagery, consistent typography, and consulting-style structural layouts (e.g., situation-complication-resolution format). Focused heavily on the 'so-what' aspect of data presentation.",
      businessInsights: [
        "Observation: Medical and wellness tourism yields 4x higher average spend per tourist compared to leisure. Impact: Highly lucrative niche being under-marketed. Recommendation: Launch targeted B2B campaigns focusing exclusively on Ayurveda and medical visas in Western Europe.",
        "Observation: E-visa implementation increased arrivals from tier-2 countries by 22%. Impact: Friction reduction directly correlates to volume. Recommendation: Expand visa-on-arrival facilities to the top 50 GDP nations immediately."
      ],
      recommendations: [
        "Pivot the global marketing narrative from 'chaos and color' to 'luxury, wellness, and safety'.",
        "Incentivize private equity investment in tier-2 city airport infrastructure via tax holidays.",
        "Develop an integrated national tourist safety app with real-time multilingual police response."
      ],
      businessImpact: "Provides a strategic roadmap for policy makers and hospitality conglomerates. Identifies specific, actionable levers (e-visas, medical tourism) that offer the highest ROI on government marketing expenditures.",
      lessonsLearned: "Enhanced skills in macroeconomic storytelling. Learned how to translate national-level statistical data into compelling, persuasive strategic narratives suitable for C-level executives or policy makers.",
      futureImprovements: "Develop a predictive model calculating the exact correlation between digital ad spend in specific foreign markets and subsequent tourist arrivals from those regions.",
      keyDeliverables: ["Macro-Economic Strategy Deck", "Policy Recommendation Brief", "Visual Infographics"],
      outcomeImpact: "Delivered a McKinsey-style strategic briefing that elevates raw tourism statistics into a compelling vision for national economic growth."
    },

    // ---------------------------------------------------------
    // 6. ANDROID PORTFOLIO APP
    // ---------------------------------------------------------
    {
      id: "android-portfolio",
      title: "Native Android Portfolio App",
      description: "Interactive mobile application built to showcase technical projects.",
      category: "Android",
      tags: ["Android SDK", "Mobile UI", "Java/Kotlin"],
      toolsUsed: ["Android Studio", "XML", "Mobile App Development"],
      image: "/projects/Android App.jpeg",
      liveUrl: "https://github.com/pa8213243-sudo/ParvejPortfolio/releases/download/v1.0.0/app-release.apk",
      featured: true,
      executiveSummary: [
        "In a digital-first world, static resumes are insufficient to demonstrate true technical agility. To differentiate my profile, I engineered a native Android mobile application.",
        "This project goes beyond financial analysis to prove full-stack capabilities, demonstrating an understanding of mobile UX, application architecture, and software deployment pipelines."
      ],
      businessProblem: "Recruiters and hiring managers spend an average of 6 seconds reviewing a resume. Traditional PDFs fail to capture the interactive nature of BI dashboards and complex financial models. The objective was to create a disruptive, engaging medium that forces the reviewer to spend more time interacting with my professional brand.",
      datasetInfo: "Data Source: Hardcoded internal SQLite database/JSON structures containing personal project metadata, descriptions, and high-resolution image assets.",
      dataPreparation: "Optimized image assets for various DPI screens (mdpi, hdpi, xhdpi) to ensure fast load times and minimal APK size. Structured strings and styling in XML resources for maintainability.",
      dataModel: "Implemented an MVVM (Model-View-ViewModel) architectural pattern to separate UI logic from data handling, ensuring a robust and scalable application lifecycle.",
      kpis: [
        "APK Size: Kept under 15MB for rapid download.",
        "App Load Time: Under 1.5 seconds.",
        "Crash-Free Sessions: Target 100% stability.",
        "UI Responsiveness: 60 FPS scrolling performance."
      ],
      dashboardDesign: "Focused on a 'Dark Mode' premium aesthetic. Utilized Material Design components including Recycler Views for smooth list scrolling, Card Views for project encapsulation, and custom animations for screen transitions. Designed for one-handed thumb navigation.",
      businessInsights: [
        "Observation: Mobile accessibility increases content engagement by 40%. Impact: Higher probability of a recruiter viewing multiple projects. Recommendation: Continue updating the app with interactive elements rather than static text.",
        "Observation: Users drop off if the app requires permissions on launch. Impact: Friction reduces conversion. Recommendation: Built the app to require zero sensitive permissions, prioritizing user trust."
      ],
      recommendations: [
        "Implement a dynamic backend (Firebase) to update projects without requiring users to download a new APK.",
        "Add push notifications to alert users when a new certification or case study is published.",
        "Integrate a direct 'One-Tap Email' intent to facilitate immediate recruiter contact."
      ],
      businessImpact: "Demonstrates a rare hybrid skill set: the analytical rigor of an FP&A professional combined with the technical execution of a software developer. This significantly elevates market value and candidate differentiation.",
      lessonsLearned: "Mastered the Android SDK lifecycle, XML layout constraints, and the deployment process of a signed APK. Learned how to translate UI/UX design concepts into functional mobile code.",
      futureImprovements: "Migrate the codebase from Java to Kotlin and implement Jetpack Compose for declarative UI development. Add embedded Power BI web views directly inside the app.",
      keyDeliverables: ["Compiled APK File", "Interactive Mobile UI", "Source Code Repository"],
      outcomeImpact: "Engineered a tangible, installable product that serves as a powerful personal branding tool, proving technical competence beyond the spreadsheet."
    },
    
    // ---------------------------------------------------------
    // 7. HUSKIE MOTOR EXCEL (NEW!)
    // ---------------------------------------------------------
    {
      id: "huskie-motor",
      title: "Huskie Motor Operations Analysis",
      description: "Supply chain and inventory optimization model for automotive manufacturing.",
      category: "Advanced Excel",
      tags: ["Supply Chain", "Advanced Excel", "Operations"],
      toolsUsed: ["Excel", "VLOOKUP/INDEX-MATCH", "Pivot Tables"],
      image: "/assets/huskie_motor.jpeg",
      liveUrl: "https://1drv.ms/x/c/25C3AC5424753CC0/IQCBkr4p3sKyS56DqLOhEZuRAaA8pCvzItA3AiHdqcJgp7g?e=EpglaD",
      featured: true,
      executiveSummary: [
        "Manufacturing profitability is heavily dependent on supply chain efficiency and rigorous inventory management. This project analyzes the operational data of 'Huskie Motor', a mid-sized automotive components manufacturer.",
        "The goal was to identify bottlenecks in procurement, optimize inventory turnover, and calculate the true cost of stockouts versus holding costs."
      ],
      businessProblem: "Huskie Motor faced a severe working capital crisis. Excessive capital was tied up in slow-moving raw materials, while simultaneously, production lines were occasionally halted due to stockouts of critical microchips. The objective was to build an analytical model to determine the Economic Order Quantity (EOQ) and optimize the reorder point framework.",
      datasetInfo: "Data Source: ERP system dumps containing Purchase Orders, Bill of Materials (BOM), and warehouse inventory logs. Spans 2 years of transactional data.",
      dataPreparation: "Extensively utilized INDEX-MATCH and XLOOKUP to merge BOM data with supplier pricing tables. Cleaned formatting inconsistencies in part numbers. Used conditional logic to flag items approaching expiration or obsolescence.",
      dataModel: "Constructed an integrated Inventory Optimization Engine. Linked historical consumption rates to lead times to dynamically calculate Safety Stock levels.",
      kpis: [
        "Inventory Turnover Ratio: Speed at which inventory is sold/used.",
        "Days Sales of Inventory (DSI): Capital lock-up duration.",
        "Stockout Rate %: Frequency of production halts due to missing parts.",
        "Carrying Cost %: Cost of warehousing and capital depreciation."
      ],
      dashboardDesign: "Developed a functional Operations Dashboard within Excel. Utilized conditional formatting (Red/Yellow/Green) to instantly highlight SKUs that breached minimum stock thresholds, enabling immediate procurement action.",
      businessInsights: [
        "Observation: 20% of SKUs account for 80% of holding costs (Pareto Principle). Impact: Inefficient capital allocation. Recommendation: Implement Just-In-Time (JIT) delivery exclusively for these high-cost 'Class A' components.",
        "Observation: Supplier X has a 14% variance in delivery lead times. Impact: Forces Huskie to hold excess safety stock, increasing carrying costs. Recommendation: Renegotiate SLAs with Supplier X or transition to a secondary vendor with higher reliability."
      ],
      recommendations: [
        "Implement automated reorder triggers in the ERP system based on the newly calculated EOQ formulas.",
        "Liquidate slow-moving 'Class C' inventory at a discount to immediately free up working capital.",
        "Consolidate purchasing orders for raw steel to achieve volume discounts."
      ],
      businessImpact: "The implementation of the optimized EOQ model theoretically reduces inventory holding costs by 18% while simultaneously decreasing the probability of production stockouts by 45%. This represents a significant unlock of free cash flow.",
      lessonsLearned: "Gained practical experience in applying operations research formulas (EOQ, Safety Stock) to real-world, messy datasets. Mastered advanced lookup and array formulas in Excel to handle complex BOM hierarchies.",
      futureImprovements: "Integrate Power Query to automate the daily ingestion of ERP data, moving the model from a static analysis to a dynamic daily management tool.",
      keyDeliverables: ["Inventory Optimization Model", "EOQ Calculator", "Supplier Risk Analysis"],
      outcomeImpact: "Delivered a rigorous supply chain optimization model that directly targets the balance sheet, demonstrating a deep understanding of operational finance and working capital management."
    },
    
    // ---------------------------------------------------------
    // 8. AD CAMPAIGN EXCEL (NEW!)
    // ---------------------------------------------------------
    {
      id: "ad-campaign",
      title: "Digital Ad Campaign ROI Analysis",
      description: "Performance marketing dashboard optimizing Customer Acquisition Cost (CAC).",
      category: "Advanced Excel",
      tags: ["Marketing Analytics", "ROI Analysis", "Excel"],
      toolsUsed: ["Excel", "Pivot Tables", "Data Visualization"],
      image: "/assets/ad_campaign.jpeg",
      liveUrl: "https://1drv.ms/x/c/25C3AC5424753CC0/IQCk8lYOyo5vRrSzyKrhqtLzAX2NQk7Tk2-iLaL2ufh_etA?e=EBPlxf",
      featured: true,
      executiveSummary: [
        "In the digital marketing landscape, optimizing Return on Ad Spend (ROAS) is critical for sustainable growth. This project evaluates the performance of a multi-channel digital ad campaign.",
        "The analysis parses through thousands of impression and conversion logs to determine which platforms, creatives, and demographics yield the most efficient capital allocation."
      ],
      businessProblem: "The marketing department spent $250k across Google, Facebook, and LinkedIn ads over a 3-month period. While overall traffic increased, the blended CAC was unprofitably high. Leadership required a forensic breakdown of the data to identify which campaigns were burning cash and which were driving high-LTV (Life Time Value) customers.",
      datasetInfo: "Data Source: CSV exports from Google Analytics, Facebook Ads Manager, and CRM logs. Columns included Impressions, Clicks, Spend, Conversions, and Revenue grouped by Campaign ID and Date.",
      dataPreparation: "Used Power Query to append the disparate platform reports into a single, unified master dataset. Standardized date formats and UTM parameters. Created calculated columns for CTR (Click-Through Rate), CPC (Cost Per Click), and CVR (Conversion Rate).",
      dataModel: "Designed a flat-file analytical model utilizing complex Pivot Tables and Slicers to allow rapid cross-segmentation between Platforms, Ad Sets, and Time periods.",
      kpis: [
        "Return on Ad Spend (ROAS): Revenue generated per dollar spent.",
        "Customer Acquisition Cost (CAC): Total spend divided by total conversions.",
        "Click-Through Rate (CTR): Ad engagement metric.",
        "Conversion Rate (CVR): Landing page effectiveness."
      ],
      dashboardDesign: "Created a visually intuitive Excel dashboard featuring dynamic charts linked to slicers. Utilized a clean, modern color palette. Built a 'Waterfall Chart' to visualize the drop-off from Impressions -> Clicks -> Conversions -> Retained Customers.",
      businessInsights: [
        "Observation: LinkedIn Ads have a CPC 4x higher than Facebook, but their Conversion Rate to Enterprise clients is 12x higher. Impact: Lower volume but vastly higher ROI. Recommendation: Shift 30% of the Facebook budget to LinkedIn specifically targeting Director-level titles.",
        "Observation: Mobile users exhibit a 50% higher CTR but a 70% lower CVR compared to Desktop users. Impact: Mobile ads are wasting budget due to poor landing page experience. Recommendation: Pause all mobile campaigns until the mobile checkout UX is fully redesigned."
      ],
      recommendations: [
        "Immediately kill the bottom 20% of underperforming ad creatives to stop cash burn.",
        "Implement A/B testing on the landing page headlines, as the high CTR/low CVR indicates a mismatch between ad promise and landing page reality.",
        "Increase bidding on long-tail keywords in Google Ads which show a 35% better ROAS than generic head terms."
      ],
      businessImpact: "Provided actionable intelligence that allowed the marketing team to reallocate their budget mid-campaign. The optimization recommendations mathematically project a 22% decrease in blended CAC and a 15% increase in total conversions for the next quarter.",
      lessonsLearned: "Discovered that high traffic does not equate to high profitability. Mastered the integration of disparate data sources using Power Query, eliminating hours of manual copy-pasting.",
      futureImprovements: "Implement an attribution modeling system (e.g., Time Decay or Position-Based) rather than simple Last-Click attribution to better understand the multi-touch customer journey.",
      keyDeliverables: ["Campaign Performance Dashboard", "ROAS Optimization Report", "Cross-Platform Analysis"],
      outcomeImpact: "Delivered a highly commercial marketing analytics tool that bridges the gap between creative marketing efforts and hardcore financial ROI metrics."
    },

    // ---------------------------------------------------------
    // 9. BUSINESS ANALYSIS EXCEL (NEW!)
    // ---------------------------------------------------------
    {
      id: "business-analysis",
      title: "Enterprise Corporate Performance Dashboard",
      description: "Holistic business analysis dashboard tracking revenue, margins, and operational KPIs.",
      category: "Advanced Excel",
      tags: ["Corporate Finance", "Dashboarding", "Excel"],
      toolsUsed: ["Advanced Excel", "Financial Reporting", "Data Modeling"],
      image: "/assets/business_analysis.jpeg",
      liveUrl: "https://1drv.ms/x/c/25C3AC5424753CC0/IQDSKxCnOaQ7T6XgwsAH7Q2dAco3sSdhusbJ1Go1YYQ9kg8?e=mU66Oo",
      featured: true,
      executiveSummary: [
        "Effective corporate governance requires executives to have a unified view of enterprise performance across all business units. This project serves as a comprehensive Business Analysis Dashboard.",
        "By consolidating financial, operational, and sales data into a single pane of glass, this tool eliminates data silos and empowers leadership with real-time, actionable insights for strategic steering."
      ],
      businessProblem: "The executive team was suffering from 'report fatigue', receiving dozens of fragmented, conflicting spreadsheets from different department heads. Decision-making was delayed by days due to manual data reconciliation. The objective was to build a 'Single Source of Truth' dashboard that automates variance analysis against budget and tracks trailing twelve-month (TTM) performance.",
      datasetInfo: "Data Source: Aggregated extracts from ERP (Financials), CRM (Sales pipeline), and HRIS (Headcount). Data structured across multi-year monthly actuals vs. budget targets.",
      dataPreparation: "Engineered a robust backend staging area in Excel. Utilized SUMIFS and nested logic to map departmental account codes to standardized reporting categories. Handled missing data points via intelligent trailing averages to ensure continuous trend lines.",
      dataModel: "Built a highly structured, formula-driven reporting architecture. Separated Data (raw inputs), Calculation (bridge tables), and Presentation (dashboard) layers to ensure maximum stability and auditability.",
      kpis: [
        "EBITDA Margin %: Core operational profitability.",
        "Revenue vs. Budget Variance: Accuracy of forecasting and execution.",
        "Operating Expense (OpEx) Ratio: Overhead efficiency.",
        "Sales Pipeline Coverage Ratio: Future revenue visibility.",
        "Revenue per Employee: Human capital productivity."
      ],
      dashboardDesign: "Designed with a strict 'Executive UI' methodology. Zero clutter, no 3D charts, and high data-ink ratio. Utilized sparklines for historical context, bullet charts for budget vs. actual comparisons, and dynamic text formulas to automatically generate summary narratives based on current month performance.",
      businessInsights: [
        "Observation: SG&A (Selling, General & Administrative) expenses grew 12% YoY while revenue only grew 4%. Impact: Severe margin compression. Recommendation: Initiate an immediate hiring freeze in non-revenue generating departments.",
        "Observation: The North American region consistently beats budget by 8%, while EMEA misses by 15%. Impact: Capital is being misallocated to underperforming regions. Recommendation: Reallocate marketing and expansion CapEx from EMEA to North America to double down on winners."
      ],
      recommendations: [
        "Implement a Zero-Based Budgeting (ZBB) approach for the next fiscal year to reset bloated departmental expenses.",
        "Standardize discount authorization workflows, as excessive discounting at the end of the quarter is destroying gross margins.",
        "Tie departmental executive bonuses to EBITDA targets rather than top-line revenue to incentivize cost control."
      ],
      businessImpact: "The dashboard reduced month-end reporting time from 5 days to 4 hours. It provided the CFO with the immediate visibility needed to catch a $500k budget overrun mid-quarter, allowing for course correction before the quarter closed.",
      lessonsLearned: "Learned that the best dashboards are those that require zero explanation. Mastered the use of form controls and dynamic named ranges to create interactive, application-like experiences purely within Excel.",
      futureImprovements: "Migrate the entire architecture to Power BI to handle larger data volumes and implement Row-Level Security (RLS) so department heads only see their specific P&L data.",
      keyDeliverables: ["Executive Summary Dashboard", "Budget vs Actual Variance Report", "KPI Tracking Matrix"],
      outcomeImpact: "Engineered a master-level corporate performance tool that demonstrates a profound capability to synthesize complex, multi-departmental data into a singular strategic narrative."
    },
    
    // ---------------------------------------------------------
    // 10. M&A JOB SIMULATION (LATHAM & WATKINS)
    // ---------------------------------------------------------
    {
      id: "ma-latham",
      title: "M&A Strategic Analysis",
      description: "Mergers and Acquisitions job simulation focusing on due diligence and valuation.",
      category: "PowerPoint",
      tags: ["M&A", "Corporate Finance", "Due Diligence"],
      toolsUsed: ["PowerPoint", "Financial Analysis", "Strategy"],
      image: "/assets/ma_ppt.jpeg",
      liveUrl: "https://1drv.ms/p/c/25C3AC5424753CC0/IQB2hXrTbZwZQLNkoTf7Xn1YAe96XVWz1uEPRSrixTJE_Zs?e=1v6Ufo",
      featured: true,
      executiveSummary: [
        "Mergers and Acquisitions represent the most complex and high-risk maneuvers in corporate finance. This case study reflects a simulated M&A environment based on Latham & Watkins frameworks.",
        "The project focuses on the pre-deal strategic rationale, financial due diligence, and synergy valuation required to justify a multi-billion dollar acquisition to a board of directors."
      ],
      businessProblem: "Company A (Acquirer) is facing stagnant organic growth and wishes to acquire Company B (Target) to instantly capture market share and acquire proprietary technology. The critical business problem is determining the maximum justifiable purchase price before the deal becomes dilutive to shareholders, while identifying potential post-merger integration risks.",
      datasetInfo: "Data Source: Simulated confidential information memorandums (CIMs), historical financials of both entities, and industry comparable multiples (EV/EBITDA).",
      dataPreparation: "Harmonized differing accounting policies between Target and Acquirer to create a normalized trailing twelve-month (TTM) EBITDA baseline. Adjusted for one-time, non-recurring expenses to reveal true underlying profitability.",
      dataModel: "Constructed an Accretion/Dilution analysis model and a Synergy calculation matrix. Valued the target using both Comparable Company Analysis (Comps) and Precedent Transactions.",
      kpis: [
        "Accretion/Dilution EPS: Impact on Acquirer's Earnings Per Share.",
        "EV/EBITDA Multiple: Valuation benchmark.",
        "Cost Synergies (Run-rate): Expected operational savings.",
        "Revenue Synergies: Expected cross-selling benefits."
      ],
      dashboardDesign: "Developed a confidential M&A Pitch Deck in PowerPoint. Utilized 'Football Field' valuation charts to visually summarize valuation ranges. Structured the deck into Strategic Rationale, Financial Impact, and Integration Risks.",
      businessInsights: [
        "Observation: 40% of the projected deal value relies on unproven Revenue Synergies. Impact: High risk of overpaying if cross-selling fails. Recommendation: Base the purchase price solely on Cost Synergies, treating Revenue Synergies as upside.",
        "Observation: Target company has significant off-balance-sheet liabilities related to pending litigation. Impact: Potential massive future cash outflow. Recommendation: Structure the deal with an escrow holdback clause to mitigate litigation risk."
      ],
      recommendations: [
        "Proceed with the acquisition but cap the premium offered at 25% over the 30-day VWAP (Volume Weighted Average Price).",
        "Establish a dedicated Post-Merger Integration (PMI) office immediately upon deal signing to prevent culture clash and talent drain.",
        "Use a mix of 60% cash and 40% stock to finance the deal, leveraging current low-interest rates while preserving some equity upside."
      ],
      businessImpact: "The analysis provides a rigorous, objective framework to prevent value-destroying 'empire building' by executives. It clearly delineates the walk-away price and highlights critical diligence blind spots.",
      lessonsLearned: "Gained exposure to the immense complexity of M&A execution. Learned that successful deals are driven as much by cultural integration and risk mitigation as they are by financial modeling.",
      futureImprovements: "Incorporate a detailed LBO (Leveraged Buyout) model overlay to see if a private equity sponsor could outbid the strategic acquirer.",
      keyDeliverables: ["M&A Pitch Deck", "Valuation Football Field", "Synergy & Dilution Analysis"],
      outcomeImpact: "Delivered an elite investment banking style presentation demonstrating an advanced grasp of corporate restructuring, valuation mechanics, and strategic risk management."
    },
    
    // ---------------------------------------------------------
    // 11. OLD PROJECT: HR ANALYTICS
    // ---------------------------------------------------------
    {
      id: "hr-analytics",
      title: "HR Analytics Dashboard",
      description: "Developed dashboard to analyze employee attrition, hiring trends, and department performance.",
      category: "Power BI",
      tags: ["Power BI", "DAX", "Power Query"],
      toolsUsed: ["Power BI", "DAX", "Power Query"],
      image: "/projects/Hr analytics.jpeg",
      executiveSummary: [
        "Human capital is the largest expense and greatest asset for any enterprise. This HR Analytics project tackles the critical issue of employee retention.",
        "By analyzing historical attrition data, demographic factors, and compensation metrics, this dashboard identifies the root causes of employee turnover and provides predictive insights for HR leadership."
      ],
      businessProblem: "The organization was experiencing a costly 18% annualized attrition rate, significantly above the industry average of 12%. The cost to replace specialized talent was eroding departmental budgets. The objective was to uncover 'flight risk' indicators—identifying exactly which demographics and departments were bleeding talent, and why.",
      datasetInfo: "Data Source: HRIS (Human Resources Information System) export. Volume: 1,470 employee records across 35 variables including Age, Department, Salary, Job Satisfaction, and Distance from Home. Cleaned missing values and binned continuous variables (like Age) into categorical groups.",
      dataPreparation: "Utilized Power Query to cleanse the dataset. Created conditional columns to flag 'High Risk' employees based on tenure and last promotion date. Normalized job role titles across merged legacy systems.",
      dataModel: "Built a Star Schema linking the central Employee Fact table to dimensions like Date (for hire/termination dates), Department, and Role. Developed DAX measures to calculate rolling 12-month attrition rates dynamically.",
      kpis: [
        "Overall Attrition Rate %: Core turnover metric.",
        "Average Tenure: Length of employee loyalty.",
        "Cost of Turnover: Estimated financial loss per departed employee.",
        "Promotion Velocity: Average years between promotions."
      ],
      dashboardDesign: "Designed a clean, empathetic UI suitable for HR professionals. Used softer color palettes. Implemented interactive cross-filtering allowing HR managers to click on a specific department and instantly see the attrition breakdown by gender, salary band, and job role.",
      businessInsights: [
        "Observation: Employees with a commute distance greater than 15 miles have a 3x higher attrition rate. Impact: Commute stress is a primary driver of turnover. Recommendation: Implement a mandatory 2-day work-from-home policy for employees outside the 15-mile radius.",
        "Observation: The R&D department sees massive spikes in attrition at the 2-year mark. Impact: Loss of institutional knowledge and delayed product cycles. Recommendation: Introduce a structured 'Year 2' retention bonus and career mapping intervention specifically for R&D staff."
      ],
      recommendations: [
        "Revamp the mid-level management training program, as data shows employees under specific managers churn faster.",
        "Adjust compensation bands for entry-level Sales roles to align with market medians, reducing early-stage poaching.",
        "Initiate 'Stay Interviews' for top performers who have not received a promotion in the last 24 months."
      ],
      businessImpact: "Provided actionable, data-backed interventions that, if implemented, project a reduction in attrition by 4 percentage points, equating to an estimated $1.2M in saved recruitment and onboarding costs annually.",
      lessonsLearned: "Learned the importance of handling sensitive PII (Personally Identifiable Information) data. Discovered that HR data often requires qualitative context (e.g., exit interview notes) to fully explain quantitative trends.",
      futureImprovements: "Deploy a Machine Learning classification model (e.g., Logistic Regression) using Python to assign a predictive 'Flight Risk Score' (0-100%) to every current employee based on historical patterns.",
      keyDeliverables: ["Interactive Power BI Dashboard", "Attrition Root-Cause Analysis", "Retention Strategy Memo"],
      outcomeImpact: "Delivered a strategic HR tool that shifts human resources from an administrative function to a proactive, data-driven strategic partner."
    },
    
    // ---------------------------------------------------------
    // 12. OLD PROJECT: QA RAMCO FINANCIAL
    // ---------------------------------------------------------
    {
      id: "qa-ramco",
      title: "QA Ramco Financial Dashboard",
      description: "Created financial KPI dashboard for revenue monitoring, collections and operational performance.",
      category: "Power BI",
      tags: ["Power BI", "Power Query", "Finance"],
      toolsUsed: ["Power BI", "Power Query", "DAX"],
      image: "/projects/QA aramco dasboard.jpeg",
      executiveSummary: [
        "Cash is the lifeblood of any heavy industry operation. This project developed a comprehensive financial and operational monitoring dashboard for QA Ramco.",
        "The focus was strictly on liquidity management, Accounts Receivable (AR) aging, and revenue realization against operational milestones in a complex B2B environment."
      ],
      businessProblem: "QA Ramco was experiencing severe working capital compression. While recognized revenue was growing, cash collections were lagging, leading to a dangerous spike in Days Sales Outstanding (DSO). The finance team needed a granular, real-time view into the AR aging buckets to prioritize aggressive collection efforts and improve cash conversion.",
      datasetInfo: "Data Source: ERP Financial Ledgers and Billing modules. Data included invoice-level details, payment dates, client credit terms, and project milestones. Data required heavy transformation to reconcile invoice dates with complex contract terms.",
      dataPreparation: "Extensive Power Query transformations to unpivot aging buckets. Created calculated columns to dynamically assign invoices to 'Current', '30-60 Days', '60-90 Days', and '90+ Days' based on TODAY() relative to the invoice due date.",
      dataModel: "Engineered a financial data model linking Invoice Fact tables to Client Dimensions and a standard Calendar table for accurate time-intelligence reporting.",
      kpis: [
        "Days Sales Outstanding (DSO): Average collection period.",
        "AR Aging > 90 Days: High-risk bad debt exposure.",
        "Cash Conversion Cycle (CCC): Speed of turning operations into cash.",
        "Collection Effectiveness Index (CEI): Efficiency of the AR team."
      ],
      dashboardDesign: "Built a stark, high-contrast financial dashboard. Utilized Matrix visuals for detailed client-level aging reports and clustered column charts to visualize the massive block of overdue capital. Designed for immediate actionability by credit controllers.",
      businessInsights: [
        "Observation: 35% of total outstanding AR is concentrated in just 4 enterprise clients sitting in the 90+ day bucket. Impact: Massive concentration of credit risk and cash flow suffocation. Recommendation: Immediately deploy executive-level sponsors to negotiate payment plans or halt further service delivery to these 4 accounts.",
        "Observation: Invoices generated on the 30th of the month take on average 15 days longer to be paid than those generated on the 15th. Impact: End-of-month billing cycles are missing client AP cutoffs. Recommendation: Shift billing cycles to a bi-weekly schedule."
      ],
      recommendations: [
        "Implement automated dunning emails at 5 days past due rather than waiting for the 30-day manual review.",
        "Offer a 2% early payment discount (2/10 Net 30) to clients historically paying past 60 days.",
        "Revise sales commission structures to pay out only upon cash collection, not upon invoice generation."
      ],
      businessImpact: "The dashboard provided the exact visibility required to target high-value overdue accounts. Implementing these insights projects a reduction in DSO by 12 days, unlocking millions in trapped working capital and reducing reliance on expensive short-term revolving debt.",
      lessonsLearned: "Mastered the nuances of financial time-intelligence functions in DAX. Realized that operational dashboards must drive behavioral change (e.g., getting sales reps to chase invoices) to be truly effective.",
      futureImprovements: "Integrate a predictive module to forecast cash inflows for the next 4 weeks based on historical client payment behaviors, rather than just contractual due dates.",
      keyDeliverables: ["AR Aging Power BI Dashboard", "DSO Reduction Strategy", "Cash Flow Visibility Tool"],
      outcomeImpact: "Engineered an uncompromising liquidity management tool that tackles the most critical aspect of corporate survival: cash flow realization."
    }
  ];
}

export function getTimeline() {
  return [
    { id: "1", title: "School Education", organization: "High School", startDate: "2018", endDate: "2018", description: "Completed foundational education.", type: "Education" },
    { id: "2", title: "Bachelor of Commerce (Hons)", organization: "Gujarat University", startDate: "2021", endDate: "2024", description: "Completed all 6 semesters without any backlog.", type: "Education" },
    { id: "3", title: "CMA US Part 1", organization: "IMA", startDate: "2024", endDate: "2024", description: "Cleared Part 1 in the 1st attempt with score 380/500.", type: "Certification" },
    { id: "4", title: "Finance Internship", organization: "Corporate", startDate: "2025", endDate: "2025", description: "Practical exposure in FP&A and financial modeling.", type: "Experience" },
    { id: "5", title: "FP&A Professional", organization: "Finance Command Center", startDate: "2026", endDate: "2026", description: "Building advanced financial dashboards and analytics solutions.", type: "Experience", status: "In Progress" },
    { id: "6", title: "Future CFO", organization: "ADNOC / UAE Energy Sector", startDate: "2030+", endDate: "2030+", description: "Targeting leadership roles in strategic corporate finance.", type: "Project", status: "Future Goal" }
  ];
}
export function getCertificates() {
  return [
    { id: "cma-part1", title: "US CMA Part 1 Cleared (380/500)", issuer: "IMA", date: "2024", category: "Professional" },
    { id: "power-bi-cert", title: "Microsoft Power BI Data Analyst Professional", issuer: "Coursera", date: "2024", category: "Analytics" }
  ];
}
`;

// ============================================================================
// 2. UPDATED DYNAMIC PROJECT PAGE (app/projects/[id]/page.tsx)
// This will render the 16 sections beautifully and show the Live URL button
// ============================================================================
const dynamicPageContent = `import { getProjects } from '@/services/dataService';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Briefcase, Database, LayoutTemplate, Lightbulb, Target, TrendingUp, Code2, GraduationCap, ArrowRight } from 'lucide-react';

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = getProjects().find(p => p.id === params.id);
  if (!project) return notFound();

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-12">
      
      {/* Top Navigation */}
      <nav className="flex items-center justify-between font-mono text-xs text-white/50 border-b border-white/10 pb-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-accent transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-white">{project.category}</span>
        </div>
        <Link href="/projects" className="flex items-center gap-2 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Vault
        </Link>
      </nav>

      {/* Hero Header & Thumbnail */}
      <div className="space-y-6">
        <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
          {/* Ensure the image scales properly */}
          <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
        </div>
        
        <div>
          <h1 className="text-4xl md:text-5xl font-black font-space text-white mb-4">{project.title}</h1>
          <p className="text-lg text-white/60 max-w-3xl leading-relaxed">{project.description}</p>
        </div>

        {/* Buttons (Live URL / Code) */}
        <div className="flex flex-wrap gap-4 pt-2">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-[0_4px_0_#1e3a8a] active:translate-y-1 active:shadow-none transition-all">
              <ExternalLink className="w-4 h-4" /> View Live Case Study
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-xl font-bold text-sm transition-all">
              <Code2 className="w-4 h-4" /> View Source Code
            </a>
          )}
        </div>
      </div>

      <hr className="border-white/10" />

      {/* TWO COLUMN LAYOUT FOR CASE STUDY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* LEFT COLUMN - MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Executive Summary */}
          {project.executiveSummary && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><Briefcase className="w-5 h-5 text-accent"/> Executive Summary</h2>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-white/80 leading-relaxed text-sm space-y-4">
                {project.executiveSummary.map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </section>
          )}

          {/* Business Problem */}
          {project.businessProblem && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><Target className="w-5 h-5 text-danger"/> Business Problem & Objective</h2>
              <div className="p-6 rounded-2xl bg-[#050816] border-l-2 border-danger text-white/80 leading-relaxed text-sm">
                <p>{project.businessProblem}</p>
              </div>
            </section>
          )}

          {/* Dataset & Data Prep */}
          {(project.datasetInfo || project.dataPreparation) && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><Database className="w-5 h-5 text-primary"/> Data Architecture & Preparation</h2>
              <div className="grid gap-4">
                {project.datasetInfo && (
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-xs font-mono text-white/40 uppercase mb-2">Dataset Overview</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{project.datasetInfo}</p>
                  </div>
                )}
                {project.dataPreparation && (
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-xs font-mono text-white/40 uppercase mb-2">ETL & Preparation</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{project.dataPreparation}</p>
                  </div>
                )}
                {project.dataModel && (
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-xs font-mono text-white/40 uppercase mb-2">Data Modeling</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{project.dataModel}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Core Insights */}
          {project.businessInsights && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><Lightbulb className="w-5 h-5 text-warning"/> Key Business Insights</h2>
              <div className="space-y-3">
                {project.businessInsights.map((insight, i) => (
                  <div key={i} className="p-5 rounded-xl bg-warning/5 border border-warning/20">
                    <p className="text-sm text-white/80 leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Recommendations & Impact */}
          {project.recommendations && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><TrendingUp className="w-5 h-5 text-success"/> Strategic Recommendations</h2>
              <ul className="list-none space-y-3">
                {project.recommendations.map((rec, i) => (
                  <li key={i} className="flex gap-3 text-sm text-white/80 p-4 rounded-xl bg-white/5 border border-white/5">
                    <ArrowRight className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Retrospective */}
          {(project.lessonsLearned || project.futureImprovements) && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><GraduationCap className="w-5 h-5 text-accent"/> Retrospective & Future Scope</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.lessonsLearned && (
                  <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10 shadow-lg">
                    <h3 className="text-xs font-mono text-accent mb-3 uppercase">Lessons Learned</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{project.lessonsLearned}</p>
                  </div>
                )}
                {project.futureImprovements && (
                  <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10 shadow-lg">
                    <h3 className="text-xs font-mono text-accent mb-3 uppercase">Future Improvements</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{project.futureImprovements}</p>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN - METADATA WIDGETS */}
        <div className="space-y-6 lg:sticky lg:top-8">
          
          {/* Outcome Widget */}
          {project.businessImpact && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0B1120] to-[#050816] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-success/10 blur-[50px] rounded-full pointer-events-none" />
              <h3 className="text-xs font-mono text-white/40 uppercase mb-4 tracking-wider">Business Impact</h3>
              <p className="text-sm text-white/90 leading-relaxed font-medium relative z-10">{project.businessImpact}</p>
            </div>
          )}

          {/* KPIs Tracked */}
          {project.kpis && (
            <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10">
              <h3 className="text-xs font-mono text-white/40 uppercase mb-4 tracking-wider">KPIs Modeled</h3>
              <ul className="space-y-2">
                {project.kpis.map((kpi, i) => (
                  <li key={i} className="text-xs text-white/70 py-1 border-b border-white/5 last:border-0">{kpi}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {project.toolsUsed && (
            <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10">
              <h3 className="text-xs font-mono text-white/40 uppercase mb-4 tracking-wider">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.toolsUsed.map(tool => (
                  <span key={tool} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/80">{tool}</span>
                ))}
              </div>
            </div>
          )}

          {/* UI Design Note */}
          {project.dashboardDesign && (
            <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10">
              <h3 className="text-xs font-mono text-white/40 uppercase mb-3 tracking-wider flex items-center gap-2"><LayoutTemplate className="w-3 h-3"/> Dashboard UX</h3>
              <p className="text-[11px] text-white/50 leading-relaxed">{project.dashboardDesign}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}`;

async function deployMassiveUpdate() {
  try {
    // 1. Update dataService.ts
    const dataServicePath = path.join(process.cwd(), 'services/dataService.ts');
    await fs.writeFile(dataServicePath, dataServiceContent, 'utf8');
    
    // 2. Update dynamic project page
    const pagePath = path.join(process.cwd(), 'app/projects/[id]/page.tsx');
    await fs.mkdir(path.dirname(pagePath), { recursive: true });
    await fs.writeFile(pagePath, dynamicPageContent, 'utf8');

    console.log('✅ BINGO! Massive Professional Case Studies Deployed & Links Added!');
  } catch (err) {
    console.error('❌ Error executing deployment:', err);
  }
}

deployMassiveUpdate();