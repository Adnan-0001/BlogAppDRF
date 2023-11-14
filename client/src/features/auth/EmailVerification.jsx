import { useParams } from "react-router-dom";
import { useVerifyEmailMutation } from "./authApiSlice";
import { useEffect, useState } from "react";

const EmailVerification = () => {
  const { userId, token } = useParams();
  const [errorInfo, setErrorInfo] = useState(null);

  const [verifyEmail, { isLoading, isError, isSuccess }] =
    useVerifyEmailMutation();

  useEffect(() => {
    if (!userId || !token) return;

    const sendReq = async () => {
      try {
        await verifyEmail({ userId, token }).unwrap();
        setStatus(true);
      } catch (error) {
        console.log("Error in email verification", error);
        setErrorInfo(error?.data);
      }
    };
    sendReq();
  }, [userId, token]);

  let content;
  if (isLoading) {
    content = <h1>Loading ...</h1>;
  } else if (isSuccess) {
    content = <p>Account has been verified!</p>;
  } else if (isError) {
    content = <p>{errorInfo}</p>;
  }

  return content;
};
export default EmailVerification;
