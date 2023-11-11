import { forwardRef, useEffect, useState } from "react"
import { InputValidatorProps, SelectValidatorProps, TextareaValidatorProps, } from "./validators";
import { Container } from "./styles";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

export const InputValidator = forwardRef<HTMLInputElement, InputValidatorProps>(

  ({ label, id, type, error, placeholder, ...rest }, ref) => {

    const [useType, setType] = useState<React.HTMLInputTypeAttribute | undefined>("text")
    useEffect(() => {

      setType(type)
    }, [])

    return (
      <Container>
        <label htmlFor={id}>{label}</label>
        <input
          type={useType}
          id={id}
          ref={ref}
          placeholder={placeholder}
          {...rest}
        />
        {label == "Senha:" &&
          <button onClick={() => setType(useType === "password" ? "text" : "password")} >
            {useType === "password" ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        }
        <p> {error && error}</p>
      </Container >
    )
  }
);

export const SelectValidator = forwardRef<HTMLSelectElement, SelectValidatorProps>(
  ({ label, id, options, error, value, ...rest }, ref) => {
    return (
      <Container>
        <label htmlFor={id}>{label}</label>
        <select id={id} ref={ref} {...rest}>
          {options.map((option, index) => (
            <option key={option} value={value ? value[index] : option}>
              {option}
            </option>
          ))}
        </select>
        <p> {error && error}</p>
      </Container>
    )
  })

export const TextareaValidator = forwardRef<
  HTMLTextAreaElement,
  TextareaValidatorProps
>(({ label, id, error, ...rest }, ref) => {
  return (
    <Container>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} ref={ref} {...rest} />
      <p> {error && error}</p>
    </Container>
  );
});
