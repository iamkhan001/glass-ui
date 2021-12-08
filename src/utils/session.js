import { func } from "prop-types";

export function getAccessToken() {
    return sessionStorage.getItem('access', null);
}

export function isAuthenticated() {
    const access = sessionStorage.getItem('access', null);
    console.log(`access >> ${access}`);
    
    if(access != null) {
        return true
    }
    
    return false
}

export default isAuthenticated;

export function saveUser(result) {
    sessionStorage.setItem('refresh', result.refresh)
    sessionStorage.setItem('access',result.access)
    sessionStorage.setItem('first_name', result.account.first_name)
    sessionStorage.setItem('last_name', result.account.last_name)
    sessionStorage.setItem('mobile', result.account.mobile)
    sessionStorage.setItem('email',result.account.email)
    sessionStorage.setItem('company',result.account.company)
    sessionStorage.setItem('role',result.account.role)
}

export function updateUser(result) {
    sessionStorage.setItem('first_name', result.account.first_name)
    sessionStorage.setItem('last_name', result.account.last_name)
    sessionStorage.setItem('mobile', result.account.mobile)
    sessionStorage.setItem('email',result.account.email)
    sessionStorage.setItem('company',result.account.company)
    sessionStorage.setItem('role',result.account.role)
}

export function logout() {
    sessionStorage.removeItem('refresh')
    sessionStorage.removeItem('access')
    sessionStorage.removeItem('first_name')
    sessionStorage.removeItem('last_name')
    sessionStorage.removeItem('mobile')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('role')
    localStorage.clear();

    console.log(`clear storage:`)
}

export function getUser(){
    return {
        access: sessionStorage.getItem('access', null),
        firstName: sessionStorage.getItem('first_name', null),
        lastName: sessionStorage.getItem('last_name', null),
        company: sessionStorage.getItem('company', null),
        email: sessionStorage.getItem('email', null),
        mobile: sessionStorage.getItem('mobile', null),
        role: sessionStorage.getItem('role', null),
    }
}