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
