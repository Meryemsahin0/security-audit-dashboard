// Bir güvenlik görevinin (Task) sahip olması gereken tüm özellikler
export interface Task {
  id: number;           // Görevin benzersiz kimliği (Timestamp)
  text: string;         // Görevin açıklaması (Örn: Nmap Tarama)
  priority: string;     // Öncelik durumu: Düşük, Orta, Yüksek
  completed: boolean;   // Görev çözüldü mü, çözülmedi mi?
}

// Opsiyonel: Öncelik seviyelerini daha disiplinli tutmak istersen (Gelecek için)
export type PriorityLevel = 'Düşük' | 'Orta' | 'Yüksek';