import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change,
  bgColor = 'bg-white'
}) => {
  return (
    <div className={`rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden ${bgColor}`}>
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-3">
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h4 className="text-2xl font-bold text-gray-800 mt-1">{value}</h4>
          </div>
        </div>
        
        {change && (
          <div className="mt-4">
            <div className={`inline-flex items-center text-sm ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {change.isPositive ? (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              )}
              <span>{change.value}%</span>
              <span className="text-gray-500 ml-1">depuis le dernier mois</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
