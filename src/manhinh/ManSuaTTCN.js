import { StyleSheet, Text, View,TouchableOpacity,Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const ManSuaTTCN = () => {
  const navigation=useNavigation();
  const [users, setUsers] = useState(null);
  const [hotenUser, setHoten] = useState('');
  const [danghocUser, setDanghoc] = useState('');
  const [cannangUser, setCannang] = useState('');
  const [chieucaoUser, setChieucao] = useState('');
  const [namsinhUser, setNamsinh] = useState('');
  const [quequanUser, setQuequan] = useState('');
  const [sothichUser, setSothich] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = auth().currentUser;
     if(currentUser){
      const userId = currentUser.uid;
      console.log(userId);
      try {
        const userDoc = await firestore().collection('user').doc(userId).get();
        
        if (userDoc.exists) {
          const userData = userDoc.data();
          setUsers(userDoc.data());
          console.log(userData);
          setDanghoc(userData.danghoc);
          setHoten(userData.hoten);
          setNamsinh(userData.namsinh);
          setQuequan(userData.quequan);
          setSothich(userData.sothich);
          setCannang(userData.cannang);
          setChieucao(userData.chieucao);
          
        }
      } catch (error) {
        console.error("Lỗi lấy dữ liệu: ", error);
      }
     }
    };

    fetchData();
  }, []);

  const CapNhat = async () => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      try {
        await firestore().collection('user').doc(userId).update({
          hoten: hotenUser,
          danghoc: danghocUser,
          cannang: cannangUser,
          chieucao: chieucaoUser,
          namsinh: namsinhUser,
          quequan: quequanUser,
          sothich: sothichUser,
        });
        alert('Cập nhật thông tin thành công!');
      } catch (error) {
        console.error("Lỗi cập nhật dữ liệu: ", error);
      }
    }
  };

  return (
    <View style={{flex:1,backgroundColor:'#F7EAA6'}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.navigate('TTCNScreen') }}>
          <Image style={{ marginTop: 15, marginLeft: 20 }} source={require('../img/Back.png')} />
        </TouchableOpacity>
        <Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold', color: 'black', marginLeft: 80 }}>Sửa thông tin cá nhân</Text>
      </View>
      <ScrollView>
      {users && (
          <>
      <View style={{padding:20}}>
         <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>Ảnh đại diện</Text>
         <View style={{ padding: 10, marginTop: 10,alignItems:'center' }}>
          <Image
              source={{ uri: users.anh }}
              style={{ height: 150, width: 150, borderRadius: 80, position: 'relative',borderWidth:1,borderColor:'black' }}
            />
            <TouchableOpacity style={{ position: 'absolute', left: 230, top: 120 }}>
              <Image
                source={require('../img/Mayanh.png')}
              />
            </TouchableOpacity>
            
          </View>
         <View style={{alignItems:'center'}}>
         <View style={{marginTop:10}}>
            <Text style={{fontSize:16,fontWeight:'bold'}}>Họ và tên: </Text>
            <TextInput placeholder='Nhập họ và tên' value={hotenUser} style={styles.ip} onChangeText={(txt)=>{setHoten(txt)}}  />
          </View>
          <View style={{marginTop:10}}>
            <Text style={{fontSize:16,fontWeight:'bold'}}>Năm sinh: </Text>
            <TextInput placeholder='Nhập năm sinh' value={namsinhUser} style={styles.ip} onChangeText={(txt)=>{setNamsinh(txt)}}  />
          </View>
          <View style={{marginTop:10}}>
            <Text style={{fontSize:16,fontWeight:'bold'}}>Đang học tại: </Text>
            <TextInput placeholder='Nhập nơi học hoặc làm việc' value={danghocUser} style={styles.ip} onChangeText={(txt)=>{setDanghoc(txt)}}  />
          </View>
          <View style={{marginTop:10}}>
            <Text style={{fontSize:16,fontWeight:'bold'}}>Quê quán: </Text>
            <TextInput placeholder='Nhập quê quán' style={styles.ip} value={quequanUser} onChangeText={(txt)=>{setQuequan(txt)}}  />
          </View>
          <View style={{marginTop:10}}>
            <Text style={{fontSize:16,fontWeight:'bold'}}>Sở thích: </Text>
            <TextInput placeholder='Nhập sở thích' style={styles.ip} value={sothichUser} onChangeText={(txt)=>{setSothich(txt)}}  />
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',width:'100%'}}>
            <View>
              <Text style={{fontSize:16,fontWeight:'bold'}}>Chiều cao:</Text>
              <TextInput placeholder='Nhập chiều cao' style={styles.ip2} value={chieucaoUser} onChangeText={(txt)=>{setChieucao(txt)}} />
            </View>
            <View>
              <Text style={{fontSize:16,fontWeight:'bold'}}>Cân nặng:</Text>
              <TextInput placeholder='Nhập cân nặng' style={styles.ip2} value={cannangUser} onChangeText={(txt)=>{setCannang(txt)}} />
            </View>
          </View>
         </View>
         <View style={{width:'100%',alignItems:'center',marginTop:20}}>
         <TouchableOpacity style={styles.nut} onPress={CapNhat}>
          <Text style={{color:'white',fontWeight:'bold',fontSize:18}}>Cập nhật</Text>
         </TouchableOpacity>
         </View>
      </View>
      
      </>
       )}
      </ScrollView>
    </View>
  )
}

export default ManSuaTTCN

const styles = StyleSheet.create({

  header: {
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  ip:{
    height:40,
    width:350,
    padding:10,
    borderColor:'black',
    borderWidth:1,
    backgroundColor:'#C4C4C4',
    borderRadius:10,
    marginTop:5
  },
  ip2:{
    height:40,
    width:150,
    padding:10,
    borderColor:'black',
    borderWidth:1,
    backgroundColor:'#C4C4C4',
    borderRadius:10,
    marginTop:5
  },
  nut:{
   height:40,
   width:300,
   borderColor:'black',
   borderWidth:1,
   borderRadius:10,
   backgroundColor:'#EF7B39',
   justifyContent:'center',
   alignItems:'center'
  }
})