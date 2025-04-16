import React from 'react';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  percentage, 
  label, 
  color = 'blue' 
}) => {
  const getColorClass = () => {
    switch(color) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="w-full">
      {label && <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${getColorClass()} transition-all duration-500 ease-in-out`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-end mt-1">
        <span className="text-xs font-medium text-gray-500">{percentage}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
