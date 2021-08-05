import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';

import avatar from '../../assets/avatar.png';
import { FiSettings, FiUpload } from 'react-icons/fi';
import Title from '../../components/Title';
import Header from '../../components/Header';
import firebase from '../../services/firebaseConnection';
import './profile.css';

export default function Profile() {
    const { user, SignOut, setUser, storageUser } = useContext(AuthContext);

    const [nome, setNome] = useState(user.nome);
    const [email, setEmail] = useState(user.email);
    const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
    const [imgAvatar, setImgAvatar] = useState(null);

    //faz o preview da foto em tela mas nao salva no bd
    function handleFile(e) {
        if(e.target.files[0]) {
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png') {
                setImgAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            }
            else {
                alert('Envie uma imagem do tipo png ou jpeg');
                setImgAvatar(null);
                return null;
            }
        }
    }

    //salva a foto no storage do bd
    async function handleUpload() {
        const currentUid = user.uid;

        await firebase.storage()
        .ref(`images/${currentUid}/${imgAvatar.name}`)
        .put(imgAvatar)
        .then(async () => {
            console.log('foto enviada com sucesso');

            await firebase.storage()
            .ref(`images/${currentUid}`)
            .child(imgAvatar.name).getDownloadURL()
            .then(async (url) => {
                let urlFoto = url;

                await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .update({
                    avatarUrl: urlFoto,
                    nome: nome
                })
                .then(() => {
                    let data = {
                        ...user,
                        avatarUrl: urlFoto,
                        nome: nome
                    };
                    setUser(data);
                    storageUser(data);
                })
            })
        })
    }

    async function handleSave(e) {
        e.preventDefault();
        
        if(imgAvatar === null && nome !== '') {
            await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .update({
                    nome: nome
                })
                .then(() => {
                    let data = {
                        ...user,
                        nome: nome
                    };
                    setUser(data);
                    storageUser(data);
                })
                .catch((error) => {
                    console.log(`Erro ao alterar perfil: ${error}`);
                })
        }
        else if(nome !== '' && imgAvatar !== null) {
            handleUpload();
        }
    }

    return(
        <div>
            <Header />

            <div className="content">
                <Title name="Meu perfil">
                    <FiSettings color="#000" size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSave}>
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#fff" size={25} />
                            </span>

                            <input type="file" accept="image/*" onChange={handleFile} /><br />
                            { avatarUrl === null || avatarUrl === undefined ? 
                                <img src={avatar} width="250" height="250" alt="Foto de perfil"  />
                                :
                                <img src={avatarUrl} width="250" height="250" alt="Foto de perfil"  />
                            }
                        </label>

                        <label>Nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

                        <label>Email</label>
                        <input type="text" value={email} disabled={true} />

                        <button type="submit">Salvar</button>
                    </form>
                </div>

                <div className="container">
                    <button className="logout-btn" onClick={() => SignOut()}>
                        Sair
                    </button>
                </div>
            </div>
        </div>
    )
}