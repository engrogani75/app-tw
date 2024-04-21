import { getDocumentContent } from "@/lib/doc";
import Link from "next/link";
import Tag from "./Tag";

const ItemDisplay = async ({ id }) => {
  const allDocs = await getDocumentContent(id);
  console.log(allDocs);
  return (
    <article className="prose dark:prose-invert">
      <h1>{allDocs.title}</h1>
      <div>
        <span>Published On: {allDocs.date}</span> by{" "}
        <Link href={`/author/${allDocs.author}`}>{allDocs.author}</Link> under
        the{" "}
        <Link href={`/categories/${allDocs.category}`}>{allDocs.category}</Link>{" "}
        category.
      </div>
      <div>
        {allDocs.tags && allDocs.tags.map((tag) => <Tag key={tag} tag={tag} />)}
      </div>

      <div
        className="lead"
        dangerouslySetInnerHTML={{ __html: allDocs.contentHtml }}
      />
    </article>
  );
};

export default ItemDisplay;
