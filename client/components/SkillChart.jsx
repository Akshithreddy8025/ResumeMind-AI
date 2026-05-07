'use client'

import {

BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer

} from 'recharts'

export default function SkillChart({

skills

}){

if(!skills) return null

return(

<div className='card'>

<h2
style={{
marginBottom:'20px'
}}
>
Skill Analytics
</h2>

<div
style={{
width:'100%',
height:'400px'
}}
>

<ResponsiveContainer>

<BarChart data={skills}>

<XAxis dataKey='name'/>

<YAxis/>

<Tooltip/>

<Bar
dataKey='score'
radius={[10,10,0,0]}
/>

</BarChart>

</ResponsiveContainer>

</div>

</div>

)

}