import React, {Component,useRef} from 'react';
import {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import MultiSelect from 'react-native-multiple-select';

// const items = [
//   {
//     id: '92i3adijs7yta',
//     name: 'Ondo',
//   },
//   {
//     id: '92iijq2s71yta',
//     name: 'Onedo',
//   },
//   {
//     id: '922iij2es7yta',
//     name: 'Onedo',
//   },

//   {
//     id: 'seee',
//     name: 'Onddo',
//   },
//   {
//     id: '92i2ssij2s7yta',
//     name: 'Ond1o',
//   },
// ];

const MultiSelectExample = (props) => {
  const {label, onChangeText, data} = props;
  const list=data['data'];
  const [items,setItems]=useState([]);

  const [value, setValue] = useState([]);

  const onChange = (text, e) => {

    setValue(text);
    onChangeText(text.toString());
  };
  const onClear = (text, e) => {
    setValue([]);
    onChangeText('');
  };

  useEffect(()=>{
    setItems(list);
  },[list])



  const onfocus = () => {};
  const defaultProps = {onFocus: onfocus};
  return (
    <View>
      <MultiSelect
        hideTags
        
        single={true}
        items={items}
        uniqueKey="id"
        onSelectedItemsChange={onChange}
        selectedItems={value}
        selectText={label}
        searchInputPlaceholderText="Search Items..."
        onChangeInput={(text) => console.log(text)}
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        hideSubmitButton={true}
        fixedHeight={true}
        styleDropdownMenu={styles.autoComplete}
        styleDropdownMenuSubsection={styles.styleDropdownMenuSubsection}
        styleInputGroup={styles.inputGroup}
        searchIcon={false}
        styleItemsContainer={styles.dropDown}
        styleSelectorContainer={styles.styleSelectorContainer}
        styleRowList={styles.styleRowList}
        styleTextDropdown={styles.styleTextDropdownSelected}
        styleTextDropdownSelected={styles.styleTextDropdownSelected}
        styleListContainer={styles.styleListContainer}
        styleMainWrapper={styles.styleMainWrapper}
        textInputProps={defaultProps}
        onClearSelector={onClear}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  autoComplete: {
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    height: 'auto',
    borderRadius: 4,
  },
  styleItemsContainer: {},
  styleMainWrapper: {},
  inputGroup: {
    width: 300,

    borderWidth: 1,
  },
  dropDown: {
    width: 300,
  },

  styleSelectorContainer: {
    height:'auto',
    
  },
  styleTextDropdownSelected: {
    fontWeight: '500',
    paddingLeft: 18,
  },
});

export default MultiSelectExample;
