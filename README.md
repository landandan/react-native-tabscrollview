# react-native-tabscrollview [![npm version](https://img.shields.io/npm/v/react-native-tabscrollview.svg?style=flat)](https://www.npmjs.com/package/react-native-tabscrollview)

### install
`npm install react-native-tabscrollview --save`

## Props
data: Array
```
{
    tabName // 标签名称，自定义时可不传
    scrollViewChildren // 对应标签子模块，必传
    customTab // 自定义标签
    customTabHighlight // 自定义标签高亮
}
```

hideTab: boolean
`是否隐藏tab，默认为false`

canScrollOut: boolean
`当点击tab时对应的模块不足一页时，能否将该模块滚动到顶，默认为true`

tabContainerStyle: style
`自定义tab样式`

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
          scrollViewChildren: <View style={{ height: 300, backgroundColor: 'red' }}></View>
        }, {
          customTab: <Text style={[{ textAlign: 'center', backgroundColor: 'red' }]}>评价</Text>,
          customTabHighlight: <Text
            style={[{ textAlign: 'center', backgroundColor: 'yellow' }]}>评价</Text>,
          scrollViewChildren: <View style={{ height: 700, backgroundColor: 'yellow' }}></View>
        }, {
          tabName: '详情',
          scrollViewChildren: <View style={{ height: 800, backgroundColor: 'blue' }}></View>
        }, {
          tabName: '推荐',
          scrollViewChildren: <View style={{ height: 900, backgroundColor: 'green' }}></View>
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
