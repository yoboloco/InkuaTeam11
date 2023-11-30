import { useState, useEffect } from "react";
import "../components/DonationForm.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

export const DonationForm = () => {
  const [amount, setAmount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(500);
  const [description, setDescription] = useState("");
  const [preferenceId, setPreferenceId] = useState(null);
  const [descriptionError, setDescriptionError] = useState(false);

  initMercadoPago("TEST-091dee59-6e52-42d3-bb7e-f01374d4e045");

  useEffect(() => {
    setDescriptionError(!description);
  }, [description]);

  const handleButtonClick = (amount) => {
    setAmount(amount);
    setTotalAmount(amount * 500);
  };

  const handleInputChange = (e) => {
    const inputValue = parseInt(e.target.value, 10) || 0;
    setAmount(inputValue);
    setTotalAmount(inputValue * 500);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const createPreference = async () => {
    try {
      const response = await axios.post("http://localhost:5000/create_preference", {
        description: description,
        price: totalAmount,
        quantity: 1,
      });
      const { id } = response.data;
      return id;
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuy = async () => {
    if (!description) {
      setDescriptionError(true);
      alert("Por favor, ingrese una descripción");
      return;
    }

    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <>
      <div className="contenedor">
        <h1>Me donas un Arbolito?</h1>
        <br />
        <p>Seleccione la cantidad a donar. 1 arbolito equivale a $500</p>
        <br />
      </div>
      <button type="button" className="donate-button" onClick={() => handleButtonClick(3)}>
        3🌱
      </button>
      <button type="button" className="donate-button" onClick={() => handleButtonClick(5)}>
        5🌱
      </button>
      <button type="button" className="donate-button" onClick={() => handleButtonClick(10)}>
        10🌱
      </button>

      <div>
        <br />
        <input
          type="number"
          className="donate-input"
          min="1"
          value={amount}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <br />
        <h2>Indicar a qué ONG desea donar</h2>
        <br />
      </div>
      <div>

            <form className="form-container">
            <input
          type="text"
          className={`donate-input ${descriptionError ? "error" : ""}`}
          placeholder="Descripción"
          value={description}
          onChange={handleDescriptionChange}
        />
          </form>
      </div>
      <div>
        <br />
        <p className="donate-amount">
          Usted enviara {amount} {amount === 1 ? "Arbolito $" : "Arbolitos $"}
          {totalAmount}
        </p>
      </div>
      <div>
        <button className="donate-link" onClick={handleBuy}>
          Donar
        </button>
        {preferenceId && <Wallet initialization={{ preferenceId }} />}
      </div>
    </>
  );
};

export default DonationForm;
