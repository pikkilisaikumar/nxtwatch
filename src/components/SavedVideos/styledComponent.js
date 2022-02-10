import styled from 'styled-components'

const SavedVideoContainer = styled.div`
  flex-grow: 1;
  height: 100vh;
  overflow: auto;
  background-color: ${props => (props.bgColorSaved ? '#f9f9f9' : '#181818')};
`

export default SavedVideoContainer
