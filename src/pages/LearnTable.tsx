import { TWord } from "@data";

interface LearnTableProps {
    title: string;
    data: TWord[];
};

export const LearnTable = ({title, data}: LearnTableProps) => {
    return (
        <div className="flex flex-col gap-8">
            <h1>{title}</h1>
            <div className="grid grid-cols-5">
                {data.map((item, key) => (
                    <div key={key} className="border px-6 py-2 flex flex-col justify-center items-center">
                        <span>
                            {item.english}
                        </span>
                        {item.hiragana && 
                            <span>
                                {item.hiragana}
                            </span>
                        }
                        {item.katakana && 
                            <span>
                                {item.katakana}
                            </span>
                        }
                        {item.kanji && 
                            <span>
                                {item.kanji}
                            </span>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}
