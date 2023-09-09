import { Post } from '@/types/posts';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { strapiFetch } from '@/data/stapiFetch';

interface PostListProps {
  params: {
    slug: string;
  };
}

const PostSlug = async ({ params }: PostListProps) => {
  const slug = params.slug;

  // Use the fetchData function to fetch data
  const postData = await strapiFetch('posts', {
    filters: `slug[$eq]=${slug}`,
    populate: 'featured_image',
  });

  if (!postData.data[0]) {
    redirect('/not-found');
  }

  const post: Post = postData.data[0]; // Assuming there is only one post with the given slug

  return (
    <>
      <div className="my-8 container mx-auto md:max-w-6xl px-4">
        <div className="p-4 rounded-md dark:border-slate-800 dark:bg-slate-800">
          {post.attributes.featured_image && post.attributes.featured_image.data ? (
            <>
              <Image
                src={`https://${process.env.BACKEND_API_DOMAIN + post.attributes.featured_image.data.attributes.url}`}
                width={post.attributes.featured_image.data.attributes.width}
                height={post.attributes.featured_image.data.attributes.height}
                alt={post.attributes.title}
                className="mx-auto mb-4"
              />
            </>
          ) : null}
          <h1 className="text-2xl font-medium mb-4">{post.attributes.title}</h1>
          <p>{post.attributes.body}</p>
        </div>
      </div>
    </>
  );
};

export default PostSlug;




