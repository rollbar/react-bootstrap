import React from 'react';
import OverlayMixin from './OverlayMixin';
import RootCloseWrapper from './RootCloseWrapper';


export default function createOverlayedComponent (render, { renderChildren = false, rootClose = true } = {}) {

  return React.createClass({

    displayName: 'OverlayedComponent',

    mixins: [ OverlayMixin ],

    propTypes: {
      show: React.PropTypes.bool,
      onHide:  React.PropTypes.func,
      rootClose: React.PropTypes.bool
    },

    renderOverlay() {
      if (!this.props.show) {
        return null;
      }

      let overlay = render(this.props, this.getContainerDOMNode());

      if ( rootClose && this.props.rootClose ){
        return (
          <RootCloseWrapper onRootClose={this.props.onHide}>
            {overlay}
          </RootCloseWrapper>
        );
      } else {
        return overlay;
      }
    },

    render() {
      return this.props.children && renderChildren
        ? this.props.children
        : null;
    }
  });
}

