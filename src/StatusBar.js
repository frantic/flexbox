import React from 'react'
import {Text, View, StyleSheet} from './react-native-web';

export default class StatusBar extends React.Component {
  componentDidMount() {
    this.interval = setInterval(() => this.forceUpdate(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  now() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return hours + ':' + minutes;
  }

  render() {
    return (
      <View style={styles.status}>
        <Text style={[styles.section, styles.network]}>
          &#x25cf;&#x25cf;&#x25cf;&#x25cf;&#x25cf; React
        </Text>
        <Text style={[styles.section, styles.time]}>
          {this.now()}
        </Text>
        <Text style={[styles.section, styles.info]}>
          100%
        </Text>
      </View>
    );
  }
}

StatusBar.height = 20;

var styles = StyleSheet.create({
  status: {
    height: StatusBar.height,
    display: 'flex',
    flexDirection: 'row',
  },
  section: {
    flex: 1,
    padding: 4,
    fontWeight: '500',
  },
  network: {
    textAlign: 'left',
  },
  time: {
    textAlign: 'center',
  },
  info: {
    textAlign: 'right',
  }
});

