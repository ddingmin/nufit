import React, { useState } from 'react'
import { Button, TextInput, StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { Picker } from '@react-native-picker/picker';



const SetGoal = ({ navigation }) => {
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [active, setActive] = useState('m');
    
    function handlePress() {
    navigation.navigate('CaloriesResult', { gen:gender, a:age, he:height, we:weight });
  
    }
    return (
        <KeyboardAvoidingView style={styles.container} >
            <Text style={styles.title}>나의 목표 설정, {'\n'}1분이면 끝나요</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>성별</Text>
                <Picker
                    selectedValue={gender}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                >
                    <Picker.Item label="남성" value="male" />
                    <Picker.Item label="여성" value="female" />
                </Picker>
            </View>
            
            <View style={styles.inputContainer}>
                <Text style={styles.label}>나이</Text>
                <TextInput
                    style={styles.input}
                    value={age}
                    onChangeText={(text) => setAge(text)}
                    keyboardType="numeric"
                    
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>키</Text>
                <TextInput
                    style={styles.input}
                    value={height}
                    onChangeText={(text) => setHeight(text)}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>체중</Text>
                <TextInput
                    style={styles.input}
                    value={weight}
                    onChangeText={(text) => setWeight(text)}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>평소활동량</Text>
                    <Picker
                        selectedValue={active}
                        style={styles.picker}
                       
                        onValueChange={(itemValue, itemIndex) => setActive(itemValue)}
                    >
                        <Picker.Item label="활동 많음" value="l" />
                        <Picker.Item label="보통" value="m"/>
                        <Picker.Item label="활동 적음" value="s" />
                    </Picker>
            </View>
            <Button color ="#000000" title="다음" onPress={handlePress} />  
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-around',
      backgroundColor: '#fff',
      padding: 20,
      paddingVertical: 30,
      paddingTop: 100,
   
    },
    inputContainer: {
      flex: 1,
    //   alignItems: 'center',
      marginHorizontal: 20,
      marginBottom: 10,
      
    },

    label: {
      fontWeight: 'bold',
      marginRight: 10,
      marginBottom: 10,
    },
    picker: {
    //   flex: 1,
      backgroundColor: '#fafafa',
      height: 50,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#ecebeb',
    },
    input: {
      marginTop: 10,
      backgroundColor: '#fafafa',
      height: 50,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#ecebeb',
      paddingHorizontal: 20,
    },
    title:{
        fontSize:20,
        fontWeight: 'bold',
        marginBottom: 50,
        marginLeft: 10,
    }
    
});

export default SetGoal;
