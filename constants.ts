import { ServiceItem, WorkItem } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: "3D Modeling",
    description: "High-fidelity assets for games, film, and interactive web experiences.",
    icon: "box"
  },
  {
    id: 2,
    title: "Motion Graphics",
    description: "Fluid animations that bring your brand identity to life.",
    icon: "activity"
  },
  {
    id: 3,
    title: "Interactive Web",
    description: "Immersive WebGL experiences using Three.js and React.",
    icon: "globe"
  }
];

export const WORKS: WorkItem[] = [
  {
    id: 1,
    title: "Neon Horizon",
    category: "Cyberpunk Visualization",
    image: "https://picsum.photos/600/400?random=1"
  },
  {
    id: 2,
    title: "Abstract Flow",
    category: "Motion Design",
    image: "https://picsum.photos/600/400?random=2"
  },
  {
    id: 3,
    title: "Product Zen",
    category: "Commercial CGI",
    image: "https://picsum.photos/600/400?random=3"
  }
];