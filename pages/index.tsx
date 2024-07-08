import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { BlogPost } from '../@types/schema';
import BlogCard from '../components/BlogCard';
import NotionService from '../services/notion-service';
import { FaLinkedin } from 'react-icons/fa';

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();
  const posts = await notionService.getPublishedBlogPosts();

  return {
    props: {
      posts,
    },
  };
};

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = 'T4L0N';
  const description = '';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" title="description" content={description} />
        <meta name="og:title" title="og:title" content={title} />
        <meta name="og:description" title="og:description" content={title} />
      </Head>

      <div className="min-h-screen">
        {/* Botão de LinkedIn no topo */}
        <div className="fixed top- right-3">
          <a
            href="https://www.linkedin.com/in/gabriel-silva-509347165/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900"
          >
            <FaLinkedin size={32} />
          </a>
        </div>

        <main className="max-w-5xl mx-auto relative">
          <div className="h-full pt-4 pb-16 mx-auto">
            <div className="flex items-center justify-center">
              <h1 className="font-extrabold text-4xl text-black">T4L0N</h1>
            </div>
            <h1 className="font-bold text-3xl text-black">Posts Recentes:</h1>
            <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              {posts.map((post: BlogPost) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
