import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size; //left & right padding | margin

const verticalScale = (size: number) => (height / guidelineBaseHeight) * size; //top & bottom padding | margin

const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor; //font size | text size

export { horizontalScale, verticalScale, moderateScale };
