import React from 'react';
import { View, StyleSheet} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import DatePicker from './DateField';
import AutoComplete from './AutoCompleteField';
const Field = (props) => {
  const {fieldName, field, value, onChangeText, error, color}=props;
  const fieldType = field.type;
  const renderField = (type: string) => {
    if (type == 'text' || type == '' || type == undefined) {
      return (
        <TextInput
          label={field.label}
          value={value}
          style={styles.input}
          onChangeText={(text) => onChangeText(fieldName, text)}
          mode="outlined"
          theme={{colors: {primary: color, underlineColor: 'transparent'}}}
          {...field.inputProps}
        />
      );
    } else if (type == 'date') {
      return (
        <DatePicker
          style={styles.input}
          label={field.label}
          value={value}
          onDateChange={(text) => onChangeText(fieldName, text)}
          mode="outlined"
          theme={{colors: {primary: color, underlineColor: 'transparent'}}}
          {...field.inputProps}
        />
      );
    }
    else if (type== 'autocomplete'){
      return (
        <AutoComplete  
        style={styles.input} 
        label={field.label}
        value={value} 
        mode="outlined"  
        color={color}
        data={field.data}
        customProps={field.inputProps}
        onChangeText={(text) => onChangeText(fieldName, text)}

        />
      );

    }
  };

  return (
    <View>
      {renderField(fieldType)}
      <HelperText type="error">{error}</HelperText>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
  },
});

export default Field;
