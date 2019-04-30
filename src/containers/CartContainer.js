import React, { Component } from 'react';

import { CartProvider } from '../contexts/cartContext';

class CartContainer extends Component {
  constructor(prors){
    super(prors);
    this.state = {
      cart: []
    }

    this.buy = this.buy.bind(this);
    this.productList = this.productList.bind(this);
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
          productList: this.productList
        }}
      >
        { this.props.children }
      </CartProvider>
    );
  }
}

export default CartContainer;