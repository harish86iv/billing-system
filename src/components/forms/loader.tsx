import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import AppStyles from "../config/styles";
const primaryColor=AppStyles.color.COLOR_PRIMARY


const loader = (props) => {
  const {visible,animation,color}=props;
  return (
    <Spinner animation={animation?animation:'none'} visible={visible?visible:false} color={color?color:primaryColor}/>
  )
}

export default loader;
