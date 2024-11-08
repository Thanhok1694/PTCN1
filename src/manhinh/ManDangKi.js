import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ManDangKi = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hoten, setHoten] = useState('');
  const [repass, setRePassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp =async () => {
    if (email === '' || password === '' || hoten === '' || repass === '') {
      Alert.alert('Vui lòng nhập đầy đủ');
      return;
    }

    if (password !== repass) {
      Alert.alert('Mật khẩu không trùng khớp');
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      await firestore().collection('user').doc(user.uid).set({
        email: user.email,
        hoten: hoten,
        anh:
          'https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg',
        sothich: null,
        cannang: null,
        chieucao: null,
        tuoi: null,
        createdAt: new Date().toISOString(),
        quequan:null,
        ngaysinh:null,
        danghoc:null,
        namsinh:null
      });

      Alert.alert(
        
        'Tạo tài khoản thành công',
      );
      navigation.navigate('DangNhapScreen');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Thông báo','Email đã tồn tại');
      }else if(error.code === 'auth/weak-password'){
        Alert.alert('Vui lòng nhập mật khẩu 6 kí tự trở lên')
      }
    }
  };
  //auth/email-already-in-use

  return (
    <View style={{ flex: 1, backgroundColor: '#F7EAA6' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
        <Image
          style={{ height: 180, width: '90%', borderRadius: 25 }}
          source={{ uri: 'https://govi.vn/wp-content/uploads/2023/02/phat-trien-ban-than-la-gi.jpg' }}
        />
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', marginTop: 30 }}>Hãy tạo 1 tài khoản mới</Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          style={styles.ip}
          placeholder='Nhập họ và tên'
          onChangeText={(txt) => {
            setHoten(txt);
          }}
        />
        <TextInput
          style={styles.ip}
          placeholder='Nhập email'
          onChangeText={(txt) => {
            setEmail(txt);
          }}
        />
        <TextInput
          style={styles.ip}
          placeholder='Nhập mật khẩu'
          secureTextEntry={true}
          onChangeText={(txt) => {
            setPassword(txt);
          }}
        />
        <TextInput
          style={styles.ip}
          placeholder='Nhập lại mật khẩu'
          secureTextEntry={true}
          onChangeText={(txt) => {
            setRePassword(txt);
          }}
        />
        <TouchableOpacity onPress={handleSignUp} style={styles.nut}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Đăng kí</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text style={{ fontSize: 16 }}>Bạn đã có tài khoản? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DangNhapScreen');
            }}
          >
            <Text style={styles.dk}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ManDangKi;

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
    marginTop: 30,
  },
  dk: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
