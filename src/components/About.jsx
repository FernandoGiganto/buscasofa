import { TEAM_MEMBERS, TEAM_NUMBER } from '../data/team';
import './About.css';

const About = () => {
  return (
    <main className="about-container">
      <p className="about-kicker">Equipo {TEAM_NUMBER}</p>
      <h1>Acerca de nosotros</h1>
      <div id="info">
        <p>Somos el equipo nº {TEAM_NUMBER}</p>
        <div className="team-grid">
          {TEAM_MEMBERS.map(member => (
            <article className="team-member" data-cy="team-member" key={member.name}>
              <h2>{member.name}</h2>
              <p>{member.contribution}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default About;