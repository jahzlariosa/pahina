import PostList from "../data/postlist";

export default function Home() {
  return (
   <>
   <div className="container my-8 mx-auto max-w-6xl px-4">
    <div className="flex flex-col space-y-4">
      <PostList endPoint="posts" pageSize={2}/>
    </div>
   </div>
   </>
  )
}
