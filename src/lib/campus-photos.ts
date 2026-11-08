import annexAdministration from "@/assets/annex-administration-block.jpg";
import annexClassroomsCourtyard from "@/assets/annex-classrooms-courtyard.png";
import annexMainClassroom from "@/assets/annex-main-classroom-block.png";
import annexSickBayLibrary from "@/assets/hero-classrooms.webp";
import annexSchoolBuses from "@/assets/annex-school-buses.png";
import annexLaboratoryScienceBlock from "@/assets/hero-courtyard.webp";
import heroDriveway from "@/assets/hero-driveway.webp";
import heroFrontage from "@/assets/hero-frontage.webp";

export type CampusPhoto = {
  src: string;
  caption: string;
  alt: string;
};

const hostedAsset = (assetId: string, filename: string) =>
  `/__l5e/assets-v1/${assetId}/${filename}`;

export const campusImages = {
  dayCampusGrounds: hostedAsset("6496b4d1-6568-4dab-a06f-fc6d254f6e48", "day-campus-grounds.png"),
  dayCampusDriveway: heroDriveway,
  dayCampusAdministration: hostedAsset(
    "b228043e-85c8-4239-adfb-74290bdeb529",
    "day-campus-administration.jpg",
  ),
  dayCampusArts: hostedAsset("3619efb2-ff5f-494e-87c7-3d811bb053d9", "day-campus-art-design.jpg"),
  dayCampusClassroomBlock: hostedAsset(
    "5bef8acc-eeb3-44f7-8ddd-2d7c45810f26",
    "day-campus-classroom-block.jpg",
  ),
  dayCampusScienceLab: hostedAsset(
    "36f9030b-4ac7-43ab-a589-e47749f44c41",
    "day-campus-science-lab.jpg",
  ),
  dayCampusScienceBlock: hostedAsset(
    "2210816d-bf25-425b-9008-a35b862a2f46",
    "day-campus-two-storey-building.jpg",
  ),
  annexFrontage: heroFrontage,
  annexSchoolBuses,
  annexLaboratoryScienceBlock,
  annexClassroomsCourtyard,
  annexSickBayLibrary,
  annexAdministration,
  annexMainClassroom,
} as const;

export const campusPhotoGroups: Record<"dayCampus" | "annex", CampusPhoto[]> = {
  dayCampus: [
    {
      src: campusImages.dayCampusDriveway,
      caption: "Day Campus driveway",
      alt: "Driveway at Mbale Progressive Secondary School’s Day Campus",
    },
    {
      src: campusImages.dayCampusGrounds,
      caption: "Day Campus grounds",
      alt: "Grounds and buildings at Mbale Progressive Secondary School’s Day Campus",
    },
    {
      src: campusImages.dayCampusAdministration,
      caption: "Administration block",
      alt: "Administration block at Mbale Progressive Secondary School’s Day Campus",
    },
    {
      src: campusImages.dayCampusScienceBlock,
      caption: "A-Level science block",
      alt: "A-Level science block at Mbale Progressive Secondary School’s Day Campus",
    },
    {
      src: campusImages.dayCampusScienceLab,
      caption: "Science laboratory",
      alt: "Science laboratory at Mbale Progressive Secondary School’s Day Campus",
    },
    {
      src: campusImages.dayCampusClassroomBlock,
      caption: "Classroom block",
      alt: "Classroom block at Mbale Progressive Secondary School’s Day Campus",
    },
    {
      src: campusImages.dayCampusArts,
      caption: "A-Level Arts block",
      alt: "A-Level Arts block at Mbale Progressive Secondary School’s Day Campus",
    },
  ],
  annex: [
    {
      src: campusImages.annexFrontage,
      caption: "Annex entrance and grounds",
      alt: "Cream and maroon boarding-campus buildings at Mbale Progressive Annex",
    },
    {
      src: campusImages.annexSchoolBuses,
      caption: "School buses at the Boarding Campus",
      alt: "Mbale Progressive Secondary School buses parked in front of the Boarding Campus buildings",
    },
    {
      src: campusImages.annexAdministration,
      caption: "Administration block",
      alt: "Administration block at Mbale Progressive Annex boarding campus",
    },
    {
      src: campusImages.annexMainClassroom,
      caption: "Main classroom block",
      alt: "Main classroom block at Mbale Progressive Annex boarding campus",
    },
    {
      src: campusImages.annexClassroomsCourtyard,
      caption: "Classrooms and Court Yard",
      alt: "Classrooms and Court Yard at Mbale Progressive Annex boarding campus",
    },
    {
      src: campusImages.annexLaboratoryScienceBlock,
      caption: "Laboratory and Science Block",
      alt: "Laboratory and Science Block at Mbale Progressive Annex boarding campus",
    },
    {
      src: campusImages.annexSickBayLibrary,
      caption: "Sick Bay and Library Block",
      alt: "Sick Bay and Library Block at Mbale Progressive Annex boarding campus",
    },
  ],
};
