import {useState} from 'react';
import {View, ScrollView, Text, TextInput, Button, Alert, StyleSheet} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Add = ({navigation, route}) => {
    const [title, setTitle] = useState('');
    const [ISBN, setISBN] = useState('');
    const [image, setImage] = useState('');
    const [copies, setCopies] = useState(0);

    const setBooks = async (value) => {
        AsyncStorage.setItem("bookData", value);
        navigation.navigate('Home');
    }
    return (
        <View style={styles.container}>
            <ScrollView>
            <Text style={styles.textStyles}>Title:</Text>
            <TextInput
                style={styles.inputStyles}
                onChangeText={(text) => setTitle(text)}
            />
            <Text style={styles.textStyles}>ISBN:</Text>
            <TextInput
                style={[styles.inputStyles]}
                maxLength={13}
                keyboardType="number-pad"
                onChangeText={(text) => setISBN(text)}
            />
            <Text style={styles.textStyles}>Image URL:</Text>
            <TextInput
                style={[styles.inputStyles]}
                onChangeText={(text) => setImage(text)}
            />
            <Text style={styles.textStyles}>Copies Owned:</Text>
            <TextInput
                style={[styles.inputStyles]}
                keyboardType="number-pad"
                value={copies.toString()}
                onChangeText={(text) => setCopies(parseInt(text) || 0)}
            />
            </ScrollView>
            <Button title="Add Book" color="green"
                    onPress={()=> {
                        let books =JSON.parse(route.params.dataString);
                        let item = {title:title, isbn:ISBN, image:image, copies:copies};
                        if (title.trim() === '') {
                            Alert.alert("Warning!", "Title must not be empty.");
                        }
                        else if (ISBN.length !== 13) {
                            Alert.alert("Invalid ISBN!", "ISBN requires 13 characters.");
                        }
                        else if (image.trim() === '') {
                            Alert.alert("Warning!", "Image URL must not be empty.");
                        }
                        if (title.trim() !== '' && ISBN.length === 13 && image.trim() !== '') {
                            books.push(item);
                            let stringdata = JSON.stringify(books);
                            setBooks(stringdata);
                        }
                    }}
            />
        </View>
    );
}

export default Add;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        borderWidth: 1,
        backgroundColor: 'brown'
    },
    textStyles: {
        font: 15,
        margin: 10,
        color: 'white'
    },
    inputStyles: {
        margin: 10,
        borderWidth: 1,
        fontSize: 30
    }
});
