"use client";
import styles from "./page.module.css";
import Image from "next/image";
import { useState } from "react";
import typography from "./../typography.module.css";
import data from "../data.json";
import bgMobileImg from "../../public/assets/crew/background-crew-mobile.jpg";
import bgTabletImg from "../../public/assets/crew/background-crew-tablet.jpg";
import bgDesktopImg from "../../public/assets/crew/background-crew-desktop.jpg";

// interface in the same format as JSON data
interface ICrew {
  name: string;
  images: {
    png: string;
    webp: string;
  };
  role: string;
  bio: string;
}

// return destination data from JSON
function getCrewMemberData(crewMember: string): ICrew {
  let result: ICrew = {
    name: "",
    images: { png: "", webp: "" },
    role: "",
    bio: "",
  };
  for (let c of data.crew) {
    if (c.name === crewMember) {
      result = c;
      c.images.png = c.images.png.replace(/^\./, process.env.NEXT_PUBLIC_BASEPATH ?? "");
      c.images.webp = c.images.webp.replace(/^\./, process.env.NEXT_PUBLIC_BASEPATH ?? "");
      break;
    }
  }
  return result;
}

export default function Crew() {
  const [activeCrewMember, setActiveCrewMember] = useState<string>(data.crew[0].name);
  const activeCrewMemberData = getCrewMemberData(activeCrewMember);

  // Crew member navigation items are generated from JSON data
  const crewMemberNavItems: JSX.Element[] = data.crew.map((c) => {
    return (
      <li
        onClick={() => setActiveCrewMember(c.name)}
        data-active={activeCrewMember === c.name}
        className={styles.crewMemberNavItem}
        key={c.name}
      ></li>
    );
  });

  // All crew member image elements are generated at the same time to allow for fade-in fade-out transitions
  const crewMemberImages: JSX.Element[] = data.crew.map((c) => {
    return (
      <Image
        width={0}
        height={0}
        onLoad={(e) => {
          const target = e.target as HTMLImageElement;
          target.width = target.naturalWidth;
          target.height = target.naturalHeight;
        }}
        className={styles.crewMemberImage}
        data-active={activeCrewMember === c.name}
        key={`${c.name}-Image`}
        alt={`Image of ${c.name}`}
        src={c.images.png}
      />
    );
  });

  return (
    <>
      {/* Background image */}
      <picture>
        <source
          media={`(min-width: ${process.env.NEXT_PUBLIC_DESKTOP_BREAKPOINT})`}
          srcSet={bgDesktopImg.src}
        />
        <source
          media={`(min-width: ${process.env.NEXT_PUBLIC_TABLET_BREAKPOINT})`}
          srcSet={bgTabletImg.src}
        />
        <img alt="Background space image" src={bgMobileImg.src} className="backgroundImage" />
      </picture>

      {/* Crew content */}
      <main className={styles.contentWrapper}>
        <div className={styles.allTextWithoutImageWrapper}>
          <h1 className={`${typography.headingXS} ${styles.headingTitle}`}>
            <span className={styles.headingNumber}>02</span>
            Meet your crew
          </h1>

          <article className={styles.crewMemberInformationWrapper}>
            <h2 className={`${typography.headingS} ${styles.crewMemberRole}`}>
              {activeCrewMemberData.role}
            </h2>
            <h3 className={`${typography.headingM} ${styles.crewMemberName}`}>
              {activeCrewMemberData.name}
            </h3>
            <p className={`${typography.text} ${styles.crewMemberBio}`}>
              {activeCrewMemberData.bio}
            </p>
            <ul className={styles.crewMemberNavItemsWrapper}>{crewMemberNavItems}</ul>
          </article>
        </div>
        <div className={styles.crewMemberImageWrapper}>{crewMemberImages}</div>
      </main>
    </>
  );
}
