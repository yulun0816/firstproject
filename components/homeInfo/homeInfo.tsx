import homeInfoStyle from './homeInfo.module.scss'
import Image from 'next/image';

export default function HomeInfo({ allHomeInfoData }: {
    allHomeInfoData: [{
        id: string,
        name: string,
        description: string
    }];
}) {
    return (
        <div>
            <div className={homeInfoStyle.content}>
                <div className={homeInfoStyle.title}>
                    <h3>最新商品</h3>
                </div>
                <div className={homeInfoStyle.hrInner}></div>
                {
                    allHomeInfoData &&
                    allHomeInfoData.map((items, index) => (
                        <div className={homeInfoStyle.itemsContainer} key={items.id}>
                            <div className={homeInfoStyle.itemImg}>
                                <Image
                                    priority
                                    src={`/images/HomeInfo/${items.name}`}
                                    width={600}
                                    height={400}
                                    alt=""
                                    style={{
                                        width: '100%',
                                        height: '100%'
                                    }}
                                />
                            </div>
                            <div className={homeInfoStyle.itemInfo}>
                                <div className={homeInfoStyle.itemInfoTitle}>商品說明</div>
                                <div className={homeInfoStyle.itemInfoText}>
                                    {items.description}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}