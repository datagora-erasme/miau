import { cssInterop } from "nativewind";
import { Dropdown } from 'react-native-element-dropdown';

cssInterop(Dropdown, {className: "style"})

interface DataItem {
    label: string
    value: string
}
interface DropDownProps {
    data: DataItem[]
    placeholder: string
    onChange : (item :any) => void
    search: boolean
}

export default function DropDown({data, placeholder, onChange, search }: DropDownProps) {
    return (
        <Dropdown
        style={{backgroundColor:"white", height:50}}
        data={data}
        search={search}
        searchPlaceholder="rechercher"

        labelField="label" // Obligatoire
        valueField="value"
        placeholder={placeholder}
        placeholderStyle={{ color: 'back', fontSize: 13, fontStyle: "italic" }} 
        onChange={onChange}/>
    )
}