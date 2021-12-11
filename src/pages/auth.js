import React,{Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, TextInput} from "react-native";


const UselessTextInputLogin = () => {
  const [text, onChangeText] = React.useState(null);
  //const [number, onChangeNumber] = React.useState(null);

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder=" Введите почту"
      />
    </SafeAreaView>
    
  );
};
const UselessTextInputPass = () => {
const [number, onChangeNumber] = React.useState(null);
return (
  <SafeAreaView>
  <TextInput
    style={styles2.input}
    onChangeText={onChangeNumber}
    value={number}
    placeholder=" Введите пароль"
   
/>
</SafeAreaView>
);
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color:'gray',
    backgroundColor:'white',
    marginTop:150
  },
});

const styles2 = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color:'gray',
    backgroundColor:'white',
    marginTop:10
  },
});


export default class AuthPage extends Component {
    render(){
      const styles = StyleSheet.create({
        image: {
        width:"45%",
        height:"55%",
        marginTop:30,
        marginStart:100,
        flex:1,
        // alignItems:'center',
         //resizeMode: 'cover'
          
        },
      });
      return(
        <View style={{backgroundColor: '#1F8384', height:"100%", width:"100%"}}> 
          <Image source={require('../images/logo.png')} style={styles.image} /> 
          <View>
            <UselessTextInputLogin/> 
            <UselessTextInputPass/> 
          </View>
         
          <SignIN text='Авторизация'/>


        </View>

        
      );
    }
};

function SignIN({ text, onPress }) {
    return(
    <TouchableOpacity onPress={onPress}>
          <View style={logbtn.button}>
              <Text style={logbtn.buttonText}>{text}</Text>
          </View>
      </TouchableOpacity>);
  }
  const stylestext = StyleSheet.create({
    text: {
      textAlign: 'center',
      width: '100%',

    }
  });
  
  const logbtn = StyleSheet.create({
    button: {
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 10,
        backgroundColor: '#fc0',
        marginVertical:100
    
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
    }
  });