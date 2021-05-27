import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import './Cart.scss';
import { createAction } from '../../Redux/Action';
import { ITEM_DETAIL } from '../../Redux/Constants';
function Cart() {
  const cartArr = useSelector((item) => item.ShoesReducer.cart);
  //Total Cart In Redux
  const cart = useSelector((item) => item.ShoesReducer.cart);
  const dispatch = useDispatch();
  //Dispatch Shoe In Store Redux
  const handleShoeDetail = (item) => {
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
    // setSizeShoe(false);
    dispatch(createAction(ITEM_DETAIL, item));
  };
  //Render Cart
  const renderCart = () => {
    return cartArr
      .map((item) => {
        return (
          <React.Fragment>
            <tr className="cart__items__item" key={item.id}>
              <td className="cart__items__item__product">
                <Link
                  to={`/shoe-detail/${item.id}`}
                  onClick={() => handleShoeDetail(item)}
                >
                  <div className="cart__items__item__product__image">
                    <img src={item.linkImage} alt={`cart-${item.id}`} />
                  </div>
                </Link>
                <h1>{item.name}</h1>
              </td>
              <td>Grey</td>
              <td>
                {item.sizeShoes
                  .filter((item) => item.check === true)
                  .map((sizeTrue) => {
                    return <React.Fragment>{sizeTrue.size}</React.Fragment>;
                  })}
              </td>
              <td className="cart__items__item__amount">
                <div>
                  <NavigateBeforeIcon />
                </div>
                <span>{item?.amount}</span>
                <div>
                  <NavigateNextIcon />
                </div>
              </td>

              <td>
                {item.priceDiscount === null ? (
                  <div>
                    {item.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </div>
                ) : (
                  <div>
                    {item.priceDiscount.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </div>
                )}
              </td>
              <td>
                {item.priceDiscount === null ? (
                  <div className="cart__items__item__totalPrice">
                    {(item.price * item.amount).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </div>
                ) : (
                  <div className="cart__items__item__totalPrice">
                    {(item.priceDiscount * item.amount).toLocaleString(
                      'en-US',
                      { style: 'currency', currency: 'USD' }
                    )}
                  </div>
                )}
              </td>
              {/* <div className="cart__items__item__remove">
              <HighlightOffIcon />
            </div> */}
            </tr>
          </React.Fragment>
        );
      })
      .reverse();
  };
  return (
    <div className="cart">
      <div className="cart__title">
        <h1>Your Shoppping Cart</h1>
        <Link
          to="/"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
        >
          <button>
            <ArrowBackIcon />
            <p>Continue Shopping</p>
          </button>
        </Link>
      </div>
      <div className="cart__items">
        <table id="products">
          <thead>
            <tr>
              <th>Products</th>
              <th>Color</th>
              <th>Size</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>{renderCart()}</tbody>
        </table>
        <div className="cart__order">
          <h1 className="cart__order__title">Order Summary</h1>
          <div className="cart__order__items">
            <h2>
              ITEMS:{' '}
              <span className="cart__order__items__length">
                {cartArr?.length}
              </span>
            </h2>
          </div>
          <div className="cart__order__shipping">
            <h2>SHIPPING</h2>
            <select>
              <option>Standord Delivery - $5.00</option>
            </select>
          </div>
          <div className="cart__order__promo">
            <h2>PROMO CODE</h2>
            <input placeholder="Enter your code" />
          </div>
          <button className="cart__order__apply">APPLY</button>
          <div className="cart__order__total">
            <h2>TOTAL COST</h2>
            <span>
              {cart.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </span>
          </div>
          <button className="cart__order__checkout">CHECKOUT</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
