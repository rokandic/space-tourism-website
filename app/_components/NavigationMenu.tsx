"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import typography from "./../typography.module.css";
import styles from "./NavigationMenu.module.css";
import getRoutes from "../_functions/getRoutes";

interface NavigationMenuProps {
  mobileMenuExpanded: boolean;
  setMobileMenuExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavigationMenu({
  mobileMenuExpanded,
  setMobileMenuExpanded,
}: NavigationMenuProps) {
  const routes = getRoutes();
  const currentPath: string = usePathname();
  let menuItemsElement: JSX.Element[] = [];

  // Build menu item elements
  for (let i = 0; i < Object.keys(routes).length; i++) {
    const name: string = Object.keys(routes)[i];
    const path: string = Object.values(routes)[i].path;

    menuItemsElement.push(
      <li key={name} className={`${styles.menuItem} nav-text`}>
        <Link href={path} className={`${styles.links} ${typography.navText}`}>
          <div className={styles.itemNumberNameWrapper}>
            <span className={styles.menuItemNumber}>
              {i < 10 ? "0" : ""}
              {i}
            </span>{" "}
            {name}
          </div>
          <div
            data-activepath={path == currentPath}
            className={styles.activeHoverBar}
          />
        </Link>
      </li>
    );
  }

  return (
    <section
      data-expanded={mobileMenuExpanded}
      className={styles.navigationMenuWrapper}
    >
      <ul className={styles.menuItemsList}>{menuItemsElement}</ul>
    </section>
  );
}
