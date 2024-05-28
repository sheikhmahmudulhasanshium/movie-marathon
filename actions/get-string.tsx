// useStringToList.tsx
import React from "react";
import Link from "next/link";

const stringToList = (list: string, listName: string): JSX.Element => {
    if (!list || list === "N/A") {
        return <p>N/A</p>;
    }

    const updatedList = list.split(", ");
    const links = updatedList.map((item, index) => (
        <Link
            href={{
                pathname: `/${listName.toLowerCase()}/${item.toLowerCase()}`,
                query: { [listName.toLowerCase()]: item }
            }}
            key={index}
        >
            <span className="hover:underline">{item}</span>
        </Link>
    ));

    const concatenatedLinks = links.map((link, index) => (
        <React.Fragment key={index}>
            {link}
            {index < links.length - 1 && <span>, </span>}
        </React.Fragment>
    ));

    return <p>{concatenatedLinks}</p>;
};

export default stringToList;
