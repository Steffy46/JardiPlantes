export default function (userConnected = {}, action) {

    if (action.type === 'record') {
        console.log('>>>REDUCE', action.user);
        return {
            token: action.user.token,
            status: action.user.status,
            firstname: action.user.firstname,
            lastname: action.user.name,
            email: action.user.email,
        };

    } else {
        return userConnected;
    }
}