"use client";
import { useContext, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import HamburgerMenuItem from "./hamburger-menu-item";
import HamburgerSubMenuItem from "./hamburger-sub-menu-item";
import HamburgerMenuLink from "./hamburger-menu-link";
import { cn } from "@/lib/utils";
import {
  FridgeAccountContext,
  FridgeAccountContextType,
} from "@/contexts/FridgeAccountContext";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { fridgeAccounts, changeFridgeAccount } =
    useContext<FridgeAccountContextType>(FridgeAccountContext);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const handleAccountClick = (id: string) => {
    changeFridgeAccount(id);
    handleOpen();
  };

  return (
    <>
      <div className="md:cursor-pointer max-md:text-white" onClick={handleOpen}>
        <FaBars className="md:text-4xl max-md:text-3xl" />
      </div>
      <div
        className={cn(
          "fixed top-0 right-0 transition-opacity",
          isOpen ? "h-screen w-screen opacity-50 bg-black" : "h-0 w-0 opacity-0"
        )}
        onClick={handleOpen}
      ></div>
      <div
        className={cn(
          "fixed w-80 h-screen top-0 transition-all bg-white",
          isOpen ? "right-0" : "-right-80"
        )}
      >
        <div
          className="w-fit ml-auto mt-4 mr-4 md:cursor-pointer "
          onClick={handleOpen}
        >
          <FaXmark className="md:text-4xl max-md:text-3xl" />
        </div>
        <ul>
          <HamburgerMenuItem href="/">トップページ</HamburgerMenuItem>
          <HamburgerMenuItem href="/">在庫管理設定</HamburgerMenuItem>
          <HamburgerMenuItem>
            <HamburgerMenuLink href="/member/fridge-account" onClick={handleOpen}>
              冷蔵庫アカウント切替・作成
            </HamburgerMenuLink>
            <ul>
              {fridgeAccounts?.map((fridgeAccount, idx) => (
                <HamburgerSubMenuItem
                  key={idx}
                  onClick={() => handleAccountClick(fridgeAccount.id)}
                >
                  {fridgeAccount.name}
                </HamburgerSubMenuItem>
              ))}
            </ul>
          </HamburgerMenuItem>
          <HamburgerMenuItem href="/">冷蔵庫アカウント管理</HamburgerMenuItem>
          <HamburgerMenuItem href="/mypage">マイページ</HamburgerMenuItem>
          <HamburgerMenuItem href="/api/auth/signout">
            ログアウト
          </HamburgerMenuItem>
        </ul>
      </div>
    </>
  );
};

export default HamburgerMenu;
