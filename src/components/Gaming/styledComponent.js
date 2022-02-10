import styled from 'styled-components'

const GamingContainer = styled.div`
  flex-grow: 1;
  height: 100vh;
  overflow: auto;
  background-color: ${props => (props.bgColorGaming ? '#f9f9f9' : '#181818')};
`

export default GamingContainer
