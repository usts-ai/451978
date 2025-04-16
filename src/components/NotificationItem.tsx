import React from 'react';
import { Notification } from '../data/mockData';

interface NotificationItemProps {
  notification: Notification;
  onClick?: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClick }) => {
  const getIconByType = () => {
    switch (notification.type) {
      case 'info':
        return (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        );
      case 'succes':
        return (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        );
      case 'avertissement':
        return (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
        );
      case 'erreur':
        return (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const getBorderColorByType = () => {
    switch (notification.type) {
      case 'info': return 'border-blue-200';
      case 'succes': return 'border-green-200';
      case 'avertissement': return 'border-yellow-200';
      case 'erreur': return 'border-red-200';
      default: return 'border-gray-200';
    }
  };

  return (
    <div 
      className={`flex p-4 mb-3 rounded-lg border ${getBorderColorByType()} bg-white hover:shadow-md transition-shadow duration-200 cursor-pointer ${notification.lue ? 'opacity-70' : ''}`}
      onClick={onClick}
    >
      {getIconByType()}
      <div className="ml-3 flex-1">
        <p className={`text-sm ${notification.lue ? 'font-normal text-gray-600' : 'font-medium text-gray-900'}`}>
          {notification.message}
        </p>
        <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
      </div>
      {!notification.lue && (
        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 self-start mt-2"></div>
      )}
    </div>
  );
};

export default NotificationItem;
