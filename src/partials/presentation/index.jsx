import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Typed from 'typed.js';
import SectionWrapper from 'root/src/components/section-wrapper';
import { Link as ScrollLink } from 'react-scroll';
import ImageVariant from './variants/image';
import VideoVariant from './variants/video';
import ParticlesVariant from './variants/particles';
import styled from './style';

const BackURL = {
  URL: "https://gustavooyarzabal.com"
};

const API_URL = `${BackURL.URL}/api/portfolios`;

const MouseShape = () => (
  <ScrollLink
    css={styled.MouseShape}
    to={'about'}
    spy={true}
    smooth={true}
    duration={600}
  >
    <div className='_shape'>
      <div className='_wheel' />
    </div>
  </ScrollLink>
);

const Presentation = (props) => {
  const { variant, ...otherProps } = props;
  const [presentationData, setPresentationData] = useState({
    skillName: 'Developer',
    skillLastName: '',
    skillHeadline: '',
  });

  useEffect(() => {
    const fetchPresentationData = async () => {
      try {
        const response = await axios.get(`${API_URL}/presentation`);
        console.log("Raw response data: ", response.data);
        const presentationResponse = response.data; //
        if (presentationResponse) {
          setPresentationData(presentationResponse);
          console.log("Presentation data set: ", presentationResponse);
        }
      } catch (error) {
        console.error('Error fetching presentation data:', error);
      }
    };

    fetchPresentationData();
  }, []);

  useEffect(() => {
    console.log("Typed.js initialized with headline: ", presentationData.skillHeadline);
    const options = {
      strings: [presentationData.skillHeadline || 'Developer'],
      typeSpeed: 40,
      backSpeed: 40,
      loop: true,
      smartBackspace: false,
      backDelay: 2000,
    };

    const typed = new Typed('#typed', options);
    return () => {
      typed.destroy();
    };
  }, [presentationData.skillHeadline]);

  return (
    <SectionWrapper
      css={styled.Hero}
      containerProps={{ className: 'h-100' }}
      style={{ position: 'relative' }}
      {...otherProps}
    >
      {variant === 'image' && <ImageVariant />}
      {variant === 'video' && <VideoVariant />}
      {variant === 'particles' && <ParticlesVariant preset={props.preset} />}
      <Row
        style={{ position: 'relative', zIndex: 1 }}
        className='align-items-center justify-content-center h-100'
      >
        <Col xs='12' lg='8' className='text-center'>
          <h1 className='_name'>
            {presentationData.skillName}
            <span> {presentationData.skillLastName}</span>
          </h1>
          <h4 className='_headline'>
            <span id='typed' />
          </h4>
        </Col>
        <MouseShape />
      </Row>
    </SectionWrapper>
  );
};

export default Presentation;
