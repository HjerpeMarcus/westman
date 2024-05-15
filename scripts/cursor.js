document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX + window.pageXOffset}px`;
        cursor.style.top = `${e.clientY + window.pageYOffset}px`;
    });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseover', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
        });

        el.addEventListener('mouseout', () => {
            cursor.style.width = '10px';
            cursor.style.height = '10px';
        });
    });
});
