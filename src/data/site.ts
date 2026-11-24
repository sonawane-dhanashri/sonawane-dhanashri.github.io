// Site-wide facts: identity, contact links, experience and education.
export const SITE = {
  name: "Dhanashri Sonawane",
  role: "Software engineer, generative AI",
  jobTitle: "Software Engineer",
  location: "Pune, India",
  email: "dhanashrisunilsonawane147@gmail.com",
  github: "https://github.com/sonawane-dhanashri",
  linkedin: "https://www.linkedin.com/in/dhanashri-sunil-sonawane/",
  instagram: "https://instagram.com/canvasofdhanu",
  resume: "/Dhanashri_Sonawane_Resume.pdf",
  title: "Dhanashri Sonawane | Software Engineer, Generative AI",
  description:
    "Dhanashri Sonawane is a software engineer in Pune building generative AI products: LLM pipelines, voice agents and multi-agent systems with Python and FastAPI.",
} as const;

export const EXPERIENCE = [
  {
    period: "Apr 2025 – Sep 2026",
    title: "Junior Software Engineer, AI/ML",
    place: "SwayAlgo Technologies Pvt. Ltd., Pune",
    detail:
      "Built a brand-to-campaign generation platform, a real-time voice support agent, a multi-agent learning assistant and a Node.js backend-for-frontend with JWT authentication.",
  },
  {
    period: "Aug 2024 – Mar 2025",
    title: "Associate, Networking",
    place: "Tech Mahindra, Pune",
    detail:
      "Worked in network operations, maintaining and optimising network infrastructure to keep connectivity reliable.",
  },
  {
    period: "Oct 2023 – Jan 2024",
    title: "Azure and DevOps intern",
    place: "Magic Bus India Foundation, Pune (Accenture CSR programme, with Microsoft Future Ready Talent)",
    detail:
      "Hands-on training on Microsoft Azure: compute, storage, networking, AI services, RBAC and cost management. Built and deployed a multilingual translator web app with Azure Translator and a Python Flask backend on Azure App Service. Received the Best Performance award for the programme.",
  },
] as const;

export const CERTIFICATIONS = [
  {
    period: "",
    title: "Microsoft Certified: Azure Fundamentals (AZ-900)",
    place: "Microsoft",
    detail: "",
  },
] as const;

export const EDUCATION = [
  {
    period: "2023 – 2025",
    title: "Master of Computer Applications (MCA)",
    place: "Sinhgad Institute of Management, SPPU, Pune",
    detail: "",
  },
  {
    period: "2020 – 2023",
    title: "B.Sc. Computer Science",
    place: "GES's HPT Arts and RYK Science College, SPPU",
    detail: "Coursework in machine learning, deep learning and natural language processing.",
  },
] as const;
