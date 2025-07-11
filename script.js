// 전역 변수
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

// 기본 계산기 변수
let sciCurrentOperand = '0';
let sciPreviousOperand = '';
let sciOperation = undefined;
let sciShouldResetScreen = false;

// DOM 요소들
const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');
const sciCurrentOperandElement = document.getElementById('sci-current-operand');
const sciPreviousOperandElement = document.getElementById('sci-previous-operand');

// 네비게이션 기능
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.calculator-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 활성 링크 업데이트
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // 섹션 표시
            const targetId = this.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });

    // 단위 변환기 초기화
    initializeUnitConverter();
});

// 기본 계산기 함수들
function appendNumber(number) {
    if (shouldResetScreen) {
        currentOperand = '';
        shouldResetScreen = false;
    }
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand += number;
    }
    updateDisplay();
}

function appendOperator(operator) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = operator;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert('0으로 나눌 수 없습니다!');
                return;
            }
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }

    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    shouldResetScreen = true;
    updateDisplay();
}

function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteLast() {
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetScreen) {
        currentOperand = '0';
        shouldResetScreen = false;
    }
    if (currentOperand.includes('.')) return;
    currentOperand += '.';
    updateDisplay();
}

function updateDisplay() {
    currentOperandElement.textContent = currentOperand;
    if (operation != null) {
        previousOperandElement.textContent = `${previousOperand} ${operation}`;
    } else {
        previousOperandElement.textContent = '';
    }
}

// 공학용 계산기 함수들
function appendScientificNumber(number) {
    if (sciShouldResetScreen) {
        sciCurrentOperand = '';
        sciShouldResetScreen = false;
    }
    if (number === '.' && sciCurrentOperand.includes('.')) return;
    if (sciCurrentOperand === '0' && number !== '.') {
        sciCurrentOperand = number;
    } else {
        sciCurrentOperand += number;
    }
    updateScientificDisplay();
}

function appendScientificOperator(operator) {
    if (sciCurrentOperand === '') return;
    if (sciPreviousOperand !== '') {
        calculateScientific();
    }
    sciOperation = operator;
    sciPreviousOperand = sciCurrentOperand;
    sciCurrentOperand = '';
    updateScientificDisplay();
}

function scientificFunction(func) {
    const current = parseFloat(sciCurrentOperand);
    if (isNaN(current)) return;

    let result;
    switch (func) {
        case 'sin':
            result = Math.sin(current * Math.PI / 180);
            break;
        case 'cos':
            result = Math.cos(current * Math.PI / 180);
            break;
        case 'tan':
            result = Math.tan(current * Math.PI / 180);
            break;
        case 'log':
            if (current <= 0) {
                alert('양수만 로그를 계산할 수 있습니다!');
                return;
            }
            result = Math.log10(current);
            break;
        case 'ln':
            if (current <= 0) {
                alert('양수만 자연로그를 계산할 수 있습니다!');
                return;
            }
            result = Math.log(current);
            break;
        case 'sqrt':
            if (current < 0) {
                alert('음수의 제곱근은 계산할 수 없습니다!');
                return;
            }
            result = Math.sqrt(current);
            break;
    }

    sciCurrentOperand = result.toString();
    updateScientificDisplay();
}

function calculateScientific() {
    let computation;
    const prev = parseFloat(sciPreviousOperand);
    const current = parseFloat(sciCurrentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (sciOperation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert('0으로 나눌 수 없습니다!');
                return;
            }
            computation = prev / current;
            break;
        case '^':
            computation = Math.pow(prev, current);
            break;
        default:
            return;
    }

    sciCurrentOperand = computation.toString();
    sciOperation = undefined;
    sciPreviousOperand = '';
    sciShouldResetScreen = true;
    updateScientificDisplay();
}

function clearScientific() {
    sciCurrentOperand = '0';
    sciPreviousOperand = '';
    sciOperation = undefined;
    updateScientificDisplay();
}

function appendScientificDecimal() {
    if (sciShouldResetScreen) {
        sciCurrentOperand = '0';
        sciShouldResetScreen = false;
    }
    if (sciCurrentOperand.includes('.')) return;
    sciCurrentOperand += '.';
    updateScientificDisplay();
}

function updateScientificDisplay() {
    sciCurrentOperandElement.textContent = sciCurrentOperand;
    if (sciOperation != null) {
        sciPreviousOperandElement.textContent = `${sciPreviousOperand} ${sciOperation}`;
    } else {
        sciPreviousOperandElement.textContent = '';
    }
}

// 단위 변환기
const unitData = {
    length: {
        units: ['미터', '킬로미터', '센티미터', '밀리미터', '인치', '피트', '야드', '마일'],
        conversions: {
            '미터': 1,
            '킬로미터': 1000,
            '센티미터': 0.01,
            '밀리미터': 0.001,
            '인치': 0.0254,
            '피트': 0.3048,
            '야드': 0.9144,
            '마일': 1609.344
        }
    },
    weight: {
        units: ['그램', '킬로그램', '밀리그램', '톤', '파운드', '온스'],
        conversions: {
            '그램': 1,
            '킬로그램': 1000,
            '밀리그램': 0.001,
            '톤': 1000000,
            '파운드': 453.592,
            '온스': 28.3495
        }
    },
    temperature: {
        units: ['섭씨', '화씨', '켈빈'],
        conversions: {
            '섭씨': 'celsius',
            '화씨': 'fahrenheit',
            '켈빈': 'kelvin'
        }
    },
    area: {
        units: ['제곱미터', '제곱킬로미터', '제곱센티미터', '헥타르', '에이커', '제곱피트'],
        conversions: {
            '제곱미터': 1,
            '제곱킬로미터': 1000000,
            '제곱센티미터': 0.0001,
            '헥타르': 10000,
            '에이커': 4046.86,
            '제곱피트': 0.092903
        }
    },
    volume: {
        units: ['리터', '밀리리터', '세제곱미터', '갤런', '파인트', '쿼트'],
        conversions: {
            '리터': 1,
            '밀리리터': 0.001,
            '세제곱미터': 1000,
            '갤런': 3.78541,
            '파인트': 0.473176,
            '쿼트': 0.946353
        }
    }
};

function initializeUnitConverter() {
    const unitType = document.getElementById('unit-type');
    const fromUnit = document.getElementById('from-unit');
    const toUnit = document.getElementById('to-unit');

    function populateUnits() {
        const type = unitType.value;
        const units = unitData[type].units;
        
        fromUnit.innerHTML = '';
        toUnit.innerHTML = '';
        
        units.forEach(unit => {
            const fromOption = document.createElement('option');
            fromOption.value = unit;
            fromOption.textContent = unit;
            fromUnit.appendChild(fromOption);
            
            const toOption = document.createElement('option');
            toOption.value = unit;
            toOption.textContent = unit;
            toUnit.appendChild(toOption);
        });
        
        // 기본값 설정
        if (units.length > 1) {
            toUnit.selectedIndex = 1;
        }
        
        convertUnit();
    }

    unitType.addEventListener('change', populateUnits);
    populateUnits();
}

function changeUnitType() {
    initializeUnitConverter();
}

function convertUnit() {
    const fromValue = parseFloat(document.getElementById('from-value').value);
    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;
    const unitType = document.getElementById('unit-type').value;
    
    if (isNaN(fromValue)) {
        document.getElementById('to-value').value = '';
        return;
    }
    
    let result;
    
    if (unitType === 'temperature') {
        result = convertTemperature(fromValue, fromUnit, toUnit);
    } else {
        const conversions = unitData[unitType].conversions;
        const fromFactor = conversions[fromUnit];
        const toFactor = conversions[toUnit];
        result = (fromValue * fromFactor) / toFactor;
    }
    
    document.getElementById('to-value').value = result.toFixed(6);
}

function convertTemperature(value, fromUnit, toUnit) {
    let celsius;
    
    // 입력값을 섭씨로 변환
    switch (fromUnit) {
        case '섭씨':
            celsius = value;
            break;
        case '화씨':
            celsius = (value - 32) * 5/9;
            break;
        case '켈빈':
            celsius = value - 273.15;
            break;
    }
    
    // 섭씨에서 목표 단위로 변환
    switch (toUnit) {
        case '섭씨':
            return celsius;
        case '화씨':
            return celsius * 9/5 + 32;
        case '켈빈':
            return celsius + 273.15;
    }
}

function swapUnits() {
    const fromUnit = document.getElementById('from-unit');
    const toUnit = document.getElementById('to-unit');
    const fromValue = document.getElementById('from-value');
    const toValue = document.getElementById('to-value');
    
    const tempUnit = fromUnit.value;
    const tempValue = fromValue.value;
    
    fromUnit.value = toUnit.value;
    toUnit.value = tempUnit;
    fromValue.value = toValue.value;
    
    convertUnit();
}

// 금융 계산기
function calculateInterest() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const time = parseFloat(document.getElementById('time').value);
    
    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
        document.getElementById('interest-result').innerHTML = '모든 값을 입력해주세요.';
        return;
    }
    
    const interest = principal * (rate / 100) * time;
    const total = principal + interest;
    
    document.getElementById('interest-result').innerHTML = `
        <strong>계산 결과:</strong><br>
        원금: ${principal.toLocaleString()}원<br>
        이자: ${interest.toLocaleString()}원<br>
        총액: ${total.toLocaleString()}원
    `;
}

function calculateLoan() {
    const amount = parseFloat(document.getElementById('loan-amount').value);
    const rate = parseFloat(document.getElementById('loan-rate').value);
    const term = parseFloat(document.getElementById('loan-term').value);
    
    if (isNaN(amount) || isNaN(rate) || isNaN(term)) {
        document.getElementById('loan-result').innerHTML = '모든 값을 입력해주세요.';
        return;
    }
    
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = term * 12;
    
    if (monthlyRate === 0) {
        const monthlyPayment = amount / numberOfPayments;
        const totalPayment = amount;
        
        document.getElementById('loan-result').innerHTML = `
            <strong>계산 결과:</strong><br>
            월 상환금: ${monthlyPayment.toLocaleString()}원<br>
            총 상환금: ${totalPayment.toLocaleString()}원<br>
            총 이자: 0원
        `;
    } else {
        const monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                              (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - amount;
        
        document.getElementById('loan-result').innerHTML = `
            <strong>계산 결과:</strong><br>
            월 상환금: ${monthlyPayment.toLocaleString()}원<br>
            총 상환금: ${totalPayment.toLocaleString()}원<br>
            총 이자: ${totalInterest.toLocaleString()}원
        `;
    }
}

// 키보드 지원
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        appendNumber(key);
    } else if (key === '+' || key === '-') {
        appendOperator(key);
    } else if (key === '*') {
        appendOperator('×');
    } else if (key === '/') {
        appendOperator('÷');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearAll();
    }
});

// 광고 시뮬레이션 (실제 광고 코드로 교체 가능)
function simulateAd() {
    const adBanner = document.getElementById('ad-banner');
    const sideAd = document.getElementById('side-ad');
    
    // 실제 광고 코드를 여기에 삽입
    // 예: Google AdSense, Amazon Associates 등
    
    console.log('광고 영역 - 실제 광고 코드로 교체하세요');
}

// 페이지 로드 시 광고 초기화
window.addEventListener('load', function() {
    simulateAd();
    
    // 계산기 초기화
    updateDisplay();
    updateScientificDisplay();
}); 