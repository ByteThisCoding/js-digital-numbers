# digital-number-display
An implementation of digital number display using Web Components.

## Digital Display Requirements
For this example, we'll create a digital number display which will:
* Show a positive integer in a digital number style display.
* Allow for customizable colors for active and inactive digital parts, or *slices*.
* Accept the number to display via html attribute declaration.
* Respond to input changes.

## Writing the Component
To satisfy the requirements above, we will need to create a component which can display any amount of *digital digits* units to represent numbers which have any amount of digits. In order to keep the code clean and reusable, we're going to create two seperate web components:
* **digital-digit** will be responsible for displaying a single digit as a digital digit.
* **digital-number** will be responsible for using multiple ``digital-digit`` components and assigning the appropriate digits to each.
We'll put each web component in its own file, then load both files into the HTML document head.

## Creating the digital-digit Component
We will implement logic in this component to take care of:
* Creating the individual "bits" or "slices" which light up and deactivate for each digit.
* Mapping each input digit so we light up and deactivate the correct btis.
* Responding to input changes from the user.

We will be creating 7 slices in total, three horizontal and four vertical. The horizontal slices will be positioned in the top, middle, and bottom, and the vertical slices will be positioned on the top left, top right, bottom left, and bottom right. Each slice will be represented by a div, and its styles will be set directly within the component itself.

In the code below, we'll create each component, then group them together in certain ways to apply common styles, and single certain ones out to apply specific styles. This will be triggered when the *connectedCallback* method is invoked.
```javascript
//create the individual clock "pieces"
this._topHorz = document.createElement('div');
this._midHorz = document.createElement('div');
this._bottomHorz = document.createElement('div');

this._topLeftVert = document.createElement('div');
this._topRightVert = document.createElement('div');
this._bottomLeftVert = document.createElement('div');
this._bottomRightVert = document.createElement('div');

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

/* ... other styles omitted from here for brevity ... */
```
When the component initially loads, and when the user changes the input digit, the component will need to determine which of the slices to activate and deactivate. In our implementation, when the input digit changes, we will:
* Set all slices to inactive by using CSS classes.
* Switch case on the input digit.
* Create an array of the slices we need to activate (depending upon the value of the digit).
* Activate all slices in the array by using CSS classes.

The code below shows a trimmed version of the implementation:
```javascript
_updateChildren() {
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
        /* ... certain cases omitted for brevity ...*/
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
```

## Creating the digital-number Component
The logic in this component will take care of:
* Creating a child ``digital-digit`` component for each digit in its own input.
* Assigning the correct digits in the correct positions to eachi child ``digital-digit``
* Responding to input changes from the user. 

This component class will have a similar structure to the ``digital-digit`` component, as it has many of the same types of responsibilities. The main difference lies in the way it renders its child components. This component will create one ``digital-digit`` copmonent for each digit in its own input, set its digit value, then append that child to itself. We will determine each digit to use by repeatedly performing integer division on the input number and grabbing the rightmost digit at each point:
```javascript
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
```

## Registering the Custom Elements
Once the element classes are in place, we will need to register them to JavaScript's custom elements registry. Each component.js file will handle its own registration, but both combined would appear as:
```javascript
//add to custom elements registry
customElements.define(
    "digital-digit",
    DigitalDigitElement
);
customElements.define(
    "digital-number",
    DigitalNumberElement
);
```

## Using the Elements in HTML
Once all of the JavaScript is in place, the only tasks remaining are:
* Import the script files where the components are defined.
* Use CSS styles to declare what the active and inactive slices should look like.
* Reference the new web components wherever we need to.

In the trimmed HTML document below, we've taken care of those final steps.
```html
<!DOCTYPE html>
<html>
<head>
    <!-- Some contents omitted for brevity -->
    <style>
        /** These classes will control individual digit part visibility */
        .digital-digit-inactive {
            background-color: #101010;
        }
        .digital-digit-active {
            background-color: #01ffcb;
            /* add slight boldness to active elements */
            border: 1px solid #01ffcb;
        }
    </style>
    <script src="digital-digit.js"></script>
    <script src="digital-number.js"></script>
</head>
<body>
    <!-- Some contents omitted for brevity -->
    <digital-digit display-digit="2"></digital-digit>
    <digital-number display-number="2152347"></digital-number>
</body>
</html>
```