const getHistory = () => document.getElementById('history-value').innerText;

const printHistory = num => document.getElementById('history-value').innerText = num;

const getOutput = () => document.getElementById('output-value').innerText;

const printOutput = num => {
    if (num === '') {
        document.getElementById('output-value').innerText = num;
    } else {
        document.getElementById('output-value').innerText = getFormattedNumber(num);
    }
}

const getFormattedNumber = num => {
    if (num === "-") {
        return "";
    }
    const number = Number(num);
    const value = number.toLocaleString('en');
    return value;
}

const reverseFormattedNumber = num => Number(num.replace(/,/g, ''));


const operator = document.getElementsByClassName('operator');
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function () {
        if (this.id === 'clear') {
            printOutput('');
            printHistory('');
        }
        else if (this.id === 'backspace') {
            let output = reverseFormattedNumber(getOutput()).toString();
            if (output) {
                output = output.substr(0, output.length - 1);
                printOutput(output);
            }

        }
        else {
            let output = getOutput();
            let history = getHistory();
            if (output === "" && history !== "") {
                if (isNaN(history[history.length - 1])) {
                    history = history.substr(0, history.length - 1);
                }
            }
            if (output !== "" || history !== "") {
                output = output == "" ? output : reverseFormattedNumber(output);
                history = history + output;
                if (this.id === '=') {
                    const result = eval(history);
                    printOutput(result);
                    printHistory("");
                }
                else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput('');
                }

            }
        }
    });
}

const number = document.getElementsByClassName('number');
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function () {
        let output = reverseFormattedNumber(getOutput());
        if (output !== NaN) {
            output += this.id;
            printOutput(output);
        }
    });
}
