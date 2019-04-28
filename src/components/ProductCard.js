import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { CartConsumer } from '../contexts/cartContext';

import Image from './Image';
import TextBox from './TextBox';
import Price from './Price';
import Buy from './Buy';

const ProductCard = ({ id, price, title, image }) => (
  <Fragment>
    <CartConsumer>
      { context =>
        <div
          className='product'
          draggable
          onDragStart={ (e) => context.dragStart(e, id) }
        >
          <Image {...image} />
          <Price>{ price }</Price>
          <TextBox>{ title }</TextBox>
          <Buy>{id}</Buy>
        </div>
      }
    </CartConsumer>
  </Fragment>
);

ProductCard.propTypes = {
  id: Buy.propTypes.children,
  price: Price.propTypes.children,
  title: TextBox.propTypes.children,
  image: PropTypes.shape(Image.propTypes)
}

export default ProductCard;
