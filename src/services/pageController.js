export const goToPage = (href, time) => {
    setTimeout(() => {
        window.location.href = href;
    }, time);
}