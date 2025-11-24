
// --- POSTY DLA REJESTRACJI ---

const registrationPosts = [
  {
    id: 1,
    author: 'Anna K.',
    timestamp: '2 godziny temu',
    text: 'Rano zrobiłam sobie krótką przerwę na herbatę i patrzenie przez okno. Czasem to wystarczy, żeby zacząć dzień trochę spokojniej.',
     imageUrl: 'https://images.unsplash.com/photo-1641516700730-99a54e7091a0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHRlYSUyMHdpbmRvd3xlbnwwfDB8MHx8fDA%3D',
  },
  {
    id: 2,
    author: 'Michał P.',
    timestamp: '4 godziny temu',
    text: 'Dziś zrobiło się wyjątkowo słonecznie, więc usiadłem przy oknie z laptopem.',
         imageUrl: 'https://plus.unsplash.com/premium_photo-1725867721409-009dd5630f48?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHN1bm55JTIwd2luZG93JTIwbGFwdG9wfGVufDB8MHwwfHx8MA%3D%3D',

  },
  {
    id: 3,
    author: 'Katarzyna W.',
    timestamp: '6 godzin temu',
    text: 'Wreszcie wróciłam do swojej ulubionej playlisty. Nie wiem, jak to działa, ale od razu robi się przytulniej.',
             imageUrl: 'https://images.unsplash.com/photo-1617270132816-33fadd25cc88?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHBsYXlsaXN0fGVufDB8MHwwfHx8MA%3D%3D',

  },
  {
    id: 4,
    author: 'Tomasz L.',
    timestamp: '8 godzin temu',
    text: 'Zrobiłem porządek na pulpicie i w dokumentach. Mała rzecz, ale wprowadza zaskakujący spokój.',
    imageUrl: 'https://images.unsplash.com/photo-1633988354540-d3f4e97c67b5?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHByb2R1Y3Rpdml0eXxlbnwwfDB8MHx8fDA%3D',

  },
  {
    id: 5,
    author: 'Magdalena S.',
    timestamp: '10 godzin temu',
    text: 'Dzisiaj wszystko toczyło się powoli, bez pośpiechu. Lubię takie dni - zwykłe, ale dobre.',
    imageUrl: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhdHxlbnwwfDB8MHx8fDA%3D',

  },
  {
    id: 6,
    author: 'Piotr K.',
    timestamp: '12 godzin temu',
    text: 'Przygotowałam sobie prosty obiad i zjadłam go w ciszy, bez telefonu. Krótki moment, a naprawdę dobrze robi.',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1723575709538-8ed0f48e5a8b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZWFzeSUyMGRpbm5lcnxlbnwwfDB8MHx8fDA%3D',

  },
  {
    id: 7,
    author: 'Agnieszka M.',
    timestamp: '14 godzin temu',
    text: 'W ciągu dnia trafiłem na kilka drobnych miłych rzeczy - ładne światło, ciepła kawa, chwila ciszy. Niby nic, a jednak.',
    imageUrl: 'https://images.unsplash.com/photo-1621779474825-754202895b35?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvZmZlZSUyMGJyZWFrfGVufDB8MHwwfHx8MA%3D%3D',

  },
  {
    id: 8,
    author: 'Jakub R.',
    timestamp: '16 godzin temu',
    text: 'Dzisiaj było trochę chłodniej, więc zrobiłam sobie gorącą czekoladę i chwilę usiadłam pod kocem. Małe domowe rytuały są najlepsze.',
    imageUrl: 'https://images.unsplash.com/photo-1695130152293-0f839a0c2cbf?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90JTIwY2hvY29sYXRlJTIwYmxhbmtldHxlbnwwfDB8MHx8fDA%3D',

  },
  {
    id: 9,
    author: 'Marcin T.',
    timestamp: '18 godzin temu',
    text: 'Skończyłem kilka zaległych spraw i w końcu mogłem sobie pozwolić na spokojny wieczór. Lubię taki moment oddechu.',
    imageUrl: 'https://images.unsplash.com/photo-1608890558220-527ef33e932a?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGNvenklMjBldmVuaW5nfGVufDB8MHwwfHx8MA%3D%3D',

  },
  {
    id: 10,
    author: 'Ewa B.',
    timestamp: '20 godzin temu',
    text: 'Znalazłam stare zdjęcia w telefonie i zrobiło mi się naprawdę nostalgicznie. Niesamowite, jak szybko mijają zwykłe dni.',
    imageUrl: 'https://images.unsplash.com/photo-1762507102198-e39d28e917de?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fG5vc3RhbGdpYSUyMG9sZCUyMHBob3RvfGVufDB8MHwwfHx8MA%3D%3D',

  },
];
// --- POSTY DLA LOGOWANIA ---

const loginPosts = [
  {
    id: 1,
    author: 'Anna K.',
    timestamp: '2 godziny temu',
    text: 'W zeszłą sobotę zrobiło się zimniej i mroźnie. Czy to już czas aby odliczać do świąt?',
    imageUrl: 'https://images.unsplash.com/photo-1646866113276-d4903ae4e2aa?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGdyb3VuZCUyMGZyb3N0fGVufDB8MHwwfHx8MA%3D%3D',
  },
  {
    id: 2,
    author: 'Michał P.',
    timestamp: '4 godziny temu',
    text: 'Dzisiaj kolejne inspiracje książkowe. Wybrałam taką historię, którą czyta się z zaciekawieniem od początku do końca. Idealnie wypełni co najmniej kilka jesiennych wieczorów. „Pierwszy dzień” i „Pierwsza noc” Marca Levy to wciągająca historia dwójki naukowców poszukujących odpowiedzi na pytanie kiedy i jak na ziemi pojawili się ludzie.',
    imageUrl: 'https://www.themomentsbyela.pl/images/2020/10-25-ksiazki/theMOMENTSbyELA-2020-10-ksiazki-001.jpg',

  },
  {
    id: 3,
    author: 'Katarzyna W.',
    timestamp: '6 godzin temu',
    text: 'Miód powinno podawać się na zimno lub do ostudzonej herbaty lub wody drewnianą łyżeczką albo drewnianym nabierakiem. Wysoka temperatura obniża wartość odżywczą miodu – już w 45°C rozkładają się zawarte w nim cenne enzymy.',
    imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG9uZXl8ZW58MHx8MHx8fDA%3D',

  },
  {
    id: 4,
    author: 'Tomasz L.',
    timestamp: '8 godzin temu',
    text: 'Szybka przerwa, szybka kawa. Bez pośpiechu.',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1674327105074-46dd8319164b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlfGVufDB8MHwwfHx8MA%3D%3D',

  },
  {
    id: 5,
    author: 'Magdalena S.',
    timestamp: '10 godzin temu',
    text: 'Poranek jak każdy - laptop, kubek i pół godziny na ogarnięcie myśli.',
    imageUrl: 'https://images.unsplash.com/photo-1541193658129-28529758aaf1?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGdvb2QlMjBtb3JuaW5nfGVufDB8MHwwfHx8MA%3D%3D',
  },
  {
    id: 6,
    author: 'Piotr K.',
    timestamp: '12 godzin temu',
    text: 'Małe rzeczy robią największy spokój. Nawet taki widok.”',
     imageUrl: 'https://plus.unsplash.com/premium_photo-1673451727115-1c8776b781a8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBlYWNlfGVufDB8MHwwfHx8MA%3D%3D',
  },
  {
    id: 7,
    author: 'Agnieszka M.',
    timestamp: '14 godzin temu',
    text: 'Dziś złapałam moment totalnego luzu - ciepły koc, spokojne światło i ulubiona muzyka w tle. Takie krótkie chwile naprawdę potrafią ustawić cały dzień ',
         imageUrl: 'https://images.unsplash.com/photo-1680444257344-e9eb152fb116?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGF1dHVtbiUyMGJsYW5rZXR8ZW58MHwwfDB8fHww',

  },
  {
    id: 8,
    author: 'Jakub R.',
    timestamp: '16 godzin temu',
    text: 'Ciepłe światło, ciepły napój, zimny telefon. Klasyk.',
         imageUrl: 'https://images.unsplash.com/photo-1631832612525-98ba50f35189?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FybSUyMGxpZ2h0fGVufDB8MHwwfHx8MA%3D%3D',

  },
  {
    id: 9,
    author: 'Marcin T.',
    timestamp: '18 godzin temu',
    text: 'Otwieram notes tylko po to, żeby zamknąć go z powrotem. Ale wygląda ładnie.',
         imageUrl: 'https://images.unsplash.com/photo-1611079830811-865ff4428d17?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fG5vdGVzfGVufDB8MHwwfHx8MA%3D%3D',

  },
  {
    id: 10,
    author: 'Ewa B.',
    timestamp: '20 godzin temu',
    text: 'Lubię, gdy miasto jest trochę głośne - wtedy łatwo się zgubić w swoich myślach.',
         imageUrl: 'https://images.unsplash.com/photo-1758465026909-d062b068f453?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNpdHklMjBwZWFjZXxlbnwwfDB8MHx8fDA%3D',

  },
];

const reactionsOptions = ['👍', '❤️', '😮','😢'];

export const zad4Content = {
  registration: { 
    title: "Zadanie: Przeczytaj posty znajomych i wybierz reakcję dla każdego z nich",
    reactions: reactionsOptions,
    posts: registrationPosts
  },
  
  login: {
    title: "Zadanie: Przeczytaj posty znajomych i wybierz reakcję dla każdego z nich",
    reactions: reactionsOptions,
    posts: loginPosts // TYMCZASOWO - te same posty
  }
};

// Zwraca odpowiedni zestaw danych
export const getZad4Content = (mode) => {
  return zad4Content[mode] || zad4Content.registration;
};
