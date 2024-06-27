"use client";
import Image from "next/image";
import styles from "./page.module.css";
import typography from "./../typography.module.css";
import data from "../data.json";
import { useState } from "react";
import bgMobileImg from "../../public/assets/destination/background-destination-mobile.jpg";
import bgTabletImg from "../../public/assets/destination/background-destination-tablet.jpg";
import bgDesktopImg from "../../public/assets/destination/background-destination-desktop.jpg";

// interface in the same format as JSON data
interface IDestination {
  name: string;
  images: {
    png: string;
    webp: string;
  };
  description: string;
  distance: string;
  travel: string;
}

// return destination data from JSON
function getDestinationData(destination: string): IDestination {
  let result: IDestination = {
    name: "",
    images: { png: "", webp: "" },
    description: "",
    distance: "",
    travel: "",
  };
  for (let d of data.destinations) {
    if (d.name === destination) {
      result = d;
      d.images.png = d.images.png.replace(/^\./, process.env.NEXT_PUBLIC_BASEPATH ?? "");
      d.images.webp = d.images.webp.replace(/^\./, process.env.NEXT_PUBLIC_BASEPATH ?? "");
      break;
    }
  }
  return result;
}

export default function Destination() {
  const [activeDestination, setActiveDestination] = useState<string>(data.destinations[0].name);
  const activeDestinationData = getDestinationData(activeDestination);

  // Planet navigation items are generated from JSON data
  const planetsNavItems: JSX.Element[] = data.destinations.map((d) => {
    return (
      <li
        onClick={() => setActiveDestination(d.name)}
        data-active={activeDestination === d.name}
        className={`${styles.planetNavigationItem} ${typography.subheadingS}`}
        key={d.name}
      >
        <span className={styles.planetNavigationItemText}>{d.name}</span>
        <div data-active={activeDestination === d.name} className={styles.activeHoverBar} />
      </li>
    );
  });

  // All planet image elements are generated at the same time to allow for fade-in fade-out transitions
  const planetsNavImages: JSX.Element[] = data.destinations.map((d) => {
    return (
      <Image
        fill
        className={styles.planetImage}
        data-active={activeDestination === d.name}
        key={`${d.name}-Image`}
        alt={`Image of ${d.name}`}
        src={d.images.png}
      />
    );
  });

  return (
    <>
      {/* BACKGROUND IMAGE */}
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

      {/* HEADER & IMAGE */}
      <main className={styles.contentWrapper}>
        <div className={styles.titleAndImage}>
          <h1 className={`${typography.headingXS} ${styles.pickDestination}`}>
            <span className={styles.headingNumber}>01</span>
            Pick your destination
          </h1>
          <div className={styles.planetImageWrapper}>{planetsNavImages}</div>
        </div>

        <section className={styles.navigationDescription}>
          {/*NAVIGATION*/}
          <ul role="nav" className={styles.planetNavigation}>
            {planetsNavItems}
          </ul>
          {/* DESCRIPTION */}
          <div className={styles.descriptionWrapper}>
            <h1 className={`${typography.headingL} ${styles.planetNameHeading}`}>
              {activeDestinationData.name}
            </h1>
            <p className={`${typography.text} ${styles.descriptionText}`}>
              {activeDestinationData.description}
            </p>
          </div>
          <hr className={styles.divider} />
          <div className={styles.informationWrapper}>
            <div className={styles.informationItemWrapper}>
              <h3 className={`${typography.subheadingS} ${styles.informationItemHeading}`}>
                avg. distance
              </h3>
              <h4 className={`${typography.subheadingL} ${styles.informationItem}`}>
                {activeDestinationData.distance}
              </h4>
            </div>
            <div className={styles.informationItemWrapper}>
              <h3 className={`${typography.subheadingS} ${styles.informationItemHeading}`}>
                est. travel time
              </h3>
              <h4 className={`${typography.subheadingL} ${styles.informationItem}`}>
                {activeDestinationData.travel}
              </h4>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
