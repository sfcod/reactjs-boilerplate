import PasswordRecoveryScreen, { DispatchProps, StateProps } from './PasswordRecoveryScreen';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StoreState } from 'src/store/configure-store';
import { appRedirectToDefault } from 'src/store/reducers/app-reducer';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mapStateToProps(state: StoreState): StateProps {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return {
        redirectToDefault: () => dispatch(appRedirectToDefault()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecoveryScreen);
