import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home = ({ navigation }) => {
    const handlePress = () => {
        navigation.navigate('ChooseSearch');
    }

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title="+" onPress={handlePress}/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center'
    }

})