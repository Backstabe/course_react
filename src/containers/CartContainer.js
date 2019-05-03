import React, { Component } from 'react';

import { CartProvider } from '../contexts/cartContext';

import history from '~/src/helpers/history';

class CartContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      cart: []
    }

    this.buy = this.buy.bind(this);
    this.productList = this.productList.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  buy(product_id, product_quantity = 1) {
    const { cart } = this.state;
    const id = parseInt(product_id);
    const quantity = parseInt(product_quantity);

    const index = cart.findIndex(x => x.id === id);

    if (index == -1) {
      this.setState({ cart: [...cart, { id, quantity }]})
    } else {
      cart[index].quantity += quantity;
      this.setState({ cart });
    }
  }

  renderRedirect() {
    if (this.state.cart.length == 0) {
      history.push('/', 'Cart is empty')
    }
  }

  productList(products){
    const { cart } = this.state;

    return (
      cart.map((item) =>
        ({
          ...item,
          product: products.find(x => x.id === item.id)
        })
      )
    )
  }

  handleDragStart(e, id) {
    e.dataTransfer.setData('text/plain', id);
  }

  render() {
    const { cart } = this.state;

    return(
      <CartProvider
        value={{
          cart,
          buy: this.buy,
          dragStart: this.handleDragStart,
          productList: this.productList,
          blankCartRedirect: this.renderRedirect
        }}
      >
        { this.props.children }
      </CartProvider>
    );
  }
}

export default CartContainer;
