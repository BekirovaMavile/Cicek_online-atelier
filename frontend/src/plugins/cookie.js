export function setMyCookie(accessToken) {
    let date = new Date(Date.now() + 86400e3);
    date = date.toUTCString();
    document.cookie = `CookieEmail=${accessToken}; expires=${date}; path=/; secure; samesite=strict`;
}

export function deleteCookie() {
    const name = 'CookieEmail'
    document.cookie = name + '= ; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function getMyCookie() {
    // Код для получения cookie
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'CookieEmail') {
            return value;
        }
    }
    return null;
}
