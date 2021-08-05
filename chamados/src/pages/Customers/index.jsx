import { useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';

import Header from '../../components/Header'
import Title from '../../components/Title'
import firebase from '../../services/firebaseConnection';
import './customers.css'

export default function Customers() {
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    async function handleAdd(e) {
        e.preventDefault();
        
        if(nomeFantasia !== '' && cnpj !== '' && endereco !== '') {
            await firebase.firestore()
            .collection('customers')
            .add({
                nomeFantasia: nomeFantasia,
                cnpj: cnpj,
                endereco: endereco
            })
            .then(() => {
                setNomeFantasia('');
                setCnpj('');
                setEndereco('');
                toast.info('Cliente cadastrada com sucesso!');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Erro ao cadastrar cliente!');
            })
        }
        else {
            toast.error('Preencha todos os campos corretamente!');
        }
    }

    return(
        <div>
            <Header />
            
            <div className="content">
                <Title name="Clientes">
                    <FiUser size={25} />
                </Title>
            </div>

            <div className="content">
                <form className="form-profile customers" onSubmit={handleAdd}>
                    <label>Nome Fantasia</label>
                    <input type="text"
                           value={nomeFantasia}
                           placeholder="Nome da Empresa"
                           onChange={ 
                                      (e) => 
                                        setNomeFantasia(e.target.value)
                                    }
                           maxLength={50}
                    />

                    <label>CNPJ</label>
                    <input type="text"
                           value={cnpj}
                           placeholder="CNPJ"
                           onChange={ 
                                      (e) => 
                                        setCnpj(e.target.value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"))
                                    }
                           maxLength={18}
                    />

                    <label>Endereço</label>
                    <input type="text"
                           value={endereco}
                           placeholder="Endereço da empresa"
                           onChange={ 
                                      (e) => 
                                        setEndereco(e.target.value)
                                    }
                           maxLength={50}
                    />

                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}