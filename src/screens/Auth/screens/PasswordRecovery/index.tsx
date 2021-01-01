import PasswordRecoveryScreen, { DispatchProps, StateProps } from './PasswordRecoveryScreen';
import { connect } from 'react-redux';
import { StoreState } from '../../../../store/reducers';
import { Dispatch } from 'redux';
import { appRedirectToDefault } from 'src/store/actions/app-actions';

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
