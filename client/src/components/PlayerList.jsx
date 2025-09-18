import React from "react";

function PlayersList({ players }) {
  // Clone and sort players by score descending
  const sortedPlayers = [...(players || [])].sort((a, b) => b.score - a.score);

  return (
    <div className="shadow-card mb-4">
      <h3 className="mb-3">Leaderboard</h3>
      {sortedPlayers.length === 0 ? (
        <p className="text-muted">No players yet.</p>
      ) : (
        <ul className="list-group">
          {sortedPlayers.map((p, i) => (
            <li key={p.id ?? i} className="list-group-item">
              {p.name} — Score: {p.score}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PlayersList;

