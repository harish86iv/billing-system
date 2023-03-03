import  React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';


export const navigationRef = React.createRef<NavigationContainerRef>();

const navigate =  (name: string, params?: any) =>{
  console.warn(navigationRef)
  navigationRef.current?.navigate(name, params);
}

export const goBack = () => {
  navigationRef.current?.goBack();
}

export default navigate;

