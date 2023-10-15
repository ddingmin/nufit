import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import poster from '../assets/stats_character.png'
import left from '../assets/prev_arrow_ico.png'
import right from '../assets/next_arrow_ico.png'

const TopBar = () => {
  const [date, setDate] = useState(new Date()); // 현재 날짜 상태
  const currentDate = date.toLocaleDateString(); // 현재 날짜를 문자열로 변환

  // 이전 날짜로 이동하는 함수
  const goToPreviousDay = () => {
    const previousDate = new Date(date); // 현재 날짜의 복사본 생성
    previousDate.setDate(previousDate.getDate() - 1); // 이전 날짜로 설정
    setDate(previousDate); // 날짜 상태 업데이트
  };

  // 다음 날짜로 이동하는 함수
  const goToNextDay = () => {
    const nextDate = new Date(date); // 현재 날짜의 복사본 생성
    nextDate.setDate(nextDate.getDate() + 1); // 다음 날짜로 설정
    setDate(nextDate); // 날짜 상태 업데이트
  };

  return (
    
    <View style={styles.container}>
      <View>
        <Image style={styles.img} source={poster}/>
      </View>
      <View style={styles.headerbox}>
        <Text style={styles.text}>당신의 섭취 기록 및 통계</Text>
        <View style={styles.datebox}>
          <TouchableOpacity onPress={goToPreviousDay}>
            <Image style={styles.button} source={left}/>
          </TouchableOpacity>
          <Text style={styles.date}>{currentDate}</Text>
          <TouchableOpacity onPress={goToNextDay}>
          <Image style={styles.button} source={right}/>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingVertical: 0,
    backgroundColor: '#f2f2f2',
    paddingTop: 70,
    
  },
  button: {
    fontSize: 20,
    
  },
  headerbox: {
    marginTop: 10,
    flexDirection: 'row',
    
    
  },
  datebox: {
    flexDirection: 'row',
    paddingHorizontal: 0,
    alignItems: 'center',
  },
  date: {
    // fontSize: 13,
    fontWeight: 'bold',
    paddingHorizontal: 15,
  },
  text: {
    // fontFamily: 'Pretendard-Bold',
    fontSize: 18,
    fontWeight: 'bold',
    paddingRight: 25,
  },
  img: {
    width: 40,
    height: 40,
  }
});

export default TopBar;
