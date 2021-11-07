import styled from "styled-components"

// need to move in global file
// @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&display=swap");

const ChartWrapper = styled.div`
  width: 1000px;
  max-width: 100%;
  margin: 0 auto;
  @media (max-width: 600px) {

  }
`

const H2 = styled.h2`
  font-size: 42px;
  color: #272a2e;
  @media (max-width: 600px) {
    font-size: 24px;
  }
`

const H2Span = styled.span`
  color: #949da7;
`

const InfoLabel = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 20px;
`

export {
  ChartWrapper,
  H2,
  H2Span,
  InfoLabel,
}

