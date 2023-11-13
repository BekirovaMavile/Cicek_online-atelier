export function setMyCookie(accessToken) {
    const expirationDate = new Date('2023-12-31T23:59:59Z'); // Дата истечения срока действия
    document.cookie = `myCookieName=${accessToken}; expires=${expirationDate.toUTCString()}; path=/; secure; samesite=strict`;
}

export function getMyCookie() {
    // Код для получения cookie
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'myCookieName') {
            return value;
        }
    }
    return null;
}
