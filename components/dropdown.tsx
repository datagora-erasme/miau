import { cssInterop } from "nativewind";
import { Dropdown } from 'react-native-element-dropdown';

cssInterop(Dropdown, {className: "style"})

interface DataItem {
    label: string
    value: string
}
interface DropDownProps {
    value? : any | null
    data: DataItem[]
    placeholder?: string | null
    onChange : (item: any) => void
    search: boolean
}

export default function DropDown({ value, data, placeholder, onChange, search }: DropDownProps) {
    return (
        <Dropdown
        value={value}
        style={{backgroundColor:"white", height:50, paddingHorizontal:10}}
        data={data}
        search={search}
        searchPlaceholder="rechercher"
        labelField="label" 
        valueField="value"
        placeholder={placeholder || ""}
        placeholderStyle={{ color: 'black', fontSize: 13, fontStyle: "italic" }} 
        onChange={(item) => onChange(item)}/>
    )
}