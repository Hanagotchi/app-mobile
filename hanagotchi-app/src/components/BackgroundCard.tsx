import { PropsWithChildren } from "react";
import { Card } from "react-native-paper";
import {StyleSheet} from "react-native";
import { BEIGE, BROWN_LIGHT } from "../themes/globalThemes";

type BackgroundCardProps = PropsWithChildren & {
    title: string;
}

const BackgroundCard: React.FC<BackgroundCardProps> = ({title, children}) => {
    return (
        <Card mode="contained" style={style.card}>
            <Card.Title title={title} titleStyle={style.cardTitle}/>
            <Card.Content style={style.cardContent}>
                {children}
            </Card.Content>
        </Card>
    )
}

const style = StyleSheet.create({
    card: {
        backgroundColor: BEIGE,
        width: "80%",
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

export default BackgroundCard;