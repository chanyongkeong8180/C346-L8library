import {useState} from 'react';
import {View, ScrollView, Text, TextInput, Button, StyleSheet} from 'react-native';
import {datasource} from "./Data.js";

const Edit = ({navigation}) => {
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
            <Button title="Edit item" color="green"
                    onPress={()=> {
                    }
                    }
            />
            <Button title="Delete item" color="red"
                    onPress={()=> {
                    }
                    }
            />
        </View>
    );
}

export default Edit;

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
