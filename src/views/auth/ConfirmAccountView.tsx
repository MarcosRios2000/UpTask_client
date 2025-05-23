import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { ConfirmToken } from "@/types/index";
import { confirmAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken['token']>('');
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      setTimeout(() => {
        navigate('/auth/login');
      }, 1000); 
    }
  });

  const handleChange = (token: ConfirmToken['token']) => {
    setToken(token);
  };

  const handleComplete = (token: ConfirmToken['token']) => {
    mutate({ token: token.trim() });
  };

  return (
    <>
      <h1 className="text-5xl font-black text-white">Confirm Your Account</h1>
      <p className="text-2xl font-light text-white mt-5">
        Enter the code you received{' '}
        <span className="text-fuchsia-500 font-bold">via email</span>
      </p>
      <form className="space-y-8 p-10 bg-white mt-10">
        <label className="font-normal text-2xl text-center block">6-digit Code</label>
        <div className="flex justify-center gap-5">
          <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
            {[...Array(6)].map((_, i) => (
              <PinInputField
                key={i}
                className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"
              />
            ))}
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/request-code"
          className="text-center text-gray-300 font-normal"
        >
          Request a new code
        </Link>
      </nav>
    </>
  );
}
