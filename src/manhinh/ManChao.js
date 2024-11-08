import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

const ManChao = () => {
    const navigation=useNavigation();
    useEffect(()=>{
        setTimeout(() => {
            navigation.navigate('DangNhapScreen')
        }, 2000);
    })
  return (
    <View style={{flex:1,backgroundColor:'#F7EAA6',justifyContent:'center',alignItems:'center'}}>
      <Image style={{height:250,width:'90%'}} source={{uri:'https://bondtnd.edu.vn/wp-content/uploads/2019/03/c%C3%A1-nh%C3%A2n-t%E1%BB%95-ch%E1%BB%A9c-713x400.png'}} />
      <Text style={{fontSize:23,width:300,textAlign:'center',marginTop:50,fontWeight:'bold'}}>Chào mừng bạn đến với ứng dụng PTCN</Text>
     </View>
  )
}

export default ManChao

const styles = StyleSheet.create({})