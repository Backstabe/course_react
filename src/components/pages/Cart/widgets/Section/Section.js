import React, { Component } from 'react';

import CartButton from '~/src/components/pages/Cart/widgets/CartButton';

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
  }

  handleDragEnter() {
    this.setState({ hover: true });
  }

  handleDragLeave() {
    this.setState({ hover: false });
  }

  handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }

  handleDrop(e) {
    this.props.addToCart(e.dataTransfer.getData('text/plain'));
    this.setState({ hover: false });
  }

  render() {
    let cartClass = ['cart__drop_zone'];
    if(this.state.hover) { cartClass.push('target') };

    return(
      <div
        className={ cartClass.join(' ') }
        onDragEnter={ this.handleDragEnter }
        onDragLeave={ this.handleDragLeave }
        onDragOver={ this.handleDragOver }
        onDrop={ (e) => this.handleDrop(e) }
      >
        <div className='cart__drop_zone-label'>Drop Product here</div>
        <CartButton/>
      </div>
    );
  }
}

export default Section;
