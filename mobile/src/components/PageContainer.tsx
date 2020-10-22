import { Dimensions, StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: 'center',
    backgroundColor: Colors.background
  }
});
const PageContainer = styled(View)`
  ${styles.container}
`;

export default PageContainer;
