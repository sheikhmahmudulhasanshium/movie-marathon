import React from "react";
import Link from "next/link";

const stringToList = (list: string, listName: string, tmdbId: string|null): JSX.Element => {
    if (!list || list === "N/A") {
        return <p>N/A</p>;
    }

    const updatedList = list.split(", ");
    const links = updatedList.map((item, index) => {
        // Convert spaces to hyphens for the URL path
        const urlFriendlyItem = item.toLowerCase().replace(/ /g, "-");

        return (
            <Link
                href={{
                    pathname: `/${listName.toLowerCase()}/${urlFriendlyItem}`,
                    query: { [listName.toLowerCase()]: `${urlFriendlyItem}`,tmdbId }
                }}
                key={index}
            >
                <span className="hover:underline">{item}</span>
            </Link>
        );
    });

    const concatenatedLinks = links.map((link, index) => (
        <React.Fragment key={index}>
            {link}
            {index < links.length - 1 && <span>, </span>}
        </React.Fragment>
    ));

    return <p>{concatenatedLinks}</p>;
};

export default stringToList;
