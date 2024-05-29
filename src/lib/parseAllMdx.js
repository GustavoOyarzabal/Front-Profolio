import fs from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import { globby } from 'globby'
import matter from 'gray-matter'

// Rest of your code here

const parseAllMdx = async (dir) => {
  // Check if we're running on the server
  if (typeof window !== 'undefined') {
    return []
  }

  // Server-side code here
  try {
    const filePromises = await globby(`./${dir}`).then((fileList) =>
      fileList.map(async (file) =>
        fs.promises
          .readFile(file, {
            encoding: 'utf8',
          })
          .then(async (content) => {
            const frontmatter = matter(content).data

            return {
              content,
              frontmatter,
            }
          })
          .then(({ content, frontmatter }) =>
            serialize(content, {
              parseFrontmatter: true,
              scope: {
                frontmatter,
              },
            }),
          ),
      ),
    )

    return await Promise.all(filePromises)
  } catch (err) {
    throw new Error(err.message)
  }
}

export default parseAllMdx
