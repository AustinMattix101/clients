const videoBg = '/videos/Pexels_Videos_1851190.mp4';

const VideoBackground: React.FC = () => {
  return (
      <video autoPlay loop muted width="100%">
          <source src={videoBg} type="video/mp4"/>
      </video>
  )
}

export default VideoBackground;