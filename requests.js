export function init() {
    document.getElementById('get-button').addEventListener("click", xhrGetRequest);
    document.getElementById('post-button').addEventListener("click", xhrSendRequest);
    document.getElementById('put-button').addEventListener("click", xhrPutRequest);
    document.getElementById('delete-button').addEventListener("click", xhrDeleteRequest);
}

function xhrGetRequest() {
    let xhr = new XMLHttpRequest();
    
    // make it asynchronous
    xhr.open("GET", `https://httpbin.org/get`, true);
    xhr.setRequestHeader("Data-Received",`${getDate()}`);

    xhr.onload = function() { renderOutput(xhr)};
    xhr.send(null);
};

function xhrSendRequest() {
    let xhr = new XMLHttpRequest();

    let id = document.getElementById("id-input").value;
    let title = document.getElementById("article-name").value;
    let body = document.getElementById("article-body").value;
    
    let payload = `id=${id}&title=${title}&body=${body}`;
    
    xhr.open("POST", `https://httpbin.org/post`, true);
    xhr.setRequestHeader("Data-Posted-On",`${getDate()}`);

    // xhr.onload = renderOutput(xhr); <- doesn't work for some reason?
    xhr.onload = function() { renderOutput(xhr)};

    xhr.send(payload);
}

function xhrPutRequest() {
    let xhr = new XMLHttpRequest();

    let id = document.getElementById("id-input").value;
    let title = document.getElementById("article-name").value;
    let body = document.getElementById("article-body").value;
    
    let payload = `id=${id}&title=${title}&body=${body}`;
    
    xhr.open("PUT", `https://httpbin.org/put`, true);
    xhr.setRequestHeader("Data-Put-On",`${getDate()}`);

    xhr.onload = function() { renderOutput(xhr)};

    xhr.send(payload);
}

function xhrDeleteRequest() {
    let xhr = new XMLHttpRequest();
    
    // make it asynchronous
    xhr.open("DELETE", `https://httpbin.org/delete`, true);
    xhr.setRequestHeader("Data-Deleted",`${getDate()}`);

    xhr.onload = function() { renderOutput(xhr)};
    xhr.send(null);
};

function getDate() {
    let now = new Date();
    return now;
}

export function displayDate() {
    document.getElementById("date-display").innerHTML = getDate();
}

function renderOutput(xhr) {
    let response = xhr.responseText;
    response = JSON.parse(response);
    let headers = response.headers;
    let markup = `<table border = 1>`;
    markup += `<th>Header</th><th>Value</th>`;
    markup += `<tr><td>Data</td><td>${response.data}</td></tr>`;
    markup += `<tr><td>URL</td><td>${response.url}</td></tr>`;
    Object.entries(headers).forEach(([key, value]) => {
        markup += `<tr><td>` + `${key}` + `</td><td>` + `${value}` + `</td></tr>`;
    });
    markup += `</table>`;
    document.getElementById("response").innerHTML = markup;
}