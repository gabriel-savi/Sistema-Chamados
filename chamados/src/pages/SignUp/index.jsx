import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';
import logo from '../../assets/logo.png';

function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { SignUp, loadingAuth } = useContext(AuthContext);

  function handleSubmit(event) {
    event.preventDefault();
    
    if(nome !== '' && email !== '' && password !== '') {
      SignUp(email, password, nome);
    }
  }

  return(
    <div className='container-center'>
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do Sistema" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Criar uma conta</h1>
          <input type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input type="text" 
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{loadingAuth ? 'Carregando...' : 'Criar'}</button>
        </form>

        <Link to="/">Já tenho uma conta</Link>
      </div>
    </div>
  )
}

export default SignUp;  