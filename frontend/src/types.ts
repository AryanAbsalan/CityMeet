
/**
 * Defines the structure for an Event object.
 * The 'id' is optional for when a new event is being created
 * before it receives a server-assigned ID (in later phases).
 */
export interface Event {
  id: number;
  title: string;
  description: string;
  city: string;
  date_time: string; // ISO 8601 string for easy sorting/display
  image_url?: string; // Optional image URL
  category?: string;  // Optional category/tag
}

// Mock data to start with (simulating data from an API)
export const mockEvents: Event[] = [
  {
    id: 1,
    title: "React & TypeScript Workshop",
    description: "Hands-on session learning advanced React patterns with TypeScript.",
    city: "Berlin",
    date_time: "2026-03-15T18:00:00Z",
    image_url: "https://picsum.photos/seed/react/300/200",
    category: "Tech",
  },
  {
    id: 2,
    title: "Local Hiking Meetup",
    description: "Enjoy a day hike on the beautiful local trails and network with other outdoor enthusiasts.",
    city: "Munich",
    date_time: "2026-03-20T09:30:00Z",
    image_url: "https://picsum.photos/seed/hike/300/200",
    category: "Outdoors",
  },
  {
    id: 3,
    title: "Book Club: 'The Martian'",
    description: "Discussing Andy Weir's masterpiece 'The Martian' and enjoying some coffee.",
    city: "Berlin",
    date_time: "2026-04-01T19:00:00Z",
    image_url: "https://picsum.photos/seed/book/300/200",
    category: "Social",
  },
];