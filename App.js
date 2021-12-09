import React, { useState } from "react";
import { View, StatusBar, FlatList,Text } from "react-native";
import styled from "styled-components";
import AddInput from './src/components/AddInput'
import TodoList from "./src/components/TodoList";
import Header from "./src/components/Header";
import Empty from "./src/components/Empty";
export default function App() {
 const [data, setData] = useState([]);

 const submitHandler = (value) => {
  setData((prevTodo) => {
    return [
      {
        value: value,
        key: Math.random().toString(),
      },
      ...prevTodo,
    ];
  });

};
const deleteItem = (key) => {
  setData((prevTodo) => {
    return prevTodo.filter((todo) => todo.key != key);
  });
};
  
const [value, setValue] = useState("");

const onChangeText = (text) => {
  setValue(text);
};


const InputComponentContainer = styled.View`
flex-direction: row;
`;

const InputContainer = styled.View`
flex-direction: row;
border-radius: 10px;
`;

const Input = styled.TextInput`
font-size: 20px;
background-color: white;
width: 300px;
margin-right: 20px;
padding: 10px;
margin-bottom: 20px;
border-radius: 10px;
`;

const SubmitButton = styled.TouchableOpacity`
width: 50px;
justify-content: center;
align-items: center;
background-color: whitesmoke;
margin-bottom: 20px;
border-radius: 50px;
`;

 return (
  <ComponentContainer>
  <View>
    <StatusBar barStyle="light-content" 
      backgroundColor="midnightblue" />
  </View>
  <FlatList
            data={data}
            ListHeaderComponent={() => <Header />}
            ListEmptyComponent={() => <Empty />}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <TodoList item={item} deleteItem={deleteItem} />
            )}
          />
  <View>
    <View keyboardShouldPersistTaps={'always'}>
   
    <InputComponentContainer>
      <InputContainer>
        <Input placeholder="Add Task..." 
        onChangeText={onChangeText}
        // onChangeText={name => setValue(name)}
        keyboardShouldPersistTaps={'always'} 
        defaultValue={value}/>
      </InputContainer>
      <SubmitButton
        onPress={() => {
            setValue(submitHandler(value));
          }}
      >
        <Text>Submit</Text>
      </SubmitButton>
    </InputComponentContainer>
    </View>
  </View>
</ComponentContainer>
    );
}

const ComponentContainer = styled.View`
  background-color: midnightblue;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
