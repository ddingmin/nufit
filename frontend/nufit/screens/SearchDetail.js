import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

const SearchDetail = ({ route }) => {
  const { title } = route.params;

  return (
    <View>
      <Text style={styles.resultText}>         {title}</Text>
     
    </View>
  );
}

const styles = StyleSheet.create({
    resultText: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
      },
})

export default SearchDetail;
