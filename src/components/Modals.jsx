import React from 'react';

const Modals = ({ activeModal, onCloseModal }) => {
  const handleOverlayClick = (e) => {
    // Close modal if the overlay (the modal container itself) is clicked
    if (e.target.id === activeModal) {
      onCloseModal();
    }
  };

  return (
    <>
      {/* Login Modal */}
      <div
        className={`modal ${activeModal === 'login-modal' ? 'active' : ''}`}
        id="login-modal"
        onClick={handleOverlayClick}
      >
        <div className="modal-content">
          <span className="modal-close" onClick={onCloseModal}>&times;</span>
          <h2 className="modal-title">Login to Your Account</h2>
          <form className="modal-form">
            <div className="form-group">
              <label htmlFor="login-email">Email</label>
              <input type="email" id="login-email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <input type="password" id="login-password" placeholder="Enter your password" required />
            </div>
            <div className="form-footer">
              <a href="#" className="form-link">Forgot password?</a>
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>

      {/* Signup Modal */}
      <div
        className={`modal ${activeModal === 'signup-modal' ? 'active' : ''}`}
        id="signup-modal"
        onClick={handleOverlayClick}
      >
        <div className="modal-content">
          <span className="modal-close" onClick={onCloseModal}>&times;</span>
          <h2 className="modal-title">Create New Account</h2>
          <form className="modal-form">
            <div className="form-group">
              <label htmlFor="signup-email">Email</label>
              <input type="email" id="signup-email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="signup-password">Password</label>
              <input type="password" id="signup-password" placeholder="Create a password" required />
            </div>
            <div className="form-group">
              <label htmlFor="signup-confirm">Confirm Password</label>
              <input type="password" id="signup-confirm" placeholder="Confirm your password" required />
            </div>
            <div className="form-footer">
              <a href="#" className="form-link">Already have an account?</a>
              <button type="submit" className="btn btn-primary">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modals;