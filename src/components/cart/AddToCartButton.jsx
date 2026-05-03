// src/components/cart/AddToCartButton.jsx
import { useCart } from "./useCart";

export default function AddToCartButton({
  item,
  qty = 1,
  children = "迎える",
  className,
  openAfterAdd = true,
  ...rest
}) {
  const { addItem, openCart } = useCart();

  const onClick = () => {
    addItem(item, qty);
    if (openAfterAdd) openCart();
  };

  return (
    <button type="button" className={className} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}