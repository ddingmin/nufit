import React, { useState } from 'react';
import { ScrollView, Animated, View, TouchableOpacity, StyleSheet, StatusBar, Text, Image } from 'react-native';
import char from '../assets/blank_data_ico.png'
import { TabView, SceneMap } from 'react-native-tab-view';

const FirstRoute = ({ res }) => {
  if (res === 0) {
    return (
      <View style={[styles.container, { backgroundColor: '#ffffff' }]}>
         <Image style={styles.img} source={char} />
        <Text style={styles.text}>자주 먹는 음식을 저장해보세요</Text>
      </View>
    );
  } else {
    const data = [
      { name: '사과', size: '1개 중간 크기', kcal: '57 kcal' },
      { name: '바나나', size: '2개 소 크기', kcal: '90 kcal' },
      { name: '딸기', size: '10개 작은 크기', kcal: '30 kcal' },
      { name: '사과', size: '1개 중간 크기', kcal: '57 kcal' },
      { name: '바나나', size: '2개 소 크기', kcal: '90 kcal' },
      { name: '딸기', size: '10개 작은 크기', kcal: '30 kcal' },
      { name: '사과', size: '1개 중간 크기', kcal: '57 kcal' },
      { name: '바나나', size: '2개 소 크기', kcal: '90 kcal' },
      { name: '딸기', size: '10개 작은 크기', kcal: '30 kcal' },
    ]; //데이터 예시

    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.container2, { backgroundColor: '#ffffff' }]}>
          {data.map((item, index) => (
            <View style={styles.context} key={index}>
              <View>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.minitext}>{item.size}</Text>
              </View>
              <View style={styles.righttext}>
                <Text style={styles.text}>{item.kcal}</Text>
                <Text style={styles.minitext}>삭제</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
};

const SecondRoute = () => (
  <View style={[styles.container, { backgroundColor: '#ffffff' }]}>
    <Image style={styles.img} source={char} />
    <Text style={styles.text}>음식을 등록해보세요</Text>
  </View>
);

const SaveFood = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: '저장한 음식' },
    { key: 'second', title: '등록한 음식' },
  ]);
  const [res] = useState(1); // api 연결 후 json 데이터에 따라

  const handleIndexChange = (index) => setIndex(index);

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) => (inputIndex === i ? 1 : 0.5)),
          });

          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setIndex(i)}
              key={i} // Added key prop
            >
              <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderScene = SceneMap({
    first: () => <FirstRoute res={res} />,
    second: SecondRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={handleIndexChange}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    marginTop: 6,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
    borderBottomWidth: 2,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 16,
  },
  minitext: {
    fontSize: 12,
    marginTop: 3,
    color: '#cdcdcd',
  },
  context: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#CDCDCD',
    marginVertical: 6,
    paddingHorizontal: 40,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  righttext: {
    alignItems: 'center',
  },
  img: {
    marginBottom: 10,
  }
});

export default SaveFood;
