import { ActivityIndicator, SafeAreaView, StyleSheet, View } from "react-native"
import { Icon, Text } from "react-native-paper"
import { BACKGROUND_COLOR, BROWN, BROWN_DARK, BROWN_LIGHT } from "../../../themes/globalThemes";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import AuthorDetails from "./AuthorDetails";
import editFill from "../../../assets/editFill.png";
import { UserProfile } from "../../../models/User";
import FollowUnFollowButton from "./FollowUnfollowButton";
import useMyProfile from "../../../hooks/useMyProfile";

type ProfileDetailsProp = {
    profile: UserProfile;
    onEditProfile: () => void;
    onPressFollow: (userId: number) => Promise<void>;
    onPressUnFollow: (userId: number) => Promise<void>;
}

const ProfileDetails: React.FC<ProfileDetailsProp> = ({ profile, onEditProfile, onPressFollow, onPressUnFollow }) => {
    const { isFetchingMyProfile, myProfile } = useMyProfile();

    if (isFetchingMyProfile || !myProfile || !profile) {
        return <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
            <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{ justifyContent: "center", flexGrow: 1 }} />
        </SafeAreaView>
    }
    return (
        <>
            <View style={style.profile}>
                <AuthorDetails
                    author={{ id: profile._id, name: profile.name, nickname: profile.nickname, photo: profile.photo }}
                    onTouch={(user_tocado) => console.log("tocado")}
                    style_name={{ maxWidth: myProfile._id === profile._id ? 255 : 100 }}
                    style_nickname={{ maxWidth: myProfile._id === profile._id ? 255 : 100 }}
                />

                {myProfile._id === profile._id && <TouchableOpacity onPress={onEditProfile}>
                    <Icon size={32} source={editFill} />
                </TouchableOpacity>}

                {myProfile._id !== profile._id && <FollowUnFollowButton profile={profile} myProfile={myProfile} onPressFollow={async () => await onPressFollow(profile._id)} onPressUnFollow={async () => await onPressUnFollow(profile._id)} />}

            </View>
            <Text style={{ paddingHorizontal: "7.5%", fontSize: 12, color: BROWN_DARK, marginTop: 20, fontStyle: profile.biography ? "normal" : "italic" }}>
                {profile.biography ?? "Sin biografía"}
            </Text>
        </>
    );
}

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center"
    },
    name: {
        color: BROWN,
        fontWeight: "bold",
        fontSize: 14,
    },
    nickname: {
        color: BROWN_LIGHT,
        fontStyle: "italic"
    },

    profile: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: "7.5%",
    },
});

export default React.memo(ProfileDetails);