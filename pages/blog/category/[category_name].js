import Layout from "@/components/Layout";
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link";
import Post from "@/components/Post";
import { sortByDate } from "@/utils/index";

export default function CategoryPage({posts, categoryName}) {

  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5
      font-bold">Posts with topic of {categoryName}</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
        {posts.map((post, index) => 
          <Post post={post} key={index} />
        )}
      </div>
    
    </Layout>
  )
}

export async function getStaticPaths()
{
    const files = fs.readdirSync(path.join('posts'))
    const categories = files.map(filename=>{
        const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

        const {data: frontmatter} = matter(markdownWithMeta)

        return frontmatter.category.toLowerCase()
    })

    const paths = categories.map(category => ({
        params: {category_name: category}
    }) )

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params: {category_name}})
{
    console.log(category_name)
    const files = fs.readdirSync(path.join('posts'))
    const posts = files.map(file => {
    const slug = file.replace('.md', '')
    
    const markdownWithMeta = fs.readFileSync(path.join('posts', file), 'utf-8')
    
    const {data:frontmatter} = matter(markdownWithMeta)
    
    return { slug, frontmatter }
  })

    //   filter by category
    const categoryPost = posts.filter((post) => post.frontmatter.category.toLowerCase() === category_name )

  return {
    props: {
        posts: categoryPost,
        categoryName: category_name
    },
  }
}