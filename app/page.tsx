import PostList from "./data/postlist";

export default function Home() {
  return (
   <>
   <div className="container my-8 mx-auto max-w-xl">
    <div className="flex flex-col">
      <PostList endPoint="posts" pageSize={2}/>
    </div>
   </div>
   </>
  )
}
