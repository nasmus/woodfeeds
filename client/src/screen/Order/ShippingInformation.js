import { useContext } from "react";
import { Store } from "../../Store";
import LogInShippingInfo from "../../components/LogInShippingInfo";
import LogOutShippingInfo from "../../components/LogOutShippingInfo";


export default function ShippingInformation() {
   const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress, paymentMethod, cartItems },
  } = state;
  return (
    userInfo ? (
    <LogInShippingInfo />
    ) : (
        <LogOutShippingInfo />
    )
  )
}