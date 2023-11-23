import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Cancel_Button.css'

export default class CancelButton extends Component {
    static propTypes = {
        button_text:PropTypes.string.isRequired,
        button_style: PropTypes.object
    }

    static defaultProps = {
        button_style: {
            left: '10px'
        }
    }

    render() {
        return (
            <button class="fny_cancel_button" style={this.props.button_style}>{this.props.button_text}</button>
        )
    }
}