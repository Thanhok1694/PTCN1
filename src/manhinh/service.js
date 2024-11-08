import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    RepeatMode,
    Event
  } from 'react-native-track-player';
  export async function setupPlayer() {
    let isSetup = false;
    try {
      await TrackPlayer.getCurrentTrack();
      isSetup = true;
    }
    catch {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
        ],
        progressUpdateEventInterval: 2,
      });
      isSetup = true;
    }
    finally {
      return isSetup;
    }
  }
  export async function addTracks() {
    await TrackPlayer.add([
      {
        id: '1',
        url: 'https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3',
        title: 'Password Infinity',
        artist: 'zezo.dev',
        image:'https://hoangphucphoto.com/wp-content/uploads/2023/05/thien-2-phut-moi-ngay-cuoc-doi-se-thay-doi_12121265.jpg',
       },
       {
        id: '2',
        url: 'https://a128-z3.zmdcdn.me/70abb2af8f85a2c0bcdce39642a45e7e?authen=exp=1722734500~acl=/70abb2af8f85a2c0bcdce39642a45e7e/*~hmac=02611ed2902999e2d8235da19fb0610d',
        title: 'Thien 01',
        artist: 'Zen Spa',
        image:'https://static-zmp3.zmdcdn.me/skins/zmp3-v5.2/images/icon_zing_mp3_60.png',
       },
       {
        id: '3',
        url: 'https://a128-z3.zmdcdn.me/8f297a5b8856250fe30fc4bf6127f347?authen=exp=1722734121~acl=/8f297a5b8856250fe30fc4bf6127f347/*~hmac=34f1405da8a4ccfcfce9cad592e9885a',
        title: 'Thien 02',
        artist: 'Zen Spa',
        image:'https://static-zmp3.zmdcdn.me/skins/zmp3-v5.2/images/icon_zing_mp3_60.png',
       },
       {
        id: '4',
        url: 'https://a128-z3.zmdcdn.me/1a218cf85c536e4f14d0cdfff7f3b995?authen=exp=1722740399~acl=/1a218cf85c536e4f14d0cdfff7f3b995/*~hmac=c3a2c1ff6cd9ec95838daaac4e6faa40',
        title: 'Thien 03',
        artist: 'Zen Spa',
        image:'https://png.pngtree.com/thumb_back/fh260/background/20230614/pngtree-buddhist-meditation-on-ocean-image_2915043.jpg',
       },
       {
        id: '5',
        url: 'https://a128-z3.zmdcdn.me/2cfc96ea3b036052d3d6f692ba10d987?authen=exp=1722739769~acl=/2cfc96ea3b036052d3d6f692ba10d987/*~hmac=df67e1ca59ff9c615b4f980574ce7e45',
        title: 'Thien 04',
        artist: 'Zen Spa',
        image:'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
       }
    ]);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  }
  export async function playbackService() {
    // Hàm này để sau khai báo các event điều khiển
  }