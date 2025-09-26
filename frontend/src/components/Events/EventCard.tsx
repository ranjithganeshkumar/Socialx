import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Event } from '../../types';

interface EventCardProps {
  event: Event;
  onAttend: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onAttend }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Event Image */}
      {event.imageUrl && (
        <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-600">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <div className="bg-white rounded-lg px-3 py-2 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {new Date(event.startDate).getDate()}
                </div>
                <div className="text-xs font-medium text-gray-600 uppercase">
                  {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short' })}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <span className="bg-purple-500 text-white text-xs font-medium px-3 py-1 rounded-full">
              {event.category}
            </span>
          </div>
        </div>
      )}

      {/* Event Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-gray-600">
            <Calendar size={18} className="text-blue-500" />
            <span className="text-sm">
              {formatDate(event.startDate)} at {formatTime(event.startDate)}
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-gray-600">
            <MapPin size={18} className="text-red-500" />
            <span className="text-sm">{event.location}</span>
          </div>
          
          <div className="flex items-center gap-3 text-gray-600">
            <Clock size={18} className="text-green-500" />
            <span className="text-sm">
              Duration: {Math.floor((new Date(event.endDate).getTime() - new Date(event.startDate).getTime()) / (1000 * 60 * 60))} hours
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-gray-600">
            <Users size={18} className="text-purple-500" />
            <span className="text-sm">{event.attendees} attendees</span>
          </div>
        </div>

        {/* Host Information */}
        <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-xl">
          <img
            src={event.creator.profilePicture}
            alt={event.creator.fullName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">Hosted by {event.creator.fullName}</p>
            <p className="text-xs text-gray-500">@{event.creator.username}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onAttend(event.id)}
            className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all duration-200 ${
              event.isAttending
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg transform hover:scale-105'
            }`}
          >
            {event.isAttending ? 'Attending' : 'Join Event'}
          </button>
          
          <button className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;