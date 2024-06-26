import {messages} from './fake_messages';

const fakePgAdmin = {
  Browser: {
    messages: messages,
    Events: {
      on: jasmine.createSpy('on'),
    },
    get_preferences_for_module: ()=>({}),
    docker: {
      findPanels: function() {
        return [
          {
            isVisible: function() {
              return true;
            },
          },
        ];
      },
    },
    onPreferencesChange: ()=>{/*This is intentional (SonarQube)*/},
    utils: {
      app_version_int: 1234,
    },
  },
};

export default fakePgAdmin;
