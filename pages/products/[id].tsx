import Layout from '@/components/layout/layout';
import { GetStaticProps, GetServerSideProps, GetStaticPaths } from 'next';
import { productType } from '@/model/customType';
import productsStyle from './products.module.scss';
import Image from 'next/image';

export const getStaticPaths: GetStaticPaths = async () => {
    const api = await fetch('https://firstproject-sigma-black.vercel.app/api/products', {
        method: "POST",
        body: JSON.stringify({ filter: 'id' }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await api.json();
    const paths = data.map(item => '/products/' + item);
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const api = await fetch('https://firstproject-sigma-black.vercel.app/api/products', {
        method: "POST",
        body: JSON.stringify({ id: params.id }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await api.json();
    const postData = data[0];
    return {
        props: {
            postData,
        },
    };
}

export default function Product({ postData }: { postData: productType }) {
    return (
        <Layout>
            <div className={productsStyle.container}>
                <div className={productsStyle.productContent}>
                    <div className={productsStyle.productImage}>
                        <Image
                            src={`/images/products/${postData.img}`}
                            width={550}
                            height={550}
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                            alt=""
                        />
                    </div>
                    <div className={productsStyle.productText}>
                        <div className={productsStyle.productName}>{postData.name}</div>
                        <div className={productsStyle.productDesc} dangerouslySetInnerHTML={{ __html: postData.desc }}></div>
                        <div className={productsStyle.productPrice}>NT${postData.price}</div>
                    </div>
                </div>

            </div>
        </Layout>
    )
}