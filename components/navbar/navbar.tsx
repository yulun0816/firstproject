import Link from 'next/link';
import Image from 'next/image';
import navbarStyles from './navbar.module.scss';
import utilsStyles from '../../styles/utils.module.css';
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { getCartCount } from 'reducer/projectReducer';
import { useSelector } from 'react-redux';

export default function NavBar() {
    const cartCount = useSelector(getCartCount);
    console.log(cartCount)
    return (
        <div className={navbarStyles.container}>
            <Link href="/" className={navbarStyles.titleIcon}>
                <Image
                    priority
                    src="/images/profile.jpg"
                    className={utilsStyles.borderCircle}
                    height={80}
                    width={80}
                    alt=""
                />
                <span>瀅瀅美代子</span>
            </Link>
            <ul className={navbarStyles.itemList}>
                <li>
                    <Link href="/"><span>首頁</span></Link>
                </li>
                <li>
                    <Link href="/products"><span>所有商品</span></Link>
                </li>
                <li>
                    <Link href="/posts/pre-rendering"><span>關於公司</span></Link>
                </li>
                <li>
                    <Link href="/posts/pre-rendering" className={utilsStyles.posRelative}>
                        <FaCartShopping />
                        {
                            cartCount !== null && cartCount > 0 && <div className={navbarStyles.cartCount}>{cartCount}</div>
                        }
                    </Link>
                </li>
                <li>
                    <Link href="/posts/pre-rendering"><FaUser /></Link>
                </li>
            </ul>
        </div>
    )
}