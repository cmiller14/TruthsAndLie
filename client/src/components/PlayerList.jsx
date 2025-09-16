import React from "react";

function PlayersList({ players }) {
  return (
    <div className="shadow-card mb-4">
      <h3 className="mb-3">Leaderboard</h3>
      {players?.length === 0 ? (
        <p className="text-muted">No players yet.</p>
      ) : (
        <ul className="list-group">
          {players.map((p, i) => (
            <li key={i} className="list-group-item">
              {p.name} — Score: {p.score}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PlayersList;
