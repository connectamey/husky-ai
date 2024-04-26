// Define the Contact type
export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  email?: string; // The question mark makes the property optional
  phone?: string; // The question mark makes the property optional
}

// Define the data with the Contact[] type
export const data: Contact[] = [
  {
    id: 1,
    first_name: 'Wilmette',
    last_name: 'Maasz',
    // Optional properties can be uncommented if present
    // email: 'wmaasz0@jalbum.net',
    // phone: '130-309-6439',
  },
  {
    id: 2,
    first_name: 'Morry',
    last_name: 'Heater',
    email: 'mheater1@yale.edu',
    phone: '814-809-2958',
  },
  {
    id: 3,
    first_name: 'Laverne',
    last_name: 'MacMorland',
    email: 'lmacmorland2@webnode.com',
    phone: '271-342-7249',
  },
  {
    id: 4,
    first_name: 'Cindee',
    last_name: 'De Freitas',
    email: 'cdefreitas3@privacy.gov.au',
    phone: '617-624-6967',
  },
  {
    id: 5,
    first_name: 'Carole',
    last_name: 'Reffe',
    email: 'creffe4@nih.gov',
    phone: '738-966-3137',
  },
  {
    id: 6,
    first_name: 'Ansel',
    last_name: 'Iwanicki',
    email: 'aiwanicki5@pagesperso-orange.fr',
    phone: '716-371-2467',
  },
  // ... add more contacts as needed
];
