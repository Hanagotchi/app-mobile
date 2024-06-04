import React from 'react';
import { StyleSheet } from 'react-native';
import LoaderButton from '../../LoaderButton';
import { UserProfile } from '../../../models/User';
import { BEIGE_DARK, BEIGE_LIGHT, BROWN_DARK, GREEN } from '../../../themes/globalThemes';


type FollowButtonProps = {
    profile: UserProfile;
    myProfile: UserProfile;
    onPressFollow: () => Promise<void>;
    onPressUnFollow: () => Promise<void>;
}
const FollowUnFollowButton: React.FC<FollowButtonProps> = ({ profile, myProfile, onPressFollow, onPressUnFollow}) => {
    const [isFollowed, setIsFollowed] = React.useState(
        profile.followers.includes(myProfile._id)
    );

    return (
         <>
         {profile._id !== myProfile._id && !isFollowed && <LoaderButton
                mode="contained"
                uppercase
                style={styles.background_follow}
                onPress={() => {
                    setIsFollowed(true);
                    onPressFollow();
                }}
                labelStyle={styles.label_follow}
            >
                SEGUIR
            </LoaderButton>}
            
            {profile._id !== myProfile._id && isFollowed && <LoaderButton
                mode="contained"
                uppercase
                style={styles.background_unfollow}
                onPress={() => {
                    setIsFollowed(false);
                    onPressUnFollow();
                }}
                labelStyle={styles.label_unfollow}
            >
                SIGUIENDO
            </LoaderButton>}
         </>
    )
};

const styles = StyleSheet.create({
    background_follow: {
        borderRadius: 7,
        backgroundColor: BEIGE_DARK,
        minWidth: 125,
        maxWidth: 125
    },
    label_follow: {
        color: BROWN_DARK,
        fontSize: 13
    },
    background_unfollow: {
        borderRadius: 7,
        backgroundColor: GREEN,
        minWidth: 125,
        maxWidth: 125
    },
    label_unfollow: {
        color: BEIGE_LIGHT,
        fontSize: 13
    },
});

export default React.memo(FollowUnFollowButton);