import * as fs from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import { globby } from 'globby';
import matter from 'gray-matter';

const parseAllMdx = async (dir) => {
  // Check if we're running on the server
  if (typeof window !== 'undefined') {
    return [];
  }

  // Ensure the directory path is not too long
  if (dir.length > 255) {
    throw new Error('Directory path is too long');
  }

  // Server-side code here
  try {
    console.log(`Parsing MDX files in directory: ${dir}`);
    const fileList = await globby(`./${dir}`);
    
    // Ensure none of the file paths are too long
    fileList.forEach(file => {
      if (file.length > 255) {
        throw new Error(`File path is too long: ${file}`);
      }
    });

    const filePromises = fileList.map(async (file) => {
      try {
        console.log("avant content")
        const content = await fs.promises.readFile(file, { encoding: 'utf8' });
        console.log(content, "content")
        const frontmatter = matter(content).data;

        const serializedContent = await serialize(content, {
          parseFrontmatter: true,
          scope: { frontmatter },
        });

        return {
          content: serializedContent,
          frontmatter,
        };
      } catch (fileErr) {
        throw new Error(`Error processing file ${file}: ${fileErr.message}`);
      }
    });

    return await Promise.all(filePromises);
  } catch (err) {
    throw new Error(`Error parsing MDX files: ${err.message}`);
  }
};

export default parseAllMdx;