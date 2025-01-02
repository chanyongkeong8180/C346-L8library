import {useState} from 'react';
import {View, ScrollView, Text, TextInput, Button, StyleSheet} from 'react-native';
import {datasource} from "./Data.js";

const Add = ({navigation}) => {
    const [title, setTitle] = useState('');
    const [ISBN, setISBN] = useState('0');
    const [image, setImage] = useState('');
    const [copies, setCopies] = useState('0');
    return (
        <View style={styles.container}>
            <ScrollView>
            <Text style={styles.textStyles}>Title:</Text>
            <TextInput style={styles.inputStyles}
                       onChangeText={(text) => setTitle(text)}/>
            <Text style={styles.textStyles}>ISBN:</Text>
            <TextInput style={[styles.inputStyles]}
                       keyboardType="number-pad"
                       onChangeText={(text) => setISBN(text)}/>
            <Text style={styles.textStyles}>Image URL:</Text>
            <TextInput style={[styles.inputStyles]}
                       onChangeText={(text) => setImage(text)}/>
            <Text style={styles.textStyles}>Copies Owned:</Text>
            <TextInput style={[styles.inputStyles]}
                       keyboardType="number-pad"
                       onChangeText={(text) => setCopies(text)}/>
            </ScrollView>
            <Button title="Add Book" color="green"
                    onPress={()=> {
                        let item = {title:title, isbn:ISBN, image:image, copies:copies};
                        datasource.push(item);
                        navigation.navigate('Home');
                    }
                    }
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
