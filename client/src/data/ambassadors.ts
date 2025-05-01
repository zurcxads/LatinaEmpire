// Define the Ambassador interface
export interface Ambassador {
  id: string;
  slug: string;
  name: string;
  title: string;
  location: string;
  country: string;
  quote: string;
  shortBio: string;
  fullBio: string;
  image: string;
  bannerImage?: string;
  socialMedia: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  yearsInProgram: number;
  eventsHosted: number;
  membersSince: string;
  languages: string[];
  expertise: string[];
}

// Sample data for the ambassadors
export const ambassadors: Ambassador[] = [
  {
    id: "1",
    slug: "isabela-rodriguez",
    name: "Isabela Rodriguez",
    title: "Regional Director, Northeast",
    location: "New York City",
    country: "USA",
    quote: "Our cultural heritage is our greatest strength in leadership.",
    shortBio: "Corporate executive turned entrepreneur, mentoring Latinas in finance and tech.",
    fullBio: "Isabela Rodriguez is a seasoned financial executive with over 15 years of experience in investment banking and fintech. After climbing the corporate ladder at a major Wall Street firm, she founded her own financial advisory practice focused on helping Latina entrepreneurs secure funding and scale their businesses. As a Regional Director for Latina Empire, Isabela leads our Northeast community, organizing monthly events and facilitating connections between members. Her passion for financial literacy has led her to develop specialized workshops that have helped hundreds of Latina professionals navigate career transitions, negotiate higher salaries, and build generational wealth.\n\nIsabela holds an MBA from Columbia Business School and serves on the boards of several nonprofit organizations focused on advancing Latinx representation in business and finance. When she's not mentoring or speaking at events, she enjoys salsa dancing, exploring New York's diverse food scene, and spending time with her family.",
    image: "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    bannerImage: "https://images.unsplash.com/photo-1599598177991-ec67b5c37318?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80",
    socialMedia: {
      instagram: "isabelarodriguez",
      linkedin: "isabelarodriguez",
      twitter: "isabelarodriguez",
      website: "isabelarodriguez.com"
    },
    yearsInProgram: 4,
    eventsHosted: 26,
    membersSince: "2019",
    languages: ["English", "Spanish", "Portuguese"],
    expertise: ["Financial Literacy", "Career Transitions", "Leadership Development"]
  },
  {
    id: "2",
    slug: "gabriela-mendoza",
    name: "Gabriela Mendoza",
    title: "Tech Community Lead",
    location: "San Francisco",
    country: "USA",
    quote: "Technology needs more Latina voices to truly solve global challenges.",
    shortBio: "Software engineer and startup founder advocating for Latinas in tech.",
    fullBio: "Gabriela Mendoza is a software engineer, entrepreneur, and advocate for diversity in technology. After graduating with a degree in Computer Science from Stanford University, she worked at several major tech companies in Silicon Valley before founding her own AI startup focused on language preservation and accessibility. As Latina Empire's Tech Community Lead, Gabriela organizes hackathons, coding workshops, and networking events that have helped hundreds of Latinas break into and advance in tech careers.\n\nRecognized by Forbes 30 Under 30 for her work in technology, Gabriela is passionate about creating pathways for underrepresented groups in STEM fields. Her signature program, 'Code Like a Latina,' has provided technical skills training and mentorship to over 500 young Latinas across the country. Gabriela regularly speaks at conferences about the intersection of technology, identity, and social impact, and has been featured in major publications for her work in making tech more inclusive.\n\nWhen she's not coding or community building, Gabriela enjoys hiking in Northern California, experimenting with fusion cooking, and mentoring first-generation college students.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    bannerImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80",
    socialMedia: {
      instagram: "gabmendoza",
      linkedin: "gabrielamendoza",
      twitter: "gabmendoza",
      website: "gabrielamendoza.dev"
    },
    yearsInProgram: 3,
    eventsHosted: 18,
    membersSince: "2020",
    languages: ["English", "Spanish"],
    expertise: ["Software Development", "AI & Machine Learning", "Public Speaking"]
  },
  {
    id: "3",
    slug: "carmen-santos",
    name: "Carmen Santos",
    title: "Wellness Ambassador",
    location: "Miami",
    country: "USA",
    quote: "True leadership begins with self-care and honoring our whole selves.",
    shortBio: "Holistic health practitioner integrating ancestral wisdom with modern wellness practices.",
    fullBio: "Carmen Santos is a certified health coach, yoga instructor, and holistic wellness advocate with a passion for helping Latinas prioritize their wellbeing while pursuing their ambitions. With a background in psychology and traditional healing practices, Carmen creates integrated wellness programs that honor cultural traditions while incorporating evidence-based modern approaches to health. As Latina Empire's Wellness Ambassador, she leads retreats, workshops, and online programs focused on stress management, burnout prevention, and sustainable success.\n\nAfter experiencing her own health crisis while working in corporate marketing, Carmen underwent a profound transformation that led her to study various healing modalities across Latin America and Asia. She now brings these diverse influences into her work with Latina professionals and entrepreneurs who are seeking balance in their high-achieving lives. Her signature program, 'Ancestral Wisdom, Modern Power,' has been featured in several wellness publications and helps women reconnect with their cultural roots as a source of strength and healing.\n\nCarmen is also the author of 'Reclaim Your Roots,' a guide to Latina wellness that blends traditional practices with contemporary science. When not teaching or writing, she can be found tending to her medicinal herb garden, practicing flamenco, or hosting community healing circles in her Miami neighborhood.",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    bannerImage: "https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80",
    socialMedia: {
      instagram: "carmensantoswellness",
      linkedin: "carmensantos",
      twitter: "carmensantos",
      website: "carmensantoswellness.com"
    },
    yearsInProgram: 5,
    eventsHosted: 32,
    membersSince: "2018",
    languages: ["English", "Spanish", "Portuguese"],
    expertise: ["Holistic Health", "Stress Management", "Cultural Wellness Practices"]
  },
  {
    id: "4",
    slug: "valeria-ortiz",
    name: "Valeria Ortiz",
    title: "Creative Industries Ambassador",
    location: "Los Angeles",
    country: "USA",
    quote: "Our stories and creative expressions are powerful vehicles for change.",
    shortBio: "Award-winning filmmaker and media executive championing Latina representation in entertainment.",
    fullBio: "Valeria Ortiz is an award-winning filmmaker, producer, and advocate for Latinx representation in media and entertainment. With over a decade of experience in Hollywood, she has worked on major studio productions while simultaneously creating independent films that center authentic Latina narratives. As Latina Empire's Creative Industries Ambassador, Valeria leads initiatives to help members build careers in film, television, publishing, and other creative fields through networking events, portfolio reviews, and mentorship programs.\n\nA graduate of USC's School of Cinematic Arts, Valeria's documentary 'Daughters of the Revolution' won acclaim at major film festivals and her production company focuses on developing content by and about women of color. Her industry workshops have helped hundreds of aspiring Latina creatives navigate the entertainment industry, understand contracts and negotiations, and build sustainable careers in the arts.\n\nValeria serves on the boards of several organizations working to increase diversity in media, including the Latinx Film Coalition and Women in Entertainment Empowerment Network. When she's not on set or leading workshops, Valeria enjoys photography, exploring LA's art scene, and mentoring young filmmakers from underserved communities.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    bannerImage: "https://images.unsplash.com/photo-1611516491426-03025e6043c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80",
    socialMedia: {
      instagram: "valeriaortizfilms",
      linkedin: "valeriaortiz",
      twitter: "valeriaortiz",
      website: "valeriaortiz.com"
    },
    yearsInProgram: 2,
    eventsHosted: 14,
    membersSince: "2021",
    languages: ["English", "Spanish"],
    expertise: ["Film Production", "Media Representation", "Creative Entrepreneurship"]
  },
  {
    id: "5",
    slug: "elena-vargas",
    name: "Elena Vargas",
    title: "European Regional Director",
    location: "Barcelona",
    country: "Spain",
    quote: "Building bridges between cultures creates opportunities for all Latinas globally.",
    shortBio: "International business consultant connecting European and Latin American markets.",
    fullBio: "Elena Vargas is an international business consultant, cross-cultural communication expert, and champion for Latina professionals in Europe. Born in Colombia and educated in Spain, Elena has built a career helping companies expand across European and Latin American markets while navigating cultural differences effectively. As Latina Empire's European Regional Director, she has established thriving communities in Barcelona, Madrid, London, and Berlin, creating valuable networks for Latinas living abroad.\n\nWith an MBA from ESADE Business School and extensive experience in international relations, Elena specializes in helping professionals leverage their bicultural identity as a competitive advantage in global business. Her signature program, 'Global Latina Leadership,' provides mentorship and strategic guidance to women navigating international careers, and has been adopted by several multinational corporations for their leadership development initiatives.\n\nElena regularly speaks at international business conferences about diaspora economics, women's leadership across cultures, and the growing influence of Latinx professionals in the global marketplace. She is fluent in five languages and has lived in seven countries throughout her career. When not working or traveling, Elena enjoys sailing on the Mediterranean, studying art history, and hosting cross-cultural dinner gatherings that bring together diverse professionals in her adopted home of Barcelona.",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    bannerImage: "https://images.unsplash.com/photo-1513735539099-cf6e5d559d82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80",
    socialMedia: {
      instagram: "elenavargas_global",
      linkedin: "elenavargas",
      twitter: "elenavargas",
      website: "elenavargas.com"
    },
    yearsInProgram: 3,
    eventsHosted: 23,
    membersSince: "2020",
    languages: ["English", "Spanish", "Catalan", "French", "Portuguese"],
    expertise: ["International Business", "Cross-Cultural Communication", "Public Speaking"]
  },
  {
    id: "6",
    slug: "alejandra-torres",
    name: "Alejandra Torres",
    title: "Entrepreneurship Ambassador",
    location: "Mexico City",
    country: "Mexico",
    quote: "Entrepreneurship is about creating the future you want to see in the world.",
    shortBio: "Serial entrepreneur who has built and sold three successful companies.",
    fullBio: "Alejandra Torres is a serial entrepreneur, angel investor, and business strategist who has successfully founded and scaled multiple companies across Latin America. After launching her first venture at age 23, she has gone on to build and sell three technology companies, and now invests in and advises early-stage startups with a focus on women-led businesses. As Latina Empire's Entrepreneurship Ambassador, Alejandra leads bootcamps, funding workshops, and mentorship programs designed to help Latinas launch and grow sustainable businesses.\n\nWith degrees in engineering and business administration, Alejandra combines technical knowledge with strategic vision to help entrepreneurs solve complex problems and identify market opportunities. Her accelerator program, 'Latina Founders Lab,' has helped launch over 40 companies that have collectively raised more than $15 million in funding. Alejandra is particularly passionate about supporting businesses that address social and environmental challenges while creating economic opportunity in Latin American communities.\n\nAlejandra has been recognized by numerous business publications for her contributions to the startup ecosystem, and regularly speaks at entrepreneurship conferences throughout the Americas. She serves as a mentor at several technology incubators and as an advisor to impact investment funds focused on diverse founders. When not working with entrepreneurs, Alejandra enjoys mountain biking, abstract painting, and exploring archaeological sites across Mexico.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    bannerImage: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80",
    socialMedia: {
      instagram: "alejandratorresbiz",
      linkedin: "alejandratorresbiz",
      twitter: "atorres",
      website: "alejandratorresbiz.com"
    },
    yearsInProgram: 4,
    eventsHosted: 29,
    membersSince: "2019",
    languages: ["English", "Spanish"],
    expertise: ["Business Strategy", "Startup Funding", "Technology Ventures"]
  },
  {
    id: "7",
    slug: "sofia-martinez",
    name: "Sofia Martinez",
    title: "Education Ambassador",
    location: "Chicago",
    country: "USA",
    quote: "Education is not just about degrees; it's about expanding what we believe is possible.",
    shortBio: "Education policy expert and founder of scholarship programs for Latina students.",
    fullBio: "Sofia Martinez is an education policy expert, nonprofit leader, and advocate for educational equity. With a background in teaching and administration, she has dedicated her career to expanding educational opportunities for Latina students through policy reform, scholarship programs, and community-based initiatives. As Latina Empire's Education Ambassador, Sofia leads college readiness workshops, scholarship application clinics, and professional development programs for Latinas in academia and education leadership.\n\nAfter earning her doctorate in Education Leadership from the University of Chicago, Sofia founded a nonprofit organization that has provided over $2 million in scholarships to first-generation Latina college students. Her work on educational equity has influenced policy at the local and national levels, and she regularly consults with school districts and universities on initiatives to support Latinx student success. Sofia's research on the experiences of Latina students in higher education has been published in major academic journals and cited in education policy briefs.\n\nSofia serves on several education-focused boards and commissions, including the Hispanic Scholarship Fund and the National Education Association's Diversity Council. When not working, she enjoys community gardening, playing classical guitar, and volunteering as a mentor for high school students in Chicago's Latinx neighborhoods.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    bannerImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80",
    socialMedia: {
      instagram: "sofiamartinezedu",
      linkedin: "sofiamartinez",
      twitter: "sofiamartinezedu",
      website: "sofiamartinez.org"
    },
    yearsInProgram: 5,
    eventsHosted: 37,
    membersSince: "2018",
    languages: ["English", "Spanish"],
    expertise: ["Education Policy", "Scholarship Programs", "Academic Mentorship"]
  },
  {
    id: "8",
    slug: "lucia-rivera",
    name: "Lucia Rivera",
    title: "South American Regional Director",
    location: "Buenos Aires",
    country: "Argentina",
    quote: "Our collective power as Latinas transcends borders and transforms economies.",
    shortBio: "Economics professor and policy advisor specializing in Latin American economic development.",
    fullBio: "Lucia Rivera is an economics professor, policy advisor, and expert on Latin American economic development. With extensive experience consulting for international organizations including the World Bank and the Inter-American Development Bank, she brings deep insights into the economic forces shaping opportunities for women across the region. As Latina Empire's South American Regional Director, Lucia has established vibrant communities in Argentina, Chile, Colombia, and Peru, creating regional events and cross-border collaborations.\n\nHolding a PhD in Economics from the University of Buenos Aires and a Master's from the London School of Economics, Lucia specializes in gender economics, labor markets, and entrepreneurial ecosystems. Her research on women's economic participation in Latin America has influenced policy in several countries and been featured in major international publications. Through her work with Latina Empire, Lucia has developed economic literacy programs that have empowered thousands of women to make more informed financial and career decisions.\n\nLucia frequently testifies before governmental committees on economic policy affecting women and serves as an advisor to several women-focused investment funds in the region. She has authored two books on sustainable economic development in Latin America and co-founded a think tank focused on gender-responsive economic policies. When not teaching or advising, Lucia enjoys tango dancing, exploring Argentina's wine country, and mentoring young women economists across South America.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    bannerImage: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80",
    socialMedia: {
      instagram: "lucia_rivera_econ",
      linkedin: "luciarivera",
      twitter: "luciarivera",
      website: "luciarivera.com"
    },
    yearsInProgram: 3,
    eventsHosted: 21,
    membersSince: "2020",
    languages: ["English", "Spanish", "Portuguese", "Italian"],
    expertise: ["Economics", "Public Policy", "Regional Development"]
  },
  {
    id: "9",
    slug: "natalia-cruz",
    name: "Natalia Cruz",
    title: "STEM Ambassador",
    location: "Houston",
    country: "USA",
    quote: "Innovation thrives when diverse voices are at the table solving complex problems.",
    shortBio: "Aerospace engineer and STEM education advocate inspiring the next generation of Latina scientists.",
    fullBio: "Natalia Cruz is an aerospace engineer, NASA research fellow, and passionate advocate for diversity in STEM fields. Throughout her career designing spacecraft systems and conducting research on sustainable space exploration, she has consistently worked to create pathways for more Latinas to enter and succeed in scientific and technical fields. As Latina Empire's STEM Ambassador, Natalia leads initiatives that expose young Latinas to science and engineering through hands-on workshops, mentorship programs, and career guidance.\n\nWith degrees in Aerospace Engineering and Applied Physics, Natalia brings technical expertise along with a deep commitment to expanding representation in scientific communities. Her program 'Reaching for the Stars' has connected over 1,000 Latina high school students with women scientists and engineers for mentorship and guidance. Natalia regularly speaks at schools, conferences, and community events about her journey in engineering and the critical importance of diverse perspectives in scientific innovation.\n\nNatalia has received numerous awards for both her technical contributions and her advocacy work, including recognition from the Society of Women Engineers and the Hispanic Engineer National Achievement Awards Conference. She serves on advisory boards for several STEM diversity initiatives and maintains an active research agenda focused on sustainable space technologies. When not working or volunteering, Natalia enjoys amateur astronomy, science fiction writing, and introducing young people to the wonders of space exploration through community stargazing events.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    bannerImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80",
    socialMedia: {
      instagram: "natalia_cruz_stem",
      linkedin: "nataliacruz",
      twitter: "nataliacruz",
      website: "nataliacruz.com"
    },
    yearsInProgram: 2,
    eventsHosted: 16,
    membersSince: "2021",
    languages: ["English", "Spanish"],
    expertise: ["Aerospace Engineering", "STEM Education", "Scientific Communication"]
  },
  {
    id: "10",
    slug: "carolina-diaz",
    name: "Carolina Diaz",
    title: "Healthcare Ambassador",
    location: "Atlanta",
    country: "USA",
    quote: "Health equity is fundamental to achieving our full potential as leaders and changemakers.",
    shortBio: "Physician and health policy advocate working to improve healthcare access in Latinx communities.",
    fullBio: "Carolina Diaz is a family physician, public health expert, and advocate for health equity in Latinx communities. With clinical experience in both the United States and Latin America, she brings a comprehensive understanding of the healthcare challenges facing Latina women and their families. As Latina Empire's Healthcare Ambassador, Carolina leads health literacy workshops, wellness initiatives, and advocacy campaigns that empower members to prioritize their wellbeing while navigating complex healthcare systems.\n\nAfter completing her medical training at Emory University and a Master's in Public Health from Johns Hopkins, Carolina worked with community health centers serving primarily Latinx populations before expanding her focus to policy and systems change. Her research on healthcare disparities among Latina women has been published in major medical journals and cited in health policy briefs. Through her work with Latina Empire, Carolina has developed culturally responsive health education programs that have reached thousands of women across the country.\n\nCarolina serves on several healthcare advisory boards and regularly testifies before legislative committees on issues affecting Latinx health outcomes. She has received recognition from the American Medical Association and the National Hispanic Medical Association for her community-based health initiatives. When not practicing medicine or advocating for health equity, Carolina enjoys long-distance running, botanical illustration, and volunteering at free clinics in underserved communities.",
    image: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    bannerImage: "https://images.unsplash.com/photo-1582719471627-5885133e5861?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80",
    socialMedia: {
      instagram: "dra_carolina_diaz",
      linkedin: "carolinadiazmd",
      twitter: "dracarolinadiaz",
      website: "drcarolinadiaz.com"
    },
    yearsInProgram: 4,
    eventsHosted: 28,
    membersSince: "2019",
    languages: ["English", "Spanish"],
    expertise: ["Healthcare Policy", "Preventive Medicine", "Community Health"]
  }
];

// Helper function to get ambassador by slug
export const getAmbassadorBySlug = (slug: string): Ambassador | undefined => {
  return ambassadors.find(ambassador => ambassador.slug === slug);
};