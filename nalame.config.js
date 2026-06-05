(function () {
  'use strict';

  window.NalameConfig = {
    app: {
      name: 'nalame',
      title: 'Locksmith Career Path',
      eyebrow: 'Personalized Flow',
      intro: 'Answer a few quick questions to help us understand your goals.',
      modeLabel: 'Theme',
      lightLabel: 'Light',
      darkLabel: 'Dark',
      defaultTheme: 'light',
      summaryTitle: 'Your Personalized Locksmith Path',
      summaryIntro: 'Review your answers and see the path that fits your goals.',
      emptyAnswerLabel: 'Skipped',
      restartLabel: 'Start Over',
      progressLabel: 'Question',
      previousLabel: 'Previous',
      nextLabel: 'Next',
      skipLabel: 'Skip',
      completeLabel: 'Complete',
      requiredMessage: 'Choose an answer or skip this question.',
      ariaLive: 'Quiz status updates',
      answerGroupLabel: 'Answer choices',
      summaryAriaLabel: 'Completed quiz answers'
    },
    questionMedia: {
      'question-01': { src: 'assets/question_1.png', alt: 'Question 1 illustration' },
      'question-02': { src: 'assets/question_2.png', alt: 'Question 2 illustration' },
      'question-03': { src: 'assets/question_3.png', alt: 'Question 3 illustration' },
      'question-04': { src: 'assets/question_4.png', alt: 'Question 4 illustration' },
      'question-05': { src: 'assets/question_5.png', alt: 'Question 5 illustration' },
      'question-06': { src: 'assets/question_6.png', alt: 'Question 6 illustration' },
      'question-07': { src: 'assets/question_7.png', alt: 'Question 7 illustration' },
      'question-08': { src: 'assets/question_8.png', alt: 'Question 8 illustration' },
      'question-09': { src: 'assets/question_9.png', alt: 'Question 9 illustration' },
      'question-10': { src: 'assets/question_10.png', alt: 'Question 10 illustration' },
      'question-11': { src: 'assets/question_1.png', alt: 'Question 11 illustration' },
      'question-12': { src: 'assets/question_2.png', alt: 'Question 12 illustration' },
      'question-13': { src: 'assets/question_3.png', alt: 'Question 13 illustration' },
      'question-14': { src: 'assets/question_4.png', alt: 'Question 14 illustration' },
      'question-15': { src: 'assets/question_5.png', alt: 'Question 15 illustration' }
    },
    questions: [
      {
        id: 'question-01',
        text: 'What best describes your current work situation?',
        conversation: 'Good to know. Everyone starts from a different place, and this helps us understand your starting point.',
        answers: [
          { id: 'q01-a01', text: 'Working full-time', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q01-a02', text: 'Working part-time', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q01-a03', text: 'Self-employed', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q01-a04', text: 'Between jobs', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q01-a05', text: 'Student', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q01-a06', text: 'Retired', conversation: 'Thanks. That helps us personalize the next step.' }
        ]
      },
      {
        id: 'question-02',
        text: 'What made you decide to explore new opportunities today?',
        conversation: 'That makes sense. Most people start looking when they feel something in their life needs to change.',
        answers: [
          { id: 'q02-a01', text: 'Need more money', conversation: 'Good to know. Let us dig in a little more and understand what kind of opportunity would really help.' },
          { id: 'q02-a02', text: 'Looking for flexibility', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q02-a03', text: 'Want a career change', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q02-a04', text: 'Need more stability', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q02-a05', text: 'Just curious', conversation: 'Thanks. That helps us personalize the next step.' }
        ]
      },
      {
        id: 'question-03',
        text: 'If nothing changed over the next 12 months, how would you feel?',
        conversation: 'That feeling can be useful. It helps show whether now is the right time to consider a new direction.',
        answers: [
          { id: 'q03-a01', text: 'Frustrated', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q03-a02', text: 'Disappointed', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q03-a03', text: 'Neutral', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q03-a04', text: 'Fine', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q03-a05', text: 'Happy', conversation: 'Thanks. That helps us personalize the next step.' }
        ]
      },
      {
        id: 'question-04',
        text: 'Imagine it is one year from today. What is the biggest improvement you would like to see?',
        conversation: 'That gives us a better picture of the future you are trying to build.',
        answers: [
          { id: 'q04-a01', text: 'Higher income', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q04-a02', text: 'Better schedule', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q04-a03', text: 'Less stress', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q04-a04', text: 'More independence', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q04-a05', text: 'Stronger job security', conversation: 'Thanks. That helps us personalize the next step.' }
        ]
      },
      {
        id: 'question-05',
        text: 'How satisfied are you with your current income and career path?',
        conversation: 'Thanks for being honest. This helps us understand how much change you may be looking for.',
        answers: [
          { id: 'q05-a01', text: '1 - Not satisfied', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q05-a02', text: '2', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q05-a03', text: '3', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q05-a04', text: '4', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q05-a05', text: '5', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q05-a06', text: '6', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q05-a07', text: '7', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q05-a08', text: '8', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q05-a09', text: '9', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q05-a10', text: '10 - Very satisfied', conversation: 'Thanks. That helps us personalize the next step.' }
        ]
      },
      {
        id: 'question-06',
        text: 'What monthly income would make you feel financially comfortable?',
        conversation: 'Helpful. This is not a promise, but it gives us a sense of the level of opportunity you are aiming for.',
        answers: [
          { id: 'q06-a01', text: '$4,000+', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q06-a02', text: '$6,000+', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q06-a03', text: '$8,000+', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q06-a04', text: '$10,000+', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q06-a05', text: '$12,000+', conversation: 'Thanks. That helps us personalize the next step.' }
        ]
      },
      {
        id: 'question-07',
        text: 'What appeals most to you about locksmithing?',
        conversation: 'Great. This helps us understand what part of the profession connects with you personally.',
        answers: [
          { id: 'q07-a01', text: 'Helping people', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q07-a02', text: 'Working with my hands', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q07-a03', text: 'Starting a business', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q07-a04', text: 'Flexible schedule', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q07-a05', text: 'Learning a valuable skill', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q07-a06', text: 'A career less impacted by AI', conversation: 'Thanks. That helps us personalize the next step.' }
        ]
      },
      {
        id: 'question-08',
        text: 'Have you ever considered owning your own business?',
        conversation: 'Good to know. Not everyone wants ownership, but it helps us understand your long-term direction.',
        answers: [
          { id: 'q08-a01', text: 'Already own one', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q08-a02', text: 'Yes', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q08-a03', text: 'Maybe', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q08-a04', text: 'No', conversation: 'Thanks. That helps us personalize the next step.' }
        ]
      },
      {
        id: 'question-09',
        text: 'How much time can you realistically dedicate each week to learning a new skill?',
        conversation: 'That is helpful. Consistency matters more than trying to do everything at once.',
        answers: [
          { id: 'q09-a01', text: '2-4 hours', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q09-a02', text: '5-8 hours', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q09-a03', text: '8-12 hours', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q09-a04', text: '12+ hours', conversation: 'Thanks. That helps us personalize the next step.' }
        ]
      },
      {
        id: 'question-10',
        text: 'What is your biggest challenge right now?',
        conversation: 'Thanks for being honest. Knowing the obstacle helps us understand what support matters most.',
        answers: [
          { id: 'q10-a01', text: 'Time', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q10-a02', text: 'Money', conversation: 'That is understandable. Let us keep looking at what would make this feel practical.' },
          { id: 'q10-a03', text: 'Confidence', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q10-a04', text: 'Lack of knowledge', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q10-a05', text: 'Not knowing where to start', conversation: 'Thanks. That helps us personalize the next step.' }
        ]
      },
      {
        id: 'question-11',
        text: 'Which statement sounds most like you?',
        conversation: 'Good answer. This tells us what kind of roadmap would feel most useful to you.',
        answers: [
          { id: 'q11-a01', text: 'I need a clear plan', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q11-a02', text: 'I need more confidence', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q11-a03', text: 'I need flexibility', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q11-a04', text: 'I need opportunity', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q11-a05', text: 'I need a fresh start', conversation: 'Thanks. That helps us personalize the next step.' }
        ]
      },
      {
        id: 'question-12',
        text: 'If you became a locksmith, what excites you most?',
        conversation: 'That is a strong motivator. The best path is one that connects with what you actually care about.',
        answers: [
          { id: 'q12-a01', text: 'Helping people', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q12-a02', text: 'Being my own boss', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q12-a03', text: 'Earning more', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q12-a04', text: 'Flexible hours', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q12-a05', text: 'Learning a trade', conversation: 'Thanks. That helps us personalize the next step.' }
        ]
      },
      {
        id: 'question-13',
        text: 'Who would benefit most if your income improved?',
        conversation: 'That is powerful. Personal reasons often create the strongest motivation to keep going.',
        answers: [
          { id: 'q13-a01', text: 'Me', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q13-a02', text: 'My spouse', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q13-a03', text: 'My children', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q13-a04', text: 'My family', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q13-a05', text: 'Everyone', conversation: 'Thanks. That helps us personalize the next step.' }
        ]
      },
      {
        id: 'question-14',
        text: 'How ready are you to make a positive change this year?',
        conversation: 'Thanks. Readiness helps us understand whether you are exploring or prepared to take action.',
        answers: [
          { id: 'q14-a01', text: '1 - Just exploring', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q14-a02', text: '2', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q14-a03', text: '3', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q14-a04', text: '4', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q14-a05', text: '5', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q14-a06', text: '6', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q14-a07', text: '7', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q14-a08', text: '8', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q14-a09', text: '9', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q14-a10', text: '10 - Ready to take action', conversation: 'Thanks. That helps us personalize the next step.' }
        ]
      },
      {
        id: 'question-15',
        text: 'If we showed you a clear step-by-step roadmap, what would you want to achieve first?',
        conversation: 'Based on your answers, it sounds like you are looking for a practical path toward greater opportunity, flexibility, and income.',
        answers: [
          { id: 'q15-a01', text: 'Get certified', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q15-a02', text: 'Start earning income', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q15-a03', text: 'Work for a locksmith company', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q15-a04', text: 'Start my own business', conversation: 'Thanks. That helps us personalize the next step.' },
          { id: 'q15-a05', text: 'Build a long-term career', conversation: 'Thanks. That helps us personalize the next step.' }
        ]
      }
    ]
  };
}());
