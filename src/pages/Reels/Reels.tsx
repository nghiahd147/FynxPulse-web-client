import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

const Reels = () => {
  return <div className='w-[400px] mx-auto'>
    <MediaPlayer title="Sprite Fight" src="http://localhost:5000/static/hls-stream/YRwhR0dtzq1UkEt-kXS0J/master.m3u8" playsInline>
      <MediaProvider />
      <DefaultVideoLayout thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt" icons={defaultLayoutIcons} />
    </MediaPlayer>
  </div>;
};

export default Reels;
