import { PropsWithChildren } from "react";
import { Card } from "react-native-paper";
import {DimensionValue, StyleSheet} from "react-native";
import { BEIGE, BROWN_LIGHT } from "../themes/globalThemes";

type BackgroundCardProps = PropsWithChildren & {
    title: string;
    width?: DimensionValue;
}

const BackgroundCard: React.FC<BackgroundCardProps> = ({title, width = "80%", children}) => {

    const style = StyleSheet.create({
        card: {
            backgroundColor: BEIGE,
            width,
            gap: 0,
            columnGap: 0,
        },
        cardTitle: {
            color: BROWN_LIGHT,
            fontSize: 12,
        },
        cardContent: {
            marginTop: -12,
        },
    })

    return (
        <Card mode="contained" style={style.card}>
            <Card.Title title={title} titleStyle={style.cardTitle}/>
            <Card.Content style={style.cardContent}>
                {children}
            </Card.Content>
        </Card>
    )
}



export default BackgroundCard;