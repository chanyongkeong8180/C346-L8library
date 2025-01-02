import React, {useState} from 'react';
import {View, StatusBar, TouchableOpacity, FlatList, Text, Image, StyleSheet, } from 'react-native';
import {datasource} from './Data.js';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({navigation}) => {
    const [books, setBooks] = useState([]);

    const getBooks = async () => {
        let bookStr = await AsyncStorage.getItem("bookData");
        if (bookStr!==null) {
            let jsondata = (JSON.parse(bookStr));
            setBooks(jsondata);
        }
        else {
            setBooks(datasource);
        }
    };

    getBooks();

    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                style={styles.column}
                onPress={()=> {
                    let bookStr = JSON.stringify(books);
                    navigation.navigate('Edit', {dataString:bookStr, index:index, title:item.title, isbn:item.isbn, copies:item.copies, image:item.image});
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
              onPress={() =>{
                  let bookStr = JSON.stringify(books);
                  navigation.navigate('Add', {dataString:bookStr});
              }}>
            <Text style={[styles.textStyles, {textAlign: 'center'}]}>New Book</Text>
          </TouchableOpacity>
          <FlatList data={books} renderItem={renderItem}/>
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
