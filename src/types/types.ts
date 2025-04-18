export interface UserType {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  fridgeId?: string | null;
  fridgeName?: string | null;
  userFridges: UserFridgeType[];
  deleteConfirm: boolean;
}
export interface SessionType {
  user: UserType;
}
export interface FridgeType {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  userFridges: UserFridgeType[];
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
export interface PurchaseType {
  id: string;
  userId: string;
  fridgeId: string;
  inventoryId: string;
  name: string;
  category: number;
  purchaseDate: Date;
  user: {
    name: string;
  };
}
export interface PurchasesUserType {
  id: string;
  name: string;
}
export interface UserFridgeType {
  fridgeId: string;
  userId: string;
  user: UserType;
  fridge: FridgeType;
}
