import { useState } from "react";
import "./App.scss";
import SubjectCard from "./components/SubjectCard";
import ListHeader from "./components/ListHeader";

function App() {
  // Initialize subjects as an array of objects with mc (modular credits) and grade properties
  const [subjects, setSubjects] = useState(
    new Array(7).fill(null).map(() => ({ mc: 0, grade: 0 }))
  );
  const [currGPA, setCurrGPA] = useState("");
  const [currMC, setCurrMC] = useState("");
  const [newcGPA, setNewcGPA] = useState(0);

  // Update the handleChange function to handle both mc and grade properties
  const handleChange = (index, field) => (event) => {
    const newValue = event.target.value;
    setSubjects(
      subjects.map((subject, i) =>
        i === index
          ? {
              ...subject,
              [field]: newValue === "" ? "" : Number(newValue),
            }
          : subject
      )
    );
  };

  const handleSubmit = () => {
    const totalThisSem = subjects.reduce(
      (accumulator, currentSubject) => {
        return {
          mcTotal: accumulator.mcTotal + (parseInt(currentSubject.mc, 10) || 0),
          wGradesTotal:
            accumulator.wGradesTotal +
            (parseFloat(currentSubject.grade) || 0) *
              parseInt(currentSubject.mc, 10),
        };
      },
      { mcTotal: 0, wGradesTotal: 0 }
    ); //each subject is only for the current semester subjects taken.

    const sumMC = totalThisSem.mcTotal + parseInt(currMC, 10);

    const sumGrade =
      parseInt(currMC, 10) * parseFloat(currGPA) + totalThisSem.wGradesTotal;

    setNewcGPA(sumGrade / sumMC);
  };

  return (
    <div className="app-body">
      <h1>Cap Calculator</h1>
      <div className="progress">
        <h3>cGPA</h3>
        <input
          type="number"
          step={0.1}
          value={currGPA}
          onChange={(e) => setCurrGPA(e.target.value)}
        />
        <h4>Credits Accumulated</h4>
        <input
          type="number"
          step={1.0}
          value={currMC}
          onChange={(e) => setCurrMC(e.target.value)}
        />
      </div>
      <ul>
        <ListHeader></ListHeader>
        {subjects.map((subject, index) => (
          <SubjectCard
            key={`subject-${index}`}
            mc={subject.mc}
            grade={subject.grade}
            onMCChange={handleChange(index, "mc")}
            onGradeChange={handleChange(index, "grade")}
          />
        ))}
      </ul>
      <div className="cap-calculation">
        {" "}
        <button id="submit-btn" onClick={handleSubmit}>
          Calculate new cGPA
        </button>
        <input type="text" value={newcGPA} disabled />
      </div>
    </div>
  );
}

export default App;
