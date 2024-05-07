import GoogleLogin from "react-google-login";

export default function NavBar() {
  return (
    <div className="NavContainer">
      <div className="Logo">
        <h4>Travel & Planning ✈</h4>
      </div>
      <div className="Buttons">
        <button>FAQ</button>
        <GoogleLogin buttonText="Iniciar sesión con Google" className="google-login-button" cookiePolicy={'single_host_origin'}>
        </GoogleLogin>
      </div>
    </div>
  );
}
