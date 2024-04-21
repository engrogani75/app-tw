import ItemDisplay from "@/components/ItemDisplay";
import { getDocuments } from "@/lib/doc";
import { getDocTag } from "@/utilis/doc-utilis";

const TagPage = ({ params: { name } }) => {
  const docs = getDocuments();

  const matchDocs = getDocTag(docs, name);

  return <ItemDisplay id={matchDocs[0].id}></ItemDisplay>;
};

export default TagPage;
