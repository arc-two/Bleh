// Start audio muted
const audio = document.getElementById('bgMusic');
const entryButton = document.getElementById('entryButton');
const mainPage = document.getElementById('mainPage');

// Unmute and transition on click
if (entryButton) {
    entryButton.addEventListener('click', () => {
        setTimeout(()=>{
            fadeIntoPlay(audio, 8000, 0.5);
        }, 1000)
        // Fade out button and fade in main page
        entryButton.classList.add('fade-out');
        mainPage.classList.add('fade-in');
    });
}

function fadeIntoPlay(audio, duration = 5000, maxVol = 1) {
    const startTime = Date.now();
    if (audio.muted){
        audio.muted = false;  
    }
    audio.volume = 0; // start silent
    audio.play().catch(err => console.error('Play after unmute failed:', err.message));
    const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        audio.volume = Math.min(elapsed / duration, maxVol);
        if (elapsed >= duration) {
            clearInterval(interval);
            audio.volume = 1;
        }
    }, 50);
}

// Collision detection for text placement
function boxesCollide(x1, y1, w1, h1, box) {
    return x1 < box.x + box.width &&
           x1 + w1 > box.x &&
           y1 < box.y + box.height &&
           y1 + h1 > box.y;
}

// Global array to track all placed boxes for collision detection
let placedBoxes = [];

// Place random text without overlapping
// Place random text without overlapping and support \n
// Place random text without overlapping and with proper screen bounds
function placeRandomText(textArray, options = {}) {
    const {
        textColor = '#000000',
        highlightColor = null,
        highlightText = null,
        opacity = 1,
        fontSize = '24px',
        fontFamily = 'Arial, sans-serif'
    } = options;

    const container = document.getElementById('mainPage');

    textArray.forEach(text => {
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 50) {
            // Create a temporary div to measure the size of the text
            const tempDiv = document.createElement('div');
            tempDiv.style.position = 'absolute';
            tempDiv.style.fontSize = fontSize;
            tempDiv.style.fontFamily = fontFamily;
            tempDiv.style.visibility = 'hidden';
            tempDiv.style.whiteSpace = 'pre';
            tempDiv.textContent = text;
            container.appendChild(tempDiv);

            const textWidth = tempDiv.offsetWidth;
            const textHeight = tempDiv.offsetHeight;
            container.removeChild(tempDiv);

            // Constrain x and y so the text stays fully on screen
            const x = Math.random() * Math.max(0, window.innerWidth - textWidth);
            const y = Math.random() * Math.max(0, window.innerHeight - textHeight);

            // Check for collisions
            let overlaps = false;
            for (let box of placedBoxes) {
                if (boxesCollide(x, y, textWidth, textHeight, box)) {
                    overlaps = true;
                    break;
                }
            }

            if (!overlaps) {
                const lines = text.split('\n');
                lines.forEach((line, lineIndex) => {
                    const div = document.createElement('div');

                    if (highlightColor) {
                        if (highlightText) {
                            const parts = line.split(new RegExp(`(${highlightText})`, 'i'));
                            parts.forEach(part => {
                                if (part.toLowerCase() === highlightText.toLowerCase()) {
                                    const span = document.createElement('span');
                                    span.textContent = part;
                                    span.style.backgroundColor = highlightColor;
                                    span.style.padding = '2px 4px';
                                    span.style.borderRadius = '2px';
                                    div.appendChild(span);
                                } else {
                                    div.appendChild(document.createTextNode(part));
                                }
                            });
                        } else {
                            const span = document.createElement('span');
                            span.textContent = line;
                            span.style.backgroundColor = highlightColor;
                            span.style.padding = '5px 10px';
                            span.style.borderRadius = '4px';
                            div.appendChild(span);
                        }
                    } else {
                        div.textContent = line;
                    }

                    div.style.position = 'absolute';
                    div.style.left = x + 'px';
                    div.style.top = (y + lineIndex * parseInt(fontSize) * 1.2) + 'px';
                    div.style.opacity = opacity;
                    div.style.color = textColor;
                    div.style.fontSize = fontSize;
                    div.style.fontFamily = fontFamily;
                    div.style.whiteSpace = 'pre';
                    div.style.zIndex = '1';

                    container.appendChild(div);
                });

                // Register placed box
                placedBoxes.push({x, y, width: textWidth, height: textHeight});
                placed = true;
            }
            attempts++;
        }
    });
}

// Place text when page loads

// Add more text with different colors and highlights
placeRandomText([
    'You should have a PFP love',
], {
    fontFamily: 'Courier New, monospace',
    fontSize: 16,
    textColor: '#ffffff',
    highlightColor: null,
    opacity: 1
});

placeRandomText([
    'You shouldn\'t try not to be human love',
], {
    fontFamily: 'Courier New, monospace',
    textColor: '#e09797',
    highlightColor: '#e7d5d5',
    highlightText: "human",
    opacity: 1
});

placeRandomText([
    'Everyone deserves what they get. \n You aren\'t [_____] because you\'re lacking in some aspect',
], {
    fontFamily: 'Courier New, monospace',
    textColor: '#585151',
    highlightColor: '#000000',
    highlightText: "lacking in some aspect",
    opacity: 1
});

placeRandomText([
    'Yes, I see now. \n Thank you for these newfound eyes.',
], {
    fontFamily: 'Courier New, monospace',
    textColor: '#585151',
    highlightColor: '#f1f374',
    highlightText: "newfound eyes",
    opacity: 1
});

placeRandomText([
    'So learn how. And if you don\'t know how to do that \n then learn how to learn to do it. (Recursively)',
], {
    fontFamily: 'Courier New, monospace',
    textColor: '#000097',
    highlightText: "Recursion:",
    opacity: 1
});

placeRandomText([
    'Am I worthy enough for you yet?',
], {
    fontFamily: 'Courier New, monospace',
    textColor: '#7260b4',
    highlightColor: '#3910cf',
    highlightText: "worthy",
    opacity: 1
});

placeRandomText([
    'It\'s an eternal rose. You can open the glass and touch it. \n It symbolizes my eternal love for you. ♡',
], {
    fontSize: 16,
    fontFamily: 'Courier New, monospace',
    textColor: '#e09797',
    highlightColor: 'rgb(202, 49, 49)',
    highlightText: "eternal",
    opacity: 1
});

placeRandomText([
    'You\'re a special person',
], {
    fontSize: 14,
    fontFamily: 'Courier New, monospace',
    textColor: '#c99a9a',
    opacity: 1
});

placeRandomText([
    'I\ll always protect you.',
], {
    fontSize: 14,
    fontFamily: 'Courier New, monospace',
    textColor: '#c99a9a',
    opacity: 1
});

placeRandomText([
    'H deserves rank 1. Not you.',
], {
    fontSize: 12,
    fontFamily: 'Courier New, monospace',
    textColor: '#5e0404',
    opacity: 1
});

placeRandomText([
    'Even if I were to beg to come back now \n you wouldn\'t accept me for what I\'ve become, would you?. So I won\'t.',
], {
    fontSize: 16,
    fontFamily: 'Courier New, monospace',
    textColor: '#4e163c',
    opacity: 1
});

placeRandomText([
    'Goodbye. I\'ll always remember you. (kisses your cheek)',
], {
    fontFamily: 'Courier New, monospace',
    textColor: '#940868',
    highlightColor: '#520909', 
    highlightText: 'Goodbye',
    opacity: 1
});

placeRandomText([
    'Any skill is just a collection of concepts.',
], {
    fontSize: 16,
    fontFamily: 'Courier New, monospace',
    textColor: '#808185',
    opacity: 1
});

placeRandomText([
    'Schizoid Personality Disorder is notably prevalent among \n the homeless population ... [_____] \n ... is linked to poor life outcomes, ... [_____] ...',
], {
    fontSize: 18,
    fontFamily: 'Courier New, monospace',
    textColor: '#4f5053',
    opacity: 1
});

placeRandomText([
    'I swear to myself I won\'t ever become like you (homeless stranger who bled out on the streets). \n I won\'t be defined by this disorder. ',
], {
    fontSize: 18,
    fontFamily: 'Courier New, monospace',
    textColor: '#a2a5ac',
    highlightText: 'I swear to myself I won\'t ever become like you',
    highlightColor: '#747272',
    opacity: 1
});

placeRandomText([
    'To find the strength to [_____]',
], {
    fontSize: 18,
    fontFamily: 'Courier New, monospace',
    textColor: '#7c2f03',
    opacity: 1
});

placeRandomText([
    'Time will always move forward like a never-ending train.\n Do you want to choose to grow or stagnate?',
], {
    fontSize: 18,
    fontFamily: 'Courier New, monospace',
    textColor: '#58463c',
    opacity: 1
});

placeRandomText([
    'And of course I love you too. More than anyone in the world',
], {
    fontSize: 12,
    fontFamily: 'Courier New, monospace',
    textColor: '#e7d3c8',
    opacity: 1
});