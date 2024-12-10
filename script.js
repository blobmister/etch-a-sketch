function generateGridDefault(n = 16) {
    let container = document.querySelector(".gridContainer");
    container.innerHTML = '';
    
    for (let i = 0; i < n; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < n; j++) {
            let box = document.createElement("div");
            box.classList.add("box");

            box.addEventListener('mouseover', () => hover(box));

            row.appendChild(box);
        }
        container.appendChild(row);
    }
}

function generateGridColour(n = 16) {
    let container = document.querySelector(".gridContainer");
    container.innerHTML = '';
    
    for (let i = 0; i < n; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < n; j++) {
            let box = document.createElement("div");
            box.classList.add("box");

            box.addEventListener('mouseover', () => hoverColour(box));

            row.appendChild(box);
        }
        container.appendChild(row);
    }
}

function generateGridOpacity(n = 16) {
    let container = document.querySelector(".gridContainer");
    container.innerHTML = '';
    
    for (let i = 0; i < n; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < n; j++) {
            let box = document.createElement("div");
            box.classList.add("box");

            box.colour = 'rgba(0, 0, 0, 0)';
            box.addEventListener('mouseover', () => hoverOpacity(box));

            row.appendChild(box);
        }
        container.appendChild(row);
    }
}

function hover(box) {
    box.style.backgroundColor = 'black';
}

function hoverColour(box) {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    box.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function hoverOpacity(box) {
    let currentColor = getComputedStyle(box).backgroundColor;

    let match = currentColor.match(/rgba?\((\d+), (\d+), (\d+), ([\d.]+)\)/);

    if (match) {
        let r = parseInt(match[1]); // Extract and parse the red value
        let g = parseInt(match[2]); // Extract and parse the green value
        let b = parseInt(match[3]); // Extract and parse the blue value
        let a = parseFloat(match[4]); // Extract and parse the alpha value

        a = Math.min(a + 0.1, 1);
        box.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
    }
}

function changeMode(mode, n) {
    if (mode == 'default') {
        generateGridDefault(n);
    } else if (mode == 'rgb') {
        generateGridColour(n);
    } else if (mode == 'opacity') {
        generateGridOpacity(n);
    }
}


let n = 16;
let currentMode = 'default';
generateGridDefault();
let defaultButton = document.querySelector("#default");
let rgbButton = document.querySelector("#rgb");
let opacityButton = document.querySelector("#opacity");
let input = document.querySelector("input");

defaultButton.addEventListener('click', () => {
    currentMode = 'default';
    changeMode('default', n);
});
rgbButton.addEventListener('click', () => {
    currentMode = 'rgb';
    changeMode('rgb', n);
})

opacityButton.addEventListener('click', () => {
    currentMode = 'opacity'
    changeMode('opacity', n);
})


input.addEventListener('keydown', function(e) {
    if(e.key === "Enter") {
        let inputValue = input.value;
        let error = document.querySelector('.error-message');

        if(parseInt(inputValue)) {
            inputValue = parseInt(inputValue);
        } else {
            input.value = '';
            error.textContent = "Please enter integer between 1 and 100";
            return;
        }
        if (0 < inputValue && 100 >= inputValue) {
            n = inputValue
            changeMode(currentMode, n);
            input.value = '';
            error.textContent = '';
            return;
        } else {
            input.value = '';
            error.textContent = "Please enter integer between 1 and 100";
            return;
        }
    }
})

