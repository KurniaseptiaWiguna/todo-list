import React,{useState} from "react";
import { View } from "react-native";
import { MaterialIcons,Entypo, Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import axios from "axios";

export default function TodoList({ item, deleteItem, editItem ,updateStatus}) {
  const dueDate = new Date();
  console.log(item)
  return (
    <ComponentContainer>
      <ListContainer >
        {item.status == "done" ?
          <IconContainer onPress={() => updateStatus({
            id: item.id,
            status: "not-done"
          })}>
            <Ionicons name="checkmark-done-circle" size={25} color="green" />
          </IconContainer>
          : 
          <IconContainer onPress={() => updateStatus({
            id: item.id,
            status: "done"
          })}>
            <Entypo name="circle" size={25} color="midnightblue" />
          </IconContainer>
        }
        {/* <IconContainer onPress={() => updateStatus({
          id: item.id,
          status: "done"
        })}>
          <Entypo name="circle" size={25} color="midnightblue" />
        </IconContainer> */}
        <View>
          <TextItem>{item.name}</TextItem>
          <TextDate> {item.date} {item.time}</TextDate>
        </View>
        {/* <IconContainer >
          <Entypo name="edit" size={20} color="midnightblue" />
        </IconContainer> */}
        <IconContainer onPress={() => editItem(item.id)}>
          <Entypo name="edit" size={20} color="rgba(199, 140, 3, 0.95)" />
        </IconContainer>
        <IconContainer onPress={() => deleteItem(item.id)}>
          <MaterialIcons name="delete" size={24} color="rgba(226, 67, 67, 1)" />
        </IconContainer>
      </ListContainer>
    </ComponentContainer>
  );
}

const ListContainer = styled.TouchableOpacity`
  background-color: whitesmoke;
  height: auto;
  width: 370px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const ComponentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
`;

const TextItem = styled.Text`
  color: black;
  width: 230px;
  height: auto;
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
  margin-right: 20px;
  margin-left: 5px;
`;

const TextDate = styled.Text`
  color: black;
  font-size: 14px;
  margin-right: 20px;
  margin-left: 5px;
  border-radius: 10px;
  width: 200px;
`;

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  margin-right: 5px;
  margin-top: 15px;
  height: 40px;

  border-radius: 10px;
`;

const CirlceContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-left: 5px;
`;