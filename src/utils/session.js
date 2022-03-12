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
    console.log('save >> ', result);
    console.log('save user_id >> ', result.account.accountId);

    sessionStorage.setItem('refresh', result.refresh)
    sessionStorage.setItem('access',result.access)
    sessionStorage.setItem('first_name', result.account.first_name)
    sessionStorage.setItem('last_name', result.account.last_name)
    sessionStorage.setItem('mobile', result.account.mobile)
    sessionStorage.setItem('email',result.account.email)
    sessionStorage.setItem('role',result.account.role)
    sessionStorage.setItem('x_user_id',result.account.accountId)

    sessionStorage.setItem('company_id',result.company.id)
    sessionStorage.setItem('token_type',result.company.token_type)
    sessionStorage.setItem('scope',result.company.scope)
    sessionStorage.setItem('company',result.company.name)
    sessionStorage.setItem('owner_id',result.company.owner_id)
    sessionStorage.setItem('owner_first_name',result.owner_first_name)
    sessionStorage.setItem('owner_last_name',result.company.owner_last_name)
    sessionStorage.setItem('owner_email',result.company.owner_email)
}

export function saveProfile(result) {
    sessionStorage.setItem('first_name', result.account.first_name)
    sessionStorage.setItem('last_name', result.account.last_name)
    sessionStorage.setItem('mobile', result.account.mobile)
    sessionStorage.setItem('email',result.account.email)
    sessionStorage.setItem('role',result.account.role)
    // sessionStorage.setItem('x_user_id',result.account.accountId)

    sessionStorage.setItem('company_id',result.company.id)
    sessionStorage.setItem('token_type',result.company.token_type)
    sessionStorage.setItem('scope',result.company.scope)
    sessionStorage.setItem('company',result.company.name)
    sessionStorage.setItem('owner_id',result.company.owner_id)
    sessionStorage.setItem('owner_first_name',result.owner_first_name)
    sessionStorage.setItem('owner_last_name',result.company.owner_last_name)
    sessionStorage.setItem('owner_email',result.company.owner_email)
}

export function updateUser(result) {
    sessionStorage.setItem('first_name', result.account.first_name)
    sessionStorage.setItem('last_name', result.account.last_name)
    sessionStorage.setItem('mobile', result.account.mobile)
    sessionStorage.setItem('email',result.account.email)
    sessionStorage.setItem('company',result.account.company)
}

export function logout() {
    sessionStorage.removeItem('refresh')
    sessionStorage.removeItem('access')
    sessionStorage.removeItem('first_name')
    sessionStorage.removeItem('last_name')
    sessionStorage.removeItem('mobile')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('role')

    sessionStorage.removeItem('company_id')
    sessionStorage.removeItem('token_type')
    sessionStorage.removeItem('scope')
    sessionStorage.removeItem('company')
    sessionStorage.removeItem('owner_id')
    sessionStorage.removeItem('owner_first_name')
    sessionStorage.removeItem('owner_last_name')
    sessionStorage.removeItem('owner_email')

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
        scope: sessionStorage.getItem('scope', null),
    }
}

export function getUserId() {
    return sessionStorage.getItem('x_user_id', null)
}

export function getUserEmail() {
    return sessionStorage.getItem('email', null)
}

export function getCompanyId() {
    return sessionStorage.getItem('company_id', null)
}

export function isZoomConnected() {
    const token = sessionStorage.getItem('token_type', null);
    console.log('token', token);
    return token === 'bearer'
}

export function isAdmin() {
    return (sessionStorage.getItem('role', null) === 'A')
}

export function getRoleName() {
    if(sessionStorage.getItem('role', null) === 'A') {
        return "Admin"
    }
    return "Member"
}