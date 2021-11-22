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
