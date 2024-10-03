import React, { useState } from 'react'

const useAuth = () => {
    // const [address, setAddress] = useState("39G4S57hEMsbD1npzi22heiEvjAHnnTG3ixciDHozcNj")
    const [address, setAddress] = useState("")
    return ({
        address,
        setAddress
    })
}

export default useAuth