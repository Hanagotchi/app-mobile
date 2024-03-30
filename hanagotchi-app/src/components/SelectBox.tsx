import { SelectList } from 'react-native-dropdown-select-list'
import BackgroundCard from './BackgroundCard';
import { BEIGE_DARK, BROWN_DARK, BROWN_LIGHT, GREY_LIGHT } from '../themes/globalThemes';
import { Entypo } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

type SelectOption = {
    key: string,
    value: string,
    disable?: boolean,
};

type SelectBoxProps = {
    data: SelectOption[]
    setSelected: (val: string) => void,
    save?: "value" | "key",
    defaultOption?: SelectOption, 
}

const SelectBox: React.FC<SelectBoxProps> = ({data, setSelected, save = "key", defaultOption}) => {
  
    return(
        <BackgroundCard title="COSAS">
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
        paddingVertical: 0
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