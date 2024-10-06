// models/reports.model.ts
export interface Report {
  _id?: string;  // Adiciona um campo _id, que pode ser opcional
  title: string;
  description: string;
  date: Date;  // Garante que a data seja do tipo Date
}
