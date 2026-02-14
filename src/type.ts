export interface KanbanItem {
  id: string;
  content: string;
}

export interface Rows {
  todo: KanbanItem[];
  doing: KanbanItem[];
  done: KanbanItem[];
  unassigned: KanbanItem[];
}

export interface BoardDocument {
  boardId: string;
  data: Rows;
  lastUpdated: Date;
}