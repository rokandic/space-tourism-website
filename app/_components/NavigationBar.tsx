"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logoImg from "../../public/assets/shared/logo.svg";
import styles from "./NavigationBar.module.css";
import MobileMenuButton from "./MobileMenuButton";
import NavigationMenu from "./NavigationMenu";

import { usePathname } from "next/navigation";

export default function NavigationBar() {
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);
  const pathName = usePathname();

  // close mobile menu on changing route path
  useEffect(() => {
    setMobileMenuExpanded(false);
  }, [pathName]);

  // disable transitions on window resize
  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    function handleWindowResize() {
      document.body.classList.add("resize-animation-stopper");
      clearTimeout(timeOut);
      timeOut = setTimeout(() => document.body.classList.remove("resize-animation-stopper"), 300);
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <nav className={styles.navigationMenu}>
      <Link className={styles.logoLink} href="/" onClick={() => setMobileMenuExpanded(false)}>
        <Image className={styles.logo} alt="Star logo image" src={logoImg} />
      </Link>
      <div className={styles.hLine} />
      <NavigationMenu
        mobileMenuExpanded={mobileMenuExpanded}
        setMobileMenuExpanded={setMobileMenuExpanded}
      />
      <MobileMenuButton
        mobileMenuExpanded={mobileMenuExpanded}
        setMobileMenuExpanded={setMobileMenuExpanded}
      />
    </nav>
  );
}
