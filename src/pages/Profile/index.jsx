import { Container, Form, Avatar } from './styles';

import { FiArrowLeft, FiCamera ,FiUser, FiMail, FiLock } from 'react-icons/fi'

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { api } from '../../services/api';

import avatarPlaceholder from '../../assets/avatar_placeholder.svg';

import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

import { useAuth } from '../../hooks/auth';

export function Profile() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState();
  const [passwordNew, setPasswordNew] = useState();

  const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

  const navigate = useNavigate();

  function handleTurnBack() {
    navigate(-1);
  }  

  const [avatar, setAvatar] = useState(avatarURL);
  const [avatarFile, setAvatarFile] = useState(null);

  async function handleUpdate() {
    const updated = {
      name,
      email,
      old_password: passwordOld,
      password: passwordNew,
    }

    const userUpdated = Object.assign(user, updated);

    await updateProfile({ user: userUpdated, avatarFile })
  }

  function handleAvatarChange(event) {
    const file = event.target.files[0];
    
    setAvatarFile(file); 

    const imagePreview = URL.createObjectURL(file);

    setAvatar(imagePreview);
  }

  return( 
    <Container>
      <header>
        <button 
          type="button"
          onClick={handleTurnBack}
        >
            <FiArrowLeft />
        </button>
      </header>

      <Form>
        <Avatar>
          <img 
            src={avatar} 
            alt="Foto do usuário" 
          />
        
          <label htmlFor="avatar">
            <FiCamera />

            <input
              id="avatar"
              type="file"
              onChange={handleAvatarChange}
            />
          </label>
        </Avatar>

        <Input 
          icon={FiUser}
          placeholder="Nome"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Input 
          icon={FiMail}
          placeholder="E-mail"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Input 
          icon={FiLock}
          placeholder="Senha atual"
          type="password"
          onChange={e => setPasswordOld(e.target.value)}
        />

        <Input 
          icon={FiLock}
          placeholder="Nova senha"
          type="password"
          onChange={e => setPasswordNew(e.target.value)}
        />

        <Button 
          title="Salvar"
          onClick={handleUpdate}
        />

      </Form>
    </Container>
  );
}