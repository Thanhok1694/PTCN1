import { Alert, Image, StyleSheet,ToastAndroid, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ManDangNhap = () => {
  const [email, setEmail] = useState('');
  const [password, setMatkhau] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [mau, setMau] = useState('#EEEEEE');

  const navigation = useNavigation();
  const doimau = () => {
 
    setMau(prevColor => (prevColor === '#EEEEEE' ? '#000000' : '#EEEEEE'));
  };

  useEffect(() => {
    const getLoginData = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('email');
        const savedPassword = await AsyncStorage.getItem('password');
        if (savedEmail && savedPassword) {
          setEmail(savedEmail);
          setMatkhau(savedPassword);
          setRememberMe(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getLoginData();
  }, []);

  const DangNhap = async () => {
    if (email === '' || password === '') {
      Alert.alert('Vui lòng nhập đủ');
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(email, password);
      ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
  

      if (rememberMe) {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
      } else {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
      }
      navigation.navigate('TrangChuScreen');
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Email không hợp lệ');
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert('Không tìm thấy tài khoản người dùng');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Mật khẩu sai');
      } 
      else if (error.code === 'auth/invalid-credential') {
        Alert.alert('Mật khẩu sai');
      } 
      else {
        Alert.alert('Error', error.message);
      }
    }
  };

  const handleRememberMeToggle = () => {
    doimau();
    setRememberMe(!rememberMe);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F7EAA6' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
        <Image style={{ height: 200, width: '90%', borderRadius: 25 }} source={{ uri: 'https://www.pace.edu.vn/uploads/news/2023/04/2-ky-nang-phat-trien-ban-than.jpg' }} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', marginTop: 30 }}>Vui lòng đăng nhập để tiếp tục</Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
        <TextInput style={styles.ip} placeholder='Nhập email' value={email} onChangeText={(txt) => setEmail(txt)} />
        <TextInput style={styles.ip} placeholder='Nhập mật khẩu' secureTextEntry={true} value={password} onChangeText={(txt) => setMatkhau(txt)} />
        <View style={styles.rememberMeContainer}>
        <TouchableOpacity onPress={handleRememberMeToggle}>
           <View style={[styles.o, { backgroundColor: mau }]}></View>
        </TouchableOpacity>
          <Text style={styles.rememberMeText}>Nhớ mật khẩu</Text>
        </View>
        <TouchableOpacity onPress={DangNhap} style={styles.nut}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text style={{ fontSize: 16 }}>Bạn không có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('DangKiScreen')}>
            <Text style={styles.dk}>Đăng kí</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text style={{ fontSize: 16 }}>Bạn quên mật khẩu? </Text>
          <TouchableOpacity>
            <Text style={styles.dk}>Quên mật khẩu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ManDangNhap;

const styles = StyleSheet.create({
  ip: {
    borderColor: '#CCC9C9',
    height: 45,
    width: '83%',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
    padding: 10,
    marginTop: 20,
    fontSize: 17,
  },
  nut: {
    height: 45,
    width: '90%',
    backgroundColor: '#F98921',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 60,
  },
  dk: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 16,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight:200,
    marginTop: 20,
  
  },
  rememberMeText: {
    fontSize: 16,
    marginLeft: 10,
  },
  o:{
    height:20,
    width:20,
    borderColor:'gray',
    backgroundColor:'white',
    borderRadius:20
  }
});