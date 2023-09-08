import PostList from "./data/postlist";

export default function Home() {
  return (
   <>
   <PostList endPoint="posts" pageSize={2}/>
   </>
  )
}
