function rc4(key, str) {
    const s = new Uint8Array(256);
    let j = 0;
    let x;
    let res = '';

    for (let i = 0; i < 256; i++) {
        s[i] = i;
    }

    for (let i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
    }

    let i = 0;
    j = 0;

    for (let y = 0; y < str.length; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
        res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
    }

    return res;
}

document.addEventListener('DOMContentLoaded', () => {
    const keyInput = document.getElementById('key');
    const textInput = document.getElementById('text');
    const encryptBtn = document.getElementById('encrypt-btn');
    const encryptedTextArea = document.getElementById('encrypted-text');

    encryptBtn.addEventListener('click', () => {
        const key = keyInput.value;
        const text = textInput.value;
        const encryptedText = rc4(key, text);
        encryptedTextArea.value = encryptedText;
    });
});

function clearFields() {
    document.getElementById("key").value = "";
    document.getElementById("text").value = "";
    document.getElementById("encrypted-text").value = "";
} 
