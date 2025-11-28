export default function Log({ turns }) {
  const turnLog = turns.map((turn) => (
    <li key={`${turn.square.row} ${turn.square.col}`} className="highlighted">
      {turn.player} selected {turn.square.row}, {turn.square.col}
    </li>
  ));
  return <ol id="log">{turnLog}</ol>;
}
