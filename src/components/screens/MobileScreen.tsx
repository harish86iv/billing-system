import {
  validateContent,
  validateLength,
} from '../forms/Validation';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Forms from '../forms/Forms';
import Spinner from '../forms/loader';
import {pathOr} from 'ramda';
import axios from 'axios';
import {API_ROOT} from '../../constants'
import { getConfigForHeader } from '../../utilities/utilities';
import { API_ID_FOR_MOBILE_NAME } from './constants';

const MobileScreen = ({navigation, route}) => {
  const itemid = pathOr('', ['params', 'id'], route);
  const [loadedData, setLoadedData] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (itemid) console.log(itemid);
    fetchSingleReord(itemid);
  }, [itemid]);

  const fetchSingleReord = async (id) => {
    setLoader(true)
    axios
    .get(
      `${API_ROOT}/mobilename/${id}`,
      getConfigForHeader(API_ID_FOR_MOBILE_NAME),
    )
    .then((res) => {
      const data = pathOr([], ['data'], res);
      setLoadedData(data);
      setLoader(false);
    })
    .catch((err) => {
      setLoader(false);
      console.log(err, 'err');
    });
  };

  const mobileSave = (values) => {
    setLoader(true);
    const mobile_name = pathOr('', ['mobile_name'], values);
    const data = {mobile_name};
    if (itemid) {
      axios
        .put(
          `${API_ROOT}/mobilename/${itemid}`,
          data,
          getConfigForHeader(API_ID_FOR_MOBILE_NAME),
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err, 'err');
        });
    } else {
      axios
        .post(
          `${API_ROOT}/mobilename`,
          data,
          getConfigForHeader(API_ID_FOR_MOBILE_NAME),
        )
        .then((res) => {
        })
        .catch((err) => {
          console.log(err, 'err');
        });
    }
    setLoader(false);
  };

  const fields = {
    mobile_name: {
      label: 'mobile Name',
      type: 'text',
      validators: [validateContent, validateLength],
      errorText:'Mobile Name cannot be empty'
    },

  };
  return (
    <View style={{flex: 1}}>
      <Spinner visible={loader} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Mobile</Text>
      </View>
      <Forms
        fields={fields}
        buttonText="Save"
        buttonStyle={{width: 200}}
        action={mobileSave}
        loadedData={loadedData}
        afterSubmit={() => navigation.navigate('mobilelist')}
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

export default MobileScreen;
