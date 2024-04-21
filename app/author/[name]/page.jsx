import ItemDisplay from "@/components/ItemDisplay";
import { getDocuments } from "@/lib/doc";
import { getDocAuthor } from "@/utilis/doc-utilis";

const AuthorPage = ({ params: { name } }) => {
  const docs = getDocuments();

  const matchDocs = getDocAuthor(docs, name);

  return <ItemDisplay id={matchDocs[0].id}></ItemDisplay>;
};

export default AuthorPage;
