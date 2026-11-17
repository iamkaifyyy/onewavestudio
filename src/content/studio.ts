export interface StudioConfig {
  name: string;
  tagline: string;
  shortDescription: string;
  availability: string;
  calLink: string;
  chatLink: string;
  email: string;
  socials: {
    x: string;
    linkedin: string;
    github: string;
  };
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
}

export const STUDIO: StudioConfig = {
  name: "ynz studio",
  tagline: "Idea to shipped AI product, in weeks.",
  shortDescription:
    "We design, build, and deploy high-performance AI-native software and MVPs for ambitious founders and startups.",
  availability: "Booking for Q1 2027",
  calLink: "https://cal.com/iamkaifyyy/15min",
  chatLink: "https://t.me/iamkaifyyy",
  email: "hello@ynz.studio",
  socials: {
    x: "https://x.com/Iamkaifyyy",
    linkedin: "https://linkedin.com/in/iamkaifyyy",
    github: "https://github.com/iamkaifyyy",
  },
  metrics: [
    {
      value: "2–4 Wks",
      label: "Average MVP Velocity",
      description: "From kickoff to production deployment",
    },
    {
      value: "100%",
      label: "Code & Asset Ownership",
      description: "You own all IP, repos, and designs",
    },
    {
      value: "1st Place",
      label: "Hackathon Recognition",
      description: "Vernacular AI multi-agent platform",
    },
    {
      value: "Zero",
      label: "Account Managers",
      description: "Direct access to senior builders",
    },
  ],
};
