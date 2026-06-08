import { TEAM_MEMBERS, TEAM_NUMBER } from '../data/team';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <h2>Equipo {TEAM_NUMBER}</h2>
      <p>Miembros del equipo:</p>
      <ul>
        {TEAM_MEMBERS.map(member => (
          <li key={member.name}>{member.name}</li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
