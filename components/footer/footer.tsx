import footerStyles from './footer.module.scss';
import utilsStyles from '../../styles/utils.module.css';
import Image from 'next/image';
import { FaEnvelope, FaPhone, FaFacebook, FaLine, FaSquareInstagram } from 'react-icons/fa6';

export default function Footer() {
    return (
        <div>
            <div className={footerStyles.container}>
                <div>
                    <Image
                        priority
                        src="/images/profile.jpg"
                        className={utilsStyles.borderCircle}
                        height={80}
                        width={80}
                        alt=""
                    />
                </div>
                <div className={footerStyles.content}>
                    <div className={footerStyles.title}>瀅瀅美代子</div>
                    <div>
                        <p>YING YING,MEI-DAI-ZI</p>
                        <p>
                            <FaEnvelope /> Email:<br />
                            ying2meidaizi@gmail.com
                        </p>
                        <p>
                            <FaPhone /> phone:<br />
                            0987-654-321
                        </p>
                        <p className={footerStyles.socialIcon}>
                            <FaFacebook />
                            <FaLine />
                            <FaSquareInstagram />
                        </p>
                    </div>
                </div>
                <div className={footerStyles.content}>
                    <div className={footerStyles.title}>店家資訊</div>
                    <div>
                        <p>關於瀅瀅美代子</p>
                        <p>聯絡我們</p>
                    </div>
                </div>
                <div className={footerStyles.content}>
                    <div className={footerStyles.title}>購物須知</div>
                    <div>
                        <p>購物與退換貨</p>
                        <p>常見問題 FAQ</p>
                        <p>隱私權政策</p>
                    </div>
                </div>
            </div>
            <div className={footerStyles.footer}>
                <div>© Copyright - 瀅瀅美代子YING YING,MEI-DAI-ZI</div>
                <div> - design by alan</div>
            </div>
        </div>
    )
}