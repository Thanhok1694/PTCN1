import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth';
const ManCaiDat = () => {
    const navigation=useNavigation();
    const signOutUser = () => {
        auth()
          .signOut()
          .then(() => navigation.navigate('DangNhapScreen'));
      };
  return (
    <View style={{flex:1,backgroundColor:'#F7EAA6'}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.navigate('TrangChuScreen') }}>
          <Image style={{ marginTop: 15, marginLeft: 20 }} source={require('../img/Back.png')} />
        </TouchableOpacity>
        <Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold', color: 'black', marginLeft: 140 }}>Cài đặt</Text>
      </View>
      <View style={{marginTop:30,padding:10,alignItems:'center'}}>
      <TouchableOpacity style={styles.o}>
       <Image source={require('../img/Khoa.png')} />
       <Text style={{fontSize:20,marginLeft:20,fontWeight:'bold',color:'black'}}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={signOutUser} style={styles.o}>
       <Image source={require('../img/DangXuat.png')} />
       <Text style={{fontSize:20,marginLeft:20,fontWeight:'bold',color:'black'}}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default ManCaiDat

const styles = StyleSheet.create({
    header: {
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        flexDirection: 'row',
      },
      o:{
        height:40,
        width:'80%',
        backgroundColor:'#BBBBBB',
        borderRadius:10,
        borderColor:'black',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginTop:10
      }
})