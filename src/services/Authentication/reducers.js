export default authenticationService = (state = {}, action) => {
    console.log(action)
    switch (action.type) {
        case 'Authentication.ATTEMPT_LOGIN':
            return { ...state, ATTEMPT_LOGIN_PENDING: action.callback_prefix };
        default:
            return state;
    }
};
