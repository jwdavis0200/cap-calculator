import "./SubjectCard.scss";

export interface SubjectProps {
  mc: string;
  grade: string;
  onMCChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onGradeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SubjectCard({ mc, grade, onMCChange, onGradeChange }: SubjectProps) {
  return (
    <li className="subject-card">
      <div className="subject-details">
        <label>
          MC:
          <input
            type="number"
            value={mc}
            onChange={onMCChange}
            min="0"
            step="1"
          />
        </label>
        <label>
          Grade:
          <input
            type="number"
            value={grade}
            onChange={onGradeChange}
            min="0"
            max="5" // Assuming the grade is out of 5, adjust if necessary
            step="0.01"
          />
        </label>
      </div>
    </li>
  );
}

export default SubjectCard;
