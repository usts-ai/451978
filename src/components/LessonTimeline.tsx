import React from 'react';

interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'upcoming' | 'pending' | 'canceled';
  moniteur?: string;
}

interface LessonTimelineProps {
  items: TimelineItem[];
}

const LessonTimeline: React.FC<LessonTimelineProps> = ({ items }) => {
  const getStatusClasses = (status: TimelineItem['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'upcoming':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'canceled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: TimelineItem['status']) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'upcoming':
        return 'À venir';
      case 'pending':
        return 'En attente';
      case 'canceled':
        return 'Annulé';
      default:
        return 'Inconnu';
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-0 bottom-0 left-7 w-0.5 bg-gray-200"></div>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={item.id} className="relative flex items-start group">
            <div className={`flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full ${getStatusClasses(item.status)} shadow-md z-10 mr-4`}>
              {item.status === 'completed' ? (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              ) : item.status === 'upcoming' ? (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              ) : item.status === 'canceled' ? (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              )}
            </div>
            <div className="flex-1 bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  item.status === 'completed' ? 'bg-green-100 text-green-800' :
                  item.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                  item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {getStatusLabel(item.status)}
                </span>
              </div>
              <p className="mt-3 text-gray-600">{item.description}</p>
              {item.moniteur && (
                <p className="mt-2 text-sm text-gray-500">Moniteur: <span className="font-medium">{item.moniteur}</span></p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonTimeline;
