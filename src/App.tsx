// src/App.tsx (Updated)
import React, { useState, useMemo } from "react";
import type { Event } from "./types";
import { mockEvents } from "./types";

import EventList from "./components/EventList";
import SearchBar from "./components/SearchBar";

import type { EventFormData } from "./components/EventForm";
import EventForm from "./components/EventForm";

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [nextId, setNextId] = useState<number>(
    Math.max(...mockEvents.map((e) => e.id)) + 1
  );

  // State for search and filter
  const [searchText, setSearchText] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  // State to control the form's visibility and data
  // null means closed, Event object means edit mode
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Use useMemo to filter events only when search text, city filter, or event list changes
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // 1. Filter by Title (case-insensitive search)
      const matchesTitle = event.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      // 2. Filter by City (case-insensitive and only if filter is not empty)
      const matchesCity =
        cityFilter === "" ||
        event.city.toLowerCase().includes(cityFilter.toLowerCase());

      return matchesTitle && matchesCity;
    });
  }, [events, searchText, cityFilter]); // Dependencies

  // --- CRUD Implementations ---

  // CREATE / UPDATE
  const handleSubmitForm = (eventData: EventFormData, id?: number) => {
    if (id) {
      // UPDATE
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === id ? ({ ...event, ...eventData } as Event) : event
        )
      );
    } else {
      // CREATE
      const newEvent: Event = {
        id: nextId,
        ...eventData,
      };
      setEvents((prevEvents) => [newEvent, ...prevEvents]); // Add to the top
      setNextId((prevId) => prevId + 1); // Increment ID counter
    }

    // Close and reset form state
    handleCancelForm();
  };

  // DELETE (Remains the same)
  const handleDeleteEvent = (id: number) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    }
  };

  // UI Handlers
  const handleOpenCreate = () => {
    setEventToEdit(null); // Ensure it's not in edit mode
    setIsFormOpen(true);
  };

  const handleOpenEdit = (id: number) => {
    const event = events.find((e) => e.id === id);
    if (event) {
      setEventToEdit(event);
      setIsFormOpen(true);
    }
  };

  const handleCancelForm = () => {
    setEventToEdit(null);
    setIsFormOpen(false);
  };

  // Current view: Event List
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-blue-600">
          City Meetings: Events
        </h1>
        <p className="text-xl text-gray-500 mt-2">
          Your guide to local events. (Phase 1: Frontend Mock Data)
        </p>
      </header>

      <div className="container mx-auto">
        <div className="mb-6 p-4 bg-white shadow rounded-lg">
          <SearchBar
            searchText={searchText}
            cityFilter={cityFilter}
            onSearchChange={setSearchText}
            onCityChange={setCityFilter}
          />
          {/* The button can be moved inside or kept near SearchBar for better UI flow */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleOpenCreate}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
            >
              + Create New Event
            </button>
          </div>
        </div>

        <EventList
          events={filteredEvents} // Use the filtered list here!
          onEdit={handleOpenEdit}
          onDelete={handleDeleteEvent}
        />
      </div>

      {/* Conditional rendering of the form */}
      {(isFormOpen || eventToEdit) && (
        <EventForm
          initialEvent={eventToEdit || undefined} // Pass event data if editing
          onSubmit={handleSubmitForm}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

export default App;
