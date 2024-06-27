import { StaticImageData, getImageProps } from "next/image";

interface setBackgroundImagesProps {
  bgMobileImg: StaticImageData;
  bgTabletImg: StaticImageData;
  bgDesktopImg: StaticImageData;
}
export default function setBackgroundImages({
  bgMobileImg,
  bgTabletImg,
  bgDesktopImg,
}: setBackgroundImagesProps) {
  const common = { alt: "Background image", sizes: "100vh" };
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: bgDesktopImg.width,
    height: bgDesktopImg.height,
    quality: 100,
    src: bgDesktopImg.src,
  });
  const {
    props: { srcSet: tablet },
  } = getImageProps({
    ...common,
    width: bgTabletImg.width,
    height: bgTabletImg.height,
    quality: 100,
    src: bgTabletImg.src,
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: bgMobileImg.width,
    height: bgMobileImg.height,
    quality: 100,
    src: bgMobileImg.src,
  });
  return { desktop, tablet, mobile, ...rest };
}
