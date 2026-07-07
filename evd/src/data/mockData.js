export const interventions = [
  "Conditional Cash Transfers",
  "Agricultural Training",
  "Microfinance Programs",
  "Nutrition Supplementation",
  "School Feeding",
  "Water & Sanitation (WASH)",
  "Women\u2019s Empowerment",
  "Digital Literacy",
];

export const outcomes = [
  "Income / Poverty",
  "Food Security",
  "Child Health",
  "School Enrollment",
  "Gender Equality",
  "Mental Health",
  "Employment",
  "Community Cohesion",
];

const studies = [
  // Conditional Cash Transfers
  { intervention: "Conditional Cash Transfers", outcome: "Income / Poverty", title: "CCTs and Household Income: Evidence from Oportunidades", authors: "Fiszbein, A. & Schady, N.", year: 2009, journal: "World Bank Research Observer" },
  { intervention: "Conditional Cash Transfers", outcome: "Income / Poverty", title: "Long-Term Impacts of Conditional Cash Transfers on Poverty", authors: "Barrientos, A. & Dejong, J.", year: 2006, journal: "Journal of Development Studies" },
  { intervention: "Conditional Cash Transfers", outcome: "School Enrollment", title: "Conditional Cash Transfers and School Enrollment in Latin America", authors: "Baird, S. et al.", year: 2011, journal: "Economic Journal" },
  { intervention: "Conditional Cash Transfers", outcome: "School Enrollment", title: "Cash for Schooling and Long-Term Educational Attainment", authors: "Molyneaux, R. & Skoufias, E.", year: 2014, journal: "World Development" },
  { intervention: "Conditional Cash Transfers", outcome: "Child Health", title: "Impact of CCTs on Child Health Outcomes in Brazil", authors: "Rasella, D. et al.", year: 2013, journal: "The Lancet" },
  { intervention: "Conditional Cash Transfers", outcome: "Child Health", title: "Bolsa Fam\u00edlia and Child Mortality: A Quasi-Experimental Study", authors: "Rasella, D. et al.", year: 2015, journal: "PLoS Medicine" },
  { intervention: "Conditional Cash Transfers", outcome: "Gender Equality", title: "CCTs and Female Autonomy in South Asia", authors: "Mazumdar, S. et al.", year: 2017, journal: "World Development" },
  { intervention: "Conditional Cash Transfers", outcome: "Employment", title: "Labour Market Effects of Mexico\u2019s Progresa Programme", authors: "Parker, S.W. & Todd, P.E.", year: 2010, journal: "Journal of Human Resources" },

  // Agricultural Training
  { intervention: "Agricultural Training", outcome: "Income / Poverty", title: "Agricultural Extension and Farm Profitability in Kenya", authors: "Zezza, A. & Tasciotti, L.", year: 2010, journal: "Food Policy" },
  { intervention: "Agricultural Training", outcome: "Income / Poverty", title: "Farmer Training and Agricultural Productivity in Ethiopia", authors: "Abate, G.T. et al.", year: 2018, journal: "Agricultural Economics" },
  { intervention: "Agricultural Training", outcome: "Food Security", title: "Training for Food Security: Evidence from Uganda", authors: "Kilic, T. & Zezza, A.", year: 2007, journal: "Food Security" },
  { intervention: "Agricultural Training", outcome: "Food Security", title: "Climate-Smart Agriculture and Household Food Security", authors: "Lipper, L. et al.", year: 2014, journal: "Food Policy" },
  { intervention: "Agricultural Training", outcome: "Employment", title: "Skills Training and Youth Employment in Rural Tanzania", authors: "Awuni, J.A. et al.", year: 2015, journal: "Journal of Development Studies" },

  // Microfinance Programs
  { intervention: "Microfinance Programs", outcome: "Income / Poverty", title: "Microfinance and Poverty Reduction: A Meta-Analysis", authors: "Duvendack, M. et al.", year: 2011, journal: "Evidence & Policy" },
  { intervention: "Microfinance Programs", outcome: "Income / Poverty", title: "The Microfinance Promise", authors: "Morduch, J.", year: 1999, journal: "Journal of Economic Literature" },
  { intervention: "Microfinance Programs", outcome: "Employment", title: "Microfinance and Employment: Evidence from Randomized Evaluation in Mexico", authors: "Angelucci, M. et al.", year: 2015, journal: "American Economic Journal: Applied Economics" },
  { intervention: "Microfinance Programs", outcome: "Gender Equality", title: "Microfinance and Women\u2019s Empowerment: Evidence from India", authors: "Kabeer, N.", year: 2005, journal: "Development and Change" },
  { intervention: "Microfinance Programs", outcome: "Mental Health", title: "Microfinance Stress and Mental Health in Low-Income Populations", authors: "Hollahn, M. et al.", year: 2019, journal: "Social Science & Medicine" },
  { intervention: "Microfinance Programs", outcome: "Community Cohesion", title: "Group Lending and Social Capital: Evidence from Ghana", authors: "Woolcock, M. & Narayan, D.", year: 2000, journal: "World Development" },

  // Nutrition Supplementation
  { intervention: "Nutrition Supplementation", outcome: "Child Health", title: "Vitamin A Supplementation and Under-Five Mortality", authors: "Imdad, A. et al.", year: 2017, journal: "Cochrane Database of Systematic Reviews" },
  { intervention: "Nutrition Supplementation", outcome: "Child Health", title: "Iron-Fortified Flour and Anaemia in Young Children", authors: "Galloway, R. et al.", year: 2014, journal: "American Journal of Clinical Nutrition" },
  { intervention: "Nutrition Supplementation", outcome: "Food Security", title: "Therapeutic Feeding and Recovery from Severe Acute Malnutrition", authors: "Wilbur, J. et al.", year: 2018, journal: "BMJ Global Health" },
  { intervention: "Nutrition Supplementation", outcome: "Income / Poverty", title: "Nutritional Supplementation and Economic Productivity in India", authors: "Thomas, D. & Strauss, J.", year: 1997, journal: "Review of Economics and Statistics" },
  { intervention: "Nutrition Supplementation", outcome: "School Enrollment", title: "School Feeding and Nutrition Interventions on Enrollment", authors: "Jukes, M. et al.", year: 2008, journal: "International Journal of Educational Development" },

  // School Feeding
  { intervention: "School Feeding", outcome: "School Enrollment", title: "School Feeding Programmes and Enrollment in Low-Income Countries", authors: "Jensen, J.D. & Smed, S.", year: 2012, journal: "Food and Nutrition Bulletin" },
  { intervention: "School Feeding", outcome: "School Enrollment", title: "Mid-Day Meal Scheme and School Participation in India", authors: "Afridi, F.", year: 2010, journal: "Journal of Development Economics" },
  { intervention: "School Feeding", outcome: "Child Health", title: "School Feeding and Nutritional Status of Children in Kenya", authors: "Vermeersch, C. & Kremer, M.", year: 2005, journal: "Journal of Development Studies" },
  { intervention: "School Feeding", outcome: "Food Security", title: "Home-Grown School Feeding and Local Food Procurement", authors: "Bereau of Food Security", year: 2013, journal: "FAO Technical Report" },
  { intervention: "School Feeding", outcome: "Gender Equality", title: "School Feeding and Girls\u2019 Retention in Sub-Saharan Africa", authors: "Kremer, M. et al.", year: 2009, journal: "Quarterly Journal of Economics" },

  // Water & Sanitation (WASH)
  { intervention: "Water & Sanitation (WASH)", outcome: "Child Health", title: "WASH Interventions and Diarrheal Disease: A Systematic Review", authors: "Wolf, J. et al.", year: 2018, journal: "International Journal of Hygiene and Environmental Health" },
  { intervention: "Water & Sanitation (WASH)", outcome: "Child Health", title: "Sanitation and Child Growth in Rural India", authors: "Jalan, J. & Ravallion, M.", year: 2003, journal: "World Bank Economic Review" },
  { intervention: "Water & Sanitation (WASH)", outcome: "School Enrollment", title: "School Sanitation, Hygiene and Enrollment in Ghana", authors: "Hawkes, S. et al.", year: 2015, journal: "Tropical Medicine & International Health" },
  { intervention: "Water & Sanitation (WASH)", outcome: "Community Cohesion", title: "Community-Led Total Sanitation and Social Cohesion", authors: "Kar, K. & Chambers, R.", year: 2008, journal: "IDS Practice Paper" },
  { intervention: "Water & Sanitation (WASH)", outcome: "Mental Health", title: "Water Access and Psychological Well-Being in Developing Settings", authors: "Wutich, A. & Ragsdale, K.", year: 2008, journal: "Social Science & Medicine" },

  // Women's Empowerment
  { intervention: "Women\u2019s Empowerment", outcome: "Gender Equality", title: "Women\u2019s Empowerment and Reproductive Health in Nigeria", authors: "Okonkwo, I.A. et al.", year: 2017, journal: "BMC Women\u2019s Health" },
  { intervention: "Women\u2019s Empowerment", outcome: "Gender Equality", title: "Self-Help Groups and Women\u2019s Decision-Making in India", authors: "Desai, S. & Joshi, H.", year: 2014, journal: "Economic and Political Weekly" },
  { intervention: "Women\u2019s Empowerment", outcome: "Income / Poverty", title: "Women\u2019s Economic Empowerment and Household Welfare", authors: "Duflo, E.", year: 2012, journal: "American Economic Review" },
  { intervention: "Women\u2019s Empowerment", outcome: "Mental Health", title: "Gender-Based Violence Interventions and Mental Health Outcomes", authors: "Garcia-Moreno, C. et al.", year: 2014, journal: "The Lancet" },
  { intervention: "Women\u2019s Empowerment", outcome: "Child Health", title: "Maternal Autonomy and Child Health in Rural Ethiopia", authors: "Asfaw, S. et al.", year: 2010, journal: "Social Science & Medicine" },
  { intervention: "Women\u2019s Empowerment", outcome: "Community Cohesion", title: "Women\u2019s Groups and Community Development in Malawi", authors: "Bowler, L. et al.", year: 2002, journal: "Journal of International Development" },

  // Digital Literacy
  { intervention: "Digital Literacy", outcome: "Employment", title: "Digital Skills Training and Youth Employment in Kenya", authors: "Hjort, K. & Poulsen, J.", year: 2019, journal: "American Economic Journal: Applied Economics" },
  { intervention: "Digital Literacy", outcome: "Employment", title: "ICT Training and Labour Market Outcomes in Developing Countries", authors: "Navarro, L. & Gallastegui, I.", year: 2016, journal: "Information Development" },
  { intervention: "Digital Literacy", outcome: "Income / Poverty", title: "Mobile Money and Income Smoothing in East Africa", authors: "Jack, W. & Suri, T.", year: 2014, journal: "American Economic Review" },
  { intervention: "Digital Literacy", outcome: "Community Cohesion", title: "Social Media and Community Engagement in Rural Africa", authors: "Aker, J.C. & Mbiti, I.M.", year: 2010, journal: "Journal of Economic Perspectives" },
  { intervention: "Digital Literacy", outcome: "School Enrollment", title: "E-Learning and Access to Education in Conflict-Affected Settings", authors: "Hall, B. et al.", year: 2020, journal: "International Review of Education" },
];

export default studies;
