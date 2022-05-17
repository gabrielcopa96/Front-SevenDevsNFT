import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getTransactions } from '../../../redux/actions'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js"
import {Line} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)


const ChartContainer = styled.div`
    height: 95%;
    width: 100%;
`
const months = {
    0:"enero",
    1:"febrero",
    2:"marzo",
    3:"abril",
    4:"mayo",
    5:"junio",
    6:"julio",
    7:"agosto",
    8:"septiembre",
    9:"octubre",
    10:"noviembre",
    11:"diciembre"
}

export default function LineChartSold() {
    const transactions = useSelector(state=> state.transactions)
    
    const dispatch = useDispatch()

    const instantCallback = useCallback(dispatch, [dispatch]);

    useEffect(() => {
        instantCallback(getTransactions())
    }, [instantCallback])

    console.log(transactions)
    const uniqueMonths = [...new Set(transactions?.map(t => new Date(t.create_date).getMonth()))]
    const sortUniqueMonths  = uniqueMonths.sort()
    console.log(sortUniqueMonths, "meses de mayor a menor")
    const uniqueMonthsConvertedToMonthName = sortUniqueMonths?.map( m=> months[m])    
    
    const quantityPerSaleMarch = []
    const quantityPerSaleApril = []
    const quantityPerSaleMay = []
    const calculateQuantity = transactions?.forEach(t =>{
        if((new Date(t.create_date).getMonth()) === 2){
            quantityPerSaleMarch.push(t.amount)
        } 
        if((new Date(t.create_date).getMonth()) === 3){
            quantityPerSaleApril.push(t.amount)
        } 
        if((new Date(t.create_date).getMonth()) === 4){
            quantityPerSaleMay.push(t.amount)
        } 
    })
    
    const quantitySoldMarch = (quantityPerSaleMarch.length > 0) && quantityPerSaleMarch.reduce(function(a, b) { return a + b})
    const quantitySoldApril = (quantityPerSaleApril.length > 0) && quantityPerSaleApril.reduce(function(a, b) { return a + b})
    const quantitySoldMay = (quantityPerSaleMay.length > 0) && quantityPerSaleMay.reduce(function(a, b) { return a + b})
    
    const totalsPerMonth = [quantitySoldMarch,quantitySoldApril,quantitySoldMay]
    console.log(totalsPerMonth)
    console.log(uniqueMonthsConvertedToMonthName)
    
    const options = {
        responsive : true,
        fill:true,
    }
     
    const data = useMemo ( function (){ 

        return{
            
            datasets: [
                {
                    label: "Sales per Month (ETH)",
                    data: totalsPerMonth,
                    borderColor: "#dfdfdf",
                    backgroundColor: "#46198fb3", 
                }
            ],
            labels: uniqueMonthsConvertedToMonthName,
        }; 
    },[])

    

  return (
    <Line data={data} options={options} />
  )
}
