import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types/posts';
import Spinner from '@/app/components/loaders/spinner';

interface PostListProps {
  endPoint: string;
  pageSize: number;
}

const fetchData = async (url: string): Promise<{ data: Post[] }> => {
  const response = await fetch(url,{ next: { revalidate: 10 } });
  const data = await response.json();
  return data;
};

const PostList = async ({ endPoint, pageSize }: PostListProps) => {

  const url = `https://${process.env.BACKEND_API_DOMAIN}/api/${endPoint}?pagination[pageSize]=${pageSize}&populate=featured_image`;
  const postData = await fetchData(url);
  const { data } = postData; 

  if (!data) {
    return <Spinner />;
  }

  return (
    <>
      {data.map((post) => (
        <div key={post.id} className='mb-8 p-4 rounded-md dark:border-slate-800 dark:bg-slate-800'>
          <Link href={`/posts/${post.attributes.slug}`}>{post.attributes.featured_image && post.attributes.featured_image.data ? (
            <>
              <Image
                src={`https://${process.env.BACKEND_API_DOMAIN + post.attributes.featured_image.data.attributes.url}`}
                width={post.attributes.featured_image.data.attributes.width}
                height={post.attributes.featured_image.data.attributes.height}
                alt={post.attributes.title}
                className='mx-auto mb-4'
              />
            </>
          ) : null}
            <h1 className='text-2xl font-medium mb-4'>{post.attributes.title}</h1>
          </Link>
          <p>{post.attributes.body}</p>
        </div>
      ))}
    </>
  );
};

export default PostList;