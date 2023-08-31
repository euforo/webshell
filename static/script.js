// static/script.js
const terminalBody = document.getElementById('terminal-body');
const commandInput = document.getElementById('command-input');

commandInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const command = commandInput.value;
        terminalBody.innerHTML += `<p><span class="prompt">$</span> ${command}</p>`;
        executeCommand(command);
        commandInput.value = '';
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
});

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'l') {
        event.preventDefault();
        clearTerminal();
    }
});

function executeCommand(command) {
    fetch(`/execute?command=${encodeURIComponent(command)}`)
        .then(response => response.text())
        .then(result => {
            terminalBody.innerHTML += `<p>${result}</p>`;
            terminalBody.scrollTop = terminalBody.scrollHeight;
        });
}

function clearTerminal() {
    terminalBody.innerHTML = '';
}

