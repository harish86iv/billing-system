import React, {useEffect, useState} from 'react';
import {View, FlatList, RefreshControl, StyleSheet} from 'react-native';
import FlatIcon from '../Flaticon/FlatIcon';

import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Card, Title} from 'react-native-paper';
import {Text} from 'react-native';

import axios from 'axios';
import {API_ROOT} from '../../constants';
import {getConfigForHeader} from '../../utilities/utilities';
import {API_ID_FOR_MOBILE_NAME} from '../screens/constants';
import {pathOr, isEmpty} from 'ramda';
import Spinner from 'react-native-loading-spinner-overlay';
const ListMobile = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [value, setValue] = useState([]);

  useEffect(() => {
    loadMobile();
    const subscribe = navigation.addListener('focus', () => {
      loadMobile();
    });

    return subscribe;
  }, []);

  const handleFloatingIcon = () => {
    console.log('mobile');
    navigation.navigate('mobile');
  };

  const loadMobile = async () => {
    setLoader(true);
    axios
      .get(
        `${API_ROOT}/mobilename/all`,
        getConfigForHeader(API_ID_FOR_MOBILE_NAME),
      )
      .then((res) => {
        const data = pathOr([], ['data', 'results'], res);
        setLoader(false);
        setValue(data);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err, 'err');
      });
  };

  const removeMobile = async (id: any) => {
    setLoader(true);
    axios
      .delete(
        `${API_ROOT}/mobilename/${id}`,
        getConfigForHeader(API_ID_FOR_MOBILE_NAME),
      )
      .then((res) => {
        loadMobile();
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err, 'err');
      });
  };

  const renderList = (mobile) => {
    return (
      <View>
        <Spinner visible={loader} />

        <Card style={styles.container}>
          <Card.Content>
            <Title>{mobile.mobile_name}</Title>
          </Card.Content>

          <Card.Actions>
            <Button
              onPress={() => navigation.navigate('mobile', {id: mobile.id})}>
              Edit
            </Button>
            <Button onPress={() => removeMobile(mobile.id)}>Remove</Button>
          </Card.Actions>
        </Card>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Spinner visible={loader} />
      <FlatList
        data={value}
        renderItem={({item}) => renderList(item)}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadMobile} />
        }
      />
      <FlatIcon handleAction={handleFloatingIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 15,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  itemText: {
    maxWidth: '80%',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default ListMobile;
