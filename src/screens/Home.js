import React,{useState} from "react"
import { Text,View, StyleSheet, TextInput, Dimensions, Button } from "react-native";
import Modal from "react-native-modalbox";
const {width, height} = Dimensions.get("window");
function Home() {
    const [name, setName] = useState();
    const [showModal, setShowModa] = useState(false)
    const getModal = () => {
        return (
            <Modal entry="bottom" backdropPressToClose={true}
                isOpen={showModal} style={styles.modalbox}
                onClosed={()=> setShowModa(false)}>
                    <Text>name</Text>
                </Modal>
        )
    }
    return (

        <View>
            <TextInput
                style={styles.input}
                onChangeText={ name => setName(name)}
                defaultValue={name}
      />
      <Text>{name}</Text>
      <Button onPress={() => setShowModa(true)} title="press me"/>
        </View>
        
    )
}
const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    modalbox: {
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        height: "200",
        width:"200",
        backgroundColor: "grey"
    }
  });

export default Home


