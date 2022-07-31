export class ButtonCount extends HTMLElement {
    constructor() {
        super();

        let btn = document.createElement('button');
        btn.innerHTML = `Times Clicked: `;

        let count = document.createElement('output');
        count.textContent = 0;
        btn.append(count);

        btn.addEventListener('click', ()=> {
            count.textContent = parseInt(count.textContent) + 1;
        });

        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(btn);
    }
}

customElements.define('button-count', ButtonCount);