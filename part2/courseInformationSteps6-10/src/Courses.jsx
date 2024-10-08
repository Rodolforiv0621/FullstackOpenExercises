const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map((part) => (
        <Part part={part.name} exercises={part.exercises} key={part.id} />
      ))}
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <strong>
        total of{" "}
        {props.course.parts.reduce((sum, part) => sum + part.exercises, 0)}{" "}
        exercises
      </strong>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => {
        return <Course key={course.id} course={course} />;
      })}
    </div>
  );
};

export default Courses;

