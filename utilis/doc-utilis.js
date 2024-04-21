export function getDocCategory (docs, category) {
return docs.filter(doc =>doc.category === category)
}

export function getDocAuthor (docs, author) {
  return docs.filter(doc =>encodeURI(doc.author) === author)
  }


  export function getDocTag (docs, tag) {
    return docs.filter(doc =>doc.tags.some(inputTag => inputTag === tag))
    }