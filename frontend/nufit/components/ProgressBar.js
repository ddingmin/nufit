import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ label, goal, progress }) => {
  const fillPercentage = (progress / goal) * 100;
  const progressBarWidth = 100; // 프로그레스바 전체 너비
  const fillWidth = (progressBarWidth * fillPercentage) / 100;
  const remainingWidth = progressBarWidth - fillWidth;
  const progressText = `${progress}/${goal}g`;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.fill, { width: `${fillWidth}%` }]} />
        <View style={[styles.remaining, { width: `${remainingWidth}%` }]} />
      </View>
      <Text style={styles.progressText}>{progressText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    color: '#fff',
  },
  progressBar: {
    width: 80,
    height: 5,
    flexDirection: 'row',
  },
  fill: {
    backgroundColor: '#fff',
    height: '100%',
    borderRadius: 10,
  },
  remaining: {
    backgroundColor: '#17AE9C',
    height: '100%',
    borderRadius: 10,
  },
  progressText: {
    marginTop: 5,
    fontSize: 12,
    color: '#fff',
  },
});

export default ProgressBar;
