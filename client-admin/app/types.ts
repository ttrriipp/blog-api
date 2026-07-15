export interface User {
  id: number,
  name: string,
  username: string,
  role: string
}

interface Author {
  name: string
}

export interface Post {
  id: number,
  content: string,
  author: Author,
  title: string,
  published: boolean,
  createdAt: Date,
  updatedAt: Date
}

export interface PostTableProps {
  posts: Post[]
}

export interface NavBarProps {
  user: User | null
}
