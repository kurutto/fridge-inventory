import { FaListUl,FaCubesStacked,FaBagShopping,FaFileLines } from "react-icons/fa6";
const testFunc = () => {

}
export const menuItems = [
  {title:'買物リスト追加',func:testFunc,icon:FaListUl,},
  {title:'在庫管理追加',func:testFunc,icon:FaCubesStacked,},
  {title:'購入品追加',link:'/',icon:FaBagShopping,},
  {title:'購入履歴追加',link:'/',icon:FaFileLines,}
]