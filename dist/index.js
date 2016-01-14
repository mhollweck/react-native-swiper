const React = require('react-native');
const { Platform } = React;

if (Platform.OS === 'android') {
  module.exports = require('./Swiper.android');
} else if (Platform.OS === 'ios') {
  module.exports = require('react-native-swiper');
}
