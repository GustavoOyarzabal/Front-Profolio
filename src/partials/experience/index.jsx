import {
  useContext,
  createContext,
  useReducer,
  useState,
  useEffect,
} from 'react'
import SectionWrapper from 'root/src/components/section-wrapper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'
import { Card, Col, Row, Container } from 'react-bootstrap'
import dayjs from 'dayjs'
import Lightbox from 'root/src/components/lightbox'
import classNames from 'classnames'
import MdxRenderer from 'root/src/components/mdx-renderer'
import { serialize } from 'next-mdx-remote/serialize'
import styled from './style'

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1)

const Context = createContext({})

const experienceData = [
  {
    title: 'Criptoinfo',
    date: '2022-01-02',
    tags: ['Cryptocurrency', 'Blockchain'],
    summary:
      'In 2022, I embarked on a new challenge by dedicating myself to cryptocurrency trading, exploring the fascinating dynamics of blockchains. This experience not only enriched my understanding of modern financial technologies but also sharpened my analytical skills and ability to act under pressure, valuable assets in any technology and innovation-driven sector.',
    thumbnail: {
      url: 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1718979199/criptoInfo_logo_fu40bm.webp',
    },
    content: 'Trading and Blockchain experience details...',
  },
  {
    title: 'AltaRegion',
    date: '2021-02-14',
    tags: ['Web Development', 'JavaScript'],
    summary:
      'Developed web applications for the region. Extensive use of JavaScript and related frameworks.',
    thumbnail: {
      url: 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1718037064/alta_region_tester_hijmes.webp',
    },
    content: 'Web development for regional projects...',
  },
  {
    title: 'Cybercafe',
    date: '2020-03-05',
    tags: ['Networking', 'Customer Support'],
    summary:
      'Managed and maintained networks and computer systems for a cybercafé. Provided customer support and managed security.',
    thumbnail: {
      url: 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1717064978/cibercafe_quk6nt.webp',
    },
    content: 'Network and system management for a cybercafé...',
  },
  {
    title: 'Maquinagro',
    date: '2019-04-18',
    tags: ['Agriculture', 'Technology'],
    summary:
      'Developed technological solutions for agriculture. Implemented automated systems and smart sensors.',
    thumbnail: {
      url: 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1717063518/maquinagroLogo_z0smxn.jpg',
    },
    content: 'Technological solutions for agriculture...',
  },
  {
    title: 'Algorithmic Trading',
    date: '2018-05-25',
    tags: ['Algorithmic Trading', 'Programming'],
    summary:
      'Developed trading algorithms for arbitrage. Advanced programming and financial data analysis.',
    thumbnail: {
      url: 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1717063106/DALL_E_2024-05-30_11.57.52_-_A_simple_image_featuring_the_words_Trading_and_Blockchain_with_a_clean_professional_font._Use_yellow_and_another_color_for_differentiation._Inclu_lz1zxg.webp',
    },
    content: 'Algorithmic trading and financial analysis...',
  },
  {
    title: 'Southworks',
    date: '2017-06-10',
    tags: ['Software Development', 'Team Management'],
    summary:
      'Managed software development projects and led developer teams. Implemented complex software solutions.',
    thumbnail: {
      url: 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1720509583/southworklogo_r4klml.jpg',
    },
    content: 'Software development project management...',
  },
  {
    title: 'Alt',
    date: '2016-07-22',
    tags: ['Innovation', 'Startups'],
    summary:
      'Participated in innovative projects and startup development. Focused on technological innovation and rapid growth.',
    thumbnail: {
      url: 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1717062359/AlticonfaviconLogo_yx8zqz.jpg',
    },
    content: 'Innovation and startup development...',
  },
]

const Post = ({ data }) => {
  const { dispatch } = useContext(Context)

  const clickEvent = () => {
    dispatch({ type: 'data', data })
  }

  const { title, date, tags, summary, thumbnail } = data

  const tagsToText = (array) => {
    const treatedArray = array.map((element) => capitalizeFirstLetter(element))
    if (treatedArray.length === 1)
      return <a className='link'>{treatedArray[0]}</a>
    return treatedArray.reduce((prev, curr) => (
      <>
        <span className='_tag'>{prev}</span>
        <span className='_delimiter'>/</span>
        <span className='_tag'>{curr}</span>
      </>
    ))
  }

  const dateToText = (dateInput) => dayjs(dateInput).format('MMMM D, YYYY')

  return (
    <Card css={styled.Post}>
      <span onClick={clickEvent} className='_image-wrapper'>
        {thumbnail && thumbnail.url ? (
          <Image
            className='card-img-top'
            style={{ width: '100%', objectFit: 'cover' }}
            src={thumbnail.url}
            alt='experience post thumbnail'
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
  )
}

const PostsList = () => {
  const { fetchedData } = useContext(Context)
  const [swiperInstance, setSwiperInstance] = useState(null)
  const [slideEdge, setSlideEdge] = useState([null, null])

  const handleNav = (action) => {
    if (!swiperInstance) return
    switch (action) {
      case 'PREV':
        swiperInstance.slidePrev()
        break
      case 'NEXT':
        swiperInstance.slideNext()
        break
      default:
        break
    }
  }

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
            setSwiperInstance(swiper)
            setSlideEdge([swiper.isBeginning, swiper.isEnd])
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
  )
}

const Experience = (props) => {
  const initialState = {
    show: false,
    data: null,
  }

  const stateReducer = (state, action) => {
    switch (action.type) {
      case 'data':
        return { ...state, show: !!action.data, data: action.data || null }
      case 'show':
        return { ...state, show: action.show }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(stateReducer, initialState)
  const contextData = {
    fetchedData: experienceData,
    state,
    dispatch,
  }

  return (
    <SectionWrapper
      headerData={{
        title: 'Experiences',
        description: 'My most relevant experiences...',
      }}
      altBg={false}
      {...props}
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
  )
}

const PostLightboxLayout = (props) => {
  const { state } = useContext(Context)
  const { title, summary } = state.data || {}
  const { children } = props

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
  )
}

const PostLightbox = () => {
  const { state, dispatch } = useContext(Context)

  const components = {
    PostLightboxLayout,
  }

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
  )
}

export default Experience

// import { useContext, createContext, useReducer, useState } from 'react'
// import SectionWrapper from 'root/src/components/section-wrapper'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import Image from 'next/image'
// import 'swiper/css'
// import 'swiper/css/pagination'
// import { Card, Col, Row, Container } from 'react-bootstrap'
// import dayjs from 'dayjs'
// import Lightbox from 'root/src/components/lightbox'
// import classNames from 'classnames'
// import MdxRenderer from 'root/src/components/mdx-renderer'
// import { serialize } from 'next-mdx-remote/serialize'
// import styled from './style'

// const BackURL = {
//   URL: 'https://gustavooyarzabal.com',
// }

// const capitalizeFirstLetter = (string) =>
//   string.charAt(0).toUpperCase() + string.slice(1)

// const Context = createContext({})

// const Post = ({ data }) => {
//   const { dispatch } = useContext(Context)

//   const clickEvent = () => {
//     dispatch({ type: 'data', data })
//   }

//   const { title, date, tags, summary, thumbnail } = data

//   const tagsToText = (array) => {
//     const treatedArray = array.map((element) => capitalizeFirstLetter(element))
//     if (treatedArray.length === 1)
//       return <a className='link'>{treatedArray[0]}</a>
//     return treatedArray.reduce((prev, curr) => (
//       <>
//         <span className='_tag'>{prev}</span>
//         <span className='_delimiter'>/</span>
//         <span className='_tag'>{curr}</span>
//       </>
//     ))
//   }

//   const dateToText = (dateInput) => dayjs(dateInput).format('MMMM D, YYYY')

//   return (
//     <Card css={styled.Post}>
//       <span onClick={clickEvent} className='_image-wrapper'>
//         {thumbnail && thumbnail.url ? (
//           <Image
//             className='card-img-top'
//             style={{ width: '100%', objectFit: 'cover' }}
//             src={thumbnail.url}
//             alt='experience post thumbnail..'
//             width={250}
//             height={250}
//           />
//         ) : (
//           <div>No Thumbnail Available..</div>
//         )}
//         <span className='_date'>{dateToText(date)}</span>
//       </span>
//       <Card.Body className='_content'>
//         <Card.Title onClick={clickEvent} className='_title'>
//           {title}
//         </Card.Title>
//         <Card.Text className='_summary'>{summary}</Card.Text>
//         <div className='_tags'>
//           <span className='_key'>Tags: </span>
//           <span className='_list'>{tagsToText(tags)}</span>
//         </div>
//       </Card.Body>
//     </Card>
//   )
// }

// const PostsList = () => {
//   const { fetchedData } = useContext(Context)
//   const [swiperInstance, setSwiperInstance] = useState(null)
//   const [slideEdge, setSlideEdge] = useState([null, null])

//   console.log('Fetched Data in PostsList:', fetchedData)

//   const handleNav = (action) => {
//     if (!swiperInstance) return
//     switch (action) {
//       case 'PREV':
//         swiperInstance.slidePrev()
//         break
//       case 'NEXT':
//         swiperInstance.slideNext()
//         break
//       default:
//         break
//     }
//   }

//   return (
//     <div css={styled.PostsList}>
//       <Row>
//         <div className='_nav'>
//           <span
//             className={classNames({ '--active': !slideEdge[0] })}
//             onClick={() => handleNav('PREV')}
//           >
//             PREV
//           </span>
//           <span
//             className={classNames({ '--active': !slideEdge[1] })}
//             onClick={() => handleNav('NEXT')}
//           >
//             NEXT
//           </span>
//         </div>
//         <Swiper
//           slidesPerView={3}
//           spaceBetween={30}
//           onSlideChange={(swiper) =>
//             setSlideEdge([swiper.isBeginning, swiper.isEnd])
//           }
//           onInit={(swiper) => {
//             setSwiperInstance(swiper)
//             setSlideEdge([swiper.isBeginning, swiper.isEnd])
//           }}
//           breakpoints={{
//             0: { slidesPerView: 1 },
//             768: { slidesPerView: 2 },
//             992: { slidesPerView: 3 },
//           }}
//         >
//           {fetchedData.map((item, i) => (
//             <SwiperSlide key={i}>
//               <Post data={item} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </Row>
//     </div>
//   )
// }

// const Experience = (props) => {
//   const { data, ...otherProps } = props
//   const initialState = {
//     show: false,
//     data: null,
//   }

//   const stateReducer = (state, action) => {
//     switch (action.type) {
//       case 'data':
//         return { ...state, show: !!action.data, data: action.data || null }
//       case 'show':
//         return { ...state, show: action.show }
//       default:
//         return state
//     }
//   }

//   const [state, dispatch] = useReducer(stateReducer, initialState)
//   const contextData = {
//     fetchedData: data,
//     state,
//     dispatch,
//   }

//   return (
//     <SectionWrapper
//       headerData={{
//         title: 'Experiences',
//         description: 'My most relevant experiences...',
//       }}
//       altBg={false}
//       {...otherProps}
//     >
//       <Row>
//         <Col xs='12'>
//           <Context.Provider value={contextData}>
//             <PostsList />
//             <PostLightbox />
//           </Context.Provider>
//         </Col>
//       </Row>
//     </SectionWrapper>
//   )
// }

// const PostLightboxLayout = (props) => {
//   const { state } = useContext(Context)
//   const { title, summary } = state.data || {}
//   const { children } = props

//   return (
//     <Row css={styled.PostLightboxLayout} className='justify-content-center'>
//       <Col xs='12' lg='9'>
//         <div className='_post-wrapper'>
//           <h1 className='_title'>{title}</h1>
//           <p className='_summary'>{summary}</p>
//           <div className='_content'>{children}</div>
//         </div>
//       </Col>
//     </Row>
//   )
// }

// const PostLightbox = () => {
//   const { state, dispatch } = useContext(Context)

//   const components = {
//     PostLightboxLayout,
//   }

//   return (
//     <Lightbox
//       css={styled.PostLightbox}
//       show={state.show}
//       onClose={() => dispatch({ type: 'data', data: null })}
//     >
//       <Container>
//         {state.data && (
//           <MdxRenderer
//             serializedSource={state.data.content}
//             components={components}
//           />
//         )}
//       </Container>
//     </Lightbox>
//   )
// }

// export default Experience

// export const getStaticProps = async () => {
//   let experienceData = []

//   try {
//     const res = await fetch(`${BackURL.URL}/api/portfolios/experience`)
//     if (res.ok) {
//       const data = await res.json()
//       experienceData = await Promise.all(
//         data.map(async (item) => ({
//           ...item,
//           content: await serialize(item.content),
//         })),
//       )
//       console.log('Fetched experience data:', experienceData)
//     } else {
//       console.error('Error fetching experience data:', res.statusText)
//     }
//   } catch (error) {
//     console.error('Fetch error:', error)
//   }

//   return {
//     props: {
//       data: experienceData,
//     },
//   }
// }
