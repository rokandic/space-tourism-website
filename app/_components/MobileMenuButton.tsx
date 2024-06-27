import styles from "./MobileMenuButton.module.css";

interface MobileMenuButtonProps {
  mobileMenuExpanded: boolean;
  setMobileMenuExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileMenuButton({
  mobileMenuExpanded,
  setMobileMenuExpanded,
}: MobileMenuButtonProps) {
  function buttonClick(event: React.SyntheticEvent<HTMLButtonElement>): void {
    if (event.currentTarget instanceof HTMLButtonElement) {
      setMobileMenuExpanded(!mobileMenuExpanded);
    }
  }

  return (
    <button
      className={styles.mobileMenuButton}
      aria-controls="navigation"
      aria-expanded={mobileMenuExpanded}
      onClick={buttonClick}
    >
      <svg className={styles.mobileMenuSvg} viewBox="0 0 100 100">
        <rect className={`${styles.rectangles} ${styles.rectangleTop}`}></rect>
        <rect className={`${styles.rectangles} ${styles.rectangleMid}`}></rect>
        <rect
          className={`${styles.rectangles} ${styles.rectangleBottom}`}
        ></rect>
      </svg>
    </button>
  );
}
