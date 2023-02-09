import React, { useState } from "react";
import { SHA256, AES, enc } from "crypto-js";

function App() {
  const [hash, setHash] = useState("");
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [key, setKey] = useState("");

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();

    reader.onload = (event) => {
      const binary = new Uint8Array(event.target.result);
      const hashResult = SHA256(binary).toString();
      setHash(hashResult);
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  function handleEncrypt(text, algorithm) {
    switch (algorithm) {
      case "AES":
        const ciphertext = AES.encrypt(text, key).toString();
        setEncryptedText(ciphertext);
        break;
      case "RSA":
        // Code pour le cryptage en SHA256
        break;
      default:
        return "Algorithme non pris en charge";
    }
  }

  function handleDecrypt(algorithm) {
    switch (algorithm) {
      case "AES":
        const bytes = AES.decrypt(encryptedText, key);
        const decryptedText = bytes.toString(enc.Utf8);
        setDecryptedText(decryptedText);
        break;
      case "RSA":
        // Code pour le cryptage en SHA256
        break;
      default:
        return "Algorithme non pris en charge";
    }
  }

  const handleAlgorithmChange = (event) => {
    setSelectedAlgorithm(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        marginTop: "50px",
      }}
    >
      <div>
        {/* File hash */}
        <input type="file" onChange={handleFileSelect} />
        {file && (
          <div>
            <p>File name: {file.name}</p>
            <p>Hash: {hash}</p>
          </div>
        )}
        {/* TEXT */}
        <div
          style={{
            marginTop: "50px",
          }}
        >
          Sélectionnez l'algorithme de chiffrement :
          <select value={selectedAlgorithm} onChange={handleAlgorithmChange}>
            <option value="" disabled>
              Choisissez un algorithme
            </option>
            <option value="AES">AES</option>
            <option value="RSA">RSA</option>
          </select>
        </div>
        <div>
          Veuillez entrer votre texte à chiffrer :
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter text to encrypt"
          />
        </div>
        <div>
          Veuillez entrer votre key pour chiffrer le texte :
          <input
            type="text"
            placeholder="Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        <button onClick={handleEncrypt}>Chiffrer</button>
        <button onClick={handleDecrypt}>Déchiffrer</button>
        <p>Encrypted Text: {encryptedText}</p>
        <p>Decrypted Text: {decryptedText}</p>{" "}
      </div>
    </div>
  );
}

export default App;
