import React from 'react';
import { Cours } from '../data/mockData';

interface CourseCardProps {
  cours: Cours;
  onReserver?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ cours, onReserver }) => {
  const getTypeClass = () => {
    switch (cours.type) {
      case 'pratique':
        return 'bg-blue-100 text-blue-800';
      case 'theorique':
        return 'bg-green-100 text-green-800';
      case 'examen':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = () => {
    switch (cours.type) {
      case 'pratique':
        return 'Pratique';
      case 'theorique':
        return 'Théorique';
      case 'examen':
        return 'Examen';
      default:
        return 'Autre';
    }
  };

  const placesDisponibles = cours.places.total - cours.places.reservees;
  const isComplet = placesDisponibles === 0;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-200">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getTypeClass()}`}>
              {getTypeLabel()}
            </span>
            <h3 className="mt-2 text-lg font-semibold text-gray-800">{cours.titre}</h3>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-600">{cours.date}</p>
            <p className="text-sm text-gray-500">{cours.heure} ({cours.duree}h)</p>
          </div>
        </div>
        
        <p className="mt-3 text-gray-600 text-sm">{cours.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              {isComplet 
                ? <span className="text-red-500 font-medium">Complet</span> 
                : <span>Places: <span className="font-medium">{placesDisponibles}/{cours.places.total}</span></span>
              }
            </p>
          </div>
          <button
            onClick={onReserver}
            disabled={isComplet}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              isComplet
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isComplet ? 'Complet' : 'Réserver'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
