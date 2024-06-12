import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native"
import { ActivityIndicator, Text } from "react-native-paper"
import LoaderButton from "../LoaderButton";
import { BEIGE, BEIGE_LIGHT, BROWN_DARK, BROWN_LIGHT, GREEN } from "../../themes/globalThemes";

type TagSuscriptionProps = {
    tag: string;
    isSuscribed: boolean
    suscribeToTag: (newTag: string) => Promise<void>;
    unSuscribeToTag: (tag: string) => Promise<void>;
    showError?: boolean;
}

const TagSuscription: React.FC<TagSuscriptionProps> = ({tag, isSuscribed, suscribeToTag, unSuscribeToTag, showError = false}) => {
    const [subscribed, setSuscribed] = useState<boolean>(isSuscribed);
    useEffect(() => setSuscribed(isSuscribed), [tag]);

    if (showError) {
        return <View style={style.container}>
            <Text>Ha ocurrido un problema inesperado</Text>
        </View>
    }

    const onPressSubscribe = async () => {
        await suscribeToTag(tag);
        setSuscribed(true);
    }

    const onPressUnsubscribe = async () => {
        await unSuscribeToTag(tag);
        setSuscribed(false);
    }

    return <View style={style.container}>
        <Text 
            ellipsizeMode="tail" 
            style={style.tag}
            numberOfLines={1}
        >
            #{tag.toLocaleLowerCase()}
        </Text>
        <LoaderButton 
            onPress={subscribed ? onPressUnsubscribe : onPressSubscribe}
            style={subscribed ? style.disabledButton : style.enabledButton}
        >
            <Text style={subscribed ? style.disabledButtonLabel : style.enabledButtonLabel}>
                {subscribed ? "DESUSCRIBIRSE" : "SUSCRIBIRSE"}
            </Text>
        </LoaderButton>
    </View>
}

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "95%",

    },
    tag: {
        color: GREEN,
        fontWeight: "bold",
        fontSize: 18,
        flex: 1,
    },
    enabledButton: {
        backgroundColor: GREEN,
        borderRadius: 10,
    },
    enabledButtonLabel: {
        color: BEIGE_LIGHT
    },
    disabledButton: {
        backgroundColor: BEIGE,
        borderRadius: 10,
    },
    disabledButtonLabel: {
        color: BROWN_LIGHT
    },
});

export default TagSuscription;