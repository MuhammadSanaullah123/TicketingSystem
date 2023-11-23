import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { notifyError, notifySuccess } from "../utils/toast";

const useLoginSubmit = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ name, email, verifyEmail, password, role }) => {
    setLoading(true);
    setLoading(false);
    Cookies.set("adminInfo", JSON.stringify(""));
    history.replace("/operator/dashboard");
  };
  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    loading,
  };
};

export default useLoginSubmit;
