export interface UserType {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  fridgeId?: string | null;
}
export interface FridgeType {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ShoppingListType {
  id: string;
  userId: string;
  fridgeId: string;
  name: string;
  amount?: string;
  dueDate?: string;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    name: string;
  };
}
export interface InventoryType {
  id: string;
  fridgeId: string;
  category: number;
  name: string;
  kana: string;
  remaining: number;
  createdAt: Date;
  updatedAt: Date;
}

interface SubwordType {
  furigana: string;
  roman: string;
  surface: string;
}
export interface KanaDataType {
  furigana: string;
  roman: string;
  subword: SubwordType[];
  surface: string;
}
