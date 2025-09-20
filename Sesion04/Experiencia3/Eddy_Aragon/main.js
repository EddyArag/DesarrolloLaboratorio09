// Mostrar los códigos fuente en los <pre><code>
document.getElementById('code-foo').textContent =
`const foo = () => {
 console.log("foobar");
}
foo(); // Invoke it using the variable
// foobar`;

document.getElementById('code-greeting').textContent =
`function sayHello() {
 return "Hello, ";
}
function greeting(helloMessage, name) {
 console.log(helloMessage() + name);
}
// Pass \`sayHello\` as an argument to \`greeting\` function
greeting(sayHello, "JavaScript!");
// Hello, JavaScript!`;

document.getElementById('code-sayhello').textContent =
`function sayHello() {
 return () => {
   console.log("Hello!");
 }
}`;

// Closure
document.getElementById('code-closure').textContent =
`function makeFunc() {
 const name = 'Mozilla';
 function displayName() {
   console.log(name);
 }
 return displayName;
}
const myFunc = makeFunc();
myFunc();`;

// Ámbito de función
document.getElementById('code-scope1').textContent =
`function exampleFunction() {
 const x = "declared inside function"; // x can only be used in exampleFunction
 console.log("Inside function");
 console.log(x);
}
console.log(x); // Causes error`;

document.getElementById('code-scope2').textContent =
`const x = "declared outside function";
exampleFunction();
function exampleFunction() {
 console.log("Inside function");
 console.log(x);
}
console.log("Outside function");
console.log(x);`;

document.getElementById('code-trycatch').textContent =
`function f() {
 try {
   console.log(0);
   throw 'bogus';
 } catch (e) {
   console.log(1);
   return true; // this return statement is suspended
   // until finally block has completed
   console.log(2); // not reachable
 } finally {
   console.log(3);
   return false; // overwrites the previous "return"
   console.log(4); // not reachable
 }
 // "return false" is executed now
 console.log(5); // not reachable
}
console.log(f()); // 0, 1, 3, false`;

document.getElementById('code-exception').textContent =
`function UserException(message) {
 this.message = message;
 this.name = 'UserException';
}
function getMonthName(mo) {
 mo--; // Adjust month number for array index (1 = Jan, 12 = Dec)
 const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
   'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
 if (months[mo] !== undefined) {
   return months[mo];
 } else {
   throw new UserException('InvalidMonthNo');
 }
}
let monthName;
try {
 // statements to try
 const myMonth = 15; // 15 is out of bound to raise the exception
 monthName = getMonthName(myMonth);
} catch (e) {
 monthName = 'unknown';
 console.error(e.message, e.name); // pass exception object to err handler
}`;

// Funciones para ejecutar los ejemplos y mostrar la salida
function runFoo() {
    let output = '';
    const foo = () => {
        output += "foobar";
    }
    foo();
    document.getElementById('output-foo').textContent = output;
}

function runGreeting() {
    let output = '';
    function sayHello() {
        return "Hello, ";
    }
    function greeting(helloMessage, name) {
        output += helloMessage() + name;
    }
    greeting(sayHello, "JavaScript!");
    document.getElementById('output-greeting').textContent = output;
}

function runSayHello() {
    let output = '';
    function sayHello() {
        return () => {
            output += "Hello!";
        }
    }
    const fn = sayHello();
    fn();
    document.getElementById('output-sayhello').textContent = output;
}

function runClosure() {
    let output = '';
    function makeFunc() {
        const name = 'Mozilla';
        function displayName() {
            output += name;
        }
        return displayName;
    }
    const myFunc = makeFunc();
    myFunc();
    document.getElementById('output-closure').textContent = output;
}

function runScope1() {
    let output = '';
    try {
        function exampleFunction() {
            const x = "declared inside function";
            output += "Inside function\n";
            output += x + "\n";
        }
        // intentionally cause error
        output += window.x; // undefined
    } catch (e) {
        output += e.toString();
    }
    document.getElementById('output-scope1').textContent = output;
}

function runScope2() {
    let output = '';
    const x = "declared outside function";
    function exampleFunction() {
        output += "Inside function\n";
        output += x + "\n";
    }
    exampleFunction();
    output += "Outside function\n";
    output += x;
    document.getElementById('output-scope2').textContent = output;
}

function runTryCatch() {
    let output = '';
    function f() {
        try {
            output += "0\n";
            throw 'bogus';
        } catch (e) {
            output += "1\n";
            return true;
        } finally {
            output += "3\n";
            return false;
        }
    }
    output += f();
    document.getElementById('output-trycatch').textContent = output;
}

function runException() {
    let output = '';
    function UserException(message) {
        this.message = message;
        this.name = 'UserException';
    }
    function getMonthName(mo) {
        mo--;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
            'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if (months[mo] !== undefined) {
            return months[mo];
        } else {
            throw new UserException('InvalidMonthNo');
        }
    }
    let monthName;
    try {
        const myMonth = 15;
        monthName = getMonthName(myMonth);
        output += monthName;
    } catch (e) {
        monthName = 'unknown';
        output += e.message + " " + e.name;
    }
    document.getElementById('output-exception').textContent = output;
}
