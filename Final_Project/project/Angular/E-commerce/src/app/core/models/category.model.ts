export interface ICategory {
  _id: string;
  name: string;
  isActive: boolean;
  isDeleted: boolean;
  slug?: string;
  parentId?: string | null;
  children?: ICategory[];
}
