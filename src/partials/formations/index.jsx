import { useContext, createContext, useReducer, useState } from 'react';
import SectionWrapper from 'root/src/components/section-wrapper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Card, Col, Row, Container } from 'react-bootstrap';
import dayjs from 'dayjs';
import Lightbox from 'root/src/components/lightbox';
import classNames from 'classnames';
import MdxRenderer from 'root/src/components/mdx-renderer';
import { serialize } from 'next-mdx-remote/serialize';
import styled from './style';

const BackURL = {
  URL: "https://gustavooyarzabal.com"
};

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const Context = createContext({});

const Post = ({ data }) => {
  const { dispatch } = useContext(Context);

  const clickEvent = () => {
    dispatch({ type: 'data', data });
  };

  const { title, date, tags, summary, thumbnail } = data;

  const tagsToText = (array) => {
    const treatedArray = array.map((element) => capitalizeFirstLetter(element));
    if (treatedArray.length === 1)
      return <a className='link'>{treatedArray[0]}</a>;
    return treatedArray.reduce((prev, curr) => (
      <>
        <span className='_tag'>{prev}</span>
        <span className='_delimiter'>/</span>
        <span className='_tag'>{curr}</span>
      </>
    ));
  };

  const dateToText = (dateInput) => dayjs(dateInput).format('MMMM D, YYYY');

  return (
    <Card css={styled.Post}>
      <span onClick={clickEvent} className='_image-wrapper'>
        {thumbnail && thumbnail.url ? (
          <Image
            className='card-img-top'
            style={{ width: '100%', objectFit: 'cover' }}
            src={thumbnail.url}
            alt='formation post thumbnail'
            width={250}
            height={250}
          />
        ) : (
          <div>No Thumbnail Available</div>
        )}
        <span className='_date'>{dateToText(date)}</span>
      </span>
      <Card.Body className='_content'>
        <Card.Title onClick={clickEvent} className='_title'>
          {title}
        </Card.Title>
        <Card.Text className='_summary'>{summary}</Card.Text>
        <div className='_tags'>
          <span className='_key'>Tags: </span>
          <span className='_list'>{tagsToText(tags)}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

const PostsList = () => {
  const { fetchedData } = useContext(Context);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [slideEdge, setSlideEdge] = useState([null, null]);

  console.log('Fetched Data in PostsList:', fetchedData);

  const handleNav = (action) => {
    if (!swiperInstance) return;
    switch (action) {
      case 'PREV':
        swiperInstance.slidePrev();
        break;
      case 'NEXT':
        swiperInstance.slideNext();
        break;
      default:
        break;
    }
  };

  return (
    <div css={styled.PostsList}>
      <Row>
        <div className='_nav'>
          <span
            className={classNames({ '--active': !slideEdge[0] })}
            onClick={() => handleNav('PREV')}
          >
            PREV
          </span>
          <span
            className={classNames({ '--active': !slideEdge[1] })}
            onClick={() => handleNav('NEXT')}
          >
            NEXT
          </span>
        </div>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          onSlideChange={(swiper) =>
            setSlideEdge([swiper.isBeginning, swiper.isEnd])
          }
          onInit={(swiper) => {
            setSwiperInstance(swiper);
            setSlideEdge([swiper.isBeginning, swiper.isEnd]);
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
        >
          {fetchedData.map((item, i) => (
            <SwiperSlide key={i}>
              <Post data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Row>
    </div>
  );
};

const Formation = (props) => {
  const { data, ...otherProps } = props;
  const initialState = {
    show: false,
    data: null,
  };

  const stateReducer = (state, action) => {
    switch (action.type) {
      case 'data':
        return { ...state, show: !!action.data, data: action.data || null };
      case 'show':
        return { ...state, show: action.show };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(stateReducer, initialState);
  const contextData = {
    fetchedData: data,
    state,
    dispatch,
  };

  return (
    <SectionWrapper
      headerData={{
        title: 'Formations',
        description: 'Mes formations les plus pertinentes',
      }}
      altBg={false}
      {...otherProps}
    >
      <Row>
        <Col xs='12'>
          <Context.Provider value={contextData}>
            <PostsList />
            <PostLightbox />
          </Context.Provider>
        </Col>
      </Row>
    </SectionWrapper>
  );
};

const PostLightboxLayout = (props) => {
  const { state } = useContext(Context);
  const { title, summary } = state.data || {};
  const { children } = props;

  return (
    <Row css={styled.PostLightboxLayout} className='justify-content-center'>
      <Col xs='12' lg='9'>
        <div className='_post-wrapper'>
          <h1 className='_title'>{title}</h1>
          <p className='_summary'>{summary}</p>
          <div className='_content'>{children}</div>
        </div>
      </Col>
    </Row>
  );
};

const PostLightbox = () => {
  const { state, dispatch } = useContext(Context);

  const components = {
    PostLightboxLayout,
  };

  return (
    <Lightbox
      css={styled.PostLightbox}
      show={state.show}
      onClose={() => dispatch({ type: 'data', data: null })}
    >
      <Container>
        {state.data && (
          <MdxRenderer
            serializedSource={state.data.content}
            components={components}
          />
        )}
      </Container>
    </Lightbox>
  );
};

export default Formation;

export const getStaticProps = async () => {
  let formationsData = [];

  try {
    const res = await fetch(`${BackURL.URL}/api/portfolios/formation`);
    if (res.ok) {
      const data = await res.json();
      formationsData = await Promise.all(
        data.map(async (item) => ({
          ...item,
          content: await serialize(item.content),
        }))
      );
      console.log('Fetched formation data:', formationsData);
    } else {
      console.error('Error fetching formations data:', res.statusText);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }

  return {
    props: {
      data: formationsData,
    },
  };
};
