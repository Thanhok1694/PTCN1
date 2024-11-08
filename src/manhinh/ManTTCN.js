import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ManTTCN = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const layDulieu = async () => {
      try {
        const currentUser = auth().currentUser;
        console.log(currentUser);
        if (currentUser) {
          const userId = currentUser.uid;
          const userDoc = await firestore().collection('user').doc(userId).get();
          if (userDoc.exists) {
            setUsers(userDoc.data());
          }
        }
      } catch (error) {
        console.error('Lỗi: ' + error);
      }
    }
    layDulieu();
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#F7EAA6' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.navigate('TrangChuScreen') }}>
          <Image style={{ marginTop: 15, marginLeft: 20 }} source={require('../img/Back.png')} />
        </TouchableOpacity>
        <Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold', color: 'black', marginLeft: 100 }}>Thông tin cá nhân</Text>
      </View>
      
      
      {users && (
          <>
          <View>
          <View style={{ padding: 10, marginTop: 10, flexDirection: 'row' }}>
          <Image
              source={{ uri: users.anh }}
              style={{ height: 150, width: 150, borderRadius: 80, position: 'relative',borderColor:'black',borderWidth:1 }}
            />
            <TouchableOpacity style={{ position: 'absolute', left: 110, top: 120 }}>
              <Image
                source={require('../img/Mayanh.png')}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 21, color: 'black', marginTop: 120, fontWeight: 'bold' }}>{users.hoten}</Text>
          </View>
          <TouchableOpacity style={styles.nut} onPress={()=>{navigation.navigate('SuaTTCNScreen')}}>
            <Image source={require('../img/But.png')}/>
           <Text style={{color:'black',fontSize:20,marginLeft:10}}>Chỉnh sửa thông tin cá nhân</Text>
          </TouchableOpacity>
          <View style={{marginTop:30,padding:10,width:'100%'}}>
           <View style={styles.o}>
           <Text style={{fontSize:21,color:'black',fontWeight:'bold'}}>Năm sinh: {users.namsinh}</Text>
           </View>
           <View style={styles.o}>
           <Text style={{fontSize:21,color:'black',fontWeight:'bold'}}>Đang học tại: {users.danghoc}</Text>
           </View>
           <View style={styles.o}>
           <Text style={{fontSize:21,color:'black',fontWeight:'bold'}}>Sở thích: {users.sothich}</Text>
           </View>
           <View style={styles.o}>
           <Text style={{fontSize:21,color:'black',fontWeight:'bold'}}>Quê quán: {users.quequan}</Text>
           </View>
            
            
           
          </View>
          </View>
          </>
       )}
      </View>
       
    
  )
}

export default ManTTCN

const styles = StyleSheet.create({
  header: {
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  nut:{
    borderColor:'black',
    borderWidth:1,
    borderRadius:10,
    height:45,
    width:'90%',
    backgroundColor:'#E2B9B9',
    marginLeft:20,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    marginTop:15
  },
  o:{
    height:'auto',width:'100%',backgroundColor:'#BBBBBB',borderWidth:1,justifyContent:'center',paddingLeft:10,borderRadius:10,
    marginTop:10
  }
})
