
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import style from '../config/styles';
const AppStyle = style.color;
  interface Props {
    handleAction:any;
  }
  type CombinedProps = Props;
  const FlatIcon : React.FC<CombinedProps> = (props: any) => {
    const {handleAction}=props;
      return(
        <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() =>handleAction()}
      />
    );
      
  }

  const styles = StyleSheet.create({
    fab: {
      position: "absolute",
      margin: 20,
      right: 0,
      bottom:50,
      backgroundColor: AppStyle.COLOR_PRIMARY,
      
    },
  })
  export default FlatIcon;
