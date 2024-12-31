import Image from "next/image";
import logo from "@/public/images/TaploLogo.svg";

export function Logo() {
  return <Image src={logo} alt="logo" width={24} height={24} />;
}
