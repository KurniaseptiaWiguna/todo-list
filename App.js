import React, { useState,useEffect,useRef } from "react";
import { View, StatusBar, FlatList,Text,TextInput,StyleSheet,KeyboardAvoidingView} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styled from "styled-components";
import { Ionicons } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";

import TodoList from "./src/components/TodoList";
import Header from "./src/components/Header";
import Empty from "./src/components/Empty";
import axios from "axios";

export default function App() {
  
 const [data, setData] = useState([]);
 const [detailData, setDetailData] = useState({});
 const [displayDate, setDisplayDate] = useState("");
 const [date, setDate] = useState("")
 const [isLoading, setIsLoading] = useState(false);
 const [showModal, setShowModal] = useState("");
 const [showDatePicker, setShowDatePicker] = useState(false)
 const refRBSheet = useRef();
 const refNameInput = useRef();
  //state form
  const [form, setForm] = useState({
    name: "",
    due: "",
  })
 const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
  function clearForm(){
    setForm({
      name: "",
      due: "",
    });
  }
const showDate = () => {
  setShowDatePicker(true);
} 
const hideDate = () => {
  setShowDatePicker(false);
}
const handleConfirm = (date) => {
  onChangeText(date, "due")
  setDisplayDate(date);
  hideDate();
}
 const getData = async () => {
   try {
     const response = await axios.get("http://192.168.18.7:5000/api/v1/all")
     setData(response.data.data);
    //  console.log(response.data.data)
    // console.log("api")
   } catch (error) {
     console.log(error)
   }
 }


const onChangeText = (input, type) => {
  setForm({
    ...form,
    [type]: input
  });
};
const addTodo =async (e) => { //submit function
  try {
    e.preventDefault();
    const data = JSON.stringify(form);
    const response = await axios.post(
      "http://192.168.18.7:5000/api/v1/add",data,config);
    clearForm();
    setDisplayDate("")
    getData();
  } catch (error) {
    console.log(error)
  }
}
const deleteTodo = async (e) => {
  const data = JSON.stringify(form)
  console.log( data)
  try {
    console.log(data)
    const response = await axios.delete(`http://192.168.18.7:5000/api/v1/delete/${e}`);
    getData();
  } catch (error) {
    console.log(error)
  }
}

const editTodo = async (e) => {
  await console.log(e)
  clearForm();
  refRBSheet.current.open();
  setShowModal("edit");
  try {
    const response = await axios.get(`http://192.168.18.7:5000/api/v1/detail/${e}`)
    console.log(response.data.data)
    setDetailData(response.data.data)
    setDisplayDate(response.data.data.due)
    setForm({
      name: detailData.name,
      due: detailData.due
    })
  } catch (error) {
    console.log(error)
  }
}
const updateTodo = async (e) => {
  const data = JSON.stringify(form)
  
  console.log(form)
  const response = await axios.patch(`http://192.168.18.7:5000/api/v1/update/${detailData.id}`,
      data, config
  )
  getData();
}
const updateStatus = async (e) => {
  const id = await e.id;
  const form = await {
    status: e.status
  }
  const data = JSON.stringify(form)
  console.log(form)
  const response = await axios.patch(`http://192.168.18.7:5000/api/v1/update/${id}`,
      data, config
  )
  getData();
}
  useEffect(() => {
    getData();
    setDisplayDate("")
  }, [])
  useEffect(() => {
  //  console.log(form)
  }, [form])
  
 return (
  // <ComponentContainer>
  <KeyboardAvoidingView>
    <StatusBar barStyle="light-content" />
     <Header/>
  <View>
  <View style={{height:580}}>
         {data.length < 1 ? 
        <Empty/>
        :
        <FlatList
          data={data}
          refreshing={isLoading}
          onRefresh={getData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoList item={item} deleteItem={deleteTodo} editItem={editTodo} updateStatus={updateStatus}/>
          )}
        />   
    }
    </View>
    <View >
    {/* <Button title="+" onPress={() => {refRBSheet.current.open() && refNameInput.current.focus(); }} /> */}
    {/* <Button title="add" onPress={() => {refRBSheet.current.open()}} style={{float:"right"}}></Button> */}
    <View style={{alignItems: "flex-end"}}>
      <AddButton onPress={() => {
        refRBSheet.current.open();
        setForm({
          name: "",
          due: "",
        }); 
        setShowModal("add")
        } } 
        style={{float:"right"}}
        >
        <AddSimbole>+</AddSimbole>
      </AddButton>
    </View>
    
      <RBSheet
        ref={refRBSheet}
        height={200}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          
          wrapper: {
            backgroundColor: "rgba(85, 85, 85, 0.2)"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        {
          showModal == "add"? 
            <>
              <TextInput placeholder="add task" ref={refNameInput}  onChangeText={(input) => onChangeText(input,"name")} defaultValue={form.name} style={style.input}></TextInput>
              
              <InputComponentContainer>
              
                <DueButton title="due date" onPress={showDate}>
                  <Text style={{color: "white"}}>due date</Text>
                </DueButton>
                <Text>{displayDate.toString()}</Text>
              </InputComponentContainer>
                <DateTimePickerModal
                isVisible={showDatePicker}
                mode="datetime"
                locale="id_ID"
                date={new Date()}
                onConfirm={handleConfirm}
                onCancel={hideDate}
                />
                <IconContainer onPress={addTodo} style={style.submit}>
                  <Ionicons name="md-send-sharp" size={30} color="green" />
                </IconContainer>
            </>
          :
          <>
          <TextInput placeholder="edit title" ref={refNameInput}  onChangeText={(input) => onChangeText(input,"name")} defaultValue={detailData.name} style={style.input}></TextInput>
          
          <InputComponentContainer>
          
            <DueButton title="due date" onPress={showDate}>
              <Text style={{color: "white"}}>due date</Text>
            </DueButton>
            <Text>{displayDate.toString()}</Text>
          </InputComponentContainer>
            <DateTimePickerModal
            isVisible={showDatePicker}
            mode="datetime"
            locale="id_ID"
            date={new Date()}
            onConfirm={handleConfirm}
            onCancel={hideDate}
            />
          <IconContainer onPress={updateTodo} style={style.submit}>
            <Ionicons name="md-send-sharp" size={30} color="green" />
          </IconContainer>
        </>
        }
      </RBSheet>
      
    </View>
  </View>
  </KeyboardAvoidingView>
  
    );
}
const InputComponentContainer = styled.View`
flex-direction: row;
`;

const InputContainer = styled.View`
flex-direction: row;
border-radius: 10px;
`;

const AddButton = styled.TouchableOpacity`
width: 70px;
height: 70px;
margin-right: 20px;
justify-content: center;
align-items: center;
background-color: midnightblue;
margin-bottom: 20px;
border-radius: 50px;

`;
const AddSimbole = styled.Text`
color:white;
font-size: 30px;
`;

const DueButton = styled.TouchableOpacity`
  width: 70px;
  height: 30px;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  background-color: midnightblue;
`;
const ComponentContainer = styled.View`
  background-color: midnightblue;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
const style = StyleSheet.create({
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding:10,
  },
  submit: {
    marginRight: 20,
    alignSelf: "flex-end"
  }
});
