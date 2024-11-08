import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState,useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ManTrangChu = () => {
  const navigation=useNavigation();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth().currentUser;
        console.log(currentUser);
        if (currentUser) {
          const userId = currentUser.uid;
          const userDocument = await firestore().collection('user').doc(userId).get();
          if (userDocument.exists) {
            setUser(userDocument.data());
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
console.log(user);
 if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7EAA6' }}>
        <Text>Loading...</Text>
      </View>
    );
  }
   

  return (
    <View style={{flex:1,backgroundColor:'#F7EAA6'}}>
      <View style={styles.header}>
        <Text style={{margin:10,fontSize:20,fontWeight:'bold',color:'black'}}>Trang chủ</Text>
        <View style={{flexDirection:'row',marginTop:15}}>
        <TouchableOpacity onPress={()=>{
          navigation.navigate('CaiDatScreen')
        }}>
        <Image style={styles.icon} source={require('../img/Vector.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
        <Image style={styles.icon} source={require('../img/Timkiem.png')} />
        </TouchableOpacity>
        </View>
      </View>
      <View style={{justifyContent:'center',alignItems:'center',marginTop:30}}>
       
        <TouchableOpacity onPress={()=>{navigation.navigate('TTCNScreen')}} style={{height:80,width:370,backgroundColor:'#F8D105',borderWidth:0,borderColor:'black',borderRadius:15,justifyContent:'center',alignItems:'center',flexDirection:'row'}} >
        <Image style={{height:60,width:60,borderRadius:30}} source={{uri:user.anh}} />
        <Text style={{fontSize:20,fontWeight:'bold',marginLeft:10,color:'black'}}>{user.hoten}</Text>
        </TouchableOpacity>
        <View>
            <View style={{flexDirection:'row',marginTop:15}}>
            <TouchableOpacity style={styles.cn}>
           <Image  source={require('../img/Banbe.png')} />
           <Text style={styles.chu}>Bạn bè</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('BMIScreen')}} style={styles.cn}>
            <Image  source={require('../img/Traitim.png')} />
            <Text style={styles.chu}>BMI</Text>
            </TouchableOpacity>
            </View>
            
            <View style={{flexDirection:'row',marginTop:15}}>
            <TouchableOpacity style={styles.cn} onPress={()=>{navigation.navigate('TuVanScreen')}}>
            <Image  source={require('../img/Trochuyen.png')} />
            <Text style={styles.chu}>Tư vấn</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('ThienScreen')}} style={styles.cn}>
            <Image  source={require('../img/Matcuoi.png')} />
            <Text style={styles.chu}>Yoga,thiền</Text>
            </TouchableOpacity>
            </View>

            <View style={{flexDirection:'row',marginTop:15}}>
            <TouchableOpacity onPress={()=>{navigation.navigate('BietOnScreen')}} style={styles.cn}>
            <Image  source={require('../img/Bieton.png')} />
            <Text style={styles.chu}>Lời biết ơn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cn}>
            <Image source={require('../img/Chaybo.png')} />
            <Text style={styles.chu}>Vận động thể chất</Text>
            </TouchableOpacity>
            </View>
        </View>
      </View>

      <View style={{backgroundColor:'#EF7B39', height:60,marginTop:65,justifyContent:'space-around',alignItems:'center',flexDirection:'row'}}>
       <TouchableOpacity onPress={()=>{navigation.navigate('TrangChuScreen')}}>
       <Image style={styles.menu} source={require('../img/Nha.png')} />
       </TouchableOpacity>
        <TouchableOpacity>
        <Image style={styles.menu} source={require('../img/Themban.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
        <Image style={styles.menu} source={require('../img/Chaybotrang.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('BietOnScreen')}}>
        <Image  source={require('../img/Bantaytrang.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('BMIScreen')}}>
        <Image  source={require('../img/BMI.png')} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ManTrangChu

const styles = StyleSheet.create({
    header:{
       height:50,
       borderBottomColor:'black',
       borderBottomWidth:1,
       flexDirection:'row',
       justifyContent:'space-between'
    },
    icon:{
        height:21,
        width:21,
        marginRight:15

    },
    cn:{
        height:80,
        width:150,
        backgroundColor:'#F8D105',
        borderWidth:1,
        borderColor:'black',
        borderRadius:10,
        margin:15,
        justifyContent:'center',
        alignItems:'center'
    },
    
    chu:{
        fontSize:16,
        fontWeight:'bold',
        color:'black',
        marginTop:5
    },
    menu:{
        height:21,
        width:21

    }
})