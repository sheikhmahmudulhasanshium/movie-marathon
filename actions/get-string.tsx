import React from "react";
import Link from "next/link";

const useStringToList = (list: string, listName: string): JSX.Element => {
    // Check if the list is empty or contains "N/A"
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

    // Join the link elements with commas
    const concatenatedLinks = links.map((link, index) => (
        <React.Fragment key={index}>
            {link}
            {index < links.length - 1 && <span>, </span>}
        </React.Fragment>
    ));

    // Wrap the concatenated links inside a paragraph element
    return <p>{concatenatedLinks}</p>;
};

export default useStringToList;
