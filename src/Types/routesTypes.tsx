import { ReactNode } from "react";

export interface IAccRoutes {
  name?: string;
  path: string;
  element: ReactNode;
  children?: IAccRoutes[];
}
export type IAccRoutesItem =
  | {
      key: string;
      label: ReactNode | string;
      children?: IAccRoutesItem[];
    }
  | undefined;
