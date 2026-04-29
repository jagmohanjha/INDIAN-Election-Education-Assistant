import type { UserData, EligibilityResult, TimelineEvent, FAQItem } from '../types/index';

// Eligibility Logic
export const checkEligibility = (userData: UserData): EligibilityResult => {
  const { age, citizenship } = userData;

  // Check age
  if (age < 18) {
    return {
      isEligible: false,
      reason: `You are currently ${age} years old. Indian election law requires voters to be at least 18 years old.`,
      nextSteps: [
        `Come back in ${18 - age} year(s) when you turn 18`,
        'Keep your documents ready (Aadhaar, PAN, etc.) for future registration',
        'Follow election updates to stay informed',
      ],
    };
  }

  // Check citizenship
  if (citizenship !== 'Indian') {
    return {
      isEligible: false,
      reason: 'Only Indian citizens are eligible to vote in Indian elections.',
      nextSteps: ['Check your citizenship status', 'Contact local election office for guidance'],
    };
  }

  // Eligible
  return {
    isEligible: true,
    reason: 'Congratulations! You meet the eligibility criteria to vote in Indian elections.',
    nextSteps: [
      'Register as a voter (if not already registered)',
      'Obtain your Voter ID card',
      'Know your polling booth location',
      'Vote on the scheduled election date',
    ],
  };
};

// Election Timeline
export const getElectionTimeline = (): TimelineEvent[] => [
  {
    phase: 'Voter Registration',
    description: 'Register as a voter through your local election office or online',
    date: 'Ongoing',
    status: 'ongoing',
  },
  {
    phase: 'Voter List Publication',
    description: 'Final voter rolls are published and made available for public review',
    date: 'Varies by election',
    status: 'upcoming',
  },
  {
    phase: 'Nominations',
    description: 'Candidates file their nominations for respective constituencies',
    date: 'Varies by election',
    status: 'upcoming',
  },
  {
    phase: 'Campaign Period',
    description: 'Political campaigns and rallies take place',
    date: 'Varies by election',
    status: 'upcoming',
  },
  {
    phase: 'Polling Day',
    description: 'Voting takes place across constituencies. Check your polling booth location!',
    date: 'Announced by Election Commission',
    status: 'upcoming',
  },
  {
    phase: 'Counting Day',
    description: 'Votes are counted and results are announced',
    date: 'Few days after polling',
    status: 'upcoming',
  },
];

// FAQ Data
export const getFAQs = (): FAQItem[] => [
  {
    category: 'Voter Registration',
    question: 'How do I register as a voter?',
    answer:
      'You can register online at www.eci.gov.in or visit your local election office with proof of age and citizenship. The online process is quick and convenient!',
  },
  {
    category: 'Voter Registration',
    question: 'What documents are required for voter registration?',
    answer:
      'You need proof of age (birth certificate, 10th mark sheet, passport) and proof of citizenship (Aadhaar, PAN, passport). Original or copy can be submitted.',
  },
  {
    category: 'Voting Process',
    question: 'What is EVM? How does it work?',
    answer:
      'EVM stands for Electronic Voting Machine. You press the button next to your chosen candidate to cast your vote. It\'s secure, fast, and accurate. The machine records your vote electronically.',
  },
  {
    category: 'Voting Process',
    question: 'What is NOTA?',
    answer:
      'NOTA stands for "None of the Above". It\'s your right to vote for NOTA if you don\'t want to support any candidate. NOTA button is available on every EVM.',
  },
  {
    category: 'Voting Process',
    question: 'What is a Voter ID?',
    answer:
      'A Voter ID (EPIC - Electoral Photo Identity Card) is an official identity document issued by the election commission. It helps during voting and contains your voter information.',
  },
  {
    category: 'Voting Process',
    question: 'How do I find my polling booth?',
    answer:
      'Visit the Election Commission website, enter your details, and find your polling booth. You can also visit your local election office or check the voter list displayed in your area.',
  },
  {
    category: 'Rights & Responsibilities',
    question: 'Can I vote if I\'m out of station on polling day?',
    answer:
      'Yes! You can apply for postal ballot or vote through absentee voting if you\'re away. Apply at your local election office at least 5-7 days before polling.',
  },
  {
    category: 'General',
    question: 'What is the voting age in India?',
    answer: 'The minimum voting age is 18 years. If you\'re 18 or above and an Indian citizen, you\'re eligible to vote.',
  },
  {
    category: 'General',
    question: 'Is voting mandatory in India?',
    answer:
      'Voting is a right, not a legal obligation in India. However, it\'s your civic duty to participate in democracy. Every vote counts!',
  },
  {
    category: 'General',
    question: 'Can I vote if I have a criminal record?',
    answer:
      'Those convicted of certain crimes or those unsound in mind are disqualified from voting. Check with your election office for specific details.',
  },
];

// Quiz Questions
export const getQuizQuestions = () => [
  {
    id: 1,
    question: 'What is the minimum age to vote in India?',
    options: ['16 years', '18 years', '21 years', '25 years'],
    correctAnswer: 1,
    explanation: 'Indian citizens aged 18 and above are eligible to vote.',
  },
  {
    id: 2,
    question: 'What does EVM stand for?',
    options: ['Electronic Voting Machine', 'Election Vote Mechanism', 'Electronic Vote Module', 'Easy Vote Method'],
    correctAnswer: 0,
    explanation: 'EVM is the Electronic Voting Machine used in Indian elections for secure and accurate voting.',
  },
  {
    id: 3,
    question: 'What does NOTA mean?',
    options: ['Note of Action', 'None of the Above', 'National Organization of Trades', 'Not on the Agenda'],
    correctAnswer: 1,
    explanation: 'NOTA (None of the Above) allows voters to reject all candidates if they wish.',
  },
  {
    id: 4,
    question: 'Who conducts elections in India?',
    options: ['Supreme Court', 'State Governments', 'Election Commission of India', 'Parliament'],
    correctAnswer: 2,
    explanation:
      'The Election Commission of India is an independent constitutional authority responsible for conducting elections.',
  },
  {
    id: 5,
    question: 'Can non-citizens vote in Indian elections?',
    options: ['Yes, always', 'Only if married to an Indian', 'No, only Indian citizens can vote', 'Yes, if they own property'],
    correctAnswer: 2,
    explanation: 'Only Indian citizens are eligible to vote in Indian elections.',
  },
  {
    id: 6,
    question: 'What is a Voter ID also called?',
    options: ['Election Card', 'EPIC (Electoral Photo Identity Card)', 'Voting Certificate', 'Citizen Card'],
    correctAnswer: 1,
    explanation: 'Voter ID is officially called EPIC - Electoral Photo Identity Card.',
  },
  {
    id: 7,
    question: 'Can you vote if you are out of town on polling day?',
    options: ['No, never', 'Yes, through postal ballot', 'Only if you file a complaint', 'No, you must be present'],
    correctAnswer: 1,
    explanation:
      'You can apply for postal ballot or absentee voting if you\'re away on polling day. Apply a few days before.',
  },
  {
    id: 8,
    question: 'How many phases can Indian elections have?',
    options: ['Always 1 phase', '1-7 phases depending on the election', 'Always 3 phases', '2-4 phases maximum'],
    correctAnswer: 1,
    explanation:
      'Elections can be conducted in multiple phases (1-7) depending on the election type and organizational capacity.',
  },
];

// Registration Steps
export const getRegistrationSteps = () => [
  {
    step: 1,
    title: 'Gather Required Documents',
    details: 'Collect proof of age (birth certificate, 10th mark sheet) and proof of citizenship (Aadhaar, passport).',
  },
  {
    step: 2,
    title: 'Visit Election Commission Website or Local Office',
    details: 'Go to www.eci.gov.in or visit your local election office.',
  },
  {
    step: 3,
    title: 'Fill Registration Form',
    details: 'Complete Form 6 (for new registrations) with your details.',
  },
  {
    step: 4,
    title: 'Submit Documents',
    details: 'Submit original documents along with the form at the election office.',
  },
  {
    step: 5,
    title: 'Wait for Verification',
    details: 'Your application will be verified, usually within 7-10 days.',
  },
  {
    step: 6,
    title: 'Receive Voter ID',
    details: 'Once approved, collect your Voter ID card from the election office.',
  },
];

// Voting Steps
export const getVotingSteps = () => [
  {
    step: 1,
    title: 'Find Your Polling Booth',
    details: 'Check the election website or visit your local office to find your assigned polling booth.',
  },
  {
    step: 2,
    title: 'Arrive Early on Polling Day',
    details: 'Polling booths are usually open from 7 AM to 6 PM. Arrive early to avoid long queues.',
  },
  {
    step: 3,
    title: 'Bring Voter ID or Valid ID',
    details: 'Bring your Voter ID, Aadhaar, Passport, or any government-issued ID for verification.',
  },
  {
    step: 4,
    title: 'Get Your Name Verified',
    details: 'Election officials will verify your name and address from the voter list.',
  },
  {
    step: 5,
    title: 'Receive Voting Instructions',
    details: 'Officials will explain how to use the EVM and show you to the voting booth.',
  },
  {
    step: 6,
    title: 'Cast Your Vote',
    details: 'Press the button next to your preferred candidate. You can also press NOTA if you wish.',
  },
  {
    step: 7,
    title: 'Get Voter Slip',
    details: 'Receive your voter slip as proof of voting.',
  },
];
