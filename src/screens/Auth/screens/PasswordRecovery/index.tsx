import PasswordRecoveryScreen, { DispatchProps, StateProps } from './PasswordRecoveryScreen';
import { connect } from 'react-redux';
import { StoreState } from '../../../../store/reducers';
import { Dispatch } from 'redux';

function mapStateToProps(state: StoreState): StateProps {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecoveryScreen);
