type Props = {
  option: string;
  onClick: () => void;
};

export const OptionButton = ({ option, onClick }: Props) => {
  return <button onClick={onClick}>{option}</button>;
};
