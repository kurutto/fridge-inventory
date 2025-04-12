"use client";
import { cn } from "@/lib/utils";
import { FaBars } from "react-icons/fa6";
import HamburgerMenuItem from "./hamburger-menu-item";
import HamburgerSubMenuItem from "./hamburger-sub-menu-item";
import HamburgerMenuLink from "./hamburger-menu-link";
import { UserType } from "@/types/types";
import { useChangeFridgeAccount } from "@/hooks/use-change-fridge-account";
import { useHandleOpen } from "@/hooks/use-handle-open";
import Overlay from "../ui/overlay";
import CloseButton from "../ui/close-button";

interface HamburgerMenu {
  user?: UserType;
}

const HamburgerMenu = ({ user }: HamburgerMenu) => {
  const { changeFridgeAccount } = useChangeFridgeAccount();
  const { isOpen, handleOpen } = useHandleOpen();
  const handleAccountClick = (id: string) => {
    changeFridgeAccount(id);
    handleOpen();
  };
  const fridgeAccounts = user?.userFridges;
  return (
    <>
      <div className="md:cursor-pointer max-md:text-white" onClick={handleOpen}>
        <FaBars className="md:text-4xl max-md:text-3xl" />
      </div>
      <Overlay isOpen={isOpen} handleOpen={handleOpen} />
      <div
        className={cn(
          "fixed w-80 h-screen top-0 transition-all bg-white z-50",
          isOpen ? "right-0" : "-right-80"
        )}
      >
        <CloseButton handleOpen={handleOpen} className="ml-auto mt-4 mr-4" />
        <ul>
          <HamburgerMenuItem href={`/member/${user?.fridgeId}/account`}>
            トップページ
          </HamburgerMenuItem>
          {user && (
            <HamburgerMenuItem>
              <HamburgerMenuLink
                href="/member/fridge-account"
                onClick={handleOpen}
              >
                冷蔵庫アカウント作成・切替
              </HamburgerMenuLink>
              {fridgeAccounts && (
                <ul>
                  {fridgeAccounts.map((fridgeAccount, idx) => (
                    <HamburgerSubMenuItem
                      key={idx}
                      onClick={() => handleAccountClick(fridgeAccount.fridgeId)}
                    >
                      {fridgeAccount.fridge.name}
                    </HamburgerSubMenuItem>
                  ))}
                </ul>
              )}
            </HamburgerMenuItem>
          )}
          {user?.fridgeId && (
            <HamburgerMenuItem href={`/member/${user?.fridgeId}/account`}>
              冷蔵庫アカウント管理
            </HamburgerMenuItem>
          )}
          {user ? (
            <>
              <HamburgerMenuItem href="/member/mypage">
                マイページ
              </HamburgerMenuItem>
              <HamburgerMenuItem href="/api/auth/signout">
                ログアウト
              </HamburgerMenuItem>
            </>
          ) : (
            <>
              <HamburgerMenuItem href="/signin">ログイン</HamburgerMenuItem>
              <HamburgerMenuItem href="/signup">
                アカウント作成
              </HamburgerMenuItem>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default HamburgerMenu;
