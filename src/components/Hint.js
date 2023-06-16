import { useEffect } from "react";
import { HintArea, HintCard } from "../theme/styledComponents"
import { useSelector } from "react-redux"
let hintArr=[];

const Hint = () => {
   console.log("hint")
  const {hintLeft, displayHintList}=useSelector((store)=>store.game)

  return (
   <HintArea>
{hintLeft || displayHintList.length!==0 ? displayHintList.map((hint, key)=>(
  <HintCard key={key}>{hint}</HintCard>
)) : <p>No available hints</p>}
   </HintArea>
  )
}

export default Hint