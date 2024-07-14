import React from "react";
import Link from "next/link";

interface StringToListProps {
  list: string;
  listName: string;
  tmdbId?: string | null;
}

const stringToList: React.FC<StringToListProps> = ({ list, listName, tmdbId }) => {
  if (!list || list === "N/A") {
    return <p>N/A</p>;
  }

  const updatedList = list.split(", ");
  const links = updatedList.map((item: string, index: number) => {
    const urlFriendlyItem = item.toLowerCase().replace(/ /g, "-");
    const query = { [listName.toLowerCase()]: item };

    if (tmdbId) {
      query.tmdbId = tmdbId;
    }

    return (
      <Link
        href={{
          pathname: `/${listName.toLowerCase()}/${urlFriendlyItem}`,
          query,
        }}
        key={index}
      >
        <span className="hover:underline">{item}</span>
      </Link>
    );
  });

  return (
    <p>
      {links.map((link, index) => (
        <React.Fragment key={index}>
          {link}
          {index < links.length - 1 && <span>, </span>}
        </React.Fragment>
      ))}
    </p>
  );
};

export default stringToList;
