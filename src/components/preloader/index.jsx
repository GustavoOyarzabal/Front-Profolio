/*
Page preloader component. Displays a loading indicator while the page loads
*/

import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import styled from './style'

const Beatloader = (props) => {
  const mergeDotStyle = (additionalStyles) => css`
    ${props.dotsStyle};
    ${additionalStyles}
  `
  return (
    <span css={styled.Beatloader({ loading: props.loading })}>
      <span
        css={mergeDotStyle(css`
          animation-delay: -0.3s;
        `)}
      />
      <span
        css={mergeDotStyle(css`
          animation-delay: -0.15555s;
        `)}
      />
      <span
        css={mergeDotStyle(css`
          animation-delay: -0s;
        `)}
      />
    </span>
  )
}

const Preloader = (props) => {
  const { backgroundColor, loading, ...dotsStyle } = props

  const [showBackground, setShowBackground] = useState(loading)

  useEffect(() => {
    setTimeout(() => {
      setShowBackground(loading)
    }, 100)
  }, [loading])
  return (
    <div css={styled.Background({ showBackground, backgroundColor })}>
      <Beatloader {...{ loading }} {...dotsStyle} />
    </div>
  )
}

export default Preloader
