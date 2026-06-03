/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scenario } from '../types/simulation';

// Monday Scenario Pool (Day 0)
export const mondayScenarios: Scenario[] = [
  {
    dayIndex: 0,
    dayName: 'Monday',
    location: 'F BUILDING',
    title: 'The Exam Warning',
    description: 'Your professor announces a quiz tomorrow. You still have assignments and you are already tired. What will you do?',
    choices: [
      {
        id: 'mon_1_a',
        text: 'Study early for 1 hour',
        effects: { grades: 15, focus: 10, energy: -10, stress: -5 },
        feedback: 'You prepared before panic could take over. Your grades and focus improved, and your stress became easier to control.'
      },
      {
        id: 'mon_1_b',
        text: 'Scroll social media first',
        effects: { energy: 5, focus: -15, grades: -10, stress: 10 },
        feedback: 'You felt relaxed for a moment, but the unfinished work stayed in your mind. Your focus dropped and stress increased.'
      },
      {
        id: 'mon_1_c',
        text: 'Sleep early and study tomorrow',
        effects: { energy: 20, stress: -10, grades: 5 },
        feedback: 'You protected your energy. You may not be fully prepared yet, but your mind feels clearer for tomorrow.'
      },
      {
        id: 'mon_1_d',
        text: 'Ask a classmate for notes',
        effects: { social: 10, grades: 10, stress: -5 },
        feedback: 'You used your network wisely. A classmate helped you catch up and the pressure became lighter.'
      },
      {
        id: 'mon_1_e',
        text: 'Cram at midnight',
        effects: { grades: 10, energy: -25, stress: 20, focus: -10 },
        feedback: 'You learned something, but your body paid the price. The late-night pressure increased your stress and weakened your focus.'
      }
    ]
  },
  {
    dayIndex: 0,
    dayName: 'Monday',
    location: 'STUDY LOUNGE',
    title: 'The Dorm Lockout Crisis',
    description: 'You forgot your room keys at the public study lounge but your first graded lecture starts in 10 minutes. If you spend time retrieving them, you will be late. What will you do?',
    choices: [
      {
        id: 'mon_2_a',
        text: 'Rush back to the lounge to find the keys',
        effects: { grades: -5, stress: 15, energy: -15, focus: 5 },
        feedback: 'You retrieved your keys safely, but arrived late and flustered to the lecture.'
      },
      {
        id: 'mon_2_b',
        text: 'Attend class first and deal with the lockout afterwards',
        effects: { grades: 15, stress: 20, focus: -5 },
        feedback: 'You took the lecture notes, but the constant anxiety about your missing keys made it hard to concentrate.'
      },
      {
        id: 'mon_2_c',
        text: 'Pay the reception desk for an auxiliary card swipe',
        effects: { money: -15, stress: -10, focus: 10 },
        feedback: 'You took care of the situation instantly. You are broke but fully focused for class!'
      },
      {
        id: 'mon_2_d',
        text: 'Ask a nearby dorm mate to search for your keys',
        effects: { social: 15, stress: -5, grades: 5 },
        feedback: 'Your peer network came to the rescue! They found the keys, letting you sit in class with a peaceful mind.'
      },
      {
        id: 'mon_2_e',
        text: 'Skip class entirely to search and then rest',
        effects: { grades: -20, energy: 15, stress: -10 },
        feedback: 'You secured your physical keys, but missed critical points for the weekly grade.'
      }
    ]
  },
  {
    dayIndex: 0,
    dayName: 'Monday',
    location: 'COMPUTER LAB',
    title: 'The Laptop Breakdown',
    description: 'Your laptop screen suddenly goes pitch black right before your critical Monday afternoon lab exercise. What will you do?',
    choices: [
      {
        id: 'mon_3_a',
        text: 'Partner up and share a screen with a classmate',
        effects: { social: 15, focus: -5, grades: 10 },
        feedback: 'You cooperated gracefully, completing the lab while bonding with your lab partner.'
      },
      {
        id: 'mon_3_b',
        text: 'Spend the session attempting to repair it yourself',
        effects: { focus: 15, energy: -15, stress: 15 },
        feedback: 'You learned some tech debugging tips, but got high stress levels from the ticking clock.'
      },
      {
        id: 'mon_3_c',
        text: 'Hurry to the campus library to borrow a loaner laptop',
        effects: { energy: -20, money: -5, grades: 15 },
        feedback: 'You ran hard and paid a small security deposit, but you got a working machine.'
      },
      {
        id: 'mon_3_d',
        text: 'Submit the lab with a late penalty and rest',
        effects: { grades: -10, energy: 20, stress: -15 },
        feedback: 'You chose peace of mind over instant submission. Your energy is fully charged.'
      },
      {
        id: 'mon_3_e',
        text: 'Take it to an express computer service shop',
        effects: { money: -25, stress: -10, grades: 10 },
        feedback: 'A professional technician sorted it out. Expensive but efficient!'
      }
    ]
  }
];

// Tuesday Scenario Pool (Day 1)
export const tuesdayScenarios: Scenario[] = [
  {
    dayIndex: 1,
    dayName: 'Tuesday',
    location: 'C BUILDING',
    title: 'Allowance Problem',
    description: 'You only have limited allowance left. You need food, but you also need to save money for the rest of the week. What will you do?',
    choices: [
      {
        id: 'tue_1_a',
        text: 'Buy expensive gourmet food',
        effects: { energy: 20, money: -25 },
        feedback: 'You felt satisfied and energized, but your budget took a heavy hit.'
      },
      {
        id: 'tue_1_b',
        text: 'Buy affordable cafeteria food',
        effects: { energy: 10, money: -10 },
        feedback: 'You made a practical choice. You gained enough energy without damaging your budget too much.'
      },
      {
        id: 'tue_1_c',
        text: 'Skip eating to save money',
        effects: { energy: -25, focus: -15, stress: 10 },
        feedback: 'You saved money, but your body and focus suffered. Skipping meals made the day harder.'
      },
      {
        id: 'tue_1_d',
        text: 'Borrow money from a friend',
        effects: { money: 20, social: -10, stress: 5 },
        feedback: 'You solved the money problem for now, but depending on others added a little social pressure.'
      },
      {
        id: 'tue_1_e',
        text: 'Prepare packed food at home',
        effects: { energy: 15, money: -5, focus: 5 },
        feedback: 'You planned ahead. You stayed energized, saved money, and improved your focus.'
      }
    ]
  },
  {
    dayIndex: 1,
    dayName: 'Tuesday',
    location: 'CAMPUS PLAZA',
    title: 'The Organization Recruit Trials',
    description: 'The elite student society is conducting their physical recruitment trial today. It takes hours of heavy effort with no pay, but it provides ultimate networking. What will you do?',
    choices: [
      {
        id: 'tue_2_a',
        text: 'Walk away to focus entirely on self-study',
        effects: { grades: 15, focus: 15, social: -10 },
        feedback: 'You put your head down. Your grades will reflect this academic discipline.'
      },
      {
        id: 'tue_2_b',
        text: 'Push through the intense physically-draining trial',
        effects: { energy: -30, social: 25, stress: 15 },
        feedback: 'You are exhausted and sore, but recruiters were highly impressed by your stamina!'
      },
      {
        id: 'tue_2_c',
        text: 'Treat the organizers to coffee to skip the trial',
        effects: { money: -15, social: 15, energy: -5 },
        feedback: 'You used clever social mechanics to bypass the grunt work while making connections.'
      },
      {
        id: 'tue_2_d',
        text: 'Apply for a low-cost online-only position',
        effects: { social: 10, stress: -5, energy: 5 },
        feedback: 'A highly balanced option. You joined the roster without pushing your biological limits.'
      },
      {
        id: 'tue_2_e',
        text: 'Sleep through the recruitment session',
        effects: { energy: 25, stress: -15, social: -15 },
        feedback: 'Pure hibernation. You got total physical recovery but missed out on high-impact peers.'
      }
    ]
  },
  {
    dayIndex: 1,
    dayName: 'Tuesday',
    location: 'RETAIL CENTER',
    title: 'The Flash Sale Trap',
    description: 'Your favorite student accessory shop is conducting a 50% flash sale today only. The premium backpack you want costs 60% of your remaining weekly cash. What will you do?',
    choices: [
      {
        id: 'tue_3_a',
        text: 'Buy it instantly! You only live once',
        effects: { money: -30, stress: -15, energy: 10 },
        feedback: 'You look extremely stylish now, but your lunch budget is dangerously thin!'
      },
      {
        id: 'tue_3_b',
        text: 'Resist the purchase and leave empty-handed',
        effects: { money: 10, focus: 15, stress: 5 },
        feedback: 'You saved your funds. The initial regret fades as you feel the power of financial security.'
      },
      {
        id: 'tue_3_c',
        text: 'Call a parent to request emergency funding',
        effects: { money: 20, social: -10, stress: 10 },
        feedback: 'They wired the emergency cash, but with a lengthy, tiring lecture about financial stability.'
      },
      {
        id: 'tue_3_d',
        text: 'Do rapid peer tutoring to earn the buying cost',
        effects: { money: 15, energy: -20, grades: -5 },
        feedback: 'You worked hard to earn your treat, sacrificing your own study time to tutor peers.'
      },
      {
        id: 'tue_3_e',
        text: 'Purchase a cheap item to settle the shopping urge',
        effects: { money: -10, energy: 5, stress: -5 },
        feedback: 'A small compromises satisfies your mind without blowing up your entire banking balance.'
      }
    ]
  }
];

// Wednesday Scenario Pool (Day 2)
export const wednesdayScenarios: Scenario[] = [
  {
    dayIndex: 2,
    dayName: 'Wednesday',
    location: 'E BUILDING',
    title: 'Group Project Conflict',
    description: 'Your group project is due soon, but some groupmates are not replying. What will you do?',
    choices: [
      {
        id: 'wed_1_a',
        text: 'Do everything alone',
        effects: { grades: 15, stress: 25, energy: -20, social: -15 },
        feedback: 'You protected the project, but you carried too much alone. Your stress increased and your connection with the group weakened.'
      },
      {
        id: 'wed_1_b',
        text: 'Ignore the project',
        effects: { grades: -25, stress: 15 },
        feedback: 'Avoiding the problem made it worse. The deadline moved closer and your academic standing dropped.'
      },
      {
        id: 'wed_1_c',
        text: 'Message the group respectfully',
        effects: { social: 15, stress: -5, grades: 10 },
        feedback: 'You communicated clearly without attacking anyone. The group became easier to manage.'
      },
      {
        id: 'wed_1_d',
        text: 'Report immediately to professor',
        effects: { grades: 5, social: -20, stress: 5 },
        feedback: 'You protected yourself, but the group relationship became tense.'
      },
      {
        id: 'wed_1_e',
        text: 'Create a task plan and assign roles',
        effects: { grades: 20, social: 10, focus: 10, stress: -5 },
        feedback: 'You turned confusion into structure. The group had direction, and your performance improved.'
      }
    ]
  },
  {
    dayIndex: 2,
    dayName: 'Wednesday',
    location: 'CONFERENCE ROOM',
    title: 'The Presentation Panic',
    description: 'You have been selected to present your team\'s progress to the strict academic dean tomorrow morning. You suffer from intense public speaking anxiety. What will you do?',
    choices: [
      {
        id: 'wed_2_a',
        text: 'Pull an all-nighter practicing your speech repeatedly',
        effects: { grades: 20, energy: -25, stress: 20, focus: -5 },
        feedback: 'Your slides were well synchronized, but you had noticeable eye bags and fatigue.'
      },
      {
        id: 'wed_2_b',
        text: 'Delegate the presentation to a charismatic peer',
        effects: { social: 15, stress: -15, grades: 5 },
        feedback: 'Your team-mate rocked the stage. You skipped the fear but passed on the direct spotlight.'
      },
      {
        id: 'wed_2_c',
        text: 'Spend the evening compiling meticulous, clear lecture notes',
        effects: { focus: 20, stress: -10, grades: 15 },
        feedback: 'Writing clear notes structured your thoughts. You felt confident and grounded.'
      },
      {
        id: 'wed_2_d',
        text: 'Take a double shot of energy drinks and "wing" it',
        effects: { energy: 10, stress: 25, focus: -15 },
        feedback: 'Your delivery was erratic and fast-paced. Your heart rate is high!'
      },
      {
        id: 'wed_2_e',
        text: 'Skip the seminar by requesting sick leave',
        effects: { grades: -20, social: -15, stress: -10 },
        feedback: 'A completely stress-free day, at the expense of team confidence and academic reputation.'
      }
    ]
  },
  {
    dayIndex: 2,
    dayName: 'Wednesday',
    location: 'COLLEGE LIBRARY',
    title: 'The Mid-Week Pileup',
    description: 'You have a physics lab report, a math worksheet, and an English essay all due at midnight. None are complete. What will you do?',
    choices: [
      {
        id: 'wed_3_a',
        text: 'Focus fully on completing the heavy-grade essay',
        effects: { grades: 15, focus: 10, stress: 10 },
        feedback: 'Your essay was high quality, but you took zeros on the smaller quizzes.'
      },
      {
        id: 'wed_3_b',
        text: 'Split your focus evenly but turn in mediocre rushed answers',
        effects: { grades: 5, energy: -15, stress: 5 },
        feedback: 'Everything was submitted on time, but the average quality resulted in average grades.'
      },
      {
        id: 'wed_3_c',
        text: 'Hire an elder student to assist you with critical parts',
        effects: { money: -25, grades: 15, social: 5 },
        feedback: 'Your budget is crying, but expert assistance got you high marks across all sheets.'
      },
      {
        id: 'wed_3_d',
        text: 'Nicely email the professor begging for a deadline extension',
        effects: { social: 10, stress: -10, focus: 5 },
        feedback: 'The professor appreciated your honesty and gave you an extra 24 hours.'
      },
      {
        id: 'wed_3_e',
        text: 'Stay awake all night on black coffee until all papers are sent',
        effects: { energy: -30, stress: 25, grades: 15 },
        feedback: 'A brutal survival effort. Everything is done but you are completely brain-fried.'
      }
    ]
  }
];

// Thursday Scenario Pool (Day 3)
export const thursdayScenarios: Scenario[] = [
  {
    dayIndex: 3,
    dayName: 'Thursday',
    location: 'V BUILDING',
    title: 'Burnout Warning',
    description: 'You feel tired, stressed, and overwhelmed. You still have schoolwork, but your body needs rest. What will you do?',
    choices: [
      {
        id: 'thu_1_a',
        text: 'Keep working without rest',
        effects: { grades: 10, energy: -30, stress: 25 },
        feedback: 'You pushed forward, but the pressure damaged your energy. Productivity without rest became risky.'
      },
      {
        id: 'thu_1_b',
        text: 'Take a short break',
        effects: { energy: 15, stress: -15, focus: 10 },
        feedback: 'You paused before breaking down. The short rest helped your mind recover.'
      },
      {
        id: 'thu_1_c',
        text: 'Sleep for a long time',
        effects: { energy: 30, stress: -20, grades: -5 },
        feedback: 'You recovered a lot of energy, but some schoolwork was delayed.'
      },
      {
        id: 'thu_1_d',
        text: 'Talk to a trusted friend',
        effects: { social: 15, stress: -15 },
        feedback: 'You shared the pressure instead of carrying it alone. Your stress became lighter.'
      },
      {
        id: 'thu_1_e',
        text: 'Plan your remaining tasks',
        effects: { focus: 20, stress: -10, grades: 10 },
        feedback: 'You turned mental chaos into a clear plan. Your focus and grades improved.'
      }
    ]
  },
  {
    dayIndex: 3,
    dayName: 'Thursday',
    location: 'INFRASTRUCTURE GATE',
    title: 'The Misplaced Gate-Pass',
    description: 'You lost your official student gatepass badge on your way in. Security is denying entry to the main university library. What will you do?',
    choices: [
      {
        id: 'thu_2_a',
        text: 'Plead politely with the security guard on duty',
        effects: { social: 10, stress: 10, focus: -5 },
        feedback: 'You talked your way inside! Your interpersonal skills saved you a major delay.'
      },
      {
        id: 'thu_2_b',
        text: 'Walk to the remote Admin block to pay for a replacement pass',
        effects: { money: -20, focus: 10, stress: -15 },
        feedback: 'An expensive solution, but you walked away with a clean, fully validated ID badge.'
      },
      {
        id: 'thu_2_c',
        text: 'Walk your route backwards in detail to search the pathways',
        effects: { energy: -20, stress: 15, focus: -10 },
        feedback: 'You walked an extra mile. You never found the pass and your feet are aching.'
      },
      {
        id: 'thu_2_d',
        text: 'Slip inside following a large group of chatting students',
        effects: { grades: 10, stress: 25, social: -5 },
        feedback: 'You sneaked in successfully! You made your review class but your heart was beating fast.'
      },
      {
        id: 'thu_2_e',
        text: 'Head home to skip study sessions entirely',
        effects: { grades: -20, stress: -5, focus: 5 },
        feedback: 'You avoided the issue. A relaxed afternoon at home, but your study progress stalled.'
      }
    ]
  },
  {
    dayIndex: 3,
    dayName: 'Thursday',
    location: 'OFF-CAMPUS CAFE',
    title: 'The Barista Opportunity',
    description: 'A friendly cafe manager is offering you an active 5-hour shift as a relief barista for high cash pay, right during your exam preps. What will you do?',
    choices: [
      {
        id: 'thu_3_a',
        text: 'Reject the offer to remain in the quiet study cubicle',
        effects: { grades: 15, focus: 15, money: -5 },
        feedback: 'You sacrificed short-term cash flow to build a strong midterm outcome.'
      },
      {
        id: 'thu_3_b',
        text: 'Take the barista shift to boost your wallet',
        effects: { money: 30, energy: -20, grades: -10 },
        feedback: 'You made easy dollars! But your arms are heavy and you missed the revision lecture.'
      },
      {
        id: 'thu_3_c',
        text: 'Refer a hardup classmate to the manager instead',
        effects: { social: 20, money: 5 },
        feedback: 'A beautiful social victory. Your friend is deeply grateful and split some fee with you.'
      },
      {
        id: 'thu_3_d',
        text: 'Attempt to work the register while reading study notes',
        effects: { grades: -5, money: 20, energy: -15, focus: -15 },
        feedback: 'You accomplished neither task well. You burned coffee and almost failed your practice quiz!'
      },
      {
        id: 'thu_3_e',
        text: 'Accept but cut class/lectures to fit the shift',
        effects: { money: 30, grades: -20, energy: -10, social: -5 },
        feedback: 'You took the money, but your professor marked you absent from a crucial preparation lab.'
      }
    ]
  }
];

// Friday Scenario Pool (Day 4)
export const fridayScenarios: Scenario[] = [
  {
    dayIndex: 4,
    dayName: 'Friday',
    location: 'AMPHI THEATRE',
    title: 'Final Challenge',
    description: 'It is the final day. You have a quiz, a project deadline, and personal fatigue. Your final choice determines how your week ends. What will you do?',
    choices: [
      {
        id: 'fri_1_a',
        text: 'Prioritize the most urgent task',
        effects: { focus: 20, grades: 15, stress: -5 },
        feedback: 'You focused on what mattered most. Your decision helped you move with control instead of panic.'
      },
      {
        id: 'fri_1_b',
        text: 'Try to finish everything at once',
        effects: { grades: 10, stress: 25, energy: -25 },
        feedback: 'You tried to handle everything, but your energy dropped hard and the pressure rose.'
      },
      {
        id: 'fri_1_c',
        text: 'Ask for help and divide tasks',
        effects: { social: 15, grades: 15, stress: -10 },
        feedback: 'You used teamwork instead of forcing everything alone. The load became lighter and results improved.'
      },
      {
        id: 'fri_1_d',
        text: 'Give up because it is too much',
        effects: { stress: -5, grades: -30, focus: -20 },
        feedback: 'You escaped the pressure for a moment, but the unfinished responsibilities damaged your outcome.'
      },
      {
        id: 'fri_1_e',
        text: 'Organize your day hour by hour',
        effects: { focus: 25, grades: 20, energy: -10, stress: -10 },
        feedback: 'You gave the day structure. Your focus improved, your grades increased, and stress became easier to handle.'
      }
    ]
  },
  {
    dayIndex: 4,
    dayName: 'Friday',
    location: 'INNOVATION HUB',
    title: 'The Dream Job Interview',
    description: 'A major dream tech company invites you to an introductory interview today. However, it clashes with your Friday group presentation. What will you do?',
    choices: [
      {
        id: 'fri_2_a',
        text: 'Study hard and take both by sprinting between blocks',
        effects: { energy: -30, stress: 25, grades: 10, social: 10 },
        feedback: 'An amazing rush! You nailed both, but your heart and body are fully spent.'
      },
      {
        id: 'fri_2_b',
        text: 'Decline the recruiter to support your teammates',
        effects: { grades: 15, social: 25, focus: 10 },
        feedback: 'Your team ranks you as the absolute MVP. Your loyalty holds the group together.'
      },
      {
        id: 'fri_2_c',
        text: 'Beg the recruiter to shift the call to late evening',
        effects: { social: 15, focus: 10, stress: -10 },
        feedback: 'They agreed! You presented confidently to the class and scheduled the recruiter chat safely.'
      },
      {
        id: 'fri_2_d',
        text: 'Reschedule the class part, annoying your instructor',
        effects: { social: -20, grades: -10, stress: 15 },
        feedback: 'You did the interview, but your grading sheet took an immediate hit from an annoyed class mentor.'
      },
      {
        id: 'fri_2_e',
        text: 'Skip both opportunities to sleep through stress',
        effects: { grades: -20, social: -15, stress: -15, energy: 20 },
        feedback: 'You felt calm in bed but a dark sense of missed potential hangs around later.'
      }
    ]
  },
  {
    dayIndex: 4,
    dayName: 'Friday',
    location: 'EXAMINATION COURT',
    title: 'The Borderline Grading Crisis',
    description: 'Your grades are exactly at the borderline between passing and failing. Friday\'s final exam determines your absolute standing. What will you do?',
    choices: [
      {
        id: 'fri_3_a',
        text: 'Form an emergency study clique with elite peers',
        effects: { social: 15, grades: 20, energy: -10 },
        feedback: 'Peer wisdom pulled you through! They explained hard physics proofs in minutes.'
      },
      {
        id: 'fri_3_b',
        text: 'Lock yourself in a silence cabin and review the syllabus catalog',
        effects: { focus: 25, grades: 15, social: -10 },
        feedback: 'Intense mental focus gave you a solid grasp on the main formula sets.'
      },
      {
        id: 'fri_3_c',
        text: 'Purchase helper textbooks from a custom tutor',
        effects: { money: -30, grades: 20, stress: -10 },
        feedback: 'Your wallet is depleted, but the customized exam questions matched the test sheets perfectly.'
      },
      {
        id: 'fri_3_d',
        text: 'Pray for luck and sleep early without prep',
        effects: { grades: -10, stress: -15, focus: -10 },
        feedback: 'Your health is great, but guessing multiple-choice answers went badly.'
      },
      {
        id: 'fri_3_e',
        text: 'Beg your course counselor for make-up assignments',
        effects: { social: 5, grades: 10, stress: 15 },
        feedback: 'You got extra points, but you have a large mountain of extra work to finish by Sunday.'
      }
    ]
  }
];

// Fallback scenarios list to support the original file exports
export const scenarios: Scenario[] = [
  mondayScenarios[0],
  tuesdayScenarios[0],
  wednesdayScenarios[0],
  thursdayScenarios[0],
  fridayScenarios[0]
];

// Helper to assemble a randomized sequence of 5 distinct day scenarios
export const getSequenceOfScenarios = (): Scenario[] => {
  const m = mondayScenarios[Math.floor(Math.random() * mondayScenarios.length)];
  const t = tuesdayScenarios[Math.floor(Math.random() * tuesdayScenarios.length)];
  const w = wednesdayScenarios[Math.floor(Math.random() * wednesdayScenarios.length)];
  const th = thursdayScenarios[Math.floor(Math.random() * thursdayScenarios.length)];
  const f = fridayScenarios[Math.floor(Math.random() * fridayScenarios.length)];
  return [m, t, w, th, f];
};
