---
layout: archive
title: "Calctrainer - Math Typing Game"
permalink: /webapps/calctrainer
redirect_from:
  - /games/calctrainer
compress_html: false
---
Train yourself as a human calculator
🦾🤖
{% include base_path %}

<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #f0f2f5;
            margin: 0;
            padding: 60px;
            min-height: 100vh;
        }

        .game-container {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
            width: 130%;
            max-width: 640px;
        }

        .config-panel {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            text-align: left;
        }

        .config-section {
            margin-bottom: 1rem;
        }

        .config-section h3 {
            margin: 0 0 0.5rem 0;
            font-size: 1rem;
            color: #495057;
        }

        .checkbox-group {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .checkbox-label {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            cursor: pointer;
        }

        .stats {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2rem;
        }

        .problem {
            font-size: 2.5rem;
            margin: 2rem 0;
            min-height: 60px;
        }

        input[type="number"] {
            font-size: 1.5rem;
            padding: 0.5rem;
            width: 250px;
            text-align: center;
            border: 2px solid #ddd;
            border-radius: 5px;
            margin-bottom: 1rem;
        }

        input[type="number"]:focus {
            outline: none;
            border-color: #007bff;
        }

        button {
            background: #007bff;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            margin: 0.5rem;
        }

        button:hover {
            background: #0056b3;
        }

        .progress-bar {
            width: 100%;
            height: 10px;
            background: #eee;
            border-radius: 5px;
            overflow: hidden;
            margin-bottom: 1rem;
        }

        .progress-fill {
            height: 100%;
            background: #28a745;
            transition: width 0.1s linear;
        }

        .message {
            min-height: 24px;
            margin: 1rem 0;
            font-weight: bold;
        }

        .correct { color: #28a745; }
        .incorrect { color: #dc3545; }
        .game-over {
            font-size: 1.5rem;
            color: #dc3545;
        }
    </style>
</head>
<body>
    <div class="game-container">
        <div class="config-panel">
            <div class="config-section">
                <h3>Operations</h3>
                <div class="checkbox-group">
                    <label class="checkbox-label">
                        <input type="checkbox" name="ops" value="+" checked> +
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" name="ops" value="-" checked> -
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" name="ops" value="*" checked> *
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" name="ops" value="/"> /
                    </label>
                </div>
            </div>
            <div class="config-section">
                <h3>Number of Operands</h3>
                <div class="checkbox-group">
                    <label class="checkbox-label">
                        <input type="radio" name="operands" value="2" checked> 2 Numbers
                    </label>
                    <label class="checkbox-label">
                        <input type="radio" name="operands" value="3"> 3 Numbers
                    </label>
                </div>
            </div>
            <div class="config-section">
                <h3>Digit Count</h3>
                <div class="checkbox-group">
                    <label class="checkbox-label">
                        <input type="radio" name="digits" value="1" checked> 1 Digit
                    </label>
                    <label class="checkbox-label">
                        <input type="radio" name="digits" value="2"> 2 Digits
                    </label>
                    <label class="checkbox-label">
                        <input type="radio" name="digits" value="3"> 3 Digits
                    </label>
                </div>
            </div>
            <div class="config-section">
                <h3>Time Limit</h3>
                <div class="checkbox-group">
                    <label class="checkbox-label">
                        <input type="radio" name="timeout" value="1"> 1 Second
                    </label>
                    <label class="checkbox-label">
                        <input type="radio" name="timeout" value="3"> 3 Seconds
                    </label>
                    <label class="checkbox-label">
                        <input type="radio" name="timeout" value="5" checked> 5 Seconds
                    </label>
                </div>
            </div>
            <button onclick="startGame()">Start New Game</button>
        </div>
        <div class="stats">
            <div>Level: <span id="level">1</span></div>
            <div>Score: <span id="score">0</span></div>
            <div>Time: <span id="timer">5</span>s</div>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" id="progress"></div>
        </div>
        <div class="problem" id="problem"></div>
        <input type="number" id="answer" placeholder="Type answer here" autocomplete="off">
        <div class="message" id="message"></div>
    </div>
    <script>
        const state = {
            level: 1,
            score: 0,
            timeLeft: 5,
            timer: null,
            currentProblem: null,
            currentAnswer: null,
            gameActive: false
        };

        const config = {
            problemsPerLevel: 5,
            correctPoints: 10
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

    </script>
</body>
</html>
