const registrationProducts = [
  { id: 1, name: 'Kubek ceramiczny', description: 'Klasyczny kubek ceramiczny w intensywnym czerwonym kolorze. Idealny do kawy i herbaty.', price: 43 },
  { id: 2, name: 'Talerz porcelanowy', description: 'Elegancki talerz porcelanowy w klasycznym białym kolorze. Średnica 25 cm.', price: 28 },
  { id: 3, name: 'Szklanka', description: 'Stylowa szklanka w odcieniu zieleni. Pojemność 300ml, idealna do napojów.', price: 22 },
  { id: 4, name: 'Kubek do kawy', description: 'Niebieski kubek ceramiczny z wygodnym uchwytem. Pojemność 350ml.', price: 55 },
  { id: 5, name: 'Zestaw akcesoriów kuchennych', description: 'Kompletny zestaw narzędzi kuchennych z drewnianymi uchwytami. 5 elementów.', price: 89 },
  { id: 6, name: 'Kubek ceramiczny', description: 'Piękny kubek w kobaltowym odcieniu niebieskiego. Doskonały do codziennego użytku.', price: 39 }, // ← PRAWIDŁOWA ODPOWIEDŹ (niebieski, poniżej 50zł)
  { id: 7, name: 'Szklana miska', description: 'Przezroczysta szklana miska o średnicy 20 cm. Idealna do sałatek i owoców.', price: 32 },
  { id: 8, name: 'Kubek termiczny stalowy', description: 'Termos ze stali nierdzewnej z pokrywką. Utrzymuje temperaturę przez 6 godzin.', price: 75 },
  { id: 9, name: 'Filiżanka z podstawką', description: 'Delikatna filiżanka porcelanowa w słonecznym żółtym kolorze z pasującą podstawką.', price: 42 },
  { id: 10, name: 'Drewniana deska do krojenia', description: 'Solidna deska z drewna bambusowego. Wymiary 30x20 cm, naturalne wykończenie.', price: 55 },
  { id: 11, name: 'Miska ceramiczna', description: 'Kolorowa miska w odcieniu fioletu. Pojemność 500ml, idealna do zupy i płatków.', price: 38 },
  { id: 12, name: 'Zestaw silikonowych przyborów', description: 'Kolorowy zestaw 6 silikonowych przyborów kuchennych. Odporny na wysokie temperatury.', price: 65 },
];

export const zad1Content = {
  registration: {
    title: "Zadanie: Znajdź niebieski kubek w cenie poniżej 50 zł",
    storeName: "BioShop",
    products: registrationProducts,
    correctProductId: 6 // Niebieski kubek, 39 zł
  },
  
  login: {
    title: "Zadanie: Znajdź niebieski kubek w cenie poniżej 50 zł",
    storeName: "BioShop",
    products: registrationProducts, // TYMCZASOWO - te same produkty
    correctProductId: 6 // TYMCZASOWO
  }
};


// Zwraca odpowiedni zestaw danych
export const getZad1Content = (mode) => {
  return zad1Content[mode] || zad1Content.registration;
};

 //Sprawdza czy kliknięty produkt jest prawidłowy
export const isCorrectProduct = (mode, productId) => {
  const content = getZad1Content(mode);
  return content.correctProductId === productId;
};
