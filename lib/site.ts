// Single source of truth for school details. Edit here, the whole site updates.

export const SITE = {
  name: "Valencia Islamic School",
  short: "VIS",
  tagline: "Nurturing Minds, Building Character",
  url: "https://vischool.co.za",
  phoneDisplay: "084 812 5276",
  phoneIntl: "+27848125276",
  whatsapp: "27848125276", // wa.me format, no plus
  email: "admin@vischool.co.za",
  address: {
    street: "43 Nemezia Ave",
    suburb: "Valencia Park",
    city: "Mbombela",
    postalCode: "1200",
    province: "Mpumalanga",
  },
  principal: { name: "Mrs. R. Mahomed", title: "Principal / Director" },
  emis: "800035521",
  enterpriseNo: "2014/039101/07",
  registration: "Registered with the Mpumalanga Department of Education",
  admissionsYear: 2027,
  grades: ["Grade RR", "Grade R", "Grade 1", "Grade 2", "Grade 3"] as const,
};

export const HOURS = [
  { days: "Monday – Thursday", time: "07:30 – 13:30" },
  { days: "Friday", time: "07:30 – 11:30" },
  { days: "Admin office", time: "Closes 14:00" },
];

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/academics/", label: "Academics" },
  { href: "/admissions/", label: "Admissions" },
  { href: "/learning-shelf/", label: "Worksheets" },
  { href: "/contact/", label: "Contact" },
];

export const fullAddress = `${SITE.address.street}, ${SITE.address.suburb}, ${SITE.address.city}, ${SITE.address.postalCode}`;

export function waLink(text: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function mailLink(subject: string, body: string) {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const CURRICULUM = [
  {
    key: "caps",
    title: "Foundation Phase (Grade R – 3)",
    tone: "leaf",
    intro:
      "We follow the National Curriculum and Assessment Policy Statement (CAPS) prescribed by the Department of Basic Education.",
    items: [
      ["Mathematics", "Number sense, patterns and problem-solving."],
      ["Home Language (English)", "Reading, phonics, handwriting and listening skills."],
      ["Life Skills", "Creative arts, physical education and personal well-being."],
    ],
  },
  {
    key: "islamic",
    title: "Islamic Studies (optional)",
    tone: "plum",
    intro: "Offered to Muslim learners as an integrated part of their day. Families choose whether to take it.",
    items: [
      ["Quran", "Hifz (memorisation) and correct pronunciation (Tajweed)."],
      ["Fiqh & Tareekh", "Practical Islamic rules and history suitable for young minds."],
      ["Adab (etiquette)", "Daily duas and character building."],
    ],
  },
  {
    key: "holistic",
    title: "Holistic development",
    tone: "sky",
    intro: "Learning that goes beyond the classroom and the textbook.",
    items: [
      ["Computer literacy", "A basic introduction to technology and coding concepts."],
      ["Sports", "Mini-cricket, soccer and netball skills development."],
      ["Excursions", "Educational trips that bring classroom learning to life."],
    ],
  },
] as const;

const dbe = (p: string) => encodeURI(`https://www.education.gov.za/Portals/0/CD/National Curriculum Statements and Vocational/${p}`);

export const DBE_DOCS = [
  { title: "Mathematics CAPS (Grade R – 3)", href: dbe("CAPS Maths  English Gr R-3 FS.pdf") },
  { title: "English Home Language CAPS (Grade R – 3)", href: dbe("CAPS HL ENGLISH GR R-3 FS.pdf") },
  { title: "Annual Teaching Plans", href: "https://www.education.gov.za/Curriculum/AnnualTeachingPlans(ATPs)202324.aspx" },
  { title: "National Assessment Protocol", href: "https://www.gov.za/sites/default/files/gcis_document/201409/doefetnationalprotocolassgrader12.pdf" },
];

export type Worksheet = {
  id: string;
  title: string;
  grade: "Grade RR" | "Grade R" | "Grade 1" | "Grade 2" | "Grade 3";
  subject: "Mathematics" | "English" | "Life Skills" | "Islamic Studies";
  description: string;
  price: number; // Rand
};

// Add new worksheets here. Price is per worksheet in Rand.
export const WORKSHEETS: Worksheet[] = [
  {
    id: "g1-maths-addition",
    title: "Addition",
    grade: "Grade 1",
    subject: "Mathematics",
    description: "Adding numbers with counters, number lines and simple word problems.",
    price: 10,
  },
  {
    id: "gr-english-all-about-me",
    title: "All About Me",
    grade: "Grade R",
    subject: "English",
    description: "Drawing, colouring and early writing about my family, my body and me.",
    price: 10,
  },
  {
    id: "g1-islamic-morning-dua",
    title: "Morning Dua",
    grade: "Grade 1",
    subject: "Islamic Studies",
    description: "Learn and trace the morning dua, with meaning and colouring activity.",
    price: 10,
  },
];

export const FAQ = [
  {
    q: "Do I have to be Muslim to enrol my child?",
    a: "No. VIS follows the national CAPS curriculum. Islamic Studies is an optional part of the day that families choose for Muslim learners.",
  },
  {
    q: "Which grades do you offer?",
    a: "Grade RR, Grade R and Grades 1 to 3 (the Foundation Phase).",
  },
  {
    q: "How old must my child be?",
    a: "By national policy, a child entering Grade R must turn five by 30 June of the year of admission, and a child entering Grade 1 must turn six by 30 June. Use the grade finder on the Admissions page to check.",
  },
  {
    q: "Do Foundation Phase learners write exams?",
    a: "No formal exams. Assessment is continuous (CASS): oral work, practical tasks and written activities every day, with a formal report card at the end of each term.",
  },
  {
    q: "What are the school fees?",
    a: "Fees are shared with families directly during the enquiry. Send an enquiry and the office will come back to you with the current fee schedule.",
  },
  {
    q: "What documents will I need?",
    a: "Your child's birth certificate, immunisation card, the latest school report (if applicable), and a parent or guardian ID. The office will confirm anything else needed.",
  },
];
