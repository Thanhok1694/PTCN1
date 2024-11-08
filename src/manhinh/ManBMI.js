import { StyleSheet, Text, View,TouchableOpacity,Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const ManBMI = () => {
  const navigation=useNavigation();
  const [cannang, setCannang] = useState('');
  const [chieucao, setChieucao] = useState('');
  const [tinhtrang, setTinhtrang] = useState('');
  const [bmi, setBMI] = useState('');
  const [luuy, setLuuy] = useState('');

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
          console.log(userData);
          setCannang(userData.cannang);
          setChieucao(userData.chieucao);
          console.log(cannang);
          console.log(chieucao);
        }
      } catch (error) {
        console.error("Lỗi lấy dữ liệu: ", error);
      }
     }
    };

    fetchData();
  }, []);

    
  useEffect(() => {
    if(chieucao && cannang){
      const cannangF=parseFloat(cannang);
      const chieucaoF=parseFloat(chieucao)/100;
    const chisoBMI=cannangF/(chieucaoF*chieucaoF);
    const bmiFix=chisoBMI.toFixed(2);
    setBMI(bmiFix);
     if(chisoBMI <18.5){
      setTinhtrang('Thiếu cân');
      setLuuy('Nguy cơ suy dinh dưỡng, thiếu vitamin và khoáng chất.')
     }else if(chisoBMI>=18.5 && chisoBMI<=24.9){
      setLuuy('Duy trì chế độ ăn uống lành mạnh và lối sống tích cực để giữ sức khỏe.')
      setTinhtrang('Bình thường');
     }else if(chisoBMI>=25 && chisoBMI<=29.9){
      setLuuy('Nguy cơ mắc bệnh tim mạch, cao huyết áp và tiểu đường tăng.')
      setTinhtrang('Thừa cân')
     }else if(chisoBMI>=30 && chisoBMI<=34.9){
      setLuuy('Tăng nguy cơ mắc các bệnh như bệnh tim, tiểu đường loại 2, và một số loại ung thư.')
      setTinhtrang('Béo phì cấp độ 1')
     }else if(chisoBMI>=35 && chisoBMI<=39.9){
      setLuuy('Nguy cơ cao hơn về các bệnh nghiêm trọng như bệnh tim mạch, đột quỵ và bệnh gan nhiễm mỡ.')
      setTinhtrang('Béo phì cấp độ 2')
     }else if(chisoBMI>=40){
      setLuuy('Nguy cơ rất cao về các bệnh nghiêm trọng như bệnh tim, đột quỵ, tiểu đường loại 2, và các vấn đề về hô hấp.')
      setTinhtrang('Béo phì cấp độ 3')
     }else{setTinhtrang('')}
     
    }else{setTinhtrang('')}
      
    
  }, [cannang,chieucao])
  
  return (
    <View style={{flex:1,backgroundColor:'#F7EAA6'}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.navigate('TrangChuScreen') }}>
          <Image style={{ marginTop: 15, marginLeft: 20 }} source={require('../img/Back.png')} />
        </TouchableOpacity>
        <Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold', color: 'black', marginLeft: 160 }}>BMI</Text>
      </View>
      <ScrollView>
      
      <View style={{margin:10,flexDirection:'row',justifyContent:'space-around'}}>
        <View>
          <Text style={{fontSize:16}}>Cân nặng:(kg)</Text>
          <TextInput value={cannang} keyboardType='numeric' style={styles.ip} placeholder='Nhập cân nặng' placeholderTextColor='white' onChangeText={(txt)=>{setCannang(txt)}}  />
        </View>
        <View>
          <Text style={{fontSize:16}}>Chiều cao:(cm)</Text>
          <TextInput value={chieucao} keyboardType='numeric' style={styles.ip} placeholder='Nhập chiều cao' placeholderTextColor='white' onChangeText={(txt)=>{setChieucao(txt)}}  />
        </View>
      </View>
      <View style={{justifyContent:'center',alignItems:'center',margin:5}}>
        <View style={styles.ochu}>
          
         <Text style={{fontSize:20,color:'#0A0000'}}>Kết quả:</Text>
         <Text style={{fontSize:23,fontWeight:'bold',color:'#0A0000'}}>{bmi}</Text>
         <Text style={{fontSize:23,fontWeight:'bold',marginTop:10}}>Tình trạng: {tinhtrang}</Text>
         <Text style={{fontSize:20,textAlign:'justify',marginTop:20,color:'red',padding:10}}>Lưu ý: {luuy}</Text>
        </View>
        <View style={styles.ochu2}>
         <Text style={{fontSize:20,fontWeight:'bold'}}>Bảng phân loại BMI: </Text>
         <Text style={styles.chu}>Dưới 18.5: Thiếu cân</Text>
         <Text style={styles.chu}>18.5 - 24.9: Bình thường</Text>
         <Text style={styles.chu}>25 - 29.9: Thừa cân</Text>
         <Text style={styles.chu}>30 - 34.9: Béo phì cấp độ 1</Text>
         <Text style={styles.chu}>35 - 39.9: Béo phì cấp độ 2</Text>
         <Text style={styles.chu}>Trên 40: Béo phì cấp độ 3</Text>
        </View>
      </View>
      </ScrollView>
      <View style={{backgroundColor:'#EF7B39', height:60,justifyContent:'space-around',alignItems:'center',flexDirection:'row'}}>
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

export default ManBMI

const styles = StyleSheet.create({
  header: {
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  ip:{
    height:40,
    width:120,
    borderColor:'white',
    borderWidth:1,
    borderRadius:10,
    backgroundColor:'black',
    marginTop:5,
    padding:10,color:'white'
  },
  ochu:{
    height:250,
    width:300,
    backgroundColor:'#F8D105',
    justifyContent:'center',
    marginTop:10,
    alignItems:'center'
  },
  ochu2:{
    height:200,
    width:300,
    backgroundColor:'#F8D105',
    justifyContent:'center',
    marginTop:10,
    alignItems:'center'
  },
  chu:{
    fontSize:18
  },
  menu:{
    height:21,
    width:21

}
})