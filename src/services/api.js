import axios from 'axios'

const fetchAboutData = async () => {
  const response = await axios.get('http://localhost:3001/api/portfolios/about')
  return response.data
}

export default fetchAboutData

// //import axios from 'axios'

// const API_URL = 'localhost:3001/api/portfolios'

// export const fetchAboutData = async () => {
//   try {
//     debugger
//     const response = await fetch('localhost:3001/api/portfolios/about')
//     return response.data
//   } catch (error) {
//     console.error('Failed to fetch about data:', error)
//     throw error
//   }
// }

// export default fetchAboutData
