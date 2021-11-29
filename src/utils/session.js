import { func } from "prop-types";

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
}

export function logout() {
    sessionStorage.removeItem('refresh')
    sessionStorage.removeItem('access')
    sessionStorage.removeItem('first_name')
    sessionStorage.removeItem('last_name')
    sessionStorage.removeItem('mobile')
    sessionStorage.removeItem('email')
    localStorage.clear();

    console.log(`clear storage:`)
}

export function getUser(){
    return {
        firstName: sessionStorage.getItem('first_name', null),
        lastName: sessionStorage.getItem('last_name', null),
        company: sessionStorage.getItem('mobile', null),
        email: sessionStorage.getItem('email', null),
        mobile: sessionStorage.getItem('mobile', null),
    }
}