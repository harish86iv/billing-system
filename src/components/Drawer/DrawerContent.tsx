import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, StyleSheet, Image } from "react-native";
 import CustomDrawerItem from "./CustomDrawerItem";
import { Drawer, List } from "react-native-paper"; 
import Icon from 'react-native-vector-icons/FontAwesome';
import style from '../config/styles';

const DrawerContent = (props: any) => {
  const CustomNavigation = (page: string) => {
    return props.navigation.navigate(page);
  };
  const AppStyle = style.color;

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <Drawer.Section style={styles.drawerSection}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../../public/assets/hello-mobiles.png")}
              style={styles.Logo}
            />
          </View>

          <CustomDrawerItem
            ItemLabel="Home"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("home")}
             labelStyle={styles.labelStyle}
             ItemIcon={() => <Icon name="home" color={AppStyle.COLOR_PRIMARY} size={20} />}
          /> 
          <CustomDrawerItem
            ItemLabel="Mobile"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("mobilelist")}
             labelStyle={styles.labelStyle} 
             ItemIcon={() => <Icon name="mobile" color={AppStyle.COLOR_PRIMARY} size={20} />}
          />
          <CustomDrawerItem
            ItemLabel="Mobile Model"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("mobile_model")}
             labelStyle={styles.labelStyle}
             ItemIcon={() => <Icon name="home" color={AppStyle.COLOR_PRIMARY} size={20} />}
          />
          <CustomDrawerItem
            ItemLabel="Item"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("item")}
             labelStyle={styles.labelStyle}
             ItemIcon={() => <Icon name="home" color={AppStyle.COLOR_PRIMARY} size={20} />}
          />
          <CustomDrawerItem
            ItemLabel="Service"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("servicelist")}
             labelStyle={styles.labelStyle}
             ItemIcon={() => <Icon name="wrench" color={AppStyle.COLOR_PRIMARY} size={20} />}
          />
           <CustomDrawerItem
            ItemLabel="Customer"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("customerlist")}
             labelStyle={styles.labelStyle}
             ItemIcon={() => <Icon name="user" color={AppStyle.COLOR_PRIMARY} size={20} />}
          />
          <CustomDrawerItem
            ItemLabel="Report"
            ItemStyle={styles.label}
            ItemEvent={() => CustomNavigation("report")}
             labelStyle={styles.labelStyle}
             ItemIcon={() => <Icon name="file-pdf-o" color={AppStyle.COLOR_PRIMARY} size={20} />}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  );
};

//Styles for  DrawerItems
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },

  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  drawerSection: {
    marginTop: 0,
  },

  label: {
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  labelInside: {
    fontFamily: "Roboto",
    left: 70,
    color: "black",
  },
  labelStyle: {
    fontWeight: "bold",
    color: "black",
  },
  listAccordion: {
    right: 8,
  },
  Logo: {
    height: 150,
    width: 300,
    marginTop: -5,
  },
});

export default DrawerContent;