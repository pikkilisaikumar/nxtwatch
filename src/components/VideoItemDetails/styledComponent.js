import styled from 'styled-components'

export const VideoItemDetailsContainer = styled.div`
  flex-grow: 1;
  height: 100vh;
  overflow: auto;
  background-color: ${props =>
    props.bgColorVideoItem ? '#f9f9f9' : '#181818'};
`

export const LikeButton = styled.button`
  color: ${props => props.colorStyling};
  background-color: transparent;
  border-width: 0px;
`
