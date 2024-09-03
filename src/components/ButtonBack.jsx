import { useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";

function ButtonBack() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleBackClick(e) {
    e.preventDefault();
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate(-1);
    }
  }
  return (
    <Button type={"back"} onClick={handleBackClick}>
      &larr; Back
    </Button>
  );
}

export default ButtonBack;
