import AuthProvider from '../components/AuthProvider'
import './globals.css'

export const metadata = {
title:'Ethara Ultimate AI',
description:'Premium AI Resume Platform'
}

export default function RootLayout({children}){
return(
<html>
<body><AuthProvider/>{children}</body>
</html>
)
}
