
export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const tasks: Task[] = [
  {
    id: 1,
    title: "Müşteri gereksinimlerini analiz et",
    completed: true
  },
  {
    id: 2,
    title: "API entegrasyonunu geliştir",
    completed: false
  },
  {
    id: 3,
    title: "Birim testlerini çalıştır",
    completed: true
  },
  {
    id: 4,
    title: "Veritabanı bağlantısını kontrol et",
    completed: false
  },
  {
    id: 5,
    title: "Hata raporlarını incele",
    completed: false
  }
];

export function getTasks(completed: boolean): Task[] {
  return tasks.filter(task => task.completed === completed);
}
