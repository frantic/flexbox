import React from 'react'
import { Router, Route, Link } from 'react-router'
import ExampleHost from './ExampleHost';
import allExamples from './allExamples';
import {View, Text, StyleSheet} from './react-native-web';

class ExampleCard extends React.Component {
  render() {
    return (
      <View style={styles.card}>
        <ExampleHost code={this.props.code} />
        <Link to={'/example/' + this.props.id}>
          Check it out
        </Link>
      </View>
    );
  }
}

export default class ExamplesPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {allExamples.map(
          (code, idx) => (
            <ExampleCard
              id={idx}
              key={idx}
              code={code}
            />
          )
        )}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
    height: 300,
    margin: 10,
    backgroundColor: 'white',
    position: 'relative',
    fontFamily: '"San Francisco", "Helvetica Neue", Helvetica, sans-serif',
    fontSize: 12,
  }
});
