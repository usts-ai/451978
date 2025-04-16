import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import { moniteurs, eleves, cours } from '../data/mockData';

const MoniteurDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming'>('today');
  const moniteur = moniteurs[0]; // Utiliser le premier moniteur comme exemple
  
  // Filtrer les élèves assignés à ce moniteur (simulation)
  const mesEleves = eleves.slice(0, moniteur.elevesAssignes > 3 ? 3 : moniteur.elevesAssignes);
  
  // Filtrer les prochains cours de ce moniteur
  const mesCours = cours.filter(c => c.moniteurId === moniteur.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar userType="moniteur" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bonjour, {moniteur.prenom} 👋</h1>
            <p className="mt-1 text-gray-600">Bienvenue sur votre tableau de bord moniteur.</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Gérer mes disponibilités
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Élèves assignés" 
            value={moniteur.elevesAssignes}
            icon={
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            }
            change={{ value: 20, isPositive: true }}
          />
          
          <StatCard 
            title="Heures de cours ce mois" 
            value="45h"
            icon={
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            }
            change={{ value: 5, isPositive: true }}
          />
          
          <StatCard 
            title="Évaluation moyenne" 
            value={moniteur.evaluations + "/5"}
            icon={
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            }
            change={{ value: 0.2, isPositive: true }}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card 
              title="Mes prochains cours"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            >
              <div className="mt-2">
                <div className="flex space-x-4 border-b">
                  <button
                    className={`py-2 px-1 font-medium text-sm border-b-2 ${
                      activeTab === 'today' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('today')}
                  >
                    Aujourd'hui
                  </button>
                  <button
                    className={`py-2 px-1 font-medium text-sm border-b-2 ${
                      activeTab === 'upcoming' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('upcoming')}
                  >
                    À venir
                  </button>
                </div>
                
                <div className="mt-4">
                  {mesCours.length > 0 ? (
                    <div className="space-y-4">
                      {mesCours.map((cours) => (
                        <div key={cours.id} className="flex p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                          <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-green-100 text-green-800 rounded-lg">
                            <span className="text-sm font-bold">{cours.date.split('/')[0]}</span>
                            <span className="text-xs">{['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUIN', 'JUIL', 'AOÛT', 'SEP', 'OCT', 'NOV', 'DÉC'][parseInt(cours.date.split('/')[1]) - 1]}</span>
                          </div>
                          <div className="ml-4">
                            <h4 className="font-medium text-gray-900">{cours.titre}</h4>
                            <p className="text-sm text-gray-500">{cours.heure} • {cours.duree}h</p>
                            <div className="mt-1 flex items-center text-xs text-gray-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              <span>Élèves: {cours.places.reservees}/{cours.places.total}</span>
                            </div>
                          </div>
                          <div className="ml-auto">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              cours.type === 'pratique' ? 'bg-blue-100 text-blue-800' : 
                              cours.type === 'theorique' ? 'bg-green-100 text-green-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {cours.type === 'pratique' ? 'Pratique' : 
                               cours.type === 'theorique' ? 'Théorique' : 'Examen'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun cours prévu</h3>
                      <p className="mt-1 text-sm text-gray-500">Vous n'avez pas de cours programmés pour le moment.</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
            
            <Card 
              title="Évaluations de mes élèves"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              }
            >
              <div className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full object-cover" src="https://randomuser.me/api/portraits/women/1.jpg" alt="" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Marie Dubois</p>
                      <div className="flex items-center mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className={`h-4 w-4 ${star <= 5 ? 'text-yellow-400' : 'text-gray-300'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-sm text-gray-500">15/04/2025</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    "Excellent moniteur, très patient et pédagogue. Les explications sont claires et précises."
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full object-cover" src="https://randomuser.me/api/portraits/men/2.jpg" alt="" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Lucas Martin</p>
                      <div className="flex items-center mt-1">
                        {[1, 2, 3, 4].map((star) => (
                          <svg key={star} className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <svg className="h-4 w-4 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-2 text-sm text-gray-500">10/04/2025</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    "Très bon moniteur mais pourrait être plus disponible pour répondre aux questions après les cours."
                  </p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <button className="text-sm font-medium text-green-600 hover:text-green-500">
                  Voir toutes les évaluations
                </button>
              </div>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card 
              title="Mes élèves"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            >
              <div className="mt-2 space-y-3">
                {mesEleves.map((eleve) => (
                  <div key={eleve.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <img className="h-10 w-10 rounded-full object-cover" src={eleve.photo} alt="" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{eleve.prenom} {eleve.nom}</p>
                      <p className="text-xs text-gray-500">Progression: {eleve.progression}%</p>
                    </div>
                    <button className="ml-auto p-1 text-gray-400 hover:text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <button className="text-sm font-medium text-green-600 hover:text-green-500">
                  Voir tous mes élèves
                </button>
              </div>
            </Card>
            
            <Card 
              title="Planning hebdomadaire"
              className="mt-6"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            >
              <div className="mt-2">
                <div className="space-y-2">
                  {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].map((jour, index) => (
                    <div key={jour} className={`p-2 rounded ${index === 2 ? 'bg-green-100 border-l-4 border-green-500' : 'bg-gray-50'}`}>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800">{jour}</span>
                        <span className="text-sm text-gray-600">
                          {index === 0 ? '8h - 17h' : 
                          index === 1 ? '9h - 18h' : 
                          index === 2 ? '10h - 19h' : 
                          index === 3 ? '8h - 17h' :
                          index === 4 ? '9h - 18h' : '8h - 12h'}
                        </span>
                      </div>
                      {index === 2 && (
                        <div className="mt-1 text-xs text-green-700">
                          Aujourd'hui - 3 cours programmés
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="p-2 rounded bg-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-400">Dimanche</span>
                      <span className="text-sm text-gray-400">Repos</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoniteurDashboard;
