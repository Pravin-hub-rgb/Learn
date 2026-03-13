var naam;
naam = "1";
var num = 45;
num = 44;
var fruits = ["hi", "hello"];
var user = {
    naam: "Ali",
    age: 25,
    email: "ali@gmail.com"
};
var user2 = {
    naam: "Ali",
    age: 33,
    email: "ali@gmail.com"
};
function greet(fName, lName, pno) {
    var fullString = "".concat(fName, " ").concat(lName, " Phone Number: 4{pno}");
    return fullString;
}
greet("Pravin", "Kumar", 444444);
// Add some output to see the results
console.log("TypeScript file compiled and running successfully!");
console.log("User:", user);
console.log("Greeting result:", greet("Pravin", "Kumar", 444444));
