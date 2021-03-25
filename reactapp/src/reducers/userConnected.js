export default function (userConnected = {}, action) {

    if (action.type === 'record') {
        return {
            token: action.user.token,
            status: action.user.status,
            firstname: action.user.firstname,
            lastname: action.user.name,
            email: action.user.email,
        };

    } else if (action.type === 'reset') {
        return {}

    } else {
        return userConnected;
    }
}