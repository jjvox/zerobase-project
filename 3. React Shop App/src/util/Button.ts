export const ButtonPurple = `
  background-color: hsl(262 80% 50%);
  border: 1px solid hsl(262 80% 50%);
  color: white;
  border-radius: 15px;
  padding: 14px 16px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  animation: button-pop 0.25s ease-out;
  text-transform: uppercase;
  &:active {
    transform: scale(0.9,0.9);
  }
`;
