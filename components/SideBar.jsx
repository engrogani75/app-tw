"use client";

import { getDocAuthor, getDocCategory, getDocTag } from "@/utilis/doc-utilis";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SideBar({ docs }) {
  const pathName = usePathname();
  const [rootNodes, setRooNodes] = useState([]);
  const [nonRootNodes, setNonRootNodes] = useState({});

  useEffect(() => {
    let matchDocs = docs;

    if (pathName.includes("/tags")) {
      const tag = pathName.split("/")[2];
      matchDocs = getDocTag(docs, tag);
    } else if (pathName.includes("/author")) {
      const author = pathName.split("/")[2];
      matchDocs = getDocAuthor(docs, author);
    } else if (pathName.includes("/categories")) {
      const category = pathName.split("/")[2];
      matchDocs = getDocCategory(docs, category);
    }

    const root = matchDocs.filter((doc) => !doc.parent);

    const nonRoots = Object.groupBy(
      matchDocs.filter((doc) => doc.parent),
      ({ parent }) => parent
    );

    const nontRootKeys = Reflect.ownKeys(nonRoots);

    nontRootKeys.forEach((keys) => {
      const findRoots = root.find((root) => root.id === keys);
      if (!findRoots) {
        const findDocs = docs.find((doc) => doc.id === keys);
        root.push(findDocs);
      }
    });

    root.sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      }

      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    setRooNodes([...root]);
    setNonRootNodes({ ...nonRoots });

    console.log(nonRoots);
  }, [pathName]);

  return (
    <nav className="lg:block my-10">
      <ul>
        <div className="relative mt-3 pl-2">
          <div className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"></div>
          <div className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"></div>
          <div className="absolute left-2 h-6 w-px bg-emerald-500"></div>
          <ul role="list" className="border-l border-transparent">
            {rootNodes.map((rootNode) => (
              <li key={rootNode.id} className="relative">
                <Link
                  aria-current="page"
                  className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
                  href={`/docs/${rootNode.id}`}
                >
                  <span className="truncate">{rootNode.title}</span>
                </Link>
                {nonRootNodes[rootNode.id] && (
                  <ul role="list" className="border-l border-transparent">
                    {nonRootNodes[rootNode.id].map((subRoot) => (
                      <li key={subRoot.id}>
                        <Link
                          className="flex justify-between gap-2 py-1 pl-7 pr-3 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                          href={`/docs/${rootNode.id}/${subRoot.id}`}
                        >
                          <span className="truncate">{subRoot.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </ul>
    </nav>
  );
}
