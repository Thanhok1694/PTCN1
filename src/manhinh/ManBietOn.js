import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const ManBietOn = () => {
  const navigation = useNavigation();
  const [loi, setLoi] = useState('');
  const [baiviet, setBaiviet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);


  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setUserId(user.uid);
    }
  }, []);


  useEffect(() => {
    if (userId) {
      const subscriber = firestore()
        .collection('bieton')
        .where('userId', '==', userId)
        .onSnapshot(querySnapshot => {
          const baiviet = [];

          querySnapshot.forEach(documentSnapshot => {
            baiviet.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
              Ngay: documentSnapshot.data().Ngay.toDate().toLocaleDateString(),
            });
          });

          setBaiviet(baiviet);
          setLoading(false);
        });

      return () => subscriber();
    }
  }, [userId]);

  const xoa = (id) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa bài viết này không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: () => handleDelete(id),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleDelete = async (id) => {
    try {
      await firestore().collection('bieton').doc(id).delete();
    } catch (error) {
      Alert.alert('Error', 'Xóa thất bại');
      console.error(error);
    }
  };

  const them = async () => {
    if (!loi.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập lời biết ơn.');
      return;
    }
    try {
      if (isEditing) {
        // Cập nhật dữ liệu
        await firestore().collection('bieton').doc(editingItem).update({
          Noidung: loi
        });
        Alert.alert('Sửa thành công');
        setIsEditing(false);
        setEditingItem(null);
      } else {
        // Thêm dữ liệu mới
        const newEntry = {
          Noidung: loi,
          Ngay: firestore.Timestamp.now(),
          userId: userId // Lưu userId
        };
        await firestore().collection('bieton').add(newEntry);
        Alert.alert('Thêm thành công');
      }
      setLoi('');
    } catch (error) {
      Alert.alert('Error', isEditing ? 'Sửa thất bại' : 'Thêm thất bại');
      console.error(error);
    }
  };

  const startEditing = (item) => {
    setLoi(item.Noidung);
    setEditingItem(item.key);
    setIsEditing(true);
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F7EAA6' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.navigate('TrangChuScreen') }}>
          <Image style={{ marginTop: 15, marginLeft: 20 }} source={require('../img/Back.png')} />
        </TouchableOpacity>
        <Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold', color: 'black', marginLeft: 120 }}>Lời biết ơn</Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 23, color: 'black' }}>Bạn hãy viết lời biết ơn của hôm nay</Text>
        <TextInput value={loi} placeholder='Lời biết ơn' style={styles.ip} onChangeText={setLoi} />
        <TouchableOpacity onPress={them} style={{ height: 40, width: '90%', backgroundColor: '#EE5432', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 20 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{isEditing ? 'Sửa' : 'Thêm'}</Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', fontSize: 23, color: 'black', marginTop: 30 }}>Danh sách lời biết ơn</Text>
        <FlatList
          style={{ height: 310 }}
          data={baiviet}
          renderItem={({ item }) => (
            <View style={styles.it}>
              <View style={{ width: 250 }}>
                <Text style={{ fontSize: 16 }}>Ngày: {item.Ngay}</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Nội dung: {item.Noidung}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => startEditing(item)} style={{ height: 30, width: 80, backgroundColor: '#EE5432', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginBottom: 10 }}>
                  <Text style={{ color: 'white' }}>Sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { xoa(item.key) }} style={styles.nut}>
                  <Text style={{ color: 'white' }}>Xóa</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={item => item.key}
        />
      </View>
    </View>
  )
}

export default ManBietOn

const styles = StyleSheet.create({
  header: {
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  ip: {
    height: 100,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    fontSize: 17,
    marginTop: 20
  },
  it: {
    height: 'auto',
    width: 380,
    backgroundColor: '#E6B070',
    padding: 20,
    borderRadius: 10,
    borderColor: '#CCC9C9',
    borderWidth: 1,
    marginTop: 5,
    flexDirection: 'row'
  },
  nut: {
    height: 30,
    width: 80,
    backgroundColor: '#EE5432',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  }
});
