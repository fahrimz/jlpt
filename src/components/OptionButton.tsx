interface Props {
  index: number;
  option: string;
  onClick: () => void;
}

export const OptionButton = ({ index, option, onClick }: Props) => {
  return <button onClick={onClick} className="flex flex-col gap-2">
    <span className="text-lg">{option}</span>
    <span className="text-[10px] text-gray-400">{index + 1}</span>
  </button>;
};
