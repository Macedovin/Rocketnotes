import { Container, Form } from './styles';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Section } from '../../components/Section';
import { NoteItem } from '../../components/NoteItem';
import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';

import { api } from '../../services/api';

import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

export function NewNote() {

  const [title, setTitle] = useState("");
  
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleTurnBack() {
    navigate(-1);
  }  

  function handleAddLink() {

    if(newLink.match("http(s?)(:\/\/).*")) {

      setLinks(prevState => [...prevState, newLink]);
  
      setNewLink("");

    } else {

      return alert("Preencha corretamente o campo de links");
    }
  }
  

  function handleRemoveLink(deleted) {
    setLinks(prevState => prevState.filter(link => link !== deleted));
  }

  function handleAddTag() {
    setTags(prevState => [...prevState, newTag]);

    setNewTag("");
  }

  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag !== deleted));
  }

  async function handleNewNote() {
    if(!title) {
      return alert("Digite o título da nota.");
    }


    if (newLink) {
      return alert("Você deixou uma link no campo para adicionar, mas não clicou em ADICIONAR. Clique para adicionar ou deixe o campo vazio.");
    }

    if (newTag) {
      return alert("Você deixou uma tag no campo para adicionar, mas não clicou em ADICIONAR. Clique para adicionar ou deixe o campo vazio.");
    }

    try {
      await api.post("/notes", {
        title,
        description,
        links,
        tags
      })
  
      alert("Nota cadastrada com sucesso!")
  
      navigate(-1);
    } catch(error) {
      if(error.response) {
        alert(error.response.data.message)
      } else {
        alert("Não foi possível cadastrar a nota.")
      }
    }
  }

  return(
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>          
            <ButtonText 
              title="voltar"
              onClick={handleTurnBack}
            />
          </header>

          <Input 
            placeholder="Título"
            onChange={e => setTitle(e.target.value)}
          />
          
          <Textarea 
            placeholder="Observações" 
            onChange={e => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {
              links.map((link, index) => (
                <NoteItem 
                  key={String(index)}
                  value={link}
                  onClick={() => handleRemoveLink(link)}
                />
              ))
            }
            <NoteItem 
              isNew 
              placeholder="Novo link - https://exemplo.com"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onClick={handleAddLink}
              pattern={"http(s?)(:\/\/).*"}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {
                tags.map((tag, index) => (
                  <NoteItem 
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTag(tag)}
                  />
                ))
              }

              <NoteItem 
                isNew 
                placeholder="Novo marcador"
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button 
            title="Salvar"
            onClick={handleNewNote}
          />
        </Form>

      </main>
    </Container>
  )
}