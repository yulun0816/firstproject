import Layout from '@/components/layout/layout';
import { GetStaticProps, GetServerSideProps, GetStaticPaths } from 'next';
import { productType } from '@/model/customType';
import productsStyle from './products.module.scss';
import Image from 'next/image';
import React, { useState } from 'react';
import { getCartCount, setCartCount } from 'reducer/projectReducer';
import { useSelector, useDispatch } from 'react-redux';

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
    const cartCount = useSelector(getCartCount);
    const dispatch = useDispatch();

    const [count, setCount] = useState(1);

    const handlerMinusAndPlus = (type: string) => {
        switch (type) {
            case "plus":
                setCount(n => n + 1);
                break;
            case "minus":
                if (count - 1 > 0) {
                    setCount(n => n - 1);
                }
                break;
        }
    }

    const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let v = parseInt(event.target.value);
        if (isNaN(v) || !v) {
            setCount(1)
        } else {
            setCount(parseInt(event.target.value))
        }
    }

    const handlerCartAdd = () => {
        dispatch(setCartCount(cartCount + count))
    }

    return (
        <Layout>
            <div className={productsStyle.container}>
                <div className={productsStyle.productContent}>
                    <div className={productsStyle.productImage}>
                        <Image
                            src={`/images/products/${postData.img}`}
                            width={550}
                            height={550}
                            priority
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
                        <div>
                            <input type="button" value="-" className={productsStyle.cartMinusPlusBtn} onClick={() => handlerMinusAndPlus("minus")} />
                            <input className={productsStyle.cartNumber} type="number" min="1" name="quantity" value={count} title="數量" size={4} inputMode="numeric" autoComplete="off" onChange={(e) => handlerInputChange(e)} />
                            <input type="button" value="+" className={productsStyle.cartMinusPlusBtn} onClick={() => handlerMinusAndPlus("plus")} />
                        </div>
                        <div>
                            <button className={productsStyle.cartAddBtn} onClick={handlerCartAdd}>加入購物車</button>
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    )
}