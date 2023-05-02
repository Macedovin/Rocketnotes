import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;

  display: grid;
  height: 100vh;
  width: 100%;
  place-content: center;

  background-color: rgba(35, 33, 41, 0.6);

  > svg {
    color: ${({ theme }) => theme.COLORS.WHITE};

    animation: upDown 1s ease-in-out infinite;
  }

  /* ----------------- ANIMATIONS -------------*/

  @keyframes upDown {

    0%, 100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-35%);
    }
  }

`;