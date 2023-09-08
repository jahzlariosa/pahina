import PostList from "./data/postlist";

export default function Home() {
  return (
   <>
   <div className="container my-8 mx-auto">
    <div className="flex">
      <PostList endPoint="posts" pageSize={2}/>
    </div>
   </div>
   </>
  )
}
