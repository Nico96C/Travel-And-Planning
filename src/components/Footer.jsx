import GithubIcon from "../svg/github";
import InstagramIcon from "../svg/instagram";
import LinkedInIcon from "../svg/linkedin";

export default function Footer() {
  return (
    <div className="Footer-Container">
      <a href="https://www.Github.com/Nico96C" target="_blank">
        <GithubIcon />
      </a>
      <a href="https://www.instagram.com/megabits96/" target="_blank">
        <InstagramIcon />
      </a>
      <a
        href="https://www.linkedin.com/in/nicolás-andres-cuello"
        target="_blank"
      >
        <LinkedInIcon />
      </a>
    </div>
  );
}
