const registrationPosts = [
  {
    id: 1,
    author: 'Anna K.',
    timestamp: '2 godziny temu',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    author: 'Michał P.',
    timestamp: '4 godziny temu',
    text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 3,
    author: 'Katarzyna W.',
    timestamp: '6 godzin temu',
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    id: 4,
    author: 'Tomasz L.',
    timestamp: '8 godzin temu',
    text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 5,
    author: 'Magdalena S.',
    timestamp: '10 godzin temu',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  },
  {
    id: 6,
    author: 'Piotr K.',
    timestamp: '12 godzin temu',
    text: 'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.',
  },
  {
    id: 7,
    author: 'Agnieszka M.',
    timestamp: '14 godzin temu',
    text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
  },
  {
    id: 8,
    author: 'Jakub R.',
    timestamp: '16 godzin temu',
    text: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
  },
  {
    id: 9,
    author: 'Marcin T.',
    timestamp: '18 godzin temu',
    text: 'Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
  },
  {
    id: 10,
    author: 'Ewa B.',
    timestamp: '20 godzin temu',
    text: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi.',
  },
];

const reactionsOptions = ['👍', '❤️', '😮', '😢'];

export const zad4Content = {
  registration: {
    title: "Zadanie: Przeczytaj posty znajomych i wybierz reakcję dla każdego z nich",
    reactions: reactionsOptions,
    posts: registrationPosts
  },
  
  login: {
    title: "Zadanie: Przeczytaj posty znajomych i wybierz reakcję dla każdego z nich",
    reactions: reactionsOptions,
    posts: registrationPosts // TYMCZASOWO - te same posty
  }
};

// Zwraca odpowiedni zestaw danych
export const getZad4Content = (mode) => {
  return zad4Content[mode] || zad4Content.registration;
};
