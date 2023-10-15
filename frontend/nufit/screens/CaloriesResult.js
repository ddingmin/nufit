import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native'

const CaloriesResult = ({ route, navigation }) => {
  const { gen, a, he, we } = route.params;

  let bmr;
    if (gen === 'male') {
        bmr = 66.5 + (13.75 * we) + (5.003 * he) - (6.75 * a);
    } else if (gen === 'female') {
        bmr = 655.1 + (9.563 * we) + (1.850 * he) - (4.676 * a);
    } else {
        return;
    }
 
  function handlePress() {
    navigation.navigate('NutResult', { result : bmr });
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>목표 칼로리를 {'\n'}계산해드렸어요</Text>
      <Text>일일 권장 섭취량은 {Math.round(bmr)}kcal 입니다.{'\n'}{'\n'} </Text>
      
      <Text style={styles.resultText}>목표 섭취 칼로리</Text>
      <View style={styles.res}>
        <Text >{Math.round(bmr)}                                                                        kcal</Text>
      </View>
      <Text style={styles.adv}>권장 섭취량보다 하루 500kcal 정도{'\n'}적게 먹으면 감량 효과를 기대할 수 있어요! </Text>
      <Button color="#000000" title="다음" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 30,
      paddingVertical: 50,
      paddingTop: 100,
  
    },
    resultText: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
       
    },
    title:{
      fontSize:20,
      fontWeight: 'bold',
      marginBottom: 40,
      
    },
    res:{
      justifyContent: 'center',
      marginBottom: 50,
      marginTop: 10,
      backgroundColor: '#fafafa',
      height: 50,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#ecebeb',
      paddingHorizontal: 20,
    },
    adv: {
      marginBottom: 320,
    }

})


export default CaloriesResult;
