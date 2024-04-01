import { SelectList } from 'react-native-dropdown-select-list'
import BackgroundCard from './BackgroundCard';
import { BEIGE_DARK, BROWN_DARK, BROWN_LIGHT, GREY_LIGHT } from '../themes/globalThemes';
import { Entypo } from '@expo/vector-icons';
import { DimensionValue, StyleSheet } from 'react-native';

type SelectOption = {
    key: any,
    value: string,
    disable?: boolean,
};

type SelectBoxProps = {
    label: string,
    data: SelectOption[]
    setSelected: (val: any) => void,
    save?: "value" | "key",
    defaultOption?: SelectOption,
    width?: DimensionValue, 
}

const SelectBox: React.FC<SelectBoxProps> = ({label, data, setSelected, width, save = "key", defaultOption}) => {
  
    return(
        <BackgroundCard title={label} width={width}>
            <SelectList
                setSelected={setSelected} 
                data={data}
                placeholder='---'
                search={false}
                save={save}
                defaultOption={defaultOption}
                arrowicon={<Entypo name="chevron-down" size={24} color={BROWN_DARK} />}
                closeicon={<Entypo name="chevron-up" size={24} color={BROWN_DARK} />}
                boxStyles={styles.boxStyles}
                inputStyles={styles.inputStyles}
                dropdownStyles={styles.dropdownStyles}
                dropdownTextStyles={styles.dropdownTextStyles}
                disabledItemStyles={styles.disabledItemStyles}
                disabledTextStyles={styles.disabledTextStyles}
            />
        </BackgroundCard>
    )
}

const styles = StyleSheet.create({
    boxStyles: {
        borderWidth: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
        width: "100%",
    },
    inputStyles: {
        color: BROWN_DARK,
        fontSize: 16,
    },
    dropdownStyles:{
        borderColor: BROWN_LIGHT,
    },
    dropdownTextStyles: {
        color: BROWN_DARK,
    },
    disabledItemStyles: {
        backgroundColor: BEIGE_DARK,
    },
    disabledTextStyles: {
        color: GREY_LIGHT,
    },
})

export default SelectBox;