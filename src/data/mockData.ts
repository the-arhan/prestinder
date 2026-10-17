import type { Question, FictionalStudent, FictionalMatch, UserAnswer, MatchScoreResult } from '../types';

export const DEMO_PRIMARY_ID = '51110307042';

export const FICTIONAL_STUDENTS: FictionalStudent[] = [
  { id: '51110307042', name: 'Siddharth Rao', maskedId: '51110307XXX' },
  { id: '51110304918', name: 'Ananya Sen', maskedId: '51110304XXX' },
  { id: '51110302199', name: 'Devansh Malik', maskedId: '51110302XXX' },
  { id: '51110305881', name: 'Maya Kulkarni', maskedId: '51110305XXX' },
  { id: '51110308223', name: 'Rohan Varma', maskedId: '51110308XXX' },
  { id: '51110309144', name: 'Tara Deshmukh', maskedId: '51110309XXX' },
];

export const QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: 'What does your ideal free evening look like?',
    options: [
      'Dinner or snacks with friends',
      'A quiet night with a book',
      'A film or show at home',
      'Going somewhere lively',
      'A spontaneous plan',
      'Making art, music, or something else',
      'A long walk',
      'Exploring a new place',
      'Gaming',
      'Catching up with family',
      'A small gathering',
      'Having time completely to myself',
    ],
  },
  {
    id: 2,
    prompt: 'What kind of music do you reach for most?',
    options: [
      'Pop',
      'Hip-hop',
      'R&B',
      'Indie',
      'Alternative rock',
      'Classic rock',
      'Electronic',
      'Dance',
      'Classical',
      'Jazz',
      'Film or game soundtracks',
      'Regional or folk music',
      'Acoustic or singer-songwriter',
      'Metal or punk',
      'A little of everything',
      'Something else',
    ],
  },
  {
    id: 3,
    prompt: 'What makes a conversation feel great?',
    options: [
      'Deep questions',
      'Silly hypotheticals',
      'Sharing stories',
      'Talking about music',
      'Talking about films or shows',
      'Friendly debate',
      'Learning something new',
      'Making each other laugh',
      'Talking about future plans',
      'Comfortable silence',
      'Unexpected tangents',
      'Something else',
    ],
  },
  {
    id: 4,
    prompt: 'How do you like plans to come together?',
    options: [
      'Planned several days ahead',
      'Planned the day before',
      'A loose plan with room to improvise',
      'A spontaneous “let’s go now”',
      'I like someone else to organize it',
      'I enjoy organizing the plan',
      'A small group plan',
      'A one-on-one plan',
      'It depends on the day',
      'Something else',
    ],
  },
  {
    id: 5,
    prompt: 'What’s your favorite kind of campus break?',
    options: [
      'Coffee or tea',
      'A cold drink',
      'A snack run',
      'A walk outside',
      'Sitting somewhere quiet',
      'Listening to music',
      'A quick game',
      'Talking with friends',
      'Browsing a bookshop or library',
      'Finding a new spot',
      'A short nap',
      'Something else',
    ],
  },
  {
    id: 6,
    prompt: 'What would you be most curious to try?',
    options: [
      'A new hobby',
      'A new food place',
      'A creative project',
      'A sport or physical activity',
      'A student club or event',
      'A day trip',
      'Learning a practical skill',
      'Performing or making music',
      'Volunteering',
      'Cooking something new',
      'A game or competition',
      'Something else',
    ],
  },
  {
    id: 7,
    prompt: 'In a group, what role feels most like you?',
    options: [
      'I start conversations',
      'I keep everyone laughing',
      'I listen and notice things',
      'I organize the plan',
      'I bring different people together',
      'I move between conversations',
      'I contribute when I have something to add',
      'I prefer one-on-one chats',
      'I take a little time to warm up',
      'It changes depending on the group',
      'Something else',
    ],
  },
  {
    id: 8,
    prompt: 'Which fictional place would you visit?',
    options: [
      'A cozy old bookshop',
      'A neon-lit city',
      'A quiet seaside town',
      'A forest cabin',
      'A grand museum',
      'A tiny live-music venue',
      'A night market',
      'A rooftop under the stars',
      'A hidden café',
      'A whimsical train station',
      'A spaceship looking at Earth',
      'Something else',
    ],
  },
  {
    id: 9,
    prompt: 'What kind of humor gets you?',
    options: [
      'Dry and witty',
      'Absurd and chaotic',
      'Warm and goofy',
      'Clever references',
      'Puns',
      'Playful teasing between friends',
      'Unexpected observations',
      'Dark but harmless humor',
      'Physical comedy',
      'A bit of everything',
      'It depends on the person',
      'Something else',
    ],
  },
  {
    id: 10,
    prompt: 'What would you enjoy doing with someone new?',
    options: [
      'Getting food and talking',
      'Walking around campus',
      'Studying together',
      'Watching a film or performance',
      'Trying an activity neither of us knows',
      'Visiting a café',
      'Joining a group hangout',
      'Playing a game',
      'Browsing a market or bookshop',
      'Listening to music together',
      'Exploring a new place',
      'Something else',
    ],
  },
  {
    id: 11,
    prompt: 'What helps a new connection feel easy?',
    options: [
      'Shared interests',
      'Conversation flows naturally',
      'Similar energy',
      'Making each other laugh',
      'Trying new things together',
      'Feeling listened to',
      'No pressure to perform',
      'Being comfortable in silence',
      'Having different perspectives',
      'Kindness and consideration',
      'Mutual curiosity',
      'Something else',
    ],
  },
  {
    id: 12,
    prompt: 'What pace feels comfortable when meeting someone new?',
    options: [
      'A quick hello',
      'A short conversation first',
      'Chatting before meeting',
      'A group hangout',
      'A shared activity',
      'Casual coffee or snack',
      'A casual coffee or snack',
      'Letting it happen naturally',
      'Starting as friends',
      'I prefer to take my time',
      'It depends on the person',
      'Something else',
    ],
  },
];

export const FICTIONAL_CANDIDATES: FictionalMatch[] = [
  {
    id: 'f-101',
    name: 'Kavya M.',
    maskedId: '51110304XXX',
    avatarSeed: 'kavya',
    archetype: 'The Quiet Cartographer',
    tags: ['Acoustic Sets', 'Old Library Spots', 'Night Walks', 'Late Studio Sessions'],
    basePercentage: 94,
    bio: 'Drawn to analog notebooks, tea at odd hours, and people who appreciate unhurried conversations.',
    answers: {
      1: 'A quiet night with a book',
      2: 'Indie',
      3: 'Comfortable silence',
      4: 'A loose plan with room to improvise',
      5: 'Browsing a bookshop or library',
      6: 'A creative project',
      7: 'I listen and notice things',
      8: 'A quiet seaside town',
      9: 'Dry and witty',
      10: 'Walking around campus',
      11: 'No pressure to perform',
      12: 'Starting as friends',
    },
  },
  {
    id: 'f-102',
    name: 'Tanya S.',
    maskedId: '51110302XXX',
    avatarSeed: 'tanya',
    archetype: 'The Orbiting Cinephile',
    tags: ['Film Grain', 'Pop Culture Deep Dives', 'Night Markets', 'Vinyl Hunting'],
    basePercentage: 91,
    bio: 'Will definitely ask your opinion on obscure sci-fi soundtracks and spontaneous snack runs.',
    answers: {
      1: 'A film or show at home',
      2: 'Film or game soundtracks',
      3: 'Unexpected tangents',
      4: 'A spontaneous “let’s go now”',
      5: 'A snack run',
      6: 'A new food place',
      7: 'I keep everyone laughing',
      8: 'A night market',
      9: 'Absurd and chaotic',
      10: 'Getting food and talking',
      11: 'Making each other laugh',
      12: 'A casual coffee or snack',
    },
  },
  {
    id: 'f-103',
    name: 'Arjun K.',
    maskedId: '51110308XXX',
    avatarSeed: 'arjun',
    archetype: 'The Harmonic Strategist',
    tags: ['Synthesizers', 'Campus Architecture', 'Friendly Debates', 'Chess & Strategy'],
    basePercentage: 88,
    bio: 'Balances structured plans with sudden detours into hidden campus courtyards and electronic beats.',
    answers: {
      1: 'Dinner or snacks with friends',
      2: 'Electronic',
      3: 'Friendly debate',
      4: 'Planned several days ahead',
      5: 'Coffee or tea',
      6: 'Learning a practical skill',
      7: 'I organize the plan',
      8: 'A rooftop under the stars',
      9: 'Clever references',
      10: 'Visiting a café',
      11: 'Conversation flows naturally',
      12: 'Chatting before meeting',
    },
  },
  {
    id: 'f-104',
    name: 'Zoya R.',
    maskedId: '51110305XXX',
    avatarSeed: 'zoya',
    archetype: 'The Stargazing Catalyst',
    tags: ['Stargazing', 'Indie Gigs', 'Botanical Walks', 'Curated Playlists'],
    basePercentage: 86,
    bio: 'Believes the best moments happen during unplanned 10 PM walks and warm beverage breaks.',
    answers: {
      1: 'A long walk',
      2: 'Alternative rock',
      3: 'Deep questions',
      4: 'A loose plan with room to improvise',
      5: 'A walk outside',
      6: 'A day trip',
      7: 'I bring different people together',
      8: 'A forest cabin',
      9: 'Warm and goofy',
      10: 'Exploring a new place',
      11: 'Similar energy',
      12: 'Letting it happen naturally',
    },
  },
  {
    id: 'f-105',
    name: 'Nikhil P.',
    maskedId: '51110303XXX',
    avatarSeed: 'nikhil',
    archetype: 'The Ambient Observer',
    tags: ['Jazz Chords', 'Espresso Experiments', 'Museum Halls', 'Spontaneous Doodling'],
    basePercentage: 83,
    bio: 'Enjoys finding quiet corners in bustling places and comparing notes on bizarre hypothetical scenarios.',
    answers: {
      1: 'Making art, music, or something else',
      2: 'Jazz',
      3: 'Silly hypotheticals',
      4: 'A one-on-one plan',
      5: 'Sitting somewhere quiet',
      6: 'Cooking something new',
      7: 'I prefer one-on-one chats',
      8: 'A cozy old bookshop',
      9: 'Dry and witty',
      10: 'Browsing a market or bookshop',
      11: 'Feeling listened to',
      12: 'A short conversation first',
    },
  },
  {
    id: 'f-106',
    name: 'Pooja V.',
    maskedId: '51110309XXX',
    avatarSeed: 'pooja',
    archetype: 'The Neon Wanderer',
    tags: ['Synthwave', 'Street Photography', 'Boba Stops', 'Rooftop Sunsets'],
    basePercentage: 81,
    bio: 'Always has an eclectic track playing and knows every hidden vantage point on campus.',
    answers: {
      1: 'Exploring a new place',
      2: 'Pop',
      3: 'Learning something new',
      4: 'A spontaneous “let’s go now”',
      5: 'Finding a new spot',
      6: 'A new hobby',
      7: 'I start conversations',
      8: 'A neon-lit city',
      9: 'Playful teasing between friends',
      10: 'Trying an activity neither of us knows',
      11: 'Mutual curiosity',
      12: 'A shared activity',
    },
  },
  {
    id: 'f-107',
    name: 'Kabir B.',
    maskedId: '51110301XXX',
    avatarSeed: 'kabir',
    archetype: 'The Curious Storyteller',
    tags: ['Folk Lores', 'Acoustic Guitar', 'Outdoor Cafes', 'Stationery'],
    basePercentage: 79,
    bio: 'Appreciates good typography, acoustic melodies, and unforced conversations without social pressure.',
    answers: {
      1: 'A small gathering',
      2: 'Acoustic or singer-songwriter',
      3: 'Sharing stories',
      4: 'Planned the day before',
      5: 'Listening to music',
      6: 'Volunteering',
      7: 'I contribute when I have something to add',
      8: 'A whimsical train station',
      9: 'Warm and goofy',
      10: 'Listening to music together',
      11: 'Being comfortable in silence',
      12: 'Starting as friends',
    },
  },
];

export const QUESTION_OF_THE_DAY = {
  dayLabel: 'Campus Transmission #42',
  prompt: 'If you could add one whimsical ritual to this campus before midnight, what would it be?',
  hint: 'A playful thought experiment for today’s wavelength wave.',
  sampleAnswers: [
    'A mandatory 10-minute midnight tea silence on the grand lawn.',
    'A mystery vinyl exchange box outside the engineering quad.',
    'Lantern trails leading to secret study benches.',
  ],
};

/**
 * Calculates playful demo match scores between the user answers and fictional profiles.
 * Rotation offset simulates shifting matches across days.
 */
export function calculateDemoMatches(
  userAnswers: UserAnswer[],
  rotationDayOffset: number = 0
): MatchScoreResult[] {
  // Map user answers for fast lookup
  const userMap = new Map<number, string>();
  userAnswers.forEach((ans) => {
    if (!ans.isSkipped) {
      const val = ans.selectedOption || ans.customAnswer;
      if (val && val.trim().length > 0) {
        userMap.set(ans.questionId, val.trim().toLowerCase());
      }
    }
  });

  const validAnswerCount = userMap.size;

  // Clone and rotate candidate array based on day offset
  const count = FICTIONAL_CANDIDATES.length;
  const rotatedCandidates = [...FICTIONAL_CANDIDATES].map((_, idx) => {
    // If rotated, pick a candidate with offset
    const targetIdx = (idx + rotationDayOffset) % count;
    return FICTIONAL_CANDIDATES[targetIdx];
  });

  const results: MatchScoreResult[] = rotatedCandidates.map((candidate, idx) => {
    let exactMatches = 0;
    let categoryOverlap = 0;
    const overlapBreakdown: MatchScoreResult['overlapBreakdown'] = [];
    const sharedReasons: string[] = [];

    QUESTIONS.forEach((q) => {
      const userVal = userMap.get(q.id);
      const matchVal = candidate.answers[q.id];

      if (userVal && matchVal) {
        categoryOverlap++;
        const matchValClean = matchVal.trim().toLowerCase();
        const isExact =
          userVal === matchValClean ||
          userVal.includes(matchValClean) ||
          matchValClean.includes(userVal);

        if (isExact) {
          exactMatches++;
          let resonanceNote = 'Harmonic alignment in response tone';
          if (q.id === 1) resonanceNote = 'Shared evening atmosphere rhythm';
          if (q.id === 2) resonanceNote = 'Acoustic frequencies resonate';
          if (q.id === 3) resonanceNote = 'Conversational dynamic overlap';
          if (q.id === 8) resonanceNote = 'Imagined sanctuary resonance';
          if (q.id === 10) resonanceNote = 'Shared concept of low-friction connection';

          overlapBreakdown.push({
            questionTitle: q.prompt,
            userAnswer: userVal,
            matchAnswer: matchVal,
            resonanceNote,
          });

          if (sharedReasons.length < 3) {
            sharedReasons.push(`Resonant on "${q.prompt.replace(/\?$/, '')}": both gravitate toward "${matchVal}".`);
          }
        } else {
          // Playful partial overlap
          if (overlapBreakdown.length < 4 && (q.id === 4 || q.id === 7 || q.id === 11 || q.id === 12)) {
            overlapBreakdown.push({
              questionTitle: q.prompt,
              userAnswer: userVal,
              matchAnswer: matchVal,
              resonanceNote: 'Complementary conversational pacing',
            });
          }
        }
      }
    });

    // If few exact matches, provide complementary reasons
    if (sharedReasons.length < 2) {
      sharedReasons.push(`Complementary rhythm: ${candidate.archetype} perspective complements your stated pacing.`);
      sharedReasons.push(`Shared social comfort threshold when meeting someone new.`);
    }

    // Playful demo calculation (base percentage + slight bump for exact matches + position modifier)
    // Never 100%, kept in a tasteful 78% - 96% range
    const variableBonus = validAnswerCount > 0 ? (exactMatches / Math.max(1, validAnswerCount)) * 14 : 6;
    const rankDampener = idx * 2.2;
    let computedPercentage = Math.round(candidate.basePercentage + variableBonus - rankDampener);
    computedPercentage = Math.min(97, Math.max(76, computedPercentage));

    return {
      match: candidate,
      percentage: computedPercentage,
      sharedReasons: sharedReasons.slice(0, 3),
      overlapBreakdown,
      evaluatedCategoriesCount: categoryOverlap,
    };
  });

  // Sort by percentage descending and return top 5
  results.sort((a, b) => b.percentage - a.percentage);
  return results.slice(0, 5);
}
