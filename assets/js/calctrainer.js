const state = {
    level: 1,
    score: 0,
    timeLeft: 0,
    timer: null,
    currentProblem: null,
    currentAnswer: null,
    gameActive: false
};

const config = {
    problemsPerLevel: 5,
    correctPoints: 1
};

function getSelectedValues(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
        .map(cb => cb.value);
}

function generateNumber(digitCount) {
    const min = Math.pow(10, digitCount - 1);
    const max = Math.pow(10, digitCount) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
    const operations = getSelectedValues('ops');
    const operandCount = Math.max(...getSelectedValues('operands'));
    const digitCount = Math.max(...getSelectedValues('digits'));
    
    if (operations.length === 0) return { problem: "Please select at least one operation", answer: 0 };

    let numbers = [];
    let operators = [];
    let answer;

    // Generate numbers
    for (let i = 0; i < operandCount; i++) {
        numbers.push(generateNumber(digitCount));
    }

    // Generate operators
    for (let i = 0; i < operandCount - 1; i++) {
        operators.push(operations[Math.floor(Math.random() * operations.length)]);
    }

    // Calculate answer
    answer = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        const nextNum = numbers[i + 1];
        switch(operators[i]) {
            case '+': 
                answer += nextNum; 
                break;
            case '-': 
                answer -= nextNum; 
                break;
            case '*': 
                answer *= nextNum; 
                break;
            case '/':
                // Ensure division results in whole numbers
                const temp = answer * nextNum;
                numbers[i + 1] = temp;
                answer = answer;
                break;
        }
    }

    const problemString = numbers.reduce((acc, num, i) => {
        if (i === 0) return num.toString();
        return `${acc} ${operators[i-1]} ${num}`;
    }, '');

    return {
        problem: `${problemString} = ?`,
        answer: Math.round(answer) // Round to handle any floating point imprecision
    };
}

function updateUI() {
    document.getElementById('level').textContent = state.level;
    document.getElementById('score').textContent = state.score;
    document.getElementById('timer').textContent = state.timeLeft;
    document.getElementById('progress').style.width = 
        `${(state.timeLeft / getSelectedValues('timeout')[0]) * 100}%`;
}

function showMessage(text, isCorrect) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = 'message ' + (isCorrect ? 'correct' : 'incorrect');
}

function startTimer() {
    clearInterval(state.timer);
    state.timeLeft = parseInt(getSelectedValues('timeout')[0]);
    updateUI();

    state.timer = setInterval(() => {
        state.timeLeft--;
        updateUI();

        if (state.timeLeft <= 0) {
            gameOver();
        }
    }, 1000);
}

function nextProblem() {
    const problem = generateProblem();
    state.currentProblem = problem;
    state.currentAnswer = problem.answer;
    document.getElementById('problem').textContent = problem.problem;
    document.getElementById('answer').value = '';
    document.getElementById('answer').focus();
}

function checkAnswer(userAnswer) {
    if (!state.gameActive || userAnswer === '') return;
    
    const correct = parseInt(userAnswer) === state.currentAnswer;
    
    if (correct) {
        state.score += config.correctPoints;
        showMessage('Correct!', true);
        
        if (state.score >= state.level * config.problemsPerLevel * config.correctPoints) {
            state.level++;
            showMessage(`Level ${state.level}!`, true);
        }
        
        startTimer();
        nextProblem();
    } else {
        showMessage('Try again!', false);
    }
    
    updateUI();
}

function gameOver() {
    clearInterval(state.timer);
    state.gameActive = false;
    document.getElementById('problem').innerHTML = 
        `<div class="game-over">Game Over!<br>Final Score: ${state.score}</div>`;
    document.getElementById('answer').disabled = true;
}

function validateConfig() {
    const ops = getSelectedValues('ops');
    const operands = getSelectedValues('operands');
    const digits = getSelectedValues('digits');
    const timeout = getSelectedValues('timeout');

    if (!ops.length) {
        alert('Please select at least one operation');
        return false;
    }
    if (!operands.length) {
        alert('Please select number of operands');
        return false;
    }
    if (!digits.length) {
        alert('Please select digit count');
        return false;
    }
    if (!timeout.length) {
        alert('Please select time limit');
        return false;
    }
    return true;
}

function startGame() {
    if (!validateConfig()) return;
    
    state.level = 1;
    state.score = 0;
    state.gameActive = true;
    
    document.getElementById('answer').disabled = false;
    document.getElementById('answer').value = '';
    
    startTimer();
    nextProblem();
}

document.getElementById('answer').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        checkAnswer(e.target.value);
    }
});

