export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface WorkItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

export enum SectionType {
  HERO = 'hero',
  SERVICES = 'services',
  WORK = 'work',
  CONTACT = 'contact',
}