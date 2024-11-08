import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from 'react-native';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  State
} from 'react-native-track-player';
import { setupPlayer, addTracks } from './service';
import { useNavigation } from '@react-navigation/native';

function Playlist() {
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);

  async function loadPlaylist() {
    const queue = await TrackPlayer.getQueue();
    setQueue(queue);
  }

  useEffect(() => {
    loadPlaylist();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.state == State.nextTrack) {
      let index = await TrackPlayer.getCurrentTrack();
      setCurrentTrack(index);
    }
  });

  function PlaylistItem({ index, title, image, isCurrent }) {
    function handleItemPress() {
      TrackPlayer.skip(index);
    }

    return (
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }} onPress={handleItemPress}>
        <Text style={{ fontSize: 16, marginRight: 10 }}>{index + 1}</Text>
        <Image style={{ height: 50, width: 50, marginRight: 10 }} source={{ uri: image }} />
        <Text style={{ ...styles.playlistItem, backgroundColor: isCurrent ? '#666' : 'transparent' }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  const currentTrackData = queue[currentTrack] || {};

  return (
    <View>
      {currentTrackData.image && (
        <View style={styles.currentTrackContainer}>
          <Image style={styles.currentTrackImage} source={{ uri: currentTrackData.image }} />
          <Text style={styles.currentTrackTitle}>{currentTrackData.title}</Text>
        </View>
      )}
      <View style={styles.playlist}>
        <FlatList
          style={{ backgroundColor: '#ddd', borderRadius: 20, height: 300, padding: 10 }}
          data={queue}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <PlaylistItem
              index={index}
              image={item.image}
              title={item.title}
              isCurrent={currentTrack === index}
            />
          )}
        />
      </View>
    </View>
  );
}

const handleSkipToPrevious = async () => {
  await TrackPlayer.skipToPrevious();
};

const handleSkipToNext = async () => {
  await TrackPlayer.skipToNext();
};

const handlePlayPause = async () => {
  const state = await TrackPlayer.getState();
  if (state === State.Playing) {
    await TrackPlayer.pause();
  } else {
    await TrackPlayer.play();
  }
};

function App() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();
      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await addTracks();
      }
      setIsPlayerReady(isSetup);
    }
    setup();
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#bbb" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.navigate('ThienScreen') }}>
          <Image style={{ marginLeft: 20 }} source={require('../img/Back.png')} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Nhạc Yoga,Thiền</Text>
      </View>
      <View style={{ padding: 20 }}>
        <Playlist />
        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ marginLeft: 20 }} onPress={handleSkipToPrevious}>
            <Image source={require('../img/nhohontron.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlayPause}>
            <Image source={require('../img/play.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSkipToNext}>
            <Image style={{ marginRight: 20 }} source={require('../img/lonhontron.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7EAA6'
  },
  header: {
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerText: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 100
  },
  currentTrackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 20,
    marginBottom: 20
  },
  currentTrackImage: {
    height: 120,
    width: 120,
    marginRight: 10,
    borderRadius: 20
  },
  currentTrackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 20
  },
  playlist: {
    marginBottom: 40
  },
  playlistItem: {
    fontSize: 16,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
    width: '80%'
  }
});

export default App;
