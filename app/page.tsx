import Link from "next/link";
import styles from "./page.module.css";
import typography from "./typography.module.css";
import bgMobileImg from "../public/assets/home/background-home-mobile.jpg";
import bgTabletImg from "../public/assets/home/background-home-tablet.jpg";
import bgDesktopImg from "../public/assets/home/background-home-desktop.jpg";

export default function Home() {
  return (
    <>
      {/* BACKGROUND IMAGE  */}
      {/* <div className="testClass"></div> */}
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

      {/* CONTENT */}
      <main className={styles.contentWrapper}>
        <div className={styles.textWrapper}>
          <h2 className={`${typography.headingXS} ${styles.travelHeading}`}>
            So, you want to travel to
          </h2>
          <h1 className={typography.headingXL}>Space</h1>
          <p className={typography.text}>
            Let’s face it; if you want to go to space, you might as well genuinely go to outer space
            and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you
            a truly out of this world experience!
          </p>
        </div>
        {/* Explore button */}
        <div className={styles.exploreWrapper}>
          <Link href="/destination" className={styles.exploreLink}>
            <div className={styles.exploreButton}>
              <span className={`${styles.exploreText} ${typography.headingS}`}>Explore</span>
            </div>
          </Link>
        </div>
      </main>
    </>
  );
}
