import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Lexend", sans-serif;
  margin-bottom: 10px;
  gap: 10px;
  position: relative;
  button {
    position: absolute;
    right: 10px;
    bottom: 40%;
  }
  input,
  textarea,
  option,
  select {
    border-radius: 0.25rem;
    border: 1.5px solid var(--grey-scale-grey-7, #e9ecef);
    display: flex;
    height: 3rem;
    width: 100%;
    padding: 0rem 1rem;
    align-items: center;
    gap: 0.625rem;
  }

  p {
    height: 1rem;
    font-size: 0.8rem;
    color: var(--random2);
    font-weight: bold;
  }
  label {
    font-weight: bold;
    font-size: 0.9rem;
  }
`;
