import styled from 'styled-components'

export const HomeContainer = styled.div`
  flex-grow: 1;
  height: 100vh;
  overflow: auto;
  background-color: ${props => props.bgColor};
`

export const BannerCardContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  height: 200px;
  width: 100%;
  background-size: cover;
  display: flex;
  justify-content: space-between;
`
