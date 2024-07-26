import { useContext, createContext, useReducer, useState } from 'react'
import SectionWrapper from 'root/src/components/section-wrapper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'
import { Card, Col, Row, Container } from 'react-bootstrap'
import Lightbox from 'root/src/components/lightbox'
import classNames from 'classnames'
import MdxRenderer from 'root/src/components/mdx-renderer'
// Import the .mdx files
import altContent from 'root/src/partials/experience/data/alt.mdx'
import tradingContent from 'root/src/partials/experience/data/traiding.mdx'
import southworksContent from 'root/src/partials/experience/data/southworks.mdx'
import maquinagroContent from 'root/src/partials/experience/data/maquinagro.mdx'
import altaRegionContent from 'root/src/partials/experience/data/alta-region.mdx'
import styled from './style'

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1)

const Context = createContext({})

const experienceData = [
  {
    title: 'FULL STACK DEVELOPER',
    date: '2023-2024',
    tags: [
      'JavaScript',
      'TypeScript',
      'React.js',
      'Next.js',
      'Nest.js',
      'Express',
      'Node.js',
      'Docker',
      'MongoDB',
    ],
    summary:
      'Fullstack developer on a web application for artisan sales, using Next.js, NestJS, and MongoDB.',
    thumbnail: {
      url: 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1717062359/AlticonfaviconLogo_yx8zqz.jpg',
    },
    content: altContent,
  },
  {
    title: 'Algorithmic Trading',
    date: '2022',
    tags: ['Market Analysis', 'Risk Management', 'Python', 'Django', 'Flask'],
    summary:
      'Focused on cryptocurrency trading for two clients who are experts in finance and trading.',
    thumbnail: {
      url: 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1717063106/DALL_E_2024-05-30_11.57.52_-_A_simple_image_featuring_the_words_Trading_and_Blockchain_with_a_clean_professional_font._Use_yellow_and_another_color_for_differentiation._Inclu_lz1zxg.webp',
    },
    content: tradingContent,
  },
  {
    title: 'FULL STACK DEVELOPER',
    date: '2020-2022',
    tags: [
      'Node.js',
      'React.js',
      'Agile Methodology',
      'MongoDB',
      'Docker',
      'Git',
    ],
    summary:
      'Worked as a FullStack developer from 2020 until mid-July 2022 at SOUTHWORKS.',
    thumbnail: {
      url: 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1720509583/southworklogo_r4klml.jpg',
    },
    content: southworksContent,
  },
  {
    title: 'QA Tester',
    date: '2016-2017',
    tags: [
      'Oracle',
      'Postman',
      'JIRA',
      'Selenium IDE',
      'Teamwork',
      'Requirement Analysis',
      'Database Creation',
    ],
    summary:
      'Worked as a QA Tester at MAQUINAGRO, a company specializing in the manufacture of agricultural machinery.',
    thumbnail: {
      url: 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1717063518/maquinagroLogo_z0smxn.jpg',
    },
    content: maquinagroContent,
  },
  {
    title: 'QA Tester',
    date: '2015-2016',
    tags: [
      'Visual Studio Team System (VSTS)',
      'Functional Testing',
      'Teamwork',
      'Stress Management',
    ],
    summary: 'Worked as a QA Tester at Alta-Region, a web development company.',
    thumbnail: {
      url: 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1718037064/alta_region_tester_hijmes.webp',
    },
    content: altaRegionContent,
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

  const dateToText = (dateInput) => dateInput

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
