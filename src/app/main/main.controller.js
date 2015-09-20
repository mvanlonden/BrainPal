class MainController {
  constructor ($timeout) {
    'ngInject';

    this.messages = [
      {
        text: 'You are getting a little agitated when on facebook.com. You might want to consider spending less time there.',
      },
      {
        text: 'Looks like you’ve been very focused while at Kahn Academy. Keep it up!'
      }
    ]

    this.apps = [
      {
        app: 'Kahn Academy',
        timeSpent: '2h',
        mentalState: 'focused',
        graph: {
          data: [
            {
              name: 'alpha',
              value: 20
            },
            {
              name: 'beta',
              value: 40
            },
            {
              name: 'delta',
              value: 40
            },
            {
              name: 'theta',
              value: 40
            },
            {
              name: 'gamma',
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
              name: 'alpha',
              value: 10
            },
            {
              name: 'beta',
              value: 60
            },
            {
              name: 'delta',
              value: 10
            },
            {
              name: 'theta',
              value: 70
            },
            {
              name: 'gamma',
              value: 40
            }
          ]
        }
      }
    ]
  }

}

export default MainController;
