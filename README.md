# react-native-tabscrollview

### install
`npm i react-native-tabscrollview`

### example
```
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import TabScrollView from 'react-native-tabscrollview'

export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <TabScrollView data={[{
          tabName: '宝贝',
          scrollViewChildren: <View style={{ height: 300, backgroundColor: 'green' }}></View>
        }, {
          tabName: '评价',
          tabChildren: <Text style={[{ textAlign: 'center', backgroundColor: 'red' }]}>评价</Text>,
          tabHighlightChildren: <Text
            style={[{ textAlign: 'center', backgroundColor: 'yellow' }]}>评价</Text>,
          scrollViewChildren: <View style={{ height: 600, backgroundColor: 'gray' }}></View>
        }, {
          tabName: '详情',
          scrollViewChildren: <View style={{ height: 800, backgroundColor: 'white' }}></View>
        }, {
          tabName: '推荐',
          scrollViewChildren: <View style={{ height: 300, backgroundColor: 'black' }}></View>
        }]}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 50,
  },
});
```
