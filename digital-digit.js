/**
 * Element which holds a single digital digit
 */
class DigitalDigitElement extends HTMLElement {

    constructor() {
        super();
        this._displayDigit = 8;
    }

    /**
     * We'll use getters and setters so
     *  we can control what happens when updated
     */
    get displayDigit() {
        return this._displayDigit;
    }

    set displayDigit(newDigit) {
        newDigit = parseInt(newDigit);
        this._displayDigit = newDigit;

        this._updateChildren();
    }

    /**
     * Let the browser know what attributes to keep track of
     */
    static get observedAttributes() {
        return ["display-digit"];
    }

    /**
     * When the user changes the attribute, this will be invoked
     */
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "display-digit":
                this.displayDigit = newValue;
                break;
        }
    }

    /**
     * This is fired by the browser when the element
     *  is placed onto the DOM
     * 
     * Initialize the content children here
     */
    connectedCallback() {
        /**
         * Display will look (something) like
         * 
         *  _
         * | |
         *  _
         * | |
         *  _
         */

        //this property will help position the child elements
        this.style.position = "relative";

        //create the individual clock "pieces"
        this._topHorz = document.createElement('div');
        this._midHorz = document.createElement('div');
        this._bottomHorz = document.createElement('div');

        this._topLeftVert = document.createElement('div');
        this._topRightVert = document.createElement('div');
        this._bottomLeftVert = document.createElement('div');
        this._bottomRightVert = document.createElement('div');

        //store all in array for convenience
        this._allClockEl = [
            this._topHorz,
            this._midHorz,
            this._bottomHorz,
            this._topLeftVert,
            this._topRightVert,
            this._bottomLeftVert,
            this._bottomRightVert
        ];

        //add the styles to position horizontal elements
        [this._topHorz, this._midHorz, this._bottomHorz].forEach(horz => {
            horz.style.width = "85%";
            horz.style.height = "4%";

            horz.style.position = "absolute";
            horz.style.left = "7.5%";

            this.appendChild(horz);
        });
        this._midHorz.style.top = "48%";
        this._bottomHorz.style.top = "95%";

        //add styles to position vertical elements
        [this._topLeftVert, this._topRightVert, this._bottomLeftVert, this._bottomRightVert].forEach(vert => {
            vert.style.width = "8%";
            vert.style.height = "40%";

            vert.style.position = "absolute";

            this.appendChild(vert);
        });

        //additional positioning
        [this._topLeftVert, this._topRightVert].forEach(topVert => {
            topVert.style.top = "6%";
        });
        [this._bottomLeftVert, this._bottomRightVert].forEach(bottomVert => {
            bottomVert.style.top = "53%";;
        });
        [this._topRightVert, this._bottomRightVert].forEach(rightVert => {
            rightVert.style.left = "92%";
        });

        this._updateChildren();
    }

    /**
     * Update the chilren elements to activate bits
     */
    _updateChildren() {
        if (!this._allClockEl) {
            return;
        }

        //refresh active states of children
        this._allClockEl.forEach(el => {
            //control active states using CSS classes
            el.classList.remove("digital-digit-active");
            el.classList.add("digital-digit-inactive");
        });

        let activated = [];
        //update the class names
        switch (this.displayDigit) {
            case 0:
                activated = [
                    this._topHorz,
                    this._bottomHorz,
                    this._topLeftVert,
                    this._topRightVert,
                    this._bottomLeftVert,
                    this._bottomRightVert
                ];
                break;
            case 1:
                activated = [
                    this._topRightVert,
                    this._bottomRightVert
                ];
                break;
            case 2:
                activated = [
                    this._topHorz,
                    this._midHorz,
                    this._bottomHorz,
                    this._topRightVert,
                    this._bottomLeftVert
                ];
                break;
            case 3:
                activated = [
                    this._topHorz,
                    this._bottomHorz,
                    this._midHorz,
                    this._topRightVert,
                    this._bottomRightVert
                ];
                break;
            case 4:
                activated = [
                    this._topLeftVert,
                    this._topRightVert,
                    this._midHorz,
                    this._bottomRightVert
                ];
                break;
            case 5:
                activated = [
                    this._topHorz,
                    this._topLeftVert,
                    this._midHorz,
                    this._bottomRightVert,
                    this._bottomHorz
                ];
                break;
            case 6:
                activated = [
                    this._topHorz,
                    this._midHorz,
                    this._bottomHorz,
                    this._topLeftVert,
                    this._bottomLeftVert,
                    this._bottomRightVert
                ];
                break;
            case 7:
                activated = [
                    this._topHorz,
                    this._topRightVert,
                    this._bottomRightVert
                ];
                break;
            case 8:
                activated = this._allClockEl;
                break;
            case 9:
                activated = [
                    this._topHorz,
                    this._midHorz,
                    this._topLeftVert,
                    this._topRightVert,
                    this._bottomRightVert
                ];
                break;
        }

        activated.forEach(el => {
            el.classList.add("digital-digit-active");
            el.classList.remove("digital-digit-inactive");
        });
    }
}

//add to custom elements registry
customElements.define(
    "digital-digit",
    DigitalDigitElement
);