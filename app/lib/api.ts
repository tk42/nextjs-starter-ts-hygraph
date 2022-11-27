import { fetchAPI } from './hygraph'
import Post from '../interfaces/post'

type Items = {
  [key: string]: string
}

export async function getPostBySlug(slug: string) {
  const res = await fetchAPI(`
  query {
    post(where: {
      slug: "${slug}"
    }) {
      title
      date
      slug
      author {
        name
        picture {
          url
        }
      }
      coverImage {
        url
      }
      content {
        markdown
      }
      excerpt
    }
  }
  `)

  const items: Post = {
    'title': res.post.title,
    'date': res.post.date,
    'slug': res.post.slug,
    'content': res.post.content.markdown,
    'author': res.post.author,
    'ogImage': res.post.coverImage.url,
    'coverImage': res.post.coverImage,
    'excerpt': res.post.excerpt
  }

  return items
}

export async function getAllPosts() {
  const res = await fetchAPI(`
  query {
    posts {
      title
      date
      slug
      author {
        name
        picture {
          url
        }
      }
      coverImage {
        url
      }
      excerpt
    }
  }
  `)

  const items: Post[] = []
  res.posts.forEach(element => {
    items.push({
      'title': element.title,
      'date': element.date,
      'slug': element.slug,
      'coverImage': element.coverImage,
      'author': element.author,
      'excerpt': element.excerpt
    } as Post)
  });

  return items
}
