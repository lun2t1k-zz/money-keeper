let startBtn = document.getElementById( 'start' );
let budgetValue = document.querySelector( '.budget-value' );
let dayBudgetValue = document.querySelector( '.daybudget-value' );
let levelValue = document.querySelector( '.level-value' );
let expensesValue = document.querySelector( '.expenses-value' );
let optionalExpensesValue = document.querySelector( '.optionalexpenses-value' );
let incomeValue = document.querySelector( '.income-value' );
let monthSavingsValue = document.querySelector( '.monthsavings-value' );
let yearSavingsValue = document.querySelector( '.yearsavings-value' );

let expensesItem = document.querySelectorAll( '.expenses-item' );
let expensesItemBtn = document.getElementsByClassName( 'expenses-item-btn' )[0];
let optionalExpensesBtn = document.querySelector( '.optionalexpenses-btn' );
let countBudgetBtn = document.querySelector( '.count-budget-btn' );
let optionalExpensesItem = document.querySelectorAll( '.optionalexpenses-item' );
let chooseIncome = document.querySelector( '.choose-income' );
let savings = document.querySelector( '#savings' );
let sumValue = document.querySelector( '#sum' );
let percentValue = document.querySelector( '#percent' );

let yearValue = document.querySelector( '.year-value' );
let monthValue = document.querySelector( '.month-value' );
let dayValue = document.querySelector( '.day-value' );

let money;
let date;

alert( 'Для начала нажмите кнопку "Начать расчет"' );

startBtn.addEventListener( 'click', function () {
  date = prompt( 'Введите дату в формате YYYY-MM-DD', '' );
  money = +prompt( 'Ваш бюджет на месяц?', '' );
  
  while ( isNaN(money) || money == "" || money == null ) {
    money = +prompt( 'Ваш бюджет на месяц?', '' );
  }

  appData.budget = money;
  appData.timeData = date;
  budgetValue.textContent = money.toFixed();
  yearValue.value = new Date( Date.parse(date) ).getFullYear();
  monthValue.value = new Date( Date.parse(date) ).getMonth() + 1;
  dayValue.value = new Date( Date.parse(date) ).getDate();
});

expensesItemBtn.addEventListener( 'click', function () {
  let sum = 0;

  for ( let i = 0; i < expensesItem.length; i++ ) {
    let a = expensesItem[i].value;
    let b = +expensesItem[++i].value;

    if ( ( typeof(a) ) === 'string' && ( typeof(a) ) != null && a != '' && ( typeof(b) ) != null && b != '' && a.length < 50) {
      appData.expenses[a] = b;
      sum += +b;
    } else {
      alert( 'Проверьте введенные данные!' );
    };
  };

  expensesValue.textContent = sum;
  appData.expensesValue = sum;
});

optionalExpensesBtn.addEventListener( 'click', function () {
  optionalExpensesValue.textContent = '';

  for ( let i = 0; i < optionalExpensesItem.length; i++ ) {
    let optExpense = optionalExpensesItem[i].value;
    
    if ( ( typeof(optExpense) ) === 'string' && ( typeof(optExpense) ) != null && optExpense != '' && optExpense.length < 50) {
      appData.optionalExpenses[i] = optExpense;
      optionalExpensesValue.textContent += appData.optionalExpenses[i] + '; ';
    } else {
      alert( 'Проверьте введенные данные!' );
    };
  };
});

countBudgetBtn.addEventListener( 'click', function () {
  if ( appData.budget != undefined ) {
    appData.moneyPerDay = ( (appData.budget - appData.expensesValue) / 30 ).toFixed(2);
    dayBudgetValue.textContent = appData.moneyPerDay;
  
    if ( appData.moneyPerDay < 100 ) {
      levelValue.textContent = 'Минимальный уровень достатка';
    } else if ( appData.moneyPerDay > 100 && appData.moneyPerDay < 2000 ) {
      levelValue.textContent = 'Средний уровень достатка';
    } else if ( appData.moneyPerDay > 2000 ) {
      levelValue.textContent = 'Высокий уровень достатка';
    }else {
      alert( 'Нажмите кнопку "Начать расчет", потом введите обязательные расходы, затем "Рассчитать"' );
      dayBudgetValue.textContent = 'Ошибка!';
      levelValue.textContent = 'Ошибка!';
    };
  };  
});

chooseIncome.addEventListener( 'input', function () {
  let items = chooseIncome.value;

  appData.income = items;

  incomeValue.textContent = appData.income + ' ';
});

savings.addEventListener( 'click', function () {
  if ( appData.savings == true ) {
    appData.savings = false;
  } else {
    appData.savings = true;
  };
});

sumValue.addEventListener( 'input', function () {
  if ( appData.savings == true ) {
    let sum = +sumValue.value;
    let percent = +percentValue.value;

    appData.monthIncome = ( sum / 100 / 12 * percent ).toFixed(2);
    appData.yearIncome = ( sum / 100 * percent ).toFixed(2);

    monthSavingsValue.textContent = appData.monthIncome;
    yearSavingsValue.textContent = appData.yearIncome;
  };
});

percentValue.addEventListener( 'input', function () {
  if ( appData.savings == true ) {
    let sum = +sumValue.value;
    let percent = +percentValue.value;

    appData.monthIncome = ( sum / 100 / 12 * percent ).toFixed(2);
    appData.yearIncome = ( sum / 100 * percent ).toFixed(2);

    monthSavingsValue.textContent = appData.monthIncome;
    yearSavingsValue.textContent = appData.yearIncome;
  };
});

let appData = {
  budget: money,
  timeData: date,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false,
};