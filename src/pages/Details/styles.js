import styled from 'styled-components';

export const Container = styled.div`

  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-rows: 10.5rem auto;
  grid-template-areas: 
    "header"
    "content";

  > main {
    grid-area: content;

    overflow-y: scroll;

    padding: 6.4rem 0;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const Links = styled.ul`
  list-style: none;

  > li {
    margin-top: 1.2rem;

    a {
      color: ${({ theme }) => theme.COLORS.WHITE};
    }
  }
`;


export const Content = styled.div`
  max-width: 55rem;

  margin: 0 auto;

  display: flex;
  flex-direction: column;

  > button:first-child {
    align-self: end;

    color: ${({ theme }) => theme.COLORS.ORANGE};
  }

  > h1 {
    font-size: 3.6rem;
    font-weight: 500;

    padding-top: 6.4rem;
  }

  > p {
    font-size: 1.6rem;
    text-align: justify;

    margin-top: 1.6rem;
  }

/*   > button:last-child {
    margin-top: 12.5rem;
  } */
`;