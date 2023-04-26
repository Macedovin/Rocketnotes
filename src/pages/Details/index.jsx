import { Container, Links, Content } from './styles';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Section } from '../../components/Section';
import { ButtonText } from '../../components/ButtonText';
import { Tag } from '../../components/Tag';

import { useParams, useNavigate } from 'react-router-dom';

import { useState, useEffect  } from 'react';

import { api } from '../../services/api';

export function Details() {

  const [data, setData] = useState(null);
  const [dataLinks, setDataLinks] = useState([]);

  const params = useParams();

  const navigate = useNavigate();

  function handleTurnBack() {
    navigate(-1);
  }  

  async function handleRemoveNote() {
    const confirm = window.confirm("Deseja realmente remover a nota?")

    if(confirm) {
      await api.delete(`/notes/${params.id}`)
      navigate(-1);
    }
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`);
      
      setData(response.data);

    }

    fetchNote();
  },[]);

  return(
    <Container>
      <Header />

      {
        
        data &&
        <main>
          <Content>
            <ButtonText 
              title="Excluir nota" 
              onClick={handleRemoveNote}
            />

            <h1>
              {data.title}
            </h1>

            <p>
              {data.description}
            </p>

            {

              data.links &&

              <Section title="Links úteis" >
                <Links>

                  {
                    data.links.map(link => (
                      
                      <li key={String(link.id)}>
                        <a href={link.url} target="_blanket">
                          {link.url}
                        </a>
                      </li>

                    ))
                  }
                  

                </Links>
              </Section>
              
            }

            {
              data.tags &&

              <Section title="Marcadores">
                <div className="tags">

                  {
                    data.tags.map(tag => (

                      <Tag 
                        key={String(tag.id)}
                        title={tag.name} 
                      />
                    ))
                  }

                </div>
              </Section>

            }

            <Button 
              title="Voltar" 
              onClick={handleTurnBack}
            />
          </Content>
        </main>
      }

    </Container>
  )
  
}