// src/components/EventForm.tsx
import React, { useState, useEffect } from 'react';
import type { Event } from '../types';

// Omit the 'id' field for the data used in the form/API request body
export type EventFormData = Omit<Event, 'id'>;

interface EventFormProps {
  initialEvent?: Event; // If provided, this is an Update operation
  onSubmit: (eventData: EventFormData, id?: number) => void;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ initialEvent, onSubmit, onCancel }) => {
  const isEditMode = !!initialEvent;
  
  const [formData, setFormData] = useState<EventFormData>(
    initialEvent ? {
      title: initialEvent.title,
      description: initialEvent.description,
      city: initialEvent.city,
      date_time: initialEvent.date_time.substring(0, 16), // Format for input type="datetime-local"
      image_url: initialEvent.image_url || '',
      category: initialEvent.category || '',
    } : {
      title: '',
      description: '',
      city: '',
      date_time: new Date().toISOString().substring(0, 16),
      image_url: '',
      category: '',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.title || !formData.city || !formData.date_time) {
        alert('Title, City, and Date/Time are required.');
        return;
    }

    // Convert datetime-local format back to ISO string for storage/display consistency
    const submittedData: EventFormData = {
        ...formData,
        date_time: new Date(formData.date_time).toISOString(),
    }

    onSubmit(submittedData, initialEvent?.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {isEditMode ? 'Edit Event' : 'Create New Event'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Date & Time</label>
              <input
                type="datetime-local"
                name="date_time"
                value={formData.date_time}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Image URL (Optional)</label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Category (Optional)</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {isEditMode ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;