let naam : string

naam = "1"

let num: number = 45
num = 44

let fruits: string[] = ["hi", "hello"]

let user: {naam: string; age: number; email: string} = {
    naam: "Ali",
    age: 25,
    email: "ali@gmail.com"
}
type User = {
    naam: string;
    age: number;
    email: string
}

let user2: User = {
    naam: "Ali",
    age: 33,
    email: "ali@gmail.com"
}

// Optional Properties

interface User2 {
    firstName: string;
    middleName?: string;
    lastName: string
}

function greet(fName: string, lName: string, pno: number): string
{
    let fullString = `${fName} ${lName} Phone Number: 4{pno}`
    return fullString
}

greet("Pravin", "Kumar", 444444)

// Add some output to see the results
console.log("TypeScript file compiled and running successfully!")
console.log("User:", user)
console.log("Greeting result:", greet("Pravin", "Kumar", 444444))
