import gwireMuhammadPortrait from "@/assets/staff-gwire-muhammad.jpg.asset.json";
import sahamaliElias from "@/assets/admin-sahamali-elias-web.jpg";
import wambogaAsuman from "@/assets/admin-wamboga-asuman-web.jpg";
import wangotaJoshua from "@/assets/admin-wangota-joshua-web.jpg";
import abwochJanet from "@/assets/staff-abwoch-janet.jpg.asset.json";
import kericheanEmmanuel from "@/assets/staff-kerichan-emmanuel.jpg.asset.json";
import maaniAsinani from "@/assets/staff-maani-asinani.jpg.asset.json";
import mukoyaFirdaus from "@/assets/staff-mukoya-firdaus.jpg.asset.json";
import nabusayiKanah from "@/assets/staff-nabusayi-kanah.jpg.asset.json";
import enguluDaniel from "@/assets/staff-engulu-daniel.jpg.asset.json";
import muguloJoseph from "@/assets/staff-mugulo-joseph.jpg.asset.json";
import buyiAliceLamwaka from "@/assets/staff-buyi-alice-lamwaka.jpg.asset.json";
import katendeEmmanuel from "@/assets/staff-katende-emmanuel.webp";
import kediYefusa from "@/assets/staff-kedi-yefusa.png";
import boozaAzaliaAshraf from "@/assets/staff-booza-azalia-ashraf.png";

export type CampusLocation = "Day Campus" | "Boarding";
export type FacultyCampus = CampusLocation | "Both Campuses";

export type FacultyMember = {
  name: string;
  role: string;
  department: string;
  subjects: string;
  campus: FacultyCampus;
  bio: string;
  email?: string;
  head?: boolean;
  photo?: string;
  photoPosition?: string;
};

export const facultyServesCampus = (member: FacultyMember, campus: CampusLocation) =>
  member.campus === campus || member.campus === "Both Campuses";

const facultyNameForSorting = (name: string) =>
  name.replace(/^(?:Mr\.|Mrs\.|Ms\.|Madam)\s+/i, "").trim();

export const sortFacultyAlphabetically = (members: FacultyMember[]) =>
  [...members].sort((first, second) =>
    facultyNameForSorting(first.name).localeCompare(facultyNameForSorting(second.name), "en", {
      sensitivity: "base",
    }),
  );

export const staffInitials = (name: string) => {
  const parts = name
    .replace(/^(Mr\.|Ms\.|Madam)\s+/, "")
    .trim()
    .split(/\s+/);
  return `${parts[0]?.[0] ?? ""}${parts[parts.length - 1]?.[0] ?? ""}`;
};

export const directorsOfStudies = [
  {
    name: "Mr. Sahamali Elias",
    role: "Director of Studies I (DOS I)",
    campus: "Day Campus",
    photo: sahamaliElias,
  },
  {
    name: "Mr. Gwire Muhammad",
    role: "Assistant Director of Studies (DOS II)",
    campus: "Day Campus",
    photo: gwireMuhammadPortrait.url,
    photoPosition: "50% 6%",
  },
  {
    name: "Mr. Wamboga Asuman",
    role: "Director of Studies I (DOS I)",
    campus: "Boarding",
    photo: wambogaAsuman,
  },
  {
    name: "Mr. Wangota Joshua",
    role: "Assistant Director of Studies (DOS II)",
    campus: "Boarding",
    photo: wangotaJoshua,
  },
];

export const faculty: FacultyMember[] = [
  {
    name: "Ms. Sarah Namukasa",
    role: "Head of Mathematics",
    department: "Mathematics & Sciences",
    subjects: "Mathematics · Further Mathematics",
    campus: "Day Campus",
    bio: "Leads numeracy planning across both levels and mentors learners through problem-solving clinics.",
    email: "s.namukasa@mbaleprogressive.sc.ug",
    head: true,
  },
  {
    name: "Mr. Katende Emmanuel",
    role: "Head of Science Department",
    department: "Science Department",
    subjects: "Science",
    campus: "Boarding",
    bio: "Leads the Science Department at the Boarding Campus.",
    photo: katendeEmmanuel,
    photoPosition: "50% 11%",
    head: true,
  },
  {
    name: "Ms. Agnes Nakitto",
    role: "Head of Languages",
    department: "Languages & Humanities",
    subjects: "English Language · Literature",
    campus: "Day Campus",
    bio: "Supports confident communication through reading, writing, debate, and performance.",
    email: "a.nakitto@mbaleprogressive.sc.ug",
    head: true,
  },
  {
    name: "Mr. Daniel Kato",
    role: "Head of Humanities",
    department: "Languages & Humanities",
    subjects: "History · Geography",
    campus: "Day Campus",
    bio: "Connects classroom learning to Uganda’s history, place, culture, and civic responsibility.",
    email: "d.kato@mbaleprogressive.sc.ug",
    head: true,
  },
  {
    name: "Mr. Booza Azalia Ashraf",
    role: "Head of History Department",
    department: "History Department",
    subjects: "History",
    campus: "Boarding",
    bio: "Leads the History Department at the Boarding Campus.",
    photo: boozaAzaliaAshraf,
    head: true,
  },
  {
    name: "Ms. Nambafu Aisha",
    role: "Head of Department – Religious Studies",
    department: "Religious Studies",
    subjects: "Religious Studies",
    campus: "Boarding",
    bio: "Leads Religious Studies at the Boarding Campus.",
    photo: "/images/people/nambafu-aisha.jpg",
    head: true,
  },
  {
    name: "Ms. Kagoya Sophie",
    role: "Teacher",
    department: "Languages & Humanities",
    subjects: "History (A'Level)",
    campus: "Both Campuses",
    bio: "Teaches A'Level History across the Day and Boarding Campuses.",
    photo: "/images/people/kagoya-sophie.jpg",
  },
  {
    name: "Ms. Nagudi Joan",
    role: "Teacher",
    department: "Business Education",
    subjects: "Entrepreneurship Education (O'Level)",
    campus: "Boarding",
    bio: "Teaches O'Level Entrepreneurship Education at the Boarding Campus.",
    photo: "/images/people/nagudi-joan.jpg",
  },
  {
    name: "Mr. Peter Ssenyonjo",
    role: "Senior Teacher",
    department: "Mathematics & Sciences",
    subjects: "Physics · Mathematics",
    campus: "Boarding",
    bio: "Uses practical demonstrations to make abstract ideas visible and memorable.",
    email: "p.ssenyonjo@mbaleprogressive.sc.ug",
  },
  {
    name: "Ms. Esther Nalubega",
    role: "Senior Teacher",
    department: "Mathematics & Sciences",
    subjects: "Biology · Agriculture",
    campus: "Day Campus",
    bio: "Champions fieldwork, environmental awareness, and learner wellbeing.",
    email: "e.nalubega@mbaleprogressive.sc.ug",
  },
  {
    name: "Mr. Joseph Mugisha",
    role: "Teacher",
    department: "Languages & Humanities",
    subjects: "Kiswahili · French",
    campus: "Day Campus",
    bio: "Builds language confidence and cultural curiosity through conversation-led learning.",
    email: "j.mugisha@mbaleprogressive.sc.ug",
  },
  {
    name: "Ms. Lydia Achieng",
    role: "Teacher",
    department: "Languages & Humanities",
    subjects: "Christian Religious Education · General Paper",
    campus: "Boarding",
    bio: "Helps learners examine ideas, values, and contemporary issues with care and clarity.",
    email: "l.achieng@mbaleprogressive.sc.ug",
  },
  {
    name: "Mr. Robert Ouma",
    role: "Teacher",
    department: "Technology & Enterprise",
    subjects: "Technology & Design · Technical Drawing",
    campus: "Boarding",
    bio: "Develops hands-on making, design thinking, and safe workshop practice.",
    email: "r.ouma@mbaleprogressive.sc.ug",
  },
  {
    name: "Ms. Fiona Nambassa",
    role: "Learner Support Lead",
    department: "Learner Support",
    subjects: "Guidance · Study Skills · Careers",
    campus: "Day Campus",
    bio: "Coordinates mentoring, study habits, and pathways conversations for learners and families.",
    email: "f.nambassa@mbaleprogressive.sc.ug",
  },
  {
    name: "Mr. Michael Okello",
    role: "Sports & Activities Lead",
    department: "Learner Support",
    subjects: "Physical Education · Sports Leadership",
    campus: "Day Campus",
    bio: "Uses sport and co-curricular activities to grow teamwork, confidence, and belonging.",
    email: "m.okello@mbaleprogressive.sc.ug",
  },
  {
    name: "Ms. Nabusayi Kanah Nangayo",
    role: "Head of Language Department",
    department: "Language Department",
    subjects: "English · Literature in English",
    campus: "Boarding",
    bio: "Builds reading, writing, and analytical confidence through close study of set texts.",
    email: "n.nabusayi@mbaleprogressive.sc.ug",
    photo: nabusayiKanah.url,
    head: true,
  },
  {
    name: "Madam Abwoch Janet",
    role: "Teacher",
    department: "Languages & Humanities",
    subjects: "English · Literature in English (A'Level)",
    campus: "Boarding",
    bio: "Guides A'Level learners through critical reading, essay craft, and examination technique.",
    email: "j.abwoch@mbaleprogressive.sc.ug",
    photo: abwochJanet.url,
  },
  {
    name: "Mr. Kerichan Emmanuel",
    role: "Head of ICT",
    department: "Technology & Enterprise",
    subjects: "ICT · Computer Studies",
    campus: "Boarding",
    bio: "Leads ICT teaching and practical computer work at the Boarding Campus.",
    photo: kericheanEmmanuel.url,
    head: true,
  },
  {
    name: "Mr. Maani Asinani",
    role: "Teacher",
    department: "Divinity",
    subjects: "Islamic Religious Education",
    campus: "Boarding",
    bio: "Teaches Islamic Religious Education at the Boarding Campus.",
    photo: maaniAsinani.url,
  },
  {
    name: "Ms. Mukoya Firdaus",
    role: "Teacher",
    department: "Mathematics & Sciences",
    subjects: "Physics (O & A'Level)",
    campus: "Boarding",
    bio: "Teaches Physics at O'Level and A'Level at the Boarding Campus.",
    photo: mukoyaFirdaus.url,
  },
  {
    name: "Mr. Engulu Daniel",
    role: "Head of Business Education",
    department: "Business Education",
    subjects: "Entrepreneurship",
    campus: "Both Campuses",
    bio: "Heads Business Education at both campuses and teaches Entrepreneurship across the Day and Boarding Campuses.",
    photo: enguluDaniel.url,
    head: true,
  },
  {
    name: "Mr. Mugulo Joseph",
    role: "Teacher",
    department: "Languages & Humanities",
    subjects: "History (O'Level)",
    campus: "Boarding",
    bio: "Teaches O'Level History at the Boarding Campus.",
    photo: muguloJoseph.url,
  },
  {
    name: "Mrs. Buyi Alice Lamwaka",
    role: "Teacher",
    department: "Languages & Humanities",
    subjects: "History",
    campus: "Boarding",
    bio: "Teaches History at the Boarding Campus.",
    photo: buyiAliceLamwaka.url,
  },
  {
    name: "Kedi Yefusa",
    role: "A'Level Mathematics Teacher",
    department: "Mathematics & Sciences",
    subjects: "Mathematics (A'Level)",
    campus: "Boarding",
    bio: "Teaches A'Level Mathematics at the Boarding Campus.",
    photo: kediYefusa,
  },
  {
    name: "Mr. Gwire Muhammad",
    role: "Assistant Director of Studies (DOS II)",
    department: "Administration",
    subjects: "Academic Administration",
    campus: "Day Campus",
    bio: "Assistant Director of Studies (DOS II) at the Day Campus.",
    photo: gwireMuhammadPortrait.url,
    photoPosition: "50% 6%",
  },
];
