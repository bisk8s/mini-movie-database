import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Login: {
        screens: {
          MainLogin: {
            screens: {
              MainLogin: 'main'
            }
          }
        }
      },
      UserAdd: {
        screens: {
          MainUserAdd: {
            screens: {
              MainUserAdd: 'main'
            }
          }
        }
      },
      Internal: {
        screens: {
          Movie: {
            screens: {
              MovieHome: 'MovieHome',
              MovieDetail: 'MovieDetail',
              MovieEdit: 'MovieEdit',
              MovieAdd: 'MovieAdd'
            }
          },
          Person: {
            screens: {
              PersonHome: 'PersonHome',
              PersonDetail: 'PersonDetail',
              PersonEdit: 'PersonEdit',
              PersonAdd: 'PersonAdd'
            }
          }
        }
      },
      NotFound: '*'
    }
  }
};
