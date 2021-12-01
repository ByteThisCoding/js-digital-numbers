/**
 * Element which holds a multiple digit number 
 */
class DigitalNumberElement extends HTMLElement {

    constructor() {
        super();
        this._displayNumber = 12;
    }

    /**
     * We'll use getters and setters so
     *  we can control what happens when updated
     */
    get displayNumber() {
        return this._displayNumber;
    }

    set displayNumber(newNumber) {
        newNumber = parseInt(newNumber);
        this._displayNumber = newNumber;

        this._updateChildren();
    }

    /**
     * Let the browser know what attributes to keep track of
     */
    static get observedAttributes() {
        return ["display-number"];
    }

    /**
     * When the user changes the attribute, this will be invoked
     */
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "display-number":
                this.displayNumber = newValue;
                break;
        }
    }

    connectedCallback() {
        this._updateChildren();
    }

    _updateChildren() {
        //clear self
        this.innerHTML = "";

        //add one digit for each digit in number
        let n = this._displayNumber;
        while (n >= 10) {
            const digit = n % 10;
            //create an instance of our other web component
            const digitElement = document.createElement('digital-digit');
            digitElement.displayDigit = digit;
            this.insertBefore(digitElement, this.firstChild);

            n = Math.floor(n/10);
        }

        //append remaining digit
        const digitElement = document.createElement('digital-digit');
        digitElement.displayDigit = n;
        this.insertBefore(digitElement, this.firstChild);
    }
}

//add to registry
customElements.define(
    "digital-number",
    DigitalNumberElement
);