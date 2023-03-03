import {
  validateContent,
  validateImei,
  validateLength,
  validateMobile,
} from '../forms/Validation';
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Forms from '../forms/Forms';
import Spinner from '../forms/loader';
import {pathOr} from 'ramda';
import axios from 'axios';
import {API_ROOT} from '../../constants'
import { getConfigForHeader } from '../../utilities/utilities';
import { API_ID_FOR_CUSTOMER } from './constants';

const ItemScreen = ({navigation, route}) => {
  const itemid = pathOr('', ['params', 'id'], route);

  const [spinner, setSpinner] = useState(false);
  const [loadedData, setLoadedData] = useState({});

  useEffect(() => {
    if (itemid)
      //  console.log(itemid);
      fetchSingleReord(itemid);
  }, [itemid]);

  const fetchSingleReord = async (id) => {
   
  };

  const customerSave = (values) => {
    
    setSpinner(true);

    const customer_name = pathOr('',['customerName'],values);
    const customer_phone_number = pathOr('',['customerNo'],values);
    const customer_imei_number =  pathOr('',['imei1'],values);

    const data = {customer_name,customer_phone_number,customer_imei_number};

     axios.post(`${API_ROOT}/customername`,data,getConfigForHeader(API_ID_FOR_CUSTOMER))
    .then((res)=>{
     
  }).catch((err)=>{
    console.log(err,"err")
  })
   
    setSpinner(false);
  };

  const fields = {
    customerName: {
      label: 'mobile Name',
      type: 'text',
      validators: [validateContent, validateLength],
    },
    customerNo: {
      label: 'Mobile No',
      type: 'text',
      validators: [validateMobile],
      inputProps: {
        keyboardType: 'phone-pad',
        maxLength: 10,
        returnKeyType: 'next',
      },
    },
    imei1: {
      label: 'IMEI No',
      type: 'text',
      inputProps: {
        keyboardType: 'phone-pad',
        maxLength: 16,
      },
      validators: [validateImei],
    },
  };
  return (
    <View style={{flex: 1}}>
      <Spinner visible={spinner} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Item</Text>
      </View>
      <Forms
        fields={fields}
        buttonText="Save"
        buttonStyle={{width: 200}}
        action={customerSave}
        loadedData={loadedData}
        afterSubmit={() => navigation.navigate('customerlist')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 15,
  },
  headerText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ItemScreen;
