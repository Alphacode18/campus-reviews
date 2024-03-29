import React, { useState, ReactDOM, useReducer } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Layout,
  Text,
  Button,
  Input,
  Select,
  SelectItem,
  IndexPath,
  Icon,
  Card,
  Spinner,
} from '@ui-kitten/components';
import InputScrollView from 'react-native-input-scroll-view';
import { Dimensions } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import Firebase from '../../config/firebase';
import { useScrollToTop } from '@react-navigation/native';
import { render } from 'react-dom';

const types = ['Dining', 'On-Campus Facilities', 'Classes', 'Professors'];

export default loading = ({ navigation, route }) => {
  const index = route.params.index; 
  const postType = route.params.postType;
  const sort = route.params.sort;
  console.log("sort: ");
  console.log(sort);
  const db = Firebase.database();
  let posts = [];
  let fields = [];

  setTimeout(() => {
    db.ref(types[index] + ' ' + postType).on('value', (snapshot) => {
        snapshot.forEach(function (data) {
            posts.push(data.key);
            db.ref(types[index] + ' ' + postType + '/' + data.key).on('value', (snapshot) => {
                snapshot.forEach(function (field) {
                    fields.push(field);
                });
            });
        })
        if (sort == 1) {
          navigation.navigate('Show' + postType, {
              index: index,
              sort: 1,
          });
        } else if (sort == 2) {
          navigation.navigate('Show' + postType, {
            index: index,
            sort: 2,
        });
        } else {
          navigation.navigate('Show' + postType, {
            index: index,
            sort: 0,
        });

        }
        
    });
  }, 2000);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Layout style={styles.container} level={'1'}>
            <Spinner size='small' />
        </Layout>
    </TouchableWithoutFeedback>
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
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
    minWidth: '95%',
    maxWidth: '95%',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
