import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import * as icons from '@swiftcarrot/react-ionicons'
import { css } from '@emotion/react'
import { darken } from 'polished'
import SectionWrapper from 'root/src/components/section-wrapper'
import styled from './style'

const SingleBlock = ({ cols, Icon, content }) => (
  <Col {...cols}>
    <div css={styled.SingleBlock}>
      <Icon className='_icon' />
      <p className='_content'>{content}</p>
    </div>
  </Col>
)

const SocialIcon = ({ url, Icon, color }) => (
  <a
    href={url}
    css={css`
      background-color: ${color};
      &:focus,
      &:hover {
        background-color: ${darken(0.08, color)};
      }
      ${styled.SocialIcon}
    `}
  >
    <Icon className='_icon' />
  </a>
)

const Footer = (props) => (
  <SectionWrapper css={styled.Footer} {...props}>
    <Row className='_contact'>
      <SingleBlock
        Icon={icons.MapSharp}
        content={<span>83 Boulevard de Redon, 13009</span>}
        cols={{ xs: '12', sm: '4' }}
      />
      <SingleBlock
        Icon={icons.CallSharp}
        content={<span>+33 0671473291</span>}
        cols={{ xs: '12', sm: '4' }}
      />
      <SingleBlock
        Icon={icons.SendSharp}
        content={
          <a href='mailto:oyarzabal.gustavo@gmail.com'>
            oyarzabal.gustavo@gmail.com
          </a>
        }
        cols={{ xs: '12', sm: '4' }}
      />
    </Row>
    <Row className='_row _mini'>
      <Col xs='12' lg='5' className='_socials'>
        <SocialIcon
          url='https://github.com/GustavoOyarzabal'
          Icon={icons.LogoGithub}
          color='#6e5494'
        />
        <SocialIcon
          url='https://www.linkedin.com/in/gustavooyarzabal'
          Icon={icons.LogoLinkedin}
          color='#0077B5'
        />
      </Col>
      <Col as='p' xs='12' lg='7' className='_copyright-notice'>
        &copy; 2024 Gustavo Oyarzabal. All rights reserved.
      </Col>
    </Row>
  </SectionWrapper>
)

export default Footer
