/* Project data – add, remove, or edit entries here.
   category: becomes a filter button automatically (Research, Dashboards, Applied AI, Digital Product)
   featured: true makes the card wider and dark green
   details: bullet points shown in the pop-up when the card is clicked */
window.PROJECTS = [
  {
    title: "Life Assurance Policy Retention",
    category: "Research",
    featured: true,
    subtitle: "Bachelor's dissertation · Survival analysis & machine learning",
    summary: "Compared survival analysis with ensemble learning on 30,000 anonymized policies to identify lapse risk and support earlier retention decisions.",
    tags: ["Python", "Survival Analysis", "CatBoost", "Insurance"],
    details: [
      "Investigated a 17.3% life-insurance policy lapse ratio in Zimbabwe.",
      "Distinguished mid-term cancellations from end-of-term non-renewals.",
      "Used a Weibull accelerated failure time model to estimate time to policy lapse.",
      "Built a CatBoost model that achieved 83.19% accuracy and 45.72% precision.",
      "Demonstrated how predictive analytics can support customer-retention decisions."
    ],
    note: "Full dissertation available on request.",
    links: []
  },
  {
    title: "Longevity Risk in Zimbabwean Pensions",
    category: "Research",
    subtitle: "Actuarial research · Mortality forecasting",
    summary: "Used simulated population data and the Lee-Carter mortality model to examine longevity risk, forecast mortality improvement, and discuss pension sustainability.",
    tags: ["R", "Lee-Carter", "Mortality Forecasting", "Pensions"],
    details: [
      "Applied the Lee-Carter model to simulated population data.",
      "Forecast mortality improvement and quantified longevity risk.",
      "Discussed implications for pension-fund sustainability in Zimbabwe."
    ],
    note: "Full research report available on request.",
    links: []
  },
  {
    title: "Finance and Insurance Dashboards",
    category: "Dashboards",
    subtitle: "Excel · Financial analysis & reporting",
    summary: "A growing collection of analytical dashboards covering cash forecasts, profit projections, debtors ageing, reserves, and portfolio monitoring.",
    tags: ["Excel", "Financial Analysis", "Forecasting", "Reporting"],
    details: [
      "Cash forecasts and profit projections.",
      "Debtors ageing and portfolio monitoring.",
      "Insurance reserves, including IBNR, UPR, and DAC."
    ],
    note: "Dashboard files and links coming next.",
    links: []
  },
  {
    title: "Roja Scout Property Platform",
    category: "Applied AI",
    subtitle: "Sole creator & product owner · Web and Android",
    summary: "My independently created property marketplace for Zimbabwe, bringing together rental search, housing requests, verification, messaging, and AI-assisted discovery.",
    tags: ["Product Ownership", "Applied AI", "Property Data", "Marketplace"],
    details: [
      "Property search and filtering workflows.",
      "AI-assisted property discovery.",
      "Listing quality, verification, and community reporting.",
      "Direct, private communication between users.",
      "Housing requests and property matching.",
      "Android app with listing alerts, saved properties, and landlord messaging."
    ],
    note: "Built with ChatGPT, Claude Sonnet, Gemini 3.1 Pro, and DeepSeek as AI collaborators.",
    links: [
      { label: "Visit website", url: "https://www.rojascout.co.zw" },
      { label: "Android app", url: "https://play.google.com/store/apps/details?id=com.rojascout.app" }
    ]
  },
  {
    title: "Roja Scout WhatsApp Search Chatbot",
    category: "Digital Product",
    subtitle: "Conversational property search",
    summary: "A WhatsApp-based property search chatbot that helps people find Roja Scout listings through a familiar channel, designed around WhatsApp's widespread use in Zimbabwe.",
    tags: ["WhatsApp", "Property Search", "User Experience", "Housing"],
    details: [
      "Lets users search Roja Scout listings directly inside WhatsApp.",
      "Designed around WhatsApp's widespread use in Zimbabwe.",
      "Lowers the barrier to property search for mobile-first users."
    ],
    note: "",
    links: [{ label: "Explore Roja Scout", url: "https://www.rojascout.co.zw" }]
  }
];
