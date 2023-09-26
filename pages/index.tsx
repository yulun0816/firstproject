import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Carousel from '@/components/carousel/carousel';
import HomeInfo from '@/components/homeInfo/homeInfo';
import Layout, { siteTitle } from '@/components/layout/layout';
import Alert from '../components/alert/alert';
import utilStyles from '../styles/utils.module.css';
import { getSortedImageFile } from '@/lib/images';
import Date from '../components/date';
import { GetStaticProps, GetServerSideProps } from 'next';

interface CarouselType {
  id: string,
  name: string
}

interface HomeInfoType {
  id: string,
  name: string,
  description: string
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  // const allPostsData = getSortedImageFile("Banner");
  // const allHomeInfoData = getSortedImageFile("HomeInfo");
  const allPostsData = await (await fetch("https://firstproject-sigma-black.vercel.app/api/carousel")).json();
  const allHomeInfoData = await (await fetch("https://firstproject-sigma-black.vercel.app/api/homeinfo")).json();
  return {
    props: {
      allPostsData,
      allHomeInfoData
    }
  }
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const allPostsData = await (await fetch("https://firstproject-sigma-black.vercel.app/api/carousel")).json();
//   const allHomeInfoData = await (await fetch("https://firstproject-sigma-black.vercel.app/api/homeinfo")).json();
//   return {
//     props: {
//       allPostsData,
//       allHomeInfoData
//     }
//   }
// }

export default function Home({ allPostsData, allHomeInfoData }: { allPostsData: [CarouselType]; allHomeInfoData: [HomeInfoType]; }) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Carousel allPostsData={allPostsData} />
      <HomeInfo allHomeInfoData={allHomeInfoData} />
    </Layout>
  );
}
