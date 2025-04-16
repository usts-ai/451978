import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import NotificationItem from '../components/NotificationItem';
import StatCard from '../components/StatCard';
import { eleves, notifications, cours } from '../data/mockData';

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming'>('today');
  const eleve = eleves[0]; // Utiliser le premier élève comme exemple

  // Filtrer les prochaines leçons
  const upcomingLessons = cours.filter(c => 
    new Date(c.date.split('/').reverse().join('-')) >= new Date()
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bonjour, {eleve.prenom} 👋</h1>
            <p className="mt-1 text-gray-600">Bienvenue sur votre tableau de bord. Voici un aperçu de votre progression.</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Réserver un cours
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Heures effectuées" 
            value={`${eleve.heuresEffectuees}h`}
            icon={
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            }
            change={{ value: 15, isPositive: true }}
          />
          
          <StatCard 
            title="Heures restantes" 
            value={`${eleve.heuresRestantes}h`}
            icon={
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            }
          />
          
          <StatCard 
            title="Dernière leçon" 
            value={eleve.derniereLecon}
            icon={
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            }
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card 
              title="Votre progression"
              className="overflow-visible"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            >
              <div className="mt-2">
                <div className="flex items-center mb-2">
                  <h4 className="text-lg font-medium text-gray-800">Progression globale</h4>
                  <span className="ml-auto text-2xl font-bold text-blue-600">{eleve.progression}%</span>
                </div>
                <ProgressBar percentage={eleve.progression} color="blue" />
                
                <div className="mt-6 space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Code de la route</span>
                      <span className="text-sm font-medium text-gray-700">85%</span>
                    </div>
                    <ProgressBar percentage={85} color="green" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Conduite en ville</span>
                      <span className="text-sm font-medium text-gray-700">70%</span>
                    </div>
                    <ProgressBar percentage={70} color="blue" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Conduite sur autoroute</span>
                      <span className="text-sm font-medium text-gray-700">45%</span>
                    </div>
                    <ProgressBar percentage={45} color="yellow" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Manœuvres</span>
                      <span className="text-sm font-medium text-gray-700">60%</span>
                    </div>
                    <ProgressBar percentage={60} color="blue" />
                  </div>
                </div>
              </div>
            </Card>
            
            <Card 
              title="Prochaines leçons"
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
                      activeTab === 'today' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('today')}
                  >
                    Aujourd'hui
                  </button>
                  <button
                    className={`py-2 px-1 font-medium text-sm border-b-2 ${
                      activeTab === 'upcoming' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('upcoming')}
                  >
                    À venir
                  </button>
                </div>
                
                <div className="mt-4">
                  {upcomingLessons.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingLessons.map((lesson) => (
                        <div key={lesson.id} className="flex p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                          <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-blue-100 text-blue-800 rounded-lg">
                            <span className="text-sm font-bold">{lesson.date.split('/')[0]}</span>
                            <span className="text-xs">{['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUIN', 'JUIL', 'AOÛT', 'SEP', 'OCT', 'NOV', 'DÉC'][parseInt(lesson.date.split('/')[1]) - 1]}</span>
                          </div>
                          <div className="ml-4">
                            <h4 className="font-medium text-gray-900">{lesson.titre}</h4>
                            <p className="text-sm text-gray-500">{lesson.heure} • {lesson.duree}h</p>
                            <div className="mt-1 flex items-center text-xs text-gray-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span>Moniteur: {moniteurs.find(m => m.id === lesson.moniteurId)?.prenom} {moniteurs.find(m => m.id === lesson.moniteurId)?.nom}</span>
                            </div>
                          </div>
                          <div className="ml-auto">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              lesson.type === 'pratique' ? 'bg-blue-100 text-blue-800' : 
                              lesson.type === 'theorique' ? 'bg-green-100 text-green-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {lesson.type === 'pratique' ? 'Pratique' : 
                               lesson.type === 'theorique' ? 'Théorique' : 'Examen'}
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
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune leçon prévue</h3>
                      <p className="mt-1 text-sm text-gray-500">Commencez par réserver votre première leçon.</p>
                      <div className="mt-6">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Réserver un cours
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card 
              title="Notifications"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              }
            >
              <div className="mt-2">
                <div className="overflow-y-auto max-h-96 -mx-5 px-5">
                  {notifications.map((notification) => (
                    <NotificationItem 
                      key={notification.id} 
                      notification={notification} 
                      onClick={() => {}}
                    />
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                    Voir toutes les notifications
                  </a>
                </div>
              </div>
            </Card>
            
            <Card 
              title="Conseils pour réussir"
              className="mt-6"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
            >
              <div className="mt-2 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <span className="font-bold text-xs">1</span>
                  </div>
                  <p className="ml-3 text-sm text-gray-600">
                    Révisez régulièrement le code de la route, même après l'avoir obtenu.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <span className="font-bold text-xs">2</span>
                  </div>
                  <p className="ml-3 text-sm text-gray-600">
                    Pratiquez l'observation active pendant vos trajets quotidiens.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <span className="font-bold text-xs">3</span>
                  </div>
                  <p className="ml-3 text-sm text-gray-600">
                    N'hésitez pas à poser des questions à votre moniteur si vous avez des doutes.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <span className="font-bold text-xs">4</span>
                  </div>
                  <p className="ml-3 text-sm text-gray-600">
                    Restez calme et concentré, même dans des situations stressantes.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Temporaire pour éviter les erreurs de build
const moniteurs = [
  { id: 1, prenom: 'Thomas', nom: 'Laurent' },
  { id: 2, prenom: 'Émilie', nom: 'Durand' },
  { id: 3, prenom: 'Pierre', nom: 'Moreau' }
];

export default DashboardPage;
