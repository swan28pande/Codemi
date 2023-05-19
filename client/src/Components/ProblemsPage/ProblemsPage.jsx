import React , { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import "./ProblemsPage.css"


const ProblemsPage = () => {
  const [problem, setProblem] = useState([]);
  const [CodeSeg, setCodeSeg] = useState("") ; 
  const [submission, setSubmission] = useState("");
  const { pid } = useParams() ;
  const cleanId = pid.substring(1) ;


useEffect(() => {
    fetch('http://localhost:3000/problems'+'/'+cleanId)
      .then(response => response.json())
      .then(problem => setProblem(problem))
  }, [])



  // const found = problems.find((prob)=>{
  //   return prob.problemId===cleanId;
  // })


  const handleKey = (event) => {
    if (event.key == "Tab"){
      event.preventDefault() ;
      const { selectionStart , selectionEnd , value } = event.target ;
      const val = value.substring(0,selectionStart) + "\t" + value.substring(selectionStart) ;
      event.target.value = val;
      event.target.selectionStart = event.target.selectionEnd = selectionStart+1;
    }
    setCodeSeg(event.value) ;
  }

  return (
    <div>
      {
        problem? (
          <div id="problempage" className='flex-row'>
            <div className="ques">
              <h1>{problem.title}</h1>
              <h5>Description</h5>
              <p>{problem.description}</p>
              <code>Input : {problem.exampleIn}</code>
              <code>Output : {problem.exampleOut}</code>
            </div>
            <div className="code">
              <h1>Code Here</h1>
              <div className='code-form' >
                <textarea onChange={(e) => setSubmission(e.target.value)} name="SolvedCode" onKeyDown={ (event) => handleKey(event) }></textarea>
                <button type="submit" id="test">TestCode</button>
                <button type="submit" id="submit" onClick={() => {
                  const response = fetch("http://localhost:3000/submission", { 
                    method: 'POST' , 
                    headers: { 
                      'authorization' : localStorage.getItem("token")
                    },
                    body: JSON.stringify({
                      problemId: cleanId,
                      submission: submission

                  })
                  })
                  const data = response.json() ;
                  console.log(data) ;


              

            



                }}>SubmitCode</button>
              </div>
            </div>
          </div>
        ) :
        (<div>The searched Question Doesn't exist</div>)
      }

    </div>
    
  )
}

export default ProblemsPage