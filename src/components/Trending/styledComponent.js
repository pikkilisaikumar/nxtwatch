import styled from 'styled-components'

export const TrendingContainer = styled.div`
  flex-grow: 1;
  height: 100vh;
  overflow: auto;
  background-color: ${props => (props.trendingvalue ? '#f9f9f9' : '#181818')};
`
export const TrendingOne = styled.div`
  background-color: ${props => (props.trendingnumber ? '#f9f9f9' : '#181818')};
  padding: 20px;
  display: flex;
  align-items: center;
`
