import { IcArrowBack } from "@assets";
import { useRouter } from "@tanstack/react-router";

interface HeaderProps {
    title: string;
}
export const Header = ({ title }: HeaderProps) => {
    const { history } = useRouter();
    return (
        <div className="bg-white p-4 mb-4 flex flex-row justify-between items-center w-full">
            <IcArrowBack className="size-5 cursor-pointer" onClick={() => {history.go(-1)}} />
            <span className="text-lg font-semibold text-black">{title}</span>
        </div>
    )
}

