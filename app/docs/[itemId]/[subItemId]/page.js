import ItemDisplay from "@/components/ItemDisplay";


export default function page({params: {subItemId}}) {
 
  return (
    <div>
        <ItemDisplay id={subItemId}></ItemDisplay>
    </div>
  )
}
