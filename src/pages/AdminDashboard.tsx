import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import { moniteurs, eleves, cours } from '../data/mockData';

const AdminDashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'tous' | 'eleves' | 'moniteurs'>('tous');
  
  // Statistiques d'utilisation (simulées)
  const statsUtilisation = {
    nouveauxEleves: 12,
    nouveauxMoniteurs: 3,
    tauxReussite: 85,
    revenuMensuel: 15300
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar userType="admin" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tableau de bord administrateur</h1>
            <p className="mt-1 text-gray-600">Gérez l'ensemble des activités de l'auto-école</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Ajouter un utilisateur
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Élèves inscrits" 
            value={eleves.length + statsUtilisation.nouveauxEleves}
            icon={
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            }
            change={{ value: statsUtilisation.nouveauxEleves, isPositive: true }}
          />
          
          <StatCard 
            title="Moniteurs" 
            value={moniteurs.length + statsUtilisation.nouveauxMoniteurs}
            icon={
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            }
            change={{ value: statsUtilisation.nouveauxMoniteurs, isPositive: true }}
          />
          
          <StatCard 
            title="Taux de réussite" 
            value={statsUtilisation.tauxReussite + "%"}
            icon={
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            }
            change={{ value: 3, isPositive: true }}
          />
          
          <StatCard 
            title="Revenus mensuels" 
            value={statsUtilisation.revenuMensuel + "€"}
            icon={
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            }
            change={{ value: 5, isPositive: true }}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card 
              title="Utilisateurs récents"
              className="overflow-visible"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              }
            >
              <div className="mt-2">
                <div className="flex space-x-4 border-b">
                  <button
                    className={`py-2 px-1 font-medium text-sm border-b-2 ${
                      activeFilter === 'tous' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveFilter('tous')}
                  >
                    Tous
                  </button>
                  <button
                    className={`py-2 px-1 font-medium text-sm border-b-2 ${
                      activeFilter === 'eleves' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveFilter('eleves')}
                  >
                    Élèves
                  </button>
                  <button
                    className={`py-2 px-1 font-medium text-sm border-b-2 ${
                      activeFilter === 'moniteurs' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveFilter('moniteurs')}
                  >
                    Moniteurs
                  </button>
                </div>
                
                <div className="mt-4 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nom
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date d'inscription
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Afficher les élèves en fonction du filtre actif */}
                      {(activeFilter === 'tous' || activeFilter === 'eleves') && eleves.map((eleve) => (
                        <tr key={`eleve-${eleve.id}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full object-cover" src={eleve.photo} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {eleve.prenom} {eleve.nom}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {eleve.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Élève
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            10/04/2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-purple-600 hover:text-purple-900">Modifier</button>
                          </td>
                        </tr>
                      ))}

                      {/* Afficher les moniteurs en fonction du filtre actif */}
                      {(activeFilter === 'tous' || activeFilter === 'moniteurs') && moniteurs.map((moniteur) => (
                        <tr key={`moniteur-${moniteur.id}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full object-cover" src={moniteur.photo} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {moniteur.prenom} {moniteur.nom}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {moniteur.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Moniteur
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            05/03/2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-purple-600 hover:text-purple-900">Modifier</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
            
            <Card 
              title="Calendrier des examens"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            >
              <div className="mt-4">
                <div className="relative overflow-hidden bg-white rounded-lg shadow">
                  <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Avril 2025</h3>
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-px bg-gray-200">
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day) => (
                      <div key={day} className="bg-white text-center py-2 text-xs font-semibold text-gray-500">{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-px bg-gray-200">
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                      <div 
                        key={day} 
                        className={`bg-white py-2 text-center text-sm ${
                          day === 16 ? 'bg-purple-50 font-semibold' : ''
                        }`}
                      >
                        <div className="flex flex-col items-center">
                          <span className="text-gray-800">{day}</span>
                          {day === 18 && (
                            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                          )}
                          {day === 25 && (
                            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                          )}
                          {day === 28 && (
                            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-purple-600"></span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="h-3 w-3 rounded-full bg-blue-600"></span>
                    <span className="text-sm text-gray-600">Examens pratiques</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="h-3 w-3 rounded-full bg-purple-600"></span>
                    <span className="text-sm text-gray-600">Examens du code</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <Card 
              title="Statistiques"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            >
              <div className="mt-4 space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Taux de réussite au code</span>
                    <span className="text-sm font-medium text-gray-700">89%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Taux de réussite à la conduite</span>
                    <span className="text-sm font-medium text-gray-700">76%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '76%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Satisfaction client</span>
                    <span className="text-sm font-medium text-gray-700">94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Occupation des véhicules</span>
                    <span className="text-sm font-medium text-gray-700">81%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '81%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="text-sm font-medium text-purple-600 hover:text-purple-500">
                  Voir toutes les statistiques
                </button>
              </div>
            </Card>
            
            <Card 
              title="Tâches à faire"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              }
            >
              <div className="mt-4 space-y-3">
                <div className="flex items-center p-3 bg-red-50 rounded-lg border border-red-100">
                  <input type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">Valider les nouvelles inscriptions</p>
                    <p className="text-xs text-gray-500 mt-0.5">Avant le 18/04/2025</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Urgent</span>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <input type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">Mettre à jour le planning des examens</p>
                    <p className="text-xs text-gray-500 mt-0.5">Avant le 20/04/2025</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Important</span>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <input type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">Réunion mensuelle avec les moniteurs</p>
                    <p className="text-xs text-gray-500 mt-0.5">25/04/2025 - 14:00</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Planifié</span>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-100">
                <button className="flex items-center justify-center w-full px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  <svg className="mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Ajouter une tâche
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
