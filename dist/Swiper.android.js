'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ViewPagerAndroid,
  ScrollView,
} = React;

var Swiper = React.createClass({
  propTypes: {
    activeDot: React.PropTypes.object,
    dot: React.PropTypes.object,
    index: React.PropTypes.number,
  },

  getDefaultProps: function() {
    var active =
      <View style={{
        backgroundColor: '#007aff',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
      }} />;

    var dot =
      <View style={{
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
      }} />;

    return {
      activeDot: active,
      dot: dot,
      index: 0,
    };
  },

  getInitialState: function() {
    return {
      total: this.props.children ? this.props.children.length || 1 : 0,
      index:
        this.props.total > 1
        ? Math.min(this.props.index, this.state.total - 1)
        : 0,
    };
  },

  renderPagination: function() {
    // By default, dots only show when `total` > 2
    if (this.state.total <= 1) return null;

    var dots = [];

    for (var i = 0; i < this.state.total; i++) {
      dots.push(
        i === this.state.index
        ? React.cloneElement(this.props.activeDot, { key: i })
        : React.cloneElement(this.props.dot, { key: i }));
    }

    return (
      <View style={styles.pagination_x}>
        {dots}
      </View>
    );
  },

  onPageSelected: function(e) {
    this.setState({
      index: e.nativeEvent.position,
    });
  },

  render: function() {
    return (
      <View style={{flex: 1}}>
        <ViewPagerAndroid
          onPageSelected={this.onPageSelected}
          initialPage={0}>
          {this.props.children}
        </ViewPagerAndroid>
        {this.renderPagination()}
      </View>
    );
  },
});

var styles = StyleSheet.create({
  pagination_x: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
});

module.exports = Swiper;
