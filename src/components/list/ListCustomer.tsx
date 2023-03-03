import React, {useEffect, useState} from 'react';
import FlatIcon from '../Flaticon/FlatIcon';
import {View, FlatList, RefreshControl, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import axios from 'axios';
import {API_ROOT} from '../../constants';
import {getConfigForHeader} from '../../utilities/utilities';
import {API_ID_FOR_CUSTOMER} from '../screens/constants';
import {pathOr} from 'ramda';
import Spinner from 'react-native-loading-spinner-overlay';
const ListCustomer = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [value, setValue] = useState([]);
  useEffect(() => {
    loadCustomer();
    const subscribe = navigation.addListener('focus', () => {
      loadCustomer();
    });

    return subscribe;
  }, []);

  const loadCustomer = async () => {
    setLoader(true);
    axios
      .get(
        `${API_ROOT}/customername/all`,
        getConfigForHeader(API_ID_FOR_CUSTOMER),
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

  const removeCustomer = async (id: any) => {
    setLoader(true);
    axios
      .delete(
        `${API_ROOT}/customername/${id}`,
        getConfigForHeader(API_ID_FOR_CUSTOMER),
      )
      .then((res) => {
        loadCustomer();
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err, 'err');
      });
  };

  const handleFloatingIcon = () => {
    navigation.navigate('customerScreen');
  };

  const renderList = (customer) => {
    return (
      <View>
        <Spinner visible={loader} />

        <Card style={styles.container}>
          <Card.Content>
            <Title>{customer.customer_name}</Title>
            <Paragraph>{customer.customer_phone_number}</Paragraph>
            <Paragraph>{customer.customer_imei_number}</Paragraph>
          </Card.Content>

          <Card.Actions>
            <Button
              onPress={() =>
                navigation.navigate('customerScreen', {id: customer.id})
              }>
              Edit
            </Button>
            <Button onPress={() => removeCustomer(customer.id)}>Remove</Button>
          </Card.Actions>
        </Card>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={value}
        renderItem={({item}) => renderList(item)}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadCustomer} />
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
  }

});

export default ListCustomer;
