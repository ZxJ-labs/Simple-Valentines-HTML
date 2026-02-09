// random-button.js
class RandomButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Use Shadow DOM for encapsulation
    }

    connectedCallback() {
        // Define the HTML structure
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    height: 100%;
                    width: 100%;
                    margin: 0;
                    position: relative;
                }
                #randomButton {
                    position: absolute;
                    width: 100px;
                    height: 43px;
                    background-color: rgb(255, 106, 130);
                    border-radius: 10px;
                    border-color: rgb(255, 255, 255);
                    color: rgb(255, 255, 255);
                    top: -45px; /* Initial top position in pixels (adjust as needed, e.g., 50px) */
                    left: 325px; /* Initial left position in pixels (adjust as needed, e.g., 100px) */
                    padding: 10px 20px;
                    font-size: 16px;
                    cursor: pointer;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                    /* Removed transform: translate(-50%, -50%) to prevent overflow issues */
                }
            </style>
            <button id="randomButton">No</button>
        `;

        // Array of background images (customize as needed)
        this.backgroundImages = [
            'https://via.placeholder.com/800x600/FF0000/FFFFFF?text=Red',
            'https://via.placeholder.com/800x600/00FF00/FFFFFF?text=Green',
            'https://via.placeholder.com/800x600/0000FF/FFFFFF?text=Blue',
            'https://via.placeholder.com/800x600/FFFF00/000000?text=Yellow'
        ];

        // Get references
        this.button = this.shadowRoot.getElementById('randomButton');

        // Add event listener
        this.button.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick() {
        // Get the custom element's dimensions (ensures button stays within iframe bounds)
        const host = this.shadowRoot.host;
        const maxX = host.offsetWidth - this.button.offsetWidth;
        const maxY = host.offsetHeight - this.button.offsetHeight;

        // Generate random positions within the custom element (iframe)
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        // Apply new position
        this.button.style.left = `${randomX}px`;
        this.button.style.top = `${randomY}px`;

        // Change background image randomly
        const randomImage = this.backgroundImages[Math.floor(Math.random() * this.backgroundImages.length)];
        host.style.backgroundImage = `url('${randomImage}')`;
        host.style.backgroundSize = 'cover';
        host.style.backgroundRepeat = 'no-repeat';
        host.style.backgroundPosition = 'center';
    }
}

// Register the custom element
customElements.define('random-button', RandomButton);