import { ModalContext, ModalContextType } from "@/context/modal-context";
import { useContext } from "react";
import {
  FaListUl,
  FaCubesStacked,
  FaBagShopping,
  FaFileLines,
} from "react-icons/fa6";

export const useMenuItems = () => {
  const { handleItemOpen } = useContext<ModalContextType>(ModalContext);

  const menuItems = [
    { title: "買物リスト追加", func: () => handleItemOpen(0), icon: FaListUl },
    { title: "在庫管理追加", func: () => handleItemOpen(1), icon: FaCubesStacked },
    { title: "購入品追加", link: "/", icon: FaBagShopping },
    { title: "購入履歴追加", link: "/", icon: FaFileLines },
  ];

  return { menuItems };
};
