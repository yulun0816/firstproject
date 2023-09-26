import Link from 'next/link';
import Image from 'next/image';
import productStyle from './product.module.scss';
import utilStyles from '@/style/utils.module.css';

interface productType {
    id: number
    name: string,
    img: string,
    price: number
}

export default function Product({ productionsData }: { productionsData: [productType] }) {
    return (
        <>
            <div className={utilStyles.posRelative}>
                <Image
                    src="/images/product.jpg"
                    width={1920}
                    height={500}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    alt=""
                />
                <div className={productStyle.productTitleText}>| 所有商品 |</div>
            </div>
            <div className={productStyle.productContainer}>
                {productionsData &&
                    productionsData.map((items, index) => (
                        <Link href={`/products/${items.id}`} className={productStyle.products} key={items.id}>
                            <figure>
                                <Image
                                    src={`/images/products/${items.img}`}
                                    width={400}
                                    height={400}
                                    alt=""
                                />
                                <figcaption className={productStyle.productFigcaption}>
                                    <div className={productStyle.productText}>{items.name}</div>
                                    <div className={productStyle.productPrice}>NT${items.price}</div>
                                </figcaption>
                            </figure>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}