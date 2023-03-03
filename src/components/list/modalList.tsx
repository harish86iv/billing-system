import {ModalSelectList} from 'react-native-modal-select-list';
import React, {useEffect, useState} from 'react';
import {View,SafeAreaView,Button} from 'react-native';

let modalRef;
const openModal = () => modalRef.show();
const saveModalRef = ref => modalRef = ref;
const onSelectedOption = value => {}
let test=[{label:12,value:"vignesh"}];
const ModalLists = () => {

      return (
        <View>
          <SafeAreaView>
            <Button title="Open Modal" onPress={openModal} />
          </SafeAreaView>
          <ModalSelectList
            ref={saveModalRef}
            placeholder={"Text something..."}
            closeButtonText={"Close"}
            onSelectedOption={onSelectedOption}
            disableTextSearch={false}
            options={test}
            numberOfLines={3}
          />
        </View>
      );

}

export default ModalLists;