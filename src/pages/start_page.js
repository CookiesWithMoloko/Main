import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";

export default class StartPage extends React.Component{
    render(){
        const styles = StyleSheet.create({
            image: {
                width:"16.5%",
                height:"8.5%",
                marginTop:7,
                marginStart:5
            },
            imagelogo: {
                width:"60%",
                height:"60%",
                marginTop:7,
                marginStart:70
            }
        });
        return(
            <View style={{backgroundColor: '#1F8384', height:"100%", width:"100%" }}> 
                <Image source={require('../images/logo.png')} style={styles.image} /> 
                <Image source={require('../images/ictis.png')} style={styles.imagelogo} />
                <SignIN text='Войти' onPress={() => this.props.navigation.navigate('AuthPage')}/>
                <Regestration text='Зарегистрироваться' onPress={() => this.props.navigation.navigate('RegisterPage')}/>
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
  function Regestration({ text, onPress }) {
    return(
    <TouchableOpacity onPress={onPress}>
          <View style={regbtn.button}>
              <Text style={regbtn.buttonText}>{text}</Text>
          </View>
      </TouchableOpacity>);
    }
  const logbtn = StyleSheet.create({
    button: {
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 10,
        backgroundColor: '#fc0',
        marginVertical:10
    
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
    }
  });
  const regbtn = StyleSheet.create({
    button: {
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        marginHorizontal:80,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
    }
  });