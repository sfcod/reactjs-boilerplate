import io from 'socket.io-client';
import { BASE_URL } from '../config/env';
import UserAuthService from './user-auth';

class SocketIO {
    connect(): SocketIOClient.Socket {
        const url = new URL(BASE_URL);
        url.searchParams.append('token', UserAuthService.getToken() ?? '');

        return io(url.href);
    }
}

const SocketIOService = new SocketIO();

export default SocketIOService;
