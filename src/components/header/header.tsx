import Logo from "@/assets/logo";
import Menu from "./menu";
import HamburgerMenu from "./hamburger-menu";
import Link from "next/link";
import HeaderFridgeAccount from "./header-fridge-account";

const Header = () => {
  return (
    <header className="flex justify-between lg:pl-12 lg:py-9 md:py-7 md:pl-7 md:pr-7 md:shadow-[0_4px_10px_rgba(0,0,0,0.05)] max-md:bg-primary max-md:py-2.5 max-md:px-4">
      <h1 className="content-center">
        <Link href="/">
          <Logo
            className="lg:w-9 lg:h-9 md:w-8 md:h-8 md:fill-primary max-md:w-5 max-md:h-5 max-md:fill-white"
            aria-label="FIショッピングリスト"
          />
        </Link>
      </h1>
      <div className="flex items-center lg:gap-7 md:gap-6 max-md:gap-3">
        <Menu />
        <HeaderFridgeAccount />
        <HamburgerMenu />
      </div>
    </header>
  );
};

export default Header;
