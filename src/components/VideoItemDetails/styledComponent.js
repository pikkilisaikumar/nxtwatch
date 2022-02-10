import styled from 'styled-components'

const VideoItemDetailsContainer = styled.div`
  flex-grow: 1;
  height: 100vh;
  overflow: auto;
  background-color: ${props =>
    props.bgColorVideoItem ? '#f9f9f9' : '#181818'};
`

export default VideoItemDetailsContainer
