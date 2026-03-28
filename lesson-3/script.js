const display = document.getElementById('display');
const controls = document.getElementById('controls');

const secretHash = "aW5zdGFwYXNz"; 

function log(text, type = '') {
    const p = document.createElement('p');
    p.className = `log-entry ${type}`;
    p.textContent = `> ${text}`;
    display.appendChild(p);
    display.scrollTop = display.scrollHeight;
}