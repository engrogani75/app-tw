import fs from "fs";
import matter from "gray-matter";
import path from "path"
import { remark } from "remark";
import html from "remark-html";

const postDirectory = path.join(process.cwd(), "docs");

export function getDocuments(){
  console.log(postDirectory);
  const fileName = fs.readdirSync(postDirectory)
  console.log(fileName, "This is file name");

  const allDocs = fileName.map(fileName => {
    const id = fileName.replace(".md", "")
    const fullPath = path.join(postDirectory, fileName)
    const fileContents = fs.readFileSync (fullPath, "utf8")
    const matterRslt = matter (fileContents)
 

    return {
      id,
      ...matterRslt.data
    }
  })


 return allDocs.sort((a, b) =>{
  if (a.order < b.order) {
    return -1;
  }

  if (a.order > b.order) {
    return 1;
  }
  return 0;
 });

}


export async function getDocumentContent(id){
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...matterResult.data,
}

 }