
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
const cors = require('cors');
app.use(cors());






 const fetchProblemsFromCollection = require('./fetchProblemsFromCollection') ; 
let problems = [];
 fetchProblemsFromCollection()
  .then((data) => {
     problems = data;
    // Process the data further as needed
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
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
    if (USERS.find((x) => x.email === email)) {
      return res.status(403).json({ msg: "Email already exists" });
    }
  
    USERS.push({
      email,
      password,
      id: USER_ID_COUNTER++,
    });
  
    return res.json({
      msg: "Success",
    });
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
    if(accepted)
    {
        SUBMISSIONS.push({problemId,submission,userId: req.userID,status: 'AC'});
        return res.json({msg: 'AC'});
    }
    else
    {
        SUBMISSIONS.push({problemId,submission,userId: req.userID,status: 'WA'});
        return res.json({msg: 'WA'});
    }
});
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