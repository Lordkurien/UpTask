import PropTypes from "prop-types";

const Alert = ({ alert }) => {
  return (
    <div className={`${alert.error ? "from-red-400 to-red-600" : "from-sky-400 to-sky-600"} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold my-10 text-sm `}>
      {alert.msg}
    </div>
  );
};

Alert.propTypes = {
    alert: PropTypes.shape({
    error: PropTypes.bool.isRequired,
    msg: PropTypes.string.isRequired,
  }).isRequired,
};

export default Alert;
