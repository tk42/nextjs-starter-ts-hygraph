import { fetchAPI } from './hygraph'

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
    }
  }
  `)

  const items: Items = {
    'title': res.post.title,
    'date': res.post.date,
    'slug': res.post.slug,
    'content': res.post.content.markdown,
    'author': res.post.author.name,
    'ogImage': res.post.author.picture.url,
    'coverImage': res.post.coverImage.url
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

  const items: Items[] = []
  res.posts.forEach(element => {
    items.push({
      'title': element.title,
      'date': element.date,
      'slug': element.slug,
      'coverImage': element.coverImage.url,
      'author': element.author.name,
      'excerpt': element.excerpt
    })
  });

  return items
}
