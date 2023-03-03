
import AppStyles from '../config/styles';
import {
  validateContent,
  validateImei,
  validateLength,
  validateMobile,
} from '../forms/Validation';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Forms from '../forms/Forms';
import Spinner from '../forms/loader';
import {pathOr} from 'ramda';
import axios from 'axios';
import { API_ROOT } from '../../constants';
import { getConfigForHeader } from '../../utilities/utilities';
import { API_ID_FOR_CUSTOMER, API_ID_FOR_SERVICE } from './constants';

const ServiceScreen = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [loadedData, setLoadedData] = useState({});
  const itemid = pathOr('', ['params', 'id'], route);
  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
    loadCustomer();
    });
    fetchSingleReord(itemid);
  }, [itemid]);

  const loadCustomer = async () => {
    axios
    .get(
      `${API_ROOT}/customername/all`,
      getConfigForHeader(API_ID_FOR_CUSTOMER),
    )
    .then((res) => {
    setSpinner(true);
      const data = pathOr([], ['data','results'], res);
      const customerData=[];
      data.map((x:any,index:number)=>{  
         const customerId=pathOr('', ['id'], x);
         const customerName=pathOr('', ['customer_name'], x);
          const customerDrop={id:customerId,name:customerName}
          customerData[index]=customerDrop
      })  
      setData(customerData)
      setLoadedData(data);
    setSpinner(false);

    })
    .catch((err) => {
      setSpinner(false);

    });
    setSpinner(false);
  
  };


  const fetchSingleReord = async (id) => {
   
  };

  const serviceSave = async (values) => {
    setSpinner(true);
    const customer_id = pathOr('', ['customerName'], values);
    const service_name = pathOr('', ['service_name'], values);
    const service_date = pathOr('', ['service_date'], values);
    const service_charge = pathOr('', ['service_charge'], values);
    const data = {service_name:service_name,service_charge:service_charge,service_date:service_date,customer_id:customer_id}
 
    if (itemid) {
      axios
        .put(
          `${API_ROOT}/services/${itemid}`,
          data,
          getConfigForHeader(API_ID_FOR_SERVICE),
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err, 'err');
        });
    } else {
      axios
        .post(
          `${API_ROOT}/services`,
          data,
          getConfigForHeader(API_ID_FOR_SERVICE),
        )
        .then((res) => {
        })
        .catch((err) => {
          console.log(err, 'err');
        });
    }
    setSpinner(false);
  };
  
    const fields = {
      customerName: {
        type: 'autocomplete',
        label: 'Customer Name',
        data: {data},
        validators: [validateContent],
        inputProps: {
          returnKeyType: 'next',
        },
      },
      service_name: {
        label: 'Service Name',
        type: 'text',
        validators: [validateContent, validateLength],
      },

      service_date: {
        type: 'date',
        label: 'Serviced Date',
        validators: [validateContent],
      },
      service_charge: {
        label: 'Serviced Charge',
        inputProps: {
          keyboardType: 'phone-pad',
          maxLength: 10,
        },
        validators: [validateContent],
      },
    };
    return (
      <View style={{flex: 1}}>
        <Spinner visible={spinner} />
        <View style={styles.header}>
          <Text style={styles.headerText}>Service</Text>
        </View>
        <Forms
          fields={fields}
          buttonText="Save"
          buttonStyle={{width: 200}}
          loadedData={loadedData}
          action={serviceSave}
          afterSubmit={()=>navigation.navigate('servicelist')}
        />
      </View>
    );
  }
  

const styles = StyleSheet.create({
  header: {
    margin: 10,
  },
  headerText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 18,
  },
});

export default ServiceScreen;
