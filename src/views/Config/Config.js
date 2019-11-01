import React, {Component} from 'react'
import {card as cardStyle, hr as hrStyle} from './utils/styles';

import UserCard from './userCard'
import SocialButton from "./SocialButton";

class Config extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logged: false,
            user: {},
            currentProvider: ''
        }
        this.nodes = {};

        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLoginFailure = this.onLoginFailure.bind(this);
        this.onLogoutSuccess = this.onLogoutSuccess.bind(this);
        this.onLogoutFailure = this.onLogoutFailure.bind(this);
        this.logout = this.logout.bind(this)
    }

    setNodeRef(provider, node) {
        if (node) {
            this.nodes[provider] = node
        }
    }

    onLoginSuccess(user) {
        console.log(user)

        this.setState({
            logged: true,
            currentProvider: user._provider,
            user
        })
    }

    onLoginFailure(err) {
        console.error(err);

        this.setState({
            logged: false,
            currentProvider: '',
            user: {}
        })
    }

    onLogoutSuccess() {
        this.setState({
            logged: false,
            currentProvider: '',
            user: {}
        })
    }

    onLogoutFailure(err) {
        console.error(err)
    }

    logout() {
        const {logged, currentProvider} = this.state;

        if (logged && currentProvider) {
            this.nodes[currentProvider].props.triggerLogout()
        }
    }

    render() {
        let children;

        if (this.state.logged) {
            children = <UserCard user={this.state.user} logout={this.logout}/>
        } else {
            children = [
                <SocialButton
                    provider='facebook'
                    appId={2520116898275286}
                    onLoginSuccess={this.onLoginSuccess}
                    onLoginFailure={this.onLoginFailure}
                    onLogoutSuccess={this.onLogoutSuccess}
                    getInstance={this.setNodeRef.bind(this, 'facebook')}
                    key={'facebook'}
                >
                    Login with Facebook
                </SocialButton>,
                <SocialButton
                    provider='google'
                    appId='9137971612-s5rhj4kmstu603gdk3ndlobruav0fc7d.apps.googleusercontent.com'
                    onLoginSuccess={this.onLoginSuccess}
                    onLoginFailure={this.onLoginFailure}
                    onLogoutSuccess={this.onLogoutSuccess}
                    onLogoutFailure={this.onLogoutFailure}
                    getInstance={this.setNodeRef.bind(this, 'google')}
                    key={'google'}
                >
                    Login with Google
                </SocialButton>,
                /*
                <SocialButton
                    autoCleanUri
                    provider='instagram'
                    appId='afdf675d26214280ac9a792afea5651c'
                    redirect={process.env.INSTAGRAM_REDIRECT}
                    onLoginSuccess={this.onLoginSuccess}
                    onLoginFailure={this.onLoginFailure}
                    onLogoutSuccess={this.onLogoutSuccess}
                    getInstance={this.setNodeRef.bind(this, 'instagram')}
                    key={'instagram'}
                >
                    Login with Instagram
                </SocialButton>,
                <SocialButton
                    provider='linkedin'
                    appId='7775kne2guetd0'
                    onLoginSuccess={this.onLoginSuccess}
                    onLoginFailure={this.onLoginFailure}
                    onLogoutSuccess={this.onLogoutSuccess}
                    getInstance={this.setNodeRef.bind(this, 'linkedin')}
                    key={'linkedin'}
                >
                    Login with LinkedIn
                </SocialButton>
                */
            ]

            // Amazon only supports HTTPS
            if (window.location.protocol === 'https:') {
                children.push(
                    <SocialButton
                        provider='amazon'
                        appId='amzn1.application-oa2-client.e726e756e5c94453836bd8aab285f54b'
                        onLoginSuccess={this.onLoginSuccess}
                        onLoginFailure={this.onLoginFailure}
                        onLogoutSuccess={this.onLogoutSuccess}
                        getInstance={this.setNodeRef.bind(this, 'amazon')}
                        key={'amazon'}
                    >
                        Login with Amazon
                    </SocialButton>
                )
            } else {
                // We don’t use HTTPS because of Gatekeeper, but it can be enabled if Gatekeeper is served over HTTPS
                // children.push(
                //     <SocialButton
                //         autoCleanUri
                //         provider='github'
                //         gatekeeper='http://localhost:9999'
                //         appId='8a7c2edb2e602d969839'
                //         redirect='http://localhost:8080'
                //         onLoginSuccess={this.onLoginSuccess}
                //         onLoginFailure={this.onLoginFailure}
                //         onLogoutSuccess={this.onLogoutSuccess}
                //         getInstance={this.setNodeRef.bind(this, 'github')}
                //         key={'github'}
                //     >
                //         Login with GitHub OAuth
                //     </SocialButton>
                // )
            }
        }

        return children
    }
}

const Configuration = () => {
    return (
        <div style={{...cardStyle, padding: '1.5rem 2rem', margin: '5em auto'}}>
            <strong>Login:</strong>
            <hr style={hrStyle}/>
            <Config/>
        </div>)
};

export default Configuration;