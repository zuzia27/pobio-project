import { Coffee, Laptop, StickyNote, Book, Smartphone, Tablet, Pen, Package, Droplet, Cookie } from 'lucide-react'

const registrationItems = [
  {
    id: 'cup',
    name: 'Kubek',
    icon: 'Coffee',
    iconComponent: Coffee,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600'
  },
  {
    id: 'laptop',
    name: 'Laptop',
    icon: 'Laptop',
    iconComponent: Laptop,
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-600'
  },
  {
    id: 'notes',
    name: 'Karteczki',
    icon: 'StickyNote',
    iconComponent: StickyNote,
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-600'
  },
  {
    id: 'book',
    name: 'Książka',
    icon: 'Book',
    iconComponent: Book,
    bgColor: 'bg-green-100',
    textColor: 'text-green-600'
  },
  {
    id: 'phone',
    name: 'Telefon',
    icon: 'Smartphone',
    iconComponent: Smartphone,
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600'
  },
  {
    id: 'tablet',
    name: 'Tablet',
    icon: 'Tablet',
    iconComponent: Tablet,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600'
  },
  {
    id: 'pen',
    name: 'Długopis',
    icon: 'Pen',
    iconComponent: Pen,
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600'
  },
  {
    id: 'tissues',
    name: 'Chusteczki',
    icon: 'Package',
    iconComponent: Package,
    bgColor: 'bg-green-100',
    textColor: 'text-green-600'
  },
  {
    id: 'handcream',
    name: 'Krem do rąk',
    icon: 'Droplet',
    iconComponent: Droplet,
    bgColor: 'bg-pink-100',
    textColor: 'text-pink-600'
  },
  {
    id: 'snack',
    name: 'Przekąska',
    icon: 'Cookie',
    iconComponent: Cookie,
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-600'
  }
];

export const zad3Content = {
  registration: {
    title: "Zadanie: Ułóż przedmioty na biurku według własnych preferencji",
    description: "(Nie musisz zapamiętywać tego układu - jest to tylko preferencja)",
    items: registrationItems
  },
  
  login: {
    title: "Zadanie: Ułóż przedmioty na biurku według własnych preferencji",
    description: "(Nie musisz zapamiętywać tego układu - jest to tylko preferencja)",
    items: registrationItems 
  }
};

// Zwraca odpowiedni zestaw danych
export const getZad3Content = (mode) => {
  return zad3Content[mode] || zad3Content.registration;
};
