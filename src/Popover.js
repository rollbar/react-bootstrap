/* eslint-disable react/no-multi-comp */
import React from 'react';
import classNames from 'classnames';
import BootstrapMixin from './BootstrapMixin';
import FadeMixin from './FadeMixin';
import Overlay from './Overlay';

const Popover = React.createClass({

  mixins: [BootstrapMixin, FadeMixin],

  propTypes: {
    placement: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    positionLeft: React.PropTypes.number,
    positionTop: React.PropTypes.number,
    arrowOffsetLeft: React.PropTypes.oneOfType([
      React.PropTypes.number, React.PropTypes.string
    ]),
    arrowOffsetTop: React.PropTypes.oneOfType([
      React.PropTypes.number, React.PropTypes.string
    ]),
    title: React.PropTypes.node,
    animation: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      placement: 'right',
      animation: true
    };
  },

  render() {
    const classes = {
      'popover': true,
      [this.props.placement]: true,
      // in class will be added by the FadeMixin when the animation property is true
      'in': !this.props.animation && (this.props.positionLeft != null || this.props.positionTop != null),
      'fade': this.props.animation
    };

    const style = {
      'left': this.props.positionLeft,
      'top': this.props.positionTop,
      'display': 'block'
    };

    const arrowStyle = {
      'left': this.props.arrowOffsetLeft,
      'top': this.props.arrowOffsetTop
    };

    return (
      <div role='tooltip' {...this.props} className={classNames(this.props.className, classes)} style={style} title={null}>
        <div className="arrow" style={arrowStyle} />
        {this.props.title ? this.renderTitle() : null}
        <div className="popover-content">
          {this.props.children}
        </div>
      </div>
    );
  },

  renderTitle() {
    return (
      <h3 className="popover-title">{this.props.title}</h3>
    );
  }
});

// const OverlayPopover = React.createClass({
//   render(){
//     return (
//       <Overlay {...this.props}>
//         <Popover {...this.props}>
//           { this.props.children }
//         </Popover>
//       </Overlay>
//     );
//   }
// });

// OverlayPopover.PopoverMarkup = Popover;

export default Popover;
