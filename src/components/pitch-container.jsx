import "../styles/home.css";
import "../styles/pitch.css";

export default function Pitch() {
  return (
    <div className="pitch-container">
      <div className="pitch-content">
        <h1 className="pitch-header">The Pitch</h1>
        <p className="pitch-text">
          On Monday, we all sat through 2 hours of pitches, around 100 pitches.
          Afterwards, when we broke out into the CUI and Secret areas, we
          realized that there was a huge issue. There was no centralized web-app
          where we could see the teams that were already formed and working on a
          project.
        </p>
        <p className="pitch-text">
          We were sitting in one of the cubicles, not wanting to talk to anyone,
          and wishing that there was an easy way to find the team that was
          tackling one of the interesting problems. We decided that somebody
          oughts to make a web-app where they can join a team that has a
          use-case and be able to find them easily.
        </p>
        <p>We made this app.</p>
        <p>...and so did another team.</p>
      </div>
    </div>
  );
}
