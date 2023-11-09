import commonStyles from './Common.module.scss';

export function CartCountBtn({
    handlerMinus,
    handlerPlus,
    handlerInputChange,
    min,
    value
}) {
    return (
        <div>
            <input type="button" value="-" className={commonStyles.cartMinusPlusBtn} onClick={handlerMinus} />
            <input className={commonStyles.cartNumber} type="number" min={min} name="quantity" value={value} title="數量" size={4} inputMode="numeric" autoComplete="off" onChange={handlerInputChange} />
            <input type="button" value="+" className={commonStyles.cartMinusPlusBtn} onClick={handlerPlus} />
        </div>
    )
}