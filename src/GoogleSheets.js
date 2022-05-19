import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Button,
  Modal,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {convertToArrayOfObjects} from './utils';
import {access_token, appData} from './constants/api';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Item = ({model, make, type, year, hp}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{model}</Text>
    <Text style={styles.title}>{make}</Text>
    <Text style={styles.title}>{type}</Text>
    <Text style={styles.title}>{year}</Text>
    <Text style={styles.title}>{hp}</Text>
  </View>
);

const HeaderView = props => {
  return (
    <View style={{width: '20%'}}>
      <View
        style={[
          styles.searchDataContainer,
          {
            borderTopLeftRadius: props.index == 0 ? 8 : 0,
            borderTopRightRadius: props.index == 3 ? 8 : 0,
          },
        ]}>
        <Text style={styles.titleText}>{props.data}</Text>
      </View>
    </View>
  );
};
const GoogleSheets = ({route}) => {
  const [model, setModel] = useState('AUDI R8');
  const [make, setMake] = useState('AUDI');
  const [type, setType] = useState('SEDAN');
  const [year, setYear] = useState('2020');
  const [hp, setHP] = useState('2000');
  const [APIData, setAPIData] = useState('');
  const [head, setHead] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const [text, onChangeText] = React.useState('Useless Text');
  console.log(route.params.item);
  console.log('appdata', appData.token);
  const SHEET_ID = route.params.item.id;
  const ACCESS_TOKEN = appData.token;

  const onSubmit = () => {
    axios
      .post(
        'https://sheet.best/api/sheets/2cd94ba7-cebc-48a2-884d-353ef48f49a0',
        model,
        make,
        type,
        year,
        hp,
      )
      .then(response => console.log('Data Stored Successfully', response))
      .catch(error => console.log('Error', error));
  };

  const modalView = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <Text style={styles.textStyle}>Model</Text>
                  <Text style={styles.textStyle}>Make</Text>
                  <Text style={styles.textStyle}>TYPE</Text>
                  <Text style={styles.textStyle}>Year</Text>
                  <Text style={styles.textStyle}>HP</Text>
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={text => setModel(text)}
                    value={model}
                  />
                  <TextInput
                    style={styles.input}
                    onChangeText={text => setMake(text)}
                    value={make}
                  />
                  <TextInput
                    style={styles.input}
                    onChangeText={text => setType(text)}
                    value={type}
                  />
                  <TextInput
                    style={styles.input}
                    onChangeText={text => setYear(text)}
                    value={year}
                  />
                  <TextInput
                    style={styles.input}
                    onChangeText={text => setHP(text)}
                    value={hp}
                  />
                </View>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text>Hide Modal</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={appendValues}>
                <Text>Submit</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  const appendValues = () => {
    setModalVisible(!modalVisible);
    let params = {
      valueInputOption: 'USER_ENTERED',
    };
    let query = Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
    let url =
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A:Z:append?` +
      query;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //update this token with yours.
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        values: [[`${model}`,`${make}`,`${type}`,`${year}`,`${hp}`]],
      }),
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  };
  useEffect(() => {
    console.log('sheet id', SHEET_ID);
    console.log('access token', ACCESS_TOKEN);
    axios
      .get(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A:Z  `,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        },
      )
      .then(response => {
        console.log(response.data.values);
        setAPIData(response.data.values);
      })
      .catch(error => {
        console.log('Error', error);
      });
  }, []);

  console.log(head);

  return (
    <View style={styles.dataView}>
      <ScrollView>
        {APIData.length > 0 ? (
          APIData.map((item, index) => (
            <View key={index}>
              <View
                style={{
                  paddingHorizontal: 10,
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                {item.map((titem,tindex) => (
                  <Text key={tindex} style={styles.titleText}>{titem}</Text>
                ))}
              </View>
            </View>
          ))
        ) : (
          <View style={styles.noRecordView}>
            <Text style={styles.noRecordText}>{'No Record Found'}</Text>
          </View>
        )}
      </ScrollView>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
      {modalView()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 12,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    margin: 10,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  dataView: {
    width: '100%',
    // marginBottom: 220,
    // backgroundColor: 'white',
    // marginTop: 15,
    // borderRadius: 8,
    // elevation: 2,
  },
  searchDataContainer: {
    backgroundColor: 'white',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: 'blue',
    fontSize: 12,
    // lineHeight: 17,
    // textAlign: 'center',
  },
  valueContainer: {
    height: 40,
    justifyContent: 'center',
  },
  // textStyle: {
  //   color: 'gray',
  //   textAlign: 'center',
  //   fontSize: 12,
  //   lineHeight: 14,
  // },
  viewStyle: {
    width: '20%',
  },
  noRecordView: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  noRecordText: {
    color: 'black',
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'cyan',
    borderRadius: 20,
    padding: 80,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    height: 40,
    margin: 12,
    // borderWidth: 1,
    padding: 10,
    // backgroundColor: 'white',
  },
  modalText: {
    // marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    // borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});
export default GoogleSheets;
