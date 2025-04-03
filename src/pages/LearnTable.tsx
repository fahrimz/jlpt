import { TWord } from "@data";
import clsx from "clsx";

interface LearnTableProps {
    title: string;
    data: TWord[];
    cols: number;
};

export const LearnTable = ({title, data, cols}: LearnTableProps) => {
    const gridCols = "grid-cols-".concat(cols.toString());
    return (
        <div className="flex flex-col gap-8">
            <h1>{title}</h1>
            <div className={clsx("grid", gridCols)}>
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
