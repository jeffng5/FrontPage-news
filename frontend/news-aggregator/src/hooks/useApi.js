import React, {useState } from 'react'
import axios from 'axios'

const useApi = ({url}) => {

    const [apiData, setApiData] = useState([]
        )
    const getApi = async() => {
        try {
            const res = await axios.get(url)
            console.log(res)
            setApiData(res['data']['articles'])
            return res
        }
        catch (err){
            console.log(err)
        }
    }
    return apiData
}



export default useApi