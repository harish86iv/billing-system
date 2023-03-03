import React, {useEffect, useState} from 'react';
import FlatIcon from '../Flaticon/FlatIcon';
import {View, FlatList, RefreshControl, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import axios from 'axios';
import {API_ROOT} from '../../constants';
import {getConfigForHeader} from '../../utilities/utilities';
import {API_ID_FOR_SERVICE} from '../screens/constants';
import {pathOr} from 'ramda';
import Spinner from 'react-native-loading-spinner-overlay';
import {formatDate} from '../config/Format';
const ListService = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [value, setValue] = useState([]);
  useEffect(() => {
    loadService();
    const subscribe = navigation.addListener('focus', () => {
      loadService();
    });

    return subscribe;
  }, []);

  const loadService = async () => {
    setLoader(true);
    axios
      .get(
        `${API_ROOT}/services/all`,
        getConfigForHeader(API_ID_FOR_SERVICE),
      )
      .then((res) => {
        const data = pathOr([], ['data', 'results'], res);
        console.log("🚀 ~ file: serviceList.tsx ~ line 35 ~ .then ~ data", data)
        setLoader(false);
  
        setValue(data);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err, 'err');
      });
  };

  const removeService = async (id: any) => {
    setLoader(true);
    axios
      .delete(
        `${API_ROOT}/service/${id}`,
        getConfigForHeader(API_ID_FOR_SERVICE),
      )
      .then((res) => {
        loadService();
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err, 'err');
      });
  };

  const handleFloatingIcon = () => {
    navigation.navigate('service');
  };

  const renderList = (service:any) => {
    const serviceid=pathOr('',['id'],service);
    const serviceCharge=pathOr('',['service_charge'],service)
    const serviceName=pathOr('',['service_name'],service)
    const serviceDate=pathOr('',['service_date'],service)
    const customerName=pathOr('',['customer_id','customer_name'],service)
    return (
      <View>
        <Spinner visible={loader} />

        <Card style={styles.container}>
          <Card.Content>
            <Title>{service.service_name}</Title>
            <Paragraph>{serviceName}</Paragraph>
            <Paragraph>{formatDate(serviceDate)}</Paragraph>
            <Paragraph>{customerName}</Paragraph>
          </Card.Content>

          <Card.Actions>
            <Button
              onPress={() =>
                navigation.navigate('service', {id:serviceid})
              }>
              Edit
            </Button>
            <Button onPress={() => removeService(serviceid)}>Remove</Button>
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
          <RefreshControl refreshing={refreshing} onRefresh={loadService} />
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

export default ListService;
