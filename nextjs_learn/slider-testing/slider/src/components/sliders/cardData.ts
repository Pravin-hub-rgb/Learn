export interface CardData {
  id: number
  name: string
  description: string
  src: string
  alt: string
}

export const cardData: CardData[] = [
  {
    id: 1,
    name: "John Doe",
    description: "Creative Designer & UI Expert",
    src: "/images/card1.jpg",
    alt: "Card 1 - John Doe"
  },
  {
    id: 2,
    name: "Jane Smith",
    description: "Frontend Developer & React Specialist",
    src: "/images/card2.jpg",
    alt: "Card 2 - Jane Smith"
  },
  {
    id: 3,
    name: "Alex Johnson",
    description: "Full Stack Developer & DevOps Engineer",
    src: "/images/card3.jpg",
    alt: "Card 3 - Alex Johnson"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    description: "Product Manager & UX Advocate",
    src: "/images/card4.jpg",
    alt: "Card 4 - Sarah Wilson"
  },
  {
    id: 5,
    name: "Mike Brown",
    description: "Mobile Developer & iOS Expert",
    src: "/images/card5.jpg",
    alt: "Card 5 - Mike Brown"
  },
  {
    id: 6,
    name: "Emily Davis",
    description: "Data Scientist & ML Enthusiast",
    src: "/images/card6.jpg",
    alt: "Card 6 - Emily Davis"
  }
]