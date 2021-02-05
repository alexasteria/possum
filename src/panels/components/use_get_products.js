import React, {useState, useEffect, useMemo} from "react"
import {useSelector} from "react-redux";
const useGetProducts = () => {
    const categories = useSelector(state=>state.categories)
    const targetCat = useSelector(state=>state.targetCategory)
    const [products, setProducts] = useState(null);
    const [fil, setFil] = useState([]);
    const getFil = useMemo(() => {
        if (fil.length === 0) return categories.filter(cat => cat.parent_id === targetCat.id).map(item => String(item.id)).join(",") + "," + targetCat.id;
        return fil.join(",")
    }, [fil, targetCat])
    useEffect(()=>{
        const get_items = async() => {
            const response = await fetch("https://zoomagasin.ru/api/api.php?route=list&section_ids="+ getFil)
            const res = await response.json()
            if (!res || !res.items) return;
            if (typeof res !== 'undefined') {
                setProducts(res.items)
            }
        }
        get_items()
    },[fil])
    if (!categories || !targetCat) return;

    const changeFilter = (id) => {
        let arr = [...fil];
        const index = arr.indexOf(id);
        if (index > -1) {
            arr.splice(index, 1);
        } else {
            arr.push(id)
        }
        setFil(arr)
    }
    return {
        products,
        targetCat,
        categories,
        changeFilter,
        fil
    }
}
export {useGetProducts}