// const pollDatas = [
//     {
//         id: 1,
//         optionsType:"multiple",
//         question: "What is your preferred work environment?",
//         options: [
//           { id: 'A', text: 'In a large, crowded office.' },
//           { id: 'B', text: 'In a quiet workspace' },
//           { id: 'C', text: 'Virtually with a team' }
//         ],
//         results: { A: 0, B: 0, C: 0 }
//       },
//       {
//           id: 2,
//           optionsType:"multiple",
//           question: "What do you look for in a job?",
//           options: [
//             { id: 'A', text: ' Good pay.' },
//             { id: 'B', text: 'strong mission.' },
//             { id: 'C', text: 'Opportunities for growth' }
//           ],
//           results: { A: 0, B: 0, C: 0 }
//         },
//         {
//           id: 3,
//           optionsType:"single",
//           question: " What do you want to achieve in your career?",
//           options: [
//             { id: 'A', text: 'Be the best at what I do.' },
//             { id: 'B', text: 'Grow in my career' },
//             { id: 'C', text: 'Get promoted' },
//             { id: 'D', text: 'Others' }
//           ],
//           results: { A: 0, B: 0, C: 0, D:0 }
//         },
//         {
//           id: 4,
//           optionsType:"single",
//           question: " What do you want to achieve in your career?",
//           options: [
//             { id: 'A', text: 'Be the best at what I do.' },
//             { id: 'B', text: 'Grow in my career' },
//             { id: 'C', text: 'Get promoted' },
//             { id: 'D', text: 'Others' }
//           ],
//           results: { A: 0, B: 0, C: 0, D:0 }
//         }
// ]

// export default pollDatas

const pollDatas = [
  {
    id: 1,
    optionsType: "single",
    question: "Which Hadith book do you refer to the most?",
    options: [
      { id: "A", text: "Sahih Bukhari" },
      { id: "B", text: "Sahih Muslim" },
      { id: "C", text: "Sunan Abu Dawood" },
      { id: "D", text: "Others" }
    ],
    results: { A: 1, B: 0, C: 0, D: 0 }
  },

  {
    id: 2,
    optionsType: "multiple",
    question: "Why do you study Hadith?",
    options: [
      { id: "A", text: "To understand Sunnah" },
      { id: "B", text: "To improve daily life" },
      { id: "C", text: "For Islamic knowledge" },
      { id: "D", text: "For teaching others" }
    ],
    results: { A: 0, B: 0, C: 1, D: 1 }
  },

  {
    id: 3,
    optionsType: "single",
    question: "Which topic of Hadith interests you the most?",
    options: [
      { id: "A", text: "Akhlaq (Character)" },
      { id: "B", text: "Ibadah (Worship)" },
      { id: "C", text: "Aqaid (Beliefs)" },
      { id: "D", text: "Seerah (Prophetic biography)" }
    ],
    results: { A: 1, B: 0, C: 0, D: 0 }
  },

  {
    id: 4,
    optionsType: "multiple",
    question: "How often do you read or listen to Hadith?",
    options: [
      { id: "A", text: "Daily" },
      { id: "B", text: "Weekly" },
      { id: "C", text: "Monthly" },
      { id: "D", text: "Rarely" }
    ],
    results: { A: 0, B: 0, C: 1, D: 1 }
  },

  {
    id: 5,
    optionsType: "single",
    question: "Which Hadith narrator do you recognize the most?",
    options: [
      { id: "A", text: "Abu Hurairah (RA)" },
      { id: "B", text: "Aisha (RA)" },
      { id: "C", text: "Ibn Abbas (RA)" },
      { id: "D", text: "Anas ibn Malik (RA)" }
    ],
    results: { A: 1, B: 0, C: 0, D: 0 }
  },

  {
    id: 6,
    optionsType: "single",
    question: "Do you prefer reading Hadith with explanation (Sharh)?",
    options: [
      { id: "A", text: "Yes" },
      { id: "B", text: "No" },
      { id: "C", text: "Sometimes" },
      { id: "D", text: "Only when needed" }
    ],
    results: { A: 0, B: 1, C: 0, D: 0 }
  },

  {
    id: 7,
    optionsType: "multiple",
    question: "Where do you usually learn Hadith from?",
    options: [
      { id: "A", text: "Books" },
      { id: "B", text: "YouTube lectures" },
      { id: "C", text: "Masjid classes" },
      { id: "D", text: "Social media posts" }
    ],
    results: { A: 0, B: 0, C: 1, D: 1 }
  },

  {
    id: 8,
    optionsType: "single",
    question: "Do you verify the authenticity of Hadith you read online?",
    options: [
      { id: "A", text: "Always" },
      { id: "B", text: "Sometimes" },
      { id: "C", text: "Rarely" },
      { id: "D", text: "Never" }
    ],
    results: { A: 0, B: 0, C: 0, D: 1 }
  },

  {
    id: 9,
    optionsType: "single",
    question: "Which type of Hadith do you find most beneficial?",
    options: [
      { id: "A", text: "Hadith on manners" },
      { id: "B", text: "Hadith on prayer" },
      { id: "C", text: "Hadith on charity" },
      { id: "D", text: "Hadith on daily life" }
    ],
    results: { A: 0, B: 0, C: 0, D: 1 }
  },

  {
    id: 10,
    optionsType: "multiple",
    question: "Which Hadith themes do you want to learn more about?",
    options: [
      { id: "A", text: "Family & relationships" },
      { id: "B", text: "Earning & spending" },
      { id: "C", text: "Character improvement" },
      { id: "D", text: "Dua & spirituality" }
    ],
    results: { A: 0, B: 1, C: 0, D: 1 }
  }
];

export default pollDatas;
