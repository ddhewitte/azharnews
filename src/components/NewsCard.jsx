export default function NewsCard({ title, byline, moreOnClick }) {
  return (
    <>
      <div>
        <h3 className="font-bold">{title}</h3>
        <p>{byline}</p>
        <button onClick={ () => moreOnClick(title)}>More</button>
      </div>
    </>
  );
}