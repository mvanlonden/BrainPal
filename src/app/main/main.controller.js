class MainController {
  constructor ($timeout) {
    'ngInject';

    this.messages = [
      {
        text: 'You are getting a little agitated when on facebook.com. You might want to consider spending less time there.'
      },
      {
        text: 'Looks like you’ve been very focused while at Kahn Academy. Keep it up!'
      },
      {
        text: ''
      }
    ];

    this.apps = [
      {
        app: 'Kahn Academy',
        timeSpent: '2h',
        mentalState: 'focused',
        graph: {
          data: [
            {
              name: 'α',
              value: 20
            },
            {
              name: 'β',
              value: 40
            },
            {
              name: 'γ',
              value: 40
            },
            {
              name: 'δ',
              value: 40
            },
            {
              name: 'θ',
              value: 40
            }
          ]
        }
      },
      {
        app: 'Facebook',
        timeSpent: '30m',
        mentalState: 'agitated',
        graph: {
          data: [
            {
              name: 'α',
              value: 10
            },
            {
              name: 'β',
              value: 60
            },
            {
              name: 'γ',
              value: 10
            },
            {
              name: 'δ',
              value: 70
            },
            {
              name: 'θ',
              value: 40
            }
          ]
        }
      }
    ];
  }

}

export default MainController;
