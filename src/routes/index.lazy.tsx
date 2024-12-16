import { createLazyFileRoute, FileRoutesByPath, Link } from "@tanstack/react-router";
import clsx from "clsx";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

interface MenuCardProps {
  title: string;
  link: keyof FileRoutesByPath;
}

const MenuCard = ({ title, link }: MenuCardProps) => {
  return (
    <Link to={link}>
      <button className="size-48 text-lg">{title}</button>
    </Link>
  );
};

const menu: MenuCardProps[] = [
  {
    title: "JLPT N5 Vocabs Quiz",
    link: '/n5quiz',
  },
  {
    title: "JLPT N5 Vocabs Quiz (Bookmark only)",
    link: '/n5quizBookmark',
  },
  {
    title: "Scoreboard",
    link: '/scoreboard',
  }
];

function Index() {
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
