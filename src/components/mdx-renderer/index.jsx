import { MDXRemote } from 'next-mdx-remote'
import { MDXProvider } from '@mdx-js/react'
import { serialize } from 'next-mdx-remote/serialize'

const MdxRenderer = ({ serializedSource, components }) => (
  <MDXProvider components={components}>
    <MDXRemote {...serializedSource} />
  </MDXProvider>
)

export default MdxRenderer

// import { MDXRemote } from 'next-mdx-remote'
// import { MDXProvider } from '@mdx-js/react'

// const MdxRenderer = (props) => {
//   const { frontmatter, compiledSource, scope } = props.serializedSource
//   return (
//     <MDXProvider components={props.components}>
//       <MDXRemote
//         frontmatter={frontmatter}
//         compiledSource={compiledSource}
//         scope={scope}
//       />
//     </MDXProvider>
//   )
// }

// export default MdxRenderer
