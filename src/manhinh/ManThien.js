import { StyleSheet, Text, View,TouchableOpacity,Image, FlatList, ScrollView,Modal,Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import firestore, { doc } from'@react-native-firebase/firestore'
import YoutubeIframe from 'react-native-youtube-iframe'
const ManThien = () => {
  const navigation=useNavigation();
  const [videoYoga, setVideoYoga] = useState([]);
  const [videoThien, setVideoThien] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);


  useEffect(() => {
    const layVideo=async()=>{
      const videoThienSnapshot=await firestore().collection('videoThien').get();
      const videoThienList=videoThienSnapshot.docs.map(doc=>doc.data());
      setVideoThien(videoThienList);

      const videoYogaSnapshot=await firestore().collection('videoYoga').get();
      const videoYogaList=videoYogaSnapshot.docs.map(doc=>doc.data());
      setVideoYoga(videoYogaList);
    };
    layVideo();
  
    
  }, [])
  
  const openModal = (video) => {
    setSelectedVideo(video);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedVideo(null);
  };

  return (
    <View style={{flex:1,backgroundColor:'#F7EAA6'}}>
     <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.navigate('TrangChuScreen') }}>
          <Image style={{ marginTop: 15, marginLeft: 20 }} source={require('../img/Back.png')} />
        </TouchableOpacity>
        <Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold', color: 'black', marginLeft: 130 }}>Yoga,thiền</Text>
      </View>
      <ScrollView>
      <View style={{margin:10}}>
        <View>
          <Text style={{fontSize:20,fontWeight:"bold",color:'black',marginLeft:10,marginTop:10}}>Video Thiền</Text>
          
           
          <FlatList
          style={{marginTop:10}}
          horizontal
          data={videoThien}
          renderItem={({item})=>(
            <TouchableOpacity style={styles.item} onPress={()=>{openModal(item)}}>
            <Image source={{uri:item.linkanh}} style={{height:100,width:120,borderColor:'black',borderWidth:1}} />
            <Text style={{marginTop:20,color:'black'}}>{item.tieude}</Text>
          </TouchableOpacity>
          )}
          keyExtractor={item=>item.id}
          />

        </View>
        <View>
          <Text style={{fontSize:20,fontWeight:"bold",color:'black',marginLeft:10,marginTop:30}}>Video Yoga</Text>
          
           
          <FlatList
          style={{marginTop:10}}
          horizontal
          data={videoYoga}
          renderItem={({item})=>(
            <TouchableOpacity style={styles.item} onPress={()=>{openModal(item)}}>
            <Image source={{uri:item.linkanh}} style={{height:100,width:120,borderColor:'black',borderWidth:1}} />
            <Text style={{marginTop:20,color:'black'}}>{item.tieude}</Text>
          </TouchableOpacity>
          )}
          keyExtractor={item=>item.id}
          />

        </View>
        <View style={{justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity onPress={()=>{navigation.navigate('NgheNhacScreen')}} style={{height:45,width:'90%',backgroundColor:'#FFCC99',marginLeft:10,marginTop:20,justifyContent:'center',alignItems:'center',borderRadius:10}}>
          <Text style={{ fontSize:20,fontWeight:'bold'}}>Bấm để chọn nhạc phù hợp</Text>
        </TouchableOpacity>
        </View>
        <View style={{marginTop:10,marginLeft:10}}>
          <Text style={styles.chu1}>Có thể bạn chưa biết</Text>
          <Text style={styles.chu1}>Thiền có thể giúp chúng ta:</Text>
          <Text style={styles.chu}>- Giảm căng thẳng: Thiền giúp giảm mức độ hormone căng thẳng, làm dịu tâm trạng và tạo cảm giác thư giãn.</Text>
          <Text style={styles.chu}>- Cải thiện tập trung: Thiền tăng cường khả năng tập trung và chú ý, giúp làm việc hiệu quả hơn.</Text>
          <Text style={styles.chu}>- Tăng cường trí nhớ: Thực hành thiền cải thiện trí nhớ và khả năng học hỏi.</Text>
          <Text style={styles.chu}>- Sức khỏe tinh thần: Thiền giảm lo âu, trầm cảm và mang lại cảm giác bình an.</Text>
          <Text style={styles.chu}>- Tăng cường hệ miễn dịch: Thiền thường xuyên giúp cơ thể khỏe mạnh và chống lại bệnh tật tốt hơn.</Text>
          <Text></Text>
          <Text style={styles.chu1}>Yoga có thể giúp chúng ta:</Text>
          <Text style={styles.chu}>- Cải thiện linh hoạt: Tăng cường độ dẻo dai của cơ bắp và các khớp.</Text>
          <Text style={styles.chu}>- Tăng cường sức mạnh: Phát triển cơ bắp và sức bền.</Text>
          <Text style={styles.chu}>- Giảm căng thẳng: Thư giãn tinh thần, giảm lo âu và căng thẳng.</Text>
          <Text style={styles.chu}>- Cải thiện hô hấp: Tăng cường chức năng phổi và hô hấp.</Text>
          <Text style={styles.chu}>- Cân bằng cơ thể và tâm trí: Tăng cường sự cân bằng và kết nối giữa cơ thể và tâm trí.





</Text>
        </View>
        
      </View>
      </ScrollView>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {selectedVideo && (
              <>
                <YoutubeIframe
                width={350}
                  height={200}
                  play={true}
                  videoId={selectedVideo.link}
                />
                 <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>{selectedVideo.tieude}</Text>
                <TouchableOpacity style={{borderColor:'red',height:40,width:150,backgroundColor:'red',justifyContent:'center',alignItems:'center',borderRadius:10,marginTop:20}} onPress={closeModal}>
                <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>Đóng</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ManThien

const styles = StyleSheet.create({
  header: {
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  item:{
   height:170,
   width:130,
   justifyContent:'center',
   alignItems:'center',
   borderColor:'black',
   borderWidth:1,
   borderRadius:10,
   padding:10,
   backgroundColor:'#F9E580',
   marginLeft:10
  },
  chu:{
    fontSize:16,
  },
  chu1:{
    fontSize:16,
    fontWeight:'bold',
    color:'red'
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '95%',
  },
 
})