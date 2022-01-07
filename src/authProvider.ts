import { AuthProvider, fetchUtils } from 'react-admin';
import { apiBaseUrl } from './config';

const apiUrl = `${apiBaseUrl}/admin/auth`;
const httpClient = fetchUtils.fetchJson;

export const authProvider: AuthProvider = {
    login: (params: { username: string; password: string }) => {
        return new Promise<boolean>((resolve, reject) => {
            httpClient(`${apiUrl}/login`, {
                method: 'POST',
                body: JSON.stringify(params),
            }).then(({ json, status }) => {
                if (status === 200) {
                    localStorage.setItem('username', params.username);
                    localStorage.setItem('accessToken', json.accessToken);
                    localStorage.setItem('roleType', json.staff.type);
                }
                resolve(status === 200);
            });
        });
    },
    logout: () => {
        localStorage.removeItem('username');
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () =>
        localStorage.getItem('username') ? Promise.resolve() : Promise.reject(),
    getPermissions: () => {
        const role = localStorage.getItem('roleType') as any;
        return role ? Promise.resolve(parseInt(role) !== 1 ? 'staff' : 'admin') : Promise.reject();
    },
    getIdentity: () => {
        const fullName = localStorage.getItem('username');
        return new Promise<any>((resolve, reject) => {
            resolve(
                {
                    id: 1,
                    fullName: fullName,
                    avatar: ''
                }
            )
        });
    }


};