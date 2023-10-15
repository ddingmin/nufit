import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryPie } from 'victory-native';

const ProgressCircle = ({ progress, carbspercent, proteinpercent, fatpercent }) => {

 


  const data = [
    { x: 'Carbs', y: carbspercent },
    { x: 'Protein', y: proteinpercent },
    { x: 'Fat', y: fatpercent },
  ];

  

  return (
    <View style={styles.container}>
      <VictoryPie
        data={data}
        colorScale={['#fff', '#D5F12B', '#000000']}
        innerRadius={95}
        labels={() => null}
        width={300} height={300}
        style={styles.progressCircle}
        
      />
      <Text style={styles.progressText}>
        <Text style={styles.subtitleText}>총 섭취.</Text>
        {'\n'}
        <Text style={styles.caloriesText}>{`${progress}kcal`}</Text>
      </Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,  
  },
  progressCircle: {
    labels: { fontSize: 0 }, 
  },
  progressText: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
  },
  caloriesText: {
    fontSize: 22,
    color: '#fff',
  },
  subtitleText: {
    fontSize: 15,
    color: '#fff',
    
  },
  
});

export default ProgressCircle;
