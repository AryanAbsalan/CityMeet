// src/components/EventList.tsx
import React from 'react';
import type { Event } from '../types';
import EventCard from './EventCard';

interface EventListProps {
  events: Event[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onEdit, onDelete }) => {
  if (events.length === 0) {
    return <p className="text-center text-gray-500 mt-10 text-lg">No events found matching your criteria.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard 
          key={event.id} 
          event={event} 
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default EventList;