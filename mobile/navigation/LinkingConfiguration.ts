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
      Internal: {
        screens: {
          Movie: {
            screens: {
              MovieHome: 'MovieHome',
              MovieDetail: 'MovieDetail',
              MovieAdd: 'MovieAdd'
            }
          },
          Person: {
            screens: {
              PersonHome: 'PersonHome',
              PersonDetail: 'PersonDetail',
              PersonAdd: 'PersonAdd'
            }
          }
        }
      },
      NotFound: '*'
    }
  }
};
