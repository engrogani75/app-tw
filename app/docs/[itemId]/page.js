import ItemDisplay from "@/components/ItemDisplay";


export default function page({params: {itemId}}) {
  return (
    <div>
        <ItemDisplay id={itemId}></ItemDisplay>
    </div>
  )
}
