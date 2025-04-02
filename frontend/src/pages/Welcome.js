import Header from '../components/header';

function Welcome() {
  return (
    <div className="background welcome d-flex flex-column align-items-center justify-content-center">
      <Header />
      <div className="form-group mt-5">
        <h1 className="mb-4" id="header">
          Welcome!
        </h1>
        <span className="highlight" id="message">
          You have successfully logged in.
        </span>
        This page is currently under construction.
      </div>
    </div>
  );
}
export default Welcome;
