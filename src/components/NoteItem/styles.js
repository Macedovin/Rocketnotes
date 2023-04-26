import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  background-color: ${({ theme , isNew }) => isNew ? "transparent" : theme.COLORS.BACKGROUND_900};

  color: ${({ theme }) => theme.COLORS.GRAY_300};

  border: ${({ theme , isNew }) => isNew ? `1px dashed ${theme.COLORS.GRAY_300}` : "none"};
  border-radius: 1rem;

  margin-bottom: 0.8rem;
  padding-right: 1.6rem;

  > button {
    border: none;
    background: none;
  }

  .button-delete {
    color: ${({ theme }) => theme.COLORS.RED};
  }

  .button-add {
    color: ${({ theme }) => theme.COLORS.ORANGE};
  }

  > input {
    height: 5.6rem;
    width: 100%;
  
    padding: 1.2rem;
    margin-right: 1.6rem;
    
    background-color: transparent;    

    color: ${({ theme }) => theme.COLORS.WHITE};

    border: none;

    &::placeholder {
      color: ${({ theme }) => theme.COLORS.GRAY_300};
    }

    &:invalid {

      border: 3px solid red;
      border-radius: 1rem 0 0 1rem;
    }
  } 



`;