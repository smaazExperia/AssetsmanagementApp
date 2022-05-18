import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import axios from 'axios';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';

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
    <View style={{width: '25%'}}>
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
const GoogleSheets = () => {
  const [model, setModel] = useState('');
  const [make, setMake] = useState('');
  const [type, setType] = useState('');
  const [year, setYear] = useState('');
  const [hp, setHP] = useState('');
  const [APIData, setAPIData] = useState('');
  const [head, setHead] = useState([
    'Vehicle Model',
    'Vehicle Make',
    'Body Type',
    'Model Year',
    'Horse Power',
  ]);

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

  // useEffect(() => {
  //   axios
  //     .get('https://sheet.best/api/sheets/2cd94ba7-cebc-48a2-884d-353ef48f49a0')
  //     .then(response => {
  //       console.log('Data', response);
  //       setAPIData(response.data);
  //     })
  //     .catch(error => {
  //       console.log('Error', error);
  //     });
  // }, []);

  const renderItem = ({item}) => (
    <Item
      model={item.Model}
      make={item.Make}
      type={item.Type}
      year={item.Year}
      hp={item.HP}
    />
  );
  return (
    <View style={styles.dataView}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={head}
        numColumns={4}
        renderItem={({item, index}) => (
          <HeaderView data={(item)} index={index} />
  )}
        keyExtractor={(item, index) => index.toString()}></FlatList>

      <ScrollView>
        {APIData.length > 0 ? (
          APIData.map(item => (
            <View style={{paddingHorizontal: 10, flexDirection: 'row'}}>
              <View style={styles.viewStyle}>
                <View style={styles.valueContainer}>
                  <Text style={styles.textStyle}>
                    {moment(item.ddate).format('DD/MM/yyyy')}
                  </Text>
                </View>
              </View>
              <View style={styles.viewStyle}>
                <View style={styles.valueContainer}>
                  
                </View>
              </View>
              <View style={styles.viewStyle}>
                <View style={styles.valueContainer}>
                  {/* {props.violationType == 'Late' ? (
                    <Text style={styles.textStyle}>
                      {moment(item.time_In).format('HH:mm')}
                    </Text>
                  ) : props.violationType == 'Early' ? (
                    <Text style={styles.textStyle}>
                      {moment(item.time_Out).format('HH:mm')}
                    </Text>
                  ) : (
                    <Text style={styles.textStyle}>
                      {moment(item.in_time1).format('HH:mm')}
                    </Text>
                  )} */}
                </View>
              </View>
              <View style={styles.viewStyle}>
                <View style={styles.valueContainer}>
                  {/* {props.violationType == 'Late' ? (
                    <Text style={styles.textStyle}>{item.late}</Text>
                  ) : props.violationType == 'Early' ? (
                    <Text style={styles.textStyle}>{item.early}</Text>
                  ) : (
                    <Text style={styles.textStyle}>
                      {moment(item.out_time1).format('HH:mm')}
                    </Text>
                  )} */}
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.noRecordView}>
            <Text style={styles.noRecordText}>
              {'No Record Found'}
            </Text>
          </View>
        )}
      </ScrollView>
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
    marginBottom: 220,
    backgroundColor: 'white',
    marginTop: 15,
    borderRadius: 8,
    elevation: 2,

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
    lineHeight: 17,
    textAlign: 'center',
  },
  valueContainer: {
    height: 40,
    justifyContent: 'center',
  },
  textStyle: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 14,
  },
  viewStyle: {
    width: '25%',
  },
  noRecordView: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  noRecordText: {
    color: "black",
    fontSize: 18,
  },
});
export default GoogleSheets;
