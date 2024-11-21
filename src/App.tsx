import clsx from "clsx";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Links, urlMatch } from "@utility";
import { QuizPage } from "./pages/QuizPage";

interface MenuCardProps {
  title: string;
  link: string;
}

const MenuCard = ({ title, link }: MenuCardProps) => {
  return (
    <a href={link}>
      <button className="size-48 text-lg">{title}</button>
    </a>
  );
};

const menu: MenuCardProps[] = [
  {
    title: "JLPT N5 Vocabs Quiz",
    link: Links.n5VocabQuiz,
  },
  {
    title: "JLPT N5 Vocabs Quiz (Bookmark only)",
    link: Links.n5VocabQuizBookmark,
  },
];

function App() {
  const currentUrl = window.location.href;

  if (urlMatch(currentUrl, 'n5VocabQuiz')) {
    return <QuizPage quizType="n5" preferredTotalQuestions={10} />;
  }

  if (urlMatch(currentUrl, 'n5VocabQuizBookmark')) {
    return <QuizPage quizType="n5Bookmark" preferredTotalQuestions={10} />;
  }

  return (
    <div className="flex flex-col gap-12">
      <h1>Learn Japanese</h1>
      <div
        className={clsx(
          "grid gap-4",
          menu.length >= 3 ? "grid-cols-3" : "grid-cols-2"
        )}
      >
        {menu.map((item, idx) => (
          <MenuCard key={idx} title={item.title} link={item.link} />
        ))}
      </div>
    </div>
  );
}

export default App;
