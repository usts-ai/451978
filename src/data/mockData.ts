export interface Eleve {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  photo: string;
  age: number;
  progression: number;
  heuresEffectuees: number;
  heuresRestantes: number;
  derniereLecon: string;
  prochaineLecon?: {
    date: string;
    heure: string;
    duree: number;
    moniteur: string;
  };
}

export interface Moniteur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  photo: string;
  specialite: string;
  experience: number;
  evaluations: number;
  disponible: boolean;
  elevesAssignes: number;
}

export interface Cours {
  id: number;
  titre: string;
  description: string;
  date: string;
  heure: string;
  duree: number;
  places: {
    total: number;
    reservees: number;
  };
  type: 'pratique' | 'theorique' | 'examen';
  moniteurId: number;
}

export interface Notification {
  id: number;
  message: string;
  date: string;
  lue: boolean;
  type: 'info' | 'succes' | 'avertissement' | 'erreur';
}

// Données élèves mockées
export const eleves: Eleve[] = [
  {
    id: 1,
    nom: 'Dubois',
    prenom: 'Marie',
    email: 'marie.dubois@exemple.fr',
    photo: 'https://randomuser.me/api/portraits/women/1.jpg',
    age: 19,
    progression: 65,
    heuresEffectuees: 15,
    heuresRestantes: 5,
    derniereLecon: '15/04/2025',
    prochaineLecon: {
      date: '22/04/2025',
      heure: '14:00',
      duree: 2,
      moniteur: 'Thomas Laurent'
    }
  },
  {
    id: 2,
    nom: 'Martin',
    prenom: 'Lucas',
    email: 'lucas.martin@exemple.fr',
    photo: 'https://randomuser.me/api/portraits/men/2.jpg',
    age: 22,
    progression: 30,
    heuresEffectuees: 7,
    heuresRestantes: 13,
    derniereLecon: '12/04/2025'
  },
  {
    id: 3,
    nom: 'Petit',
    prenom: 'Sophie',
    email: 'sophie.petit@exemple.fr',
    photo: 'https://randomuser.me/api/portraits/women/3.jpg',
    age: 18,
    progression: 85,
    heuresEffectuees: 19,
    heuresRestantes: 1,
    derniereLecon: '14/04/2025',
    prochaineLecon: {
      date: '18/04/2025',
      heure: '10:00',
      duree: 1,
      moniteur: 'Émilie Durand'
    }
  }
];

// Données moniteurs mockées
export const moniteurs: Moniteur[] = [
  {
    id: 1,
    nom: 'Laurent',
    prenom: 'Thomas',
    email: 'thomas.laurent@exemple.fr',
    photo: 'https://randomuser.me/api/portraits/men/4.jpg',
    specialite: 'Conduite en ville',
    experience: 8,
    evaluations: 4.8,
    disponible: true,
    elevesAssignes: 12
  },
  {
    id: 2,
    nom: 'Durand',
    prenom: 'Émilie',
    email: 'emilie.durand@exemple.fr',
    photo: 'https://randomuser.me/api/portraits/women/5.jpg',
    specialite: 'Code de la route',
    experience: 5,
    evaluations: 4.5,
    disponible: false,
    elevesAssignes: 15
  },
  {
    id: 3,
    nom: 'Moreau',
    prenom: 'Pierre',
    email: 'pierre.moreau@exemple.fr',
    photo: 'https://randomuser.me/api/portraits/men/6.jpg',
    specialite: 'Conduite sur autoroute',
    experience: 12,
    evaluations: 4.9,
    disponible: true,
    elevesAssignes: 8
  }
];

// Données cours mockées
export const cours: Cours[] = [
  {
    id: 1,
    titre: 'Initiation à la conduite en ville',
    description: 'Première approche de la conduite en milieu urbain, gestion des priorités et des intersections.',
    date: '22/04/2025',
    heure: '14:00',
    duree: 2,
    places: {
      total: 1,
      reservees: 1
    },
    type: 'pratique',
    moniteurId: 1
  },
  {
    id: 2,
    titre: 'Code de la route - session intensive',
    description: 'Préparation à l\'examen théorique avec focus sur les nouveautés du code de la route.',
    date: '18/04/2025',
    heure: '10:00',
    duree: 3,
    places: {
      total: 15,
      reservees: 12
    },
    type: 'theorique',
    moniteurId: 2
  },
  {
    id: 3,
    titre: 'Manœuvres et stationnement',
    description: 'Perfectionnement des techniques de stationnement et des manœuvres complexes.',
    date: '25/04/2025',
    heure: '09:00',
    duree: 2,
    places: {
      total: 1,
      reservees: 0
    },
    type: 'pratique',
    moniteurId: 3
  },
  {
    id: 4,
    titre: 'Examen blanc - Conduite',
    description: 'Simulation d\'examen de conduite pour évaluer votre niveau et préparer l\'examen officiel.',
    date: '28/04/2025',
    heure: '15:30',
    duree: 1.5,
    places: {
      total: 3,
      reservees: 2
    },
    type: 'examen',
    moniteurId: 1
  }
];

// Notifications mockées
export const notifications: Notification[] = [
  {
    id: 1,
    message: 'Votre prochaine leçon avec Thomas Laurent est confirmée pour le 22/04/2025 à 14h00.',
    date: '16/04/2025',
    lue: false,
    type: 'info'
  },
  {
    id: 2,
    message: 'Félicitations ! Vous avez réussi votre test de code avec un score de 38/40.',
    date: '10/04/2025',
    lue: true,
    type: 'succes'
  },
  {
    id: 3,
    message: 'Rappel : N\'oubliez pas de vous préparer pour votre leçon théorique de demain.',
    date: '15/04/2025',
    lue: false,
    type: 'avertissement'
  }
];
