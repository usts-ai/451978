import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import CourseCard from '../components/CourseCard';
import Card from '../components/Card';
import { cours, moniteurs } from '../data/mockData';

type FilterType = 'tous' | 'pratique' | 'theorique' | 'examen';
type SortType = 'date' | 'places' | 'duree';

interface Cours {
  id: number;
  titre: string;
  description: string;
  date: string;
  heure: string;
  duree: number;
  type: 'pratique' | 'theorique' | 'examen';
  moniteurId: number;
  places: {
    total: number;
    reservees: number;
  };
}

const CoursPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('tous');
  const [selectedSort, setSelectedSort] = useState<SortType>('date');
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [selectedCours, setSelectedCours] = useState<Cours | null>(null);

  // Filtrage des cours
  const filteredCours = cours.filter(c => {
    const matchesSearch = c.titre.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'tous' || c.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Tri des cours
  const sortedCours = [...filteredCours].sort((a, b) => {
    if (selectedSort === 'date') {
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));
      return dateA.getTime() - dateB.getTime();
    } else if (selectedSort === 'places') {
      const placesA = a.places.total - a.places.reservees;
      const placesB = b.places.total - b.places.reservees;
      return placesB - placesA;
    } else {
      return b.duree - a.duree;
    }
  });

  const handleReservation = (cours: Cours) => {
    setSelectedCours(cours);
    setShowReservationModal(true);
  };

  const handleConfirmReservation = () => {
    // Simulation de réservation réussie
    setShowReservationModal(false);
    // Afficher un message de confirmation qui disparaît après 3 secondes
    setTimeout(() => {
      // Ici, on pourrait modifier l'état pour faire disparaître la notification
    }, 3000);
  };

  const getMoniteurName = (id: number) => {
    const moniteur = moniteurs.find(m => m.id === id);
    return moniteur ? `${moniteur.prenom} ${moniteur.nom}` : 'Inconnu';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Réservation de cours</h1>
            <p className="mt-1 text-gray-600">Découvrez et réservez vos prochains cours de conduite</p>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-3/5">
              <label htmlFor="search" className="sr-only">Rechercher des cours</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
                  placeholder="Rechercher un cours par nom ou description"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/5">
              <label htmlFor="filter" className="sr-only">Filtrer par type</label>
              <select
                id="filter"
                name="filter"
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value as FilterType)}
              >
                <option value="tous">Tous les types</option>
                <option value="pratique">Pratique</option>
                <option value="theorique">Théorique</option>
                <option value="examen">Examen</option>
              </select>
            </div>
            
            <div className="w-full md:w-1/5">
              <label htmlFor="sort" className="sr-only">Trier par</label>
              <select
                id="sort"
                name="sort"
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as SortType)}
              >
                <option value="date">Date (croissant)</option>
                <option value="places">Places disponibles</option>
                <option value="duree">Durée (décroissant)</option>
              </select>
            </div>
          </div>
        </div>
        
        {sortedCours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCours.map((cours) => (
              <CourseCard 
                key={cours.id} 
                cours={cours} 
                onReserver={() => handleReservation(cours)} 
              />
            ))}
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun cours trouvé</h3>
            <p className="mt-1 text-sm text-gray-500">
              Nous n'avons pas trouvé de cours correspondant à votre recherche.
            </p>
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilter('tous');
                }}
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Assistance de réservation */}
      <div className="bg-blue-50 py-8 border-t border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Besoin d'aide pour choisir un cours ?</h2>
              <p className="mt-3 text-lg text-gray-500">
                Notre équipe est à votre disposition pour vous guider dans le choix des cours les plus adaptés à votre niveau et à vos objectifs.
              </p>
              <div className="mt-6">
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Nous contacter
                </a>
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 ml-4 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  FAQ
                </a>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">Conseils pour bien choisir vos cours</h3>
                  <ul className="mt-4 space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Privilégiez une progression régulière avec des cours hebdomadaires.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Alternez les cours théoriques et pratiques pour une meilleure assimilation.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Réservez en avance pour obtenir les créneaux qui vous conviennent le mieux.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        N'hésitez pas à demander un cours spécifique adapté à vos difficultés.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de réservation */}
      {showReservationModal && selectedCours && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Confirmer votre réservation
                    </h3>
                    <div className="mt-4">
                      <div className="bg-gray-50 p-4 rounded-md mb-4">
                        <h4 className="font-semibold text-gray-800">{selectedCours.titre}</h4>
                        <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-500">Date:</span>
                            <p className="font-medium">{selectedCours.date}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Heure:</span>
                            <p className="font-medium">{selectedCours.heure}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Durée:</span>
                            <p className="font-medium">{selectedCours.duree}h</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Type:</span>
                            <p className="font-medium">{
                              selectedCours.type === 'pratique' ? 'Pratique' : 
                              selectedCours.type === 'theorique' ? 'Théorique' : 'Examen'
                            }</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Moniteur:</span>
                            <p className="font-medium">{getMoniteurName(selectedCours.moniteurId)}</p>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-500">
                        Êtes-vous sûr de vouloir réserver ce cours ? Cette action est définitive.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleConfirmReservation}
                >
                  Confirmer la réservation
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowReservationModal(false)}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursPage;
