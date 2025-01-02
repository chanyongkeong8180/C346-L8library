import {useState} from 'react';
import {View, ScrollView, Text, TextInput, Button, Alert, StyleSheet} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Edit = ({navigation, route}) => {
    const [title, setTitle] = useState(route.params.title);
    const [ISBN, setISBN] = useState(route.params.isbn);
    const [image, setImage] = useState(route.params.image);
    const [copies, setCopies] = useState(route.params.copies);

    const setBooks = async(value) => {
        AsyncStorage.setItem("bookData", value);
        navigation.navigate("Home");
    };
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.textStyles}>Title:</Text>
                <TextInput
                    style={styles.inputStyles}
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />
                <Text style={styles.textStyles}>ISBN:</Text>
                <TextInput
                    style={[styles.inputStyles]}
                    maxLength={13}
                    keyboardType="number-pad"
                    value={ISBN}
                    onChangeText={(text) => setISBN(text)}
                />
                <Text style={styles.textStyles}>Image URL:</Text>
                <TextInput
                    style={[styles.inputStyles]}
                    value={image}
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
            <Button title="Edit Book" color="green"
                    onPress={()=> {
                        let books = JSON.parse(route.params.dataString);
                        if (title.trim() === '') {
                            Alert.alert("Warning!", "Title must not be empty.");
                        }
                        else if (ISBN.length !== 13) {
                            Alert.alert("Invalid ISBN!", "ISBN requires 13 characters.");
                        }
                        else if (image.trim() === '') {
                            Alert.alert("Warning!", "Image URL must not be empty.");
                        }
                        if (title.trim() !== '') {
                            books[route.params.index].title = title;
                        }
                        if (ISBN.length === 13) {
                            books[route.params.index].isbn = ISBN;
                        }
                        if (image.trim() !== '') {
                            books[route.params.index].image = image;
                        }
                        if (title.trim() !== '' && ISBN.length === 13 && image.trim() !== '') {
                            books[route.params.index].copies = copies;
                            let stringdata = JSON.stringify(books);
                            setBooks(stringdata);
                        }
                    }}
            />
            <Button title="Delete Book" color="red"
                    onPress={()=> {
                        let books = JSON.parse(route.params.dataString);
                        Alert.alert("Warning!!!",
                            "Are you sure you want to delete " +
                            title + " from the library permanently? " +
                            "It is recommended to set the copies owned to 0 instead.",
                            [{text: "Yes", onPress: () => {
                                books.splice(route.params.index, 1);
                                let stringdata = JSON.stringify(books);
                                setBooks(stringdata)
                                }},
                                {text: "No"}])
                    }}
            />
        </View>
    );
}

export default Edit;

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
