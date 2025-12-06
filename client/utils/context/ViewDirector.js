import PropTypes from 'prop-types';
import NavBar from '../../components/navBar';

function ViewDirectorBasedOnUserAuthStatus({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  children: PropTypes.node.isRequired,
};
