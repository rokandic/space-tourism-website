"use client";
import styles from "./page.module.css";
import Image from "next/image";
import { useState } from "react";
import typography from "./../typography.module.css";
import data from "../data.json";
import bgMobileImg from "../../public/assets/technology/background-technology-mobile.jpg";
import bgTabletImg from "../../public/assets/technology/background-technology-tablet.jpg";
import bgDesktopImg from "../../public/assets/technology/background-technology-desktop.jpg";

// interface in the same format as JSON data
interface ITech {
  name: string;
  images: {
    portrait: string;
    landscape: string;
  };
  description: string;
}

// return destination data from JSON
function getTechData(tech: string): ITech {
  let result: ITech = {
    name: "",
    images: { portrait: "", landscape: "" },
    description: "",
  };
  for (let t of data.technology) {
    if (t.name === tech) {
      result = t;
      t.images.portrait = t.images.portrait.replace(/^\./, process.env.NEXT_PUBLIC_BASEPATH ?? "");
      t.images.landscape = t.images.landscape.replace(
        /^\./,
        process.env.NEXT_PUBLIC_BASEPATH ?? ""
      );
      break;
    }
  }
  return result;
}

export default function Technology() {
  const [activeTech, setActiveTech] = useState<string>(data.technology[0].name);
  const activeTechData = getTechData(activeTech);

  // Tech navigation items are generated from JSON data
  const techNavItems: JSX.Element[] = data.technology.map((t, index) => {
    return (
      <li
        onClick={() => setActiveTech(t.name)}
        data-active={activeTech === t.name}
        className={`${typography.headingS} ${styles.navItem}`}
        key={t.name}
      >
        {index + 1}
      </li>
    );
  });

  // All tech image elements are generated at the same time to allow for fade-in fade-out transitions
  const techImages: JSX.Element[] = data.technology.map((t) => {
    return (
      // <Image
      //   fill
      //   className={styles.image}
      //   data-active={activeTech === t.name}
      //   key={`${t.name}-Image`}
      //   alt={`Image of ${t.name}`}
      //   src={t.images.portrait}
      // />
      <picture key={`${t.name}-Image`}>
        <source
          media={`(min-width: ${process.env.NEXT_PUBLIC_DESKTOP_BREAKPOINT})`}
          srcSet={t.images.portrait}
        />
        <img
          alt="Technology image"
          data-active={activeTech === t.name}
          src={t.images.landscape}
          className={styles.image}
        />
      </picture>
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
      {/* Content */}
      <main className={styles.contentWrapper}>
        <h1 className={`${typography.headingXS} ${styles.headingTitle}`}>
          <span className={styles.headingNumber}>03</span>
          Space launch 101
        </h1>

        <article className={styles.imgAndNavWrapper}>
          <div className={styles.imageWrapper}>{techImages}</div>
          <div className={styles.navAndDescWrapper}>
            <ul className={styles.navItemsWrapper}>{techNavItems}</ul>
            <div className={styles.descWrapper}>
              <h2 className={`${typography.headingS} ${styles.descTitle}`}>the terminology...</h2>
              <h3 className={`${typography.headingM} ${styles.techName}`}>{activeTechData.name}</h3>
              <p className={`${typography.text} ${styles.description}`}>
                {activeTechData.description}
              </p>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
