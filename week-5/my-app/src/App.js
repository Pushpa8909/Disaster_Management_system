import React from "react";
function App(){
    const name="Apple";
    const year=new Date().getFullYear();
    const skills=["React","JavaScript","HTML","CSS"];
    return(
        <div>
            <h1>Welcome to JSX example</h1>
            <p>Hello, my name is {name}.</p>
            <p>The current year is {year}.</p>
            <h3>Skills I am learning:</h3>
            <ul>
                {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
             ))}
            </ul>
        </div>
    );
}export default App;