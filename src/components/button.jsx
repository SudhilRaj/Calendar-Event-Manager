import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const ButtonContainer = ({
   variant = "primary",
   type="button",
   size = "sm",
   onClick,
   className,
   children
}) => {
   return (
      <Button
         variant={variant}
         type={type}
         size={size}
         onClick={onClick}
         className={className}
      >
         {children}
      </Button>
   )
}

ButtonContainer.propTypes = {
   variant: PropTypes.string,
   type: PropTypes.string,
   size: PropTypes.string,
   onClick: PropTypes.func,
   className: PropTypes.string,
   children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
   ])
};


export default ButtonContainer;