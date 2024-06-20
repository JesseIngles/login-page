import { useEffect, useState } from "react";
import "./LoginPage.css";

let baseurl:string = "http://localhost:5251";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const loginUser = async () => {
    try {
      const response = await fetch(baseurl + '/Funcionario/v1/LogarFuncionario', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: username,
          password: password
        })
      });
  
      if (!response.ok) {
        throw new Error("Erro ao fazer login");
      }
  
      const data = await response.json();
  
      // Verifica se a resposta possui a propriedade resposta e se ela é uma string
      if (data && typeof data.resposta === 'string') {
        setAuthToken(data.resposta);
        console.log("hello,");
      } else {
        throw new Error("Token de autenticação não encontrado na resposta");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };
  function setAuthToken(token:string):void{
    localStorage.setItem("token", token);
  }

  const EntrarClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Evita o comportamento padrão do botão
    loginUser();
    alert(`Username: ${localStorage.getItem("token")}`);
  };

  return (
    <>
      <div id="form-container">
        <img id="logo" src="https://cdn-icons-png.flaticon.com/512/5102/5102258.png" alt="Login Icon" />
        <input className="usernamefield" placeholder="Username" name="username" value={username} onChange={handleUsernameChange}/>
        <input className="usernamefield" placeholder="Password" type="password" name="password" value={password} onChange={handlePasswordChange}/>
        <button title="Entrar" onClick={EntrarClicked}>Entrar</button>
        <div className="esqueceu">
          <h5>Esqueceu-se da sua senha?</h5>
          <h5>Recuperar</h5>
        </div>
      </div>
    </>
  );
}

export default LoginPage;