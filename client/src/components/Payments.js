import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../reducers/actions'
class Payments extends Component {


    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }



    render() {
        return (
            <div>
                <StripeCheckout
                    name="Emaily!."
                    description="$5 for five email credits"
                    amount={500} //u.s cents
                    token={token => this.props.handleStripeToken(token)}
                    stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}

                >
                    {/* <button className="waves-effect waves-light btn">Add credits</button> */}

                </StripeCheckout>
            </div>
        )
    }
}



export default connect(null, actions)(Payments);