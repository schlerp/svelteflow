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
  id?: string;
  name: string;
  isPk: boolean;
  isNullable: boolean;
  isUnique: boolean;
}

export interface IColumnDefinition2 {
  id?: string;
  name: string;
  primary_key: boolean;
  nullable: boolean;
  unique: boolean;
}

export interface ITableDefinition {
  id?: string;
  table: string;
  schema: string;
  database: string;
  columns: IColumnDefinition[];
}

export function isITableDefinition(arg: any): arg is ITableDefinition {
  return arg.table !== undefined;
}

export interface ITransformDefinition {
  id?: string;
  transform: string;
  filter: string;
}

export function isITransformDefinition(arg: any): arg is ITransformDefinition {
  return arg.transform !== undefined;
}

export interface IEdge {
  source: string;
  target: string;
}
