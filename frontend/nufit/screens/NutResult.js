import React from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'

const NutResult = ({ route, navigation }) => {
  const { result } = route.params;

  function handlePress() {
    navigation.navigate('StaticPie');
    }

  return (
    // <View>
    //   <Text style={styles.resultText}>목표 탄수화물량은 {Math.round(result * 0.4)}kcal입니다.</Text>
    //   <Text style={styles.resultText}>목표 단백질량은 {Math.round(result * 0.4)}kcal입니다.</Text>
    //   <Text style={styles.resultText}>목표 지방량은 {Math.round(result * 0.2)}kcal입니다.</Text>
    // </View>

    <View style={styles.container}>
      <Text style={styles.title}>목표 탄단지를 {'\n'}계산해드렸어요</Text>
      <Text>일일 권장 섭취량은 다음과 같습니다.{'\n'}{'\n'} </Text>

      <Text style={styles.resultText}>목표 탄수화물 섭취량</Text>
      <View style={styles.res}>
        <Text >{Math.round(result * 0.4)}                                                                        kcal</Text>
      </View>
      <Text style={styles.resultText}>목표 단백질 섭취량</Text>
      <View style={styles.res}>
        <Text >{Math.round(result * 0.4)}                                                                        kcal</Text>
      </View>
      <Text style={styles.resultText}>목표 지방 섭취량</Text>
      <View style={styles.res}>
        <Text >{Math.round(result * 0.2)}                                                                        kcal</Text>
      </View>
      <Text>{'\n'}</Text>
      <Button color="#000000" title="완료" onPress={handlePress}   />
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
        fontSize: 18,
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
})

export default NutResult;
