// src/utils/constants.js

export const LANGUAGE_PAIRS = [
  { 
    id: 'en-es',
    name: 'English + Spanish',
    icon: '🇬🇧🇪🇸',
    demand: 'very-high',
    flag1: '🇬🇧',
    flag2: '🇪🇸',
    languages: ['English', 'Spanish']
  },
  { 
    id: 'en-hi',
    name: 'English + Hindi',
    icon: '🇬🇧🇮🇳',
    demand: 'very-high',
    flag1: '🇬🇧',
    flag2: '🇮🇳',
    languages: ['English', 'Hindi']
  },
  { 
    id: 'en-zh',
    name: 'English + Chinese',
    icon: '🇬🇧🇨🇳',
    demand: 'very-high',
    flag1: '🇬🇧',
    flag2: '🇨🇳',
    languages: ['English', 'Chinese']
  },
  { 
    id: 'en-ar',
    name: 'English + Arabic',
    icon: '🇬🇧🇦🇪',
    demand: 'high',
    flag1: '🇬🇧',
    flag2: '🇦🇪',
    languages: ['English', 'Arabic']
  },
  { 
    id: 'en-ru',
    name: 'English + Russian',
    icon: '🇬🇧🇷🇺',
    demand: 'high',
    flag1: '🇬🇧',
    flag2: '🇷🇺',
    languages: ['English', 'Russian']
  },
  { 
    id: 'en-fr',
    name: 'English + French',
    icon: '🇬🇧🇫🇷',
    demand: 'high',
    flag1: '🇬🇧',
    flag2: '🇫🇷',
    languages: ['English', 'French']
  },
  { 
    id: 'en-pt',
    name: 'English + Portuguese',
    icon: '🇬🇧🇧🇷',
    demand: 'medium',
    flag1: '🇬🇧',
    flag2: '🇧🇷',
    languages: ['English', 'Portuguese']
  },
  { 
    id: 'en-de',
    name: 'English + German',
    icon: '🇬🇧🇩🇪',
    demand: 'medium',
    flag1: '🇬🇧',
    flag2: '🇩🇪',
    languages: ['English', 'German']
  },
  { 
    id: 'en-ja',
    name: 'English + Japanese',
    icon: '🇬🇧🇯🇵',
    demand: 'high',
    flag1: '🇬🇧',
    flag2: '🇯🇵',
    languages: ['English', 'Japanese']
  },
  { 
    id: 'en-ko',
    name: 'English + Korean',
    icon: '🇬🇧🇰🇷',
    demand: 'medium',
    flag1: '🇬🇧',
    flag2: '🇰🇷',
    languages: ['English', 'Korean']
  },
  { 
    id: 'en-only',
    name: 'English Only',
    icon: '🇬🇧',
    demand: 'high',
    flag1: '🇬🇧',
    flag2: null,
    languages: ['English']
  }
];

export const LANGUAGE_LEVELS = [
  { id: 'beginner', name: 'Beginner', description: 'Just starting out' },
  { id: 'elementary', name: 'Elementary', description: 'Basic conversations' },
  { id: 'intermediate', name: 'Intermediate', description: 'Comfortable speaking' },
  { id: 'upper-intermediate', name: 'Upper Intermediate', description: 'Fluent conversations' },
  { id: 'advanced', name: 'Advanced', description: 'Near native level' },
  { id: 'any', name: 'Any Level', description: 'All levels welcome' }
];

export const ROOM_TOPICS = [
  'General Conversation',
  'Travel & Culture',
  'Movies & TV Shows',
  'Music',
  'Food & Cooking',
  'Sports',
  'Technology',
  'Books & Reading',
  'Gaming',
  'Business & Career',
  'Science & Nature',
  'Art & Photography',
  'Daily Life',
  'News & Current Events',
  'Hobbies'
];

export const MAX_PARTICIPANTS_FREE = 10;
export const MAX_PARTICIPANTS_PREMIUM = 50;
export const FREE_MINUTES_PER_DAY = 30;
export const PREMIUM_PRICE = 7.99;