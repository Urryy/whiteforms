import Reacr, { useEffect, useState } from 'react'

type Props = {
    text:string;
}

export function Text({text}:Props){
    const [style,setStyle] = useState<'bold'|'italic'|'underline'|undefined>(undefined);
    const [show,setShow] = useState(false);

    const [promis,setPromis] = useState<{fullfiled?:boolean,pending?:boolean,error?:boolean,value?:any}>({});

    useEffect(()=>{
        setPromis({pending:true});
        fetch('http://google.com').then((res)=>res.text()).then((value)=>setPromis({fullfiled:true,value})).catch(()=>setPromis({error:true}))
    },[])

    function handleTextClick(){
        setShow(prev=>!prev)
    }

    return promis?.pending? <div></div>:<div style={{display:'flex', flexDirection:'column'}}>
        <span onClick={handleTextClick} style={{textDecoration:style}}>{text}</span>
        {show&& <div style={{display:'flex', flexDirection:'row', gap:'8px'}}>
            <button onClick={()=>setStyle('italic')}>I</button>
            <button onClick={()=>setStyle('bold')}>B</button>
            <button onClick={()=>setStyle('underline')}>U</button>
        </div>}
    </div>
}