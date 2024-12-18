import { useState } from "react";
import { AccountValidationDto } from "../../core/dtos/user/AccountValidationDto";
import { apiEndpoints, pagesUrl } from "../../core/appConstants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AccountValidation(): JSX.Element {
  const [activationCode, setActivationCode] = useState<AccountValidationDto>({
    activationCode: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setActivationCode({
      ...activationCode,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(apiEndpoints.USER_ACCOUNT_VALIDATION, activationCode);
      navigate(pagesUrl.MOA_DASHBOARD_PAGE);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Page de validation de compte</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="activationCode"
          value={activationCode.activationCode}
          onChange={handleChange}
        />
        <button type="submit">Activer le compte</button>
      </form>
    </div>
  );
}
