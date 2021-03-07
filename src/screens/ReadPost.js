import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, TextInput, KeyboardAvoidingView, textarea} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Layout, Text, Button, Input, Select, SelectItem, IndexPath, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';

const data = [
    'Dining',
    'On-Campus Facilities',
    'Classes',
    'Professors'
  ];

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back'/>
);

const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon}/>
  );


export default createPost = ({ navigation }) => {
    const [titleState, setTitleState] = useState('');
    const [postState, setPostState] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
    const [notSelected, setNotSelected] = useState(true);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const displayValue = notSelected ? 'Type' : data[selectedIndex.row];

    const changeSelection = (selectedIndex) => {
        setSelectedIndex(selectedIndex);
        setNotSelected(false);
      };

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                <Layout style={styles.container} level={'1'}>
                <TopNavigation
                  title='Back'
                  accessoryLeft={renderBackAction}
                />
                    <ScrollView contentContainerStyle={{flexGrow : 1, width : screenWidth, alignItems: 'center', justifyContent: 'center'}}>

                        <Text category='h1' style={{ padding: 20, marginTop: 0}}> Post Title Here </Text>

                        <Text category='h1' style={{ padding: 20, marginTop: 0 }}> Post text here </Text>

                        <Button style={styles.button} size='medium'> Done viewing post </Button>

                        <Input
                            multiline={true}
                            textStyle={{ minHeight: 256, maxHeight: 256}}
                            style={{width: '90%', paddingTop : 5}}
                            placeholder='Enter text here...'
                            numberOfLines={5}
                            value={"..."}
                            onChangeText={null}
                        />

                        <Button
                           style={{ width: '50%', borderRadius: 20, marginTop: 25 }}
                           status={'success'}
                           onPress={() => navigation.navigate('Home')}
                        >
                        <Text style={{ color: 'white' }}>Create Review</Text>
                        </Button>
                        <TouchableOpacity
                           style={{ color: 'white', marginTop: 40 }}
                           onPress={() => navigation.navigate('Home')}
                        >
                        <Text style={{ textDecorationLine: 'underline' }}>Go Back</Text>
                       </TouchableOpacity>
                    </ScrollView>
                </Layout>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: '90%',
    margin: 0,
    padding: 15,
    fontSize: 16,
    textAlign: 'center',
  },
});
