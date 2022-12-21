import "./Devider.css";
export default function Devider({ label }) {
  return (
    <div className="container">
      <div className="border" />
      <span className="content"> {label} </span>
      <div className="border" />
    </div>
  );
}
