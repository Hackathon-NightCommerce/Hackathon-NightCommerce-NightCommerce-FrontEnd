import {styled} from 'styled-components';


export const StyledFormForgoutPassword = styled.form`

    max-width: 550px;
    background: var(--whiteFixed);
    display: flex;
    margin: auto;
    padding: 25px;
    border-radius: 15px;

    .buttonsForgoutPassword{
      display: flex;
      justify-content: flex-end;
      
      .buttonVoltar{
        border-radius: 0.25rem;
        border: 1.5px solid var(--grey-scale-grey-4, #adb5bd);
        display: flex;
        width: 100px;
        height: 3rem;
        padding: 0.75rem 1.75rem;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        color: var(--grey0);
        font-weight: bold;
        transition: box-shadow 0.3s ease-in-out;
        margin-right:20px;
      }

      .buttonSubmit{
        background-color: var(--brand1);
        display: flex;
        max-width: 90%;
        width: 100px;
        height: 3rem;
        padding: 0.75rem 1.75rem;
        justify-content: center;
        color: var(--whiteFixed);
        font-weight: bold;
        flex-shrink: 0;
        border-radius: 0.25rem;
        transition: box-shadow 0.3s ease-in-out;
      }

    }
`