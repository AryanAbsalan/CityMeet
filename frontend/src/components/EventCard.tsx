// src/components/EventCard.tsx
import React from 'react';
import type { Event } from '../types';

interface EventCardProps {
  event: Event;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete }) => {
  const formattedDate = new Date(event.date_time).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 transition duration-300 hover:shadow-xl">
      {event.image_url && (
        <img 
          src={event.image_url} 
          alt={event.title} 
          className="w-full h-48 object-cover" 
          onError={(e) => { // Fallback for broken mock images
            e.currentTarget.src = 'https://picsum.photos/seed/fallback/300/200';
          }}
        />
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
          {event.category && (
            <span className="text-xs font-semibold inline-block py-1 px-3 uppercase rounded-full text-blue-600 bg-blue-200">
              {event.category}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mb-1">{formattedDate} • **{event.city}**</p>
        <p className="text-gray-600 mt-2 line-clamp-3">{event.description}</p>
      </div>
      <div className="flex justify-end space-x-2 p-4 border-t border-gray-100">
        <button
          onClick={() => onEdit(event.id)}
          className="text-sm px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(event.id)}
          className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;