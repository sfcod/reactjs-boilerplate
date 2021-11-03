import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Login, { DispatchProps, OwnProps, StateProps } from './LoginScreen';
import { StoreState } from 'src/store/configure-store';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mapStateToProps(state: StoreState, ownProps: OwnProps): StateProps {
    return {};
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mapDispatchToProps(dispatch: Dispatch, ownProps: OwnProps): DispatchProps {
    return {};
}

const LoginScreen = connect<StateProps, DispatchProps, OwnProps, StoreState>(
    mapStateToProps,
    mapDispatchToProps,
)(Login);

export default LoginScreen;
