import {useState} from 'react';
import {View, ScrollView, Text, TextInput, Button, Alert, StyleSheet} from 'react-native';
import {datasource} from "./Data.js";

const Edit = ({navigation, route}) => {
    const [title, setTitle] = useState(route.params.title);
    const [ISBN, setISBN] = useState(route.params.isbn);
    const [image, setImage] = useState(route.params.image);
    const [copies, setCopies] = useState(route.params.copies);
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.textStyles}>Title:</Text>
                <TextInput style={styles.inputStyles}
                           value={title}
                           onChangeText={(text) => setTitle(text)}/>
                <Text style={styles.textStyles}>ISBN:</Text>
                <TextInput style={[styles.inputStyles]}
                           value={ISBN}
                           keyboardType="number-pad"
                           onChangeText={(text) => setISBN(text)}/>
                <Text style={styles.textStyles}>Image URL:</Text>
                <TextInput style={[styles.inputStyles]}
                           value={image}
                           onChangeText={(text) => setImage(text)}/>
                <Text style={styles.textStyles}>Copies Owned:</Text>
                <TextInput style={[styles.inputStyles]}
                           value={copies}
                           keyboardType="number-pad"
                           onChangeText={(text) => setCopies(text)}/>
            </ScrollView>
            <Button title="Edit Book" color="green"
                    onPress={()=> {
                        datasource[route.params.index].title = title;
                        datasource[route.params.index].isbn = ISBN;
                        datasource[route.params.index].image = image;
                        datasource[route.params.index].copies = copies;
                        navigation.navigate('Home');
                    }}
            />
            <Button title="Delete Book" color="red"
                    onPress={()=> {
                        Alert.alert("Warning!","Are you sure you want to delete" +
                            title + " from the library?",
                            [{text: "Yes", onPress: () => {
                                datasource.splice(route.params.index, 1);
                                navigation.navigate('Home');
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
