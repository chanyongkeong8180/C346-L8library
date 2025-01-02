import {View, StatusBar, TouchableOpacity, FlatList, Text, Image, StyleSheet, } from 'react-native';
import {datasource} from './Data.js';
const Home = ({navigation}) => {
    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                style={styles.column}
                onPress={()=> {
                    navigation.navigate('Edit',
                        {index:index, title:item.title, isbn:item.isbn, copies:item.copies, image:item.image});
                }}
            >
                <Text style={styles.textStyles}>{item.title}</Text>
                <Text style={styles.textStyles}>ISBN: {item.isbn}</Text>
                <Text style={styles.textStyles}>Copies Owned: {item.copies}</Text>
                <Image source={{uri:item.image}} style={styles.imageStyles}/>
            </TouchableOpacity>
        );
    };
      return (
        <View style={styles.container}>
          <StatusBar/>
          <TouchableOpacity
              style={styles.opacityStyle}
              onPress={() =>{navigation.navigate("Add")}}>
            <Text style={[styles.textStyles, {textAlign: 'center'}]}>New Book</Text>
          </TouchableOpacity>
          <FlatList data={datasource} renderItem={renderItem}/>
        </View>
      );
}

export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'brown'
    },
    column: {
      flexDirection: 'column',
      backgroundColor: 'brown',
      borderWidth: 1,
      margin: 10
    },
    opacityStyle: {
      backgroundColor: 'green'
    },
    textStyles: {
      font: 15,
      margin: 10,
      color: 'white',
    },
    imageStyles: {
      width: 200,
      height: 200,
      margin: 10,
      alignSelf: 'flex-end'
    }
});
