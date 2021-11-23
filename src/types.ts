export interface IDraggable {
  content: string;
  id?: string;
  headerText?: string;
  footerText?: string;
}

export interface IDragMoveEvent {
  id: string;
  x: number;
  y: number;
}

export interface IFormField {
  name: string;
  label?: string;
  type: string;
  value: string | number | boolean;
  disabled?: boolean;
  connectable?: boolean;
}

export type IInputType = "text" | "password" | "email" | "number" | "checkbox";

export interface IColumnDefinition {
  name: string;
  isPk: boolean;
  isNullable: boolean;
  isUnique: boolean;
}

export interface ITableDefinition {
  table: string;
  schema: string;
  database: string;
  columns: IColumnDefinition[];
}

export interface ITransformDefinition {
  transform: string;
  filter: string;
}
