import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavBarProps {
  userType?: 'eleve' | 'moniteur' | 'admin';
}

const NavBar: React.FC<NavBarProps> = ({ userType = 'eleve' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(2);
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Déterminer le nom et la couleur en fonction du type d'utilisateur
  const getUserTypeInfo = () => {
    switch(userType) {
      case 'moniteur':
        return { name: 'Moniteur', color: 'from-green-700 to-green-900' };
      case 'admin':
        return { name: 'Admin', color: 'from-purple-700 to-purple-900' };
      default:
        return { name: 'Élève', color: 'from-blue-700 to-blue-900' };
    }
  };

  const { name, color } = getUserTypeInfo();

  // Déterminer les liens de navigation en fonction du type d'utilisateur
  const getNavigationLinks = () => {
    switch(userType) {
      case 'moniteur':
        return [
          { path: '/moniteur', label: 'Tableau de bord' },
          { path: '/eleves', label: 'Mes élèves' },
          { path: '/planning', label: 'Planning' },
          { path: '/evaluations', label: 'Évaluations' }
        ];
      case 'admin':
        return [
          { path: '/admin', label: 'Tableau de bord' },
          { path: '/utilisateurs', label: 'Utilisateurs' },
          { path: '/statistiques', label: 'Statistiques' },
          { path: '/configuration', label: 'Configuration' }
        ];
      default:
        return [
          { path: '/dashboard', label: 'Tableau de bord' },
          { path: '/cours', label: 'Réserver un cours' },
          { path: '/progres', label: 'Mes progrès' },
          { path: '/messages', label: 'Messages' }
        ];
    }
  };

  const navLinks = getNavigationLinks();

  return (
    <nav className={`bg-gradient-to-r ${color} text-white shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button onClick={() => handleNavigation("/")} className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H11a1 1 0 001-1v-1h3.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-4a1 1 0 00-.293-.707l-2-2A1 1 0 0017 6h-3V4a1 1 0 00-1-1H3z" />
                </svg>
                <span className="font-bold text-xl">AutoÉcole Pro</span>
                <span className="ml-2 px-2 py-1 text-xs font-medium bg-white text-gray-800 rounded-full">
                  {name}
                </span>
              </button>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link, index) => (
                  <button 
                    key={index}
                    onClick={() => handleNavigation(link.path)} 
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-opacity-75 transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white font-bold transform -translate-y-1/3 translate-x-1/3">
                    {notifications}
                  </span>
                )}
              </button>
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="max-w-xs bg-blue-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
                  >
                    <span className="sr-only">Ouvrir le menu utilisateur</span>
                    <img
                      className="h-8 w-8 rounded-full object-cover border-2 border-white"
                      src="https://randomuser.me/api/portraits/women/1.jpg"
                      alt="Photo de profil"
                    />
                  </button>
                </div>
                {isOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <button onClick={() => handleNavigation("/profile")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mon profil</button>
                    <button onClick={() => handleNavigation("/settings")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Paramètres</button>
                    <button onClick={() => handleNavigation("/")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Se déconnecter</button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
            >
              <span className="sr-only">Ouvrir le menu principal</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link, index) => (
              <button 
                key={index}
                onClick={() => handleNavigation(link.path)} 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-blue-800">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://randomuser.me/api/portraits/women/1.jpg"
                  alt="Photo de profil"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium">Marie Dubois</div>
                <div className="text-sm font-medium text-blue-200">marie.dubois@exemple.fr</div>
              </div>
              <button className="ml-auto p-1 rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white font-bold">
                    {notifications}
                  </span>
                )}
              </button>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <button onClick={() => handleNavigation("/profile")} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors duration-200">
                Mon profil
              </button>
              <button onClick={() => handleNavigation("/settings")} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors duration-200">
                Paramètres
              </button>
              <button onClick={() => handleNavigation("/")} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors duration-200">
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
