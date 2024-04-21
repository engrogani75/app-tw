import ItemDisplay from "@/components/ItemDisplay";
import { getDocuments } from "@/lib/doc";
import { getDocCategory } from "@/utilis/doc-utilis";

const CategoryPage = ({ params: { name } }) => {
  const docs = getDocuments();

  const matchDocs = getDocCategory(docs, name);

  return <ItemDisplay id={matchDocs[0].id}></ItemDisplay>;
};

export default CategoryPage;
