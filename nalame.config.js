(function () {
  'use strict';

  window.NalameConfig = {
    app: {
      name: 'nalame',
      title: 'Nalame Quiz',
      eyebrow: 'Personalized Flow',
      intro: 'Answer a few quick questions to complete your profile.',
      modeLabel: 'Theme',
      lightLabel: 'Light',
      darkLabel: 'Dark',
      defaultTheme: 'light',
      summaryTitle: 'Your Complete Answers',
      summaryIntro: 'Review every question and selected answer below.',
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
      default: {
        src: 'assets/locksmith-stuck.png',
        alt: 'Stuck locksmith illustration'
      },
      'question-04': {
        src: 'assets/locksmith-stuck.png',
        alt: 'Stuck locksmith illustration'
      }
    },
    questions: [
      {
        id: 'question-01',
        text: 'Lorem ipsum dolor sit amet, consectetur?',
        answers: [
          { id: 'q01-a01', text: 'Praesent commodo cursus magna' },
          { id: 'q01-a02', text: 'Vestibulum id ligula porta felis' },
          { id: 'q01-a03', text: 'Donec ullamcorper nulla non metus' }
        ]
      },
      {
        id: 'question-02',
        text: 'Sed posuere consectetur est at lobortis?',
        answers: [
          { id: 'q02-a01', text: 'Aenean lacinia bibendum nulla' },
          { id: 'q02-a02', text: 'Cras justo odio dapibus ac' }
        ]
      },
      {
        id: 'question-03',
        text: 'Maecenas faucibus mollis interdum vivamus sagittis?',
        answers: [
          { id: 'q03-a01', text: 'Integer posuere erat a ante' },
          { id: 'q03-a02', text: 'Nullam quis risus eget urna' },
          { id: 'q03-a03', text: 'Etiam porta sem malesuada' },
          { id: 'q03-a04', text: 'Curabitur blandit tempus porttitor' }
        ]
      },
      {
        id: 'question-04',
        text: 'Morbi leo risus porta ac consectetur ac vestibulum?',
        answers: [
          { id: 'q04-a01', text: 'Fermentum massa justo sit amet' },
          { id: 'q04-a02', text: 'Sollicitudin commodo cursus magna' },
          { id: 'q04-a03', text: 'Pellentesque ornare sem lacinia' }
        ]
      },
      {
        id: 'question-05',
        text: 'Curabitur blandit tempus porttitor integer posuere?',
        answers: [
          { id: 'q05-a01', text: 'Ridiculus mus sociis natoque' },
          { id: 'q05-a02', text: 'Venenatis dapibus posuere velit' }
        ]
      },
      {
        id: 'question-06',
        text: 'Aenean eu leo quam pellentesque ornare sem?',
        answers: [
          { id: 'q06-a01', text: 'Fringilla mollis interdum' },
          { id: 'q06-a02', text: 'Euismod vestibulum' },
          { id: 'q06-a03', text: 'Ligula porta felis euismod' },
          { id: 'q06-a04', text: 'Tellus ac cursus commodo' }
        ]
      },
      {
        id: 'question-07',
        text: 'Donec sed odio dui cras mattis consectetur?',
        answers: [
          { id: 'q07-a01', text: 'Magna parturient montes nascetur' },
          { id: 'q07-a02', text: 'Dolor sit amet consectetur' },
          { id: 'q07-a03', text: 'Vehicula ut id elit' }
        ]
      },
      {
        id: 'question-08',
        text: 'Vestibulum id ligula porta felis euismod semper?',
        answers: [
          { id: 'q08-a01', text: 'Commodo luctus nisi erat' },
          { id: 'q08-a02', text: 'Bibendum sagittis lacus vel' }
        ]
      },
      {
        id: 'question-09',
        text: 'Nullam quis risus eget urna mollis ornare?',
        answers: [
          { id: 'q09-a01', text: 'Tortor mauris condimentum nibh' },
          { id: 'q09-a02', text: 'Malesuada magna mollis euismod' },
          { id: 'q09-a03', text: 'Risus porta ac consectetur' },
          { id: 'q09-a04', text: 'Amet commodo luctus' }
        ]
      },
      {
        id: 'question-10',
        text: 'Etiam porta sem malesuada magna mollis euismod?',
        answers: [
          { id: 'q10-a01', text: 'Consectetur adipiscing elit' },
          { id: 'q10-a02', text: 'Justo odio dapibus ac' },
          { id: 'q10-a03', text: 'Vulputate cursus inceptos' }
        ]
      }
    ]
  };
}());
