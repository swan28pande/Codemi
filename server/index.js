
const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//import middleware.js file
const {auth} = require('./middleware.js');
var jwt = require("jsonwebtoken");
const JWT_SECRET = "secret";


 const problems = [
    {
        problemId: "1",
        title: "201. Bitwise AND of Numbers Range",
        difficulty: "Medium",
        acceptance: "42%",
        description: "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.",
        exampleIn: "left = 5, right = 7",
        exampleOut: "4"
    },
    {
        problemId: "2",
        title: "205. Add two numbers",
        difficulty: "Medium",
        acceptance: "41%",
        description: "Given two numbers, add them and return them in integer range. use MOD=1e9+7",
        exampleIn: "a = 100 , b = 200",
        exampleOut: "300"
    },
    {
        problemId: "3",
        title: "202. Happy Number",
        difficulty: "Easy",
        acceptance: "54.9%",
        description: "Write an algorithm to determine if a number n is happy.",
        exampleIn: "n = 19",
        exampleOut: "true"
    },
    {
        problemId: "4",
        title: "203. Remove Linked List Elements",
        difficulty: "Hard",
        acceptance: "42%",
        description: "Given number k , removed kth element",
        exampleIn: "list: 1->2->3 , k=2",
        exampleOut: "1->3"
    },
    {
        problemId: "5",
        title: "204. Count Primes",
        difficulty: "Easy",
        acceptance: "32%",
        description: "Given an integer n, return the number of prime numbers that are strictly less than n.",
        exampleIn: "n = 10",
        exampleOut: "4"
    },
    {
        problemId: "6",
        title: "206. Reverse Linked List",
        difficulty: "Easy",
        acceptance: "65%",
        description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
        exampleIn: "head = [1,2,3,4,5]",
        exampleOut: "[5,4,3,2,1]"
    },
    {
        problemId: "7",
        title: "207. Course Schedule",
        difficulty: "Medium",
        acceptance: "47%",
        description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.",
        exampleIn: "numCourses = 2, prerequisites = [[1,0]]",
        exampleOut: "true"
    },
    {
        problemId: "8",
        title: "208. Implement Trie (Prefix Tree)",
        difficulty: "Medium",
        acceptance: "48%",
        description: "Implement the Trie class:",
        exampleIn: "Trie trie = new Trie();",
        exampleOut: "null"
    }

];
const USERS = [];
const SUBMISSIONS = [];
var USER_ID_COUNTER = 1; 

app.get('/', (req, res) => {
  res.send('Hello World!')
});


app.get('/problems',(req,res) => {
const filteredProblems = problems.map(x=> ({
    problemId: x.problemId,
    title: x.title,
    difficulty: x.difficulty,
    acceptance: x.acceptance,

}))
res.json(filteredProblems);

});

app.get('/problems/:id',(req,res) => {
    const problem = problems.find(x=> x.problemId === req.params.id);
    
    if(!problem)
    return res.status(411).json({});

    return res.json(problem);
    
    });

app.get('/me',auth,(req,res) => {
    const user = USERS.find(x=> x.id=== req.userID);
    // const user_email = user.email;
    // const user_id = user.id;
    // return res.json({user_email,user_id});
    return res.json({user});
        
});
        


app.post("/signup", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = USERS.find(x => x.email === email);
    if (user) {

    
      return res.status(403).send('User already exists');
    }

    USERS.push({ email, password,id: USER_ID_COUNTER++ });
    return res.status(200).json({msg: 'User created'});
});
app.get("/submission/:problemID",auth, (req,res) => {

    const problemId = req.params.problemId;
    const user = USERS.find(x=> x.id=== req.userID);
    const submission = SUBMISSIONS.filter(x=> x.problemId === problemId && x.userId === user.id);
    if(!submission)
    return res.status(411).json({});
    return res.json({submission});
  
})
app.post("/submission",auth, (req,res) => {

    const accepted   = Math.random() > 0.5;
    const problemId = req.body.problemId;
    const submission = req.body.submission;
    const user = USERS.find(x=> x.id=== req.userID);
    if(accepted)
    {
        SUBMISSIONS.push({problemId,submission,userId: user.id});
        return res.json({msg: 'AC'});
    }
    else
    {
        return res.json({msg: 'WA'});
    }
})
app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = USERS.find(x => x.email === email);
    if (!user) {
      return res.status(403).send('User not found');
    }
    if(password!== password){
        return res.status(403).send('Incorrect password');
    }
    
    const token = jwt.sign({
        id: user.id 
    }, JWT_SECRET);

    return res.json({token});
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})