import * as React from 'react'
import Select from './components/select'
import { useCurrency } from './contexts/currency'

interface CurrencyPicklistProps {
    currencies: string[]
}

const CurrencyPicklist = (props: CurrencyPicklistProps) => {
    const { dispatch } = useCurrency()
    return (
        <Select name="currency" value="USD" handleChange={(name, value) => dispatch({type: 'UPDATE_CURRENCY', payload: value})}>
        {
          props.currencies.map((currency) => <option key={currency} value={currency}>{currency}</option>)
        }
        </Select>
    );
}


export default CurrencyPicklist;