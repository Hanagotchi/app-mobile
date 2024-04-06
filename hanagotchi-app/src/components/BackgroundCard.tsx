import { PropsWithChildren } from "react";
import { Card } from "react-native-paper";
import { DimensionValue, StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { BEIGE, BROWN_LIGHT } from "../themes/globalThemes";

type BackgroundCardProps = PropsWithChildren & {
    title: string;
    width?: DimensionValue;
    style_content?: StyleProp<ViewStyle>;
    style_title?: StyleProp<TextStyle>;
    style_card?: StyleProp<ViewStyle>;
}

const BackgroundCard: React.FC<BackgroundCardProps> = ({ title, width = "80%", style_content, style_title, style_card, children }) => {
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

    const cardContent = { ...style_content as object, ...style.cardContent };
    const cardTitle = { ...style_title as object, ...style.cardTitle };
    const card = { ...style_card as object, ...style.card };

    return (

        <Card mode="contained" style={card}>
            <Card.Title title={title} titleStyle={cardTitle} />
            <Card.Content style={cardContent}>
                {children}
            </Card.Content>
        </Card>
    )
}

export default BackgroundCard;