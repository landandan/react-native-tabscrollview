import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 35,
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
  }
})

export default class TabScrollView extends Component {

  static propTypes = {
    data: PropTypes.array,
    hideTab: PropTypes.bool,
    canScrollOut: PropTypes.bool,
    tabContainerStyle: PropTypes.any,
  }

  static defaultProps = {
    data: [],
    hideTab: false,
    canScrollOut: true,
    tabContainerStyle: {},
  }


  constructor(props) {
    super(props)
    this.scroll = {}
    this.sections = {}
    this.sectionsYs = []
    this.state = {
      scrollViewY: 0,
      contentSize: { height, width },
      layoutMeasurement: { height, width },
    }
  }

  countY() {
    const { scrollViewY } = this.state
    const ys = [...this.sectionsYs, parseInt(scrollViewY)]
    const sortYs = ys.sort((a, b) => a - b)
    const x = sortYs.lastIndexOf(scrollViewY)
    return x > 1 ? (x - 1) >>> 0 : 0
  }

  tabHighlight(val) {
    return this.countY() === val
  }

  canScrollYLength() {
    const { contentSize: { height }, layoutMeasurement } = this.state
    return height - layoutMeasurement.height
  }

  renderTab() {
    const { data, canScrollOut, tabContainerStyle } = this.props
    return (<View style={styles.tabContainer}>
      {
        data.map((item, index) =>
          <TouchableOpacity
            style={[styles.tabItem, tabContainerStyle]}
            key={index}
            onPress={() => {
              if ( this.sections[`sections${index}`] ) {
                const yLocal = this.sections[`sections${index}`].y
                if ( !canScrollOut && yLocal > this.canScrollYLength() ) {
                  this.scroll.scrollToEnd({ animated: true })
                  return
                }
                this.scroll.scrollTo({ y: yLocal, animated: true })
              }
            }}
          >
            {
              item.customTab &&
              (this.tabHighlight(index) ?
                (item.customTabHighlight ? item.customTabHighlight : item.customTab) : item.customTab)
            }
            {
              !item.customTab &&
              <Text
                style={[{ textAlign: 'center' }, { color: this.tabHighlight(index) ? 'red' : 'black' }]}>{item.tabName}</Text>
            }
          </TouchableOpacity>)
      }
    </View>)
  }

  renderScrollView() {
    const { data } = this.props
    return (
      <ScrollView
        ref={(scroll) => this.scroll = scroll}
        onScroll={(event) => {
          this.setState({
            scrollViewY: parseInt(event.nativeEvent.contentOffset.y),
            contentSize: event.nativeEvent.contentSize,
            layoutMeasurement: event.nativeEvent.layoutMeasurement,
          })
        }}
        scrollEventThrottle={100}
      >
        {
          data.map((item, index) =>
            <View
              key={`sections${index}`}
              onLayout={(e) => {
                this.sections[`sections${index}`] = e.nativeEvent.layout
                this.sectionsYs.push(parseInt(e.nativeEvent.layout.y))
              }}
            >
              {item.scrollViewChildren}
            </View>
          )
        }

      </ScrollView>
    )
  }

  render() {
    const { hideTab } = this.props
    return (<View style={{ flex: 1, width }}>
      {!hideTab && this.renderTab()}
      {this.renderScrollView()}
    </View>)
  }
}